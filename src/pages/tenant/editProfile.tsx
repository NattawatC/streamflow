"use client"
import { BiSolidUserRectangle } from "react-icons/bi"
import { PiGenderNeuterFill } from "react-icons/pi"
import { TbListNumbers } from "react-icons/tb"
import { FaSquarePhone } from "react-icons/fa6"
import { FaGraduationCap } from "react-icons/fa"
import { FaRegAddressBook } from "react-icons/fa"
import { AiOutlineNumber } from "react-icons/ai"

import { NextPage } from "next"
import { MainLayout } from "@/components/layout"
import { ProvinceField } from "@/components/editProfileTenant/provinceInput"
import Link from "next/link"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

const mockData = {
  firstname: "Nattawat",
  lastname: "Chaokraisith",
  age: 20,
  gender: "Male",
  phoneNumber: "000-000-0000",
  address: "691 ถนนฉลองกรุง 1 แยก 6 ลาดกระบัง",
  city: "Bangkok",
  zipCode: "10110",
  building: 99,
  floor: 99,
  roomNumber: 1234,
  status: "Payment Incomplete",
  yearOfStudy: 4,
}

const formSchema = z.object({
  firstname: z.string(),
  lastname: z.string(),
  age: z.coerce.number(),
  gender: z.string(),
  yearOfStudy: z.string(),
  phoneNumber: z.string(),
  address: z.string(),
  province: z.string(),
  zipcode: z.string(),
})

export function EditProfileForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      age: mockData.age,
      gender: "",
      yearOfStudy: "",
      phoneNumber: "",
      address: "",
      province: "",
      zipcode: "",
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        <p className="font-medium text-lg">Basic Information</p>
        <FormField
          control={form.control}
          name="firstname"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="building" className="text-sm">
                Firstname
              </FormLabel>
              <FormControl>
                <>
                  <Input
                    id="building"
                    type="text"
                    className="text-sm"
                    placeholder={mockData.firstname}
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
          name="lastname"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="level" className="text-sm">
                Lastname
              </FormLabel>
              <FormControl>
                <Input
                  id="level"
                  type="text"
                  className="text-sm"
                  icon={<BiSolidUserRectangle size={24} />}
                  placeholder={mockData.lastname}
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
                  type="number"
                  className="text-sm"
                  icon={<TbListNumbers size={24} />}
                  placeholder={String(mockData.age)}
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
                    <SelectValue placeholder={mockData.gender} />
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
          name="yearOfStudy"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Year Of Study</FormLabel>
              <FormControl>
                <Select onValueChange={(value) => field.onChange(value)}>
                  <SelectTrigger
                    className="flex w-full"
                    icon={<FaGraduationCap size={24} />}
                  >
                    <SelectValue placeholder={mockData.yearOfStudy} />
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
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Phone Number</FormLabel>
              <FormControl>
                <>
                  <Input
                    className="text-sm"
                    placeholder={mockData.phoneNumber}
                    {...field}
                    icon={<FaSquarePhone size={24} />}
                  />
                </>
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
                <>
                  <Input
                    className="text-sm"
                    placeholder={mockData.address}
                    {...field}
                    icon={<FaRegAddressBook size={20} />}
                  />
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <ProvinceField control={form.control} />

        <FormField
          control={form.control}
          name="zipcode"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Postal Number</FormLabel>
              <FormControl>
                <>
                  <Input
                    className="text-sm"
                    placeholder={mockData.zipCode}
                    {...field}
                    icon={<AiOutlineNumber size={20} />}
                  />
                </>
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
          <Link href={"/tenant/setting"}>
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

const editProfile: NextPage = () => {
  return (
    <>
      <MainLayout className="flex flex-col gap-7">
        <div className="flex text-left gap-2">
          <h1 className="font-bold text-2xl">Edit Profile</h1>
        </div>

        <div className="flex flex-col gap-2">
          <EditProfileForm />
        </div>
      </MainLayout>
    </>
  )
}
export default editProfile
