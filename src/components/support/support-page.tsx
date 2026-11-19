import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check, ChevronDown, ChevronRight, Mail } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { publicEnv } from "@/config/env";
import type { SupportPageData } from "@/data/support-pages";

export function buildSupportPageMetadata(page: SupportPageData): Metadata {
  return {
    title: { absolute: page.title },
    description: page.description,
    alternates: { canonical: page.route },
    robots: page.index ? undefined : { follow: true, index: false },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: page.route,
      siteName: "TokProfile",
      title: page.title,
      description: page.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${page.h1} — TokProfile`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}

export function SupportPage({ page }: { page: SupportPageData }) {
  const pageUrl = `${publicEnv.siteUrl}${page.route}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: page.h1,
      description: page.description,
      url: pageUrl,
      dateModified: page.updatedAt,
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: publicEnv.siteUrl },
        { "@type": "ListItem", position: 2, name: page.h1, item: pageUrl },
      ],
    },
    ...(page.faq?.length
      ? [
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: page.faq.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: { "@type": "Answer", text: item.answer },
            })),
          },
        ]
      : []),
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-[#172a2d]">
      <SiteHeader />

      <header className="border-b border-[#e2ece9] bg-[#eef8f6]">
        <div className="container max-w-[960px] py-10 sm:py-14">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-[#637673]"
          >
            <Link href="/" className="hover:text-[#087568]">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page">{page.h1}</span>
          </nav>
          <p className="mt-7 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#087568]">
            {page.kicker}
          </p>
          <h1 className="mt-3 max-w-3xl font-display text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-tight tracking-[-0.05em]">
            {page.h1}
          </h1>
          <p className="mt-4 max-w-3xl text-sm leading-6 text-[#536765]">{page.intro}</p>
          <p className="mt-5 text-xs text-[#6a7b78]">Updated {page.updatedAt}</p>
        </div>
      </header>

      <div className="container max-w-[960px] py-10 sm:py-14">
        <div className="grid gap-5">
          {page.sections.map((section) => (
            <section
              key={section.title}
              className="rounded-xl border border-[#dbe3e1] bg-white p-5 sm:p-7"
            >
              <h2 className="font-display text-xl font-extrabold tracking-[-0.035em] sm:text-2xl">
                {section.title}
              </h2>
              <div className="mt-4 space-y-3 text-[13px] leading-6 text-[#596c69] sm:text-sm">
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
              {section.bullets?.length ? (
                <ul className="mt-5 grid gap-3">
                  {section.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex gap-3 rounded-lg bg-[#f1f8f6] p-3 text-[13px] leading-5 text-[#4f6360]"
                    >
                      <Check
                        className="mt-0.5 size-4 shrink-0 text-[#087568]"
                        aria-hidden="true"
                      />
                      {bullet}
                    </li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>

        {page.contactUrl && page.contactLabel ? (
          <aside className="mt-6 flex flex-col gap-4 rounded-xl bg-[#172a2d] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div>
              <p className="text-sm font-extrabold">Need to contact TokProfile?</p>
              <p className="mt-1 text-xs leading-5 text-white/65">
                Send only the information needed to understand your request.
              </p>
            </div>
            <a
              href={page.contactUrl}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#087568] px-5 text-xs font-extrabold text-white hover:bg-[#09665c]"
            >
              <Mail className="size-4" aria-hidden="true" />
              {page.contactLabel}
            </a>
          </aside>
        ) : null}

        {page.faq?.length ? (
          <section className="mt-12" aria-labelledby="support-faq-title">
            <h2
              id="support-faq-title"
              className="font-display text-xl font-extrabold tracking-[-0.035em] sm:text-2xl"
            >
              Frequently Asked Questions
            </h2>
            <div className="mt-5 border-t border-[#dbe3e1]">
              {page.faq.map((item) => (
                <details key={item.question} className="group border-b border-[#dbe3e1]">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-[13px] font-extrabold [&::-webkit-details-marker]:hidden">
                    {item.question}
                    <ChevronDown
                      className="size-4 shrink-0 transition-transform group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="max-w-3xl pb-5 pr-8 text-[13px] leading-6 text-[#596c69]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 text-xs font-extrabold text-[#087568] hover:underline"
        >
          Return to TokProfile
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>

      <SiteFooter />
      {structuredData.map((entry) => (
        <script
          key={entry["@type"]}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(entry).replace(/</g, "\\u003c"),
          }}
        />
      ))}
    </main>
  );
}
