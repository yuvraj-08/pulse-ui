"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function CtaBanner() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ type: "spring", stiffness: 80, damping: 16 }}
        className="relative overflow-hidden rounded-3xl"
        style={{
          background: "linear-gradient(135deg, rgba(109,40,217,0.9) 0%, rgba(139,92,246,0.85) 50%, rgba(168,85,247,0.9) 100%)",
          border: "1px solid rgba(255,255,255,0.15)",
          boxShadow: "0 40px 80px rgba(139,92,246,0.3)",
        }}
      >
        {/* Background orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
          <motion.div
            animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            style={{ position: "absolute", width: 300, height: 300, top: "-30%", right: "10%", borderRadius: "50%", background: "rgba(255,255,255,0.1)", filter: "blur(40px)" }}
          />
          <motion.div
            animate={{ x: [0, -25, 0], y: [0, 15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            style={{ position: "absolute", width: 250, height: 250, bottom: "-20%", left: "5%", borderRadius: "50%", background: "rgba(255,255,255,0.08)", filter: "blur(40px)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-8 py-16 text-center sm:px-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to see it live?
          </h2>
          <p className="max-w-md text-white/70 text-lg leading-relaxed">
            Sign in with the demo account and experience every animation, screensaver, and interaction firsthand.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-violet-700 shadow-lg shadow-black/20"
              >
                Open the demo <ArrowRight className="h-4 w-4" />
              </motion.div>
            </Link>
            <Link href="/dashboard">
              <Button variant="ghost" className="border-white/25 text-white hover:bg-white/10 px-6 py-3 text-sm">
                Skip to dashboard
              </Button>
            </Link>
          </div>
          <p className="text-white/40 text-xs">
            demo@example.com · Demo@1234
          </p>
        </div>
      </motion.div>
    </section>
  )
}
