"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import BankingInfoDisplay from "./bankingInfoDisplay"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ChangeEvent, useEffect, useRef, useState, useTransition } from "react"
import {
  getUserBanks,
  getUserEstate,
  getUserProfile,
} from "@/api/services/ownerService"
import supabase from "@/config/supabaseClient"
import Image from "next/image"
import { convertBlobUrlToFile } from "@/api/lib/utils"
import { deleteImage, uploadImage } from "@/auth/storage/client"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.string(),
  gender: z.string(),
  phoneNumber: z.string(),
  estateName: z.string(),
  address: z.string(),
  totalBuilding: z.string(),
  totalFloor: z.string(),
  totalRoom: z.coerce.number(),
  furnitureCost: z.coerce.number(),
  roomCharge: z.coerce.number(),
  bank: z.string(),
  accountNumber: z.string(),
  accountName: z.string(),
  waterCost: z.coerce.number(),
  elecCost: z.coerce.number(),
  qrCodeImage: z.instanceof(File).optional(),
})

interface Props {
  userId: string | undefined
}

interface BankInfoFromAPI {
  id: number
  name: string
  acct_no: string
  holder_name: string
  user_id: string
}

const bankOptions = [
  "Bangkok Bank (BBL)",
  "Kasikorn Bank (KBank)",
  "Siam Commercial Bank (SCB)",
  "Krungthai Bank (KTB)",
  "Bank of Ayudhya (Krungsri)",
  "TMBThanachart Bank (TTB)",
  "CIMB Thai Bank",
]

