import { useEffect } from "react"
import { Moon02Icon, Sun03Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

const STORAGE_KEY = "theme"

// Runs in <head> before first paint so the page never flashes the wrong theme.
// An explicit choice is stored; otherwise the system preference wins.
export const themeScript = `(function(){try{var s=localStorage.getItem("${STORAGE_KEY}");var d=s?s==="dark":matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.classList.toggle("dark",d)}catch(e){}})()`

export function ThemeToggle({ className }: { className?: string }) {
  // Follow system changes until the visitor picks a theme themselves.
  useEffect(() => {
    const media = matchMedia("(prefers-color-scheme: dark)")
    const onChange = (e: MediaQueryListEvent) => {
      if (localStorage.getItem(STORAGE_KEY)) return
      document.documentElement.classList.toggle("dark", e.matches)
    }
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  function toggle() {
    const dark = document.documentElement.classList.toggle("dark")
    try {
      localStorage.setItem(STORAGE_KEY, dark ? "dark" : "light")
    } catch {
      // Storage can be unavailable (private mode); the toggle still works.
    }
  }

  // Both icons render; CSS shows the right one, so server and client markup
  // always match.
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle dark mode"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground",
        className
      )}
    >
      <Icon icon={Moon02Icon} size={16} className="dark:hidden" />
      <Icon icon={Sun03Icon} size={17} className="hidden dark:block" />
    </button>
  )
}
