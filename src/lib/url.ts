import { site } from "@/data/site"

export function canonicalUrl(path: string) {
  // The homepage canonical is the origin with a trailing slash; every other
  // page is slash-free (see html_handling in wrangler.jsonc).
  return path === "/" ? `${site.url}/` : `${site.url}${path}`
}
