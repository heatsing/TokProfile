import type { Metadata } from "next";
import Link from "next/link";
import { Calculator, ChevronDown, ChevronRight, Info } from "lucide-react";

import { EngagementCalculator } from "@/components/analytics/engagement-calculator";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { publicEnv } from "@/config/env";
import {
  buildToolPageMetadata,
  buildToolPageStructuredData,
} from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";

export async function generateMetadata(): Promise<Metadata> {
  return buildToolPageMetadata(
    await requireToolPage("tiktok-engagement-rate-calculator"),
  );
}

export default async function TikTokEngagementRateCalculatorPage() {
  const page = await requireToolPage("tiktok-engagement-rate-calculator");
  const ui = page.ui as {
    cards: {
      description: string;
      eyebrow: string;
      formula: string;
      theme: "dark" | "light";
      title: string;
    }[];
    educationLinks: { href: string; label: string }[];
  };
  const [followerCard, viewCard] = ui.cards;
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
              <Calculator className="size-3.5 text-pine" aria-hidden="true" />
              {page.badge}
            </Badge>
            <h1 className="mt-6 font-display text-[clamp(2.65rem,7vw,5.15rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/60 sm:text-lg">
              {page.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="container py-10 sm:py-14">
        <EngagementCalculator />
      </section>

      <section className="border-y border-ink/10 bg-cream py-16 sm:py-20">
        <div className="container grid gap-5 lg:grid-cols-2">
          <article className="rounded-[24px] border border-ink/10 bg-white p-6 sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              {followerCard.eyebrow}
            </p>
            <h2 className="mt-3 font-display text-2xl font-extrabold">
              {followerCard.title}
            </h2>
            <p className="mt-5 rounded-2xl bg-cream p-4 font-mono text-sm leading-6">
              {followerCard.formula}
            </p>
            <p className="mt-4 text-sm leading-6 text-ink/55">
              {followerCard.description}
            </p>
            <Link
              href={ui.educationLinks[0].href}
              className="mt-5 inline-flex text-sm font-bold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4"
            >
              {ui.educationLinks[0].label}
            </Link>
            <Link
              href={ui.educationLinks[1].href}
              className="mt-3 block text-sm font-bold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4"
            >
              {ui.educationLinks[1].label}
            </Link>
            <Link
              href={ui.educationLinks[2].href}
              className="mt-3 block text-sm font-bold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4"
            >
              {ui.educationLinks[2].label}
            </Link>
            <Link
              href={ui.educationLinks[3].href}
              className="mt-3 block text-sm font-bold text-emerald-800 underline decoration-emerald-800/30 underline-offset-4"
            >
              {ui.educationLinks[3].label}
            </Link>
          </article>
          <article className="rounded-[24px] border border-ink/10 bg-ink p-6 text-white sm:p-8">
            <div className="flex items-center gap-2 text-acid">
              <Info className="size-5" aria-hidden="true" />
              <p className="text-xs font-bold uppercase tracking-[0.16em]">
                {viewCard.eyebrow}
              </p>
            </div>
            <h2 className="mt-3 font-display text-2xl font-extrabold">
              {viewCard.title}
            </h2>
            <p className="mt-5 rounded-2xl bg-white/10 p-4 font-mono text-sm leading-6">
              {viewCard.formula}
            </p>
            <p className="mt-4 text-sm leading-6 text-white/60">{viewCard.description}</p>
          </article>
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
