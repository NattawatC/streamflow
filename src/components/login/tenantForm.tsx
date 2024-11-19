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

const formSchema = z.object({
  username: z.string(),
  password: z.string(),
})

export function LoginResidentForm() {
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
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">Username</FormLabel>
              <FormControl>
                <>
                  <Input
                    className="text-sm"
                    placeholder="John"
                    {...field}
                    icon={<BiSolidUserRectangle size={24} />}
                  />
                </>
              </FormControl>
              <FormDescription className="text-xs">
                This is your firstname when you created an account
              </FormDescription>
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

        <Link href={"/tenant/home"}>
          <Button
            type="submit"
            className="flex w-full text-base font-bold mt-8"
          >
            Login
          </Button>
        </Link>
      </form>
    </Form>
  )
}
