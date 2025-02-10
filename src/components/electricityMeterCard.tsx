import React from "react"
import { HiMiniXMark } from "react-icons/hi2"

interface elecMeterProps {
  floorNumber: number
  roomNumber: number
  meterNumber: number
}

const ElectricityMetercard: React.FunctionComponent<elecMeterProps> = ({
  floorNumber,
  roomNumber,
  meterNumber,
}) => {
  return (
    <>
      <div className="flex flex-row border border-black rounded-lg py-3 px-2 justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col font-medium gap-2">
            <p>Room :</p>
            <p>Electricity Meter No. :</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>{roomNumber}</p>
            <p>{meterNumber}</p>
          </div>
        </div>
        <HiMiniXMark size={20} className="text-black" />
      </div>
    </>
  )
}

export default ElectricityMetercard
