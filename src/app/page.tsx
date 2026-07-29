import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Check,
  ChevronDown,
  Download,
  Eye,
  Link2,
  Search,
  ShieldCheck,
  UserRoundSearch,
  Video,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { ViewerSearch } from "@/components/viewer-search";
import { publicEnv } from "@/config/env";

const pageTitle = "Public TikTok Viewer & Creator Analytics";
const pageDescription =
  "View public TikTok profiles, videos and analytics without connecting your TikTok account.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "TokLens",
    title: `${pageTitle} | TokLens`,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TokLens public TikTok viewer and creator analytics",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${pageTitle} | TokLens`,
    description: pageDescription,
    images: ["/opengraph-image"],
  },
};

const popularTools = [
  {
    icon: UserRoundSearch,
    title: "TikTok Profile Viewer",
    description:
      "Open a focused view of available public profile details and recent content.",
    href: "/tiktok-profile-viewer",
    action: "View a profile",
    status: "Available",
  },
  {
    icon: Video,
    title: "TikTok Video Viewer",
    description:
      "Watch an available public video with its creator, caption and visible metrics.",
    href: "/viewer?mode=video",
    action: "Open a video",
    status: "Available",
  },
  {
    icon: Download,
    title: "TikTok Downloader",
    description:
      "A rights-aware saving tool for content you own or have permission to use.",
    href: "/tiktok-video-downloader",
    action: "Open downloader",
    status: "Safety preview",
  },
  {
    icon: BarChart3,
    title: "TikTok Analytics",
    description:
      "Review available public signals, then connect your own account for deeper history.",
    href: "/tiktok-analytics",
    action: "Explore analytics",
    status: "Preview",
  },
] as const;

const steps = [
  {
    icon: Link2,
    number: "01",
    title: "Paste or type",
    description: "Enter a TikTok username, public profile URL or public video URL.",
  },
  {
    icon: Search,
    number: "02",
    title: "We identify it",
    description:
      "TokLens recognizes the link type and checks what public information is available.",
  },
  {
    icon: Eye,
    number: "03",
    title: "View the result",
    description:
      "Get a clean profile, video or analytics view with clear source and availability notes.",
  },
] as const;

const faqs = [
  {
    question: "What can I enter in the TokLens search box?",
    answer:
      "You can enter a TikTok username such as @username, a public TikTok profile URL, or a public TikTok video URL. TokLens identifies the input type before preparing the result.",
  },
  {
    question: "Do I need to connect my TikTok account?",
    answer:
      "No. Public viewing does not require you to connect a TikTok account. Connecting your own account is optional and is only needed for deeper, authorized creator analytics and history.",
  },
  {
    question: "Can TokLens view private or restricted profiles?",
    answer:
      "No. TokLens is designed for publicly available content and respects private profiles, removed content, regional restrictions, age restrictions and other access controls.",
  },
  {
    question: "Are public analytics complete or real-time?",
    answer:
      "Not always. Public analytics depend on the information currently available from the source. TokLens labels unavailable, calculated and estimated values and shows freshness where possible.",
  },
  {
    question: "Can I download any TikTok video?",
    answer:
      "The downloader is not currently available. Any future saving feature will be limited to content you own or have permission to use and will preserve applicable rights and source restrictions.",
  },
] as const;

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${publicEnv.siteUrl}/#organization`,
    name: "TokLens",
    url: publicEnv.siteUrl,
    logo: `${publicEnv.siteUrl}/opengraph-image`,
    description: pageDescription,
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${publicEnv.siteUrl}/#website`,
    url: publicEnv.siteUrl,
    name: "TokLens",
    description: pageDescription,
    publisher: {
      "@id": `${publicEnv.siteUrl}/#organization`,
    },
    inLanguage: "en",
  },
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "@id": `${publicEnv.siteUrl}/#application`,
    name: "TokLens",
    url: publicEnv.siteUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    description: pageDescription,
    browserRequirements: "Requires a modern web browser.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Public TikTok username recognition",
      "Public TikTok profile URL recognition",
      "Public TikTok video URL recognition",
      "Focused public content viewing",
      "Creator analytics preview",
    ],
    publisher: {
      "@id": `${publicEnv.siteUrl}/#organization`,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  },
] as const;

