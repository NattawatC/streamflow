"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"
import { EditTenantForm } from "@/components/editTenantForm"
import { EditOwnerProfile } from "@/components/editOwnerProfile"

const mockData = {
  firstname: "John",
  lastname: "Doe",
  age: 20,
  gender: "Male",
  phoneNumber: "000-000-0000",
  yearOfStudy: 4,
}

const edit: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-5">
        {/* change path */}
        <Link href="/owner/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Edit Profile</h1>
        </div>
        <EditOwnerProfile></EditOwnerProfile>
        

      </MainLayout>
    </>
  )
}
export default edit
