import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronRight, Clock3, UserRound } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { publicEnv } from "@/config/env";
import { getAllBlogPosts, getBlogPost } from "@/services/content/blog";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      locale: "en_US",
      url: `/blog/${post.slug}`,
      siteName: "TokLens",
      title: `${post.title} | TokLens`,
      description: post.description,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const url = `${publicEnv.siteUrl}/blog/${post.slug}`;
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: publicEnv.siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Guides",
          item: `${publicEnv.siteUrl}/blog`,
        },
        { "@type": "ListItem", position: 3, name: post.title, item: url },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: post.title,
      description: post.description,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt,
      mainEntityOfPage: url,
      author: { "@type": "Organization", name: post.author.name },
      publisher: { "@type": "Organization", name: "TokLens", url: publicEnv.siteUrl },
      keywords: post.tags.join(", "),
      articleSection: post.category,
    },
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-sand">
      <SiteHeader />

      <article>
        <header className="border-b border-ink/10 bg-cream">
          <div className="container max-w-5xl py-12 sm:py-20">
            <nav
              aria-label="Breadcrumb"
              className="flex min-w-0 flex-nowrap items-center gap-2 text-xs font-semibold text-ink/50"
            >
              <Link href="/" className="shrink-0">
                Home
              </Link>
              <ChevronRight className="size-3.5 shrink-0" />
              <Link href="/blog" className="shrink-0">
                Guides
              </Link>
              <ChevronRight className="size-3.5 shrink-0" />
              <span aria-current="page" className="min-w-0 flex-1 truncate text-ink/75">
                {post.title}
              </span>
            </nav>
            <Badge className="mt-10">{post.category}</Badge>
            <h1 className="mt-6 max-w-4xl break-words font-display text-[clamp(2.5rem,6vw,4.8rem)] font-extrabold leading-[1] tracking-[-0.055em]">
              {post.title}
            </h1>
            <p className="mt-5 max-w-3xl text-base leading-7 text-ink/60 sm:text-lg">
              {post.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-xs text-ink/50">
              <span className="inline-flex items-center gap-2">
                <UserRound className="size-4" />
                {post.author.name}, {post.author.role}
              </span>
              <span className="inline-flex items-center gap-2">
                <CalendarDays className="size-4" />
                Updated {formatDate(post.updatedAt)}
              </span>
              <span className="inline-flex items-center gap-2">
                <Clock3 className="size-4" />
                {post.readingMinutes} min read
              </span>
            </div>
          </div>
        </header>

        <div className="container max-w-5xl py-12 sm:py-16">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_220px]">
            <div className="blog-content min-w-0 rounded-[24px] border border-ink/10 bg-white p-6 sm:p-10">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
                      target={href?.startsWith("http") ? "_blank" : undefined}
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
            <aside className="h-fit rounded-[20px] border border-ink/10 bg-cream p-5 lg:sticky lg:top-24">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-700">
                Article details
              </p>
              <p className="mt-4 text-xs leading-5 text-ink/55">
                Published {formatDate(post.publishedAt)}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-ink/10 bg-white px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </article>

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
