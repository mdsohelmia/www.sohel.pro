import {
  Github01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

const buttonClass =
  "inline-flex h-10 items-center gap-2 rounded-lg border bg-card px-4 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:text-brand"

// Email first: it's the primary contact channel.
export function ContactLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex flex-wrap gap-3", className)}>
      <li>
        <a href={`mailto:${site.email}`} className={buttonClass}>
          <Icon icon={Mail01Icon} size={16} />
          {site.email}
        </a>
      </li>
      <li>
        <a
          href={site.social.x.url}
          target="_blank"
          rel="me noopener noreferrer"
          className={buttonClass}
        >
          <Icon icon={NewTwitterIcon} size={15} />@{site.social.x.handle}
          <span className="sr-only"> on X (opens in a new tab)</span>
        </a>
      </li>
      <li>
        <a
          href={site.social.github.url}
          target="_blank"
          rel="me noopener noreferrer"
          className={buttonClass}
        >
          <Icon icon={Github01Icon} size={16} />
          {site.social.github.handle}
          <span className="sr-only"> on GitHub (opens in a new tab)</span>
        </a>
      </li>
    </ul>
  )
}
