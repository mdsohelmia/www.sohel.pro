import { createFileRoute } from "@tanstack/react-router"
import { NotFound } from "@/components/site/not-found"

// Prerendered to /404.html so static hosts serve the site's own 404 page for
// unknown URLs. No route-specific head: on an unknown URL the client renders
// the root not-found view, and the markup must match for hydration. Hosts
// send a 404 status, which keeps the page out of search results.
export const Route = createFileRoute("/404")({
  component: NotFound,
})
