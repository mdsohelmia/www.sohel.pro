// schema.org JSON-LD builders. Every page emits a small @graph that links
// back to the same Person, WebSite and Organization nodes by @id, so search
// and answer engines resolve one consistent entity for Sohel.
import { site, about } from "@/data/site"
import { education } from "@/data/education"
import { companies, experience } from "@/data/experience"
import type { Project } from "@/data/projects"
import { canonicalUrl } from "./url"

type Node = Record<string, unknown>

export const ids = {
  person: `${site.url}/#person`,
  website: `${site.url}/#website`,
  tenbyte: `${site.url}/#tenbyte`,
}

const companyId = (slug: string) =>
  slug === "tenbyte" ? ids.tenbyte : `${site.url}/#${slug}`

export const tenbyteNode: Node = {
  "@type": "Organization",
  "@id": ids.tenbyte,
  name: companies.tenbyte.name,
  url: companies.tenbyte.website,
  description: companies.tenbyte.summary,
  founder: { "@id": ids.person },
}

export const personNode: Node = {
  "@type": "Person",
  "@id": ids.person,
  // Full name for entity matching; "Sohel" is the public-facing name.
  name: site.legalName,
  alternateName: site.name,
  givenName: "Sohel",
  familyName: "Mia",
  url: site.url,
  image: `${site.url}${site.avatar}`,
  email: `mailto:${site.email}`,
  jobTitle: [site.title, "Co-founder & CTO"],
  description: site.description,
  worksFor: { "@id": ids.tenbyte },
  // Earlier employers, most recent first, de-duplicated.
  alumniOf: [
    ...[...new Set(experience.map((e) => e.company))]
      .filter((name) => name !== "Tenbyte")
      .map((name) => {
        const c = Object.values(companies).find((x) => x.name === name)
        return {
          "@type": "Organization",
          "@id": companyId(c?.slug ?? name.toLowerCase()),
          name,
          url: c?.website,
        }
      }),
    ...education.map((e) => ({
      "@type": "CollegeOrUniversity",
      name: e.institution,
      url: e.website,
    })),
  ],
  hasCredential: education.map((e) => ({
    "@type": "EducationalOccupationalCredential",
    name: `${e.degree} in ${e.field}`,
    credentialCategory: e.degree.startsWith("Diploma") ? "diploma" : "degree",
    recognizedBy: { "@type": "CollegeOrUniversity", name: e.institution },
  })),
  knowsAbout: [...about.focus, ...about.technologies],
  sameAs: [site.social.github.url, site.social.x.url],
}

export const websiteNode: Node = {
  "@type": "WebSite",
  "@id": ids.website,
  url: site.url,
  name: site.name,
  alternateName: site.brand,
  description: site.description,
  inLanguage: "en",
  publisher: { "@id": ids.person },
}

export function webPage(
  path: string,
  name: string,
  type: string = "WebPage",
  extra: Node = {}
): Node {
  return {
    "@type": type,
    "@id": `${canonicalUrl(path)}#webpage`,
    url: canonicalUrl(path),
    name,
    isPartOf: { "@id": ids.website },
    about: { "@id": ids.person },
    inLanguage: "en",
    ...extra,
  }
}

export function breadcrumbs(trail: { name: string; path: string }[]): Node {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Home", path: "/" }, ...trail].map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: canonicalUrl(item.path),
    })),
  }
}

export function productNode(p: Project): Node {
  return {
    "@type": "SoftwareApplication",
    "@id": `${canonicalUrl(`/products/${p.slug}`)}#product`,
    name: p.name,
    description: p.summary,
    url: p.links?.[0]?.url ?? canonicalUrl(`/products/${p.slug}`),
    applicationCategory: p.categories.includes("AI SaaS")
      ? "BusinessApplication"
      : "DeveloperApplication",
    operatingSystem: "Web",
    creator: { "@id": ids.person },
    ...(p.company ? { publisher: { "@id": ids.tenbyte } } : {}),
  }
}

export function organizationNode(slug: string): Node {
  const c = companies[slug as keyof typeof companies]
  if (slug === "tenbyte") return tenbyteNode
  return {
    "@type": "Organization",
    "@id": companyId(slug),
    name: c.name,
    url: c.website,
    description: c.summary,
  }
}

export function faqNode(items: { q: string; a: string }[]): Node {
  return {
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  }
}

// Returns a TanStack `head().scripts` entry.
export function jsonLd(nodes: Node[]) {
  return {
    type: "application/ld+json",
    children: JSON.stringify({
      "@context": "https://schema.org",
      "@graph": nodes,
    }),
  }
}
