"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "dark" | "light"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

type ThemeProviderState = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const ThemeProviderContext = createContext<ThemeProviderState | undefined>(undefined)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "bangla-calendar-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    let storedTheme: string | null = null;
    try {
      storedTheme = localStorage.getItem(storageKey);
    } catch (e) {
      // ignore
    }

    if (storedTheme && (storedTheme === "light" || storedTheme === "dark")) {
      setTheme(storedTheme)
    } else if (typeof window !== 'undefined') {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
      setTheme(prefersDark ? "dark" : "light")
    }
  }, [storageKey])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.classList.remove("light", "dark")
      document.documentElement.classList.add(theme)
      try {
        localStorage.setItem(storageKey, theme)
      } catch (e) {
        // ignore
      }
    }
  }, [theme, storageKey])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
