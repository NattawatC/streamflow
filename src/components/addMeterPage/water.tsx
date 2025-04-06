"use client"

import {
  getAllElectricityMeterById,
  getAllWaterMeterById,
  getUserEstateId,
} from "@/services/ownerService"
import { useEffect, useState } from "react"

interface Props {
  userId: string | undefined
}

export function Water({ userId }: Props) {
  const [estateId, setEstateId] = useState<any>(null)
  const [meterNum, setMeterNum] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserEstate = async () => {
      try {
        const { estateId, error } = await getUserEstateId(userId)

        if (error) {
          setError("Failed to fetch estate data")
          console.error(error)
          return
        }

        setEstateId(estateId)
      } catch (err) {
        setError("Failed to fetch estate data")
        console.error(err)
      }
    }

    fetchUserEstate()
  }, [userId])

  useEffect(() => {
    const fetchWaterData = async () => {
      try {
        if (!estateId || typeof estateId !== "number") return

        const { water, error } = await getAllWaterMeterById(estateId)

        if (error) {
          setError("Failed to fetch water data")
          console.error(error)
          return
        }

        setMeterNum(water)
      } catch (err) {
        setError("Failed to fetch water data")
        console.error(err)
      }
    }

    fetchWaterData()
  }, [estateId])

  return (
    <>
      {meterNum && meterNum.length > 0 ? (
        <div className="flex bg-custom-green w-auto flex-col p-4 text-center rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-base">
              Water <br /> Added
            </p>
          </div>
          <span className="text-black text-2xl font-bold">
            {meterNum.length < 10 ? (
              <p className="text-black text-2xl font-bold">
                0{meterNum.length}{" "}
              </p>
            ) : (
              <p className="text-black text-2xl font-bold">
                {" "}
                {meterNum.length}{" "}
              </p>
            )}
          </span>
        </div>
      ) : (
        <div className="flex bg-custom-green w-auto flex-col p-4 text-center rounded-md">
          <div className="flex flex-col gap-2">
            <p className="text-black font-bold text-base">
              Water <br /> Added
            </p>
          </div>
          <p className="text-black text-2xl font-bold">0</p>
        </div>
      )}
    </>
  )
}
