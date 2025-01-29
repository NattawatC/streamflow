"use client"

import { NextPage } from "next"
import Link from "next/link"
import TenantCard from "@/components/tenantCard"
import { MainLayout } from "@/components/layout"
import { IoIosArrowForward } from "react-icons/io"
import { PiWarningCircleFill } from "react-icons/pi"

import { Separator } from "@/components/ui/separator"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { MockData } from "@/interfaces/mockData";

const mockData: MockData = {
  firstname: "Nattawat",
  lastname: "Chaokraisith",
  gender: "Male",
  age: 56,
  phoneNumber: "000-000-0000",
  roomNumber: 123,
  floorNumber: 123,
  BuildingNumber: 123,
  status: false,
  estate: {
    name: "The Home Ladkrabang",
    address: "691 ถนนฉลองกรุง 1 แยก 6 ลาดกระบัง",
    city: "Bangkok",
    zipCode: "10160",
    totalRoom: 99,
    totalBuilding: 99,
    totalFloor: 99,
    furnitureCost: 9999,
    roomCharge: 9999,
    electricityCost: 6,
    waterCost: 17
  },
  tenant: [
    {
      firstname: "John",
      lastname: "Clark",
      room: 101,
      pStatus: false,
      rStatus: true,
    },
    {
      firstname: "Sarah",
      lastname: "Shelby",
      room: 102,
      pStatus: true,
      rStatus: false,
    },
    {
      firstname: "Tomb",
      lastname: "Raider",
      room: 103,
      pStatus: true,
      rStatus: true,
    },
  ],
}

const home: NextPage = () => {
  return (
    <>
      <MainLayout>
        <div className="flex flex-col gap-8">
          <h1 className="flex text-2xl font-bold justify-center">Home</h1>
          <div className="flex flex-col gap-3 items-center">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" sizes="80" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div className="flex text-xl font-bold justify-center">
              {mockData.gender == "Male" ? (
                <p>
                  Mr. {mockData.firstname} {mockData.lastname}
                </p>
              ) : (
                <p>
                  Ms. {mockData.firstname} {mockData.lastname}
                </p>
              )}
            </div>
          </div>

          {mockData.estate.name == "" ? (
            <div className="flex text-base justify-center text-center">
              <p>
                No information. Please fill your estate & banking in{" "}
                <b>Account Setting</b> down below
              </p>
            </div>
          ) : (
            <></>
          )}

          <div className="flex flex-col">
            <Separator className="h-[2px] rounded-sm" />
            <Link href={"/addTenant"}>
              <Button className="w-full bg-white text-black text-base font-bold justify-between">
                Add New Tenant
                <IoIosArrowForward size={20} />
              </Button>
            </Link>

            <Separator className="h-[2px] rounded-sm" />

            <Link href={"/owner/setting"}>
              {mockData.estate.name == "" ? (
                <Button className="w-full bg-white text-custom-pink text-base font-bold justify-between">
                  Account Setting*
                  <IoIosArrowForward size={20} />
                </Button>
              ) : (
                <Button className="w-full bg-white text-black text-base font-bold justify-between">
                  Account Setting
                  <IoIosArrowForward size={20} />
                </Button>
              )}
            </Link>
            <Separator className="h-[2px] rounded-sm" />

            {/* Estate Information: Occupied */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="font-bold justify-between">
                  Room Occupancy Overview
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <p>Room Occupied</p>
                      <p>10/{mockData.estate.totalRoom}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Room Available</p>
                      <p>89/{mockData.estate.totalRoom}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-2 items-center">
              <p className="font-bold">List of Tenants</p>
              <Dialog>
                <DialogTrigger>
                  <PiWarningCircleFill size={20} />
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="flex flex-col gap-4">
                    <DialogTitle className="flex text-left text-white">
                      Tenant Information
                    </DialogTitle>
                    <DialogDescription className="text-white">
                      <p>
                        Clicking on the{" "}
                        <span className="text-custom-pink">
                          "View Details"{" "}
                        </span>
                        button to see the additional information
                      </p>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {mockData.tenant.length > 0 ? (
              <div className="flex flex-col gap-4">
                {mockData.tenant.map((tenant, index) => (
                  <TenantCard
                    key={index}
                    room={tenant.room}
                    firstname={tenant.firstname}
                    lastname={tenant.lastname}
                    pStatus={tenant.pStatus}
                    rStatus={tenant.rStatus}
                  />
                ))}
              </div>
            ) : (
              <>
                <p>No tenant in your properties</p>
              </>
            )}
          </div>
        </div>
      </MainLayout>
    </>
  )
}

export default home
