"use client"
// need to change routing like editTenantInfo.tsx
import { BiSolidUserRectangle } from "react-icons/bi"
import { IoIosLock } from "react-icons/io"

import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
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
import { useTransition } from "react"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"
import { loginAction } from "@/actions/users"

// needed to use, creaate new component "form" for new page
const formSchema = z.object({
  email: z.string().nonempty("Username is required").email(),
  password: z.string().nonempty("Password is required"),
})

export function LoginOwnerForm() {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      const { errorMessage } = await loginAction(values)

      if (errorMessage) {
        toast("Event has been created.")

      } else {
        router.push("/owner")
        toast("Event has been created.")
      }
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm">
                Email
              </FormLabel>
              <FormControl>
                  <Input
                    id="email"
                    className="text-sm"
                    placeholder="John@gmail.com"
                    disabled={isPending}
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
              <FormLabel htmlFor="password" className="text-sm">
                Password
              </FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  className="text-sm"
                  icon={<IoIosLock size={24} />}
                  disabled={isPending}
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormDescription className="flex text-xs justify-center underline" >
                <Link href={"/forgetPassword"}>Forget password?</Link>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="flex w-full text-base font-bold mt-8" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin"/> : "Login"}
        </Button>
      </form>
    </Form>
  )
}
