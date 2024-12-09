"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"
import { EditTenantForm } from "@/components/editTenantForm"

const mockData = {
  firstname: "John",
  lastname: "Doe",
  age: 20,
  gender: "Male",
  phoneNumber: "000-000-0000",
  yearOfStudy: 4,
}

const editTenantInfo: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-5">
        {/* change path */}
        <Link href="owner/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Edit Tenant</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Basic Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col font-medium gap-2 text-nowrap">
                <p>Name:</p>
                <p>Age:</p>
                <p>Gender:</p>
                <p>Phone Number:</p>
                <p>Year Of Study:</p>
              </div>
              <div className="flex flex-col gap-2 text-nowrap">
                <p>
                  {mockData.firstname} {mockData.lastname}
                </p>
                <p>{mockData.age}</p>
                <p>{mockData.gender}</p>
                <p>{mockData.phoneNumber}</p>
                <p>{mockData.yearOfStudy}</p>
              </div>
            </div>
          </div>       
        </div>
        <div className=" flex flex-col gap-3">
          <h1 className="font-bold text-base">Room Information</h1>
          <EditTenantForm></EditTenantForm>
        </div>
        

      </MainLayout>
    </>
  )
}
export default editTenantInfo
