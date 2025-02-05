"use client"

import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { EditOwnerProfile } from "@/components/editOwnerProfile"

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
