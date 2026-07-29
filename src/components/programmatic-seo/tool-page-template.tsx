import Link from "next/link";
import { ChevronDown, ChevronRight, Search } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { ViewerSearch } from "@/components/viewer-search";
import { publicEnv } from "@/config/env";
import { buildToolPageStructuredData } from "@/services/content/tool-page-seo";
import type { ToolPageData } from "@/types/tool-page";

export async function ProgrammaticToolPageTemplate({ page }: { page: ToolPageData }) {
  const structuredData = buildToolPageStructuredData(page, publicEnv.siteUrl);

  return (
    <main className="min-h-screen overflow-hidden bg-sand">
      <SiteHeader />

      <section className="relative border-b border-ink/10 bg-cream">
        <div className="dot-field pointer-events-none absolute inset-x-0 top-0 h-48 opacity-30" />
        <div className="container relative py-12 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-ink/50"
          >
            <Link href="/">Home</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-ink/75">
              {page.breadcrumb}
            </span>
          </nav>

          <div className="mt-10 max-w-4xl">
            <Badge className="gap-2 bg-white">
              <Search className="size-3.5 text-pine" aria-hidden="true" />
              {page.badge}
            </Badge>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.25rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/60 sm:text-lg">
              {page.intro}
            </p>
          </div>

          <div className="mt-8 max-w-3xl">
            <ViewerSearch
              action="/viewer"
              buttonLabel={page.breadcrumb}
              helperText="Supports a compatible public TikTok username or URL."
              mode={page.toolType}
            />
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream py-16 sm:py-20">
        <div className="container">
          <div className="grid gap-4 md:grid-cols-3">
            {page.useCases.map((item) => (
              <article
                key={item.title}
                className="rounded-[22px] border border-ink/10 bg-white p-6"
              >
                <h2 className="font-display text-xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/55">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {page.examples.map((item) => (
              <article
                key={item.title}
                className="rounded-[22px] border border-ink/10 bg-white p-6"
              >
                <h2 className="font-display text-xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/55">{item.description}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {page.tips.map((item) => (
              <article
                key={item.title}
                className="rounded-[22px] border border-ink/10 bg-white p-6"
              >
                <h2 className="font-display text-xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/55">{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              {page.faqEyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              {page.faqTitle}
            </h2>
            <p className="mt-4 max-w-sm text-sm leading-6 text-ink/55">
              {page.faqDescription}
            </p>
          </div>
          <div className="border-t border-ink/15">
            {page.faq.map((faq) => (
              <details key={faq.question} className="group border-b border-ink/15">
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-base font-extrabold [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDown className="size-4 transition group-open:rotate-180" />
                </summary>
                <p className="max-w-2xl pb-6 pr-10 text-sm leading-6 text-ink/60">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </div>

        <nav aria-label="Related tools" className="mt-12 flex flex-wrap gap-4">
          {page.relatedTools.map((related) => (
            <Link
              key={related.href}
              href={related.href}
              className="text-sm font-bold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4"
            >
              {related.label}
            </Link>
          ))}
        </nav>
      </section>

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
