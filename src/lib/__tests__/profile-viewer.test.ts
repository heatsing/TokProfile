import { describe, expect, it } from "vitest";

import {
  createProfileTabHref,
  createProfileViewerState,
  resolveProfileViewTab,
} from "../profile-viewer";
import type { TikTokProfile, TikTokToolResult } from "@/types/tiktok";

const baseProfile: TikTokProfile = {
  kind: "profile",
  profileUrl: "https://www.tiktok.com/@atlas.moves",
  source: {
    access: "public",
    platform: "tiktok",
    retrievedAt: "2026-07-26T00:00:00.000Z",
    status: "available",
  },
  username: "atlas.moves",
  visibility: "public",
};

function createProfileResult(profile: TikTokProfile): TikTokToolResult {
  return {
    data: profile,
    input: {
      kind: "username",
      normalized: "@atlas.moves",
      raw: "@atlas.moves",
      username: "atlas.moves",
    },
    ok: true,
    tool: "profile",
    view: {
      description: "Profile result",
      eyebrow: "Public profile",
      sections: [],
      title: "@atlas.moves",
    },
  };
}

describe("profile viewer state", () => {
  it("returns the empty state before a search", () => {
    expect(createProfileViewerState(undefined)).toEqual({ status: "empty" });
  });

  it("returns the private account state without exposing metrics", () => {
    const result = createProfileResult({
      ...baseProfile,
      visibility: "private",
    });

    expect(createProfileViewerState(result)).toMatchObject({
      profile: { username: "atlas.moves" },
      status: "private",
    });
  });

  it("returns the public result state", () => {
    expect(createProfileViewerState(createProfileResult(baseProfile))).toMatchObject({
      status: "success",
    });
  });

  it("preserves tool errors", () => {
    const result: TikTokToolResult = {
      data: null,
      error: {
        code: "INVALID_USERNAME",
        message: "Invalid username",
        retryable: false,
      },
      ok: false,
      tool: "profile",
    };

    expect(createProfileViewerState(result)).toEqual({
      error: result.error,
      status: "error",
    });
  });
});

describe("profile viewer tabs", () => {
  it.each(["overview", "videos", "analytics"] as const)("accepts the %s tab", (tab) => {
    expect(resolveProfileViewTab(tab)).toBe(tab);
  });

  it("falls back to overview for unknown tabs", () => {
    expect(resolveProfileViewTab("growth")).toBe("overview");
  });

  it("builds encoded tab URLs", () => {
    expect(createProfileTabHref("@atlas.moves", "analytics")).toBe(
      "/tiktok-profile-viewer?q=%40atlas.moves&tab=analytics",
    );
  });
});
