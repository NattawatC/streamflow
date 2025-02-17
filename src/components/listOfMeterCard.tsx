import React from "react"
import { MdOutlineElectricBolt } from "react-icons/md"
import { FaWater } from "react-icons/fa6"

interface Props {
  roomNumber: number
  electrictyUsage: number
  electricityNo: number
  waterUsage: number
  waterNo: number
}

const ListOfMeterCard: React.FunctionComponent<Props> = ({
  roomNumber,
  electrictyUsage,
  electricityNo,
  waterUsage,
  waterNo,
}) => {
  return (
    <>
      <div className="flex flex-col w-full rounded-lg outline-black outline p-3 gap-5">
        {/* first row */}
        <div className="flex flex-row">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Room</p>
            <p className="text-xl font-bold">{roomNumber}</p>
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-col gap-2 justify-evenly">
          <div className="flex flex-row text-base font-bold gap-x-10">
            <MdOutlineElectricBolt size={20} />
            <p>Electricity Usage</p>
            <p>{electrictyUsage} kWh</p>
          </div>
          <div className="flex flex-row text-sm font-normal gap-x-11">
            <p>Electricity meter no.</p>
            <p>{electricityNo}</p>
          </div>
        </div>
        {/* third row */}
        <div className="flex flex-col gap-2 justify-evenly">
          <div className="flex flex-row text-base font-bold gap-x-10">
            <FaWater size={20} />
            <p>Water Usage</p>
            <p>{waterUsage} m^3</p>
          </div>
          <div className="flex flex-row text-sm font-normal gap-x-11">
            <p>Water meter no.</p>
            <p>{waterNo}</p>
          </div>
        </div>
      </div>
      {/* <div className="flex flex-row border border-black rounded-lg py-3 px-2 justify-between">
        <div className="flex flex-row gap-4">
          <div className="flex flex-col font-medium gap-2">
            <p>Room :</p>
            <p>Water Meter No. :</p>
          </div>
          <div className="flex flex-col gap-2">
            <p>{roomNumber}</p>
            <p>{meterNumber}</p>
          </div>
        </div>
        
      </div> */}
    </>
  )
}

export default ListOfMeterCard
