"use client"

import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { CalendarForm } from "@/components/calendarForm"
import { ownerData } from "@/interfaces/ownerData"
import { Separator } from "@/components/ui/separator"
import WaterMeterCard from "@/components/waterMeterCard"
import ListOfMeterCard from "@/components/listOfMeterElecCard"
import { List } from "lucide-react"

const listOfMeter: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        {/* change path */}
        <Link href="/owner/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">List Of Meter</h1>
        </div>
        <div className="flex bg-custom-gray-background p-3 rounded-2xl justify-center">
          <CalendarForm></CalendarForm>
        </div>
        {Object.entries(
          ownerData.estate.electricityMeter.reduce((acc, meter) => {
            if (!acc[meter.floorNumber]) acc[meter.floorNumber] = []
            acc[meter.floorNumber].push(meter)
            return acc
          }, {} as Record<number, typeof ownerData.estate.electricityMeter>)
        ).map(([floor, meters]) => (
          <div key={floor} className="mb-5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <p className="whitespace-nowrap text-base font-bold">
                  Floor {floor}
                </p>
                <div className="flex w-full items-center">
                  <Separator className="h-[2px] rounded-sm w-full justify-center" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {meters.map((meter, index) => (
                  <ListOfMeterCard
                    key={index}
                    roomNumber={meter.roomNumber}
                    electrictyUsage={meter.elecUsage}
                    electricityNo={meter.meterNumber}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </MainLayout>
    </>
  )
}
export default listOfMeter
