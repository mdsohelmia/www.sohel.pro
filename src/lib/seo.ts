import { site } from "@/data/site"

type SeoInput = {
  title?: string
  description?: string
  path: string
  type?: "website" | "profile" | "article"
}

export function canonicalUrl(path: string) {
  return path === "/" ? site.url : `${site.url}${path}`
}

export function seo({
  title,
  description = site.description,
  path,
  type = "website",
}: SeoInput) {
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — ${site.title}`
  const url = canonicalUrl(path)

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:site_name", content: site.brand },
      { property: "og:image", content: site.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: `@${site.social.x.handle}` },
      { name: "twitter:creator", content: `@${site.social.x.handle}` },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: site.ogImage },
    ],
    links: [{ rel: "canonical", href: url }],
  }
}
