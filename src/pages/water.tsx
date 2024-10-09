"use client"
import { NextPage } from "next"
import UtilityInfo from "@/components/utilityInfo"
import { Button } from "@/components/ui/button"
import { IoIosArrowDown } from "react-icons/io"
import { IoInformationCircleOutline } from "react-icons/io5"
import { IoIosArrowBack } from "react-icons/io"
import { MainLayout } from "@/components/layout"
import Link from "next/link"

const mockData = {
  startDate: "2021-10-01",
  endDate: "2021-10-30",
  used: 100,
  cost: 1000,
  total: 10000,
}

const electricity: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href="/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-bold text-2xl">Water Information</h1>
          <IoInformationCircleOutline size={24} className="text-black" />
        </div>
        <UtilityInfo
          startDate={mockData.startDate}
          endDate={mockData.endDate}
          unit="m³"
          usage={mockData.used}
          cost={mockData.cost}
          total={mockData.total}
        />
        <Button className="font-bold bg-custom-purple text-black w-full text-base gap-2">
          Water Meter (Image)
          <IoIosArrowDown size={20} />
        </Button>
      </MainLayout>
    </>
  )
}
export default electricity
