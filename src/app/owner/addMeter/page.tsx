import { NextPage } from "next"
import { Separator } from "@/components/ui/separator"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AddMeterForm } from "@/components/addMeterPage/addMeterForm"
import { getUser } from "@/auth/server"
import { Electricity } from "@/components/addMeterPage/electricity"
import { Water } from "@/components/addMeterPage/water"
import { ElecAccordion } from "@/components/addMeterPage/elecAccordion"
import { WaterAccordion } from "@/components/addMeterPage/waterAccordion"

const addMeter: NextPage = async () => {
  const user = await getUser()
  const userId = user?.id

  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex flex-row justify-left gap-2">
          <h1 className="font-bold text-2xl">Meter Setup</h1>
        </div>

        {/* Completed Section */}
        <div className="flex flex-col gap-3 bg-custom-gray-background p-3 rounded-lg">
          <p className="font-bold text-xl">Completed</p>
          <div className="grid grid-cols-2 gap-5">
            {/* Electricity */}
            <Electricity userId={userId} />

            {/* Water*/}
            <Water userId={userId} />
          </div>
        </div>

        {/* Accordion Section */}
        <div>
          <Separator className="h-[2px] rounded-sm" />
          {/* Electricity */}
          <ElecAccordion userId={userId} />
          {/* Water */}
          <WaterAccordion userId={userId} />
        </div>

        {/* Meter Form Section */}
        <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
          <div className="flex flex-col bg-white w-full text-base p-3 gap-3 rounded-md">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap text-base font-bold">
                Meter Information
              </p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
            <AddMeterForm userId={userId}/>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Link href={"/owner"}>
            <Button className="flex w-full text-base font-bold bg-custom-green text-black">
              Return to Home
            </Button>
          </Link>
          {/* <Link href={"/owner"}>
            <Button
              variant={"outline"}
              className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2 underline"
            >
              Cancle
            </Button>
          </Link> */}
        </div>
      </MainLayout>
    </>
  )
}
export default addMeter
