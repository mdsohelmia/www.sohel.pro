export const site = {
  name: "Sohel",
  legalName: "MD. Sohel Mia",
  brand: "SOHEL.PRO",
  // Visible role, used in the footer, career ladder and Person.jobTitle.
  title: "Founder & Software Engineer",
  // Longer positioning used in the homepage <title>.
  seoTitle: "Founder, Software Engineer & AI SaaS Builder",
  // Canonical origin. sohel.pro redirects here (Cloudflare redirect rule).
  url: "https://www.sohel.pro",
  description:
    "Sohel is a founder and software engineer building AI-native SaaS, e-commerce software, and high-performance infrastructure.",
  ogImage: "https://www.sohel.pro/og-sohel-founder-software-engineer.png",
  ogImageAlt:
    "Sohel — Founder, Software Engineer & AI SaaS Builder. I build software products.",
  avatar: "/sohel-founder-software-engineer.webp",
  avatarSmall: "/sohel-founder-software-engineer-80.webp",
  avatarAlt: "Sohel, founder and software engineer",
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
  { label: "Projects", to: "/projects" },
  { label: "Experience", to: "/experience" },
  { label: "Writing", to: "/writing" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
]

export const hero = {
  eyebrow: "Founder · Software Engineer · AI SaaS Builder",
  headline: "I’m Sohel. I build software products.",
  secondary: "AI-native software, SaaS products, and infrastructure.",
  description:
    "I'm a founder and software engineer. I build software products and the systems behind them—from AI-native SaaS and e-commerce software to high-performance infrastructure.",
}

export const about = {
  intro:
    "I'm Sohel, an entrepreneur, founder and software engineer focused on building AI-native SaaS, e-commerce software and infrastructure.",
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
    "Today, I combine that engineering background with product thinking to build AI-native software products and infrastructure.",
  ],
  // Short four-beat version of the story, used on the homepage.
  arc: [
    "I started by building software.",
    "Then I learned to lead engineering.",
    "Then I helped build a technology company.",
    "Now I build products of my own.",
  ],
}
