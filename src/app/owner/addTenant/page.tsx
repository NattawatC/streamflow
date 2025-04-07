"use client"
import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { AddTenantForm } from "@/components/addTenantForm"

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
