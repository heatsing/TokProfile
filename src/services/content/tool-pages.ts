import "server-only";

import { cache } from "react";

import tiktokAnalytics from "@/data/tools/tiktok-analytics.json";
import tiktokEngagementRateCalculator from "@/data/tools/tiktok-engagement-rate-calculator.json";
import tiktokProfileViewer from "@/data/tools/tiktok-profile-viewer.json";
import tiktokVideoDownloader from "@/data/tools/tiktok-video-downloader.json";

import type { ToolPageData } from "@/types/tool-page";

import { parseToolPageData } from "./tool-page-schema";

const safeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const toolPageSources = [
  tiktokAnalytics,
  tiktokEngagementRateCalculator,
  tiktokProfileViewer,
  tiktokVideoDownloader,
] as const;

export const getAllToolPages = cache(async (): Promise<ToolPageData[]> => {
  const pages = toolPageSources.map((source) => parseToolPageData(source));
  const slugs = new Set<string>();

  for (const page of pages) {
    if (slugs.has(page.slug)) {
      throw new TypeError(`Duplicate tool page slug "${page.slug}".`);
    }
    slugs.add(page.slug);
  }

  return pages;
});

export const getToolPage = cache(async (slug: string): Promise<ToolPageData | null> => {
  if (!safeSlugPattern.test(slug)) {
    return null;
  }

  const source = toolPageSources.find((candidate) => candidate.slug === slug);
  return source ? parseToolPageData(source) : null;
});

export async function requireToolPage(slug: string) {
  const page = await getToolPage(slug);
  if (!page) {
    throw new TypeError(`Tool page "${slug}" is missing.`);
  }
  return page;
}
