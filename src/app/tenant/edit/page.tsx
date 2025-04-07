"use client"
import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { EditTenantProfile } from "@/components/editTenantProfile"
import { useEffect, useState } from "react"

const editProfile: NextPage = () => {
  const [roomNo, setRoomNo] = useState<string | null>(null)

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const room_no = params.get("room_no")
    setRoomNo(room_no)
  }, [])
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex text-left gap-2">
          <h1 className="font-bold text-2xl">Edit Profile</h1>
        </div>

        <EditTenantProfile roomId={roomNo} />
      </MainLayout>
    </>
  )
}
export default editProfile
