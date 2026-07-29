import { promises as fs } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { auditToolPageCollection } from "../tool-page-quality";
import { parseToolPageData } from "../tool-page-schema";

async function loadToolPages() {
  const directory = path.join(process.cwd(), "src", "data", "tools");
  const filenames = (await fs.readdir(directory))
    .filter((filename) => filename.endsWith(".json"))
    .sort();

  return Promise.all(
    filenames.map(async (filename) =>
      parseToolPageData(
        JSON.parse(await fs.readFile(path.join(directory, filename), "utf8")) as unknown,
      ),
    ),
  );
}

describe("programmatic tool-page SEO quality", () => {
  it("accepts every JSON page and keeps route, title and metadata unique", async () => {
    const pages = await loadToolPages();

    expect(pages.length).toBeGreaterThanOrEqual(4);
    expect(new Set(pages.map((page) => page.slug)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.route)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.h1)).size).toBe(pages.length);
  });

  it("rejects repeated intros, FAQs, examples, weak related links and low uniqueness", async () => {
    const pages = await loadToolPages();
    const audit = auditToolPageCollection(pages);

    expect(audit.issues).toEqual([]);
    for (const ratio of Object.values(audit.uniqueContentRatios)) {
      expect(ratio).toBeGreaterThan(0.7);
    }
  });
});
