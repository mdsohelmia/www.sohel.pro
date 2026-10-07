// Short, factual answers to the questions people (and answer engines) ask
// about Sohel. Built from the other data files so they never drift.
import { about, site } from "./site"
import { companies, experience } from "./experience"
import { education } from "./education"
import { featuredProject, tenbyteProjects } from "./projects"
import { publishedPosts, writing } from "./writing"

const list = (items: string[]) =>
  items.length < 2
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`

const career = [...experience].reverse().map((e) => `${e.role} at ${e.company}`)

export const faq: { q: string; a: string }[] = [
  {
    q: "Who is Sohel?",
    a: `Sohel (${site.legalName}) is a founder and software engineer. He is the Co-founder & CTO of Tenbyte, a cloud, CDN and video infrastructure company, and builds AI-native SaaS, e-commerce software and high-performance infrastructure.`,
  },
  {
    q: "What does Sohel do at Tenbyte?",
    a: `Sohel co-founded Tenbyte and serves as its CTO. He has built every Tenbyte product from the beginning: ${list(tenbyteProjects.map((p) => p.name))}.`,
  },
  {
    q: "Which companies has Sohel co-founded?",
    a: `Sohel is the co-founder of ${companies.tenbyte.name} (${companies.tenbyte.website.replace(/^https:\/\/(www\.)?|\/$/g, "")}), where he is CTO. He is also the founder of ${featuredProject.name}, an AI SaaS product he is building.`,
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
    q: "What does Sohel write about?",
    a: `${writing.intro.replace(/^Notes on/, "Sohel writes about")} ${
      publishedPosts.length
        ? `Recent writing: ${list(publishedPosts.slice(0, 3).map((p) => `“${p.title}”`))}.`
        : "His first pieces are in progress."
    }`,
  },
  {
    q: "How can I contact Sohel?",
    a: `Email ${site.email}, or reach him on X (@${site.social.x.handle}) or GitHub (${site.social.github.handle}).`,
  },
]
