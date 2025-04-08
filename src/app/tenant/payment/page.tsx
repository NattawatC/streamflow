"use client"

import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { Separator } from "@/components/ui/separator"
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
import Receipt from "@/components/receipt"
import BankInfo from "@/components/bankInfo"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"

interface EstateInfo {
  waterInitialCost: number | undefined
  electricityInitialCost: number | undefined
  furniture: number
  roomCharge: number
  is_ready: boolean
}

interface ReceiptData {
  endDate: string
  elecInitial: number
  kWh: number
  eCost: number
  waterInitial: number
  usage: number
  wCost: number
}

interface TotalInfo {
  totalElectricCost: number
  totalWaterCost: number
  totalFinalCost: number
}

const Payment: NextPage = () => {
  const [roomNo, setRoomNo] = useState<string | null>(null)
  const [estateId, setEstateId] = useState<string | null>(null)
  const [estateInfo, setEstateInfo] = useState<EstateInfo | null>(null)
  const [receiptInfo, setReceiptInfo] = useState<ReceiptData | null>(null)
  const [totalInfo, setTotalInfo] = useState<TotalInfo | null>(null)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const room_no = params.get("room_no")
      const estateId = params.get("estate_id")
      setRoomNo(room_no)
      setEstateId(estateId)
    }
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
        console.error("Error fetching water data:", error)
      } else {
        setEstateInfo({
          is_ready: estate.is_ready,
          electricityInitialCost: estate.electricity_cost,
          waterInitialCost: estate.water_cost,
          furniture: estate.furniture_cost,
          roomCharge: estate.room_charge,
        })
      }
    }

    fetchEstate()
  }, [estateId])

  useEffect(() => {
    const fetcReceiptData = async () => {
      if (!roomNo) return

      const { data: electData } = await supabase
        .from("electricity")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      const { data: waterData } = await supabase
        .from("water")
        .select("*")
        .eq("room_no", roomNo)
        .single()

      if (electData && waterData) {
        setReceiptInfo({
          endDate: electData.created_at,
          elecInitial: electData.initial_value,
          kWh: electData.kWh,
          eCost: electData.cost,
          waterInitial: waterData.initial_value,
          usage: waterData.usage,
          wCost: waterData.cost,
        })
      }
    }

    fetcReceiptData()
  }, [roomNo])

  useEffect(() => {
    if (
      estateInfo &&
      receiptInfo &&
      estateInfo.electricityInitialCost !== undefined &&
      estateInfo.waterInitialCost !== undefined
    ) {
      const totalElectricCost =
        estateInfo.electricityInitialCost *
        (receiptInfo.kWh - receiptInfo.elecInitial)
      const totalWaterCost =
        estateInfo.waterInitialCost *
        (receiptInfo.usage - receiptInfo.waterInitial)
      const totalFinalCost =
        totalElectricCost +
        totalWaterCost +
        estateInfo.furniture +
        estateInfo.roomCharge

      setTotalInfo({
        totalElectricCost,
        totalWaterCost,
        totalFinalCost,
      })
    }
  }, [estateInfo, receiptInfo])

  if (!isClient) {
    return null
  }

  return (
    <MainLayout className="flex flex-col gap-8 items-center">
      <h1 className="flex text-2xl font-bold justify-center">Payment</h1>
      <span className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg w-full">
        <span className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          <span className="flex flex-row gap-2">
            <span className="whitespace-nowrap font-medium">
              Total Cost (Baht)
            </span>
            <span className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </span>
          </span>

          <span className="flex flex-row justify-between items-center font-bold">
            <span className="font-bold text-2xl">
              {totalInfo?.totalFinalCost ?? "Loading..."}
            </span>
          </span>
        </span>
        <Accordion type="single" collapsible className="flex-grow-0 w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex gap-3 font-medium w-full text-base items-center justify-center">
              View more Details
            </AccordionTrigger>
            <AccordionContent className="gap-4 p-0 pb-4">
              {receiptInfo && estateInfo && totalInfo && (
                <Receipt
                  startDate="01-04-2025"
                  endDate={receiptInfo.endDate}
                  eUsed={receiptInfo.kWh - receiptInfo.elecInitial}
                  eCost={totalInfo.totalElectricCost}
                  wUsed={receiptInfo.usage - receiptInfo.waterInitial}
                  wCost={totalInfo.totalWaterCost}
                  furniture={estateInfo.furniture}
                  roomCharge={estateInfo.roomCharge}
                />
              )}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </span>

      <div>
        <p>The Receipt</p>
      </div>
    </MainLayout>
  )
}

export default Payment
