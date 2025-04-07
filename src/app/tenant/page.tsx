"use client"

import { NextPage } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"

import { MdOutlineElectricBolt } from "react-icons/md"
import { FaWater } from "react-icons/fa6"
import { VscGraphLine } from "react-icons/vsc"
import { IoIosArrowForward } from "react-icons/io"
import Utility from "@/components/utilityButton"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"

const utilities = [
  {
    icon: MdOutlineElectricBolt,
    title: "Electricity",
    color: "bg-custom-green",
    href: "/electricity",
  },
  {
    icon: FaWater,
    title: "Water",
    color: "bg-custom-purple",
    href: "/water",
  },
  // {
  //   icon: VscGraphLine,
  //   title: "Utility Graph",
  //   color: "bg-custom-pink",
  //   href: "/graph",
  // },
]

interface Resident {
  id: string
  first_name: string
  last_name: string
  room_no: string
  building_no: string
  floor_no: string
  payment_status: boolean
  estate_id: number
}

const home: NextPage = () => {
  const searchParams = useSearchParams()
  const roomNo = searchParams.get("room_no")
  const [resident, setResident] = useState<Resident | null>(null)

  useEffect(() => {
    if (roomNo) {
      const fetchResident = async () => {
        const { data, error } = await supabase
          .from("tenants")
          .select("*")
          .eq("room_no", roomNo)
          .single()

        if (error) {
          console.error("Error fetching resident:", error)
        } else {
          setResident(data)
        }
      }

      fetchResident()
    }
  }, [roomNo])

  console.log(resident)

  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-8 pb-16">
          <h1 className="flex text-2xl font-bold justify-center">Home</h1>
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-3 items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div className="flex flex-row gap-2 text-xl font-bold justify-center">
                <p>{resident?.first_name}</p>
                <p>{resident?.last_name}</p>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base">{resident?.room_no}</p>
                <p className="text-sm">Room Number</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base">{resident?.building_no}</p>
                <p className="text-sm">Building</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base">{resident?.floor_no}</p>
                <p className="text-sm">Floor/Level</p>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center px-3 py-3 rounded-md bg-custom-gray">
              <p className="text-base font-bold">Payment Status</p>
              {resident?.payment_status ? (
                <div className="font-bold text-gray-700 rounded-full flex items-center justify-center bg-[#D7FC6E] w-3 h-3"></div>
              ) : (
                <div className="rounded-full flex items-center justify-center bg-[#FF0000] w-3 h-3"></div>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-bold">Utility Usage</p>

              <div className="grid grid-cols-2 gap-5">
                {utilities.map((util) => (
                  <Utility
                    key={util.title}
                    title={util.title}
                    color={util.color}
                    href={util.href}
                    Icon={util.icon}
                    room_no={resident?.room_no}
                    estate_id={resident?.estate_id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Separator className="h-[2px] rounded-sm" />
            <Link href={"/tenant/setting"}>
              <Button className="w-full bg-white text-black text-base font-bold justify-between">
                Account Setting
                <IoIosArrowForward size={20} />
              </Button>
            </Link>
            <Separator className="h-[2px] rounded-sm" />
          </div>
        </div>

        <div className="fixed bottom-0 left-0 w-full bg-custom-gray-background text-black rounded-t-3xl justify-center">
          <div className="flex flex-row container mx-auto p-4 justify-between">
            <div className="flex flex-col">
              <p className="text-base font-bold">Payment</p>
              <p className="text-sm font-normal">Scan barcode and Pay</p>
            </div>
            <Link href={"/payment"} className="flex items-center">
              <Button className="rounded-full bg-custom-pink text-black font-bold">
                Pay Now
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default home
