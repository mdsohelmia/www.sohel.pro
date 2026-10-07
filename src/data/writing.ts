export type WritingCategory =
  "Founder" | "SaaS" | "AI" | "Engineering" | "Infrastructure"

// Article body, kept as simple blocks so posts stay plain data (no CMS, no
// markdown dependency).
export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string; language?: string }
  | { type: "quote"; text: string }

export type Post = {
  slug: string
  title: string
  category: WritingCategory
  // Meta description and listing summary (~150 characters).
  description?: string
  // ISO dates (YYYY-MM-DD). A post is published once it has a body and a
  // datePublished; until then it is listed as "in progress" and not linked.
  datePublished?: string
  dateModified?: string
  body?: Block[]
  // Slugs of related posts, and project/experience pages this post discusses.
  related?: string[]
  projects?: string[]
  companies?: string[]
  // Published elsewhere (e.g. a company blog): link out instead of hosting.
  externalUrl?: string
}

export const writing = {
  intro:
    "Notes on building products, AI, engineering, infrastructure and the business of software.",
  categories: [
    "Founder",
    "SaaS",
    "AI",
    "Engineering",
    "Infrastructure",
  ] as WritingCategory[],
}

export const posts: Post[] = [
  {
    slug: "ai-employee-not-saas-dashboard",
    title: "Why I'm building an AI employee instead of another SaaS dashboard",
    category: "AI",
    projects: ["docloop"],
  },
  {
    slug: "micro-saas-worth-building",
    title: "What makes a micro-SaaS worth building?",
    category: "SaaS",
  },
  {
    slug: "from-engineer-to-founder",
    title: "From engineer to founder",
    category: "Founder",
    companies: ["kodeeo", "gotipath", "tenbyte"],
  },
  {
    slug: "building-ai-native-products",
    title: "Building AI-native products",
    category: "AI",
  },
  {
    slug: "building-high-performance-infrastructure",
    title: "Building high-performance infrastructure",
    category: "Infrastructure",
    companies: ["tenbyte"],
  },
  {
    slug: "lessons-building-infrastructure-products",
    title: "What I learned building infrastructure products",
    category: "Engineering",
    companies: ["tenbyte"],
  },
]

export const isPublished = (p: Post) =>
  Boolean(p.datePublished && (p.body?.length || p.externalUrl))

// Newest first.
export const publishedPosts = posts
  .filter(isPublished)
  .sort((a, b) => (b.datePublished ?? "").localeCompare(a.datePublished ?? ""))

// Hosted on this site (has a body), so it gets a /writing/$slug page.
export const hostedPosts = publishedPosts.filter((p) => p.body?.length)

export function getPost(slug: string) {
  return hostedPosts.find((p) => p.slug === slug)
}

export function postUrl(p: Post) {
  return p.externalUrl ?? `/writing/${p.slug}`
}
