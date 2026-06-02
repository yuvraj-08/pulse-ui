"use client"

import { motion, type HTMLMotionProps } from "framer-motion"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Variant = "primary" | "ghost" | "danger"

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode
  variant?: Variant
  isLoading?: boolean
  fullWidth?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30",
  ghost:
    "bg-white/[0.05] hover:bg-white/[0.1] text-zinc-300 border border-white/[0.1]",
  danger:
    "bg-red-600/20 hover:bg-red-600/30 text-red-400 border border-red-500/30",
}

export function Button({
  children,
  variant = "primary",
  isLoading = false,
  fullWidth = false,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: 0.97 }}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      disabled={disabled || isLoading}
      className={cn(
        "relative flex items-center justify-center gap-2 rounded-xl px-5 py-2.5",
        "text-sm font-semibold transition-colors duration-200 outline-none cursor-pointer",
        "focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantStyles[variant],
        fullWidth && "w-full",
        className
      )}
      {...props}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </motion.button>
  )
}
