import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { CalendarForm } from "@/components/calendarForm"
import { getUser } from "@/auth/server"
import { RetrieveMeters } from "@/components/listOfMeterPage/retrieveMeters"


const listOfMeter: NextPage = async () => {
  const user = await getUser()
  const userId = user?.id
  
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        {/* change path */}
        <Link href="/owner">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">List of Meter</h1>
        </div>
        <div className="flex bg-custom-gray-background p-3 rounded-2xl justify-center">
          {/* <CalendarForm></CalendarForm> */}
        </div>
        <RetrieveMeters userId={userId} />
      </MainLayout>
    </>
  )
}
export default listOfMeter
