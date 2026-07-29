import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpen, CalendarDays, Clock3 } from "lucide-react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { publicEnv } from "@/config/env";
import { getAllBlogPosts } from "@/services/content/blog";
import { BLOG_CATEGORIES } from "@/types/blog";

const pageTitle = "TikTok Research Guides";
const pageDescription =
  "Editorially reviewed guides about TikTok privacy, downloads, analytics and creator growth.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/blog",
    siteName: "TokLens",
    title: `${pageTitle} | TokLens`,
    description: pageDescription,
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "TokLens TikTok research guides",
      },
    ],
  },
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts();

  return (
    <main className="min-h-screen bg-sand">
      <SiteHeader />

      <section className="relative border-b border-ink/10 bg-cream">
        <div className="dot-field pointer-events-none absolute inset-x-0 top-0 h-48 opacity-30" />
        <div className="container relative py-14 sm:py-20">
          <Badge className="gap-2 bg-white">
            <BookOpen className="size-3.5 text-pine" aria-hidden="true" />
            Human-reviewed resources
          </Badge>
          <h1 className="mt-6 max-w-4xl font-display text-[clamp(2.75rem,7vw,5.25rem)] font-extrabold leading-[0.98] tracking-[-0.06em]">
            TikTok Research Guides
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-ink/60 sm:text-lg">
            Practical, sourced guidance for privacy-aware viewing, responsible saving,
            transparent analytics and creator growth.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {BLOG_CATEGORIES.map((category) => (
              <span
                key={category}
                className="rounded-full border border-ink/10 bg-white px-4 py-2 text-xs font-bold"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="container py-12 sm:py-16">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
              Latest
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold">
              Editorial library
            </h2>
          </div>
          <p className="text-sm text-ink/45">
            {posts.length} published {posts.length === 1 ? "guide" : "guides"}
          </p>
        </div>

        {posts.length ? (
          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="flex flex-col rounded-[24px] border border-ink/10 bg-white p-6 shadow-sm sm:p-8"
              >
                <div className="flex flex-wrap gap-2">
                  <Badge>{post.category}</Badge>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-cream px-3 py-1 text-xs text-ink/55"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-[-0.03em]">
                  <Link href={`/blog/${post.slug}`} className="hover:text-emerald-800">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-4 flex-1 text-sm leading-6 text-ink/55">
                  {post.description}
                </p>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-ink/10 pt-5 text-xs text-ink/45">
                  <span className="inline-flex items-center gap-1.5">
                    <CalendarDays className="size-3.5" />
                    Updated {formatDate(post.updatedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <Clock3 className="size-3.5" />
                    {post.readingMinutes} min read
                  </span>
                </div>
                <Link
                  href={`/blog/${post.slug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-emerald-800"
                >
                  Read guide
                  <ArrowRight className="size-4" />
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-[24px] border border-dashed border-ink/20 p-8 text-sm text-ink/55">
            Editorial guides are being reviewed. Nothing is auto-published.
          </div>
        )}
      </section>

      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: pageTitle,
            description: pageDescription,
            url: `${publicEnv.siteUrl}/blog`,
          }).replace(/</g, "\\u003c"),
        }}
      />
    </main>
  );
}
