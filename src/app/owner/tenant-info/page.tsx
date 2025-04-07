"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { tenantData } from "@/api/interfaces/tenantData"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"

const tenantInfo: NextPage = () => {
  const [id, setId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const id = params.get("id")
    setId(id)
  }, [])

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
      <MainLayout className="flex flex-col gap-7">
        {/* change path */}
        <Link href="/owner">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">
            {tenant.first_name} {tenant.last_name}
          </h1>
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
              <div className="flex flex-col font-medium gap-2">
                <p>Name:</p>
                <p>Age:</p>
                <p>Gender:</p>
                <p>Phone Number:</p>
                <p>Year Of Study:</p>
              </div>
              <div className="flex flex-col gap-2">
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

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Room Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col font-medium gap-2">
                <p>Building:</p>
                <p>Level/Floor:</p>
                <p>Room Numnber:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{tenant.building_no}</p>
                <p>{tenant.floor_no}</p>
                <p>{tenant.room_no}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          {/* Payment Information */}
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Payment Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row gap-4">
              <div className="flex flex-col font-medium gap-2">
                <p>Status:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{tenantData.status}</p>
              </div>
            </div>
            {/* Review Page */}
            {tenantData.status === "Payment Incomplete" ? (
              <>
                <Link href="/owner/review">
                  <div className="flex bg-custom-pink text-black py-1 px-2 rounded-sm justify-center font-medium text-sm">
                    Review
                  </div>
                </Link>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>

        {/* change path */}
        <div className="flex flex-col gap-3">
          <Link href={`/owner/edit-tenant?id=${id}`}>
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Edit Tenant Information
            </Button>
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
export default tenantInfo
