"use client"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import UtilityInfo from "@/components/utilityInfo"
import { Button } from "@/components/ui/button"
import { IoIosArrowDown } from "react-icons/io"
import { IoInformationCircle } from "react-icons/io5"
import { GoDotFill } from "react-icons/go"
import { IoIosArrowBack } from "react-icons/io"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import supabase from "@/config/supabaseClient"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"
import { useSearchParams } from "next/navigation"

interface EstateInfo {
  water_cost: number
  is_ready: boolean
}

interface WaterData {
  startDate: string
  endDate: string
  used: number
  initial_value: number
  image_url: string | ""
  // total: number
}

const water: NextPage = () => {
  const [waterData, setWaterData] = useState<WaterData | null>(null)
  const [estateInfo, setEstateInfo] = useState<EstateInfo | null>(null)
  const [roomNo, setRoomNo] = useState<string | null>(null)
  const [estateId, setEstateId] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const room_no = params.get("room_no")
    const estateId = params.get("id")
    setRoomNo(room_no)
    setEstateId(estateId)
  }, [])

  useEffect(() => {
    const fetchEstate = async () => {
      if (!estateId) return

      const { data: estate, error } = await supabase
        .from("estates")
        .select("*")
        .eq("id", estateId)
        .single()

      console.log(estate)

      if (error) {
        console.error("Error fetching water data:", error)
      } else {
        setEstateInfo({
          is_ready: estate.is_ready,
          water_cost: estate.water_cost,
        })
      }
    }

    fetchEstate()
  }, [estateId])

  useEffect(() => {
    const fetchWaterData = async () => {
      if (!roomNo) return

      const { data, error } = await supabase
        .from("water")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      if (error) {
        console.error("Error fetching water data:", error)
      } else {
        setWaterData({
          startDate: data.created_at,
          endDate: data.created_at,
          used: data.usage,
          initial_value: data.initial_value,
          image_url: data.image_url,
        })
      }
    }

    fetchWaterData()
  }, [roomNo])
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href={`/tenant?room_no=${roomNo}`}>
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row items-center gap-2">
          <h1 className="font-bold text-2xl">Water Information</h1>
          <Dialog>
            <DialogTrigger>
              <IoInformationCircle size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="flex text-left text-white">
                  Water Information
                </DialogTitle>
                <DialogDescription className="flex text-white justify-start flex-col text-left gap-2">
                  <span className="flex flex-row gap-2">
                    <GoDotFill size={14} className="mt-1" />
                    <span>
                      This page shows the water usage information in this month.
                    </span>
                  </span>
                  <span className="flex flex-row gap-2">
                    <GoDotFill size={14} className="mt-1" />
                    <span>
                      Clicking on the{" "}
                      <span className="text-custom-pink">
                        "Water Meter (Image)"{" "}
                      </span>
                      button to see the meter image.
                    </span>
                  </span>
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-3">
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex font-bold w-full justify-between">
                Water Meter (Image)
              </AccordionTrigger>
              <AccordionContent>
                {estateInfo?.is_ready ? (
                  waterData?.image_url ? (
                    <Image
                      src={waterData.image_url}
                      width={300}
                      height={300}
                      alt="qrcode"
                      priority
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No image available for this water meter
                    </p>
                  )
                ) : (
                  <p>Waiting for the Owner to double-check the meters...</p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {waterData && estateInfo ? (
            <UtilityInfo
              startDate={waterData.startDate}
              endDate={waterData.endDate}
              unit="m³"
              usage={waterData.used}
              cost={estateInfo.water_cost}
              total={waterData.used * estateInfo.water_cost}
            />
          ) : (
            <p className="text-center text-gray-500">Loading Data...</p>
          )}
        </div>
      </MainLayout>
    </>
  )
}
export default water
