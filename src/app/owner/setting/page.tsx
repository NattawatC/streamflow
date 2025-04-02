"use client"

import { BiSolidBank } from "react-icons/bi"
import { useState, useTransition } from "react"
import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ownerData } from "@/interfaces/ownerData"
import { BankInfo } from "@/interfaces/bank"
import { Loader2, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { logOutAction } from "@/actions/users"

const setting: NextPage = () => {
  const [selectedEstate, setSelectedEstate] = useState<BankInfo | null>()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  const handleSelect = (value: string) => {
    const bankData = ownerData.bank.find((item) => item.name === value)
    if (bankData) {
      setSelectedEstate({
        name: bankData.name,
        accountNumber: Array.isArray(bankData.accountNumber)
          ? bankData.accountNumber
          : [bankData.accountNumber],
      })
    }
  }

  const logOut = () => {
    startTransition(async () => {
      const { errorMessage } = await logOutAction()

      if (errorMessage) {
        toast(errorMessage)
      } else {
        router.push("/login")
        toast("Successfully logged out")
      }
    })
  }

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex flex-row justify-center gap-2">
          <h1 className="font-bold text-2xl">Profile</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex justify-end w-full">
            <Link href={"/owner/edit"}>
              <FiEdit size={24} />
            </Link>
          </div>
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Basic Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col font-medium gap-2">
                <p>Name:</p>
                <p>Age:</p>
                <p>Gender:</p>
                <p>Tel:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  {ownerData.firstname} {ownerData.lastname}
                </p>
                <p>{ownerData.age}</p>
                <p>{ownerData.gender}</p>
                <p>{ownerData.phoneNumber}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Estate Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <div className="flex flex-col font-medium gap-2">
                  <p>Name:</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>{ownerData.estate.name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Address:</p>
                <p>
                  {ownerData.estate.address}, {ownerData.estate.city},{" "}
                  {ownerData.estate.zipCode}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col font-medium gap-2">
                  <p>Furniture Cost (Baht):</p>
                  <p>Room Charge (Baht):</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>{ownerData.estate.furnitureCost}</p>
                  <p>{ownerData.estate.roomCharge}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">
                Utilities Information
              </p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-2">
              <div className="flex flex-col font-medium gap-2">
                <p>Electricity (Baht):</p>
                <p>Water (Baht):</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{ownerData.estate.electricityCost}</p>
                <p>{ownerData.estate.waterCost}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Banking Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col font-medium gap-2">
                <p>Select Bank</p>
              </div>
              <Select onValueChange={handleSelect}>
                <SelectTrigger
                  className="flex w-full"
                  icon={<BiSolidBank size={24} />}
                >
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  {ownerData.bank.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Display selected address */}
              {selectedEstate && selectedEstate.accountNumber && (
                <div className="flex flex-col gap-2">
                  <p className="font-medium">Account Numbers</p>
                  <ul className="list-disc list-inside">
                    {(Array.isArray(selectedEstate.accountNumber)
                      ? selectedEstate.accountNumber
                      : [selectedEstate.accountNumber]
                    ) // Convert string to array
                      .map((acc, index) => (
                        <li key={index}>{acc}</li>
                      ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href={"/owner"}>
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Return to Home
            </Button>
          </Link>

          <Button
            className="flex font-bold text-base text-black justify-center underline bg-transparent"
            onClick={logOut}
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : "Log Out"}
          </Button> 
        </div>
      </MainLayout>
    </>
  )
}
export default setting
