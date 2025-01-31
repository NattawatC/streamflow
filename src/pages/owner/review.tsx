"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/router"
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
const review: NextPage = () => {
  const [selectedValue, setSelectedValue] = useState<string>("")
  const router = useRouter()
  const handleSubmit = () => {
    console.log("Selected Value:", selectedValue || "No option selected")
    router.push("/tenantInfo")
  }
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
            <RadioGroup
              defaultValue={selectedValue}
              onValueChange={setSelectedValue}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="Approve" id="Approve" />
                <Label
                  htmlFor="Approve"
                  className={
                    selectedValue === "Approve"
                      ? "text-base font-bold"
                      : "text-base"
                  }
                >
                  Approved
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="notApprove" id="notApprove" />
                <Label
                  htmlFor="notApprove"
                  className={
                    selectedValue === "notApprove"
                      ? "text-base font-bold"
                      : "text-base"
                  }
                >
                  Not Approved
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Submit review
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle className="flex text-left text-white">
                Approval
              </DialogTitle>
              <DialogDescription>
                <div className="flex flex-col gap-2">
                  <p className="text-white text-left">Are you sure?</p>
                </div>
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              <div className="flex flex-row gap-4">
                <Button
                  onClick={handleSubmit}
                  className="w-full bg-custom-pink text-black "
                >
                  Confirm
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-full text-black border "
                    variant={"outline"}
                  >
                    Cancel
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {/* <Button
          onClick={handleSubmit}
          className="font-bold bg-custom-green text-black w-full text-base gap-2"
        >
          Submit Review
        </Button> */}
      </MainLayout>
    </>
  )
}
export default review
