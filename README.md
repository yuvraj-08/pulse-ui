# Pulse UI

A polished Next.js demo built to showcase fluid animations, interactive components, and modern UI patterns — designed as a portfolio piece.

**Live demo:** [pulse-ui on Vercel](#) · **Demo credentials:** `demo@example.com` / `Demo@1234`

---

## What's inside

### Landing page (`/`)
- 3D tilt hero card with mouse-tracking perspective
- Floating card stack that fans out on hover (vertical on mobile, horizontal on desktop)
- Auto-playing form validation loop with animated password strength bar
- Mini screensaver preview with live clock
- Dark / light theme toggle with animated sun/moon transition
- Smooth-scroll navigation

### Login page (`/login`)
- Real-time Zod validation with animated error messages
- Password strength indicator (5 levels, spring-animated bar)
- Card shake animation on failed submit
- Idle screensaver after 15s of inactivity
- Full dark / light theme support

### Dashboard (`/dashboard`)
- Animated stat counters on mount
- Staggered activity feed entrance
- Avatar dropdown with sign out
- Idle screensaver after 10s of inactivity
- Protected route — redirects to `/login` if unauthenticated
- Full dark / light theme support

---

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion v12 |
| Forms | React Hook Form + Zod |
| Icons | Lucide React |
| Font | Geist (next/font) |

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project structure

```
src/
  app/                    # Routes (/, /login, /dashboard)
  components/
    landing/              # Hero, AnimationSection, ValidationSection, ScreensaverSection, CtaBanner, Navbar
    auth/                 # LoginForm, LoginPage
    dashboard/            # DashboardPage, StatsCard, ActivityFeed
    screensaver/          # Full-screen idle screensaver
    ui/                   # Button, Input, PasswordStrength, ThemeToggle
    providers/            # ThemeProvider (dark/light)
  hooks/
    useIdle.ts            # Inactivity detection
    useAnimatedCounter.ts # Eased number counter
  lib/
    validations/auth.ts   # Zod schemas
    utils.ts              # cn() helper
```

---

## Auth

No backend. A hardcoded demo account is validated client-side and stored in `localStorage`.

```
Email:    demo@example.com
Password: Demo@1234
```
