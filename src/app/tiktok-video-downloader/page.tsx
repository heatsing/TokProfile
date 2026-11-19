import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

import { DownloaderWorkspace } from "@/components/downloader/downloader-workspace";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { publicEnv } from "@/config/env";
import {
  buildToolPageMetadata,
  buildToolPageStructuredData,
} from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";
import type { ToolPageContentItem } from "@/types/tool-page";

interface HowToStep extends ToolPageContentItem {
  cues: string[];
}

interface DownloaderUi {
  downloadLocations: ToolPageContentItem[];
  helpItems: ToolPageContentItem[];
  howToSteps: HowToStep[];
  relatedToolDescriptions: Record<string, string>;
  safetyDescription: string;
}

export async function generateMetadata(): Promise<Metadata> {
  return buildToolPageMetadata(await requireToolPage("tiktok-video-downloader"));
}

export default async function TikTokVideoDownloaderPage() {
  const page = await requireToolPage("tiktok-video-downloader");
  const ui = page.ui as unknown as DownloaderUi;
  const structuredData = buildToolPageStructuredData(page, publicEnv.siteUrl);

  return (
    <main className="min-h-screen overflow-hidden bg-white text-[#172a2d]">
      <SiteHeader variant="utility" />

      <section className="border-b border-[#e2ece9] bg-[#eef8f6]">
        <div className="container flex flex-col items-center py-14 text-center sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-[#637673]"
          >
            <Link href="/" className="transition-colors hover:text-[#087568]">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page">{page.breadcrumb}</span>
          </nav>

          <h1 className="mt-7 font-display text-[clamp(2.25rem,5vw,3.25rem)] font-extrabold leading-tight tracking-[-0.045em]">
            {page.h1}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#5c6c6a] sm:text-base">
            {page.intro}
          </p>

          <div className="mt-7 w-full max-w-[760px] text-left">
            <DownloaderWorkspace />
          </div>
        </div>
      </section>

      <div className="container max-w-[1120px] py-12 sm:py-16">
        <section aria-labelledby="how-to-download-title">
          <h2
            id="how-to-download-title"
            className="font-display text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl"
          >
            How to Download a TikTok Video
          </h2>
          <ol className="mt-6 grid gap-4 lg:grid-cols-3">
            {ui.howToSteps.map((step) => (
              <li
                key={step.title}
                className="rounded-xl border border-[#dbe3e1] bg-white p-4 sm:p-5"
              >
                <div className="flex min-h-20 items-center justify-center gap-2 rounded-lg bg-[#eef7f5] px-3">
                  {step.cues.map((cue, index) => (
                    <span key={cue} className="contents">
                      {index > 0 ? (
                        <ArrowRight
                          className="size-3.5 text-[#087568]"
                          aria-hidden="true"
                        />
                      ) : null}
                      <span className="rounded-md border border-[#d4e0dd] bg-white px-3 py-2 text-xs font-extrabold text-[#087568]">
                        {cue}
                      </span>
                    </span>
                  ))}
                </div>
                <h3 className="mt-4 text-base font-extrabold">{step.title}</h3>
                <p className="mt-1 text-sm leading-6 text-[#63716f]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <div className="my-12 border-t border-[#dde5e3] sm:my-14" />

        <section
          id="download-help"
          className="grid scroll-mt-24 gap-10 lg:grid-cols-2 lg:gap-16"
        >
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
              Where to Find Your Download
            </h2>
            <div className="mt-6 space-y-4">
              {ui.downloadLocations.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#63716f]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl">
              TikTok Download Help
            </h2>
            <div className="mt-6 space-y-4">
              {ui.helpItems.map((item) => (
                <div key={item.title}>
                  <h3 className="text-base font-extrabold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-[#63716f]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <aside className="mt-10 flex gap-3 rounded-xl border border-[#cfe2dd] bg-[#f1f8f6] p-5">
          <ShieldCheck
            className="mt-0.5 size-5 shrink-0 text-[#087568]"
            aria-hidden="true"
          />
          <div>
            <p className="text-sm font-extrabold">Safety notice</p>
            <p className="mt-1 text-sm leading-6 text-[#5d706c]">
              {ui.safetyDescription}
            </p>
          </div>
        </aside>

        <div className="my-12 border-t border-[#dde5e3] sm:my-14" />

        <section aria-labelledby="more-tools-title">
          <h2
            id="more-tools-title"
            className="font-display text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl"
          >
            More TikTok Tools
          </h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {page.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="group min-h-28 rounded-xl border border-[#dbe3e1] p-4 transition-[border-color,transform] hover:-translate-y-0.5 hover:border-[#087568]/40"
              >
                <span className="flex items-center justify-between gap-3 text-sm font-extrabold text-[#087568]">
                  {tool.label}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </span>
                <p className="mt-3 text-xs leading-5 text-[#63716f]">
                  {ui.relatedToolDescriptions[tool.href]}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <div className="my-12 border-t border-[#dde5e3] sm:my-14" />

        <section id="faq" className="scroll-mt-24" aria-labelledby="faq-title">
          <div className="mx-auto max-w-[780px]">
            <h2
              id="faq-title"
              className="font-display text-2xl font-extrabold tracking-[-0.035em] sm:text-3xl"
            >
              Frequently Asked Questions
            </h2>
            <div className="mt-5 border-t border-[#dbe3e1]">
              {page.faq.map((faq) => (
                <details key={faq.question} className="group border-b border-[#dbe3e1]">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 text-sm font-extrabold marker:hidden sm:text-base [&::-webkit-details-marker]:hidden">
                    <span className="flex items-center gap-2">
                      <ChevronDown
                        className="size-4 shrink-0 -rotate-90 text-[#294442] transition-transform group-open:rotate-0"
                        aria-hidden="true"
                      />
                      {faq.question}
                    </span>
                  </summary>
                  <p className="pb-5 pl-6 pr-4 text-sm leading-6 text-[#63716f]">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>

            <p className="mt-6 flex items-start gap-2 rounded-lg bg-[#f4f8f7] p-4 text-xs leading-5 text-[#63716f]">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-[#087568]"
                aria-hidden="true"
              />
              This tool validates supported public video links. It does not bypass private
              accounts, access controls or copyright restrictions.
            </p>
          </div>
        </section>
      </div>

      <SiteFooter variant="utility" />

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
