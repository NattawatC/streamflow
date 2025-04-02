"use client"
import { MainLayout } from "@/components/layout"
import { Button } from "@/components/ui/button"
import { NextPage } from "next"
import Link from "next/link"

const mockData = {
  startDate: "2021-10-01",
  endDate: "2021-10-30",
  used: 100,
  cost: 1000,
  total: 10000,
}

const result: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-4">
        <h1 className="font-bold text-2xl">Olá, Newcomer</h1>
        <Link href={"/owner/home"}>
          <Button className="bg-custom-green text-black w-full text-base font-bold">
            Return to Home
          </Button>
        </Link>
      </MainLayout>
    </>
  )
}

export default result
