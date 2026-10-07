import { site } from "@/data/site"
import { jsonLd } from "./schema"
import { canonicalUrl } from "./url"

export { canonicalUrl }

type SeoInput = {
  title?: string
  description?: string
  path: string
  type?: "website" | "profile" | "article"
  // schema.org nodes for this page; wrapped in a single JSON-LD @graph.
  schema?: Record<string, unknown>[]
  noindex?: boolean
}

// Search results show roughly 155–160 characters; trim at a word boundary.
function clamp(text: string, max = 158) {
  if (text.length <= max) return text
  return `${text.slice(0, text.lastIndexOf(" ", max - 1)).replace(/[,;:—-]$/, "")}…`
}

const imageAlt = `${site.name} — ${site.title}. I build software products.`

export function seo({
  title,
  description = site.description,
  path,
  type = "website",
  schema,
  noindex = false,
}: SeoInput) {
  description = clamp(description)
  const fullTitle = title
    ? `${title} — ${site.name}`
    : `${site.name} — ${site.title}`
  const url = canonicalUrl(path)

  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      {
        name: "robots",
        content: noindex
          ? "noindex, follow"
          : "index, follow, max-image-preview:large, max-snippet:-1",
      },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:url", content: url },
      { property: "og:type", content: type },
      { property: "og:site_name", content: site.name },
      { property: "og:locale", content: "en_US" },
      { property: "og:image", content: site.ogImage },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: imageAlt },
      ...(type === "profile"
        ? [{ property: "profile:username", content: site.social.x.handle }]
        : []),
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: `@${site.social.x.handle}` },
      { name: "twitter:creator", content: `@${site.social.x.handle}` },
      { name: "twitter:title", content: fullTitle },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: site.ogImage },
      { name: "twitter:image:alt", content: imageAlt },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: schema?.length ? [jsonLd(schema)] : [],
  }
}
