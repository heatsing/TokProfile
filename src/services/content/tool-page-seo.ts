import type { Metadata } from "next";

import { siteConfig } from "@/config/site";
import type { ToolPageData } from "@/types/tool-page";

export function buildToolPageMetadata(
  page: ToolPageData,
  options: { noindex?: boolean; route?: string } = {},
): Metadata {
  const route = options.route ?? page.route;

  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: route },
    robots: options.noindex ? { follow: true, index: false } : undefined,
    openGraph: {
      type: "website",
      locale: "en_US",
      url: route,
      siteName: siteConfig.name,
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} ${page.h1}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${page.title} | ${siteConfig.name}`,
      description: page.description,
      images: ["/opengraph-image"],
    },
  };
}

export function buildToolPageStructuredData(
  page: ToolPageData,
  siteUrl: string,
  options: { route?: string } = {},
) {
  const route = options.route ?? page.route;
  const canonicalUrl = route === "/" ? siteUrl : `${siteUrl}${route}`;

  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
        ...(route === "/"
          ? []
          : [
              {
                "@type": "ListItem",
                position: 2,
                name: page.breadcrumb,
                item: canonicalUrl,
              },
            ]),
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
