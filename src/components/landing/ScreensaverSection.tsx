"use client"

import { motion } from "framer-motion"
import { MonitorOff, ArrowRight } from "lucide-react"
import { useEffect, useState } from "react"

const ORBS = [
  { size: 160, from: "rgba(109,40,217,0.5)", to: "rgba(91,33,182,0)", x: "10%", y: "15%", duration: 10, waypoints: [0, 30, -20, 40, 0] },
  { size: 130, from: "rgba(37,99,235,0.45)", to: "rgba(29,78,216,0)",  x: "60%", y: "50%", duration: 13, waypoints: [0, -25, 35, -20, 0] },
  { size: 110, from: "rgba(168,85,247,0.4)", to: "rgba(126,34,206,0)", x: "35%", y: "65%", duration: 9,  waypoints: [0, 20, -30, 15, 0] },
  { size: 90,  from: "rgba(6,182,212,0.35)", to: "rgba(8,145,178,0)",  x: "70%", y: "10%", duration: 15, waypoints: [0, -15, 25, -35, 0] },
]

function MiniScreensaver() {
  const [time, setTime] = useState("")

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <div style={{ position: "relative", width: 340 }}>
      {/* Laptop base shadow */}
      <div style={{ position: "absolute", bottom: -10, left: "50%", transform: "translateX(-50%)", width: "80%", height: 12, background: "rgba(0,0,0,0.25)", borderRadius: "0 0 8px 8px", filter: "blur(8px)" }} />

      {/* Laptop body */}
      <div style={{
        borderRadius: "16px 16px 0 0",
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.12)",
        boxShadow: "0 30px 70px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
      }}>
        {/* Screen bezel top */}
        <div style={{ height: 28, background: "rgba(20,20,30,0.98)", display: "flex", alignItems: "center", padding: "0 12px", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
          <div style={{ display: "flex", gap: 6 }}>
            {["#ff5f57","#febc2e","#28c840"].map(c => (
              <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c }} />
            ))}
          </div>
          <span style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "rgba(255,255,255,0.28)", fontWeight: 500 }}>Pulse — Idle</span>
        </div>

        {/* Screen content */}
        <div style={{ position: "relative", height: 200, background: "#09090b", overflow: "hidden" }}>
          {ORBS.map((orb, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: orb.size,
                height: orb.size,
                left: orb.x,
                top: orb.y,
                borderRadius: "50%",
                background: `radial-gradient(circle, ${orb.from}, ${orb.to})`,
                filter: "blur(30px)",
              }}
              animate={{
                x: orb.waypoints,
                y: orb.waypoints.map((v) => v * -0.6),
                scale: [1, 1.06, 0.97, 1.03, 1],
              }}
              transition={{ duration: orb.duration, repeat: Infinity, ease: "easeInOut" }}
            />
          ))}

          {/* Clock */}
          <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 10 }}>
            <motion.p
              animate={{ opacity: [0.55, 1, 0.55] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
              style={{ fontSize: 44, fontWeight: 200, letterSpacing: "0.12em", color: "rgba(255,255,255,0.85)", lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
            >
              {time}
            </motion.p>
            <motion.p
              animate={{ opacity: [0.2, 0.45, 0.2] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              style={{ fontSize: 9, color: "rgba(255,255,255,0.4)", letterSpacing: "0.35em", textTransform: "uppercase" }}
            >
              Move mouse to continue
            </motion.p>
          </div>
        </div>
      </div>

      {/* Laptop hinge */}
      <div style={{ height: 6, background: "linear-gradient(180deg, rgba(30,30,45,0.9), rgba(20,20,30,0.7))", borderRadius: "0 0 4px 4px", border: "1px solid rgba(255,255,255,0.05)", borderTop: "none" }} />

      {/* Idle indicator badge */}
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={{
          position: "absolute", top: 28, right: -14, zIndex: 20,
          background: "rgba(15,15,25,0.95)", backdropFilter: "blur(8px)",
          borderRadius: 20, padding: "5px 10px",
          display: "flex", alignItems: "center", gap: 5,
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
        }}
      >
        <motion.div
          animate={{ scale: [1, 1.5, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b" }}
        />
        <span style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", fontWeight: 500 }}>Idle — 10s</span>
      </motion.div>
    </div>
  )
}

export function ScreensaverSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 16 }}
          className="flex flex-col gap-6 order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-blue-500/25 bg-blue-500/[0.08] px-3 py-1">
            <MonitorOff className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-xs font-medium text-blue-400">Idle Screensaver</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Nothing is{" "}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              boring,
            </span>{" "}
            not even idle.
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Go idle for 10 seconds anywhere in the app and it shifts into a full-screen floating orb screensaver with a live clock. One mouse move brings you back.
          </p>

          <ul className="flex flex-col gap-3">
            {[
              "Detects inactivity via mouse, keyboard & scroll",
              "Fluid fade-in with AnimatePresence",
              "5 gradient orbs animate in independent paths",
              "Live clock updates every second",
              "Any interaction instantly dismisses it",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <ArrowRight className="h-3.5 w-3.5 text-blue-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Left: mini screensaver */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
          className="flex justify-center order-2 lg:order-1"
        >
          <MiniScreensaver />
        </motion.div>
      </div>
    </section>
  )
}
