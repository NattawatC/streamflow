"use client"

// Icon
import { PiGenderNeuterFill, PiWarningCircleFill } from "react-icons/pi"
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
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.string(),
  gender: z.string(),
  yearOfStudy: z.string(),
  phoneNumber: z.string().regex(/^\d{3}-\d{3}-\d{4}$/, "Invalid phone number"),
  dorm: z.string().min(1, "Dorm selection is required"),
  building: z.string(),
  floor: z.string(),
  room: z.string(),
  password: z.string().nonempty("Password is required"),
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
      age: "",
      gender: "",
      yearOfStudy: "1",
      phoneNumber: "",
      dorm: "",
      building: "",
      floor: "",
      room: "",
      password: "",
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
          password: values.password,
        },
      ])
      .select()

    //   Error Checking
    if (error) {
      console.error("Error inserting tenant:", error.message)
    } else {
      const insertedTenant = data?.[0]
      console.log("Tenant inserted successfully:", insertedTenant)
      router.push(`/owner/result?id=${insertedTenant.id}`)
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
                  type="text"
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
        <FormField
          control={form.control}
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Year of Study</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<PiGenderNeuterFill size={24} />}
                  >
                    <SelectValue placeholder="Select year of study" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value=">4">Over 4</SelectItem>
                  </SelectContent>
                </Select>
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
                  type="text"
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
                  type="text"
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
                  type="text"
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

        <p className="font-medium text-lg">Set the Password</p>
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="text-sm"
                  icon={<MdBedroomParent size={24} />}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              type="button"
              className="flex w-full text-base font-bold mt-8 bg-custom-green text-black"
            >
              Create Tenant's Account
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="flex flex-col gap-4">
              <DialogTitle className="flex text-left text-white">
                Create Tenant's Account
              </DialogTitle>
              <DialogDescription>
                <>
                  <span className="flex flex-col gap-2">
                    <span className="text-white">
                      Have you completed the verification of the tenant's
                      information?
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
                  type="submit"
                  onClick={form.handleSubmit(onSubmit)}
                  className="w-full bg-custom-pink text-black"
                >
                  Yes, I'm sure
                </Button>
                <DialogClose asChild>
                  <Button
                    type="button"
                    className="w-full text-black border "
                    variant={"outline"}
                  >
                    Wait a minute...
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>

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
