import { createFileRoute } from "@tanstack/react-router"
import {
  ArrowLink,
  Container,
  Eyebrow,
  PageHeader,
  StatusBadge,
} from "@/components/site/primitives"
import { now } from "@/data/now"
import { getProject } from "@/data/projects"
import { seo } from "@/lib/seo"
import { breadcrumbs, webPage } from "@/lib/schema"

export const Route = createFileRoute("/now")({
  head: () =>
    seo({
      title: "Now",
      description: `What Sohel is focused on right now: building ${now.building.name}, exploring AI agents and AI-native SaaS.`,
      path: "/now",
      schema: [
        webPage("/now", "Now"),
        breadcrumbs([{ name: "Now", path: "/now" }]),
      ],
    }),
  component: NowPage,
})

function NowPage() {
  const project = getProject(now.building.slug)
  return (
    <>
      <PageHeader
        eyebrow={<Eyebrow>Updated {now.updated}</Eyebrow>}
        title="Now"
      >
        <p>What I'm focused on at the moment.</p>
      </PageHeader>
      <Container className="pb-24">
        <dl className="grid max-w-3xl border-t">
          <Row label="Building">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xl font-semibold tracking-[-0.02em]">
                {now.building.name}
              </span>
              {project?.status && <StatusBadge status={project.status} />}
            </div>
            <p className="mt-2 text-[15px] leading-7 text-muted-foreground">
              {now.building.note}
            </p>
            <ArrowLink
              to="/projects/$slug"
              params={{ slug: now.building.slug }}
              className="mt-4"
            >
              View project
            </ArrowLink>
          </Row>
          <Row label="Exploring">
            <List items={now.exploring} />
          </Row>
          <Row label="Writing about">
            <List items={now.writingAbout} />
          </Row>
        </dl>
      </Container>
    </>
  )
}

function Row({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="grid gap-3 border-b py-8 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8">
      <dt className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase sm:pt-1.5">
        {label}
      </dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="grid gap-2 text-[15px]">
      {items.map((item) => (
        <li key={item} className="flex items-center gap-3">
          <span aria-hidden className="h-px w-3 bg-border-strong" />
          {item}
        </li>
      ))}
    </ul>
  )
}
