export type ProjectCategory =
  "AI SaaS" | "E-commerce" | "Video" | "Infrastructure" | "Cloud"

export type ProjectStatus = "Building" | "Live" | "Experiment" | "Paused"

export type Project = {
  slug: string
  // Set for products built at a company rather than independently.
  company?: "Tenbyte"
  name: string
  label: string
  categories: ProjectCategory[]
  tagline?: string
  summary: string
  // Detail-page sections. Sections without content are not rendered.
  problem?: string
  why?: string
  product?: string
  howItWorks?: string[]
  technology?: string[]
  role?: string
  status?: ProjectStatus
  links?: { label: string; url: string }[]
  featured?: boolean
  buildingInPublic?: boolean
}

export const projects: Project[] = [
  {
    slug: "docloop",
    name: "DocLoop",
    label: "AI SaaS",
    categories: ["AI SaaS"],
    tagline: "Stop chasing clients for documents.",
    summary:
      "An AI employee for accounting firms that requests, follows up, organizes, and tracks missing client documents.",
    problem:
      "Accounting firms spend a surprising amount of time chasing clients for missing documents—sending reminders, checking inboxes, and keeping track of what is still outstanding.",
    why: "Most tools in this space are dashboards that still need a person to do the chasing. I wanted to build something that does the work itself: an AI employee rather than another SaaS dashboard.",
    product:
      "An AI employee that helps accounting firms collect missing documents from clients without the endless follow-up.",
    howItWorks: [
      "Requests the documents a client still needs to provide.",
      "Follows up until they arrive.",
      "Organizes what comes in.",
      "Tracks what is still missing.",
    ],
    role: "Founder & Product Engineer",
    status: "Building",
    featured: true,
    buildingInPublic: true,
  },
  {
    slug: "sellorio",
    name: "Sellorio",
    label: "E-commerce · AI",
    categories: ["E-commerce", "AI SaaS"],
    summary: "AI operating system and cofounder for e-commerce businesses.",
  },
  {
    slug: "frameo",
    name: "Frameo",
    label: "AI · Video",
    categories: ["AI SaaS", "Video"],
    summary:
      "An AI-powered workflow for turning ideas into scripts, storyboards, scenes and videos.",
    howItWorks: [
      "Start from an idea.",
      "Turn it into a script.",
      "Break the script into storyboards and scenes.",
      "Produce the video.",
    ],
  },
]

// Descriptions are taken from tenbyte.io.
const tenbyteRole = "Co-founder & CTO — built from the beginning"

export const tenbyteProjects: Project[] = [
  {
    slug: "vidinfra",
    company: "Tenbyte",
    name: "Vidinfra",
    label: "Video infrastructure",
    categories: ["Video", "Infrastructure"],
    summary:
      "Host, stream, and manage videos with scalable, secure infrastructure, fast delivery, and smooth playback for every screen.",
    role: tenbyteRole,
    status: "Live",
    links: [{ label: "Vidinfra", url: "https://www.tenbyte.io/vidinfra" }],
  },
  {
    slug: "tenbyte-cdn",
    company: "Tenbyte",
    name: "Tenbyte CDN",
    label: "CDN",
    categories: ["Infrastructure"],
    summary:
      "Content delivery network that accelerates websites, apps, and streams with global PoPs, low latency routing, and enterprise-grade security.",
    role: tenbyteRole,
    status: "Live",
    links: [{ label: "Tenbyte CDN", url: "https://www.tenbyte.io/cdn" }],
  },
  {
    slug: "tenbyte-cloud",
    company: "Tenbyte",
    name: "Tenbyte Cloud",
    label: "Cloud",
    categories: ["Cloud", "Infrastructure"],
    summary:
      "Cloud infrastructure that gives businesses secure storage, low latency connections, automatic backup, and scalable resources.",
    role: tenbyteRole,
    status: "Live",
    links: [{ label: "Tenbyte Cloud", url: "https://www.tenbyte.io/cloud-vm" }],
  },
  {
    slug: "live-stream",
    company: "Tenbyte",
    name: "Live Stream",
    label: "Live video",
    categories: ["Video", "Infrastructure"],
    summary:
      "A modern live streaming platform designed for broadcasters, media teams, and enterprises to deliver reliable live video at scale with adaptive streaming, monitoring, and recording.",
    role: tenbyteRole,
    status: "Live",
    links: [
      { label: "Live Stream", url: "https://www.tenbyte.io/live-stream" },
    ],
  },
  {
    slug: "tenbyte-skill",
    company: "Tenbyte",
    name: "Tenbyte Skill",
    label: "AI · Infrastructure",
    categories: ["AI SaaS", "Infrastructure"],
    summary:
      "Manage Tenbyte infrastructure through AI assistants with natural language commands.",
    role: tenbyteRole,
    links: [{ label: "Tenbyte docs", url: "https://docs.tenbyte.io/" }],
  },
]

export const allProjects: Project[] = [...tenbyteProjects, ...projects]

export function getProject(slug: string) {
  return allProjects.find((p) => p.slug === slug)
}

export const featuredProject = projects.find((p) => p.featured) ?? projects[0]
