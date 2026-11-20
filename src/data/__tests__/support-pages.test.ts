import { describe, expect, it } from "vitest";

import { footerNavigation, primaryNavigation } from "@/config/public-navigation";
import { supportPages } from "@/data/support-pages";

describe("support-page SEO and navigation policy", () => {
  it("keeps support metadata and H1 values unique", () => {
    const pages = Object.values(supportPages);

    expect(new Set(pages.map((page) => page.route)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.description)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.h1)).size).toBe(pages.length);
  });

  it("indexes only support pages that passed their release gate", () => {
    expect(
      Object.values(supportPages)
        .filter((page) => page.index)
        .map((page) => page.route)
        .sort(),
    ).toEqual(["/help", "/privacy"]);
  });

  it("does not expose unavailable media or viewer tools in public navigation", () => {
    const links = [
      ...primaryNavigation.flatMap((item) => ("href" in item ? [item.href] : [])),
      ...footerNavigation.flatMap((group) => group.items.map((item) => item.href)),
    ];

    expect(links).not.toContain("/tiktok-to-mp3");
    expect(links).not.toContain("/download-tiktok-stories");
    expect(links).not.toContain("/story-viewer");
    expect(links).not.toContain("/profile-viewer");
    expect(links).not.toContain("/viewer");
    expect(links).not.toContain("/tiktok-profile-viewer");
    expect(links).not.toContain("/tiktok-analytics");
  });
});
