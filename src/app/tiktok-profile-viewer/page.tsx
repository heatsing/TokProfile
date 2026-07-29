import type { Metadata } from "next";
import Link from "next/link";
import {
  Check,
  ChevronDown,
  ChevronRight,
  Eye,
  Link2,
  Search,
  ShieldCheck,
} from "lucide-react";

import { ProfileViewerResult } from "@/components/profile-viewer/profile-result";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { ViewerSearch } from "@/components/viewer-search";
import { publicEnv } from "@/config/env";
import { createProfileViewerState, resolveProfileViewTab } from "@/lib/profile-viewer";
import {
  buildToolPageMetadata,
  buildToolPageStructuredData,
} from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";
import { tiktokToolEngine } from "@/services/tiktok";

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}): Promise<Metadata> {
  const { q } = await searchParams;
  const hasQuery = Boolean(q?.trim());
  const page = await requireToolPage("tiktok-profile-viewer");
  return buildToolPageMetadata(page, { noindex: hasQuery });
}

const workflowIcons = { eye: Eye, link: Link2, search: Search } as const;

export default async function TikTokProfileViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; tab?: string }>;
}) {
  const { q = "", tab } = await searchParams;
  const page = await requireToolPage("tiktok-profile-viewer");
  const ui = page.ui as {
    educationLinks: { href: string; label: string }[];
    searchButtonLabel: string;
    searchHelperText: string;
    trustItems: string[];
    workflow: {
      description: string;
      icon: keyof typeof workflowIcons;
      title: string;
    }[];
    workflowDescription: string;
    workflowEyebrow: string;
    workflowTitle: string;
  };
  const structuredData = buildToolPageStructuredData(page, publicEnv.siteUrl);
  const input = q.trim();
  const result = input
    ? await tiktokToolEngine.run({ input, tool: "profile" })
    : undefined;
  const viewerState = createProfileViewerState(result);
  const activeTab = resolveProfileViewTab(tab);

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
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-ink/75">
              {page.breadcrumb}
            </span>
          </nav>

          <div className="mt-10 max-w-4xl">
            <Badge className="gap-2 bg-white">
              <Eye className="size-3.5 text-pine" aria-hidden="true" />
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
              action="/tiktok-profile-viewer"
              buttonLabel={ui.searchButtonLabel}
              defaultValue={input}
              helperText={ui.searchHelperText}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-ink/50">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-700" />
              {ui.trustItems[0]}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-700" />
              {ui.trustItems[1]}
            </span>
          </div>
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
        </div>
      </section>

      <section aria-label="Profile viewer result" className="container py-10 sm:py-14">
        <ProfileViewerResult activeTab={activeTab} input={input} state={viewerState} />
      </section>

      <section className="border-y border-ink/10 bg-cream py-16 sm:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              {ui.workflowEyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              {ui.workflowTitle}
            </h2>
            <p className="mt-4 text-sm leading-6 text-ink/55">{ui.workflowDescription}</p>
          </div>
          <ol className="mt-10 grid gap-4 md:grid-cols-3">
            {ui.workflow.map((step, index) => {
              const StepIcon = workflowIcons[step.icon];
              return (
                <li
                  key={step.title}
                  className="rounded-[22px] border border-ink/10 bg-white p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-acid">
                      <StepIcon className="size-5" aria-hidden="true" />
                    </span>
                    <span className="font-mono text-xs text-ink/30">0{index + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-xl font-extrabold">
                    {step.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-ink/55">{step.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
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
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-base font-extrabold marker:hidden [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white transition-transform group-open:rotate-180">
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </span>
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
