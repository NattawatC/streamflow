"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import supabase from "@/config/supabaseClient"
import Image from "next/image"

const review: NextPage = () => {
  const [id, setId] = useState<string | null>(null)
  const router = useRouter()
  const [selectedValue, setSelectedValue] = useState<string>("")
  const [tenant, setTenant] = useState<any>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    setId(id)
  }, [])

  useEffect(() => {
    const fetchTenant = async () => {
      if (!id) return
      const { data, error } = await supabase
        .from("tenants")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching tenant:", error.message)
      } else {
        setTenant(data)
      }
    }

    fetchTenant()
  }, [id])

  async function handleSubmit() {
    if (selectedValue === "Approve") {
      const { data: tenantData, error: profileError } = await supabase
        .from("tenants")
        .update({
          payment_status: true,
          // payment_status: true,
        })
        .eq("id", id)
        .select()
    }

    router.push(`/owner/tenant-info?id=${id}`)
  }
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href={`/owner/tenant-info?id=${id}`}>
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Review Receipt</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          {tenant?.receipt_url ? (
            <Image
              className="rounded-md"
              src={tenant.receipt_url}
              width={300}
              height={300}
              alt="receipt"
              priority
            />
          ) : (
            <></>
          )}
          <div className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
          </div>
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Approval</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <RadioGroup
              defaultValue={selectedValue}
              onValueChange={setSelectedValue}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Approve" id="Approve" />
                <Label
                  htmlFor="Approve"
                  className={
                    selectedValue === "Approve"
                      ? "text-base font-bold"
                      : "text-base"
                  }
                >
                  Approve
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="NotApprove" id="NotApprove" />
                <Label
                  htmlFor="NotApprove"
                  className={
                    selectedValue === "NotApprove"
                      ? "text-base font-bold"
                      : "text-base"
                  }
                >
                  Not Approve
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Submit review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle className="flex text-left text-white">
                Approval
              </DialogTitle>
              <DialogDescription>
                <span className="flex flex-col gap-2">
                  <span className="text-white text-left">
                    You have choose {selectedValue}. Are you sure?
                  </span>
                </span>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <span className="flex flex-row gap-4">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-custom-pink text-black "
                >
                  Confirm
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-full text-black border "
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </span>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </MainLayout>
    </>
  )
}
export default review
