import type { Metadata } from "next";

import type { ToolPageData } from "@/types/tool-page";

export function buildToolPageMetadata(
  page: ToolPageData,
  options: { noindex?: boolean } = {},
): Metadata {
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: page.route },
    robots: options.noindex ? { follow: true, index: false } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: page.route,
      siteName: "TokLens",
      title: `${page.title} | TokLens`,
      description: page.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `TokLens ${page.h1}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | TokLens`,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}

export function buildToolPageStructuredData(page: ToolPageData, siteUrl: string) {
  const canonicalUrl = `${siteUrl}${page.route}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: page.breadcrumb,
          item: canonicalUrl,
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: page.h1,
      url: canonicalUrl,
      description: page.description,
      applicationCategory: page.applicationCategory,
      browserRequirements: "Requires a modern web browser with JavaScript enabled.",
      keywords: page.keywords.join(", "),
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      operatingSystem: "Any",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
  ] as const;
}
