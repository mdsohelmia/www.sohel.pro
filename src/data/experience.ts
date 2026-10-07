export type Experience = {
  company: string
  role: string
  description: string
  website?: string
  // Leave dates undefined until confirmed — nothing is rendered for them.
  startDate?: string
  endDate?: string
  highlights?: string[]
}

// Ordered most recent first.
export const experience: Experience[] = [
  {
    company: "Tenbyte",
    role: "Co-founder & CTO",
    description:
      "Built every Tenbyte product from the beginning—cloud, CDN, video and live streaming infrastructure for businesses.",
    website: "https://www.tenbyte.io/",
  },
  {
    company: "Gotipath",
    role: "Tech Lead",
    description:
      "Led engineering and worked on cloud, CDN and infrastructure systems.",
    website: "https://www.gotipath.com/",
  },
  {
    company: "Gotipath",
    role: "Senior Software Engineer",
    description:
      "Took on more ownership of production software and infrastructure systems.",
    website: "https://www.gotipath.com/",
  },
  {
    company: "Gotipath",
    role: "Software Engineer",
    description: "Built production software and infrastructure systems.",
    website: "https://www.gotipath.com/",
  },
  {
    company: "Kodeeo",
    role: "Software Engineer",
    description:
      "Where it started—building production software at a software development company.",
    website: "https://www.kodeeo.com/",
  },
]

export type Company = {
  slug: "tenbyte" | "gotipath" | "kodeeo"
  name: string
  website: string
  // Roles held, earliest first.
  roles: string[]
  summary: string
  about: string[]
  areas: string[]
  products?: string[]
  // Confirmed personal contributions only. Empty until provided.
  contributions?: string[]
}

export const companies: Record<Company["slug"], Company> = {
  tenbyte: {
    slug: "tenbyte",
    name: "Tenbyte",
    website: "https://www.tenbyte.io/",
    roles: ["Co-founder & CTO"],
    summary:
      "A technology infrastructure company building cloud, CDN and video infrastructure. I've built every Tenbyte product from the beginning.",
    about: [
      "Tenbyte builds enterprise-grade cloud infrastructure. From cloud to CDN to video, it helps businesses build and scale with enterprise performance and transparent pricing.",
      "I co-founded Tenbyte and serve as its CTO.",
    ],
    areas: [
      "Cloud infrastructure",
      "CDN",
      "Video infrastructure",
      "Streaming",
      "Storage",
      "Developer infrastructure",
      "AI-enabled infrastructure management",
    ],
    products: [
      "Vidinfra",
      "Tenbyte CDN",
      "Tenbyte Cloud",
      "Live Stream",
      "Tenbyte Skill",
    ],
    contributions: [
      "Built every Tenbyte product from the beginning—Vidinfra, Tenbyte CDN, Tenbyte Cloud, Live Stream and Tenbyte Skill.",
    ],
  },
  gotipath: {
    slug: "gotipath",
    name: "Gotipath",
    website: "https://www.gotipath.com/",
    roles: ["Software Engineer", "Senior Software Engineer", "Tech Lead"],
    summary:
      "An infrastructure company working across cloud, CDN and video technology.",
    about: [
      "Gotipath operated in cloud, CDN and video infrastructure—including bare metal, Kubernetes, and OTT/VOD delivery.",
      "I joined as a Software Engineer building production software and infrastructure systems, was promoted to Senior Software Engineer, and then grew into a Tech Lead, taking on broader engineering and technical responsibilities.",
    ],
    areas: [
      "Engineering",
      "Infrastructure",
      "Cloud",
      "CDN",
      "Video",
      "Bare metal",
      "Kubernetes",
      "OTT/VOD",
    ],
  },
  kodeeo: {
    slug: "kodeeo",
    name: "Kodeeo",
    website: "https://www.kodeeo.com/",
    roles: ["Software Engineer"],
    summary: "A software development company—and where my career started.",
    about: [
      "Kodeeo is a software development company.",
      "I started my career there as a Software Engineer, building production software.",
    ],
    areas: ["Software development", "Engineering"],
  },
}
