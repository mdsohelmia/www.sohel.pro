import { createFileRoute } from "@tanstack/react-router"
import {
  Github01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"
import { CareerLadder } from "@/components/site/career"
import { EducationList } from "@/components/site/education"
import { Icon } from "@/components/site/icon"
import {
  ArrowLink,
  Container,
  Eyebrow,
  PageHeader,
  Tag,
} from "@/components/site/primitives"
import { about, site } from "@/data/site"
import { seo } from "@/lib/seo"
import { breadcrumbs, faqNode, ids, personNode, webPage } from "@/lib/schema"
import { faq } from "@/data/faq"

export const Route = createFileRoute("/about")({
  head: () =>
    seo({
      title: "About",
      description: about.intro.replace("I'm Sohel,", "Sohel is"),
      path: "/about",
      type: "profile",
      schema: [
        personNode,
        webPage("/about", "About Sohel", "ProfilePage", {
          mainEntity: { "@id": ids.person },
        }),
        faqNode(faq),
        breadcrumbs([{ name: "About", path: "/about" }]),
      ],
    }),
  component: AboutPage,
})

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow={
          <div className="flex items-center gap-4">
            <img
              src={site.avatar}
              alt="Sohel"
              width={64}
              height={64}
              className="size-16 rounded-full border bg-muted object-cover"
            />
            <Eyebrow>About</Eyebrow>
          </div>
        }
        title="About Sohel"
      >
        <p>{about.intro}</p>
      </PageHeader>

      <Container className="pb-16">
        <blockquote className="max-w-3xl border-l-2 border-brand pl-6 text-2xl leading-snug font-medium tracking-[-0.025em] text-balance sm:text-3xl">
          {about.statement}
        </blockquote>
      </Container>

      <section aria-labelledby="story-heading" className="border-t">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
          <h2
            id="story-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            The story
          </h2>
          <div className="grid max-w-2xl gap-5 text-[17px] leading-8 text-foreground/85">
            {about.story.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <p className="text-muted-foreground">{about.background}</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="path-heading" className="border-t">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
          <div className="flex flex-col gap-4">
            <h2
              id="path-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              Path
            </h2>
            <ArrowLink to="/experience">View experience</ArrowLink>
          </div>
          <CareerLadder />
        </Container>
      </section>

      <section aria-labelledby="tech-heading" className="border-t">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
          <h2
            id="tech-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            Technologies
          </h2>
          <ul className="flex max-w-2xl flex-wrap gap-2">
            {about.technologies.map((t) => (
              <li key={t}>
                <Tag className="px-3 py-1 font-mono text-sm text-foreground/80">
                  {t}
                </Tag>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="education-heading" className="border-t">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
          <h2
            id="education-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            Education
          </h2>
          <EducationList />
        </Container>
      </section>

      <section aria-labelledby="faq-heading" className="border-t">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
          <h2
            id="faq-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            Questions
          </h2>
          <div className="max-w-2xl border-t">
            {faq.map((item) => (
              <div key={item.q} className="border-b py-5">
                <h3 className="text-[15px] font-semibold tracking-[-0.01em]">
                  {item.q}
                </h3>
                <p className="mt-1.5 text-[15px] leading-7 text-pretty text-muted-foreground">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="focus-heading" className="border-t">
        <Container className="grid gap-10 py-16 sm:py-20 md:grid-cols-[14rem_minmax(0,1fr)] md:gap-16">
          <h2
            id="focus-heading"
            className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
          >
            Focus
          </h2>
          <div>
            <ul className="flex max-w-2xl flex-wrap gap-2">
              {about.focus.map((f) => (
                <li key={f}>
                  <Tag className="px-3 py-1 text-sm">{f}</Tag>
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap gap-3">
              <a
                href={site.social.github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border bg-card px-4 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:text-brand"
              >
                <Icon icon={Github01Icon} size={16} />
                {site.social.github.handle}
                <span className="sr-only"> on GitHub (opens in a new tab)</span>
              </a>
              <a
                href={site.social.x.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg border bg-card px-4 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:text-brand"
              >
                <Icon icon={NewTwitterIcon} size={15} />@{site.social.x.handle}
                <span className="sr-only"> on X (opens in a new tab)</span>
              </a>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex h-10 items-center gap-2 rounded-lg border bg-card px-4 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:text-brand"
              >
                <Icon icon={Mail01Icon} size={16} />
                {site.email}
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
