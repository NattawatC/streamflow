"use client"

import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { CalendarForm } from "@/components/calendarForm"

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
        <div className="flex flex-row gap-10 bg-custom-gray-background p-3 rounded-2xl justify-start">
          <CalendarForm></CalendarForm>
        </div>
      </MainLayout>
    </>
  )
}
export default listOfMeter
