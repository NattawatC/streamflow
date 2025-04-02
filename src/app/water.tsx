"use client"
import { NextPage } from "next"
import UtilityInfo from "@/components/utilityInfo"
import { Button } from "@/components/ui/button"
import { IoIosArrowDown } from "react-icons/io"
import { IoInformationCircle } from "react-icons/io5"
import { GoDotFill } from "react-icons/go"
import { IoIosArrowBack } from "react-icons/io"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

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
        <Link href="/tenant/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-bold text-2xl">Water Information</h1>
          <Dialog>
            <DialogTrigger>
              <IoInformationCircle size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="flex text-left text-white">
                  Water Information
                </DialogTitle>
                <DialogDescription className="flex text-white justify-start flex-col text-left gap-2">
                  <div className="flex flex-row gap-2">
                    <GoDotFill size={14} className="mt-1" />
                    <p>
                      This page shows the water usage information in this
                      month.
                    </p>
                  </div>
                  <div className="flex flex-row gap-2">
                    <GoDotFill size={14} className="mt-1" />
                    <p>
                      Clicking on the{" "}
                      <span className="text-custom-pink">
                        "Water Meter (Image)"{" "}
                      </span>
                      button to see the meter image.
                    </p>
                  </div>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
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
