import { Link } from "@tanstack/react-router"
import { experience, type Company } from "@/data/experience"
import { site } from "@/data/site"
import { cn } from "@/lib/utils"

type Step = {
  role: string
  company?: string
  companySlug?: Company["slug"]
  description: string
  current?: boolean
}

// Most recent first. The "Now" step is the founder role; the rest come from
// data/experience.ts.
const steps: Step[] = [
  {
    role: site.title,
    description: "Building software products of my own.",
    current: true,
  },
  ...experience.map((e) => ({
    role: e.role,
    company: e.company,
    companySlug: e.company.toLowerCase() as Step["companySlug"],
    description: e.description,
  })),
]

// A vertical ladder: each rung is a step up in responsibility. Numbered from
// the bottom so the count reads as growth.
export function CareerLadder({
  detailed = false,
  showNow = true,
}: {
  detailed?: boolean
  showNow?: boolean
}) {
  const items = showNow ? steps : steps.filter((s) => !s.current)
  const total = items.length

  return (
    <ol className="relative">
      {items.map((step, i) => {
        const level = String(total - i).padStart(2, "0")
        const last = i === total - 1
        return (
          <li
            key={`${step.company}-${step.role}`}
            className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] gap-x-4 sm:grid-cols-[3rem_minmax(0,1fr)] sm:gap-x-6"
          >
            <div className="relative flex flex-col items-center">
              <span
                aria-hidden
                className={cn(
                  "relative z-10 mt-1 flex size-9 items-center justify-center rounded-full border font-mono text-[11px] font-medium tabular-nums",
                  step.current
                    ? "border-brand bg-brand text-white"
                    : i === (showNow ? 1 : 0)
                      ? "border-foreground/80 bg-card text-foreground"
                      : "bg-card text-subtle-foreground"
                )}
              >
                {level}
              </span>
              {!last && (
                <span
                  aria-hidden
                  className="absolute top-10 bottom-0 w-px bg-border-strong"
                />
              )}
            </div>

            <div className={cn("min-w-0", last ? "pb-0" : "pb-10")}>
              <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1 pt-2">
                <h3
                  className={cn(
                    "font-semibold tracking-[-0.015em]",
                    i === 0 ? "text-lg" : "text-base"
                  )}
                >
                  {step.role}
                </h3>
                {step.current ? (
                  <span className="font-mono text-[11px] tracking-[0.12em] text-brand uppercase">
                    Now
                  </span>
                ) : (
                  step.companySlug && (
                    <Link
                      to="/experience/$company"
                      params={{ company: step.companySlug }}
                      className="text-sm text-muted-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand"
                    >
                      {step.company}
                    </Link>
                  )
                )}
              </div>
              {(detailed || step.current) && (
                <p className="mt-1.5 max-w-lg text-[15px] leading-7 text-muted-foreground">
                  {step.description}
                </p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}
