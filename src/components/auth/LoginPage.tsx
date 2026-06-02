"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Zap } from "lucide-react"
import { useIdle } from "@/hooks/useIdle"
import { useTheme } from "@/components/providers/ThemeProvider"
import { LoginForm } from "@/components/auth/LoginForm"
import { Screensaver } from "@/components/screensaver/Screensaver"
import { ThemeToggle } from "@/components/ui/ThemeToggle"

export function LoginPage() {
  const isIdle = useIdle(15_000)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  return (
    <div className={`relative min-h-screen flex flex-col overflow-hidden transition-colors duration-300 ${isDark ? "bg-zinc-950" : "bg-zinc-50"}`}>
      <Screensaver isVisible={isIdle} />

      {/* Ambient orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div style={{
          position: "absolute", width: 600, height: 600, top: "-15%", left: "-10%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(109,40,217,${isDark ? 0.12 : 0.08}), transparent 70%)`,
          filter: "blur(40px)",
        }} />
        <div style={{
          position: "absolute", width: 500, height: 500, bottom: "-10%", right: "-5%",
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(37,99,235,${isDark ? 0.1 : 0.06}), transparent 70%)`,
          filter: "blur(40px)",
        }} />
      </div>

      {/* Top bar */}
      <div className={`relative z-10 flex items-center justify-between px-6 h-14 border-b ${isDark ? "border-white/[0.06]" : "border-black/[0.06]"}`}>
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-600"
          >
            <Zap className="h-3 w-3 text-white" />
          </motion.div>
          <span className={`text-sm font-semibold tracking-tight ${isDark ? "text-zinc-100" : "text-zinc-900"}`}>
            Pulse
          </span>
        </Link>

        <ThemeToggle />
      </div>

      {/* Form */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: "spring", stiffness: 90, damping: 14 }}
          className="w-full flex items-center justify-center"
        >
          <LoginForm />
        </motion.div>
      </div>
    </div>
  )
}
