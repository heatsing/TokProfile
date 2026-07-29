import type { Metadata } from "next";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  BarChart3,
  ChevronDown,
  ChevronRight,
  Clock3,
  Eye,
  Heart,
  Info,
  LockKeyhole,
  RefreshCw,
  TrendingUp,
  Unplug,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViewerSearch } from "@/components/viewer-search";
import { publicEnv } from "@/config/env";
import {
  buildToolPageMetadata,
  buildToolPageStructuredData,
} from "@/services/content/tool-page-seo";
import { requireToolPage } from "@/services/content/tool-pages";
import {
  calculateCreatorAnalytics,
  CREATOR_ANALYTICS_FORMULAS,
  type EstimatedMetric,
} from "@/services/tiktok/analytics/calculations";
import { findAuthorizedCreatorSnapshot } from "@/services/tiktok/analytics/analytics-runtime";
import { TIKTOK_SESSION_COOKIE } from "@/services/tiktok/oauth/cookies";
import { getTikTokOAuthRuntime } from "@/services/tiktok/oauth/oauth-runtime";
import { tiktokToolEngine } from "@/services/tiktok";
import { formatCompactNumber } from "@/utils/format-number";

const metricIcons = {
  engagement: TrendingUp,
  frequency: Clock3,
  likes: Heart,
  views: Eye,
} as const;

const metricFormulas = {
  averageLikes: CREATOR_ANALYTICS_FORMULAS.averageLikes,
  averageViews: CREATOR_ANALYTICS_FORMULAS.averageViews,
  engagementRate: CREATOR_ANALYTICS_FORMULAS.engagementRate,
  postingFrequency: CREATOR_ANALYTICS_FORMULAS.postingFrequency,
} as const;

function formatMetric(metric: EstimatedMetric | undefined) {
  if (!metric || metric.value === null) {
    return "—";
  }

  if (metric.unit === "percent") {
    return `${metric.value.toFixed(2)}%`;
  }

  if (metric.unit === "posts_per_week") {
    return `${metric.value.toFixed(2)}/week`;
  }

  return formatCompactNumber(metric.value);
}

function formatCapturedAt(value: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: "UTC",
  }).format(new Date(value));
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ capture?: string; connection?: string; q?: string }>;
}): Promise<Metadata> {
  const { capture, connection, q } = await searchParams;
  const hasTransientParameters = Boolean(
    q?.trim() || capture?.trim() || connection?.trim(),
  );
  const page = await requireToolPage("tiktok-analytics");
  return buildToolPageMetadata(page, { noindex: hasTransientParameters });
}

