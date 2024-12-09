"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import { IoIosArrowBack } from "react-icons/io"
import { EditTenantForm } from "@/components/editTenantForm"
import { LoginOwnerForm } from "@/components/login/ownerForm"


const mustdel: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <EditTenantForm></EditTenantForm>
        {/* <LoginOwnerForm></LoginOwnerForm> */}
      </MainLayout>
    </>
  )
}
export default mustdel
