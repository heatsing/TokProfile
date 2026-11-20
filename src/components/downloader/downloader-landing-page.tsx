import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  ClipboardPaste,
  Copy,
  Link2,
  SearchCheck,
} from "lucide-react";

import { DownloaderWorkspace } from "@/components/downloader/downloader-workspace";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import {
  utilityToolColumn,
  utilityToolHero,
} from "@/components/utility-tool/tool-landing";
import { publicEnv } from "@/config/env";
import { buildToolPageStructuredData } from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";
import type { ToolPageContentItem } from "@/types/tool-page";

interface HowToStep extends ToolPageContentItem {
  cues: string[];
}

interface DeviceGuide extends ToolPageContentItem {
  id: string;
  steps?: string[];
}

interface DownloaderUi {
  callout: ToolPageContentItem;
  deviceGuides: DeviceGuide[];
  downloadLocations: ToolPageContentItem[];
  followOn: ToolPageContentItem;
  howToSteps: HowToStep[];
  introParagraphs: string[];
}

const stepIcons = [Copy, ClipboardPaste, SearchCheck] as const;

export async function DownloaderLandingPage({
  canonicalRoute,
  showBreadcrumb: _showBreadcrumb = true,
}: {
  canonicalRoute: string;
  showBreadcrumb?: boolean;
}) {
  const page = await requireToolPage("tiktok-video-downloader");
  const ui = page.ui as unknown as DownloaderUi;
  const structuredData = buildToolPageStructuredData(page, publicEnv.siteUrl, {
    route: canonicalRoute,
  });

  return (
    <main className="min-h-screen bg-white text-[#24211f]">
      <SiteHeader variant="utility" />

      <section id="download" className={utilityToolHero}>
        <div className={`${utilityToolColumn} text-center`}>
          <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-bold leading-[1.24] tracking-[-0.025em]">
            {page.h1}
          </h1>
          <p className="mx-auto mt-2 max-w-[680px] text-sm leading-6 text-[#fff8f4] sm:text-base">
            {page.intro}
          </p>

          <div className="mx-auto mt-7 grid w-full max-w-[920px] gap-3 text-left lg:grid-cols-[minmax(0,1fr)_230px]">
            <DownloaderWorkspace />
            <Link
              href="/download-tiktok-stories"
              className="flex min-h-[96px] items-center justify-between gap-4 rounded-[5px] border border-white/35 bg-white/10 px-5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white lg:min-h-full lg:flex-col lg:items-start lg:justify-center"
            >
              <span>
                <span className="block text-[10px] font-extrabold uppercase tracking-[0.14em] text-white/75">
                  Story tool
                </span>
                <span className="mt-1 block text-sm font-extrabold">
                  Download TikTok Story
                </span>
                <span className="mt-1 block text-[11px] leading-4 text-white/80">
                  Open the dedicated Story workflow.
                </span>
              </span>
              <ArrowRight className="size-5 shrink-0" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <nav
        aria-label="Video link instructions"
        className="mx-auto flex w-[calc(100%-2rem)] max-w-[900px] flex-wrap items-center justify-center gap-x-4 gap-y-1 border-b border-[#e8e2de] py-4 text-center text-[13px] sm:w-[calc(100%-3rem)]"
      >
        <span className="font-semibold">Using a phone?</span>
        {ui.deviceGuides.map((guide) => (
          <a
            key={guide.id}
            href={`#${guide.id}`}
            className="font-semibold text-[#a13c0d] underline-offset-4 hover:underline"
          >
            {guide.title}
          </a>
        ))}
      </nav>

      <div className={utilityToolColumn}>
        <section className="mx-auto mt-10 max-w-[70ch] text-center sm:mt-12">
          <h2 className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]">
            Check TikTok Video Links with TokProfile
          </h2>
          {ui.introParagraphs.map((paragraph) => (
            <p
              key={paragraph}
              className="mt-3 text-sm leading-6 text-[#56514e] sm:text-[15px]"
            >
              {paragraph}
            </p>
          ))}
        </section>

        <section
          id="how"
          className="mt-10 scroll-mt-5 sm:mt-12"
          aria-labelledby="how-title"
        >
          <h2
            id="how-title"
            className="text-center text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
          >
            How to Check a TikTok Video Link
          </h2>
          <ol className="mt-5 grid gap-0 sm:grid-cols-3 sm:gap-8">
            {ui.howToSteps.map((step, index) => {
              const Icon = stepIcons[index] ?? Link2;
              return (
                <li
                  key={step.title}
                  className="grid grid-cols-[34px_1fr] items-center border-b border-[#e8e2de] py-3 text-left last:border-b-0 sm:block sm:border-0 sm:px-1 sm:py-1 sm:text-center"
                >
                  <Icon className="size-6 text-[#a13c0d] sm:mx-auto" aria-hidden="true" />
                  <h3 className="text-sm font-bold tracking-[-0.01em] sm:mt-3">
                    {step.title.replace(/^\d+\.\s*/, "")}
                  </h3>
                  <p className="col-start-2 mt-1 text-[13px] leading-5 text-[#56514e] sm:mt-1.5 sm:text-sm">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </section>

        <section
          className="mt-10 grid items-start gap-7 sm:mt-12 sm:grid-cols-2 sm:gap-8"
          aria-labelledby="result-title"
        >
          <div className="relative grid min-h-[180px] place-items-center overflow-hidden rounded bg-[#28221f] sm:min-h-[195px]">
            <span className="absolute size-[260px] rounded-full border border-white/15 shadow-[0_0_0_23px_rgba(255,255,255,0.045),0_0_0_47px_rgba(255,255,255,0.035)]" />
            <div className="relative grid aspect-[1.86] w-[58%] max-w-[230px] place-items-center rounded-[9px] border border-[#f6ae8c] bg-[#df642a] shadow-[0_12px_26px_rgba(0,0,0,0.27)]">
              <span className="grid size-10 place-items-center rounded-full border border-white/50">
                <SearchCheck className="size-5 text-white" aria-hidden="true" />
              </span>
              <span className="absolute bottom-2.5 left-3 right-3 h-[3px] rounded bg-[linear-gradient(90deg,#fff_42%,rgba(255,255,255,0.35)_42%)]" />
            </div>
            <span className="absolute left-[62%] top-[62%] inline-flex items-center gap-1 rounded bg-white px-2 py-1 text-xs font-bold text-[#8f330c]">
              <CheckCircle2 className="size-3.5" aria-hidden="true" />
              Valid link
            </span>
          </div>
          <div>
            <h2
              id="result-title"
              className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
            >
              What the Checker Gives You
            </h2>
            <dl className="mt-2">
              {ui.downloadLocations.map((item) => (
                <div
                  key={item.title}
                  className="grid grid-cols-[minmax(110px,0.85fr)_1.35fr] gap-3 border-b border-[#e8e2de] py-2"
                >
                  <dt className="text-[13px] font-semibold">{item.title}</dt>
                  <dd className="text-[13px] leading-5 text-[#56514e]">
                    {item.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="mt-10 sm:mt-12" aria-labelledby="before-title">
          <h2
            id="before-title"
            className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
          >
            Before You Check a Link
          </h2>
          <div className="mt-3">
            {page.tips.map((tip) => (
              <article key={tip.title} className="border-b border-[#e8e2de] py-4">
                <h3 className="text-[15px] font-bold text-[#a13c0d]">{tip.title}</h3>
                <p className="mt-1.5 text-sm leading-6 text-[#56514e]">
                  {tip.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <aside className="mt-10 rounded-[5px] bg-[#f5f4f3] px-5 py-6 text-center sm:mt-12 sm:px-8">
          <h2 className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]">
            {ui.callout.title}
          </h2>
          <p className="mx-auto mt-3 max-w-[69ch] text-sm leading-6 text-[#56514e]">
            {ui.callout.description}
          </p>
        </aside>

        <section className="mt-10 sm:mt-12" aria-labelledby="device-title">
          <h2
            id="device-title"
            className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
          >
            Copy a TikTok Video Link on Your Phone or Computer
          </h2>
          <nav
            aria-label="Device instructions"
            className="mt-3 flex flex-wrap gap-x-4 gap-y-2"
          >
            {ui.deviceGuides.map((guide) => (
              <a
                key={guide.id}
                href={`#${guide.id}`}
                className="text-[13px] font-semibold text-[#a13c0d] underline-offset-4 hover:underline"
              >
                {guide.title}
              </a>
            ))}
          </nav>
          <div className="mt-2">
            {ui.deviceGuides.map((guide) => (
              <article
                key={guide.id}
                id={guide.id}
                className="scroll-mt-5 border-b border-[#e8e2de] py-4"
              >
                <h3 className="text-base font-bold text-[#a13c0d]">{guide.title}</h3>
                {guide.steps ? (
                  <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm leading-6 text-[#56514e]">
                    {guide.steps.map((step) => (
                      <li key={step}>{step}</li>
                    ))}
                  </ol>
                ) : (
                  <p className="mt-2 text-sm leading-6 text-[#56514e]">
                    {guide.description}
                  </p>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="mt-10 sm:mt-12" aria-labelledby="follow-on-title">
          <h2
            id="follow-on-title"
            className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
          >
            {ui.followOn.title}
          </h2>
          <p className="mt-3 text-sm leading-6 text-[#56514e]">
            {ui.followOn.description}{" "}
            <Link
              href="/tiktok-engagement-rate-calculator"
              className="font-semibold text-[#a13c0d] underline underline-offset-4"
            >
              Open the engagement calculator
            </Link>
            .
          </p>
        </section>

        <section className="mt-10 sm:mt-12" aria-labelledby="faq-title">
          <h2
            id="faq-title"
            className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
          >
            Frequently Asked Questions
          </h2>
          <div className="mt-3 border-t border-[#e8e2de]">
            {page.faq.map((faq) => (
              <details key={faq.question} className="border-b border-[#e8e2de]">
                <summary className="cursor-pointer py-3 text-sm font-semibold">
                  {faq.question}
                </summary>
                <p className="px-4 pb-4 text-sm leading-6 text-[#56514e]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-10 sm:mt-12" aria-labelledby="related-title">
          <h2
            id="related-title"
            className="text-[clamp(1.3rem,2.7vw,1.75rem)] font-bold leading-tight tracking-[-0.025em]"
          >
            More TokProfile Tools and Guides
          </h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
            {page.relatedTools.map((tool) => (
              <Link
                key={tool.href}
                href={tool.href}
                className="text-sm font-semibold text-[#a13c0d] underline-offset-4 hover:underline"
              >
                {tool.label}
              </Link>
            ))}
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
