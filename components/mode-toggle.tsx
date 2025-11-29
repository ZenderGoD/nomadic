"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // useEffect only runs on the client, so now we can safely show the UI
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary transition-colors"
        aria-label="Toggle theme"
      >
        <Sun className="h-5 w-5 text-foreground" />
      </button>
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="inline-flex items-center justify-center rounded-md p-2 hover:bg-secondary transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 w-5" style={{ color: '#ffffff' }} />
      ) : (
        <Moon className="h-5 w-5" style={{ color: '#000000' }} />
      )}
    </button>
  )
}

