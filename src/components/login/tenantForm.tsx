"use client"

import { BiSolidUserRectangle } from "react-icons/bi"
import { IoIosLock } from "react-icons/io"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
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
import { useRouter } from "next/navigation"
import supabase from "@/config/supabaseClient"
import { toast } from "sonner"

const formSchema = z.object({
  room_no: z.string(),
  password: z.string(),
})

export function LoginResidentForm() {
  const router = useRouter()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      room_no: "",
      password: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { data: resident, error } = await supabase
        .from("tenants")
        .select("*")
        .eq("room_no", values.room_no)
        .single()

      if (error || !resident) {
        throw new Error("Room number not found")
      }

      if (resident.password !== values.password) {
        throw new Error("Incorrect password")
      }

      if (resident) {
        router.push(`/tenant?room_no=${values.room_no}`)
      }

      toast("Login successful")
    } catch (error) {
      toast("Login failed")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="room_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Room Number</FormLabel>
              <FormControl>
                <Input
                  className="text-sm"
                  placeholder="1234"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  className="text-sm"
                  icon={<IoIosLock size={24} />}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex text-xs justify-center underline">
                <Link href={"/forgetPassword"}>Forget password?</Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="flex w-full text-base font-bold mt-8">
          Login
        </Button>
      </form>
    </Form>
  )
}
