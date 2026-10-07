import { ExternalLink } from "./primitives"
import { education } from "@/data/education"

export function EducationList() {
  return (
    <ol className="max-w-2xl border-t">
      {education.map((e) => (
        <li
          key={e.institution}
          className="flex flex-col gap-1 border-b py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8"
        >
          <div className="min-w-0">
            <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
              {e.degree}
              <span className="font-normal text-muted-foreground">
                {" "}
                · {e.field}
              </span>
            </h3>
            <ExternalLink
              href={e.website}
              className="mt-1 text-sm text-muted-foreground"
            >
              {e.institution}
            </ExternalLink>
          </div>
          {(e.startDate || e.endDate) && (
            <span className="shrink-0 font-mono text-xs text-subtle-foreground tabular-nums">
              {[e.startDate, e.endDate].filter(Boolean).join(" – ")}
            </span>
          )}
        </li>
      ))}
    </ol>
  )
}
