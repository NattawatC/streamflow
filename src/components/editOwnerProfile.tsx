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
import { useState } from "react"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  age: z.string().nonempty("Age is required"),
  gender: z.string().nonempty("Gender is required"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
  estateName: z.string().nonempty("Estate Name is required"),
  address: z.string().nonempty("Address is required"),
  buildingNumber: z.string().nonempty("Building Number is required"),
  floorNumber: z.string().nonempty("Floor Number is required"),
  furnitureCost: z.string().nonempty("Furniture Cost is required"),
  roomCharge: z.string().nonempty("Room Charge is required"),
  bank: z.string().nonempty("Bank is required"),
  accountNumber: z.string().nonempty("Account Number is required"),
  accountName: z.string().nonempty("Account Name is required"),
})

interface Props {
  userId: string | undefined
}

export function EditOwnerProfile({ userId }: Props) {
  const router = useRouter()
  // 1. Define your form.
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
      buildingNumber: "",
      floorNumber: "",
      furnitureCost: "",
      roomCharge: "",
      bank: "",
      accountNumber: "",
      accountName: "",
    },
  })

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
                      placeholder="John"
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
                      placeholder="Doe"
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
                      placeholder="50"
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
                      placeholder="Enter your gender"
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
                      placeholder="000-000-0000"
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
                      placeholder="Enter place name"
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
                      placeholder="Enter address"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="buildingNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="buildingNumber" className="text-sm">
                    Number of Building
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="buildingNumber"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder="Enter building number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="floorNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="floorNumber" className="text-sm">
                    Number of Level/Floor
                  </FormLabel>
                  <FormControl>
                    <Input
                      id="floorNumber"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder="Enter number of level/floor"
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
                      placeholder="Enter furniture cost"
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
                      placeholder="Enter room charge cost"
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
                      <SelectValue placeholder="Choose Bank" />
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
                    placeholder="Enter account number"
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
                      placeholder="Enter account holder name"
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
