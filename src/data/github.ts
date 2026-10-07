export type GitHubProject = {
  name: string
  description: string
  language?: string
  stars?: number
  url: string
  featured?: boolean
}

// Static snapshot — edit by hand. No live API calls.
// `asOf` documents when the numbers below were taken from GitHub.
export const github = {
  username: "mdsohelmia",
  url: "https://github.com/mdsohelmia",
  asOf: "October 2026",
  stats: [
    { label: "Public repositories", value: "479" },
    { label: "Followers", value: "158" },
    { label: "Primary language", value: "Go" },
  ],
}

export const repositories: GitHubProject[] = [
  {
    name: "acme",
    description: "Go ACME client — a decoupled Let's Encrypt client.",
    language: "Go",
    stars: 6,
    url: "https://github.com/mdsohelmia/acme",
    featured: true,
  },
  {
    name: "media-analyzer",
    description:
      "A Go media analyzer library that uses FFprobe and MediaInfo and merges their results into one data model.",
    url: "https://github.com/mdsohelmia/media-analyzer",
    featured: true,
  },
  {
    name: "typeconv",
    description:
      "A small Go package for converting values to pointers and pointers to values.",
    language: "Go",
    stars: 2,
    url: "https://github.com/mdsohelmia/typeconv",
    featured: true,
  },
  {
    name: "webhook",
    description: "Send webhooks from Go apps.",
    language: "Go",
    url: "https://github.com/mdsohelmia/webhook",
  },
  {
    name: "kvdb",
    description: "A simple in-memory key-value database in Go (experiment).",
    url: "https://github.com/mdsohelmia/kvdb",
  },
  {
    name: "go-cache",
    description: "Simple caching for Go.",
    language: "Go",
    stars: 1,
    url: "https://github.com/mdsohelmia/go-cache",
  },
  {
    name: "temporal",
    description: "Building reliable workflows with Temporal in Go.",
    url: "https://github.com/mdsohelmia/temporal",
  },
]
