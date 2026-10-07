import { HeadContent, Scripts, createRootRoute } from "@tanstack/react-router"
import { SiteHeader } from "@/components/site/header"
import { SiteFooter } from "@/components/site/footer"
import { NotFound } from "@/components/site/not-found"
import { themeScript } from "@/components/site/theme-toggle"
import { site } from "@/data/site"

import appCss from "../styles.css?url"
import interLatin from "@fontsource-variable/inter/files/inter-latin-wght-normal.woff2?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "color-scheme", content: "light dark" },
      { name: "author", content: site.name },
      { title: `${site.name} — ${site.seoTitle}` },
      { name: "description", content: site.description },
    ],
    links: [
      {
        rel: "preload",
        href: interLatin,
        as: "font",
        type: "font/woff2",
        crossOrigin: "anonymous",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.ico", sizes: "32x32" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "manifest", href: "/manifest.json" },
      { rel: "me", href: site.social.github.url },
      { rel: "me", href: site.social.x.url },
      { rel: "me", href: `mailto:${site.email}` },
      {
        rel: "alternate",
        type: "text/markdown",
        href: "/llms.txt",
        title: "Site summary for AI assistants",
      },
    ],
  }),
  notFoundComponent: NotFound,
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    // The theme script sets a class on <html> before hydration.
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          data-theme-script
          dangerouslySetInnerHTML={{ __html: themeScript }}
        />
        {/* Rendered here rather than in head(): the head manager keeps one
            meta per name, which would drop one of the two variants. Colours
            match --background in each theme. */}
        <meta
          name="theme-color"
          content="#fafaf7"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#141412"
          media="(prefers-color-scheme: dark)"
        />
        <HeadContent />
      </head>
      <body>
        <a
          href="#main"
          className="fixed top-3 left-3 z-50 -translate-y-16 rounded-md bg-foreground px-3 py-2 text-sm text-background transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>
        <div className="flex min-h-svh flex-col">
          <SiteHeader />
          <main id="main" className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
        <Scripts />
      </body>
    </html>
  )
}
