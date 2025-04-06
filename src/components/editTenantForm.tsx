"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
import { PiGenderNeuterFill } from "react-icons/pi"
import { TbListNumbers } from "react-icons/tb"
import { FaSquarePhone } from "react-icons/fa6"
import { FaGraduationCap } from "react-icons/fa"
import { RiBuilding2Fill } from "react-icons/ri"
import { MdBedroomParent } from "react-icons/md"
import { PiStepsDuotone } from "react-icons/pi"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
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
import supabase from "@/config/supabaseClient"
import { toast } from "sonner"

interface EditTenantFormProps {
  id: string | null
  first_name: string
  last_name: string
  age: string
  gender: string
  phone_number: string
  year_of_study: string
  building_no: string
  floor_no: string
  room_no: string
}

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  age: z.string(),
  gender: z.string(),
  phone_number: z.string(),
  year_of_study: z.string(),
  building: z.string(),
  floor: z.string(),
  room: z.string(),
})

export function EditTenantForm({
  id,
  first_name,
  last_name,
  age,
  gender,
  phone_number,
  year_of_study,
  building_no,
  floor_no,
  room_no,
}: EditTenantFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: first_name,
      last_name: last_name,
      age: age,
      gender: gender,
      phone_number: phone_number,
      year_of_study: year_of_study,
      building: building_no,
      floor: floor_no,
      room: room_no,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!id) {
      console.error("No tenant ID provided!")
      return
    }

    const { data, error } = await supabase
      .from("tenants")
      .update({
        first_name: values.first_name,
        last_name: values.last_name,
        age: values.age,
        gender: values.gender,
        phone_number: values.phone_number,
        year_of_study: values.year_of_study,
        building_no: values.building,
        floor_no: values.floor,
        room_no: values.room,
      })
      .eq("id", id)
      .select()

    if (error) {
      toast(error.message)
      console.error("Error updating tenant:", error.message)
    } else {
      toast("Tenant updated successfully")
      console.log("Tenant updated successfully:", data)
      router.push(`/owner/tenant-info?id=${id}`)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <p className="font-medium text-lg">Basic Information</p>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="first_name" className="text-sm">
                First Name
              </FormLabel>
              <FormControl>
                <Input
                  id="first_name"
                  type="text"
                  className="text-sm"
                  placeholder={first_name}
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
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="last_name" className="text-sm">
                Last Name
              </FormLabel>
              <FormControl>
                <Input
                  id="last_name"
                  type="text"
                  className="text-sm"
                  placeholder={last_name}
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
              <FormLabel htmlFor="age" className="text-sm">
                Age
              </FormLabel>
              <FormControl>
                <Input
                  id="age"
                  type="text"
                  className="text-sm"
                  placeholder={age}
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
                    <SelectValue placeholder={gender} />
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
          name="phone_number"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Phone Number</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder={phone_number}
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
          name="year_of_study"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Year of Study</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<PiGenderNeuterFill size={24} />}
                  >
                    <SelectValue placeholder={year_of_study} />
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
          name="building"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="building" className="text-sm">
                Building
              </FormLabel>
              <FormControl>
                <Input
                  id="building"
                  type="text"
                  className="text-sm"
                  placeholder={building_no}
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
          name="floor"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="level" className="text-sm">
                Level/Floor
              </FormLabel>
              <FormControl>
                <Input
                  id="level"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder={floor_no}
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
              <FormLabel htmlFor="roomnumber" className="text-sm">
                Room Number
              </FormLabel>
              <FormControl>
                <Input
                  id="roomnumber"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder={room_no}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex w-full text-base font-bold bg-custom-green text-black"
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
