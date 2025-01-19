"use client"
import * as React from "react"
import * as SwitchPrimitives from "@radix-ui/react-switch"
import { cn } from "@/lib/utils"

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> & { size?: "small" | "medium" | "large" }
>(({ className, size = "medium", ...props }, ref) => {
  const sizeClasses = {
    small: {
      root: "h-4 w-8",
      thumb: "h-3 w-3 translate-x-0 data-[state=checked]:translate-x-4",
    },
    medium: {
      root: "h-6 w-11",
      thumb: "h-5 w-5 translate-x-0 data-[state=checked]:translate-x-5",
    },
    large: {
      root: "h-8 w-14",
      thumb: "h-7 w-7 translate-x-0 data-[state=checked]:translate-x-7",
    },
  }[size]

  return (
    <SwitchPrimitives.Root
      className={cn(
        "peer inline-flex shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
        sizeClasses.root,
        className
      )}
      {...props}
      ref={ref}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none rounded-full bg-background shadow-lg ring-0 transition-transform",
          sizeClasses.thumb
        )}
      />
    </SwitchPrimitives.Root>
  )
})
Switch.displayName = SwitchPrimitives.Root.displayName

export { Switch }
