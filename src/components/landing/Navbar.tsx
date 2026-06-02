"use client"

import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { Zap, Menu, X, ArrowRight } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import { Button } from "@/components/ui/Button"
import { useTheme } from "@/components/providers/ThemeProvider"

const NAV_LINKS = [
  { label: "Features", href: "features" },
  { label: "Demo",     href: "demo"     },
]

function scrollTo(id: string, onDone?: () => void) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  onDone?.()
}

export function Navbar() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === "dark"

  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
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

          {/* Desktop nav links */}
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

            {/* Desktop sign in */}
            <Link href="/login" className="hidden sm:block">
              <Button variant="primary" className="text-xs px-4 py-2">
                Sign in
              </Button>
            </Link>

            {/* Mobile hamburger */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setDrawerOpen((v) => !v)}
              className="flex sm:hidden h-9 w-9 items-center justify-center rounded-xl border border-black/[0.08] dark:border-white/[0.1] bg-black/[0.04] dark:bg-white/[0.05] text-zinc-600 dark:text-zinc-300 cursor-pointer"
              aria-label="Open menu"
            >
              {drawerOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </motion.button>
          </div>
        </nav>
      </motion.header>

      {/* Backdrop */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closeDrawer}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm sm:hidden"
          />
        )}
      </AnimatePresence>

      {/* Slide-in drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            key="drawer"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 left-0 z-50 h-full w-72 sm:hidden flex flex-col"
            style={{
              background: isDark ? "rgba(14,12,24,0.98)" : "rgba(255,255,255,0.98)",
              backdropFilter: "blur(20px)",
              borderRight: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between px-6 h-16 border-b border-black/[0.06] dark:border-white/[0.06]">
              <Link href="/" onClick={closeDrawer} className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-violet-600">
                  <Zap className="h-3.5 w-3.5 text-white" />
                </div>
                <span className="font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">Pulse</span>
              </Link>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeDrawer}
                className="h-8 w-8 flex items-center justify-center rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </motion.button>
            </div>

            {/* Nav links */}
            <div className="flex flex-col px-4 py-6 gap-1">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 + i * 0.06, type: "spring", stiffness: 200, damping: 20 }}
                  onClick={() => scrollTo(link.href, closeDrawer)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-zinc-600 dark:text-zinc-300 hover:bg-black/[0.04] dark:hover:bg-white/[0.06] hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors cursor-pointer text-left"
                >
                  <ArrowRight className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                  {link.label}
                </motion.button>
              ))}
            </div>

            {/* Sign in at bottom */}
            <div className="mt-auto px-6 pb-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18 }}
              >
                <Link href="/login" onClick={closeDrawer}>
                  <Button variant="primary" fullWidth className="py-3">
                    Sign in
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
