"use client"

import { BiSolidBank } from "react-icons/bi"
import { useState } from "react"
import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CautionCard from "@/components/cautionCard"
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
import { MockData } from "@/interfaces/mockData"
import { BankInfo } from "@/interfaces/bank"

const mockData: MockData = {
  firstname: "Nattawat",
  lastname: "Chaokraisith",
  gender: "Male",
  age: 56,
  phoneNumber: "000-000-0000",
  roomNumber: 123,
  floorNumber: 123,
  BuildingNumber: 123,
  status: false,
  estate: {
    name: "The Home Ladkrabang",
    address: "691 ถนนฉลองกรุง 1 แยก 6 ลาดกระบัง",
    city: "Bangkok",
    zipCode: "10160",
    totalRoom: 99,
    totalBuilding: 99,
    totalFloor: 99,
    furnitureCost: 9999,
    roomCharge: 9999,
    electricityCost: 6,
    waterCost: 17,
  },
  tenant: [
    {
      firstname: "John",
      lastname: "Clark",
      room: 101,
      pStatus: false,
      rStatus: true,
    },
    {
      firstname: "Sarah",
      lastname: "Shelby",
      room: 102,
      pStatus: true,
      rStatus: false,
    },
    {
      firstname: "Tomb",
      lastname: "Raider",
      room: 103,
      pStatus: true,
      rStatus: true,
    },
  ],
}

const bank = [
  {
    name: "Bank of America",
    accountNumber: ["123456789", "987654321"],
  },
  {
    name: "Chase Bank",
    accountNumber: "987654321",
  },
  {
    name: "Wells Fargo",
    accountNumber: "456789123",
  },
  {
    name: "Citi Bank",
    accountNumber: "789123456",
  },
  {
    name: "HSBC",
    accountNumber: "321987654",
  },
]

const setting: NextPage = () => {
  const [selectedEstate, setSelectedEstate] = useState<BankInfo | null>()

  const handleSelect = (value: string) => {
    const bankData = bank.find((item) => item.name === value)
    if (bankData) {
      setSelectedEstate({
        name: bankData.name,
        accountNumber: Array.isArray(bankData.accountNumber)
          ? bankData.accountNumber
          : [bankData.accountNumber],
      })
    }
  }

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex flex-row justify-center gap-2">
          <h1 className="font-bold text-2xl">Profile</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex justify-end w-full">
            <Link href={"/tenant/editProfile"}>
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
                  {mockData.firstname} {mockData.lastname}
                </p>
                <p>{mockData.age}</p>
                <p>{mockData.gender}</p>
                <p>{mockData.phoneNumber}</p>
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
                  <p>{mockData.estate.name}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <p className="font-medium">Address:</p>
                <p>
                  {mockData.estate.address}, {mockData.estate.city},{" "}
                  {mockData.estate.zipCode}
                </p>
              </div>
              <div className="flex flex-row gap-2">
                <div className="flex flex-col font-medium gap-2">
                  <p>Furniture Cost (Baht):</p>
                  <p>Room Charge (Baht):</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>{mockData.estate.furnitureCost}</p>
                  <p>{mockData.estate.roomCharge}</p>
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
                <p>{mockData.estate.electricityCost}</p>
                <p>{mockData.estate.waterCost}</p>
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
                  {bank.map((item) => (
                    <SelectItem key={item.name} value={item.name}>
                      {item.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Display selected address */}
              {selectedEstate && selectedEstate.accountNumber.length > 0 && (
                <div className="flex flex-col gap-2">
                  <p className="font-medium">Account Numbers</p>
                  <ul className="list-disc list-inside">
                    {selectedEstate.accountNumber.map((acc, index) => (
                      <li key={index}>{acc}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <Link href={"/owner/home"}>
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Return to Home
            </Button>
          </Link>

          <Link
            href={"/login"}
            className="flex font-bold justify-center underline"
          >
            Log Out
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
export default setting
