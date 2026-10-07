import { Link, createFileRoute } from "@tanstack/react-router"
import {
  ArrowRight01Icon,
  Github01Icon,
  Mail01Icon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons"
import { Icon } from "@/components/site/icon"
import {
  ArrowLink,
  Container,
  Eyebrow,
  ExternalLink,
  Section,
  StatusBadge,
  Tag,
} from "@/components/site/primitives"
import { CareerLadder } from "@/components/site/career"
import { ProductCard, RepoCard } from "@/components/site/cards"
import { about, hero, site } from "@/data/site"
import { education } from "@/data/education"
import { featuredProject, projects, tenbyteProjects } from "@/data/projects"
import { github, repositories } from "@/data/github"
import { posts, writing } from "@/data/writing"
import { cn } from "@/lib/utils"
import { seo } from "@/lib/seo"

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.legalName,
  alternateName: site.name,
  jobTitle: site.title,
  url: site.url,
  email: site.email,
  image: `${site.url}${site.avatar}`,
  sameAs: [site.social.github.url, site.social.x.url],
  worksFor: {
    "@type": "Organization",
    name: "Tenbyte",
    url: "https://www.tenbyte.io/",
  },
  knowsAbout: [...about.focus, ...about.technologies],
  alumniOf: education.map((e) => ({
    "@type": "CollegeOrUniversity",
    name: e.institution,
    url: e.website,
  })),
}

export const Route = createFileRoute("/")({
  head: () => ({
    ...seo({ path: "/", type: "profile" }),
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(personJsonLd),
      },
    ],
  }),
  component: Home,
})

const careerTrack = [
  "Software Engineer",
  "Senior Software Engineer",
  "Tech Lead",
  "Co-founder & CTO",
  "Founder",
]

