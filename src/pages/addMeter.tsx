"use client"

import { NextPage } from "next"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import { IoIosArrowForward } from "react-icons/io"
import { Button } from "@/components/ui/button"
import { AddMeterForm } from "@/components/addMeterForm"

const addMeter: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Meter Setup</h1>
        </div>
        <div className="flex flex-col gap-3 bg-custom-gray-background p-3 rounded-lg">
          <p className="font-bold text-xl">Completed</p>
          <div className="flex flex-row gap-5">{/* add card here */}</div>
        </div>
        <div className="flex flex-col">
          <Separator className="h-[2px] rounded-sm" />
          <Button className="w-full bg-white text-black text-base font-bold justify-between">
            Electricity Meters
            <IoIosArrowForward size={20} />
          </Button>
          <Separator className="h-[2px] rounded-sm" />
          <Button className="w-full bg-white text-black text-base font-bold justify-between">
            Water Meters
            <IoIosArrowForward size={20} />
          </Button>
          <Separator className="h-[2px] rounded-sm" />
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap text-base font-bold">
                Meter Information
              </p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <AddMeterForm></AddMeterForm>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="flex w-full text-base font-bold bg-custom-green text-black">
            Update Meter
          </Button>
          <Link href={"/owner/home"}>
            <Button
              variant={"outline"}
              className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2 underline"
            >
              Cancle
            </Button>
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
export default addMeter
