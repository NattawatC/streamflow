"use client"

import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { MdOutlineElectricBolt } from "react-icons/md"
import { FaWater } from "react-icons/fa6"
import { MonthYearPicker } from "@/components/calendarNoDate"
import { useState } from "react"
import Receipt from "@/components/receipt"
import { Separator } from "@/components/ui/separator"

const data = {
  startDate: "2021/10/01",
  endDate: "2021/10/30",
  TotalCost: 9999,
  electricity: {
    used: 100,
    cost: 1000,
    total: 10000,
  },
  water: {
    used: 100,
    cost: 1000,
    total: 10000,
  },
  furniture: 3000,
  roomCharge: 3000,
}

const paymentHistory: NextPage = () => {
  const [selectedDate, setSelectedDate] = useState<{
    month: number
    year: number
  } | null>(null)
  function handleDateChange(month: number, year: number) {
    setSelectedDate({ month, year })
    console.log(`Selected month: ${month + 1}, year: ${year}`)
  }
  return (
    <>
      <MainLayout className="flex flex-col gap-3">
        {/* change path */}
        <Link href="/tenant/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center">
            <h1 className="font-bold text-2xl">Payment History</h1>
          </div>
          <div className="flex flex-col items-center bg-custom-gray-background p-3 rounded-2xl">
            <MonthYearPicker onDateSelect={handleDateChange} />
          </div>

          {selectedDate && (
            <>
              <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-2xl w-full">
                <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
                  <div className="flex flex-row gap-2">
                    <p className="whitespace-nowrap font-medium">
                      Total Cost (Baht)
                    </p>
                    <div className="flex w-full items-center">
                      <Separator className="h-[2px] rounded-sm w-full justify-center" />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between items-center font-bold">
                    <p className="font-bold text-2xl">{data.TotalCost}</p>
                  </div>
                </div>

                <div className="w-full">
                  <Receipt
                    startDate={data.startDate}
                    endDate={data.endDate}
                    eUsed={data.electricity.used}
                    eCost={data.electricity.cost}
                    wUsed={data.water.used}
                    wCost={data.water.cost}
                    furniture={data.furniture}
                    roomCharge={data.roomCharge}
                  />
                </div>
              </div>
            </>
          )}
        </div>
      </MainLayout>
    </>
  )
}
export default paymentHistory
