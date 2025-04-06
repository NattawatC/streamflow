"use client"

import { useState, useEffect } from "react"
import {
  getUserEstateId,
  getAllElectricityMeterById,
  getAllWaterMeterById,
} from "@/services/ownerService"
import { Separator } from "../ui/separator"
import ListOfMeterCard from "./listOfMeterCard"

interface Props {
  userId: string | undefined
}

interface ElectricityMeter {
  id: number
  floor_no: string
  room_no: number
  meter_no: string
  initial_value: number
  kWh: number
  image_url: string | null
}

interface WaterMeter {
  id: number
  floor_no: string
  room_no: number
  meter_no: string
  initial_value: number
  usage: number
  image_url: string | null
}

export function RetrieveMeters({ userId }: Props) {
  const [estateId, setEstateId] = useState<number | null>(null)
  const [elecMeterNum, setElecMeterNum] = useState<ElectricityMeter[]>([])
  const [waterMeterNum, setWaterMeterNum] = useState<WaterMeter[]>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserEstate = async () => {
      try {
        const { estateId, error } = await getUserEstateId(userId)

        if (error) {
          setError("Failed to fetch estate data")
          console.error(error)
          return
        }

        setEstateId(estateId)
      } catch (err) {
        setError("Failed to fetch estate data")
        console.error(err)
      }
    }

    fetchUserEstate()
  }, [userId])

  useEffect(() => {
    const fetchElectricityData = async () => {
      try {
        if (!estateId || typeof estateId !== "number") return // Ensure estateId is valid

        const { electricity, error } = await getAllElectricityMeterById(
          estateId
        )

        if (error) {
          setError("Failed to fetch electricity data")
          console.error(error)
          return
        }

        setElecMeterNum(electricity) // Store electricity data
      } catch (err) {
        setError("Failed to fetch electricity data")
        console.error(err)
      }
    }

    fetchElectricityData()
  }, [estateId])

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        if (!estateId || typeof estateId !== "number") return // Ensure estateId is valid

        const { water, error } = await getAllWaterMeterById(estateId)

        if (error) {
          setError("Failed to fetch water data")
          console.error(error)
          return
        }

        setWaterMeterNum(water)
      } catch (err) {
        setError("Failed to fetch water data")
        console.error(err)
      }
    }

    fetchWaterData()
  }, [estateId])

  const groupedMeters = elecMeterNum.reduce((acc, meter) => {
    if (!acc[meter.floor_no]) acc[meter.floor_no] = []

    // Find corresponding water meter for the same room
    const waterMeter = waterMeterNum.find(
      (wMeter) =>
        wMeter.room_no === meter.room_no && wMeter.floor_no === meter.floor_no
    )

    acc[meter.floor_no].push({
      roomNumber: meter.room_no,
      electricityNo: meter.meter_no,
      electricityUsage: meter.kWh || 0,
      waterNo: waterMeter?.meter_no || "N/A",
      waterUsage: waterMeter?.usage || 0,
      elecImageUrl: meter.image_url || "",
      waterImageUrl: waterMeter?.image_url || "",
    })

    return acc
  }, {} as Record<string, any[]>)

  if (error) {
    return <div className="text-red-500">{error}</div>
  }

  if (!estateId || (elecMeterNum.length === 0 && waterMeterNum.length === 0)) {
    return <div>Loading meter data...</div>
  }

  return (
    <>
      {Object.entries(groupedMeters).map(([floor, meters]) => (
        <div key={floor} className="mb-4">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap text-base font-bold">
                Floor {floor}
              </p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {meters.map((meter, index) => (
                <ListOfMeterCard
                  key={index}
                  roomNumber={meter.roomNumber}
                  electricityUsage={meter.electricityUsage}
                  electricityNo={meter.electricityNo}
                  elecImageUrl={meter.elecImageUrl}
                  waterUsage={meter.waterUsage}
                  waterNo={meter.waterNo}
                  waterImageUrl={meter.waterImageUrl}
                />
              ))}
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
