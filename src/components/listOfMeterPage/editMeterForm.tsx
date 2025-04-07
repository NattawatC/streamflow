"use client"

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
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  updateElectricityMeter,
  updateWaterMeter,
} from "@/api/services/meterService"
import { toast } from "sonner"

const formSchema = z.object({
  editElecNo: z.string(),
  editElecUsage: z.coerce.number(),
  editWaterNo: z.string(),
  editWaterUsage: z.coerce.number(),
})

interface EditMeterDialogProps {
  roomNumber: string
  electricityNo: string
  electrictyUsage: number
  waterNo: string
  waterUsage: number
  children: React.ReactNode
}

export function EditMeterDialog({
  roomNumber,
  electricityNo,
  electrictyUsage,
  waterNo,
  waterUsage,
  children,
}: EditMeterDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      editElecNo: electricityNo,
      editElecUsage: electrictyUsage,
      editWaterNo: waterNo,
      editWaterUsage: waterUsage,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Update electricity meter
      const elecResponse = await updateElectricityMeter({
        room_no: roomNumber,
        meter_no: values.editElecNo,
        kWh: values.editElecUsage,
      })

      // Update water meter
      const waterResponse = await updateWaterMeter({
        room_no: roomNumber,
        meter_no: values.editWaterNo,
        usage: values.editWaterUsage,
      })

      if (elecResponse.error || waterResponse.error) {
        throw new Error(elecResponse.error || waterResponse.error)
      }

      toast("success", {
        description: "Meter records updated successfully",
      })

      form.reset({
        editElecNo: values.editElecNo,
        editElecUsage: values.editElecUsage,
        editWaterNo: values.editWaterNo,
        editWaterUsage: values.editWaterUsage,
      })

      window.location.reload()
    } catch (error) {
      return error
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">
            Meter Room {roomNumber}
          </DialogTitle>
        </DialogHeader>
        {/* <DialogDescription> */}
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
                        <Input
                          id="editElecNo"
                          type="text"
                          className="text-sm"
                          placeholder={electricityNo}
                          {...field}
                          icon={<BiSolidUserRectangle size={24} />}
                        />
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
                      <FormLabel className="text-sm text-white">
                        Usage
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="editElecUsage"
                          type="number"
                          className="text-sm"
                          placeholder={electrictyUsage.toString()}
                          {...field}
                          icon={<BiSolidUserRectangle size={24} />}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-row gap-2">
                <p className="whitespace-nowrap text-base font-bold text-white">
                  Water
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
                      <FormLabel className="text-sm text-white">
                        Meter No.
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="editWaterNo"
                          type="text"
                          className="text-sm"
                          placeholder={waterNo}
                          {...field}
                          icon={<BiSolidUserRectangle size={24} />}
                        />
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
                        <Input
                          id="editWaterUsage"
                          type="number"
                          className="text-sm"
                          placeholder={waterUsage.toString()}
                          {...field}
                          icon={<BiSolidUserRectangle size={24} />}
                        />
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
        {/* </DialogDescription> */}
      </DialogContent>
    </Dialog>
  )
}
