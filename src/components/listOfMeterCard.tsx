import React, { useState } from "react"
import { MdOutlineElectricBolt } from "react-icons/md"
import { FaWater } from "react-icons/fa6"
import { BsThreeDots } from "react-icons/bs"
import { Button } from "./ui/button"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { BiSolidUserRectangle } from "react-icons/bi"
import { Input } from "@/components/ui/input"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Props {
  roomNumber: number
  electrictyUsage: number
  electricityNo: number
  waterUsage: number
  waterNo: number
}
const formSchema = z.object({
  editElecNo: z.preprocess((val) => (val === "" ? 0 : Number(val)), z.number()),
  editElecUsage: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number()
  ),
  editWaterNo: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number()
  ),
  editWaterUsage: z.preprocess(
    (val) => (val === "" ? 0 : Number(val)),
    z.number()
  ),
})

const ListOfMeterCard: React.FunctionComponent<Props> = ({
  roomNumber,
  electrictyUsage,
  electricityNo,
  waterUsage,
  waterNo,
}) => {
  const [showOptions, setShowOptions] = useState(false)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      editElecNo: electricityNo,
      editElecUsage: electrictyUsage,
      editWaterNo: waterNo,
      editWaterUsage: waterUsage,
    },
  })
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }
  return (
    <>
      <div className="flex flex-col w-full rounded-lg outline-black outline p-3 gap-5 relative">
        {/* first row */}
        <button
          className="absolute top-2 right-2"
          onClick={() => setShowOptions(!showOptions)}
        >
          <BsThreeDots size={20} />
        </button>
        <div className="flex flex-row">
          <div className="flex flex-col gap-1">
            <p className="text-sm font-medium">Room</p>
            <p className="text-xl font-bold">{roomNumber}</p>
          </div>
        </div>
        {/* second row */}
        <div className="flex flex-col gap-2 justify-evenly">
          <div className="flex flex-row text-base font-bold gap-x-10">
            <MdOutlineElectricBolt size={20} />
            <p>Electricity Usage</p>
            <p>{electrictyUsage} kWh</p>
          </div>
          <div className="flex flex-row text-sm font-normal gap-x-11">
            <p>Electricity meter no.</p>
            <p>{electricityNo}</p>
          </div>
        </div>
        {/* third row */}
        <div className="flex flex-col gap-2 justify-evenly">
          <div className="flex flex-row text-base font-bold gap-x-10">
            <FaWater size={20} />
            <p>Water Usage</p>
            <p>{waterUsage} m^3</p>
          </div>
          <div className="flex flex-row text-sm font-normal gap-x-11">
            <p>Water meter no.</p>
            <p>{waterNo}</p>
          </div>
        </div>
        {/* 2 buttons */}
        {showOptions && (
          <div className="flex flex-row justify-cetner gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex text-base w-full font-medium bg-custom-green text-black">
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-white">
                    Meter Room {roomNumber}
                  </DialogTitle>
                </DialogHeader>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-8"
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-row gap-2">
                        <p className="whitespace-nowrap text-base font-bold text-white">
                          Electricity
                        </p>
                        <div className="flex w-full items-center">
                          <Separator className="h-[2px] rounded-sm w-full justify-center" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                        <FormField
                          control={form.control}
                          name="editElecNo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="editElecNo"
                                className="text-sm text-white"
                              >
                                Meter No.
                              </FormLabel>
                              <FormControl>
                                <>
                                  <Input
                                    id="editElecNo"
                                    type="number"
                                    className="text-sm"
                                    placeholder="1234"
                                    {...field}
                                    icon={<BiSolidUserRectangle size={24} />}
                                  />
                                </>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="editElecUsage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="editElecUsage"
                                className="text-sm text-white"
                              >
                                Usage
                              </FormLabel>
                              <FormControl>
                                <>
                                  <Input
                                    id="editElecUsage"
                                    type="number"
                                    className="text-sm"
                                    placeholder="248.5"
                                    {...field}
                                    icon={<BiSolidUserRectangle size={24} />}
                                  />
                                </>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <div className="flex flex-row gap-2">
                        <p className="whitespace-nowrap text-base font-bold text-white">
                          Electricity
                        </p>
                        <div className="flex w-full items-center">
                          <Separator className="h-[2px] rounded-sm w-full justify-center" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-5">
                        <FormField
                          control={form.control}
                          name="editWaterNo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="editWaterNo"
                                className="text-sm text-white"
                              >
                                Meter No.
                              </FormLabel>
                              <FormControl>
                                <>
                                  <Input
                                    id="editWaterNo"
                                    type="number"
                                    className="text-sm"
                                    placeholder="1234"
                                    {...field}
                                    icon={<BiSolidUserRectangle size={24} />}
                                  />
                                </>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="editWaterUsage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="editWaterUsage"
                                className="text-sm text-white"
                              >
                                Usage
                              </FormLabel>
                              <FormControl>
                                <>
                                  <Input
                                    id="editWaterUsage"
                                    type="number"
                                    className="text-sm"
                                    placeholder="248.5"
                                    {...field}
                                    icon={<BiSolidUserRectangle size={24} />}
                                  />
                                </>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                    <Button
                      type="submit"
                      className="flex w-full text-base font-bold bg-custom-pink text-white"
                    >
                      Save
                    </Button>
                  </form>
                </Form>
              </DialogContent>
            </Dialog>
            <Dialog>
              <DialogTrigger asChild>
                <Button className="flex text-base w-full font-medium bg-custom-gray-background text-black outline-black outline">
                  View Meter
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="text-white">View Meter</DialogTitle>
                </DialogHeader>
                {/* here */}
                <p className="text-white text-xl">Image here</p>
              </DialogContent>
            </Dialog>
          </div>
        )}
      </div>
    </>
  )
}

export default ListOfMeterCard
