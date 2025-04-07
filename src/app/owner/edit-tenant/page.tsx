"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { EditTenantForm } from "@/components/editTenantForm"
import { tenantData } from "@/api/interfaces/tenantData"
import { useSearchParams } from "next/navigation"
import { Suspense, useEffect, useState } from "react"
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
        <Suspense fallback={<div>Loading...</div>}>
          <Link href={`/owner/tenant-info?id=${id}`}>
            <IoIosArrowBack size={24} className="text-black" />
          </Link>
        </Suspense>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Edit Tenant</h1>
        </div>
        <div className=" flex flex-col gap-3">
          <EditTenantForm
            id={id}
            first_name={tenant.first_name}
            last_name={tenant.last_name}
            age={tenant.age}
            gender={tenant.gender}
            phone_number={tenant.phone_number}
            year_of_study={tenant.year_of_study}
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
