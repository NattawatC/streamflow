import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { EditOwnerProfile } from "@/components/editOwnerProfile"
import { getUser } from "@/auth/server"

const edit: NextPage = async () => {

  const user = await getUser()
  const userId = user?.id

  return (
    <>
      <MainLayout className="flex flex-col gap-5">
        {/* change path */}
        <Link href="/owner/setting">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Edit Profile</h1>
        </div>
        <EditOwnerProfile userId={userId} />
      </MainLayout>
    </>
  )
}
export default edit
