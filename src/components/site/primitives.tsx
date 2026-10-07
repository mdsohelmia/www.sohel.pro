import { Link, type LinkProps } from "@tanstack/react-router"
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { cn } from "@/lib/utils"

export function Container({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <div className={cn("mx-auto w-full max-w-5xl px-5 sm:px-8", className)}>
      {children}
    </div>
  )
}

export function Eyebrow({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <p
      className={cn(
        "font-mono text-[11px] font-medium tracking-[0.14em] text-subtle-foreground uppercase",
        className
      )}
    >
      {children}
    </p>
  )
}

type SectionProps = {
  id?: string
  label: string
  title: string
  intro?: React.ReactNode
  action?: React.ReactNode
  children: React.ReactNode
  className?: string
}

// A homepage section: small label + heading on the left, content on the right
// at desktop widths; stacked on mobile.
export function Section({
  id,
  label,
  title,
  intro,
  action,
  children,
  className,
}: SectionProps) {
  const headingId = id ? `${id}-heading` : undefined
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={cn("scroll-mt-20 border-t py-16 sm:py-24", className)}
    >
      <Container>
        <div className="grid gap-10 md:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] md:gap-16">
          <header className="flex flex-col gap-3">
            <Eyebrow>{label}</Eyebrow>
            <h2
              id={headingId}
              className="text-2xl font-semibold tracking-[-0.025em] text-balance"
            >
              {title}
            </h2>
            {action && <div className="mt-1 hidden md:block">{action}</div>}
          </header>
          <div className="min-w-0">
            {intro && (
              <p className="mb-10 max-w-xl text-[15px] leading-7 text-pretty text-muted-foreground">
                {intro}
              </p>
            )}
            {children}
            {action && <div className="mt-8 md:hidden">{action}</div>}
          </div>
        </div>
      </Container>
    </section>
  )
}

export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: React.ReactNode
  title: string
  children?: React.ReactNode
}) {
  return (
    <Container className="pt-16 pb-12 sm:pt-24 sm:pb-16">
      {eyebrow && <div className="mb-5">{eyebrow}</div>}
      <h1 className="text-4xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
        {title}
      </h1>
      {children && (
        <div className="mt-5 max-w-2xl text-[17px] leading-8 text-pretty text-muted-foreground">
          {children}
        </div>
      )}
    </Container>
  )
}

export function ArrowLink({
  className,
  children,
  ...props
}: LinkProps & { className?: string; children: React.ReactNode }) {
  return (
    <Link
      {...props}
      className={cn(
        "group inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors duration-200 hover:text-brand",
        className
      )}
    >
      {children}
      <Icon
        icon={ArrowRight01Icon}
        size={15}
        className="transition-transform duration-200 group-hover:translate-x-0.5"
      />
    </Link>
  )
}

export function ExternalLink({
  href,
  className,
  children,
  showIcon = true,
}: {
  href: string
  className?: string
  children: React.ReactNode
  showIcon?: boolean
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-1 transition-colors duration-200 hover:text-brand",
        className
      )}
    >
      {children}
      {showIcon && (
        <Icon
          icon={ArrowUpRight01Icon}
          size={14}
          className="text-subtle-foreground transition-[translate,color] duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-brand"
        />
      )}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export function Tag({
  className,
  children,
}: {
  className?: string
  children: React.ReactNode
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-card px-2.5 py-0.5 text-xs text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  const active = status === "Building" || status === "Live"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        active
          ? "border-brand/20 bg-brand-soft text-brand-soft-foreground"
          : "bg-card text-foreground"
      )}
    >
      <span
        aria-hidden
        className={cn(
          "size-1.5 rounded-full",
          active ? "bg-brand" : "bg-subtle-foreground"
        )}
      />
      {status}
    </span>
  )
}
