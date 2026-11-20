import { describe, expect, it } from "vitest";

import {
  footerNavigation,
  groupedNavigation,
  primaryNavigation,
} from "@/config/public-navigation";
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

  it("exposes the approved navigation routes without publishing Photo Downloader early", () => {
    const links = [
      ...primaryNavigation.map((item) => item.href),
      ...footerNavigation.flatMap((group) => group.items.map((item) => item.href)),
    ];

    expect(links).toEqual(
      expect.arrayContaining([
        "/#download",
        "/download-tiktok-stories",
        "/tiktok-to-mp3",
        "/story-viewer",
        "/profile-viewer",
      ]),
    );
    expect(links).not.toContain("/download-tiktok-photos");
    expect(links).not.toContain("/viewer");
    expect(links).not.toContain("/tiktok-profile-viewer");
    expect(links).not.toContain("/tiktok-analytics");
  });

  it("keeps both viewer links in the Viewers menu", () => {
    const viewers = groupedNavigation.find((group) => group.label === "Viewers");

    expect(viewers?.items).toEqual([
      { href: "/story-viewer", label: "Story Viewer" },
      { href: "/profile-viewer", label: "Profile Viewer" },
    ]);
  });

  it("lists the requested downloaders before Viewers without linking unreleased tools", () => {
    expect(groupedNavigation.map((group) => group.label)).toEqual([
      "TikTok Downloaders",
      "Viewers",
    ]);
    expect(groupedNavigation[0].items).toEqual([
      { href: null, label: "Downloader TikTok Photo" },
      { href: "/tiktok-to-mp3", label: "Download TikTok Audio" },
      { href: null, label: "Downloader TikTok Slide" },
      { href: null, label: "Downloader TikTok Notes" },
    ]);
  });
});
