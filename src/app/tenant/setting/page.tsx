"use client"

import { NextPage } from "next"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import CautionCard from "@/components/cautionCard"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import { FiEdit } from "react-icons/fi"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"

interface Tenant {
  id: string
  first_name: string
  last_name: string
  age: string
  gender: string
  year_of_study: string
  phone_number: string
  room_no: string
  building_no: string
  floor_no: string
  payment_status: boolean
  address: string
  city: string
  zip_code: string
  estate_id: number
}

const setting: NextPage = () => {
  const searchParams = useSearchParams()
  const roomNo = searchParams.get("room_no")
  const [tenant, setTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    if (roomNo) {
      const fetchTenant = async () => {
        const { data, error } = await supabase
          .from("tenants")
          .select("*")
          .eq("room_no", roomNo)
          .single()

        if (error) {
          console.error("Error fetching tenant:", error)
        } else {
          setTenant(data)
        }
      }

      fetchTenant()
    }
  }, [roomNo])

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex flex-row justify-center gap-2">
          <h1 className="font-bold text-2xl">Profile</h1>
        </div>
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex justify-end w-full">
            <Link
              href={{
                pathname: `/tenant/edit`,
                query: { room_no: roomNo },
              }}
            >
              <FiEdit size={24} />
            </Link>
          </div>
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
                <p>Year Of Study:</p>
                <p>Phone Number:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>
                  {tenant?.first_name} {tenant?.last_name}
                </p>
                <p>{tenant?.age}</p>
                <p>{tenant?.gender}</p>
                <p>{tenant?.year_of_study}</p>
                <p>{tenant?.phone_number}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Address Information</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Address:</p>
                <p>{tenant?.address}</p>
              </div>
              <div className="flex flex-row gap-4">
                <div className="flex flex-col font-medium gap-2">
                  <p>City:</p>
                  <p>Zip Code:</p>
                </div>
                <div className="flex flex-col gap-2">
                  <p>{tenant?.city}</p>
                  <p>{tenant?.zip_code}</p>
                </div>
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
                <p>Builing:</p>
                <p>Level/Floor:</p>
                <p>Room Numnber:</p>
              </div>
              <div className="flex flex-col gap-2">
                <p>{tenant?.building_no}</p>
                <p>{tenant?.floor_no}</p>
                <p>{tenant?.room_no}</p>
              </div>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

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
                <p>
                  {tenant?.payment_status
                    ? "Payment Completed"
                    : "Payment Incomplete"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <CautionCard yearOfStudy={tenant?.year_of_study} />

        <div className="flex flex-col gap-3">
          <Link
            href={{
              pathname: `/tenant`,
              query: { room_no: roomNo },
            }}
          >
            <Button className="font-bold bg-custom-green text-black w-full text-base gap-2">
              Return to Home
            </Button>
          </Link>

          <Link
            href={"/login"}
            className="flex font-bold justify-center underline"
          >
            Log Out
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
export default setting
