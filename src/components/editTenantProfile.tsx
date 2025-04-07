"use client"
import { BiSolidUserRectangle } from "react-icons/bi"
import { PiGenderNeuterFill } from "react-icons/pi"
import { TbListNumbers } from "react-icons/tb"
import { FaSquarePhone } from "react-icons/fa6"
import { FaGraduationCap } from "react-icons/fa"
import { FaRegAddressBook } from "react-icons/fa"
import { AiOutlineNumber } from "react-icons/ai"

import Link from "next/link"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"

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
import { useRouter } from "next/navigation"
import { useEffect, useState, useTransition } from "react"
import { Loader2 } from "lucide-react"
import supabase from "@/config/supabaseClient"

interface Props {
  roomId: string | null
}

interface Tenant {
  id: number
  first_name: string
  last_name: string
  age: string
  gender: string
  year_of_study: string
  phone_number: string
  room_no: string | null
  building_no: string
  floor_no: string
  payment_status: boolean
  address: string
  city: string
  zip_code: string
}

const formSchema = z.object({
  first_name: z.string(),
  last_name: z.string(),
  age: z.string(),
  gender: z.string(),
  year_of_study: z.string(),
  phone_number: z.string(),
  address: z.string(),
  city: z.string(),
  zip_code: z.string(),
})

export function EditTenantProfile({ roomId }: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const [tenant, setTenant] = useState<Tenant | null>(null)

  useEffect(() => {
    if (roomId) {
      const fetchTenant = async () => {
        const { data, error } = await supabase
          .from("tenants")
          .select("*")
          .eq("room_no", roomId)
          .single()

        if (error) {
          console.error("Error fetching tenant:", error)
        } else {
          setTenant(data)
        }
      }

      fetchTenant()
    }
  }, [roomId])

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      age: "",
      gender: "",
      year_of_study: "",
      phone_number: "",
      address: "",
      city: "",
      zip_code: "",
    },
  })

  useEffect(() => {
    if (tenant) {
      form.reset({
        first_name: tenant.first_name || "",
        last_name: tenant.last_name || "",
        age: tenant.age || "",
        gender: tenant.gender || "",
        year_of_study: tenant.year_of_study || "",
        phone_number: tenant.phone_number || "",
        address: tenant.address || "",
        city: tenant.city || "",
        zip_code: tenant.zip_code || "",
      })
    }
  }, [tenant, form])

  if (!tenant) {
    return <div>Loading...</div>
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      startTransition(async () => {
        const { data: profileData, error: profileError } = await supabase
          .from("tenants")
          .update({
            first_name: values.first_name,
            last_name: values.last_name,
            age: values.age,
            gender: values.gender,
            year_of_study: values.year_of_study,
            phone_number: values.phone_number,
            address: values.address,
            city: values.city,
            zip_code: values.zip_code,
          })
          .eq("id", tenant?.id)
          .select()

        if (profileError) throw profileError

        toast({
          title: "Profile Updated Successfully",
          description: "Your profile has been updated.",
        })

        router.push(`/tenant/setting?room_no=${roomId}`)
      })
    } catch (error) {
      console.error("Error updating profile:", error)
      toast({
        title: "Error",
        description: "Failed to update profile.",
        variant: "destructive",
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <p className="font-medium text-lg">Basic Information</p>
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Firstname</FormLabel>
              <FormControl>
                <Input
                  id="first_name"
                  type="text"
                  className="text-sm"
                  placeholder={tenant.first_name}
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
              <FormLabel className="text-sm">Lastname</FormLabel>
              <FormControl>
                <Input
                  id="last_name"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder={tenant.last_name}
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
              <FormLabel className="text-sm">Age</FormLabel>
              <FormControl>
                <Input
                  id="age"
                  type="text"
                  className="text-sm"
                  icon={<TbListNumbers size={24} />}
                  placeholder={tenant.age}
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
              <FormLabel className="text-sm">Gender</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<PiGenderNeuterFill size={24} />}
                  >
                    <SelectValue placeholder={tenant.gender} />
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
          name="year_of_study"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Year Of Study</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<FaGraduationCap size={24} />}
                  >
                    <SelectValue placeholder={tenant.year_of_study} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value=">4">over 4</SelectItem>
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
                  type="text"
                  className="text-sm"
                  placeholder={tenant.phone_number}
                  {...field}
                  icon={<FaSquarePhone size={24} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Information */}
        <p className="font-medium text-lg">Address Information</p>
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Address</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-sm"
                  placeholder={tenant.address}
                  {...field}
                  icon={<FaRegAddressBook size={20} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">City</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-sm"
                  placeholder={tenant.city}
                  {...field}
                  icon={<AiOutlineNumber size={20} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zip_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Zip Code</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  className="text-sm"
                  placeholder={tenant.zip_code}
                  {...field}
                  icon={<AiOutlineNumber size={20} />}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col gap-3">
          <Button
            type="submit"
            className="flex w-full text-base font-bold mt-2 bg-custom-green text-black"
          >
            Save
          </Button>
          <Link
            href={{
              pathname: `/tenant/setting`,
              query: { room_no: roomId },
            }}
          >
            <Button
              variant={"outline"}
              className="font-bold border-black outline-black bg-white text-black w-full text-base gap-2 underline"
            >
              Cancle
            </Button>
          </Link>
        </div>
      </form>
    </Form>
  )
}
