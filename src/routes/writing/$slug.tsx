import { Link, createFileRoute, notFound } from "@tanstack/react-router"
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "@/components/site/icon"
import { Container, Eyebrow } from "@/components/site/primitives"
import { PostList, formatDate } from "@/components/site/posts"
import { allProjects } from "@/data/projects"
import { companies } from "@/data/experience"
import { getPost, publishedPosts, type Block } from "@/data/writing"
import { seo } from "@/lib/seo"
import { articleNode, breadcrumbs, webPage } from "@/lib/schema"
import { site } from "@/data/site"

export const Route = createFileRoute("/writing/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug)
    if (!post) throw notFound()
    return post
  },
  head: ({ loaderData: post }) =>
    post
      ? seo({
          title: post.title,
          description: post.description,
          path: `/writing/${post.slug}`,
          type: "article",
          article: {
            published: post.datePublished!,
            modified: post.dateModified,
            section: post.category,
          },
          schema: [
            articleNode(post),
            webPage(`/writing/${post.slug}`, post.title, "WebPage", {
              mainEntity: { "@id": `${site.url}/writing/${post.slug}#article` },
            }),
            breadcrumbs([
              { name: "Writing", path: "/writing" },
              { name: post.title, path: `/writing/${post.slug}` },
            ]),
          ],
        })
      : {},
  component: ArticlePage,
})

const linkClass =
  "text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand"

function ArticlePage() {
  const post = Route.useLoaderData()
  const related = publishedPosts.filter(
    (p) =>
      p.slug !== post.slug &&
      (post.related?.includes(p.slug) || p.category === post.category)
  )
  const projects = allProjects.filter((p) => post.projects?.includes(p.slug))
  const orgs = (post.companies ?? [])
    .map((slug) => companies[slug as keyof typeof companies])
    .filter(Boolean)

  return (
    <article>
      <Container className="pt-10 sm:pt-14">
        <Link
          to="/writing"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors duration-200 hover:text-foreground"
        >
          <Icon icon={ArrowLeft01Icon} size={15} />
          Writing
        </Link>
      </Container>

      <Container className="max-w-3xl pt-10 pb-10 sm:pt-14">
        <Eyebrow>
          {post.category} ·{" "}
          <time dateTime={post.datePublished}>
            {formatDate(post.datePublished!)}
          </time>
        </Eyebrow>
        <h1 className="mt-5 text-3xl font-semibold tracking-[-0.035em] text-balance sm:text-5xl">
          {post.title}
        </h1>
        {post.description && (
          <p className="mt-5 text-[17px] leading-8 text-pretty text-muted-foreground">
            {post.description}
          </p>
        )}
        <p className="mt-6 text-sm text-muted-foreground">
          By{" "}
          <Link to="/about" rel="author" className={linkClass}>
            {site.name}
          </Link>
          {post.dateModified && post.dateModified !== post.datePublished && (
            <>
              {" "}
              · Updated{" "}
              <time dateTime={post.dateModified}>
                {formatDate(post.dateModified)}
              </time>
            </>
          )}
        </p>
      </Container>

      <Container className="max-w-3xl pb-16">
        <div className="flex flex-col gap-5 border-t pt-10 text-[17px] leading-8 text-foreground/90">
          {post.body!.map((block, i) => (
            <BlockView key={i} block={block} />
          ))}
        </div>

        {(projects.length > 0 || orgs.length > 0) && (
          <aside
            aria-label="Mentioned in this post"
            className="mt-14 border-t pt-8 text-[15px] text-muted-foreground"
          >
            <p>
              Related:{" "}
              {[
                ...projects.map((p) => (
                  <Link
                    key={p.slug}
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className={linkClass}
                  >
                    {p.name}
                  </Link>
                )),
                ...orgs.map((c) => (
                  <Link
                    key={c.slug}
                    to="/experience/$company"
                    params={{ company: c.slug }}
                    className={linkClass}
                  >
                    My work at {c.name}
                  </Link>
                )),
              ].flatMap((el, i) => (i ? [", ", el] : [el]))}
            </p>
          </aside>
        )}
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-heading" className="border-t">
          <Container className="max-w-3xl py-14">
            <h2
              id="related-heading"
              className="mb-4 font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase"
            >
              Related writing
            </h2>
            <PostList posts={related.slice(0, 3)} />
          </Container>
        </section>
      )}
    </article>
  )
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p className="text-pretty">{block.text}</p>
    case "h2":
      return (
        <h2 className="mt-6 text-2xl font-semibold tracking-[-0.025em]">
          {block.text}
        </h2>
      )
    case "h3":
      return (
        <h3 className="mt-4 text-lg font-semibold tracking-[-0.015em]">
          {block.text}
        </h3>
      )
    case "ul":
      return (
        <ul className="ml-5 list-disc space-y-2 marker:text-subtle-foreground">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )
    case "code":
      return (
        <pre className="overflow-x-auto rounded-lg border bg-muted/60 p-4 text-sm leading-6">
          <code>{block.code}</code>
        </pre>
      )
    case "quote":
      return (
        <blockquote className="border-l-2 border-brand pl-5 text-foreground/80">
          {block.text}
        </blockquote>
      )
  }
}
