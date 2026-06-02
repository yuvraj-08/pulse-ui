"use client"

import { motion, AnimatePresence, useAnimation } from "framer-motion"
import { useState } from "react"
import { useTheme } from "@/components/providers/ThemeProvider"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { Eye, EyeOff, Sparkles } from "lucide-react"
import { loginSchema, type LoginFormData, DEMO_CREDENTIALS } from "@/lib/validations/auth"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { PasswordStrength } from "@/components/ui/PasswordStrength"

export function LoginForm() {
  const router = useRouter()
  const { theme } = useTheme()
  const isDark = theme === "dark"
  const controls = useAnimation()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [authError, setAuthError] = useState("")

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  })

  const passwordValue = watch("password", "")

  const shakeCard = async () => {
    await controls.start({
      x: [0, -12, 12, -8, 8, -4, 4, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    })
  }

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    setAuthError("")

    await new Promise((r) => setTimeout(r, 1200))

    if (
      data.email.toLowerCase() === DEMO_CREDENTIALS.email &&
      data.password === DEMO_CREDENTIALS.password
    ) {
      localStorage.setItem(
        "auth_user",
        JSON.stringify({ email: data.email, name: "Alex Johnson" })
      )
      router.push("/dashboard")
    } else {
      setIsLoading(false)
      setAuthError("Invalid credentials. Use the demo account shown above.")
      shakeCard()
    }
  }

  return (
    <motion.div animate={controls} className="w-full max-w-md">
      <div className={`rounded-2xl border backdrop-blur-xl p-8 shadow-2xl ${isDark ? "border-white/[0.08] bg-white/[0.03]" : "border-black/[0.08] bg-white shadow-zinc-200/60"}`}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="mb-8 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-violet-500/[0.15] border border-violet-500/20 mb-4">
            <Sparkles className="h-5 w-5 text-violet-400" />
          </div>
          <h1 className={`text-2xl font-semibold ${isDark ? "text-zinc-50" : "text-zinc-900"}`}>Welcome back</h1>
          <p className="mt-1 text-sm text-zinc-500">Sign in to your workspace</p>
        </motion.div>

        {/* Demo hint */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mb-6 rounded-xl bg-violet-500/[0.08] border border-violet-500/[0.15] px-4 py-3"
        >
          <p className={`text-xs text-center leading-relaxed ${isDark ? "text-violet-300/70" : "text-violet-600/80"}`}>
            <span className={`font-semibold ${isDark ? "text-violet-300" : "text-violet-600"}`}>Demo account</span>
            <br />
            demo@example.com &nbsp;·&nbsp; Demo@1234
          </p>
        </motion.div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <div className="flex flex-col gap-5">
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Input
                label="Email address"
                type="email"
                placeholder="you@example.com"
                error={errors.email?.message}
                autoComplete="email"
                {...register("email")}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.38 }}
            >
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                error={errors.password?.message}
                autoComplete="current-password"
                rightElement={
                  <button
                    type="button"
                    tabIndex={-1}
                    onClick={() => setShowPassword((v) => !v)}
                    className="text-zinc-500 hover:text-zinc-300 transition-colors p-1 rounded"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                }
                {...register("password")}
              />
              <PasswordStrength password={passwordValue} />
            </motion.div>

            <AnimatePresence mode="wait">
              {authError && (
                <motion.div
                  key="auth-error"
                  initial={{ opacity: 0, y: -6, height: 0 }}
                  animate={{ opacity: 1, y: 0, height: "auto" }}
                  exit={{ opacity: 0, y: -6, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="rounded-xl bg-red-500/[0.1] border border-red-500/20 px-4 py-3">
                    <p className="text-xs text-red-400 text-center">{authError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46 }}
            >
              <Button type="submit" fullWidth isLoading={isLoading}>
                {isLoading ? "Signing in…" : "Sign in"}
              </Button>
            </motion.div>
          </div>
        </form>
      </div>
    </motion.div>
  )
}
