import { createFileRoute } from "@tanstack/react-router"
import { ProductCard } from "@/components/site/cards"
import {
  ArrowLink,
  Container,
  Eyebrow,
  ExternalLink,
  PageHeader,
} from "@/components/site/primitives"
import {
  allProjects,
  projects,
  tenbyteProjects,
  type Project,
} from "@/data/projects"
import { seo } from "@/lib/seo"
import { breadcrumbs, productNode, webPage } from "@/lib/schema"

export const Route = createFileRoute("/projects/")({
  head: () =>
    seo({
      title: "Projects",
      description:
        "Projects and products Sohel has built: every Tenbyte product from the beginning—Vidinfra, Tenbyte CDN, Tenbyte Cloud, Live Stream—plus DocLoop and Sellorio.",
      path: "/projects",
      schema: [
        webPage("/projects", "Projects", "CollectionPage", {
          mainEntity: {
            "@type": "ItemList",
            itemListElement: allProjects.map((p, i) => ({
              "@type": "ListItem",
              position: i + 1,
              item: productNode(p),
            })),
          },
        }),
        breadcrumbs([{ name: "Projects", path: "/projects" }]),
      ],
    }),
  component: ProjectsPage,
})

function ProjectsPage() {
  return (
    <>
      <PageHeader eyebrow={<Eyebrow>Projects</Eyebrow>} title="Projects">
        <p>
          Software products and infrastructure projects I'm building or have
          helped build.
        </p>
      </PageHeader>
      <Container className="pb-24">
        <div className="flex flex-col gap-20">
          <Group
            id="tenbyte"
            title="Tenbyte"
            intro="As Co-founder & CTO, I've built every Tenbyte product from the beginning—cloud, CDN, video and live streaming infrastructure."
            items={tenbyteProjects}
            aside={
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <ArrowLink
                  to="/experience/$company"
                  params={{ company: "tenbyte" }}
                >
                  About my role
                </ArrowLink>
                <ExternalLink
                  href="https://www.tenbyte.io/"
                  className="text-sm text-muted-foreground"
                >
                  tenbyte.io
                </ExternalLink>
              </div>
            }
          />
          <Group
            id="independent"
            title="Independent products"
            intro="Things I'm building, co-building, and experimenting with."
            items={projects}
          />
        </div>
      </Container>
    </>
  )
}

function Group({
  id,
  title,
  intro,
  items,
  aside,
}: {
  id: string
  title: string
  intro: string
  items: Project[]
  aside?: React.ReactNode
}) {
  return (
    <section aria-labelledby={`${id}-heading`}>
      <div className="mb-6 flex flex-col gap-3 border-b pb-5">
        <div className="flex items-baseline justify-between gap-4">
          <h2
            id={`${id}-heading`}
            className="text-xl font-semibold tracking-[-0.02em]"
          >
            {title}
          </h2>
          <span className="font-mono text-xs text-subtle-foreground tabular-nums">
            {String(items.length).padStart(2, "0")}
          </span>
        </div>
        <p className="max-w-2xl text-[15px] leading-7 text-muted-foreground">
          {intro}
        </p>
        {aside}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  )
}
