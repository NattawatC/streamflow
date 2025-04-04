"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { EditTenantForm } from "@/components/editTenantForm"
import { tenantData } from "@/interfaces/tenantData"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"

const editTenantInfo: NextPage = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const [tenant, setTenant] = useState<any>(null)

  useEffect(() => {
    const fetchTenant = async () => {
      if (!id) return
      const { data, error } = await supabase
        .from("tenants")
        .select("*")
        .eq("id", id)
        .single()

      if (error) {
        console.error("Error fetching tenant:", error.message)
      } else {
        setTenant(data)
      }
    }

    fetchTenant()
  }, [id])

  if (!tenant) {
    return <div>Loading...</div>
  }

  return (
    <>
      <MainLayout className="flex flex-col gap-5">
        {/* change path */}
        <Link href={`/owner/tenant-info?id=${id}`}>
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
              <div className="flex flex-col font-medium gap-2 text-nowrap ">
                <p>Name:</p>
                <p>Age:</p>
                <p>Gender:</p>
                <p>Phone Number:</p>
                <p>Year Of Study:</p>
              </div>
              <div className="flex flex-col gap-2 text-nowrap">
                <p>
                  {tenant.first_name} {tenant.last_name}
                </p>
                <p>{tenant.age}</p>
                <p>{tenant.gender}</p>
                <p>{tenant.phone_number}</p>
                <p>{tenant.year_of_study}</p>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex flex-col gap-3">
          <h1 className="font-bold text-base">Room Information</h1>
          <EditTenantForm
            id={id}
            building_no={tenant.building_no}
            floor_no={tenant.floor_no}
            room_no={tenant.room_no}
          />
        </div>
      </MainLayout>
    </>
  )
}
export default editTenantInfo
