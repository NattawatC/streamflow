"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  floor: z.string().nonempty("Floor is required"),
  room: z.string().nonempty("Room number is required"),
  meter: z.string().nonempty("Meter number is required"),
})

export function AddMeterForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      floor: "",
      room: "",
      meter: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="floor" className="text-sm">
                Floor Number
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    id="floor"
                    type="text"
                    className="text-sm"
                    placeholder="Enter floor no."
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
          name="room"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="room" className="text-sm">
                Room Number
              </FormLabel>
              <FormControl>
                <Input
                  id="room"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder="Enter room no."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="meter"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="meter" className="text-sm">
                Meter Number
              </FormLabel>
              <FormControl>
                <Input
                  id="meter"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder="Enter meter no."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full text-base font-bold bg-custom-pink text-black"
        >
          Add
        </Button>
      </form>
    </Form>
  )
}
