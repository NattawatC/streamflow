"use client"

import {
  getAllElectricityMeterById,
  getUserEstateId,
} from "@/services/ownerService"
import { useEffect, useState } from "react"

interface Props {
  userId: string | undefined
}

export function Electricity({ userId }: Props) {
  const [estateId, setEstateId] = useState<any>(null)
  const [meterNum, setMeterNum] = useState<any>(null)
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

  return (
    <>
      {meterNum && meterNum.length > 0 ? (
        <div className="flex bg-custom-green w-auto flex-col p-4 text-center rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-base">Electricity Added</p>
          </div>
          <p className="text-black text-2xl font-bold">
            {meterNum.length < 10 ? `0${meterNum.length}` : meterNum.length}
          </p>
        </div>
      ) : (
        <p className="text-black text-base">No electricity meters added.</p>
      )}
    </>
  )
}
