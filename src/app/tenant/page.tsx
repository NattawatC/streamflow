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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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

interface Tenant {
  id: string
  first_name: string
  last_name: string
  room_no: string
  building_no: string
  floor_no: string
  payment_status: string
  estate_id: number
  receipt_url: string
}

const home: NextPage = () => {
  const [roomNo, setRoomNo] = useState<string | null>(null)
  const [estateId, setEstateId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const room_no = params.get("room_no")
    setRoomNo(room_no)
  }, [])

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
          setEstateId(data.estate_id)
          setTenant(data)
        }
      }

      fetchTenant()
    }
  }, [roomNo])

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
                <p>{tenant?.first_name}</p>
                <p>{tenant?.last_name}</p>
              </div>
            </div>

            <div className="flex flex-row justify-between">
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base">{tenant?.room_no}</p>
                <p className="text-sm">Room Number</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base">{tenant?.building_no}</p>
                <p className="text-sm">Building</p>
              </div>
              <div className="flex flex-col items-center gap-1">
                <p className="font-bold text-base">{tenant?.floor_no}</p>
                <p className="text-sm">Floor/Level</p>
              </div>
            </div>

            <div className="flex flex-row gap-2 items-center justify-center px-3 py-3 rounded-md bg-custom-gray">
              <p className="text-base font-bold">Payment Status:</p>
              {tenant?.payment_status == "true" ? (
                <p>Completed</p>
              ) : tenant?.payment_status == "waiting" ? (
                <p>Waiting for Review</p>
              ) : (
                <p>Incompleted</p>
              )}
            </div>

            {tenant?.receipt_url ? (
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="flex font-bold w-full justify-between">
                    E-Receipt
                  </AccordionTrigger>
                  <AccordionContent>
                    <span className="flex flex-col gap-2">
                      <span className="text-base">
                        Waiting for the owner to review...
                      </span>
                      <img
                        src={tenant?.receipt_url}
                        alt="Meter image"
                        className="w-full h-auto rounded shadow"
                      />
                    </span>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            ) : (
              <></>
            )}

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
                    room_no={tenant?.room_no}
                    estate_id={tenant?.estate_id}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col">
            <Separator className="h-[2px] rounded-sm" />
            <Link
              href={{
                pathname: `/tenant/setting`,
                query: { room_no: roomNo },
              }}
            >
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
            <Link
              href={{
                pathname: `/tenant/payment`,
                query: { room_no: roomNo, estate_id: estateId },
              }}
              className="flex items-center"
            >
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
