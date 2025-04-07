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
import { toast } from "sonner"
import { useEffect, useState } from "react"
import { DialogDescription } from "@radix-ui/react-dialog"
import supabase from "@/config/supabaseClient"

const formSchema = z.object({
  editElecNo: z.string().min(1, "Electricity meter number is required"),
  editElecUsage: z.coerce.number().min(0, "Usage must be a positive number"),
  editWaterNo: z.string().min(1, "Water meter number is required"),
  editWaterUsage: z.coerce.number().min(0, "Usage must be a positive number"),
})

interface EditMeterDialogProps {
  roomNumber: string
  electricityNo: string
  electricityUsage: number
  waterNo: string
  waterUsage: number
  children: React.ReactNode
}

const EditMeterForm: React.FunctionComponent<EditMeterDialogProps> = ({
  roomNumber,
  electricityNo,
  electricityUsage,
  waterNo,
  waterUsage,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [shouldUpdate, setShouldUpdate] = useState(false)
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema> | null>(null)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      editElecNo: electricityNo,
      editElecUsage: electricityUsage,
      editWaterNo: waterNo,
      editWaterUsage: waterUsage,
    },
  })

  useEffect(() => {
    if (!shouldUpdate || !formValues) return

    const updateMeters = async () => {
      try {
        const { data: electricityData } = await supabase
          .from("electricity")
          .update([
            {
              meter_no: formValues.editElecNo,
              kWh: formValues.editElecUsage,
            },
          ])
          .eq("room_no", roomNumber)
          .select()

        const { data: waterData, error } = await supabase
          .from("water")
          .update([
            {
              meter_no: formValues.editWaterNo,
              usage: formValues.editWaterUsage,
            },
          ])
          .eq("room_no", roomNumber)
          .select()

        if (error) {
          throw new Error(error.message)
        }

        toast.success("Meter records updated successfully")
        window.location.reload()
        setIsOpen(false)
      } catch (error) {
        toast.error("Failed to update meter records")
        console.error("Error updating meter records:", error)
      } finally {
        setShouldUpdate(false)
      }
    }

    updateMeters()
  }, [shouldUpdate, formValues])

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form submitted with values:", values)
    setFormValues(values)
    setShouldUpdate(true)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-white">
            Meter Room {roomNumber}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription></DialogDescription>
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
                        Usage (kWh)
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="editElecUsage"
                          type="number"
                          className="text-sm"
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
                        Usage (m³)
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="editWaterUsage"
                          type="number"
                          className="text-sm"
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
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? "Saving..." : "Save"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default EditMeterForm
