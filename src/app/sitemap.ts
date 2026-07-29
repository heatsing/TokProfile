import type { MetadataRoute } from "next";

import { publicEnv } from "@/config/env";
import { getAllBlogPosts } from "@/services/content/blog";
import { getAllToolPages } from "@/services/content/tool-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = publicEnv.siteUrl;
  const posts = await getAllBlogPosts();
  const toolPages = await getAllToolPages();

  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/viewer`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date("2026-07-26"),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  return [
    ...routes,
    ...toolPages.map((page) => ({
      url: `${baseUrl}${page.route}`,
      lastModified: new Date(page.updatedAt),
      changeFrequency:
        page.template === "engagement-calculator"
          ? ("monthly" as const)
          : ("weekly" as const),
      priority:
        page.template === "video-downloader" || page.template === "engagement-calculator"
          ? 0.85
          : 0.9,
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
