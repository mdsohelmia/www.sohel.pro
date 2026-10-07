import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/site/icon"
import {
  Container,
  Eyebrow,
  ExternalLink,
  StatusBadge,
  Tag,
} from "@/components/site/primitives"
import { getProject } from "@/data/projects"
import { seo } from "@/lib/seo"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug)
    if (!project) throw notFound()
    return project
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo({
          title: loaderData.name,
          description: `${loaderData.name} — ${loaderData.summary}`,
          path: `/products/${params.slug}`,
        })
      : {},
  component: ProductPage,
})

function ProductPage() {
  const p = Route.useLoaderData()

  const sections: { label: string; content: React.ReactNode }[] = []
  if (p.problem)
    sections.push({ label: "Problem", content: <P>{p.problem}</P> })
  if (p.why) sections.push({ label: "Why I built it", content: <P>{p.why}</P> })
  if (p.product)
    sections.push({ label: "Product", content: <P>{p.product}</P> })
  if (p.howItWorks)
    sections.push({
      label: "How it works",
      content: (
        <ol className="grid gap-0">
          {p.howItWorks.map((step, i) => (
            <li
              key={step}
              className="flex gap-4 border-b py-3 text-[15px] leading-7 last:border-0"
            >
              <span className="font-mono text-xs leading-7 text-subtle-foreground tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </li>
          ))}
        </ol>
      ),
    })
  if (p.technology?.length)
    sections.push({
      label: "Technology",
      content: (
        <ul className="flex flex-wrap gap-2">
          {p.technology.map((t) => (
            <li key={t}>
              <Tag>{t}</Tag>
            </li>
          ))}
        </ul>
      ),
    })
  if (p.role)
    sections.push({
      label: "My role",
      content: (
        <p className="text-lg font-semibold tracking-[-0.015em]">{p.role}</p>
      ),
    })
  if (p.company)
    sections.push({
      label: "Company",
      content: (
        <Link
          to="/experience/$company"
          params={{ company: "tenbyte" }}
          className="text-[15px] font-medium underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand"
        >
          {p.company}
        </Link>
      ),
    })
  if (p.status)
    sections.push({
      label: "Status",
      content: <StatusBadge status={p.status} />,
    })
  if (p.links?.length)
    sections.push({
      label: "Links",
      content: (
        <ul className="grid gap-2">
          {p.links.map((l) => (
            <li key={l.url}>
              <ExternalLink href={l.url} className="text-[15px] font-medium">
                {l.label}
              </ExternalLink>
            </li>
          ))}
        </ul>
      ),
    })

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link
          to="/products"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <Icon icon={ArrowLeft01Icon} size={15} />
          Products
        </Link>
      </Container>
      <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Eyebrow>{p.company ? `${p.company} · ${p.label}` : p.label}</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          {p.name}
        </h1>
        {p.tagline && (
          <p className="mt-4 text-xl font-medium tracking-[-0.02em] text-foreground/80 sm:text-2xl">
            {p.tagline}
          </p>
        )}
        <p className="mt-5 max-w-2xl text-[17px] leading-8 text-pretty text-muted-foreground">
          {p.summary}
        </p>
        {p.buildingInPublic && (
          <p className="mt-6 inline-flex items-center gap-2 text-xs text-subtle-foreground">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            Building in public
          </p>
        )}
      </Container>
      <Container className="pb-24">
        {sections.length > 0 && (
          <dl className="max-w-3xl border-t">
            {sections.map((s) => (
              <div
                key={s.label}
                className="grid gap-3 border-b py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase sm:pt-1.5">
                  {s.label}
                </dt>
                <dd className="min-w-0">{s.content}</dd>
              </div>
            ))}
          </dl>
        )}
        {!p.role && (
          <p
            className={cn(
              "max-w-3xl text-sm text-subtle-foreground",
              sections.length ? "mt-8" : "border-t pt-8"
            )}
          >
            More details on {p.name} coming soon.
          </p>
        )}
      </Container>
    </article>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="max-w-xl text-[15px] leading-7 text-pretty text-foreground/85">
      {children}
    </p>
  )
}
