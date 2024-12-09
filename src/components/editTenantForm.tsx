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
  building: z.string().nonempty("Building is required"),
  level: z.string().nonempty("Level is required"),
  roomnumber: z.string().nonempty("Room Number is required"),
})

export function EditTenantForm() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      building: "",
      level: "",
      roomnumber: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
    router.push("/tenantInfo")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="building"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="building" className="text-sm">Building</FormLabel>
              <FormControl>
                <>
                  <Input
                    id="building"
                    type="text"
                    className="text-sm"
                    placeholder="19"
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
          name="level"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="level" className="text-sm">Level/Floor</FormLabel>
              <FormControl>
                <Input
                    id="level"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder="4"
                  {...field}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="roomnumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="roomnumber" className="text-sm">Room Number</FormLabel>
              <FormControl>
                <Input
                    id="roomnumber"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder="1234"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full text-base font-bold mt-8 bg-custom-green text-black"
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
