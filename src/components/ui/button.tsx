import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import React from "react"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all duration-300 outline-none select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-white to-neutral-200 text-neutral-950 shadow-[0_1px_2px_rgba(0,0,0,0.1),0_2px_4px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] hover:from-white hover:to-neutral-100 hover:shadow-[0_2px_4px_rgba(0,0,0,0.15),0_4px_8px_rgba(0,0,0,0.1),0_0_15px_rgba(255,255,255,0.3),inset_0_1px_0_rgba(255,255,255,1)]",
        secondary:
          "bg-neutral-800 text-neutral-100 border border-neutral-700 shadow-elevation-1 hover:bg-neutral-700 hover:border-neutral-600 hover:shadow-elevation-2 hover:text-white",
        outline:
          "border border-white/10 bg-neutral-900/40 text-neutral-300 shadow-sm backdrop-blur-md hover:bg-white/5 hover:border-white/20 hover:text-white hover:shadow-elevation-1",
        ghost:
          "text-neutral-400 hover:bg-white/5 hover:text-neutral-100",
        destructive:
          "bg-destructive/10 text-destructive border border-destructive/20 hover:bg-destructive/20 hover:border-destructive/30",
        link: "text-brand-400 underline-offset-4 hover:underline hover:text-brand-300",
      },
      size: {
        default: "h-9 gap-2 px-4 py-2",
        sm: "h-8 gap-1.5 rounded-md px-3 text-xs",
        lg: "h-10 gap-2 rounded-lg px-8",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends ButtonPrimitive.Props,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, children, ...props }, ref) => {
    return (
      <ButtonPrimitive
        ref={ref}
        data-slot="button"
        className={cn(buttonVariants({ variant, size, className }))}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-70" />}
        {children}
      </ButtonPrimitive>
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
