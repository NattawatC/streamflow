"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"
import { tenantData } from "@/interfaces/tenantData"

const tenantInfo: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        {/* change path */}
        <Link href="/owner/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">
            {tenantData.firstname} {tenantData.lastname}
          </h1>
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
                <p>Phone Number:</p>
                <p>Year Of Study:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  {tenantData.firstname} {tenantData.lastname}
                </p>
                <p>{tenantData.age}</p>
                <p>{tenantData.gender}</p>
                <p>{tenantData.phoneNumber}</p>
                <p>{tenantData.yearOfStudy}</p>
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
                <p>{tenantData.building}</p>
                <p>{tenantData.floor}</p>
                <p>{tenantData.roomNumber}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          {/* Payment Information */}
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
                <p>{tenantData.status}</p>
              </div>
            </div>
            {/* Review Page */}
            {mockData.status === "Payment Incomplete" ? (
              <>
                <Link href="/owner/review">
                  <div className="flex bg-custom-pink text-black py-1 px-2 rounded-sm justify-center font-medium text-sm">
                    Review
                  </div>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* change path */}
        <div className="flex flex-col gap-3">
          <Link href={"/editTenantInfo"}>
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
