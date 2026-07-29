import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  Eye,
  Info,
  LockKeyhole,
  Search,
  ShieldCheck,
} from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { ToolResultRenderer } from "@/components/tool-result-renderer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ViewerSearch } from "@/components/viewer-search";
import { isTikTokToolType, tiktokToolEngine } from "@/services/tiktok";

export const metadata: Metadata = {
  title: "Public TikTok Viewer",
  description:
    "Validate public TikTok usernames and links without connecting a TikTok account. Live public-profile retrieval is not yet available.",
  alternates: {
    canonical: "/viewer",
  },
};

export default async function ViewerPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string; q?: string }>;
}) {
  const { mode, q = "" } = await searchParams;
  const selectedTool = isTikTokToolType(mode) ? mode : undefined;
  const hasQuery = q.trim().length > 0;
  const result = hasQuery
    ? await tiktokToolEngine.run({ input: q, tool: selectedTool })
    : null;

  return (
    <main className="min-h-screen bg-sand">
      <SiteHeader />
      <section className="border-b border-ink/10 bg-cream py-12 sm:py-16">
        <div className="container">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-xs font-bold text-ink/55 hover:text-ink"
          >
            <ArrowLeft className="size-3.5" />
            Back to TokLens
          </Link>
          <div className="max-w-3xl">
            <Badge className="mb-5 bg-acid">
              <Eye className="mr-1.5 size-3.5" />
              Unified TikTok tool engine
            </Badge>
            <h1 className="font-display text-4xl font-extrabold tracking-[-0.055em] sm:text-6xl">
              View public TikTok content, clearly.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-ink/60">
              Enter a username or public TikTok link. TokLens detects the content type,
              validates the input, and routes it through one shared tool system.
            </p>
          </div>
          <div className="mt-8 max-w-3xl">
            <ViewerSearch defaultValue={q} mode={selectedTool} />
          </div>
        </div>
      </section>

      <section className="container py-10 sm:py-14">
        {result ? (
          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <ToolResultRenderer result={result} />
            <aside className="rounded-[24px] bg-ink p-6 text-white">
              <ShieldCheck className="size-7 text-acid" />
              <h2 className="mt-5 font-display text-xl font-extrabold">
                Privacy boundary
              </h2>
              <p className="mt-3 text-sm leading-6 text-white/60">
                TokLens is designed for public content research. Private profiles,
                restricted content, and access controls remain respected.
              </p>
              <div className="mt-6 space-y-3 border-t border-white/10 pt-5 text-xs text-white/55">
                <p className="flex items-center gap-2">
                  <LockKeyhole className="size-3.5 text-acid" />
                  No TikTok credentials for public input validation
                </p>
                <p className="flex items-center gap-2">
                  <Clock3 className="size-3.5 text-acid" />
                  No application database query storage
                </p>
                <Link
                  href="/privacy"
                  className="inline-flex font-bold text-acid underline decoration-acid/40 underline-offset-4"
                >
                  Read request and logging details
                </Link>
              </div>
            </aside>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-3">
            {[
              [
                Eye,
                "Enter one input",
                "Use a username, profile URL, video URL, photo URL, or story URL.",
              ],
              [
                Search,
                "The engine detects it",
                "Shared parsing and validation select the correct registered service.",
              ],
              [
                Info,
                "One renderer responds",
                "Every tool returns the same result and error contract to the interface.",
              ],
            ].map(([Icon, title, copy], index) => {
              const ItemIcon = Icon as typeof Eye;
              return (
                <article
                  key={title as string}
                  className="rounded-[22px] border border-ink/10 bg-cream p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-white">
                      <ItemIcon className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-ink/30">0{index + 1}</span>
                  </div>
                  <h2 className="mt-8 font-display text-xl font-extrabold">
                    {title as string}
                  </h2>
                  <p className="mt-3 text-sm leading-6 text-ink/55">{copy as string}</p>
                </article>
              );
            })}
          </div>
        )}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-5 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-ink/55">
            Need creator-level trends and comparisons?
          </p>
          <Button asChild>
            <Link href="/viewer?mode=analytics">Explore creator analytics</Link>
          </Button>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