function Home() {
  return (
    <>
      <Hero />
      <TenbyteSection />
      <CurrentlyBuilding />
      <Section
        id="career"
        label="Career"
        title="From engineer to founder"
        intro="My career started with building software. Over time, I moved into technical leadership and eventually co-founded a technology company focused on cloud, CDN and video infrastructure."
        action={<ArrowLink to="/experience">View experience</ArrowLink>}
      >
        <CareerLadder />
      </Section>
      <Section
        id="products"
        label="Products"
        title="Products"
        intro="Things I'm building, co-building, and experimenting with."
        action={<ArrowLink to="/products">All products</ArrowLink>}
      >
        <div className="grid gap-4 sm:grid-cols-2">
          {projects.map((p) => (
            <ProductCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>
      <OpenSource />
      <WritingSection />
      <AboutSection />
    </>
  )
}

function Hero() {
  return (
    <Container className="pt-20 pb-16 sm:pt-32 sm:pb-24">
      <div className="flex items-center gap-3">
        <img
          src={site.avatarSmall}
          alt=""
          width={40}
          height={40}
          fetchPriority="high"
          className="size-10 rounded-full border bg-muted object-cover"
        />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-sm leading-none font-medium">{site.name}</p>
          <Eyebrow className="leading-[1.5]">{hero.eyebrow}</Eyebrow>
        </div>
      </div>
      <h1 className="mt-8 max-w-3xl text-[2.6rem] leading-[1.05] font-semibold tracking-[-0.045em] text-balance sm:text-6xl md:text-7xl">
        {hero.headline}
      </h1>
      <p className="mt-4 max-w-3xl text-2xl leading-tight font-medium tracking-[-0.03em] text-balance text-subtle-foreground sm:text-3xl md:text-4xl">
        {hero.secondary}
      </p>
      <p className="mt-8 max-w-xl text-[17px] leading-8 text-pretty text-muted-foreground">
        {hero.description}
      </p>
      <p className="mt-4 text-[15px] text-muted-foreground">
        Co-founder & CTO at{" "}
        <ExternalLink
          href="https://www.tenbyte.io/"
          className="font-medium text-foreground"
        >
          Tenbyte
        </ExternalLink>
      </p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          to="/products"
          className="inline-flex h-10 items-center gap-2 rounded-lg bg-foreground px-4 text-sm font-medium text-background transition-colors duration-200 hover:bg-foreground/85"
        >
          View products
          <Icon icon={ArrowRight01Icon} size={16} />
        </Link>
        <Link
          to="/experience"
          className="inline-flex h-10 items-center rounded-lg border bg-card px-4 text-sm font-medium transition-colors duration-200 hover:border-border-strong hover:bg-muted"
        >
          My experience
        </Link>
        <div className="ml-1 flex items-center gap-1">
          <a
            href={site.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub (opens in a new tab)"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            <Icon icon={Github01Icon} size={18} />
          </a>
          <a
            href={site.social.x.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (opens in a new tab)"
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            <Icon icon={NewTwitterIcon} size={17} />
          </a>
          <a
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.email}`}
            className="inline-flex size-10 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-foreground"
          >
            <Icon icon={Mail01Icon} size={18} />
          </a>
        </div>
      </div>

      <ol
        aria-label="Career progression"
        className="mt-16 flex flex-wrap items-center gap-x-2 gap-y-2 font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase sm:mt-20"
      >
        {careerTrack.map((step, i) => {
          const last = i === careerTrack.length - 1
          return (
            <li key={step} className="flex items-center gap-2">
              <span className={cn(last && "text-brand")}>{step}</span>
              {!last && (
                <Icon
                  icon={ArrowRight01Icon}
                  size={12}
                  className="text-border-strong"
                />
              )}
            </li>
          )
        })}
      </ol>
    </Container>
  )
}

function TenbyteSection() {
  return (
    <Section
      id="tenbyte"
      label="Tenbyte"
      title="Co-founder & CTO at Tenbyte"
      intro="Tenbyte builds enterprise-grade cloud, CDN and video infrastructure. As Co-founder & CTO, I've built every Tenbyte product from the beginning."
      action={
        <ArrowLink to="/experience/$company" params={{ company: "tenbyte" }}>
          About my role
        </ArrowLink>
      }
    >
      <ul className="divide-y overflow-hidden rounded-2xl border bg-card">
        {tenbyteProjects.map((p) => (
          <li key={p.slug}>
            <Link
              to="/products/$slug"
              params={{ slug: p.slug }}
              className="group grid gap-1.5 p-5 transition-colors duration-200 hover:bg-muted/50 sm:grid-cols-[11rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6 sm:px-6"
            >
              <span className="flex flex-col gap-1">
                <span className="font-semibold tracking-[-0.015em] transition-colors duration-200 group-hover:text-brand">
                  {p.name}
                </span>
                <span className="font-mono text-[11px] tracking-[0.1em] text-subtle-foreground uppercase">
                  {p.label}
                </span>
              </span>
              <span className="text-sm leading-6 text-pretty text-muted-foreground">
                {p.summary}
              </span>
              <Icon
                icon={ArrowRight01Icon}
                size={15}
                className="hidden text-subtle-foreground transition-[translate,color] duration-200 group-hover:translate-x-0.5 group-hover:text-brand sm:block"
              />
            </Link>
          </li>
        ))}
      </ul>
      <ExternalLink
        href="https://www.tenbyte.io/"
        className="mt-6 text-sm font-medium text-muted-foreground"
      >
        Visit tenbyte.io
      </ExternalLink>
    </Section>
  )
}

function CurrentlyBuilding() {
  const p = featuredProject
  return (
    <Section id="now" label="Now" title="Currently building">
      <article className="overflow-hidden rounded-2xl border bg-card">
        <div className="grid md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <div className="flex flex-col p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2">
              {p.status && <StatusBadge status={p.status} />}
              <Tag>{p.label}</Tag>
            </div>
            <h3 className="mt-8 text-3xl font-semibold tracking-[-0.035em]">
              {p.name}
            </h3>
            {p.tagline && (
              <p className="mt-2 text-lg font-medium tracking-[-0.015em] text-foreground/80">
                {p.tagline}
              </p>
            )}
            <p className="mt-4 max-w-md text-[15px] leading-7 text-pretty text-muted-foreground">
              {p.product ?? p.summary}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <ArrowLink to="/products/$slug" params={{ slug: p.slug }}>
                View project
              </ArrowLink>
              {p.buildingInPublic && (
                <span className="inline-flex items-center gap-2 text-xs text-subtle-foreground">
                  <span
                    aria-hidden
                    className="size-1.5 animate-pulse rounded-full bg-brand motion-reduce:animate-none"
                  />
                  Building in public
                </span>
              )}
            </div>
          </div>
          {p.howItWorks && (
            <div className="border-t bg-muted/50 p-6 sm:p-8 md:border-t-0 md:border-l">
              <p className="font-mono text-[11px] tracking-[0.12em] text-subtle-foreground uppercase">
                The loop
              </p>
              <ol className="mt-5 flex flex-col">
                {p.howItWorks.map((step, i) => (
                  <li
                    key={step}
                    className="flex gap-4 border-b border-border/70 py-3 text-sm leading-6 last:border-0"
                  >
                    <span className="font-mono text-xs leading-6 text-subtle-foreground tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-foreground/85">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </article>
    </Section>
  )
}

function OpenSource() {
  const featured = repositories.filter((r) => r.featured)
  const rest = repositories.filter((r) => !r.featured).slice(0, 3)
  return (
    <Section
      id="open-source"
      label="GitHub"
      title="Open source & engineering"
      intro="I build systems, tools, and infrastructure in public."
    >
      <div className="mb-8 flex flex-col gap-6 rounded-xl border bg-card p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex size-10 items-center justify-center rounded-full border bg-background">
            <Icon icon={Github01Icon} size={20} />
          </span>
          <div>
            <p className="text-xs text-subtle-foreground">GitHub</p>
            <ExternalLink
              href={github.url}
              className="font-mono text-sm font-medium"
            >
              {github.username}
            </ExternalLink>
          </div>
        </div>
        <dl className="grid grid-cols-3 gap-6 lg:flex lg:gap-10">
          {github.stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse gap-0.5">
              <dt className="text-xs text-subtle-foreground">{s.label}</dt>
              <dd className="text-lg font-semibold tracking-[-0.02em] tabular-nums">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {[...featured, ...rest].map((r) => (
          <RepoCard key={r.name} repo={r} />
        ))}
      </div>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
        <h3 className="shrink-0 font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase">
          Working with
        </h3>
        <ul className="flex flex-wrap gap-2" aria-label="Technologies">
          {about.technologies.map((t) => (
            <li key={t}>
              <Tag className="font-mono text-foreground/80">{t}</Tag>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

function WritingSection() {
  return (
    <Section
      id="writing"
      label="Writing"
      title="Writing"
      intro={writing.intro}
      action={<ArrowLink to="/writing">All writing</ArrowLink>}
    >
      <ul className="border-t">
        {posts.slice(0, 4).map((post) => (
          <li
            key={post.title}
            className="flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
          >
            {post.url ? (
              <a
                href={post.url}
                className="text-[15px] font-medium transition-colors duration-200 hover:text-brand"
              >
                {post.title}
              </a>
            ) : (
              <span className="text-[15px] font-medium text-foreground/85">
                {post.title}
              </span>
            )}
            <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase">
              {post.category} · {post.date ?? "Upcoming"}
            </span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function AboutSection() {
  return (
    <Section
      id="about"
      label="About"
      title="About Sohel"
      action={<ArrowLink to="/about">More about me</ArrowLink>}
    >
      <blockquote className="max-w-2xl text-2xl leading-snug font-medium tracking-[-0.025em] text-balance sm:text-[1.75rem]">
        “{about.statement}”
      </blockquote>
      <div className="mt-10 grid max-w-2xl gap-4 text-[15px] leading-7 text-muted-foreground">
        <p>{about.intro}</p>
        <p>{about.background}</p>
      </div>
      <ul
        className="mt-8 flex max-w-2xl flex-wrap gap-2"
        aria-label="Focus areas"
      >
        {about.focus.map((f) => (
          <li key={f}>
            <Tag>{f}</Tag>
          </li>
        ))}
      </ul>
      <p className="mt-10 text-[15px] text-muted-foreground">
        Get in touch:{" "}
        <a
          href={`mailto:${site.email}`}
          className="font-medium text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand"
        >
          {site.email}
        </a>
      </p>
    </Section>
  )
}
