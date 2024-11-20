"use client"
import { NextPage } from "next"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MainLayout } from "@/components/layout"
import Link from "next/link"

import { BiSolidUserRectangle } from "react-icons/bi"
import { AddTenantForm } from "@/components/addTenantForm"

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

const addTenant: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">New Tenant</h1>
        <AddTenantForm />
      </MainLayout>
    </>
  )
}
export default addTenant
