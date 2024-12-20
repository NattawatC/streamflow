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
import { Lasso } from "lucide-react"
import { getEndPoints } from "recharts/types/cartesian/ReferenceLine"
import { generateCategoricalChart } from "recharts/types/chart/generateCategoricalChart"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  firstName: z.string().nonempty("First Name is required"),
  lastName: z.string().nonempty("Last Name is required"),
  age: z.string().nonempty("Age is required"),
  gender: z.string().nonempty("Gender is required"),
  phoneNumber: z.string().nonempty("Phone Number is required"),
  // estateName: z.string().nonempty("Estate Name is required"),
  // address: z.string().nonempty("Address is required"),
  // buildingNumber: z.string().nonempty("Building Number is required"),
  // floorNumber: z.string().nonempty("Floor Number is required"),
  // furnitureCost: z.string().nonempty("Furniture Cost is required"),
  // roomCharge: z.string().nonempty("Room Charge is required"),
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
      // estateName: "",
      // address: "",
      // buildingNumber: "",
      // floorNumber: "",
      // furnitureCost: "",
      // roomCharge: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
    router.push("/owner/home")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <div className= "flex flex-col gap-3">
          <p className= "font-bold text-base">Basic Information</p>
          <div className = "flex flex-col gap-5">
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
          </div>
        </div>
        {/* <div className="flex flex-col gap-3">
            <div className="flex flex-row gap-2">
              <p className="whitespace-nowrap font-bold">Estate Information*</p>
              <div className="flex w-full items-center">
                <Separator className="h-[2px] rounded-sm w-full justify-center" />
              </div>
            </div>
          <div className="flex flex-col gap-5">
            <FormField
              control={form.control}
              name="estateName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="estateName" className="text-sm">Name</FormLabel>
                  <FormControl>
                    <Input
                      id="estateName"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder="Enter place name"
                      {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="address" className="text-sm">Address</FormLabel>
                  <FormControl>
                    <Input
                      id="address"
                      type="text"
                      className="text-sm"
                      icon={<BiSolidUserRectangle size={24} />}
                      placeholder="Enter address"
                      {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
              />
          </div> 
        </div> */}
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


{/* <div className="flex flex-row gap-2">
  <p className="whitespace-nowrap font-bold">Basic Information</p>
  <div className="flex w-full items-center">
    <Separator className="h-[2px] rounded-sm w-full justify-center" />
  </div>
</div> */}