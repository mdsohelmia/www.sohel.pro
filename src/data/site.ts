export const site = {
  name: "Sohel",
  legalName: "MD. Sohel Mia",
  brand: "SOHEL.PRO",
  title: "Founder & Product Engineer",
  url: "https://sohel.pro",
  description:
    "Sohel is a founder and product engineer building software products, AI systems, and infrastructure.",
  ogImage: "https://sohel.pro/og.png",
  avatar: "/sohel.jpg",
  avatarSmall: "/sohel-80.jpg",
  email: "sohelcse1999@gmail.com",
  copyrightYear: 2026,
  social: {
    github: {
      label: "GitHub",
      handle: "mdsohelmia",
      url: "https://github.com/mdsohelmia",
    },
    x: {
      label: "X",
      handle: "sohelcse1999",
      url: "https://x.com/sohelcse1999",
    },
  },
} as const

export type NavItem = { label: string; to: string }

export const nav: NavItem[] = [
  { label: "Now", to: "/now" },
  { label: "Products", to: "/products" },
  { label: "Experience", to: "/experience" },
  { label: "Writing", to: "/writing" },
  { label: "About", to: "/about" },
]

export const hero = {
  eyebrow: "Entrepreneur · Founder · Product Engineer",
  headline: "I build software products.",
  secondary: "AI systems, SaaS products, and infrastructure.",
  description:
    "I'm Sohel, a founder and product engineer. I build software products and the systems behind them—from AI-native SaaS to high-performance infrastructure.",
}

export const about = {
  intro:
    "I'm Sohel, an entrepreneur, founder and product engineer focused on building software products, AI systems, and infrastructure.",
  background:
    "My background spans software engineering, technical leadership, cloud infrastructure, CDN, video systems, distributed systems and product development.",
  statement:
    "I like working where engineering and product meet—understanding a problem, building the first version, and then building the systems needed to make it real.",
  focus: [
    "Entrepreneurship",
    "Product",
    "AI",
    "SaaS",
    "Infrastructure",
    "Cloud",
    "CDN",
    "Video",
    "Distributed Systems",
    "Systems Engineering",
  ],
  technologies: [
    "JavaScript",
    "TypeScript",
    "React",
    "Rust",
    "Go",
    "C++",
    "C",
    "Lua (edge scripting)",
  ],
  story: [
    "I started as a software engineer at Kodeeo, building production software and learning how real systems are made.",
    "At Gotipath, I grew from Software Engineer to Senior Software Engineer and then Tech Lead, taking on broader engineering and technical responsibilities across cloud, CDN and video infrastructure.",
    "Later, I co-founded Tenbyte as CTO and built every one of its products from the beginning—cloud, CDN, video and live streaming infrastructure.",
    "Today, I combine that engineering background with product thinking to build software products, AI systems and infrastructure.",
  ],
  // Short four-beat version of the story, used on the homepage.
  arc: [
    "I started by building software.",
    "Then I learned to lead engineering.",
    "Then I helped build a technology company.",
    "Now I build products of my own.",
  ],
}
