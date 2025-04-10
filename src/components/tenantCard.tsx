"use client"

import React, { Suspense } from "react"
import { Separator } from "./ui/separator"
import { HiMiniTrash } from "react-icons/hi2"
import { Button } from "@/components/ui/button"
import Link from "next/link"
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
import { PiWarningCircleFill } from "react-icons/pi"
import { Badge } from "@/components/ui/badge"
import { IoIosArrowRoundForward } from "react-icons/io"
import { Tenant } from "@/api/interfaces/tenant"
import supabase from "@/config/supabaseClient"
import { useRouter } from "next/navigation"

const TenantCard: React.FunctionComponent<Tenant> = ({
  id,
  room,
  firstname,
  lastname,
  rentalCost,
  pStatus,
  rStatus,
}) => {
  const router = useRouter()
  const deleteTenant = async (id: number) => {
    const { error } = await supabase.from("tenants").delete().eq("id", id)

    if (error) {
      console.error("Error deleting tenant:", error.message)
    } else {
      console.log("Tenant deleted successfully")
      window.location.reload()
    }
  }
  return (
    <>
      <div className="flex flex-col gap-5 items-center bg-custom-gray-background p-4 rounded-lg">
        <div className="flex flex-col bg-white w-full p-3 gap-5 rounded-md">
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2 items-center">
              <p className="whitespace-nowrap font-bold">Rental Cost</p>
              {/* <p className="whitespace-nowrap font-bold">{rentalCost}</p> */}
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>

              <Dialog>
                <DialogTrigger asChild>
                  <Button className="rounded-full p-1.5 h-auto">
                    <HiMiniTrash size={16} />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader className="flex flex-col gap-4">
                    <DialogTitle className="flex text-left text-white">
                      Delete the Tenant's Account
                    </DialogTitle>
                    <DialogDescription>
                      <>
                        <span className="flex flex-col gap-2">
                          <span className="text-white">
                            Are you sure you want to permanently remove this
                            tenant from the property?
                          </span>
                          <span className="flex flex-row gap-2 text-custom-pink items-center">
                            <PiWarningCircleFill size={24} />
                            <span className="text-custom-pink">
                              Please note that this action is irreversible.
                            </span>
                          </span>
                        </span>
                      </>
                    </DialogDescription>
                  </DialogHeader>
                  <DialogFooter className="sm:justify-start">
                    <div className="flex flex-row gap-4">
                      <Button
                        className="w-full bg-custom-pink text-black"
                        onClick={() => deleteTenant(id)}
                      >
                        Delete
                      </Button>
                      <DialogClose asChild>
                        <Button
                          type="button"
                          className="w-full text-black border "
                          variant={"outline"}
                        >
                          Close
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <p className="text-xl font-bold">{rentalCost}</p>
            <div className="flex flex-row gap-2">
              <p className="font-medium">Room:</p>
              <p>{room}</p>
            </div>
            <div className="flex flex-row gap-2">
              <p className="font-medium">Name:</p>
              <p>
                {firstname} {lastname}
              </p>
            </div>
          </div>

          <div className="flex flex-row gap-2">
            {rStatus == false ? (
              <Badge className="flex w-full items-center justify-center text-center text-white font-normal bg-red-700 ">
                Room Detail Missing
              </Badge>
            ) : (
              <Badge className="flex w-full items-center justify-center text-center text-black font-normal bg-custom-green">
                Room Detail
              </Badge>
            )}
            {
              {
                true: (
                  <Badge className="flex w-full items-center justify-center text-center text-black font-normal bg-custom-green">
                    Payment Complete
                  </Badge>
                ),
                waiting: (
                  <Badge className="flex w-full items-center justify-center text-center text-white font-normal bg-yellow-600">
                    Waiting Approval
                  </Badge>
                ),
                false: (
                  <Badge className="flex w-full items-center justify-center text-center text-white font-normal bg-red-700">
                    Payment Incomplete
                  </Badge>
                ),
              }[pStatus]
            }
          </div>

          <div className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
          </div>

          <Suspense fallback={<div>Loading...</div>}>
            <Link
              href={`/owner/tenant-info?id=${id}`}
              className="flex flex-row gap-2 items-center justify-center rounded-full py-1 px-0 w-full border border-custom-purple text-custom-purple"
            >
              View Details
              <IoIosArrowRoundForward size={20} />
            </Link>
          </Suspense>
        </div>
      </div>
    </>
  )
}

export default TenantCard
