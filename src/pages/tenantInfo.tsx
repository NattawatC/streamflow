"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"

const mockData = {
  firstname: "Nattawat",
  lastname: "Chaokraisith",
  age: 20,
  gender: "Male",
  phoneNumber: "000-000-0000",
  building: 99,
  floor: 99,
  roomNumber: 1234,
  status: "Payment Incomplete",
  yearOfStudy: 4,
}

const tenantInfo: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        {/* change path */}
        <Link href="/tenant/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">{mockData.firstname} {mockData.lastname}</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Basic Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col font-medium gap-2">
                <p>Name:</p>
                <p>Age:</p>
                <p>Gender:</p>
                <p>Year Of Study:</p>
                <p>Phone Number:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  {mockData.firstname} {mockData.lastname}
                </p>
                <p>{mockData.age}</p>
                <p>{mockData.gender}</p>
                <p>{mockData.yearOfStudy}</p>
                <p>{mockData.phoneNumber}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />


          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Room Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col font-medium gap-2">
                <p>Builing:</p>
                <p>Level/Floor:</p>
                <p>Room Numnber:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{mockData.building}</p>
                <p>{mockData.floor}</p>
                <p>{mockData.roomNumber}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Payment Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col font-medium gap-2">
                <p>Status:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{mockData.status}</p>
              </div>
            </div>
          </div>
        </div>

        
{/* change path */}
        <div className="flex flex-col gap-3">
          <Link href={"/tenant/home"}> 
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Edit Room Information
            </Button>
          </Link>

        </div>
      </MainLayout>
    </>
  )
}
export default tenantInfo
