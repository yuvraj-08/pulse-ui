"use client"

import { motion, AnimatePresence } from "framer-motion"
import { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  rightElement?: React.ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, rightElement, className, id, ...props }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-")

    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "text-xs font-medium transition-colors duration-200",
            error ? "text-red-400" : isFocused ? "text-violet-400" : "text-zinc-400"
          )}
        >
          {label}
        </label>

        <div className="relative">
          <motion.div
            animate={{
              boxShadow: error
                ? "0 0 0 2px rgba(239,68,68,0.45)"
                : isFocused
                ? "0 0 0 2px rgba(139,92,246,0.55)"
                : "0 0 0 1px rgba(255,255,255,0.08)",
            }}
            transition={{ duration: 0.15 }}
            className="rounded-xl overflow-hidden"
          >
            <input
              ref={ref}
              id={inputId}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={cn(
                "w-full px-4 py-3 text-sm outline-none transition-colors duration-200",
                "bg-white/[0.05] dark:bg-white/[0.05] bg-zinc-100",
                "text-zinc-900 dark:text-zinc-100",
                "placeholder:text-zinc-400 dark:placeholder:text-zinc-600",
                "hover:bg-zinc-200/70 dark:hover:bg-white/[0.07]",
                rightElement && "pr-12",
                className
              )}
              {...props}
            />
          </motion.div>

          {rightElement && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key={error}
              initial={{ opacity: 0, y: -4, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -4, height: 0 }}
              transition={{ duration: 0.18 }}
              className="text-xs text-red-400 flex items-center gap-1.5 overflow-hidden"
            >
              <span className="inline-block h-1 w-1 shrink-0 rounded-full bg-red-400" />
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    )
  }
)

Input.displayName = "Input"
