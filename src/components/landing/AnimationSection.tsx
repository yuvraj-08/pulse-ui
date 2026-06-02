"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Layers, ArrowRight } from "lucide-react"

interface CardData {
  id: number
  title: string
  tag: string
  tagColor: string
  content: React.ReactNode
  bg: string
  border: string
  idleRotate: number
  idleX: number
  idleY: number
  hoverRotate: number
  hoverX: number
  hoverY: number
  hoverZ: number
}

const CARDS: CardData[] = [
  {
    id: 1,
    title: "New message",
    tag: "Notification",
    tagColor: "#a78bfa",
    idleRotate: -10, idleX: -18, idleY: 18,
    hoverRotate: -22, hoverX: -130, hoverY: 0, hoverZ: 0,
    bg: "linear-gradient(135deg, rgba(38,28,65,0.97), rgba(30,20,52,0.97))",
    border: "rgba(139,92,246,0.25)",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#7c3aed,#a855f7)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, color: "#fff", flexShrink: 0 }}>S</div>
          <div>
            <p style={{ fontSize: 12, fontWeight: 600, color: "#f4f4f5" }}>Sarah Chen</p>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,0.38)" }}>Left a comment</p>
          </div>
          <span style={{ marginLeft: "auto", fontSize: 10, color: "rgba(255,255,255,0.28)" }}>2m ago</span>
        </div>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", lineHeight: 1.5, background: "rgba(255,255,255,0.04)", borderRadius: 8, padding: "8px 10px", border: "1px solid rgba(255,255,255,0.05)" }}>
          &ldquo;The animation timing on the dashboard feels really smooth — great work!&rdquo;
        </p>
      </div>
    ),
  },
  {
    id: 2,
    title: "Design System",
    tag: "Progress",
    tagColor: "#34d399",
    idleRotate: -2, idleX: 4, idleY: 6,
    hoverRotate: 0, hoverX: 0, hoverY: -40, hoverZ: 20,
    bg: "linear-gradient(135deg, rgba(16,28,24,0.97), rgba(14,26,22,0.97))",
    border: "rgba(16,185,129,0.2)",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#f4f4f5" }}>Design System v2</p>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399" }}>64%</span>
        </div>
        <div style={{ height: 6, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "64%" }}
            transition={{ delay: 0.8, duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg, #10b981, #34d399)" }}
          />
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>8 of 12 tasks complete</span>
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)" }}>Due in 3 days</span>
        </div>
        <div style={{ display: "flex", gap: 5 }}>
          {["#ff5f57", "#febc2e", "#28c840", "#7c3aed", "#3b82f6"].map((c, i) => (
            <div key={i} style={{ width: 22, height: 22, borderRadius: "50%", background: c, border: "2px solid rgba(0,0,0,0.3)", marginLeft: i > 0 ? -6 : 0 }} />
          ))}
          <span style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginLeft: 6, alignSelf: "center" }}>+3 more</span>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Analytics",
    tag: "Views ↑24%",
    tagColor: "#60a5fa",
    idleRotate: 9, idleX: 20, idleY: -8,
    hoverRotate: 18, hoverX: 120, hoverY: 10, hoverZ: 0,
    bg: "linear-gradient(135deg, rgba(16,20,40,0.97), rgba(14,18,36,0.97))",
    border: "rgba(59,130,246,0.2)",
    content: (
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", marginBottom: 2 }}>Weekly Views</p>
            <p style={{ fontSize: 24, fontWeight: 700, color: "#fff", lineHeight: 1 }}>24,891</p>
          </div>
          <span style={{ fontSize: 11, fontWeight: 700, color: "#34d399", background: "rgba(16,185,129,0.12)", borderRadius: 20, padding: "3px 8px" }}>↑ 24%</span>
        </div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 4, height: 44, paddingTop: 8 }}>
          {[30, 50, 38, 70, 55, 85, 100].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.07, duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
              style={{
                flex: 1, borderRadius: "4px 4px 0 0",
                background: i === 6 ? "linear-gradient(180deg, #60a5fa, #3b82f6)" : "rgba(255,255,255,0.1)",
              }}
            />
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => (
            <span key={i} style={{ flex: 1, textAlign: "center", fontSize: 9, color: i === 6 ? "#60a5fa" : "rgba(255,255,255,0.2)", fontWeight: i === 6 ? 700 : 400 }}>{d}</span>
          ))}
        </div>
      </div>
    ),
  },
]

function FloatingCardStack() {
  const [hovered, setHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [])

  // Mobile: fan vertically. Desktop: fan horizontally.
  const hoverPositions = isMobile
    ? [
        { x: -10, y: -80, rotate: -6 },
        { x:   0, y:   0, rotate:  0 },
        { x:  10, y:  80, rotate:  6 },
      ]
    : [
        { x: -130, y:   0, rotate: -22 },
        { x:    0, y: -40, rotate:   0 },
        { x:  120, y:  10, rotate:  18 },
      ]

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ height: isMobile ? 340 : 300, width: 380, perspective: "1000px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {CARDS.map((card, i) => (
        <motion.div
          key={card.id}
          animate={{
            rotateZ: hovered ? hoverPositions[i].rotate : card.idleRotate,
            x: hovered ? hoverPositions[i].x : card.idleX,
            y: hovered ? hoverPositions[i].y : card.idleY,
            scale: hovered ? 1.04 : 1,
            zIndex: hovered ? i : CARDS.length - i,
          }}
          transition={{ type: "spring", stiffness: 180, damping: 20, mass: 0.9 }}
          style={{
            position: "absolute",
            width: 260,
            borderRadius: 18,
            padding: "16px",
            background: card.bg,
            border: `1px solid ${card.border}`,
            boxShadow: hovered
              ? "0 30px 60px rgba(0,0,0,0.5)"
              : "0 8px 30px rgba(0,0,0,0.3)",
            cursor: "pointer",
            transformOrigin: "center bottom",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 11, fontWeight: 600, color: card.tagColor, background: `${card.tagColor}18`, borderRadius: 20, padding: "2px 8px", border: `1px solid ${card.tagColor}30` }}>
              {card.tag}
            </span>
          </div>
          {card.content}
        </motion.div>
      ))}
    </div>
  )
}

export function AnimationSection() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 pt-20 pb-12 lg:py-24 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Left: 3D card stack */}
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
          className="flex justify-center order-2 lg:order-1"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="scale-[0.72] sm:scale-90 lg:scale-100 origin-center">
              <FloatingCardStack />
            </div>
            <p className="text-xs text-zinc-400 dark:text-zinc-600">↑ hover to fan out</p>
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 16 }}
          className="flex flex-col gap-6 order-1 lg:order-2"
        >
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-violet-500/25 bg-violet-500/[0.08] px-3 py-1">
            <Layers className="h-3.5 w-3.5 text-violet-400" />
            <span className="text-xs font-medium text-violet-400">Animations</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Every element has{" "}
            <span className="bg-gradient-to-r from-violet-500 to-purple-400 bg-clip-text text-transparent">
              personality.
            </span>
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Spring physics, not linear easing. Cards feel like physical objects — they have weight, momentum, and snap. Hover the card stack to see them fan out.
          </p>

          <ul className="flex flex-col gap-3">
            {[
              "Spring-physics on every transition",
              "3D perspective tilt on interactive elements",
              "Staggered entrance animations on scroll",
              "Hover states with depth and lift",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <ArrowRight className="h-3.5 w-3.5 text-violet-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
