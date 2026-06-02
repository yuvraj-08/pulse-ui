"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

interface Orb {
  size: number
  from: string
  to: string
  x: string
  y: string
  duration: number
  waypoints: number[]
}

const ORBS: Orb[] = [
  {
    size: 500,
    from: "rgba(109,40,217,0.35)",
    to: "rgba(91,33,182,0)",
    x: "5%", y: "10%",
    duration: 20,
    waypoints: [0, 70, -40, 90, -20, 0],
  },
  {
    size: 380,
    from: "rgba(37,99,235,0.3)",
    to: "rgba(29,78,216,0)",
    x: "65%", y: "55%",
    duration: 25,
    waypoints: [0, -60, 80, -50, 60, 0],
  },
  {
    size: 420,
    from: "rgba(168,85,247,0.25)",
    to: "rgba(126,34,206,0)",
    x: "35%", y: "70%",
    duration: 18,
    waypoints: [0, 50, -70, 40, -30, 0],
  },
  {
    size: 300,
    from: "rgba(6,182,212,0.2)",
    to: "rgba(8,145,178,0)",
    x: "75%", y: "5%",
    duration: 22,
    waypoints: [0, -40, 60, -80, 20, 0],
  },
  {
    size: 260,
    from: "rgba(236,72,153,0.2)",
    to: "rgba(190,24,93,0)",
    x: "15%", y: "65%",
    duration: 28,
    waypoints: [0, 80, -50, 60, -40, 0],
  },
]

interface ScreensaverProps {
  isVisible: boolean
}

export function Screensaver({ isVisible }: ScreensaverProps) {
  const [time, setTime] = useState("")

  useEffect(() => {
    if (!isVisible) return

    const update = () =>
      setTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))

    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [isVisible])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="screensaver"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-zinc-950 flex flex-col items-center justify-center cursor-none select-none"
        >
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
                filter: "blur(60px)",
              }}
              animate={{
                x: orb.waypoints,
                y: orb.waypoints.map((v) => v * -0.7),
                scale: [1, 1.08, 0.96, 1.04, 0.99, 1],
              }}
              transition={{
                duration: orb.duration,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}

          <div className="relative z-10 flex flex-col items-center gap-5 pointer-events-none">
            <motion.div
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="text-[clamp(48px,15vw,96px)] font-thin tracking-[0.15em] text-white/80 tabular-nums leading-none"
            >
              {time}
            </motion.div>

            <motion.p
              animate={{ opacity: [0.2, 0.5, 0.2] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="text-xs text-zinc-500 tracking-[0.4em] uppercase"
            >
              Move mouse to continue
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
