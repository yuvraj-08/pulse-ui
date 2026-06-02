"use client"

import { motion } from "framer-motion"
import { useState } from "react"
import { z } from "zod"
import { CheckCircle2 } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { PasswordStrength } from "@/components/ui/PasswordStrength"

const emailSchema = z.string().email()

function LiveInputDemo() {
  const [email, setEmail] = useState("")
  const [touched, setTouched] = useState(false)

  const result = emailSchema.safeParse(email)
  const error = touched && email.length > 0 && !result.success
    ? "Please enter a valid email address"
    : undefined
  const isValid = email.length > 0 && result.success

  return (
    <div className="flex flex-col gap-3">
      <div className="relative">
        <Input
          label="Email address"
          type="email"
          placeholder="try typing an email…"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={error}
        />
        {isValid && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute right-3 top-[34px]"
          >
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          </motion.div>
        )}
      </div>
    </div>
  )
}

function LivePasswordDemo() {
  const [password, setPassword] = useState("")

  return (
    <div className="flex flex-col gap-1">
      <Input
        label="Password strength"
        type="text"
        placeholder="type any password…"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <PasswordStrength password={password} />
    </div>
  )
}

function ButtonDemo() {
  const [loading, setLoading] = useState(false)

  const handleClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1800)
  }

  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary" isLoading={loading} onClick={handleClick}>
        {loading ? "Loading…" : "Primary"}
      </Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  )
}

const DEMO_ITEMS = [
  {
    id: "buttons",
    label: "Buttons",
    description: "Spring-physics hover & tap. Click Primary to see loading state.",
    component: <ButtonDemo />,
  },
  {
    id: "input",
    label: "Live validation",
    description: "Type an email — errors animate in, a checkmark appears on valid.",
    component: <LiveInputDemo />,
  },
  {
    id: "password",
    label: "Password strength",
    description: "Animated bar changes colour and label as complexity grows.",
    component: <LivePasswordDemo />,
  },
]

export function ComponentShowcase() {
  return (
    <section id="demo" className="mx-auto max-w-6xl px-6 pb-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="mb-14 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
          Everything is interactive
        </h2>
        <p className="mt-3 text-zinc-500 dark:text-zinc-400">
          These aren&apos;t screenshots — try them yourself.
        </p>
      </motion.div>

      <div className="grid gap-5 sm:grid-cols-3">
        {DEMO_ITEMS.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 14 }}
            className="rounded-2xl border border-black/[0.07] bg-white p-6 shadow-sm dark:border-white/[0.07] dark:bg-white/[0.03]"
          >
            <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-violet-500">
              {item.label}
            </div>
            <p className="mb-5 text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              {item.description}
            </p>
            <div className="rounded-xl border border-black/[0.05] bg-zinc-50/80 p-4 dark:border-white/[0.05] dark:bg-zinc-900/60">
              {item.component}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
