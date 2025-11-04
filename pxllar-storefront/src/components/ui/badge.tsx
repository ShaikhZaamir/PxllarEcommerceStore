import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "lib/utils"
import * as React from "react"

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-blue-100 text-blue-800",         // 💙 Light blue background, dark blue text
        destructive: "bg-red-500 text-white",           // 🔴 Bright red background, white text
        outline: "border border-input text-foreground", // ⚫ Outline style
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
