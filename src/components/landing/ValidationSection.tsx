"use client"

import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useEffect, useRef, useState } from "react"
import { ShieldCheck, ArrowRight, Eye, CheckCircle2 } from "lucide-react"

type Step =
  | "idle"
  | "typing_email"
  | "typing_password"
  | "error"
  | "fixing"
  | "success"

const STRENGTH_COLORS = ["", "#ef4444", "#f97316", "#eab308", "#10b981", "#8b5cf6"]
const STRENGTH_LABELS = ["", "Weak", "Fair", "Good", "Strong", "Excellent"]
const STRENGTH_WIDTHS = ["0%", "18%", "38%", "60%", "80%", "100%"]

function FormPreview() {
  const [step, setStep] = useState<Step>("idle")
  const [email, setEmail] = useState("")
  const [dots, setDots] = useState(0)
  const [strength, setStrength] = useState(0)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const mounted = useRef(true)
  const cardControls = useAnimation()

  function sleep(ms: number) {
    return new Promise<void>((res) => {
      if (!mounted.current) return res()
      setTimeout(() => { if (mounted.current) res() }, ms)
    })
  }

  useEffect(() => {
    mounted.current = true

    async function runSequence() {
      if (!mounted.current) return

      // reset
      setStep("idle"); setEmail(""); setDots(0); setStrength(0)
      setIsError(false); setIsSuccess(false)
      await sleep(900)

      // type email
      setStep("typing_email")
      const emailStr = "demo@example.com"
      for (let i = 1; i <= emailStr.length; i++) {
        if (!mounted.current) return
        setEmail(emailStr.slice(0, i))
        await sleep(65)
      }
      await sleep(400)

      // type a bad password (weak)
      setStep("typing_password")
      const weakPw = [1, 2, 3, 4, 5]
      for (const d of weakPw) {
        if (!mounted.current) return
        setDots(d)
        setStrength(d < 3 ? 1 : 2)
        await sleep(160)
      }
      await sleep(300)

      // trigger error
      setIsError(true)
      cardControls.start({ x: [0, -10, 10, -7, 7, -4, 4, 0], transition: { duration: 0.45 } })
      await sleep(1300)

      // fix — clear & retype good password
      setIsError(false)
      setStep("fixing")
      setDots(0); setStrength(0)
      await sleep(200)

      const goodSteps = [
        [1, 1], [2, 1], [3, 2], [4, 3], [5, 3], [6, 4], [7, 4], [8, 5],
      ] as const
      for (const [d, s] of goodSteps) {
        if (!mounted.current) return
        setDots(d); setStrength(s)
        await sleep(135)
      }
      await sleep(400)

      // success
      setIsSuccess(true)
      setStep("success")
      await sleep(2400)

      if (mounted.current) setTimeout(runSequence, 300)
    }

    const t = setTimeout(runSequence, 600)
    return () => { mounted.current = false; clearTimeout(t) }
  }, [cardControls])

  const showStrength = (step === "typing_password" || step === "fixing") && dots > 0

  return (
    <motion.div
      animate={cardControls}
      style={{
        width: 320,
        borderRadius: 20,
        overflow: "hidden",
        background: "linear-gradient(160deg, rgba(36,28,60,0.97), rgba(20,16,38,0.97))",
        border: "1px solid rgba(255,255,255,0.09)",
        boxShadow: "0 40px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      {/* Window chrome */}
      <div style={{ padding: "11px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.025)" }}>
        <div style={{ display: "flex", gap: 7 }}>
          {["#ff5f57","#febc2e","#28c840"].map(c => (
            <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />
          ))}
        </div>
        <span style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 500 }}>Pulse — Sign in</span>
      </div>

      <div style={{ padding: "20px 20px 24px" }}>
        {/* Icon */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <div style={{ width: 40, height: 40, borderRadius: 12, background: "rgba(139,92,246,0.15)", border: "1px solid rgba(139,92,246,0.2)", display: "inline-flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
            <div style={{ fontSize: 16 }}>✦</div>
          </div>
          <p style={{ fontSize: 15, fontWeight: 600, color: "#f4f4f5" }}>Welcome back</p>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>Sign in to your account</p>
        </div>

        {/* Email field */}
        <div style={{ marginBottom: 14 }}>
          <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.38)", marginBottom: 5, letterSpacing: "0.04em" }}>EMAIL ADDRESS</p>
          <motion.div
            animate={{
              boxShadow: isError
                ? "0 0 0 2px rgba(239,68,68,0.4)"
                : isSuccess
                ? "0 0 0 2px rgba(16,185,129,0.4)"
                : step === "typing_email"
                ? "0 0 0 2px rgba(139,92,246,0.45)"
                : "0 0 0 1px rgba(255,255,255,0.07)",
            }}
            transition={{ duration: 0.15 }}
            style={{ borderRadius: 10, overflow: "hidden" }}
          >
            <div style={{ background: "rgba(255,255,255,0.05)", padding: "9px 12px", display: "flex", alignItems: "center", gap: 6, minHeight: 38 }}>
              <span style={{ fontSize: 12, color: email ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.2)", flex: 1 }}>
                {email || "you@example.com"}
              </span>
              {isSuccess && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300 }}>
                  <CheckCircle2 style={{ width: 14, height: 14, color: "#10b981" }} />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Password field */}
        <div style={{ marginBottom: 12 }}>
          <p style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,0.38)", marginBottom: 5, letterSpacing: "0.04em" }}>PASSWORD</p>
          <motion.div
            animate={{
              boxShadow: isError
                ? "0 0 0 2px rgba(239,68,68,0.4)"
                : isSuccess
                ? "0 0 0 2px rgba(16,185,129,0.4)"
                : (step === "typing_password" || step === "fixing")
                ? "0 0 0 2px rgba(139,92,246,0.45)"
                : "0 0 0 1px rgba(255,255,255,0.07)",
            }}
            transition={{ duration: 0.15 }}
            style={{ borderRadius: 10, overflow: "hidden" }}
          >
            <div style={{ background: "rgba(255,255,255,0.05)", padding: "9px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: 38 }}>
              <span style={{ fontSize: 14, color: isError ? "#f87171" : "rgba(255,255,255,0.7)", letterSpacing: "0.15em" }}>
                {dots > 0 ? "●".repeat(dots) : <span style={{ fontSize: 12, color: "rgba(255,255,255,0.2)", letterSpacing: "normal" }}>••••••••</span>}
              </span>
              <Eye style={{ width: 13, height: 13, color: "rgba(255,255,255,0.25)" }} />
            </div>
          </motion.div>

          {/* Strength bar */}
          <AnimatePresence>
            {showStrength && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                style={{ marginTop: 8, overflow: "hidden" }}
              >
                <div style={{ height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 99, overflow: "hidden" }}>
                  <motion.div
                    animate={{ width: STRENGTH_WIDTHS[strength] }}
                    transition={{ type: "spring", stiffness: 120, damping: 14 }}
                    style={{ height: "100%", borderRadius: 99, background: STRENGTH_COLORS[strength] }}
                  />
                </div>
                <motion.p
                  key={strength}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  style={{ fontSize: 10, marginTop: 4, color: STRENGTH_COLORS[strength], fontWeight: 600 }}
                >
                  {STRENGTH_LABELS[strength]}{" "}
                  <span style={{ color: "rgba(255,255,255,0.25)", fontWeight: 400 }}>password</span>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Error message */}
          <AnimatePresence>
            {isError && (
              <motion.p
                initial={{ opacity: 0, y: -4, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -4, height: 0 }}
                style={{ fontSize: 10, color: "#f87171", marginTop: 6, display: "flex", alignItems: "center", gap: 5 }}
              >
                <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#f87171", flexShrink: 0 }} />
                Invalid credentials. Please try again.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        {/* Button */}
        <motion.div
          animate={{
            backgroundColor: isSuccess ? "#059669" : isError ? "rgba(239,68,68,0.25)" : "#7c3aed",
          }}
          transition={{ duration: 0.3 }}
          style={{ borderRadius: 12, padding: "10px", textAlign: "center", cursor: "default" }}
        >
          <AnimatePresence mode="wait">
            {isSuccess ? (
              <motion.span key="ok" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ fontSize: 12, fontWeight: 600, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                <CheckCircle2 style={{ width: 14, height: 14 }} /> Signed in
              </motion.span>
            ) : (
              <motion.span key="in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ fontSize: 12, fontWeight: 600, color: isError ? "#f87171" : "rgba(255,255,255,0.9)" }}>
                {isError ? "Try again" : "Sign in"}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  )
}

export function ValidationSection() {
  return (
    <section id="demo" className="mx-auto max-w-7xl px-6 py-12 lg:py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
        {/* Right: live form demo */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1, type: "spring", stiffness: 80, damping: 16 }}
          className="flex justify-center min-h-[540px] items-center order-2 lg:order-2"
        >
          <div className="flex flex-col items-center gap-4">
            <FormPreview />
            <p className="text-xs text-zinc-400 dark:text-zinc-600">↑ auto-playing loop</p>
          </div>
        </motion.div>

        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ type: "spring", stiffness: 80, damping: 16 }}
          className="flex flex-col gap-6 order-1 lg:order-1"
        >
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/25 bg-emerald-500/[0.08] px-3 py-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs font-medium text-emerald-400">Smart Validation</span>
          </div>

          <h2 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
            Errors that{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
              guide,
            </span>{" "}
            not punish.
          </h2>

          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Every field responds as you type. Wrong password? The card shakes. Strength bar
            climbs as your password gets better. Success feels like success.
          </p>

          <ul className="flex flex-col gap-3">
            {[
              "Zod schema validation on every keystroke",
              "Animated error messages slide in/out",
              "Password strength bar with 5 levels",
              "Card shake animation on failed submit",
              "Success state with colour transition",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                <ArrowRight className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
