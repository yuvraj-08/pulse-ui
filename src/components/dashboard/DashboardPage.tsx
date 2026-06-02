"use client"

import { useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { LogOut, Eye, FolderOpen, CheckSquare, Star, Zap } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { useIdle } from "@/hooks/useIdle"
import { Screensaver } from "@/components/screensaver/Screensaver"
import { StatsCard } from "@/components/dashboard/StatsCard"
import { ActivityFeed } from "@/components/dashboard/ActivityFeed"
import { Button } from "@/components/ui/Button"

interface AvatarMenuProps {
  initials: string
  name: string
  email: string
  onLogout: () => void
}

function AvatarMenu({ initials, name, email, onLogout }: AvatarMenuProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div ref={ref} className="relative">
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileTap={{ scale: 0.92 }}
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="h-8 w-8 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-semibold text-violet-600 dark:text-violet-300 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-violet-500"
      >
        {initials}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: -8 }}
            transition={{ type: "spring", stiffness: 300, damping: 22 }}
            className="absolute right-0 top-11 z-50 w-52 rounded-2xl border border-black/[0.08] dark:border-white/[0.1] bg-white dark:bg-zinc-900 shadow-xl dark:shadow-black/40 overflow-hidden"
          >
            {/* User info */}
            <div className="px-4 py-3 border-b border-black/[0.06] dark:border-white/[0.06]">
              <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">{name}</p>
              <p className="text-xs text-zinc-400 dark:text-zinc-500 truncate mt-0.5">{email}</p>
            </div>

            {/* Sign out */}
            <button
              onClick={() => { setOpen(false); onLogout() }}
              className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-white/[0.05] hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150 cursor-pointer"
            >
              <LogOut className="h-3.5 w-3.5" />
              Sign out
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

interface AuthUser {
  email: string
  name: string
}

const STATS = [
  {
    label: "Total Views",
    value: 24891,
    icon: <Eye className="h-4 w-4 text-blue-400" />,
    iconBg: "bg-blue-500/10",
  },
  {
    label: "Projects",
    value: 12,
    icon: <FolderOpen className="h-4 w-4 text-violet-400" />,
    iconBg: "bg-violet-500/10",
  },
  {
    label: "Tasks Done",
    value: 847,
    icon: <CheckSquare className="h-4 w-4 text-emerald-400" />,
    iconBg: "bg-emerald-500/10",
  },
  {
    label: "Score",
    value: 98,
    suffix: "%",
    icon: <Star className="h-4 w-4 text-amber-400" />,
    iconBg: "bg-amber-500/10",
  },
]

export function DashboardPage() {
  const router = useRouter()
  const isIdle = useIdle(10_000)
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem("auth_user")
    if (!stored) {
      router.replace("/login")
      return
    }
    setUser(JSON.parse(stored) as AuthUser)
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("auth_user")
    router.push("/login")
  }

  if (!user) return null

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")

  const firstName = user.name.split(" ")[0]

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      <Screensaver isVisible={isIdle} />

      {/* Navbar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="sticky top-0 z-40 border-b border-black/[0.06] dark:border-white/[0.06] bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl"
      >
        <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <motion.div
              whileHover={{ rotate: 15, scale: 1.1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
              className="h-7 w-7 rounded-lg bg-violet-600 flex items-center justify-center"
            >
              <Zap className="h-3.5 w-3.5 text-white" />
            </motion.div>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100 tracking-tight group-hover:text-violet-500 transition-colors duration-200">Pulse</span>
          </Link>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <AvatarMenu
              initials={initials}
              name={user.name}
              email={user.email}
              onLogout={handleLogout}
            />
          </div>
        </div>
      </motion.nav>

      {/* Page content */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Welcome heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 100, damping: 14 }}
          className="mb-10"
        >
          <h1 className="text-3xl font-semibold text-zinc-900 dark:text-zinc-50 tracking-tight">
            Good day,{" "}
            <span className="text-violet-500 dark:text-violet-400">{firstName}</span>
          </h1>
          <p className="mt-1.5 text-zinc-500 text-sm">
            Here&apos;s what&apos;s happening with your workspace today.
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {STATS.map((stat, i) => (
            <StatsCard key={stat.label} {...stat} delay={0.2 + i * 0.08} />
          ))}
        </div>

        {/* Activity feed */}
        <ActivityFeed />
      </main>
    </div>
  )
}
