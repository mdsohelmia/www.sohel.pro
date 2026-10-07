import { site } from "@/data/site"

export function canonicalUrl(path: string) {
  return path === "/" ? site.url : `${site.url}${path}`
}
