"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
import { set, z } from "zod"
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
import { useEffect, useState } from "react"
import { BankInfo } from "@/interfaces/bank"
import {
  getUserBanks,
  getUserEstate,
  getUserProfile,
} from "@/services/ownerService"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  age: z.string().nonempty("Age is required"),
  gender: z.string().nonempty("Gender is required"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
  estateName: z.string().nonempty("Estate Name is required"),
  address: z.string().nonempty("Address is required"),
  totalBuilding: z.string().nonempty("Total Building is required"),
  totalFloor: z.string().nonempty("Total Floor is required"),
  totalRoom: z.string().nonempty("Total Room is required"),
  furnitureCost: z.string().nonempty("Furniture Cost is required"),
  roomCharge: z.string().nonempty("Room Charge is required"),
  bank: z.string().nonempty("Bank is required"),
  accountNumber: z.string().nonempty("Account Number is required"),
  accountName: z.string().nonempty("Account Name is required"),
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

export function EditOwnerProfile({ userId }: Props) {
  const router = useRouter()
  const [bank, setBank] = useState<BankInfoFromAPI[]>([])
  const [profile, setProfile] = useState<any>(null)
  const [estate, setEstate] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const [selectedBank, setSelectedBank] = useState<BankInfo | null>()

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
        // Use the first estate if available
        const estateRecord =
          userEstate?.estates?.length > 0 ? userEstate.estates[0] : null
        setEstate(estateRecord) // Update estate with the first record if available
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
      firstName: profile?.first_name,
      lastName: profile?.last_name,
      age: profile?.age,
      gender: profile?.gender,
      phoneNumber: profile?.phone_no,
      estateName: estate?.name,
      address: estate?.address,
      totalBuilding: estate?.total_building,
      totalFloor: estate?.total_floor,
      totalRoom: estate?.total_room,
      furnitureCost: estate?.furniture_cost,
      roomCharge: estate?.room_charge,
      bank: "",
      accountNumber: "",
      accountName: "",
    },
  })
  useEffect(() => {
    if (bank && bank.length > 0) {
      const initialBankingInfo: BankingInfo = {}

      bank.forEach((bankItem) => {
        initialBankingInfo[bankItem.name] = {
          [`bank-${bankItem.id}`]: {
            accountNumber: bankItem.acct_no,
            accountHolderName: bankItem.holder_name,
          },
        }
      })

      setBankingInfo(initialBankingInfo)

      // Set form values with the first bank
      form.setValue("bank", bank[0].name)
      form.setValue("accountNumber", bank[0].acct_no)
      form.setValue("accountName", bank[0].holder_name)
    }
  }, [bank, form])
  // 1. Define your form.

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
    router.push("/owner/home")
  }
  type BankingInfo = {
    [key: string]: {
      [accountId: string]: { accountNumber: string; accountHolderName: string }
    }
  }
  const [bankingInfo, setBankingInfo] = useState<BankingInfo>({})

  function handleDeleteAccount(bank: string, accountId: string) {
    setBankingInfo((prev) => {
      const updatedAccounts = { ...prev[bank] }
      delete updatedAccounts[accountId]

      // If the bank has no more accounts, remove the bank entirely
      if (Object.keys(updatedAccounts).length === 0) {
        const { [bank]: _, ...remainingBanks } = prev
        const updatedBankingInfo = remainingBanks
        console.log("Banking Info after deletion:", updatedBankingInfo) // Print updated dictionary
        return updatedBankingInfo
      }

      const updatedBankingInfo = {
        ...prev,
        [bank]: updatedAccounts,
      }
      console.log("Banking Info after deletion:", updatedBankingInfo) // Print updated dictionary
      return updatedBankingInfo
    })
  }

  function handleAddBankingInfo() {
    const selectedBank = form.getValues("bank")
    const accountNumber = form.getValues("accountNumber")
    const accountHolderName = form.getValues("accountName")

    if (selectedBank && accountNumber && accountHolderName) {
      setBankingInfo((prev) => {
        const uniqueAccountId = `account-${Date.now()}` // Generate a unique ID for the account
        const updatedBankingInfo = {
          ...prev,
          [selectedBank]: {
            ...prev[selectedBank], // Preserve existing accounts for this bank
            [uniqueAccountId]: {
              accountNumber,
              accountHolderName,
            }, // Store account details as an object
          },
        }

        // Log the updated dictionary
        console.log("Updated Banking Info:", updatedBankingInfo)

        return updatedBankingInfo // Return the new state
      })

      // Reset the form fields
      form.setValue("bank", "")
      form.setValue("accountNumber", "")
      form.setValue("accountName", "") // Reset the account holder name field
    } else {
      console.log("Please fill in all the fields")
    }
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
                      <SelectValue placeholder="Kasikorn Bank" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Kasikorn Bank">
                        Kasikorn Bank
                      </SelectItem>
                      <SelectItem value="Siam Commercial Bank">
                        Siam Commercial Bank
                      </SelectItem>
                      <SelectItem value="Bangkok Bank">Bangkok Bank</SelectItem>
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
          Save
        </Button>
      </form>
    </Form>
  )
}
