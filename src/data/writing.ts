export type WritingCategory =
  "Founder" | "SaaS" | "AI" | "Engineering" | "Infrastructure"

export type Post = {
  title: string
  category: WritingCategory
  // Set both once a post is actually published. Unpublished posts are
  // shown as upcoming and are not linked.
  url?: string
  date?: string
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
    title: "Why I'm building an AI employee instead of another SaaS dashboard",
    category: "AI",
  },
  { title: "What makes a micro-SaaS worth building?", category: "SaaS" },
  { title: "From engineer to founder", category: "Founder" },
  { title: "Building AI-native products", category: "AI" },
  {
    title: "Building high-performance infrastructure",
    category: "Infrastructure",
  },
  {
    title: "What I learned building infrastructure products",
    category: "Engineering",
  },
]

export const publishedPosts = posts.filter((p) => p.url)
