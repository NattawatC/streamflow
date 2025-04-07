"use client"

import React, { useState } from "react"
import { MdOutlineElectricBolt } from "react-icons/md"
import { FaWater } from "react-icons/fa6"
import { BsThreeDots } from "react-icons/bs"
import { Button } from "@/components/ui/button"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EditMeterForm from "./editMeterForm"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Image from "next/image"
import { ScrollArea } from "../ui/scroll-area"
import { Separator } from "@/components/ui/separator"

interface Props {
  roomNumber: string
  electricityNo: string
  electricityUsage: number
  waterNo: string
  waterUsage: number
  elecImageUrl: string
  waterImageUrl: string
}

const formSchema = z.object({
  editElecNo: z.string(),
  editElecUsage: z.coerce.number(),
  editWaterNo: z.string(),
  editWaterUsage: z.coerce.number(),
})

const ListOfMeterCard: React.FunctionComponent<Props> = ({
  roomNumber,
  electricityUsage,
  electricityNo,
  waterUsage,
  waterNo,
  elecImageUrl,
  waterImageUrl,
}) => {
  const [showOptions, setShowOptions] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      editElecNo: electricityNo,
      editElecUsage: electricityUsage,
      editWaterNo: waterNo,
      editWaterUsage: waterUsage,
    },
  })

  return (
    <div className="flex flex-col w-full rounded-lg border border-black p-3 gap-5 relative">
      {/* first row */}
      <button
        className="absolute top-2 right-2"
        onClick={() => setShowOptions(!showOptions)}
      >
        <BsThreeDots size={20} />
      </button>
      <div className="flex flex-row">
        <div className="flex flex-col gap-1">
          <p className="text-sm font-medium">Room</p>
          <p className="text-xl font-bold">{roomNumber}</p>
        </div>
      </div>
      {/* second row */}
      <div className="flex flex-row w-full gap-5">
        <MdOutlineElectricBolt
          size={24}
          className="text-white bg-black rounded-sm"
        />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row w-full justify-between text-base font-bold">
            <p>Electricity Usage</p>
            <p>{electricityUsage} kWh</p>
          </div>
          <div className="flex flex-row text-sm font-normal w-full justify-between">
            <p>Electricity meter no.</p>
            <p>{electricityNo}</p>
          </div>
        </div>
      </div>
      {/* third row */}
      <div className="flex flex-row w-full gap-5">
        <FaWater size={24} className="text-white bg-black rounded-sm" />
        <div className="flex flex-col gap-2 w-full">
          <div className="flex flex-row w-full justify-between text-base font-bold">
            <p>Water Usage</p>
            <p>{waterUsage} m^3</p>
          </div>
          <div className="flex flex-row text-sm font-normal w-full justify-between">
            <p>Water meter no.</p>
            <p>{waterNo}</p>
          </div>
        </div>
      </div>
      {/* 2 buttons */}
      {showOptions && (
        <div className="flex flex-row justify-center gap-3">
          {/* <EditMeterForm
            roomNumber={roomNumber}
            electricityNo={electricityNo}
            electrictyUsage={electricityUsage}
            waterNo={waterNo}
            waterUsage={waterUsage}
          >
            <Button className="flex text-base w-full font-medium bg-custom-green text-black">
              Edit
            </Button>
          </EditMeterForm> */}

          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex text-base w-full font-medium text-black border border-black bg-transparent">
                View Meter
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="text-white">View Meter</DialogTitle>
              </DialogHeader>
              <ScrollArea className="flex-grow-0 h-[450px] w-full border rounded-md border-transparent">
                <div className="flex flex-col gap-5 w-full">
                  <div className="flex flex-col items-center bg-custom-gray-background p-2 rounded-lg">
                    <span className="text-base font-bold pb-2">
                      Electricity Meter
                    </span>
                    {elecImageUrl ? (
                      <Image
                        key={elecImageUrl}
                        src={elecImageUrl}
                        width={300}
                        height={300}
                        alt="Electricity meter image"
                      />
                    ) : (
                      <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center">
                        <span>No electricity meter image available</span>
                      </div>
                    )}
                  </div>
                  <Separator className="h-[2px] rounded-sm w-full justify-center" />
                  <div className="flex flex-col items-center bg-custom-gray-background p-2 rounded-lg">
                    <span className="text-base font-bold pb-2">
                      Water Meter
                    </span>
                    {waterImageUrl ? (
                      <Image
                        key={waterImageUrl}
                        src={waterImageUrl}
                        width={300}
                        height={300}
                        alt="Water meter image"
                      />
                    ) : (
                      <div className="w-[300px] h-[300px] bg-gray-200 flex items-center justify-center">
                        <span>No water meter image available</span>
                      </div>
                    )}
                  </div>
                </div>
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  )
}

export default ListOfMeterCard
