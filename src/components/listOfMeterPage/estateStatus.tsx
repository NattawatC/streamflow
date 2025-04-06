"use client"

import { getUserEstate } from "@/services/ownerService"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"
import { toast } from "sonner"

interface Props {
  userId: string | undefined
}

interface Estate {
  id: number
  is_ready: boolean
}

export function EstateStatus({ userId }: Props) {
  const [estates, setEstates] = useState<Estate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUserEstate = async () => {
      try {
        if (!userId) return
        setLoading(true)

        const { estates, error } = await getUserEstate(userId)

        if (error) {
          console.error(error)
          return
        }

        setEstates(estates || [])
      } catch (err) {
        setError("Failed to fetch estate data")
        console.error(err)
      } finally {
        setLoading(false)
      }
    }
    fetchUserEstate()
  }, [userId])

  const handleToggle = async (estateId: number, currentStatus: boolean) => {
    const newStatus = !currentStatus
    setLoading(true)

    try {
      const { data, error } = await supabase
        .from("estates")
        .update({ is_ready: newStatus })
        .eq("id", estateId)
        .select()

      if (error) {
        throw error
      }

      // Update local state
      setEstates((prev) =>
        prev.map((estate) =>
          estate.id === estateId ? { ...estate, is_ready: newStatus } : estate
        )
      )

      toast("Status updated")
    } catch (error) {
      console.error("Update error:", error)
      toast("Error")
    } finally {
      setLoading(false)
    }
  }

  if (loading && estates.length === 0) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error}</div>

  return (
    <div className="space-y-2">
      {estates.map((estate) => (
        <div key={estate.id} className="flex items-center gap-4 pt-1">
          <Switch
            checked={estate.is_ready}
            onCheckedChange={() => handleToggle(estate.id, estate.is_ready)}
            disabled={loading}
            className=""
          />
          <span
            className={`flex w-full text-sm font-bold ${
              estate.is_ready ? "text-green-600" : "text-red-500"
            }`}
          >
            {estate.is_ready ? "Ready" : "Not Ready"}
          </span>
        </div>
      ))}
    </div>
  )
}
