"use client"

import { NextPage } from "next"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MainLayout } from "@/components/layout"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AddMeterForm } from "@/components/addMeterForm"
import { ownerData } from "@/interfaces/ownerData"
import ElectricityMeterCard from "@/components/electricityMeterCard"
import WaterMeterCard from "@/components/waterMeterCard"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const addMeter: NextPage = () => {
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
            <div className="flex bg-custom-green w-auto flex-col p-4 text-center rounded-md">
              <div className="flex flex-col gap-2">
                <p className="text-black font-bold text-base">
                  Electricity Added
                </p>
              </div>
              {ownerData.estate.electricityMeter.length < 10 ? (
                <p className="text-black text-2xl font-bold">
                  0{ownerData.estate.electricityMeter.length}{" "}
                </p>
              ) : (
                <p className="text-black text-2xl font-bold">
                  {" "}
                  {ownerData.estate.electricityMeter.length}{" "}
                </p>
              )}
            </div>

            {/* Water*/}
            <div className="flex bg-custom-green w-auto flex-col p-4 text-center rounded-md">
              <div className="flex flex-col gap-2">
                <p className="text-black font-bold text-base">
                  Water <br /> Added
                </p>
              </div>
              {ownerData.estate.electricityMeter.length < 10 ? (
                <p className="text-black text-2xl font-bold">
                  0{ownerData.estate.electricityMeter.length}{" "}
                </p>
              ) : (
                <p className="text-black text-2xl font-bold">
                  {" "}
                  {ownerData.estate.electricityMeter.length}{" "}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Accordion Section */}
        <div>
          <Separator className="h-[2px] rounded-sm" />
          {/* Electricity */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex font-bold w-full justify-between">
                Electricity Meters
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="flex-grow-0 h-[300px] w-auto border rounded-md border-transparent">
                  {Object.entries(
                    ownerData.estate.electricityMeter.reduce((acc, meter) => {
                      if (!acc[meter.floorNumber]) acc[meter.floorNumber] = []
                      acc[meter.floorNumber].push(meter)
                      return acc
                    }, {} as Record<number, typeof ownerData.estate.electricityMeter>)
                  ).map(([floor, meters]) => (
                    <div key={floor} className="mb-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                          <p className="whitespace-nowrap text-base font-bold">
                            {floor} Floor
                          </p>
                          <div className="flex w-full items-center">
                            <Separator className="h-[2px] rounded-sm w-full justify-center" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {meters.map((meter, index) => (
                            <ElectricityMeterCard
                              key={index}
                              floorNumber={meter.floorNumber}
                              roomNumber={meter.roomNumber}
                              meterNumber={meter.meterNumber}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          {/* Water */}
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="flex font-bold w-full justify-between">
                Water Meters
              </AccordionTrigger>
              <AccordionContent>
                <ScrollArea className="flex-grow-0 h-[300px] w-auto border rounded-md border-transparent">
                  {Object.entries(
                    ownerData.estate.electricityMeter.reduce((acc, meter) => {
                      if (!acc[meter.floorNumber]) acc[meter.floorNumber] = []
                      acc[meter.floorNumber].push(meter)
                      return acc
                    }, {} as Record<number, typeof ownerData.estate.electricityMeter>)
                  ).map(([floor, meters]) => (
                    <div key={floor} className="mb-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex flex-row gap-2">
                          <p className="whitespace-nowrap text-base font-bold">
                            {floor} Floor
                          </p>
                          <div className="flex w-full items-center">
                            <Separator className="h-[2px] rounded-sm w-full justify-center" />
                          </div>
                        </div>
                        <div className="flex flex-col gap-2">
                          {meters.map((meter, index) => (
                            <WaterMeterCard
                              key={index}
                              floorNumber={meter.floorNumber}
                              roomNumber={meter.roomNumber}
                              meterNumber={meter.meterNumber}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </ScrollArea>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
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
            <AddMeterForm></AddMeterForm>
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <Button className="flex w-full text-base font-bold bg-custom-green text-black">
            Update Meter
          </Button>
          <Link href={"/owner/home"}>
            <Button
              variant={"outline"}
              className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2 underline"
            >
              Cancle
            </Button>
          </Link>
        </div>
      </MainLayout>
    </>
  )
}
export default addMeter
