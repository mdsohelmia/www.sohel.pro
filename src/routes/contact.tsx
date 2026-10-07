import { Link, createFileRoute } from "@tanstack/react-router"
import { ContactLinks } from "@/components/site/contact"
import { Container, Eyebrow, PageHeader } from "@/components/site/primitives"
import { site } from "@/data/site"
import { seo } from "@/lib/seo"
import { breadcrumbs, ids, personNode, webPage } from "@/lib/schema"

export const Route = createFileRoute("/contact")({
  head: () =>
    seo({
      title: "Contact",
      description: `Contact Sohel, founder and software engineer and Co-founder & CTO of Tenbyte. Email ${site.email}, or find him on X and GitHub.`,
      path: "/contact",
      schema: [
        personNode,
        webPage("/contact", "Contact Sohel", "ContactPage", {
          mainEntity: { "@id": ids.person },
        }),
        breadcrumbs([{ name: "Contact", path: "/contact" }]),
      ],
    }),
  component: ContactPage,
})

const linkClass =
  "text-foreground underline decoration-border-strong underline-offset-4 transition-colors duration-200 hover:text-brand hover:decoration-brand"

function ContactPage() {
  return (
    <>
      <PageHeader eyebrow={<Eyebrow>Contact</Eyebrow>} title="Contact">
        <p>The best way to reach me is email. I'm also on X and GitHub.</p>
      </PageHeader>
      <Container className="pb-24">
        <ContactLinks />
        <p className="mt-12 max-w-2xl text-[15px] leading-7 text-muted-foreground">
          Before you write, you might want to see{" "}
          <Link to="/experience" className={linkClass}>
            my experience
          </Link>
          , including{" "}
          <Link
            to="/experience/$company"
            params={{ company: "tenbyte" }}
            className={linkClass}
          >
            my work as Co-founder & CTO of Tenbyte
          </Link>
          , or{" "}
          <Link to="/projects" className={linkClass}>
            the projects I'm building
          </Link>
          .
        </p>
      </Container>
    </>
  )
}