export default async function TikTokAnalyticsPage({
  searchParams,
}: {
  searchParams: Promise<{ capture?: string; connection?: string; q?: string }>;
}) {
  const { capture, connection, q = "" } = await searchParams;
  const page = await requireToolPage("tiktok-analytics");
  const ui = page.ui as {
    methodologyEyebrow: string;
    methodologyTitle: string;
    metrics: {
      description: string;
      icon: keyof typeof metricIcons;
      metricKey: keyof typeof metricFormulas;
      title: string;
    }[];
    searchButtonLabel: string;
    searchHelperText: string;
  };
  const metricDefinitions = ui.metrics.map((metric) => ({
    ...metric,
    formula: metricFormulas[metric.metricKey],
    icon: metricIcons[metric.icon],
  }));
  const structuredData = buildToolPageStructuredData(page, publicEnv.siteUrl);
  const input = q.trim();
  const result = input
    ? await tiktokToolEngine.run({ input, tool: "analytics" })
    : undefined;
  const username =
    result?.ok && result.tool === "analytics" ? result.data.account.username : undefined;
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(TIKTOK_SESSION_COOKIE)?.value;
  const oauthRuntime = getTikTokOAuthRuntime();
  let authorization = null;

  if (oauthRuntime && sessionToken) {
    try {
      authorization = await oauthRuntime.authorizationService.findSession(sessionToken);
    } catch {
      authorization = null;
    }
  }
  let snapshot = null;
  let snapshotLoadFailed = false;

  if (username) {
    try {
      snapshot = await findAuthorizedCreatorSnapshot(username);
    } catch {
      snapshotLoadFailed = true;
    }
  }

  const report = snapshot
    ? calculateCreatorAnalytics({
        posts: snapshot.posts,
        username: snapshot.creator.username,
        windowEnd: snapshot.windowEnd,
        windowStart: snapshot.windowStart,
      })
    : undefined;

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
              <BarChart3 className="size-3.5 text-pine" aria-hidden="true" />
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
              action="/tiktok-analytics"
              buttonLabel={ui.searchButtonLabel}
              defaultValue={input}
              helperText={ui.searchHelperText}
            />
          </div>
        </div>
      </section>

      <section aria-label="TikTok account connection" className="container pt-10">
        {connection || capture ? (
          <p
            role="status"
            className="mb-4 rounded-2xl border border-ink/10 bg-white p-4 text-sm text-ink/65"
          >
            {connection === "connected"
              ? "TikTok account connected. Capture a fresh snapshot when you are ready."
              : connection === "disconnected"
                ? "TikTok account disconnected and local tokens removed."
                : connection === "denied"
                  ? "TikTok authorization was cancelled or denied."
                  : connection === "invalid_state"
                    ? "The authorization request expired or failed its security check. Start again."
                    : connection === "not_configured"
                      ? "TikTok Login Kit is not configured in this environment."
                      : connection === "disconnect_failed"
                        ? "TikTok could not be disconnected safely. No local credentials were deleted."
                        : connection === "failed"
                          ? "TikTok authorization could not be completed."
                          : capture === "success"
                            ? "A fresh creator-authorized snapshot was captured."
                            : capture === "not_connected"
                              ? "Connect a TikTok account before capturing a snapshot."
                              : "The snapshot could not be captured. Retry later."}
          </p>
        ) : null}

        <div className="rounded-[24px] border border-ink/10 bg-ink p-6 text-white sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 text-acid">
                <LockKeyhole className="size-4" aria-hidden="true" />
                <p className="text-xs font-bold uppercase tracking-[0.14em]">
                  Creator-authorized analytics
                </p>
              </div>
              <h2 className="mt-3 font-display text-2xl font-extrabold">
                {authorization
                  ? `Connected as @${authorization.username}`
                  : "Connect your own TikTok account"}
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                {authorization
                  ? "Only your authorized public profile and video fields are used. Capture is manual, rate-limited and clearly timestamped."
                  : oauthRuntime
                    ? "TikTok Login Kit requests read-only profile, stats and public-video permissions. Tokens stay encrypted on the server."
                    : "Account connection is not available in this environment. No TikTok login or permissions are requested."}
              </p>
            </div>

            {authorization ? (
              <div className="flex flex-col gap-3 sm:flex-row">
                <form action="/api/tiktok-analytics/capture" method="post">
                  <Button type="submit" variant="acid" className="w-full">
                    <RefreshCw className="size-4" />
                    Capture snapshot
                  </Button>
                </form>
                <form action="/api/auth/tiktok/disconnect" method="post">
                  <Button
                    type="submit"
                    className="w-full border-white/25 text-white hover:bg-white/10"
                    variant="outline"
                  >
                    <Unplug className="size-4" />
                    Disconnect
                  </Button>
                </form>
              </div>
            ) : oauthRuntime ? (
              <Button asChild variant="acid">
                <Link href="/api/auth/tiktok/start">
                  <LockKeyhole className="size-4" />
                  Continue with TikTok
                </Link>
              </Button>
            ) : (
              <div className="flex flex-col items-start gap-3">
                <Button disabled variant="acid">
                  <LockKeyhole className="size-4" />
                  Connection unavailable
                </Button>
                <Link
                  className="text-xs font-semibold text-white/65 underline decoration-white/30 underline-offset-4 hover:text-white"
                  href="/privacy"
                >
                  Review current data handling
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      <section aria-label="Analytics result" className="container py-10 sm:py-14">
        <div className="rounded-[26px] border border-ink/10 bg-white p-6 shadow-lift sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <div className="flex flex-wrap gap-2">
                <Badge>Estimated</Badge>
                <Badge>Not official TikTok data</Badge>
                {snapshot ? <Badge>Creator-authorized source</Badge> : null}
              </div>
              <h2 className="mt-5 font-display text-2xl font-extrabold sm:text-3xl">
                {username ? `@${username} analysis` : "Account analysis"}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-ink/55">
                {snapshot
                  ? `Calculated from ${snapshot.posts.length} creator-authorized public posts captured ${formatCapturedAt(snapshot.capturedAt)} UTC.`
                  : snapshotLoadFailed
                    ? "The stored snapshot could not be loaded. Metrics remain unavailable; retry later."
                    : username
                      ? "No creator-authorized snapshot is stored for this account. Metrics remain unavailable instead of being fabricated."
                      : result && !result.ok
                        ? result.error.message
                        : "Enter a public username or profile URL. Metrics appear only when a verified post sample is available."}
              </p>
            </div>
            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-acid">
              <Info className="size-5" aria-hidden="true" />
            </span>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metricDefinitions.map((metric) => (
              <article
                key={metric.title}
                className="rounded-[20px] border border-ink/10 bg-cream p-5"
              >
                <metric.icon className="size-5 text-emerald-700" aria-hidden="true" />
                <p className="mt-6 text-xs font-bold uppercase tracking-[0.12em] text-ink/45">
                  {metric.title}
                </p>
                <p className="mt-2 font-display text-3xl font-extrabold">
                  {formatMetric(report?.metrics[metric.metricKey])}
                </p>
                <p className="mt-3 text-xs leading-5 text-ink/50">
                  {report
                    ? `${report.postCount} sampled posts · Estimated`
                    : "Sample unavailable"}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 rounded-[20px] border border-dashed border-ink/20 p-5">
            <p className="text-sm font-bold">Top performing posts</p>
            {report?.topPerformingPosts.length ? (
              <ol className="mt-4 grid gap-3">
                {report.topPerformingPosts.map((post, index) => (
                  <li
                    key={post.id}
                    className="flex flex-col gap-3 rounded-2xl bg-cream p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="text-xs font-bold text-emerald-700">
                        #{index + 1} · {formatCompactNumber(post.views)} views
                      </p>
                      <p className="mt-1 truncate text-sm font-semibold">
                        {post.description || `TikTok post ${post.id}`}
                      </p>
                    </div>
                    <div className="shrink-0 text-left sm:text-right">
                      <p className="font-display text-xl font-extrabold">
                        {post.engagementRate === null
                          ? "—"
                          : `${post.engagementRate.toFixed(2)}%`}
                      </p>
                      <p className="text-xs text-ink/45">by views · Estimated</p>
                    </div>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="mt-2 text-sm leading-6 text-ink/55">
                No ranked posts are shown without verified view and interaction counts.
                Ranking uses per-post view-based engagement rate, then views as the
                tie-breaker.
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="border-y border-ink/10 bg-cream py-16 sm:py-20">
        <div className="container">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              {ui.methodologyEyebrow}
            </p>
            <h2 className="mt-3 font-display text-3xl font-extrabold tracking-[-0.04em] sm:text-4xl">
              {ui.methodologyTitle}
            </h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {metricDefinitions.map((metric) => (
              <article
                key={metric.title}
                className="rounded-[22px] border border-ink/10 bg-white p-6"
              >
                <div className="flex items-center gap-3">
                  <span className="grid size-10 place-items-center rounded-xl bg-acid">
                    <metric.icon className="size-4" aria-hidden="true" />
                  </span>
                  <h3 className="font-display text-lg font-extrabold">{metric.title}</h3>
                </div>
                <p className="mt-5 text-sm leading-6 text-ink/55">{metric.description}</p>
                <p className="mt-4 rounded-xl bg-cream p-4 font-mono text-xs leading-5 text-ink/70">
                  {metric.formula}
                </p>
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
