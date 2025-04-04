"use client"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect } from "react"
import {
  getUserEstateId,
  getAllElectricityMeterById,
} from "@/services/ownerService"
import { Separator } from "../ui/separator"
import ElectricityMeterCard from "../electricityMeterCard"

interface Props {
  userId: string | undefined
}

interface ElectricityMeter {
  id: number
  estate_id: number
  floor_no: string
  room_no: number
  meter_no: string
  initial_value: number
  kWh: number
  created_at: string
}

export function ElecAccordion({ userId }: Props) {
  const [estateId, setEstateId] = useState<number | null>(null)
  const [meterNum, setMeterNum] = useState<ElectricityMeter[]>([])

  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserEstate = async () => {
      try {
        const { estateId, error } = await getUserEstateId(userId) // Extract estateId

        if (error) {
          setError("Failed to fetch estate data")
          console.error(error)
          return
        }

        setEstateId(estateId) // Store only estateId (number)
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

        setMeterNum(electricity) // Store electricity data
      } catch (err) {
        setError("Failed to fetch electricity data")
        console.error(err)
      }
    }

    fetchElectricityData()
  }, [estateId])

  console.log(meterNum)

  return (
    <>
      <Accordion type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger className="flex font-bold w-full justify-between">
            Electricity Meters
          </AccordionTrigger>
          <AccordionContent>
            <ScrollArea className="flex-grow-0 h-[300px] w-auto border rounded-md border-transparent">
              {Object.entries(
                meterNum.reduce((acc, meter) => {
                  const floor = meter.floor_no || "Unknown"
                  if (!acc[floor]) acc[floor] = []
                  acc[floor].push(meter)
                  return acc
                }, {} as Record<string, ElectricityMeter[]>)
              ).map(([floor, meters]) => (
                <div key={floor} className="mb-5">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <p className="whitespace-nowrap text-base font-bold">
                        {floor} Floor
                      </p>
                      <div className="flex w-full items-center">
                        <Separator className="h-[2px] rounded-sm w-full justify-center" />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      {meters.map((meter, index) => (
                        <ElectricityMeterCard
                          key={index}
                          floorNumber={meter.floor_no}
                          roomNumber={meter.room_no}
                          meterNumber={meter.meter_no}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  )
}
