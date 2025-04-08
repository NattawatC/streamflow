"use client"

import { getUserEstate } from "@/api/services/ownerService"
import { Switch } from "@/components/ui/switch"
import { useEffect, useState } from "react"
import supabase from "@/config/supabaseClient"
import { toast } from "sonner"

interface Props {
  userId: string | undefined
}

interface Estate {
  all_meter_url: string
  id: number
  is_ready: boolean
}

export function GetAllMeterImage({ userId }: Props) {
  const [estates, setEstates] = useState<Estate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [imageUrls, setImageUrls] = useState<string[]>([])

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

  useEffect(() => {
    const fetchImages = async () => {
      const { data, error } = await supabase.storage
        .from("electricity-meter")
        .list("all/")

      if (error) {
        console.error("Failed to fetch images:", error.message)
        return
      }

      const urls = data
        .filter((file) => file.name.endsWith(".jpg") || file.name.endsWith(".png"))
        .map((file) =>
          supabase.storage
            .from("electricity-meter")
            .getPublicUrl(`all/${file.name}`).data.publicUrl
        )

      setImageUrls(urls)
    }

    fetchImages()
  }, [])

  return (
    <div className="space-y-4">

      {loading && <p>Loading estates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="flex flex-col gap-2">
        {imageUrls.map((url, index) => (
          <img
            key={index}
            src={url}
            alt={`Meter image ${index + 1}`}
            className="w-full h-auto rounded shadow"
          />
        ))}
      </div>
    </div>
  )
}
