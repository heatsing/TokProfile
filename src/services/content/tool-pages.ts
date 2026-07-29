import "server-only";

import { cache } from "react";
import { promises as fs } from "node:fs";
import path from "node:path";

import type { ToolPageData } from "@/types/tool-page";

import { parseToolPageData } from "./tool-page-schema";

const toolPageDirectory = path.join(process.cwd(), "src", "data", "tools");
const safeSlugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

async function readToolPageFile(filename: string) {
  const source = await fs.readFile(path.join(toolPageDirectory, filename), "utf8");
  return parseToolPageData(JSON.parse(source) as unknown);
}

export const getAllToolPages = cache(async (): Promise<ToolPageData[]> => {
  const filenames = (await fs.readdir(toolPageDirectory))
    .filter((filename) => filename.endsWith(".json"))
    .sort();
  const pages = await Promise.all(filenames.map(readToolPageFile));
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

  try {
    return await readToolPageFile(`${slug}.json`);
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    throw error;
  }
});

export async function requireToolPage(slug: string) {
  const page = await getToolPage(slug);
  if (!page) {
    throw new TypeError(`Tool page "${slug}" is missing.`);
  }
  return page;
}
