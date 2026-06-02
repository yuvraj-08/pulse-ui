"use client"

import { useCallback, useEffect, useRef, useState } from "react"

const IDLE_EVENTS = [
  "mousemove",
  "mousedown",
  "keypress",
  "touchstart",
  "scroll",
  "click",
] as const

export function useIdle(timeoutMs = 10_000) {
  const [isIdle, setIsIdle] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const reset = useCallback(() => {
    setIsIdle(false)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => setIsIdle(true), timeoutMs)
  }, [timeoutMs])

  useEffect(() => {
    IDLE_EVENTS.forEach((e) => window.addEventListener(e, reset, { passive: true }))
    reset()

    return () => {
      IDLE_EVENTS.forEach((e) => window.removeEventListener(e, reset))
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [reset])

  return isIdle
}
