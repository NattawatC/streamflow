"use client"
import { NextPage } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/layout"
import Link from "next/link"

import { BiSolidUserRectangle } from "react-icons/bi"

const mockData = {
    firstname: "Nattawat",
    lastname: "Chaokraisith",
    age: 20,
    gender: "Male",
    phoneNumber: "000-000-0000",
    address: "691 ถนนฉลองกรุง 1 แยก 6 ลาดกระบัง",
    city: "Bangkok",
    zipCode: 10110,
    building: 99,
    floor: 99,
    roomNumber: 1234,
    status: "Payment Incomplete",
    yearOfStudy: 4,
  }

const editProfile: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex justify-center gap-2">
          <h1 className="font-bold text-2xl">Edit</h1>
        </div>

        <p className="font-medium text-lg">Basic Information</p>
        <div className="flex flex-col gap-2">
          <label className="font-bold">First Name</label>
          <Input
            type="password"
            className="text-sm"
            icon={<BiSolidUserRectangle size={24} />}
            placeholder={mockData.firstname}
          />
        </div>

        <div className="flex flex-col gap-3">
          <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
            Save
          </Button>

          <Link href={"/tenant/setting"}>
            <Button
              variant={"outline"}
              className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2"
            >
              Cancle
            </Button>
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
export default editProfile
