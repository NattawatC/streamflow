"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
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
import { Input } from "@/components/ui/input"
import supabase from "@/config/supabaseClient"

interface EditTenantFormProps {
  id: string | null
  building_no: string
  floor_no: string
  room_no: string
}

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  building: z.string(),
  floor: z.string(),
  room: z.string(),
})

export function EditTenantForm({
  id,
  building_no,
  floor_no,
  room_no,
}: EditTenantFormProps) {
  const router = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
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
        building_no: values.building,
        floor_no: values.floor,
        room_no: values.room,
      })
      .eq("id", id) // Use the tenant's ID to identify which tenant to update
      .select()

    if (error) {
      console.error("Error updating tenant:", error.message)
    } else {
      console.log("Tenant updated successfully:", data)
      // Redirect after successful update
      router.push(`/owner/tenant-info?id=${id}`)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
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
