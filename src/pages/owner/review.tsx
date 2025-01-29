"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useState } from "react";




const review: NextPage = () => {
    const [selectedValue, setSelectedValue] = useState<string>("");
    const handleSubmit = () => {
        console.log("Selected Value:", selectedValue || "No option selected");
    };
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href="/tenantInfo">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Review Receipt</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
            <div>*Image here*</div>
            <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
        <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Approval</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <RadioGroup defaultValue={selectedValue} onValueChange={setSelectedValue}>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="approve" id="approve1" />
                    <Label htmlFor="approve1" className="font-bold text-sm">Approved</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <RadioGroupItem value="notapprove" id="notapprove1" />
                    <Label htmlFor="notapprove1">Not Approved</Label>
                </div>
            </RadioGroup>
          </div>       
        </div>
        <Button onClick={handleSubmit} className="font-bold bg-custom-green text-black w-full text-base gap-2">
            Submit Review
        </Button> 
        

      </MainLayout>
    </>
  )
}
export default review
