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
roomCharge
}) => {
  return (
    <>
      <ScrollArea className="flex-grow-0 h-[300px] w-auto border rounded-md border-transparent">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap">You spend</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>

            <div className="flex flex-row justify-between items-center font-medium">
              <p>
                {startDate} - {endDate}
              </p>
              <p>Date</p>
            </div>
            {/* Electricity */}
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap">Electricity</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center font-medium">
              <li>{eUsed}</li>
              <p>Usage (kWh)</p>
            </div>
            <div className="flex flex-row justify-between items-center font-medium">
              <li>{eCost}</li>
              <p>Cost (Baht)</p>
            </div>
            {/* Water */}
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap">Water</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center font-medium">
              <li>{wUsed}</li>
              <p>Usage (m³)</p>
            </div>
            <div className="flex flex-row justify-between items-center font-medium">
              <li>{wCost}</li>
              <p>Cost (Baht per m³)</p>
            </div>
          </div>

          <Separator className="h-[2px] rounded-sm w-full justify-center" />

          {/* Accomodation Fee */}
          <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-normal">Accomodation Fee</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <div className="flex flex-row justify-between items-center font-medium">
              <li>{furniture}</li>
              <p>Furniture</p>
            </div>
            <div className="flex flex-row justify-between items-center font-medium">
              <li>{roomCharge}</li>
              <p>Room Charge</p>
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  )
}

export default Receipt
