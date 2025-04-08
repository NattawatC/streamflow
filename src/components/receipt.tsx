"use client"

import React from "react"
import { ScrollArea } from "./ui/scroll-area"
import { Separator } from "./ui/separator"

interface ReceiptProps {
  startDate: string
  endDate: string
  eUsed: number
  eCost: number
  wUsed: number
  wCost: number
  furniture: number
  roomCharge: number
}

const Receipt: React.FunctionComponent<ReceiptProps> = ({
  startDate,
  endDate,
  eUsed,
  eCost,
  wUsed,
  wCost,
  furniture,
  roomCharge,
}) => {
  return (
    <ScrollArea className="flex-grow-0 h-[300px] w-auto border rounded-md border-transparent">
      <span className="flex flex-col gap-4">
        <span className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          <span className="flex flex-row gap-2">
            <span className="whitespace-nowrap">You spend</span>
            <span className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
          </span>
          </span>

          <span className="flex flex-row justify-between items-center font-medium">
            <span>
              {startDate} - {endDate}
            </span>
            <span>Date</span>
          </span>
          {/* Electricity */}
          <span className="flex flex-row gap-2">
            <span className="whitespace-nowrap">Electricity</span>
            <span className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
          </span>
          </span>
          <span className="flex flex-row justify-between items-center font-medium">
            <li>{eUsed}</li>
            <span>Usage (kWh)</span>
          </span>
          <span className="flex flex-row justify-between items-center font-medium">
            <li>{eCost}</li>
            <span>Cost (Baht)</span>
          </span>
          {/* Water */}
          <span className="flex flex-row gap-2">
            <span className="whitespace-nowrap">Water</span>
            <span className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
          </span>
          </span>
          <span className="flex flex-row justify-between items-center font-medium">
            <li>{wUsed}</li>
            <span>Usage (m³)</span>
          </span>
          <span className="flex flex-row justify-between items-center font-medium">
            <li>{wCost}</li>
            <span>Cost (Baht)</span>
          </span>
        </span>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        {/* Accomodation Fee */}
        <span className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          <span className="flex flex-row gap-2">
            <span className="whitespace-nowrap font-normal">
              Accomodation Fee
            </span>
            <span className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
          </span>
          </span>
          <span className="flex flex-row justify-between items-center font-medium">
            <li>{furniture}</li>
            <span>Furniture</span>
          </span>
          <span className="flex flex-row justify-between items-center font-medium">
            <li>{roomCharge}</li>
            <span>Room Charge</span>
          </span>
        </span>
      </span>
    </ScrollArea>
  )
}

export default Receipt
