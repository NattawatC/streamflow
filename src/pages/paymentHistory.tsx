"use client"

import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { MdOutlineElectricBolt } from "react-icons/md"
import { FaWater } from "react-icons/fa6"
const paymentHistory: NextPage = () => {
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
          <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-3 rounded-2xl"></div>
        </div>
      </MainLayout>
    </>
  )
}
export default paymentHistory
