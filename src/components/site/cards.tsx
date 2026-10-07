import { Link } from "@tanstack/react-router"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { StatusBadge } from "./primitives"
import type { Project } from "@/data/projects"

const cardClass =
  "group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_8px_28px_-14px_var(--shadow-color)] focus-within:border-border-strong sm:p-6"

export function ProductCard({ project }: { project: Project }) {
  return (
    <article className={cardClass}>
      <div className="flex items-start justify-between gap-3">
        <p className="font-mono text-[11px] tracking-[0.12em] text-subtle-foreground uppercase">
          {project.label}
        </p>
        {project.status && <StatusBadge status={project.status} />}
      </div>
      <h3 className="mt-6 text-lg font-semibold tracking-[-0.02em]">
        <Link
          to="/products/$slug"
          params={{ slug: project.slug }}
          className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
        >
          {project.name}
        </Link>
      </h3>
      <p className="mt-2 text-[15px] leading-6 text-pretty text-muted-foreground">
        {project.summary}
      </p>
      <span
        aria-hidden
        className="mt-auto flex items-center gap-1 pt-6 text-sm font-medium text-muted-foreground transition-colors duration-200 group-hover:text-brand"
      >
        View project
        <Icon
          icon={ArrowRight01Icon}
          size={15}
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </article>
  )
}
