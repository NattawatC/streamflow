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
import { getUser } from "@/auth/server"
import {
  calculateRentalCost,
  getEstate,
  getTenants,
} from "@/api/services/tenantService"
import { getUserProfile } from "@/api/services/ownerService"

const home: NextPage = async () => {
  const user = await getUser()
  const userId = user?.id

  const profile = await getUserProfile(userId)
  const estate = await getEstate(userId)
  const tenants = (await getTenants(userId)) || []

  const tenantsWithCost = await Promise.all(
    tenants.tenants.map(async (tenant) => {
      const rentalCost = await calculateRentalCost(tenant)
      return {
        ...tenant,
        rentalCost,
      }
    })
  )

  const estateRecord = estate.estates.length > 0 ? estate.estates[0] : null

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

            {profile ? (
              <div className="flex text-xl font-bold justify-center">
                {profile.gender === "male" ? (
                  <p>
                    Mr. {profile.first_name} {profile.last_name}
                  </p>
                ) : (
                  <p>
                    Ms. {profile.first_name} {profile.last_name}
                  </p>
                )}
              </div>
            ) : (
              <></>
              // <div className="flex text-base justify-center text-center">
              //   <p>Need to setup your profile in Account Setting tab</p>
              // </div>
            )}
          </div>

          {estate.estates.length === 0 || !estate.estates[0]?.name ? (
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
            <Link href={"/owner/addTenant"}>
              <Button className="w-full bg-white text-black text-base font-bold justify-between">
                Add New Tenant
                <IoIosArrowForward size={20} />
              </Button>
            </Link>

            <Separator className="h-[2px] rounded-sm" />

            <Link href={`/owner/setting`}>
              {estate.estates.length === 0 || !estate.estates[0]?.name ? (
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
            {/* <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex font-bold w-full justify-between">
                  Room Occupancy Overview
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row justify-between">
                      <p>Room Occupied</p>
                      <p>10/{estateRecord?.total_room}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Room Available</p>
                      <p>89/{estateRecord?.total_room}</p>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion> */}

            {/* Meter Setup */}
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="flex font-bold w-full justify-between">
                  Meter Setup
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col gap-2">
                    {/* <p className="text-sm">Add Meter</p> */}
                    <div className="flex flex-col justify-between w-auto gap-2">
                      <Link
                        className="flex w-full bg-custom-green text-black text-sm font-bold justify-center items-center rounded-md px-4 py-2"
                        href="/owner/add-meter"
                      >
                        Add/Delete Meter
                      </Link>
                      <Link
                        className="flex w-full bg-custom-purple text-black text-sm font-bold justify-center items-center rounded-md px-4 py-2"
                        href="/owner/list-of-meter"
                      >
                        View/Edit Meter
                      </Link>
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
                      <span>
                        Clicking on the{" "}
                        <span className="text-custom-pink">
                          "View Details"{" "}
                        </span>
                        button to see the additional information
                      </span>
                    </DialogDescription>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>

            {tenantsWithCost?.length > 0 ? (
              <div className="flex flex-col gap-4">
                {tenantsWithCost.map((tenant, index) => (
                  <TenantCard
                    id={tenant.id}
                    key={index}
                    room={tenant.room_no}
                    firstname={tenant.first_name}
                    lastname={tenant.last_name}
                    rentalCost={tenant.rentalCost}
                    pStatus={tenant.payment_status}
                    rStatus={tenant.room_status}
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
