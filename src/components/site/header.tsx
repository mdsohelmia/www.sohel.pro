import { useEffect, useState } from "react"
import { Link, useRouterState } from "@tanstack/react-router"
import {
  Cancel01Icon,
  Github01Icon,
  Mail01Icon,
  Menu01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { ThemeToggle } from "./theme-toggle"
import { Container } from "./primitives"
import { nav, site } from "@/data/site"

const navLinkClass =
  "rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground data-[status=active]:text-foreground"

const iconLinkClass =
  "inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"

export function SiteHeader() {
  const [open, setOpen] = useState(false)
  const pathname = useRouterState({ select: (s) => s.location.pathname })

  useEffect(() => setOpen(false), [pathname])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md">
      <Container className="flex h-14 items-center justify-between gap-6">
        <Link
          to="/"
          className="text-[15px] font-semibold tracking-[-0.02em]"
          aria-label={`${site.name} — home`}
        >
          {site.name}
        </Link>

        <nav aria-label="Primary" className="hidden items-center md:flex">
          {nav.map((item) => (
            <Link key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
          <span aria-hidden className="mx-2 h-4 w-px bg-border" />
          <a
            href={site.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLinkClass}
            aria-label="GitHub (opens in a new tab)"
          >
            <Icon icon={Github01Icon} size={17} />
          </a>
          <a
            href={site.social.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className={iconLinkClass}
            aria-label="X (opens in a new tab)"
          >
            <Icon icon={NewTwitterIcon} size={16} />
          </a>
          <a
            href={`mailto:${site.email}`}
            className={iconLinkClass}
            aria-label={`Email ${site.email}`}
          >
            <Icon icon={Mail01Icon} size={17} />
          </a>
          <ThemeToggle />
        </nav>

        <div className="-mr-1.5 flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            className={iconLinkClass}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            <Icon icon={open ? Cancel01Icon : Menu01Icon} size={18} />
          </button>
        </div>
      </Container>

      <nav
        id="mobile-nav"
        aria-label="Mobile"
        hidden={!open}
        className="border-t bg-background md:hidden"
      >
        <Container className="flex flex-col py-3">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="flex items-center justify-between border-b border-border/60 py-3.5 text-[15px] text-muted-foreground transition-colors duration-200 last:border-0 hover:text-foreground data-[status=active]:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-4 pb-2">
            <a
              href={site.social.github.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Icon icon={Github01Icon} size={16} />
              GitHub
            </a>
            <a
              href={site.social.x.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Icon icon={NewTwitterIcon} size={15} />X
            </a>
            <a
              href={`mailto:${site.email}`}
              className="inline-flex h-9 items-center gap-2 rounded-md border px-3 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
            >
              <Icon icon={Mail01Icon} size={16} />
              Email
            </a>
          </div>
        </Container>
      </nav>
    </header>
  )
}
