import supabase from "@/config/supabaseClient"
import React from "react"
import { HiMiniXMark } from "react-icons/hi2"
import { Button } from "../ui/button"

interface waterMeterProps {
  id: number
  roomNumber: number
  meterNumber: string
  onDelete: (id: number) => void
}

export const WaterMetercard: React.FunctionComponent<waterMeterProps> = ({
  id,
  roomNumber,
  meterNumber,
  onDelete,
}) => {
  const handleDelete = async () => {
    console.log(`Attempting to delete meter with ID: ${id}`)

    const { error } = await supabase.from("water").delete().eq("id", id)

    if (error) {
      console.error("Error deleting meter:", error)
      return
    }

    console.log(`Successfully deleted meter with ID: ${id}`)
    onDelete(id)
    window.location.reload()
  }
  return (
    <>
      <div className="flex flex-row border border-black rounded-lg py-3 px-2 justify-between">
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
        <Button className="bg-transparent p-0" onClick={handleDelete}>
          <HiMiniXMark size={20} className="text-black" />
        </Button>
      </div>
    </>
  )
}

export default WaterMetercard
