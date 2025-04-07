import React from "react"
import { Separator } from "./ui/separator"


interface InfoProps {
  startDate: string
  endDate: string
  unit: string
  usage: number
  cost: number
  total: number
}

const UtilityInfo: React.FunctionComponent<InfoProps> = ({
  startDate,
  endDate,
  unit,
  usage,
  cost,
  total,
}) => {
  return (
    <>
      {/* Mobile */}
      <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
        <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap">You used</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center font-bold">
            <p className="font-bold">
              {startDate} - {endDate}
            </p>
            <p>Date</p>
          </div>
          <div className="flex flex-row justify-between items-center font-bold">
            <li className="font-bold">{usage}</li>
            <p>Usage ({unit})</p>
          </div>
          <div className="flex flex-row justify-between items-center font-bold">
            <li>{cost}</li>
            <p>Cost (per {unit})</p>
          </div>
        </div>

        <Separator className="h-[2px] rounded-sm w-full justify-center" />

        <div className="flex flex-col bg-white w-full text-base p-3 gap-5 rounded-md">
          <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Total Cost (Baht)</p>
            <div className="flex w-full items-center">
              <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
          </div>

          <div className="flex flex-row justify-between items-center font-bold">
            <p className="font-bold text-xl">{total}</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default UtilityInfo
