import { defineConfig } from "vite"
import { tanstackStart } from "@tanstack/react-start/plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // The prerenderer fetches pages from the preview server. Binding to IPv4
  // avoids intermittent `::1` connection timeouts that silently drop pages.
  preview: { host: "127.0.0.1" },
  plugins: [
    tailwindcss(),
    tanstackStart({
      prerender: {
        enabled: true,
        crawlLinks: true,
        failOnError: true,
        retryCount: 3,
        // Index routes are discovered as both `/products` and `/products/`;
        // keep only the canonical form.
        filter: ({ path }) => path === "/" || !path.endsWith("/"),
      },
      // Index routes are also discovered with a trailing slash; keep them out
      // of the sitemap so only canonical URLs are listed.
      pages: [
        ...["/projects/", "/experience/", "/writing/"].map((path) => ({
          path,
          sitemap: { exclude: true },
        })),
        // Plain-Markdown site summary for AI assistants (see llms[.]txt.ts).
        { path: "/llms.txt", sitemap: { exclude: true } },
        // Cloudflare redirect rules (see [_]redirects.ts).
        { path: "/_redirects", sitemap: { exclude: true } },
        // Static hosts (Cloudflare Pages, Netlify, Vercel) serve /404.html for
        // unknown URLs.
        {
          path: "/404",
          prerender: {
            enabled: true,
            outputPath: "/404.html",
          },
          sitemap: { exclude: true },
        },
      ],
      sitemap: {
        enabled: true,
        host: "https://www.sohel.pro",
      },
    }),
    viteReact(),
  ],
})

export default config
