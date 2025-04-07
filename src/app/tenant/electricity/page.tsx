"use client"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import UtilityInfo from "@/components/utilityInfo"
import { Button } from "@/components/ui/button"
import { IoIosArrowDown } from "react-icons/io"
import { IoInformationCircle } from "react-icons/io5"
import { GoDotFill } from "react-icons/go"
import { IoIosArrowBack } from "react-icons/io"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import supabase from "@/config/supabaseClient"
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import Image from "next/image"

interface EstateInfo {
  electricity_cost: number
  is_ready: boolean
}

interface ElectricityData {
  startDate: string
  endDate: string
  used: number
  initial_value: number
  image_url: string | ""
  // total: number
}

const electricity: NextPage = () => {
  const [electricityData, setElectricityData] =
    useState<ElectricityData | null>(null)
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

      if (error) {
        console.error("Error fetching electricity data:", error)
      } else {
        setEstateInfo({
          is_ready: estate.is_ready,
          electricity_cost: estate.electricity_cost,
        })
      }
    }

    fetchEstate()
  }, [estateId])

  useEffect(() => {
    const fetchElectricityData = async () => {
      if (!roomNo) return

      const { data, error } = await supabase
        .from("electricity")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      if (error) {
        console.error("Error fetching electricity data:", error)
      } else {
        setElectricityData({
          startDate: data.created_at,
          endDate: data.created_at,
          used: data.kWh,
          initial_value: data.initial_value,
          image_url: data.image_url,
        })
      }
    }

    fetchElectricityData()
  }, [roomNo])

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href={`/tenant?room_no=${roomNo}`}>
          <IoIosArrowBack size={24} className="text-black" />
        </Link>

        <div className="flex flex-row items-center gap-2">
          <h1 className="font-bold text-2xl">Electricity Information</h1>
          <Dialog>
            <DialogTrigger>
              <IoInformationCircle size={24} />
            </DialogTrigger>
            <DialogContent>
              <DialogHeader className="flex flex-col gap-4">
                <DialogTitle className="flex text-left text-white">
                  Electricity Information
                </DialogTitle>
                <DialogDescription className="flex text-white justify-start flex-col text-left gap-2">
                  <span className="flex flex-row gap-2">
                    <GoDotFill size={14} className="mt-1" />
                    <span>
                      This page shows the electricity usage information in this
                      month.
                    </span>
                  </span>
                  <span className="flex flex-row gap-2">
                    <GoDotFill size={14} className="mt-1" />
                    <span>
                      Clicking on the{" "}
                      <span className="text-custom-pink">
                        "Electric Meter (Image)"{" "}
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
                Electric Meter (Image)
              </AccordionTrigger>
              <AccordionContent>
                {estateInfo?.is_ready ? (
                  electricityData?.image_url ? (
                    <Image
                      src={electricityData.image_url}
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
          {electricityData && estateInfo ? (
            <UtilityInfo
              startDate={electricityData.startDate}
              endDate={electricityData.endDate}
              unit="kWh"
              usage={electricityData.used}
              cost={estateInfo.electricity_cost}
              total={electricityData.used * estateInfo.electricity_cost}
            />
          ) : (
            <p className="text-center text-gray-500">Loading Data...</p>
          )}
        </div>
      </MainLayout>
    </>
  )
}
export default electricity
