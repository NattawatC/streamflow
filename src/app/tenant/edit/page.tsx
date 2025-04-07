"use client"
import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { EditTenantProfile } from "@/components/editTenantProfile"
import { useSearchParams } from "next/navigation"

const editProfile: NextPage = () => {
  const searchParams = useSearchParams()
  const roomNo = searchParams.get("room_no")

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
