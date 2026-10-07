import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import {
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowUpRight01Icon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@/components/site/icon"
import { Container, Eyebrow, Tag } from "@/components/site/primitives"
import { companies, type Company } from "@/data/experience"
import { allProjects } from "@/data/projects"
import { seo } from "@/lib/seo"
import { breadcrumbs, organizationNode, webPage } from "@/lib/schema"
import { cn } from "@/lib/utils"

export const Route = createFileRoute("/experience/$company")({
  loader: ({ params }) => {
    const company = companies[params.company as Company["slug"]] as
      Company | undefined
    if (!company) throw notFound()
    return company
  },
  head: ({ loaderData, params }) =>
    loaderData
      ? seo({
          title: `${loaderData.name} — ${loaderData.roles.join(" → ")}`,
          description: `Sohel at ${loaderData.name}: ${loaderData.roles.join(" → ")}. ${loaderData.summary}`,
          path: `/experience/${params.company}`,
          schema: [
            organizationNode(params.company),
            webPage(`/experience/${params.company}`, loaderData.name),
            breadcrumbs([
              { name: "Experience", path: "/experience" },
              {
                name: loaderData.name,
                path: `/experience/${params.company}`,
              },
            ]),
          ],
        })
      : {},
  component: CompanyPage,
})

function CompanyPage() {
  const c = Route.useLoaderData()
  const hostname = new URL(c.website).hostname.replace(/^www\./, "")

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link
          to="/experience"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <Icon icon={ArrowLeft01Icon} size={15} />
          Experience
        </Link>
      </Container>

      <Container className="pt-10 pb-12 sm:pt-14 sm:pb-16">
        <Eyebrow>Experience</Eyebrow>
        <h1 className="mt-5 text-4xl font-semibold tracking-[-0.04em] sm:text-6xl">
          {c.name}
        </h1>
        <p className="mt-5 max-w-2xl text-[17px] leading-8 text-pretty text-muted-foreground">
          {c.summary}
        </p>
      </Container>

      <Container className="pb-24">
        <dl className="max-w-3xl border-t">
          <Row label={c.roles.length > 1 ? "My progression" : "My role"}>
            <ol className="flex flex-col items-start">
              {c.roles.map((role, i) => {
                const last = i === c.roles.length - 1
                return (
                  <li key={role} className="flex flex-col items-start">
                    <span
                      className={cn(
                        "rounded-lg border px-3.5 py-2 text-[15px] font-semibold tracking-[-0.01em]",
                        last
                          ? "border-foreground/80 bg-card"
                          : "bg-muted/60 text-foreground/75"
                      )}
                    >
                      {role}
                    </span>
                    {!last && (
                      <Icon
                        icon={ArrowDown01Icon}
                        size={18}
                        className="my-1.5 ml-4 text-subtle-foreground"
                      />
                    )}
                  </li>
                )
              })}
            </ol>
          </Row>

          <Row label={`What ${c.name} does`}>
            <div className="grid max-w-xl gap-4 text-[15px] leading-7 text-foreground/85">
              {c.about.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </Row>

          {c.products && (
            <Row label="Products">
              <ul className="flex flex-wrap gap-2">
                {c.products.map((name) => {
                  const product = allProjects.find((p) => p.name === name)
                  return (
                    <li key={name}>
                      {product ? (
                        <Link
                          to="/products/$slug"
                          params={{ slug: product.slug }}
                          className="inline-flex items-center rounded-full border bg-card px-2.5 py-0.5 text-xs text-foreground/80 transition-colors duration-200 hover:border-border-strong hover:text-brand"
                        >
                          {name}
                        </Link>
                      ) : (
                        <Tag className="text-foreground/80">{name}</Tag>
                      )}
                    </li>
                  )
                })}
              </ul>
            </Row>
          )}

          <Row label="Areas">
            <ul className="flex flex-wrap gap-2">
              {c.areas.map((a) => (
                <li key={a}>
                  <Tag>{a}</Tag>
                </li>
              ))}
            </ul>
          </Row>

          {c.contributions && c.contributions.length > 0 && (
            <Row label="What I worked on">
              <ul className="grid gap-2 text-[15px] leading-7">
                {c.contributions.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </Row>
          )}
        </dl>

        <a
          href={c.website}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-12 inline-flex items-center gap-2 rounded-lg border bg-card px-4 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:text-brand"
        >
          Visit {c.name}
          <span className="text-subtle-foreground">{hostname}</span>
          <Icon
            icon={ArrowUpRight01Icon}
            size={15}
            className="transition-transform duration-200 group-hover:translate-x-px group-hover:-translate-y-px"
          />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      </Container>
    </article>
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
