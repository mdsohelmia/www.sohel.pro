import { createFileRoute } from "@tanstack/react-router"
import {
  Container,
  Eyebrow,
  PageHeader,
  Tag,
} from "@/components/site/primitives"
import { posts, publishedPosts, writing } from "@/data/writing"
import { seo } from "@/lib/seo"
import { breadcrumbs, webPage } from "@/lib/schema"

export const Route = createFileRoute("/writing")({
  head: () =>
    seo({
      title: "Writing",
      description: `Sohel's writing. ${writing.intro}`,
      path: "/writing",
      schema: [
        webPage("/writing", "Writing"),
        breadcrumbs([{ name: "Writing", path: "/writing" }]),
      ],
    }),
  component: WritingPage,
})

function WritingPage() {
  const upcoming = posts.filter((p) => !p.url)
  return (
    <>
      <PageHeader eyebrow={<Eyebrow>Writing</Eyebrow>} title="Writing">
        <p>{writing.intro}</p>
      </PageHeader>
      <Container className="pb-24">
        <ul className="flex flex-wrap gap-2" aria-label="Categories">
          {writing.categories.map((c) => (
            <li key={c}>
              <Tag>{c}</Tag>
            </li>
          ))}
        </ul>

        {publishedPosts.length > 0 && (
          <section aria-labelledby="published-heading" className="mt-14">
            <h2
              id="published-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              Published
            </h2>
            <ul className="mt-4 border-t">
              {publishedPosts.map((post) => (
                <li key={post.title} className="border-b">
                  <a
                    href={post.url}
                    className="flex flex-col gap-1 py-4 transition-colors duration-200 hover:text-brand sm:flex-row sm:items-baseline sm:justify-between"
                  >
                    <span className="text-[15px] font-medium">
                      {post.title}
                    </span>
                    <span className="font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase">
                      {post.category}
                      {post.date && ` · ${post.date}`}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}

        {upcoming.length > 0 && (
          <section aria-labelledby="upcoming-heading" className="mt-14">
            <h2
              id="upcoming-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              In progress
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Nothing published yet. These are the pieces I'm working on.
            </p>
            <ul className="mt-6 max-w-3xl border-t">
              {upcoming.map((post) => (
                <li
                  key={post.title}
                  className="flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
                >
                  <span className="text-[15px] font-medium text-foreground/85">
                    {post.title}
                  </span>
                  <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase">
                    {post.category}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </Container>
    </>
  )
}
