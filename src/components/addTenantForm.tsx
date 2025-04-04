"use client"

// Icon
import { PiGenderNeuterFill } from "react-icons/pi"
import { TbListNumbers } from "react-icons/tb"
import { FaSquarePhone } from "react-icons/fa6"
import { BiSolidUserRectangle } from "react-icons/bi"
import { FaGraduationCap } from "react-icons/fa"
import { RiBuilding2Fill } from "react-icons/ri"
import { MdBedroomParent } from "react-icons/md"
import { PiStepsDuotone } from "react-icons/pi"

// Backend
import supabase from "@/config/supabaseClient"

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
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.coerce.number().positive("Age must be positive"),
  gender: z.string(),
  yearOfStudy: z.string(),
  phoneNumber: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number"),
  dorm: z.string().min(1, "Dorm selection is required"),
  building: z.string(),
  floor: z.string(),
  room: z.string(),
})

export function AddTenantForm() {
  const router = useRouter()

  // Get Estate Selections
  const [estates, setEstates] = useState<{ id: number; name: string }[]>([])
  useEffect(() => {
    async function fetchEstates() {
      const { data: estates, error } = await supabase
        .from("estates")
        .select("id, name")
      if (error) {
        console.error("Error fetching estates:", error.message)
      } else {
        setEstates(estates)
      }
    }
    fetchEstates()
  }, [])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      age: 0,
      gender: "",
      yearOfStudy: "1",
      phoneNumber: "",
      dorm: "",
      building: "",
      floor: "",
      room: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Find estate_id
    const estate = estates.find((estate) => estate.name === values.dorm)
    if (!estate) {
      console.error("Dorm not found")
      return
    }

    const { data, error } = await supabase
      .from("tenants")
      .insert([
        {
          estate_id: estate.id,
          first_name: values.firstName,
          last_name: values.lastName,
          age: values.age,
          gender: values.gender,
          year_of_study: values.yearOfStudy,
          phone_number: values.phoneNumber,
          building_no: values.building,
          floor_no: values.floor,
          room_no: values.room,
          room_status: true,
        },
      ])
      .select()

    //   Error Checking
    if (error) {
      console.error("Error inserting tenant:", error.message)
    } else {
      console.log("Tenant inserted successfully:", data)
      router.push("/owner/result")
    }
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
                    {estates.map(({ name }) => (
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

        <Link href={"/owner"}>
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
