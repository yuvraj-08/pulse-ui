"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Zap } from "lucide-react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Button } from "@/components/ui/Button"

const NAV_LINKS = [
  { label: "Features", href: "features" },
  { label: "Demo",     href: "demo"     },
]

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
}

export function Navbar() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="sticky top-0 z-40 border-b border-black/[0.06] bg-white/80 backdrop-blur-xl dark:border-white/[0.06] dark:bg-zinc-950/80"
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <motion.div
            whileHover={{ rotate: 15, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600"
          >
            <Zap className="h-3.5 w-3.5 text-white" />
          </motion.div>
          <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
            Pulse
          </span>
        </Link>

        {/* Nav links */}
        <div className="hidden items-center gap-6 sm:flex">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="text-sm text-zinc-500 transition-colors hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link href="/login">
            <Button variant="primary" className="text-xs px-4 py-2">
              Sign in
            </Button>
          </Link>
        </div>
      </nav>
    </motion.header>
  )
}
