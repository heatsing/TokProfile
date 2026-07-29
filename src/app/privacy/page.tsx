import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Calculator,
  ChevronRight,
  Clock3,
  Cookie,
  Database,
  Eye,
  FileWarning,
  KeyRound,
  Network,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { publicEnv } from "@/config/env";

const pageTitle = "Privacy & Data Handling";
const pageDescription =
  "See how the current TokLens build handles Viewer queries, Calculator inputs, Downloader limits, cookies, analytics and infrastructure request data.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/privacy" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/privacy",
    siteName: "TokLens",
    title: `${pageTitle} | TokLens`,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TokLens privacy and data handling",
      },
    ],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: publicEnv.siteUrl },
      {
        "@type": "ListItem",
        position: 2,
        name: pageTitle,
        item: `${publicEnv.siteUrl}/privacy`,
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: pageTitle,
    description: pageDescription,
    url: `${publicEnv.siteUrl}/privacy`,
    dateModified: "2026-07-26",
  },
] as const;

const currentTools = [
  {
    icon: Eye,
    title: "Public Viewer input",
    copy: "A username or TikTok URL is submitted in the page URL. The current application parses it in memory and does not write the query to an application database. It may still appear in browser history and infrastructure request logs.",
  },
  {
    icon: Calculator,
    title: "Engagement Calculator",
    copy: "Follower and interaction values stay in browser component state. The current Calculator does not send those values to a TokLens API or persist them in application storage.",
  },
  {
    icon: Network,
    title: "Downloader preview",
    copy: "A preview request sends the TikTok URL and rights confirmation to the server. An IP-derived HMAC key protects the endpoint with a one-minute rate-limit window. The current preview route does not fetch or store a media file.",
  },
] as const;

const requestFields = [
  "IP address or provider-derived location",
  "Request time, method, path and search parameters",
  "Response status and request identifiers",
  "Browser user-agent information",
  "Referrer, cache, firewall or function details",
] as const;

