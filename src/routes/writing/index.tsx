import { Link, createFileRoute } from "@tanstack/react-router"
import { PostList } from "@/components/site/posts"
import {
  Container,
  Eyebrow,
  PageHeader,
  Tag,
} from "@/components/site/primitives"
import { isPublished, posts, publishedPosts, writing } from "@/data/writing"
import { seo } from "@/lib/seo"
import { breadcrumbs, webPage } from "@/lib/schema"

export const Route = createFileRoute("/writing/")({
  head: () =>
    seo({
      title: "Writing",
      description: `Writing by Sohel, founder and software engineer: ${writing.intro.replace(/^Notes/, "notes")}`,
      path: "/writing",
      schema: [
        webPage("/writing", "Writing"),
        breadcrumbs([{ name: "Writing", path: "/writing" }]),
      ],
    }),
  component: WritingPage,
})

function WritingPage() {
  const upcoming = posts.filter((p) => !isPublished(p))
  return (
    <>
      <PageHeader eyebrow={<Eyebrow>Writing</Eyebrow>} title="Writing">
        <p>{writing.intro}</p>
        <p className="mt-3 text-[15px] leading-7">
          I write from first-hand work: building{" "}
          <Link
            to="/experience/$company"
            params={{ company: "tenbyte" }}
            className="text-foreground underline decoration-border-strong underline-offset-4 hover:text-brand hover:decoration-brand"
          >
            Tenbyte’s cloud, CDN and video infrastructure
          </Link>{" "}
          and{" "}
          <Link
            to="/projects"
            className="text-foreground underline decoration-border-strong underline-offset-4 hover:text-brand hover:decoration-brand"
          >
            my own products
          </Link>
          .
        </p>
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
          <section
            aria-labelledby="published-heading"
            className="mt-14 max-w-3xl"
          >
            <h2
              id="published-heading"
              className="mb-4 font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              Published
            </h2>
            <PostList posts={publishedPosts} />
          </section>
        )}

        {upcoming.length > 0 && (
          <section
            aria-labelledby="upcoming-heading"
            className="mt-14 max-w-3xl"
          >
            <h2
              id="upcoming-heading"
              className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              In progress
            </h2>
            {publishedPosts.length === 0 && (
              <p className="mt-2 text-sm text-muted-foreground">
                Nothing published yet. These are the pieces I'm working on.
              </p>
            )}
            <div className="mt-6">
              <PostList posts={upcoming} />
            </div>
          </section>
        )}
      </Container>
    </>
  )
}
