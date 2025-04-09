"use client"

import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import Receipt from "@/components/receipt"
import { ChangeEvent, useEffect, useState, useTransition } from "react"
import supabase from "@/config/supabaseClient"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { convertBlobUrlToFile } from "@/api/lib/utils"
import { deleteImage, uploadImage } from "@/auth/storage/client"
import { BiSolidUserRectangle } from "react-icons/bi"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { IoIosArrowBack } from "react-icons/io"
import { EstateStatus } from "@/components/listOfMeterPage/estateStatus"

interface EstateInfo {
  waterInitialCost: number | undefined
  electricityInitialCost: number | undefined
  furniture: number
  roomCharge: number
  is_ready: boolean
  qrcode_url: string
}

interface ReceiptData {
  endDate: string
  elecInitial: number
  kWh: number
  eCost: number
  waterInitial: number
  usage: number
  wCost: number
}

interface TotalInfo {
  totalElectricCost: number
  totalWaterCost: number
  totalFinalCost: number
}

interface Bank {
  acct_no: string
  id: number
  name: string
  holder_name: string
}

const formSchema = z.object({
  totalCost: z.number(),
  receipt_url: z.instanceof(File).optional(),
})

const Payment: NextPage = () => {
  const router = useRouter()
  const [roomNo, setRoomNo] = useState<string | null>(null)
  const [estateId, setEstateId] = useState<string | null>(null)
  const [estateInfo, setEstateInfo] = useState<EstateInfo | null>(null)
  const [tenant, setTenant] = useState<any>(null)
  const [bank, setBank] = useState<Bank[]>()
  const [receiptInfo, setReceiptInfo] = useState<ReceiptData | null>(null)
  const [totalInfo, setTotalInfo] = useState<TotalInfo | null>(null)
  const [isClient, setIsClient] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [imageUrls, setImageUrls] = useState<string[]>([])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      totalCost: 0,
    },
  })

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const room_no = params.get("room_no")
      const estateId = params.get("estate_id")
      setRoomNo(room_no)
      setEstateId(estateId)
    }
  }, [])

  useEffect(() => {
    const fetchEstate = async () => {
      if (!estateId) return

      const { data: estate, error } = await supabase
        .from("estates")
        .select("*")
        .eq("id", estateId)
        .single()

      if (error) {
        console.error("Error fetching estate data:", error)
      } else {
        setEstateInfo({
          is_ready: estate.is_ready,
          electricityInitialCost: estate.electricity_cost,
          waterInitialCost: estate.water_cost,
          furniture: estate.furniture_cost,
          roomCharge: estate.room_charge,
          qrcode_url: estate.qrcode_url,
        })
      }
    }

    fetchEstate()
  }, [estateId])

  useEffect(() => {
    const fetchBanks = async () => {
      if (!estateId) return

      const { data: banks, error } = await supabase
        .from("bank_info")
        .select("*")
        .eq("estate_id", estateId)

      if (error) {
        console.error("Error fetching bank data:", error)
      } else {
        setBank(banks || [])
      }
    }

    fetchBanks()
  }, [estateId])

  useEffect(() => {
    const fetchTenantByRoomNo = async () => {
      if (!roomNo) return

      const { data: tenant, error } = await supabase
        .from("tenants")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      if (error) {
        console.error("Error fetching tenant data:", error)
      } else {
        setTenant(tenant)
        if (tenant.receipt_url) {
          setImageUrls([tenant.receipt_url])
        }
      }
    }

    fetchTenantByRoomNo()
  }, [roomNo])

  useEffect(() => {
    const fetchReceiptData = async () => {
      if (!roomNo) return

      const { data: electData } = await supabase
        .from("electricity")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      const { data: waterData } = await supabase
        .from("water")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      if (electData && waterData) {
        setReceiptInfo({
          endDate: electData.created_at,
          elecInitial: electData.initial_value,
          kWh: electData.kWh,
          eCost: electData.cost,
          waterInitial: waterData.initial_value,
          usage: waterData.usage,
          wCost: waterData.cost,
        })
      }
    }

    fetchReceiptData()
  }, [roomNo])

  useEffect(() => {
    if (tenant?.receipt_url) {
      form.reset({
        receipt_url: new File([], tenant.receipt_url),
      })
    }
  }, [tenant, form])

  useEffect(() => {
    if (
      estateInfo &&
      receiptInfo &&
      estateInfo.electricityInitialCost !== undefined &&
      estateInfo.waterInitialCost !== undefined
    ) {
      const totalElectricCost =
        estateInfo.electricityInitialCost *
        (receiptInfo.kWh - receiptInfo.elecInitial)
      const totalWaterCost =
        estateInfo.waterInitialCost *
        (receiptInfo.usage - receiptInfo.waterInitial)
      const totalFinalCost =
        totalElectricCost +
        totalWaterCost +
        estateInfo.furniture +
        estateInfo.roomCharge

      setTotalInfo({
        totalElectricCost,
        totalWaterCost,
        totalFinalCost,
      })
      form.setValue("totalCost", totalFinalCost)
    }
  }, [estateInfo, receiptInfo, form])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file))
      setImageUrls(newImageUrls)
    }
  }

  const handleDeleteImage = async () => {
    if (!tenant?.receipt_url) return

    try {
      // Delete the image from storage
      const { error: deleteError } = await deleteImage(tenant.receipt_url)
      if (deleteError) throw deleteError

      // Update the tenant record in the database
      const { error: updateError } = await supabase
        .from("tenants")
        .update({
          receipt_url: null,
          payment_status: "false", // Reset payment status if needed
        })
        .eq("room_no", roomNo)

      if (updateError) throw updateError

      // Update local state
      setTenant((prev: any) => ({
        ...prev,
        receipt_url: null,
        payment_status: "false",
      }))
      setImageUrls([])

      // Reset the form field
      form.resetField("receipt_url")
    } catch (error) {
      console.error("Error deleting receipt:", error)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      let imageUrl = tenant?.receipt_url || ""

      if (imageUrls.length > 0 && imageUrls[0] !== tenant?.receipt_url) {
        const imageFile = await convertBlobUrlToFile(imageUrls[0])
        const result = await uploadImage({
          file: imageFile,
          bucket: "receipt",
        })

        if (result.error) {
          console.error(result.error)
          return
        }

        imageUrl = result.imageUrl
      }

      const { data: tenantData, error: profileError } = await supabase
        .from("tenants")
        .update({
          // rental_cost: totalInfo?.totalFinalCost,
          receipt_url: imageUrl,
          payment_status: "waiting",
        })
        .eq("room_no", roomNo)
        .select()

      if (profileError) throw profileError

      setTenant((prev: any) => ({ ...prev, receipt_url: imageUrl }))

      router.push(`/tenant?room_no=${roomNo}`)
    })
  }

  if (!isClient) {
    return null
  }

  if (!tenant) {
    return <div>Loading...</div>
  }

  return (
    <MainLayout className="flex flex-col gap-8">
      <Link href={`/tenant?room_no=${roomNo}`}>
        <IoIosArrowBack size={24} className="text-black" />
      </Link>
      <h1 className="flex text-2xl font-bold justify-center">Payment</h1>
      <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg w-full">
        {estateInfo?.is_ready ? (
          <>
            <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
              <div className="flex flex-row gap-2">
                <span className="whitespace-nowrap font-medium">
                  Total Cost (Baht)
                </span>
                <div className="flex w-full items-center">
                  <Separator className="h-[2px] rounded-sm w-full justify-center" />
                </div>
              </div>

              <div className="flex flex-row justify-between items-center font-bold">
                <span className="font-bold text-2xl">
                  {totalInfo?.totalFinalCost ?? "Loading..."}
                </span>
              </div>
            </div>

            <Accordion type="single" collapsible className="flex-grow-0 w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex gap-3 font-medium w-full text-base items-center justify-center">
                  View more Details
                </AccordionTrigger>
                <AccordionContent className="gap-4 p-0 pb-4">
                  {receiptInfo && estateInfo && totalInfo && (
                    <Receipt
                      startDate="2025-04-01"
                      endDate={receiptInfo.endDate}
                      eUsed={receiptInfo.kWh - receiptInfo.elecInitial}
                      eCost={totalInfo.totalElectricCost}
                      wUsed={receiptInfo.usage - receiptInfo.waterInitial}
                      wCost={totalInfo.totalWaterCost}
                      furniture={estateInfo.furniture}
                      roomCharge={estateInfo.roomCharge}
                    />
                  )}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        ) : (
          <div className="flex flex-col gap-2 justify-center">
            <span className="font-bold text-center">
              The Owner hasn't reviewed the meter.
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg w-full">
        <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          <div className="flex flex-col gap-2 items-center">
            <span className="whitespace-nowrap font-bold">
              Scan QRcode to pay
            </span>
            {estateInfo?.qrcode_url ? (
              <Image
                src={imageUrls[0] || estateInfo.qrcode_url}
                alt="Receipt"
                width={300}
                height={300}
                className="rounded-lg shadow"
              />
            ) : (
              <span className="text-center">The Owner hasn't uploaded the qrcode</span>
            )}
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-2 rounded-md">
          <h3 className="font-bold">Bank Accounts</h3>
          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          {bank?.length ? (
            bank.map((account) => (
              <div
                key={account.id}
                className="flex p-4 bg-custom-gray-background rounded-sm"
              >
                <div className="flex flex-col justify-between gap-2">
                  <span className="font-medium">{account.name}</span>
                  <li className="text-base">Number: {account.acct_no}</li>
                  <li className="text-base">Name: {account.holder_name}</li>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No bank accounts available</p>
          )}
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-8 w-full max-w-md"
        >
          <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">
                Upload Payment Receipt
              </p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>

            {tenant?.receipt_url ? (
              <div className="flex flex-col gap-2 items-center">
                <Image
                  src={imageUrls[0] || tenant.receipt_url}
                  alt="Receipt"
                  width={300}
                  height={300}
                  className="rounded-lg shadow"
                />
                {imageUrls.length > 0 && (
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-fit"
                    onClick={handleDeleteImage}
                    disabled={isPending}
                  >
                    Delete Receipt
                  </Button>
                )}
              </div>
            ) : (
              <>
                <p className="text-sm text-muted-foreground">
                  No receipt uploaded. Please upload a receipt using the form
                  below.
                </p>
                <FormField
                  control={form.control}
                  name="receipt_url"
                  render={({ field: { value, onChange, ...field } }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          id="receipt_url"
                          icon={<BiSolidUserRectangle size={24} />}
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            handleImageChange(e)
                            if (e.target.files?.[0]) {
                              onChange(e.target.files[0])
                            }
                          }}
                          className="text-sm"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Button
              type="submit"
              className="flex w-full text-base font-bold bg-custom-green text-black"
              disabled={isPending}
            >
              {isPending ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Upload Receipt"
              )}
            </Button>
            <Link href={`/tenant?room_no=${roomNo}`}>
              <Button
                variant={"outline"}
                className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2 underline"
              >
                Cancle
              </Button>
            </Link>
          </div>
        </form>
      </Form>
    </MainLayout>
  )
}

export default Payment
