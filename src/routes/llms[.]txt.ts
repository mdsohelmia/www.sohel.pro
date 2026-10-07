import { createFileRoute } from "@tanstack/react-router"
import { about, site } from "@/data/site"
import { companies, experience } from "@/data/experience"
import { education } from "@/data/education"
import { projects, tenbyteProjects, type Project } from "@/data/projects"
import { faq } from "@/data/faq"
import { publishedPosts, writing } from "@/data/writing"
import { canonicalUrl } from "@/lib/url"

// /llms.txt (https://llmstxt.org): a plain-Markdown summary of the site for
// AI assistants and answer engines. Generated from the same data as the
// pages and prerendered as a static file.

const product = (p: Project) =>
  `- [${p.name}](${canonicalUrl(`/projects/${p.slug}`)}): ${p.summary}${
    p.role ? ` Role: ${p.role}.` : ""
  }${p.status ? ` Status: ${p.status}.` : ""}`

function body() {
  return `# ${site.name}

> ${site.name} — ${site.seoTitle}. ${site.description}

${site.name} (full name: ${site.legalName}) is an entrepreneur, founder and software engineer. He is the Co-founder & CTO of [Tenbyte](${companies.tenbyte.website}) and has built every Tenbyte product from the beginning. He also builds independent AI-native SaaS, e-commerce software and high-performance infrastructure.

${about.statement}

## Career

${experience
  .map(
    (e) =>
      `- ${e.role}, ${e.company}${e.website ? ` (${e.website})` : ""}: ${e.description}`
  )
  .join("\n")}

Details: ${canonicalUrl("/experience")}

## Tenbyte products (built from the beginning as Co-founder & CTO)

${tenbyteProjects.map(product).join("\n")}

## Independent products

${projects.map(product).join("\n")}

## Education

${education.map((e) => `- ${e.degree} in ${e.field}, ${e.institution} (${e.website})`).join("\n")}

## Technologies

${about.technologies.join(", ")}

## Focus areas

${about.focus.join(", ")}

## Questions

${faq.map((item) => `### ${item.q}\n\n${item.a}`).join("\n\n")}

## Writing

${
  publishedPosts.length
    ? publishedPosts
        .map(
          (p) =>
            `- [${p.title}](${p.externalUrl ?? canonicalUrl(`/writing/${p.slug}`)}) (${p.datePublished})${p.description ? `: ${p.description}` : ""}`
        )
        .join("\n")
    : `${writing.intro} First pieces are in progress.`
}

## Contact

- Email: ${site.email}
- X: ${site.social.x.url}
- GitHub: ${site.social.github.url}

## Pages

- [Home](${canonicalUrl("/")})
- [About](${canonicalUrl("/about")})
- [Experience](${canonicalUrl("/experience")})
- [Projects](${canonicalUrl("/projects")})
- [Now](${canonicalUrl("/now")})
- [Writing](${canonicalUrl("/writing")})
- [Contact](${canonicalUrl("/contact")})
- [Tenbyte (Co-founder & CTO)](${canonicalUrl("/experience/tenbyte")})
`
}

export const Route = createFileRoute("/llms.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(body(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
})
