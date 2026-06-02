"use client"

import { motion } from "framer-motion"
import { Layers, ShieldCheck, MonitorOff } from "lucide-react"

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
}

const FEATURES: Feature[] = [
  {
    icon: <Layers className="h-5 w-5" />,
    title: "Fluid Animations",
    description:
      "Every transition is spring-physics driven. Cards lift on hover, elements stagger in on scroll, and nothing ever snaps.",
    gradient: "from-violet-500/20 to-purple-600/10",
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: "Smart Validation",
    description:
      "Real-time Zod-powered validation with animated error messages, a live password strength bar, and shake-on-fail feedback.",
    gradient: "from-emerald-500/20 to-teal-600/10",
  },
  {
    icon: <MonitorOff className="h-5 w-5" />,
    title: "Idle Screensaver",
    description:
      "Go idle for 10 seconds and the app shifts into a floating orb screensaver with a live clock. Move your mouse to resume.",
    gradient: "from-blue-500/20 to-cyan-600/10",
  },
]

export function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Built to impress
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
          Three ideas, executed properly.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-3">
        {FEATURES.map((feature, i) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 14 }}
            whileHover={{ y: -5, transition: { type: "spring", stiffness: 300, damping: 20 } }}
            className="group relative overflow-hidden rounded-2xl border border-black/[0.07] bg-white p-7 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03] cursor-default"
          >
            {/* Gradient background on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
            />

            <div className="relative z-10">
              <div className="mb-4 inline-flex rounded-xl border border-black/[0.06] bg-zinc-100 p-2.5 text-zinc-600 dark:border-white/[0.08] dark:bg-white/[0.06] dark:text-zinc-300">
                {feature.icon}
              </div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-zinc-50">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
