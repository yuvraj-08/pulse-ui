"use client"

import { motion } from "framer-motion"
import { useAnimatedCounter } from "@/hooks/useAnimatedCounter"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  label: string
  value: number
  suffix?: string
  icon: React.ReactNode
  iconBg: string
  delay?: number
}

export function StatsCard({
  label,
  value,
  suffix = "",
  icon,
  iconBg,
  delay = 0,
}: StatsCardProps) {
  const count = useAnimatedCounter(value)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 100, damping: 15 }}
      whileHover={{
        y: -5,
        boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className="rounded-2xl border border-black/[0.07] dark:border-white/[0.08] bg-white dark:bg-white/[0.03] p-6 cursor-default shadow-sm dark:shadow-none"
    >
      <div className={cn("inline-flex p-2.5 rounded-xl mb-4", iconBg)}>
        {icon}
      </div>
      <p className="text-3xl font-bold text-zinc-900 dark:text-zinc-50 tabular-nums">
        {count.toLocaleString()}
        {suffix}
      </p>
      <p className="mt-1 text-sm text-zinc-500">{label}</p>
    </motion.div>
  )
}
