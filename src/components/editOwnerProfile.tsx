"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/router"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
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
import { platform } from "os"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  firstName: z.string().nonempty("Firstname is required"),
  lastName: z.string().nonempty("Lastname is required"),
  age: z.string().nonempty("Age is required"),
  gender: z.string().nonempty("Gender is required"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
})

export function EditOwnerProfile() {
  const router = useRouter();
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: "",
      gender: "",
      phoneNumber: "",
    },
})

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
    router.push("owner/home")
  }

  return (  
    <>
    <div className="flex flex-col gap-8">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
              <FormItem>
              <FormLabel htmlFor="firstName" className="text-sm">Firstname</FormLabel>
              <FormControl>
                <>
                  <Input
                    id="firstName"
                    type="text"
                    className="text-sm"
                    placeholder="John"
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
          name="lastName"
          render={({ field }) => (
              <FormItem>
              <FormLabel htmlFor="lastName" className="text-sm">Lastname</FormLabel>
              <FormControl>
                <Input
                    id="lastName"
                    type="text"
                    className="text-sm"
                    icon={<BiSolidUserRectangle size={24} />}
                    placeholder="Doe"
                    {...field}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
              <FormItem>
              <FormLabel htmlFor="age" className="text-sm">Age</FormLabel>
              <FormControl>
                <Input
                    id="age"
                    type="text"
                    className="text-sm"
                    icon={<BiSolidUserRectangle size={24} />}
                    placeholder="50"
                  {...field}
                  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
              <FormItem>
              <FormLabel htmlFor="gender" className="text-sm">Gender</FormLabel>
              <FormControl>
                <Input
                    id="gender"
                    type="text"
                    className="text-sm"
                    icon={<BiSolidUserRectangle size={24} />}
                    placeholder="Enter your gender"
                    {...field}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
              <FormItem>
              <FormLabel htmlFor="phoneNumber" className="text-sm">Phone Number</FormLabel>
              <FormControl>
                <Input
                    id="phoneNumber"
                    type="text"
                    className="text-sm"
                    icon={<BiSolidUserRectangle size={24} />}
                    placeholder="000-000-0000"
                    {...field}
                    />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
          />
        </form>
        </Form>
        {/* <div className="flex flex-row gap-2">
            <p className="whitespace-nowrap font-bold">Estate Information*</p>
            <div className="flex w-full items-center">
            <Separator className="h-[2px] rounded-sm w-full justify-center" />
            </div>
        </div> */}
    </div>
    </>
  )
}

{/* <Button
type="submit"
className="flex w-full text-base font-bold mt-8 bg-custom-green text-black"
>
Save
</Button> */}
