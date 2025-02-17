import React from "react"

interface Props {
  roomNumber: number
  electrictyUsage: number
  electricityNo: number
}

const ListOfMeterElecCard: React.FunctionComponent<Props> = ({
  roomNumber,
  electrictyUsage,
  electricityNo,
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
            <p>Electricity Usage</p>
            <p>{electrictyUsage} kWh</p>
          </div>
          <div className="flex flex-row text-sm font-normal gap-x-11">
            <p>Electricity meter no.</p>
            <p>{electricityNo} m^3</p>
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

export default ListOfMeterElecCard