export function EditOwnerProfile({ userId }: Props) {
  const router = useRouter()
  const [bank, setBank] = useState<BankInfoFromAPI[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [estate, setEstate] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>(
    estate?.qrcode_url ? [estate.qrcode_url] : []
  )
  const imageInputRef = useRef<HTMLInputElement>(null)
  const [isPending, startTransition] = useTransition()
  type BankingInfo = {
    [key: string]: {
      [accountId: string]: { accountNumber: string; accountHolderName: string }
    }
  }

  const [bankingInfo, setBankingInfo] = useState<{
    [bank: string]: {
      [accountId: string]: { accountNumber: string; accountHolderName: string }
    }
  }>({})
  const [latestBankingInfo, setLatestBankingInfo] = useState<
    typeof bankingInfo
  >({})

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files)
      const newImageUrls = filesArray.map((file) => URL.createObjectURL(file))

      setImageUrls([...imageUrls, ...newImageUrls])
    }
  }

  // Fetch User's Profile information
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(userId)
        setProfile(userProfile)
      } catch (err) {
        setError("Failed to fetch bank data")
        console.error(err)
      }
    }

    fetchUserProfile()
  }, [userId])

  //   Fetch User's Estate information
  useEffect(() => {
    const fetchUserEstate = async () => {
      try {
        const userEstate = await getUserEstate(userId)
        const estateRecord =
          userEstate?.estates?.length > 0 ? userEstate.estates[0] : null
        setEstate(estateRecord)
      } catch (err) {
        setError("Failed to fetch estate data")
        console.error(err)
      }
    }

    fetchUserEstate()
  }, [userId])

  //   Fetch User's Bank informaiton
  useEffect(() => {
    const fetchBankData = async () => {
      try {
        const bankData = await getUserBanks(userId)
        console.log("fetched bank data:", bankData)
        setBank(bankData || [])
      } catch (err) {
        setError("Failed to fetch bank data")
        console.error(err)
        setBank([])
      }
    }

    fetchBankData()
  }, [userId])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phoneNumber: "",
      estateName: "",
      address: "",
      totalBuilding: "",
      totalFloor: "",
      totalRoom: 0,
      furnitureCost: 0,
      roomCharge: 0,
      bank: "",
      accountNumber: "",
      accountName: "",
      waterCost: 0,
      elecCost: 0,
    },
  })

  useEffect(() => {
    if (bank && bank.length > 0) {
      const initialBankingInfo: BankingInfo = {}

      bank.forEach((bankItem) => {
        initialBankingInfo[bankItem.name] = {
          [bankItem.acct_no]: {
            accountNumber: bankItem.acct_no,
            accountHolderName: bankItem.holder_name,
          },
        }
      })

      setBankingInfo(initialBankingInfo)

      if (bank.length > 0) {
        form.setValue("bank", bank[0].name)
        form.setValue("accountNumber", bank[0].acct_no)
        form.setValue("accountName", bank[0].holder_name)
      }
    }
  }, [bank, form])

  async function handleAddBankingInfo() {
    const selectedBank = form.getValues("bank")
    const accountNumber = form.getValues("accountNumber")
    const accountHolderName = form.getValues("accountName")

    if (selectedBank && accountNumber && accountHolderName) {
      setBankingInfo((prev) => {
        const updatedAccounts = {
          ...prev,
          [selectedBank]: {
            ...prev[selectedBank],
            [accountNumber]: {
              accountNumber,
              accountHolderName,
            },
          },
        }

        console.log("Updated Banking Info:", updatedAccounts)
        setLatestBankingInfo(updatedAccounts)

        return updatedAccounts
      })

      const { data, error } = await supabase
        .from("bank_info")
        .insert([
          {
            acct_no: accountNumber,
            name: selectedBank,
            holder_name: accountHolderName,
            estate_id: estate.id,
          },
        ])
        .select()

      if (error) {
        console.error("Error adding banking info to Supabase:", error)
        return
      }

      if (data) {
        console.log("Successfully added banking info to Supabase:", data)
      }

      form.setValue("bank", "")
      form.setValue("accountNumber", "")
      form.setValue("accountName", "")
    } else {
      console.log("Please fill in all the fields")
    }
  }

  async function handleDeleteAccount(bankName: string, accountNumber: string) {
    try {
      const bankItem = bank.find(
        (item) => item.name === bankName && item.acct_no === accountNumber
      )

      if (!bankItem) {
        console.error("Bank item not found")
        return
      }

      const { error } = await supabase
        .from("bank_info")
        .delete()
        .eq("acct_no", accountNumber)
        .eq("name", bankName)

      if (error) throw error

      setBankingInfo((prev) => {
        const updatedAccounts = { ...prev[bankName] }

        const accountKey = Object.keys(updatedAccounts).find(
          (key) => updatedAccounts[key].accountNumber === accountNumber
        )

        if (accountKey) {
          delete updatedAccounts[accountKey]
        }

        if (Object.keys(updatedAccounts).length === 0) {
          const { [bankName]: _, ...remainingBanks } = prev
          return remainingBanks
        }

        return {
          ...prev,
          [bankName]: updatedAccounts,
        }
      })

      setBank((prev) => prev.filter((item) => item.acct_no !== accountNumber))

      console.log("Successfully deleted bank account")
    } catch (error) {
      console.error("Error deleting bank account:", error)
    }
  }

  useEffect(() => {
    if (profile && estate && bank) {
      form.reset({
        firstName: profile.first_name || "",
        lastName: profile.last_name || "",
        age: profile.age || "",
        gender: profile.gender || "",
        phoneNumber: profile.phone_no || "",
        estateName: estate.name || "",
        address: estate.address || "",
        totalBuilding: estate.total_building || "",
        totalFloor: estate.total_floor || "",
        totalRoom: estate.total_room || "",
        furnitureCost: estate.furniture_cost || "",
        roomCharge: estate.room_charge || "",
        bank: bank[0]?.name || "",
        accountNumber: bank[0]?.acct_no || "",
        accountName: bank[0]?.holder_name || "",
        waterCost: estate.water_cost || 0,
        elecCost: estate.elec_cost || 0,
        qrCodeImage: estate.qrcode_url
          ? new File([], "existing-qr-code")
          : undefined,
      })
      // Initialize imageUrls with existing QR code
      if (estate.qrcode_url) {
        setImageUrls([estate.qrcode_url])
      }
    }
  }, [profile, estate, bank, form])

  if (!profile || !estate || !bank) {
    return <div>Loading...</div>
  }

  const handleDeleteImage = async () => {
    if (!estate?.qrcode_url) return

    try {
      const { error: deleteError } = await deleteImage(estate.qrcode_url)
      if (deleteError) throw deleteError

      const { error: updateError } = await supabase
        .from("estates")
        .update({ qrcode_url: null })
        .eq("id", estate.id)

      if (updateError) throw updateError

      setProfile((prev: any) => ({ ...prev, qrcode_url: null }))
      setImageUrls([])
    } catch (error) {
      console.error("Error deleting QR code:", error)
    }
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    startTransition(async () => {
      let imageUrl = estate?.qrcode_url || ""

      if (imageUrls.length > 0 && imageUrls[0] !== estate?.qrcode_url) {
        const imageFile = await convertBlobUrlToFile(imageUrls[0])
        const result = await uploadImage({
          file: imageFile,
          bucket: "qrcode",
        })

        if (result.error) {
          console.error(result.error)
          return
        }

        imageUrl = result.imageUrl
      }

      setImageUrls([])

      // Update profile table
      const { data: profileData, error: profileError } = await supabase
        .from("profile")
        .update({
          first_name: values.firstName,
          last_name: values.lastName,
          gender: values.gender,
          phone_no: values.phoneNumber,
          age: values.age,
        })
        .eq("user_id", userId)
        .select()

      if (profileError) throw profileError

      // Update estates table
      const { data: estateData, error: estateError } = await supabase
        .from("estates")
        .update({
          name: values.estateName,
          total_room: values.totalRoom,
          total_floor: values.totalFloor,
          total_building: values.totalBuilding,
          room_charge: values.roomCharge,
          furniture_cost: values.furnitureCost,
          water_cost: values.waterCost,
          electricity_cost: values.elecCost,
          qrcode_url: imageUrl,
        })
        .eq("id", estate.id)
        .select()

      if (estateError) throw estateError
    })
    router.push("/owner/setting")
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8"
      >
        <div className="flex flex-col gap-3">
          <p className="font-bold text-base">Basic Information</p>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="firstName" className="text-sm">
                    Firstname
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="firstName"
                      type="text"
                      className="text-sm"
                      placeholder={profile?.first_name}
                      {...field}
                      icon={<BiSolidUserRectangle size={24} />}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="lastName" className="text-sm">
                    Lastname
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="lastName"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={profile?.last_name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="age" className="text-sm">
                    Age
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="age"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={profile?.age}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="gender" className="text-sm">
                    Gender
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="gender"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={profile?.gender}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phoneNumber" className="text-sm">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="phoneNumber"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={profile?.phone_no}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Estate Information*</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="estateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="estateName" className="text-sm">
                    Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="estateName"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.name}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address" className="text-sm">
                    Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.address}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalBuilding"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="totalBuilding" className="text-sm">
                    Number of Building
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="totalBuilding"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.total_building}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalFloor"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="totalFloor" className="text-sm">
                    Number of Level/Floor
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="totalFloor"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.total_floor}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="totalRoom"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="totalRoom" className="text-sm">
                    Number of Room
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="totalRoom"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.total_room}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="furnitureCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="furnitureCost" className="text-sm">
                    Furniture (Baht)
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="furnitureCost"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.furniture_cost}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="roomCharge"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="roomCharge" className="text-sm">
                    Room Charge (Baht)
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="roomCharge"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder={estate?.room_charge}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Utility Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="elecCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="elecCost" className="text-sm">
                    Electricity cost (per unit)
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="elecCost"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder="Enter cost per unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="waterCost"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="waterCost" className="text-sm">
                    Water cost (per unit)
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="waterCost"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder="Enter cost per unit"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">
              Upload Qrcode/PromptPay
            </p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>

          {/* Conditionally render based on whether profile already has a qrcode_url */}
          {estate?.qrcode_url || imageUrls.length > 0 ? (
            <div className="flex flex-col gap-2 items-center ">
              <Image
                src={imageUrls[0] || estate.qrcode_url}
                alt="QR code"
                width={300}
                height={300}
                className="rounded-lg shadow"
              />
              <Button
                type="button"
                variant="destructive"
                className="w-fit"
                onClick={handleDeleteImage}
                disabled={isPending}
              >
                Delete QR Code
              </Button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">
                No QR code uploaded. Please upload a QR code using the form
                below.
              </p>
              <FormField
                control={form.control}
                name="qrCodeImage"
                render={({ field: { value, onChange, ...field } }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        id="qrCodeImage"
                        type="file"
                        accept="image/*"
                        hidden={true}
                        icon={<BiSolidUserRectangle size={24} />}
                        onChange={handleImageChange}
                        className="text-sm"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-4 mt-2">
                {imageUrls.map((url, index) => (
                  <Image
                    key={url}
                    src={url}
                    width={300}
                    height={300}
                    alt={`img-${index}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Banking Information</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>
          <FormField
            control={form.control}
            name="bank"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="bank" className="text-sm">
                  Select Bank
                </FormLabel>
                <FormControl>
                  <Select onValueChange={(value) => field.onChange(value)}>
                    <SelectTrigger
                      id="bank"
                      className="flex w-full"
                      icon={<BiSolidUserRectangle size={24} />}
                    >
                      <SelectValue placeholder="Kasikorn Bank (KBank)" />
                    </SelectTrigger>
                    <SelectContent>
                      {bankOptions.map((bank) => (
                        <SelectItem key={bank} value={bank}>
                          {bank}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="accountNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="accountNumber" className="text-sm">
                  Account Number
                </FormLabel>
                <FormControl>
                  <Input
                    id="accountNumber"
                    type="text"
                    className="text-sm"
                    icon={<BiSolidUserRectangle size={24} />}
                    placeholder=""
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-row gap-4">
            <FormField
              control={form.control}
              name="accountName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="accountName" className="text-sm">
                    Account Holder Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="accountName"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder=""
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              onClick={handleAddBankingInfo}
              className="flex w-16 h-fill text-sm font-bold mt-8 bg-custom-pink text-black"
            >
              Add
            </Button>
          </div>

          <BankingInfoDisplay
            bankingInfo={bankingInfo}
            onDeleteAccount={handleDeleteAccount}
          />
        </div>
        <Button
          type="submit"
          className="flex w-full text-base font-bold bg-custom-green text-black"
        >
          {isPending ? <Loader2 className="animate-spin" /> : "Save"}
        </Button>
      </form>
    </Form>
  )
}