export default function Home() {
  return (
    <main className="overflow-hidden">
      <SiteHeader />

      <section className="relative border-b border-ink/10 bg-cream">
        <div className="dot-field pointer-events-none absolute inset-x-0 top-0 h-40 opacity-30" />
        <div className="container relative flex min-h-[680px] flex-col items-center justify-center py-16 text-center sm:py-24">
          <Badge className="mb-6 gap-2 bg-white px-3.5 py-1.5">
            <span className="size-1.5 rounded-full bg-emerald-600" />
            Public content, focused
          </Badge>

          <h1 className="max-w-5xl font-display text-[clamp(2.75rem,7vw,5.75rem)] font-extrabold leading-[0.96] tracking-[-0.065em] text-ink">
            Public TikTok Viewer
            <span className="block text-pine">&amp; Creator Analytics</span>
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-ink/65 sm:text-xl sm:leading-8">
            View public TikTok profiles, videos and analytics without connecting your
            TikTok account.
          </p>

          <div className="mt-9 w-full max-w-3xl text-left">
            <ViewerSearch
              buttonLabel="View"
              helperText="Supports usernames, public profile URLs and public video URLs."
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-ink/55">
            <span className="inline-flex items-center gap-1.5">
              <Check className="size-3.5 text-emerald-700" />
              No TokLens account required
            </span>
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="size-3.5 text-emerald-700" />
              Public content only
            </span>
            <Link
              href="#how-it-works"
              className="underline decoration-ink/25 underline-offset-4 hover:decoration-ink"
            >
              See how it works
            </Link>
          </div>
        </div>
      </section>

      <section id="popular-tools" className="scroll-mt-24 bg-white py-20 sm:py-24">
        <div className="container">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Start with a task
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
                Popular Tools
              </h2>
            </div>
            <p className="max-w-md text-sm leading-6 text-ink/55">
              One focused workspace for public viewing, useful context and creator
              research.
            </p>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {popularTools.map((tool) => {
              const content = (
                <>
                  <div className="flex items-center justify-between gap-3">
                    <span className="grid size-11 place-items-center rounded-2xl bg-sand text-pine transition-colors group-hover:bg-acid">
                      <tool.icon className="size-5" aria-hidden="true" />
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                        tool.status === "Available"
                          ? "border-emerald-700/15 bg-emerald-50 text-emerald-800"
                          : "border-ink/10 bg-sand text-ink/55"
                      }`}
                    >
                      {tool.status}
                    </span>
                  </div>
                  <div className="mt-12">
                    <h3 className="font-display text-xl font-extrabold tracking-[-0.025em]">
                      {tool.title}
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-ink/55">
                      {tool.description}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-ink">
                      {tool.action}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </>
              );

              return (
                <Link
                  key={tool.title}
                  href={tool.href}
                  className="group flex min-h-72 flex-col rounded-[22px] border border-ink/10 bg-cream p-6 transition-[transform,border-color,box-shadow] hover:-translate-y-1 hover:border-ink/20 hover:shadow-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid focus-visible:ring-offset-2"
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-y border-ink/10 bg-sand py-20 sm:py-24"
      >
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Three simple steps
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              How It Works
            </h2>
            <p className="mt-4 text-sm leading-6 text-ink/55 sm:text-base">
              Start with the public username or link you already have. TokLens handles the
              rest.
            </p>
          </div>

          <ol className="relative mt-12 grid gap-4 lg:grid-cols-3">
            {steps.map((step) => (
              <li
                key={step.number}
                className="relative rounded-[22px] border border-ink/10 bg-white p-6 sm:p-8"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl bg-acid text-ink">
                    <step.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span className="font-mono text-xs font-semibold text-ink/35">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-8 font-display text-xl font-extrabold">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-ink/55">{step.description}</p>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-[22px] bg-ink p-6 text-white sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="font-display text-xl font-extrabold">Public means public.</p>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-white/60">
                TokLens does not unlock private profiles, bypass restrictions or treat
                unavailable information as zero.
              </p>
            </div>
            <Link
              href="/viewer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-acid px-5 py-3 text-sm font-bold text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Open the viewer
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section id="faq" className="scroll-mt-24 bg-cream py-20 sm:py-24">
        <div className="container grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Clear answers
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-5xl">
              FAQ
            </h2>
            <p className="mt-5 max-w-sm text-sm leading-6 text-ink/55">
              What TokLens accepts, what it can show and where public-data limitations
              apply.
            </p>
          </div>

          <div className="border-t border-ink/15">
            {faqs.map((faq) => (
              <details key={faq.question} className="group border-b border-ink/15">
                <summary className="flex min-h-[72px] cursor-pointer list-none items-center justify-between gap-5 py-5 font-display text-base font-extrabold marker:hidden sm:text-lg [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white text-ink transition-transform group-open:rotate-180">
                    <ChevronDown className="size-4" aria-hidden="true" />
                  </span>
                </summary>
                <p className="max-w-2xl pb-6 pr-10 text-sm leading-6 text-ink/60 sm:text-base sm:leading-7">
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
