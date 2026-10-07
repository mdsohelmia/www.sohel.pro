import { Link } from "@tanstack/react-router"
import {
  ArrowRight01Icon,
  ArrowUpRight01Icon,
  Github01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { StatusBadge } from "./primitives"
import type { Project } from "@/data/projects"
import type { GitHubProject } from "@/data/github"

const cardClass =
  "group relative flex h-full flex-col rounded-xl border bg-card p-5 transition-[border-color,box-shadow,translate] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[0_6px_24px_-12px_rgb(0_0_0/0.12)] focus-within:border-border-strong sm:p-6"

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

export function RepoCard({ repo }: { repo: GitHubProject }) {
  return (
    <article className={cardClass}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="flex min-w-0 items-center gap-2 font-mono text-sm font-medium">
          <Icon
            icon={Github01Icon}
            size={16}
            className="text-subtle-foreground"
          />
          <a
            href={repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="truncate outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
          >
            {repo.name}
            <span className="sr-only"> on GitHub (opens in a new tab)</span>
          </a>
        </h3>
        <Icon
          icon={ArrowUpRight01Icon}
          size={15}
          className="text-subtle-foreground transition-[translate,color] duration-200 group-hover:translate-x-px group-hover:-translate-y-px group-hover:text-brand"
        />
      </div>
      <p className="mt-3 text-sm leading-6 text-pretty text-muted-foreground">
        {repo.description}
      </p>
      {(repo.language || repo.stars !== undefined) && (
        <div className="mt-auto flex items-center gap-4 pt-5 text-xs text-subtle-foreground">
          {repo.language && (
            <span className="inline-flex items-center gap-1.5">
              <span aria-hidden className="size-2 rounded-full bg-brand/70" />
              {repo.language}
            </span>
          )}
          {repo.stars !== undefined && repo.stars > 0 && (
            <span className="inline-flex items-center gap-1 tabular-nums">
              <Icon icon={StarIcon} size={13} />
              {repo.stars}
              <span className="sr-only">
                {repo.stars === 1 ? "star" : "stars"}
              </span>
            </span>
          )}
        </div>
      )}
    </article>
  )
}
