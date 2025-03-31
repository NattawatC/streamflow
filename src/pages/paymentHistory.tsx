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
        <Link href="/owner/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row justify-center">
            <h1 className="font-bold text-2xl">Payment History</h1>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-bold text-base">Select the Utility</p>
            <div className="flex flex-row gap-5">
              <div className="flex justify-center bg-custom-green rounded-lg w-full">
                <button>
                  <div className="flex flex-col gap-2 justify-center items-center p-4">
                    <MdOutlineElectricBolt size={24} />
                    <p className="text-base font-bold">Electricity</p>
                  </div>
                </button>
              </div>
              <div className=" flex justify-center bg-custom-purple rounded-lg w-full">
                <button>
                  <div className="flex flex-col gap-2 justify-center items-center p-4">
                    <FaWater size={24} />
                    <p className="text-base font-bold">Water</p>
                  </div>
                </button>
              </div>
            </div>
          </div>
          {/* display here */}
        </div>
      </MainLayout>
    </>
  )
}
export default paymentHistory
