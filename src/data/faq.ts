// Short, factual answers to the questions people (and answer engines) ask
// about Sohel. Built from the other data files so they never drift.
import { about, site } from "./site"
import { companies, experience } from "./experience"
import { education } from "./education"
import { featuredProject, tenbyteProjects } from "./projects"

const list = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`

const career = [...experience].reverse().map((e) => `${e.role} at ${e.company}`)

export const faq: { q: string; a: string }[] = [
  {
    q: "Who is Sohel?",
    a: `Sohel (${site.legalName}) is an entrepreneur, founder and product engineer. He is the Co-founder & CTO of Tenbyte, a cloud, CDN and video infrastructure company, and builds software products, AI systems and infrastructure.`,
  },
  {
    q: "What does Sohel do at Tenbyte?",
    a: `Sohel co-founded Tenbyte and serves as its CTO. He has built every Tenbyte product from the beginning: ${list(tenbyteProjects.map((p) => p.name))}.`,
  },
  {
    q: "What is Sohel building now?",
    a: `${featuredProject.name}: ${featuredProject.summary}`,
  },
  {
    q: "What is Sohel's career background?",
    a: `${list(career)}. He grew from Software Engineer to Tech Lead before co-founding ${companies.tenbyte.name}.`,
  },
  {
    q: "Where did Sohel study?",
    a: `${list(education.map((e) => `${e.degree} in ${e.field} at ${e.institution}`))}.`,
  },
  {
    q: "What technologies does Sohel work with?",
    a: `${list(about.technologies)}.`,
  },
  {
    q: "How can I contact Sohel?",
    a: `Email ${site.email}, or reach him on X (@${site.social.x.handle}) or GitHub (${site.social.github.handle}).`,
  },
]
