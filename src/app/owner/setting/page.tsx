import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { ProfileOwnerCard } from "@/components/profileOwnerCard"
import { getUser } from "@/auth/server"

const setting: NextPage = async () => {
  const user = await getUser()
  const userId = user?.id

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex flex-row justify-center gap-2">
          <h1 className="font-bold text-2xl">Profile</h1>
        </div>
        <ProfileOwnerCard userId={userId} />
      </MainLayout>
    </>
  )
}
export default setting
