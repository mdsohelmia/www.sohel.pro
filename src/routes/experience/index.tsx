import { Link, createFileRoute } from "@tanstack/react-router"
import { ArrowRight01Icon } from "@hugeicons/core-free-icons"
import { CareerLadder } from "@/components/site/career"
import { EducationList } from "@/components/site/education"
import { Icon } from "@/components/site/icon"
import {
  Container,
  Eyebrow,
  ExternalLink,
  PageHeader,
} from "@/components/site/primitives"
import { companies } from "@/data/experience"
import { about } from "@/data/site"
import { seo } from "@/lib/seo"

export const Route = createFileRoute("/experience/")({
  head: () =>
    seo({
      title: "Experience",
      description:
        "Sohel's path from Software Engineer at Kodeeo, to Senior Software Engineer and Tech Lead at Gotipath, to Co-founder & CTO at Tenbyte, to Founder & Product Engineer.",
      path: "/experience",
    }),
  component: ExperiencePage,
})

function ExperiencePage() {
  return (
    <>
      <PageHeader eyebrow={<Eyebrow>Experience</Eyebrow>} title="Experience">
        <p>
          My career has moved from building software to leading engineering and
          eventually co-founding a technology company.
        </p>
      </PageHeader>

      <Container className="pb-20">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
          <section aria-labelledby="path-heading">
            <h2 id="path-heading" className="sr-only">
              Career path
            </h2>
            <CareerLadder detailed />
          </section>

          <aside aria-labelledby="story-heading" className="lg:pt-2">
            <h2
              id="story-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              The short version
            </h2>
            <ol className="mt-5 grid gap-3 border-l pl-5">
              {about.arc.map((line) => (
                <li
                  key={line}
                  className="text-[15px] leading-7 text-foreground/85"
                >
                  {line}
                </li>
              ))}
            </ol>
          </aside>
        </div>
      </Container>

      <section aria-labelledby="companies-heading" className="border-t">
        <Container className="py-16 sm:py-20">
          <h2
            id="companies-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            Companies
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Object.values(companies).map((c) => (
              <article
                key={c.slug}
                className="group relative flex flex-col rounded-xl border bg-card p-6 transition-[border-color,translate] duration-200 hover:-translate-y-0.5 hover:border-border-strong"
              >
                <h3 className="text-lg font-semibold tracking-[-0.02em]">
                  <Link
                    to="/experience/$company"
                    params={{ company: c.slug }}
                    className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-brand"
                  >
                    {c.name}
                  </Link>
                </h3>
                <p className="mt-1 flex flex-wrap items-center gap-1.5 text-sm font-medium text-foreground/80">
                  {c.roles.map((r, i) => (
                    <span key={r} className="inline-flex items-center gap-1.5">
                      {i > 0 && (
                        <Icon
                          icon={ArrowRight01Icon}
                          size={13}
                          className="text-subtle-foreground"
                        />
                      )}
                      {r}
                    </span>
                  ))}
                </p>
                <p className="mt-3 text-[15px] leading-6 text-muted-foreground">
                  {c.summary}
                </p>
                <div className="relative z-10 mt-auto flex items-center justify-between gap-4 pt-6 text-sm">
                  <span className="inline-flex items-center gap-1 font-medium text-muted-foreground transition-colors duration-200 group-hover:text-brand">
                    Read more
                    <Icon icon={ArrowRight01Icon} size={15} />
                  </span>
                  <ExternalLink
                    href={c.website}
                    className="text-subtle-foreground"
                  >
                    {new URL(c.website).hostname.replace(/^www\./, "")}
                  </ExternalLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="education-heading" className="border-t">
        <Container className="py-16 sm:py-20">
          <h2
            id="education-heading"
            className="mb-6 font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            Education
          </h2>
          <EducationList />
        </Container>
      </section>
    </>
  )
}
