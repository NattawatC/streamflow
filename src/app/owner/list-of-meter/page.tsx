import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { getUser } from "@/auth/server"
import { RetrieveMeters } from "@/components/listOfMeterPage/retrieveMeters"
import { EstateStatus } from "@/components/listOfMeterPage/estateStatus"

const listOfMeter: NextPage = async () => {
  const user = await getUser()
  const userId = user?.id

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href="/owner">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <div className="flex flex-row justify-between w-full">
          <h1 className="font-bold text-2xl">List of Meter</h1>
          <EstateStatus userId={userId} />
        </div>

        <RetrieveMeters userId={userId} />
      </MainLayout>
    </>
  )
}
export default listOfMeter
