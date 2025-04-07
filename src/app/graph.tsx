"use client"
import { NextPage } from "next"
import { IoIosArrowBack } from "react-icons/io"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ElecGraph } from "@/components/graph/elecGraph"
import { WaterGraph } from "@/components/graph/waterGraph"
import { Separator } from "@radix-ui/react-separator"

const graph: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <Link href="/tenant/home">
          <IoIosArrowBack size={24} className="text-black" />
        </Link>
        <h1 className="flex font-bold text-2xl justify-center">
          Utility Graph
        </h1>
        <Tabs
          defaultValue="monthly"
          className="flex flex-col w-auto gap-10 bg-custom-gray-background rounded-md p-4"
        >
          <TabsList className="w-full text-xl justify-between">
            <TabsTrigger className="w-full" value="monthly">
              Monthly
            </TabsTrigger>
            <TabsTrigger className="w-full" value="yearly">
              Yearly
            </TabsTrigger>
          </TabsList>
          <TabsContent value="monthly" className="flex flex-col gap-5">
            <ElecGraph />
            <Separator className="h-[2px] rounded-sm w-full justify-center bg-custom-gray" />
            <WaterGraph />
          </TabsContent>
          <TabsContent value="yearly"></TabsContent>
        </Tabs>
      </MainLayout>
    </>
  )
}
export default graph