export default function PrivacyPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-sand">
      <SiteHeader />

      <section className="border-b border-ink/10 bg-cream">
        <div className="container max-w-5xl py-12 sm:py-20">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-semibold text-ink/50"
          >
            <Link href="/">Home</Link>
            <ChevronRight className="size-3.5" aria-hidden="true" />
            <span aria-current="page" className="text-ink/75">
              Privacy & Data Handling
            </span>
          </nav>
          <Badge className="mt-10 gap-2 bg-white">
            <ShieldCheck className="size-3.5 text-pine" aria-hidden="true" />
            Current implementation disclosure
          </Badge>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.6rem,7vw,5.2rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
            Privacy without impossible promises.
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-7 text-ink/60 sm:text-lg">
            This page explains the behavior verified in the current TokLens source. No
            TikTok login does not mean network anonymity, zero logs, or invisible
            browsing.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 text-xs text-ink/50">
            <Clock3 className="size-4" aria-hidden="true" />
            Reviewed July 26, 2026
          </div>
        </div>
      </section>

      <section className="container max-w-5xl py-12 sm:py-16">
        <div className="grid gap-5 lg:grid-cols-3">
          {currentTools.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[24px] border border-ink/10 bg-white p-6 sm:p-7"
              >
                <span className="grid size-11 place-items-center rounded-2xl bg-acid">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h2 className="mt-6 font-display text-xl font-extrabold">{item.title}</h2>
                <p className="mt-3 text-sm leading-6 text-ink/60">{item.copy}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream">
        <div className="container max-w-5xl py-14 sm:py-20">
          <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                Request data
              </p>
              <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
                Application storage is not the whole network.
              </h2>
            </div>
            <div>
              <p className="text-sm leading-7 text-ink/65">
                Browsers, networks, CDNs, firewalls and hosting providers process ordinary
                request information to deliver and protect a site. Depending on the
                deployed provider and settings, operational records can include:
              </p>
              <ul className="mt-6 grid gap-3">
                {requestFields.map((field) => (
                  <li
                    key={field}
                    className="flex gap-3 rounded-2xl border border-ink/10 bg-white p-4 text-sm text-ink/65"
                  >
                    <Network className="mt-0.5 size-4 shrink-0 text-emerald-700" />
                    {field}
                  </li>
                ))}
              </ul>
              <p className="mt-6 text-sm leading-7 text-ink/60">
                TokLens is designed for Vercel, but this source workspace is not linked to
                a production hosting project. Exact production logging, plan, log drains
                and retention must be verified before launch.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container max-w-5xl py-14 sm:py-20">
        <div className="grid gap-5 lg:grid-cols-2">
          <article className="rounded-[24px] border border-ink/10 bg-white p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Cookie className="size-5 text-emerald-700" aria-hidden="true" />
              <h2 className="font-display text-2xl font-extrabold">Cookies</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-ink/60">
              The current public Viewer, Calculator and preview tools do not intentionally
              set a TokLens account cookie. Optional TikTok OAuth uses a 10-minute
              security-state cookie and a 30-day opaque session cookie only when the user
              starts and completes the connection flow.
            </p>
          </article>
          <article className="rounded-[24px] border border-ink/10 bg-ink p-6 text-white sm:p-8">
            <div className="flex items-center gap-3 text-acid">
              <Database className="size-5" aria-hidden="true" />
              <h2 className="font-display text-2xl font-extrabold">Analytics status</h2>
            </div>
            <p className="mt-5 text-sm leading-7 text-white/65">
              GA4 and PostHog are planned but are not integrated in the current
              application runtime. Creator-authorized historical analytics also remain
              disabled until retention, deletion and privacy-request workflows are
              approved and implemented.
            </p>
          </article>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream">
        <div className="container max-w-5xl py-14 sm:py-20">
          <div className="grid gap-8 lg:grid-cols-2">
            <article>
              <div className="flex items-center gap-3">
                <KeyRound className="size-5 text-emerald-700" aria-hidden="true" />
                <h2 className="font-display text-2xl font-extrabold">
                  Optional creator connection
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink/60">
                TikTok OAuth and encrypted token storage are implemented but not
                production-ready. They require approved scopes, configured credentials,
                scheduled cleanup, provider verification and an approved retention policy
                before activation.
              </p>
            </article>
            <article>
              <div className="flex items-center gap-3">
                <FileWarning className="size-5 text-emerald-700" aria-hidden="true" />
                <h2 className="font-display text-2xl font-extrabold">
                  What not to enter
                </h2>
              </div>
              <p className="mt-4 text-sm leading-7 text-ink/60">
                Use only a public TikTok username or supported public TikTok URL. Do not
                submit passwords, private messages, private media, payment information, or
                unrelated personal data into a public tool field.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="container max-w-5xl py-14 sm:py-20">
        <div className="rounded-[28px] bg-acid p-7 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-900">
            Your next check
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
            Understand what “no login” changes — and what it does not.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-ink/70">
            A site can avoid asking for TikTok credentials while its hosting and network
            still process a request. Private browsing changes local browser behavior; it
            does not erase network records.
          </p>
          <Link
            href="/blog/watching-tiktok-without-an-account-privacy"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-white"
          >
            Read the no-login privacy guide
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-10 border-t border-ink/10 pt-8 text-sm leading-7 text-ink/60">
          <p>
            Questions or data requests can be sent to{" "}
            <a
              href="mailto:hello@toklens.app"
              className="font-bold text-emerald-800 underline underline-offset-4"
            >
              hello@toklens.app
            </a>
            . The ability to locate or delete a record depends on what was collected and
            whether it can be associated with the request.
          </p>
          <p className="mt-4">
            This implementation disclosure is not legal advice and does not describe
            TikTok&apos;s or another destination&apos;s practices after you leave TokLens.
            It will be updated before new analytics, storage or hosting integrations are
            activated.
          </p>
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
