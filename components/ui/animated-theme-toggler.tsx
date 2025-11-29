"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { Moon, Sun } from "lucide-react"
import { flushSync } from "react-dom"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"

interface AnimatedThemeTogglerProps
  extends React.ComponentPropsWithoutRef<"button"> {
  duration?: number
}

export const AnimatedThemeToggler = ({
  className,
  duration = 400,
  ...props
}: AnimatedThemeTogglerProps) => {
  const { setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isDark, setIsDark] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return
    
    const updateTheme = () => {
      const isDarkMode = document.documentElement.classList.contains("dark")
      setIsDark(isDarkMode)
    }

    updateTheme()

    const observer = new MutationObserver(updateTheme)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    })

    return () => observer.disconnect()
  }, [mounted])

  const toggleTheme = useCallback(async () => {
    if (!buttonRef.current || !mounted) return

    const newTheme = !isDark

    await document.startViewTransition(() => {
      flushSync(() => {
        setIsDark(newTheme)
        setTheme(newTheme ? "dark" : "light")
      })
    }).ready

    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect()
    const x = left + width / 2
    const y = top + height / 2
    const maxRadius = Math.hypot(
      Math.max(left, window.innerWidth - left),
      Math.max(top, window.innerHeight - top)
    )

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration,
        easing: "ease-in-out",
        pseudoElement: "::view-transition-new(root)",
      }
    )
  }, [isDark, duration, mounted, setTheme])

  if (!mounted) {
    return (
      <button
        className={cn("inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary transition-colors", className)}
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5" style={{ color: '#fbbf24' }} />
      </button>
    )
  }

  return (
    <button
      ref={buttonRef}
      onClick={toggleTheme}
      className={cn("inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary transition-colors", className)}
      aria-label="Toggle theme"
      {...props}
    >
      {isDark ? (
        <Sun className="h-5 w-5" style={{ color: '#fbbf24' }} />
      ) : (
        <Moon className="h-5 w-5" style={{ color: '#fbbf24' }} />
      )}
      <span className="sr-only">Toggle theme</span>
    </button>
  )
}

