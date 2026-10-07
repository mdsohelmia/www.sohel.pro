import { createFileRoute } from "@tanstack/react-router"
import { allProjects } from "@/data/projects"
import { companies } from "@/data/experience"
import { hostedPosts } from "@/data/writing"

// /_redirects for Cloudflare Workers static assets, prerendered from the same
// data as the pages. Rules run before html_handling, so these permanent
// (301) redirects replace its temporary 307 for trailing slashes.

const pages = [
  "/about",
  "/contact",
  "/experience",
  "/now",
  "/projects",
  "/writing",
  ...Object.keys(companies).map((slug) => `/experience/${slug}`),
  ...allProjects.map((p) => `/projects/${p.slug}`),
  ...hostedPosts.map((p) => `/writing/${p.slug}`),
]

function body() {
  return [
    "# Generated at build time from src/data. Do not edit dist output.",
    "",
    "# Common sitemap URLs crawlers and people try; without these they get the",
    "# HTML 404 page, which Search Console reports as 'Sitemap is HTML'.",
    "/sitemap /sitemap.xml 301",
    "/sitemap/ /sitemap.xml 301",
    "/sitemap.xml/ /sitemap.xml 301",
    "/sitemap_index.xml /sitemap.xml 301",
    "/sitemap-index.xml /sitemap.xml 301",
    "",
    "# /products was renamed to /projects.",
    "/products /projects 301",
    "/products/ /projects 301",
    ...allProjects.map((p) => `/products/${p.slug}/ /projects/${p.slug} 301`),
    "/products/* /projects/:splat 301",
    "",
    "# Canonical URLs have no trailing slash.",
    ...pages.map((path) => `${path}/ ${path} 301`),
    "",
  ].join("\n")
}

export const Route = createFileRoute("/_redirects")({
  server: {
    handlers: {
      GET: () =>
        new Response(body(), {
          headers: { "Content-Type": "text/plain; charset=utf-8" },
        }),
    },
  },
})
