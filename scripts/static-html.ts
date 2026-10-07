// Post-build: ship prerendered pages as plain HTML.
//
// Every page is fully rendered at build time, and the only client-side
// behaviour is the theme toggle and the mobile menu. So instead of loading
// and hydrating the React/TanStack runtime (~130 KB gzipped, mostly unused
// on any given page), strip the framework scripts and inline a ~1 KB
// runtime (scripts/static-runtime.js). Links become normal page loads.
//
// Kept: the theme script (prevents a flash of the wrong theme) and JSON-LD.
import { readFile, readdir, writeFile } from "node:fs/promises"
import { join } from "node:path"

const OUT = "dist/client"
// Drop comment lines and indentation but keep line breaks: the source has no
// semicolons, so joining lines would change its meaning.
const runtime = (await readFile("scripts/static-runtime.js", "utf8"))
  .split("\n")
  .map((line) => line.trim())
  .filter((line) => line && !line.startsWith("//"))
  .join("\n")

async function htmlFiles(dir: string): Promise<string[]> {
  const entries = await readdir(dir, { withFileTypes: true })
  const nested = await Promise.all(
    entries.map((e) => {
      const path = join(dir, e.name)
      if (e.isDirectory()) return htmlFiles(path)
      return e.name.endsWith(".html") ? [path] : []
    })
  )
  return nested.flat()
}

const keep = /data-theme-script|type="application\/ld\+json"/

let count = 0
for (const file of await htmlFiles(OUT)) {
  const html = await readFile(file, "utf8")
  const out = html
    .replace(/<script\b([^>]*)>[\s\S]*?<\/script>/g, (tag, attrs: string) =>
      keep.test(attrs) ? tag : ""
    )
    .replace(/<link rel="modulepreload"[^>]*>/g, "")
    .replace("</body>", `<script>${runtime}</script></body>`)
  if (/<script[^>]*type="module"/.test(out)) {
    throw new Error(`Module script left in ${file}`)
  }
  await writeFile(file, out)
  count++
}
console.log(`[static-html] ${count} pages shipped as static HTML`)
