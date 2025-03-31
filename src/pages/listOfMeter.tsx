"use client"

import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { CalendarForm } from "@/components/calendarForm"
import { ownerData } from "@/interfaces/ownerData"
import { Separator } from "@/components/ui/separator"
import ListOfMeterCard from "@/components/listOfMeterCard"
import { List } from "lucide-react"
import { MonthYearPicker } from "@/components/calendarNoDate"

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
          {/* <MonthYearPicker></MonthYearPicker> */}
        </div>
        {Object.entries(
          ownerData.estate.electricityMeter.reduce((acc, meter) => {
            if (!acc[meter.floorNumber]) acc[meter.floorNumber] = []

            // Find the corresponding water meter for the same room
            const waterMeter = ownerData.estate.waterMeter.find(
              (wMeter) => wMeter.roomNumber === meter.roomNumber
            )

            acc[meter.floorNumber].push({
              roomNumber: meter.roomNumber,
              electricityNo: meter.meterNumber,
              electrictyUsage: meter.elecUsage || 0, // Ensure a default value
              waterNo: waterMeter?.meterNumber || 0, // Default if no water meter found
              waterUsage: waterMeter?.waterUsage || 0, // Default if no water usage data
            })

            return acc
          }, {} as Record<number, any[]>)
        ).map(([floor, meters]) => (
          <div key={floor} className="mb-4">
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
                    electrictyUsage={meter.electrictyUsage}
                    electricityNo={meter.electricityNo}
                    waterUsage={meter.waterUsage}
                    waterNo={meter.waterNo}
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
