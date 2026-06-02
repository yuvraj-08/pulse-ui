"use client"

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter"
import { useTheme } from "@/components/providers/ThemeProvider"
import { useEffect, useState } from "react"

const MINI_STATS = [
  { label: "Views",  value: 24891, suffix: "",   color: "#8b5cf6", bg: "rgba(139,92,246,0.18)" },
  { label: "Users",  value: 1204,  suffix: "",   color: "#3b82f6", bg: "rgba(59,130,246,0.18)"  },
  { label: "Tasks",  value: 847,   suffix: "",   color: "#10b981", bg: "rgba(16,185,129,0.18)"  },
  { label: "Score",  value: 98,    suffix: "%",  color: "#f59e0b", bg: "rgba(245,158,11,0.18)"  },
]

const ACTIVITY = [
  { dot: "#10b981", text: "Completed UI library setup",   time: "2m"  },
  { dot: "#8b5cf6", text: "Reviewed animations PR",       time: "18m" },
  { dot: "#3b82f6", text: "Deployed production v2.4",     time: "1h"  },
]

function MiniStat({ stat, delay }: { stat: typeof MINI_STATS[0]; delay: number }) {
  const count = useAnimatedCounter(stat.value, 2000)
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      style={{
        borderRadius: 12,
        padding: "10px 12px",
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
        <div style={{ width: 7, height: 7, borderRadius: "50%", background: stat.color, boxShadow: `0 0 6px ${stat.color}` }} />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.38)", fontWeight: 500, letterSpacing: "0.05em" }}>
          {stat.label}
        </span>
      </div>
      <p style={{ fontSize: 20, fontWeight: 700, color: "#fff", fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
        {count.toLocaleString()}{stat.suffix}
      </p>
    </motion.div>
  )
}

function DashboardMockup() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [14, -14]), { stiffness: 140, damping: 22 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-14, 14]), { stiffness: 140, damping: 22 })

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect()
    mouseX.set((e.clientX - r.left) / r.width - 0.5)
    mouseY.set((e.clientY - r.top) / r.height - 0.5)
  }
  function onMouseLeave() { mouseX.set(0); mouseY.set(0) }

  return (
    <div
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className="relative flex items-center justify-center select-none"
      style={{ perspective: "1100px" }}
    >
      {/* Floating "Live demo" badge — desktop only */}
      {isDesktop && <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", top: -18, right: 0, zIndex: 20,
          background: "linear-gradient(135deg, #7c3aed, #a855f7)",
          borderRadius: 20, padding: "6px 14px",
          fontSize: 11, fontWeight: 700, color: "#fff",
          boxShadow: "0 8px 24px rgba(139,92,246,0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
          border: "1px solid rgba(255,255,255,0.15)",
          letterSpacing: "0.03em",
          willChange: "transform",
          backfaceVisibility: "hidden",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        ✦ Live preview
      </motion.div>}

      {/* Floating notification chip — desktop only */}
      {isDesktop && <motion.div
        animate={{ y: [0, 7, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
        style={{
          position: "absolute", bottom: 24, left: -32, zIndex: 20,
          background: isDark ? "rgba(12,12,22,0.96)" : "rgba(255,255,255,0.95)",
          backdropFilter: "blur(12px)",
          borderRadius: 14, padding: "9px 14px",
          border: "1px solid rgba(255,255,255,0.09)",
          boxShadow: "0 16px 40px rgba(0,0,0,0.5)",
          display: "flex", alignItems: "center", gap: 9, minWidth: 190,
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ width: 8, height: 8, borderRadius: "50%", background: "#10b981", flexShrink: 0 }}
        />
        <div>
          <p style={{ fontSize: 10, fontWeight: 600, color: isDark ? "#fff" : "#18181b", marginBottom: 2 }}>Score updated</p>
          <p style={{ fontSize: 10, color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.45)" }}>98% this month ↑</p>
        </div>
      </motion.div>}

      {/* 3D card */}
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative"
      >
        <div
          style={{
            width: "min(370px, calc(100vw - 48px))",
            borderRadius: 20,
            overflow: "hidden",
            background: "linear-gradient(160deg, rgba(36,28,60,0.97) 0%, rgba(20,16,38,0.97) 100%)",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow:
              "0 50px 100px rgba(0,0,0,0.65), 0 0 0 1px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Title bar */}
          <div style={{
            padding: "12px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 12,
            background: "rgba(255,255,255,0.025)",
          }}>
            <div style={{ display: "flex", gap: 7 }}>
              {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
                <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{ width: 14, height: 14, borderRadius: 5, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 6, height: 6, background: "#fff", clipPath: "polygon(50% 0%, 0% 100%, 100% 100%)" }} />
              </div>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", fontWeight: 500 }}>Pulse — Dashboard</span>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{ padding: "14px 14px 10px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {MINI_STATS.map((s, i) => (
                <MiniStat key={s.label} stat={s} delay={0.25 + i * 0.08} />
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "0 14px" }} />

          {/* Activity */}
          <div style={{ padding: "10px 14px 14px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.3)", marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.12em" }}>
              Recent Activity
            </p>
            {ACTIVITY.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55 + i * 0.09 }}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "4px 0" }}
              >
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: item.dot, flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", flex: 1 }}>{item.text}</span>
                <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", flexShrink: 0 }}>{item.time}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Ambient glow */}
        <div style={{
          position: "absolute", inset: -30, borderRadius: 50,
          background: "radial-gradient(ellipse, rgba(139,92,246,0.22) 0%, transparent 65%)",
          filter: "blur(25px)", zIndex: -1,
        }} />
      </motion.div>
    </div>
  )
}

export function Hero() {
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const orbOpacity = isDark ? 0.09 : 0.18

  return (
    <section className="relative mx-auto max-w-7xl px-6 pt-14 pb-20">
      {/* page-level ambient */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div style={{ position: "absolute", width: 800, height: 800, top: "-30%", left: "40%", borderRadius: "50%", background: `radial-gradient(circle, rgba(139,92,246,${orbOpacity}), transparent 65%)`, filter: "blur(50px)", transition: "all 0.3s ease" }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <div className="flex flex-col gap-7">
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-4 py-1.5"
          >
            <Sparkles className="h-3 w-3 text-violet-400" />
            <span className="text-xs font-medium text-violet-400 tracking-wide">Interactive UI Showcase</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.18, type: "spring", stiffness: 80, damping: 14 }}
            className="text-5xl font-bold tracking-tight lg:text-[58px] leading-[1.1] text-zinc-900 dark:text-zinc-50"
          >
            UI that{" "}
            <span className="bg-gradient-to-r from-violet-500 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              moves
            </span>
            <br />
            like it{" "}
            <span className="relative inline-block">
              feels.
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.9, duration: 0.5, ease: "easeOut" }}
                className="absolute -bottom-1 left-0 h-[3px] w-full rounded-full bg-gradient-to-r from-violet-500 to-purple-400 origin-left"
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.32 }}
            className="text-lg leading-relaxed text-zinc-500 dark:text-zinc-400 max-w-lg"
          >
            A hand-crafted Next.js demo with spring animations, 3D interactions,
            live form validation, and a full idle screensaver — scroll down and try everything.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.46 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/login">
              <Button variant="primary" className="gap-2 px-6 py-3 text-sm">
                Try the demo <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="ghost" className="px-6 py-3 text-sm" onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}>
              See how it works
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65 }}
            className="flex flex-wrap gap-2"
          >
            {["Next.js 16", "Framer Motion v12", "TypeScript", "Tailwind v4", "Zod"].map((t) => (
              <span
                key={t}
                className="rounded-full border border-black/[0.07] bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-500 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-zinc-400"
              >
                {t}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.28, type: "spring", stiffness: 70, damping: 14 }}
          className="flex justify-center lg:justify-end"
        >
          <DashboardMockup />
        </motion.div>
      </div>
    </section>
  )
}
