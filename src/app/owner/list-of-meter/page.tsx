import { NextPage } from "next"
import Link from "next/link"
import { MainLayout } from "@/components/layout"
import { IoIosArrowBack } from "react-icons/io"
import { getUser } from "@/auth/server"
import { RetrieveMeters } from "@/components/listOfMeterPage/retrieveMeters"
import { EstateStatus } from "@/components/listOfMeterPage/estateStatus"
import { GetAllMeterImage } from "@/components/listOfMeterPage/getAllMeterImage"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

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
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex font-bold w-full justify-between">
              All Meter Image
            </AccordionTrigger>
            <AccordionContent>
              <GetAllMeterImage userId={userId} />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <RetrieveMeters userId={userId} />
      </MainLayout>
    </>
  )
}
export default listOfMeter
