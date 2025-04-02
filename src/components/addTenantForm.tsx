"use client"

import { PiGenderNeuterFill } from "react-icons/pi"
import { TbListNumbers } from "react-icons/tb"
import { FaSquarePhone } from "react-icons/fa6"
import { BiSolidUserRectangle } from "react-icons/bi"
import { RiBuilding2Fill } from "react-icons/ri"
import { MdBedroomParent } from "react-icons/md"
import { PiStepsDuotone } from "react-icons/pi"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import router from "next/router"
import Link from "next/link"

const estate = [
  {
    name: "a",
    address: "lol",
  },
  {
    name: "b",
    address: "123 Main St, Springfield",
  },
  {
    name: "c",
    address: "456 Elm St, Shelbyville",
  },
  {
    name: "d",
    address: "789 Oak St, Capital City",
  },
]

const formSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.coerce.number(),
  gender: z.string(),
  phoneNumber: z.string(),
  dorm: z.string(),
  building: z.coerce.number(),
  floor: z.coerce.number(),
  room: z.coerce.number(),
})

export function AddTenantForm() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
      phoneNumber: "",
      dorm: "",
      building: 0,
      floor: 0,
      room: 0,
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)

    router.push("/result")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <p className="font-medium text-lg">Basic Information</p>
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">First Name</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="John"
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
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Last Name</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="Doe"
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
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Age</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="text-sm"
                  placeholder="99"
                  {...field}
                  icon={<TbListNumbers size={24} />}
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
              <FormLabel className="text-sm">Gender</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<PiGenderNeuterFill size={24} />}
                  >
                    <SelectValue placeholder="Select Gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="others">Others</SelectItem>
                  </SelectContent>
                </Select>
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
              <FormLabel className="text-sm">Phone Number</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="xxx-xxx-xxxx"
                  {...field}
                  icon={<FaSquarePhone size={24} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <p className="font-medium text-lg">Room Information</p>
        <FormField
          control={form.control}
          name="dorm"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Dorm Name</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<PiGenderNeuterFill size={24} />}
                  >
                    <SelectValue placeholder="Select Dorm" />
                  </SelectTrigger>
                  <SelectContent>
                    {estate.map(({ name }) => (
                      <SelectItem key={name} value={name}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="building"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Building</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="text-sm"
                  icon={<RiBuilding2Fill size={24} />}
                  placeholder="1, 2, 3, ..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Floor</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="text-sm"
                  icon={<PiStepsDuotone size={24} />}
                  placeholder="1, 2, 3, ..."
                  {...field}
                />
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
              <FormLabel className="text-sm">Room</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  className="text-sm"
                  icon={<MdBedroomParent size={24} />}
                  placeholder="1, 2, 3, ..."
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
          Create Tenant's Account
        </Button>

        <Link href={"/owner/home"}>
          <Button
            variant={"outline"}
            className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2 underline mt-3"
          >
            Cancle
          </Button>
        </Link>
      </form>
    </Form>
  )
}
