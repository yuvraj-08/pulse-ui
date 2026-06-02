"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useMemo } from "react"

interface PasswordStrengthProps {
  password: string
}

type StrengthLevel = {
  label: string
  color: string
  textColor: string
  widthPct: number
}

const LEVELS: StrengthLevel[] = [
  { label: "Weak",      color: "#ef4444", textColor: "#f87171", widthPct: 20  },
  { label: "Fair",      color: "#f97316", textColor: "#fb923c", widthPct: 40  },
  { label: "Good",      color: "#eab308", textColor: "#facc15", widthPct: 65  },
  { label: "Strong",    color: "#10b981", textColor: "#34d399", widthPct: 85  },
  { label: "Excellent", color: "#8b5cf6", textColor: "#a78bfa", widthPct: 100 },
]

function calcScore(pw: string): number {
  let s = 0
  if (pw.length >= 8)              s++
  if (pw.length >= 12)             s++
  if (/[A-Z]/.test(pw))           s++
  if (/[0-9]/.test(pw))           s++
  if (/[^A-Za-z0-9]/.test(pw))   s++
  return Math.min(s, LEVELS.length) - 1
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const level = useMemo(() => {
    if (!password) return null
    const idx = Math.max(0, calcScore(password))
    return LEVELS[idx]
  }, [password])

  return (
    <AnimatePresence>
      {level && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-1.5 mt-1 overflow-hidden"
        >
          <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: level.color }}
              initial={{ width: "0%" }}
              animate={{ width: `${level.widthPct}%` }}
              transition={{ type: "spring", stiffness: 120, damping: 14 }}
            />
          </div>

          <motion.p
            key={level.label}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className="text-xs"
          >
            <span style={{ color: level.textColor }} className="font-medium">
              {level.label}
            </span>
            <span className="text-zinc-600"> password</span>
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
