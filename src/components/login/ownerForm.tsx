"use client"
// need to change routing like editTenantInfo.tsx
import { BiSolidUserRectangle } from "react-icons/bi"
import { IoIosLock } from "react-icons/io"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
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
import { Input } from "@/components/ui/input"
import editTenantInfo from "@/pages/editTenantInfo"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  username: z.string().nonempty("Username is required"),
  password: z.string().nonempty("Password is required"),
})

export function LoginOwnerForm() {
  const router = useRouter()
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values)
    router.push("owner/home")
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="username" className="text-sm">Username</FormLabel>
              <FormControl>
                <>
                  <Input
                    id="username"
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
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password" className="text-sm">Password</FormLabel>
              <FormControl>
                <Input
                  id="password"
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
        <Button
          type="submit"
          className="flex w-full text-base font-bold mt-8"
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
