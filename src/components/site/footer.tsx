import { Link } from "@tanstack/react-router"
import {
  Github01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { Container } from "./primitives"
import { site } from "@/data/site"

const footerNav = [
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Writing", to: "/writing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const

const linkClass =
  "inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <Container className="flex flex-col gap-10 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-1.5">
          <Link to="/" className="text-[15px] font-semibold tracking-[-0.02em]">
            {site.name}
          </Link>
          <p className="text-sm text-muted-foreground">{site.title}</p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          {footerNav.map((item) => (
            <Link key={item.to} to={item.to} className={linkClass}>
              {item.label}
            </Link>
          ))}
          <a
            href={site.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Icon icon={Github01Icon} size={15} />
            GitHub
          </a>
          <a
            href={site.social.x.url}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <Icon icon={NewTwitterIcon} size={14} />X
          </a>
          <a href={`mailto:${site.email}`} className={linkClass}>
            <Icon icon={Mail01Icon} size={15} />
            Email
          </a>
        </nav>
      </Container>
      <Container className="pb-10">
        <p className="text-xs text-subtle-foreground">
          © {site.copyrightYear} {site.name}
        </p>
      </Container>
    </footer>
  )
}
