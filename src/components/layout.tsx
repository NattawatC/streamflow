import { cn } from "@/api/lib/utils"
import React, { ComponentProps } from "react"

export const MainLayout: React.FunctionComponent<ComponentProps<"main">> = ({
  className,
  children,
  ...props
}) => {
  return (
    <main
      className={cn(
        className,
        "min-h-screen mx-auto w-full max-w-md px-7 py-8"
      )}
      {...props}
    >
      {children}
    </main>
  )
}
