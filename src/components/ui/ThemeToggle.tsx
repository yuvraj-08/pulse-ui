"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/components/providers/ThemeProvider"
import { cn } from "@/lib/utils"

interface ThemeToggleProps {
  className?: string
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === "dark"

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.88 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex h-9 w-9 items-center justify-center rounded-xl",
        "border transition-colors duration-300 outline-none",
        "cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500",
        isDark
          ? "border-white/[0.1] bg-white/[0.05] text-zinc-300 hover:bg-white/[0.1]"
          : "border-black/[0.08] bg-black/[0.04] text-zinc-600 hover:bg-black/[0.08]",
        className
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={theme}
          initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.22, ease: "easeInOut" }}
        >
          {isDark ? (
            <Moon className="h-4 w-4" />
          ) : (
            <Sun className="h-4 w-4" />
          )}
        </motion.div>
      </AnimatePresence>
    </motion.button>
  )
}
