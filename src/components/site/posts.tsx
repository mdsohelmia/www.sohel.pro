import { Link } from "@tanstack/react-router"
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons"
import { Icon } from "./icon"
import { isPublished, type Post } from "@/data/writing"

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

// Formats an ISO date deterministically (no locale/timezone), so server and
// client render identical markup.
export function formatDate(iso: string) {
  const [y, m, d] = iso.split("-").map(Number)
  return `${MONTHS[m - 1]} ${d}, ${y}`
}

export function PostList({ posts }: { posts: Post[] }) {
  return (
    <ul className="border-t">
      {posts.map((post) => (
        <PostRow key={post.slug} post={post} />
      ))}
    </ul>
  )
}

function PostRow({ post }: { post: Post }) {
  const published = isPublished(post)
  const meta = (
    <span className="shrink-0 font-mono text-[11px] tracking-[0.08em] text-subtle-foreground uppercase">
      {post.category} ·{" "}
      {published && post.datePublished ? (
        <time dateTime={post.datePublished}>
          {formatDate(post.datePublished)}
        </time>
      ) : (
        "In progress"
      )}
    </span>
  )
  const rowClass =
    "flex flex-col gap-1 border-b py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"

  if (!published) {
    return (
      <li className={rowClass}>
        <span className="text-[15px] font-medium text-foreground/85">
          {post.title}
        </span>
        {meta}
      </li>
    )
  }

  const title = (
    <span className="text-[15px] font-medium transition-colors duration-200 group-hover:text-brand">
      {post.title}
    </span>
  )
  return (
    <li className="border-b">
      {post.externalUrl ? (
        <a
          href={post.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`group ${rowClass} border-b-0`}
        >
          <span className="inline-flex items-center gap-1">
            {title}
            <Icon
              icon={ArrowUpRight01Icon}
              size={14}
              className="text-subtle-foreground"
            />
            <span className="sr-only"> (opens in a new tab)</span>
          </span>
          {meta}
        </a>
      ) : (
        <Link
          to="/writing/$slug"
          params={{ slug: post.slug }}
          className={`group ${rowClass} border-b-0`}
        >
          {title}
          {meta}
        </Link>
      )}
    </li>
  )
}
