import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/api/lib/utils"

const badgeVariants = cva(
  "rounded-full border px-2 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "border-transparent text-primary-foreground ",
        // secondary:
        //   "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        // destructive:
        //   "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        // outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
