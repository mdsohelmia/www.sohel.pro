import { Link } from "@tanstack/react-router"
import { Container } from "./primitives"

export function NotFound() {
  return (
    <Container className="py-24 sm:py-32">
      <p className="font-mono text-[11px] tracking-[0.14em] text-subtle-foreground uppercase">
        404
      </p>
      <h1 className="mt-4 text-3xl font-semibold tracking-[-0.03em]">
        This page doesn't exist.
      </h1>
      <p className="mt-3 text-muted-foreground">
        It may have moved, or the link may be wrong.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
        <Link to="/" className="hover:text-brand">
          Back to home
        </Link>
        <Link to="/products" className="text-muted-foreground hover:text-brand">
          Products
        </Link>
        <Link
          to="/experience"
          className="text-muted-foreground hover:text-brand"
        >
          Experience
        </Link>
      </div>
    </Container>
  )
}
