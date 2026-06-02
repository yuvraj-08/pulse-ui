import { Navbar } from "@/components/landing/Navbar"
import { Hero } from "@/components/landing/Hero"
import { AnimationSection } from "@/components/landing/AnimationSection"
import { ValidationSection } from "@/components/landing/ValidationSection"
import { ScreensaverSection } from "@/components/landing/ScreensaverSection"
import { CtaBanner } from "@/components/landing/CtaBanner"

export default function Home() {
  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-900 transition-colors duration-300 dark:bg-zinc-950 dark:text-zinc-100">
      <Navbar />
      <main>
        <Hero />
        <AnimationSection />
        <ValidationSection />
        <ScreensaverSection />
        <CtaBanner />
      </main>
      <footer className="border-t border-black/[0.06] py-8 text-center text-xs text-zinc-400 dark:border-white/[0.06]">
        Built with Next.js 16 · Framer Motion v12 · Tailwind v4 · TypeScript
      </footer>
    </div>
  )
}
