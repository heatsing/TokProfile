import { describe, expect, it } from "vitest";

import { TikTokToolError } from "../errors";
import { parseTikTokInput } from "../input-parser";

describe("parseTikTokInput", () => {
  it("normalizes a username", () => {
    expect(parseTikTokInput("  @Atlas.Moves  ")).toMatchObject({
      kind: "username",
      normalized: "@Atlas.Moves",
      username: "Atlas.Moves",
    });
  });

  it("detects a profile URL without a protocol", () => {
    expect(parseTikTokInput("www.tiktok.com/@atlas.moves")).toMatchObject({
      kind: "profile_url",
      username: "atlas.moves",
      url: "https://www.tiktok.com/@atlas.moves",
    });
  });

  it.each([
    ["video", "video_url"],
    ["photo", "photo_url"],
    ["story", "story_url"],
  ] as const)("detects a %s URL", (contentType, expectedKind) => {
    expect(
      parseTikTokInput(
        `https://www.tiktok.com/@atlas.moves/${contentType}/7480000000000000000`,
      ),
    ).toMatchObject({
      contentId: "7480000000000000000",
      kind: expectedKind,
      username: "atlas.moves",
    });
  });

  it("detects a TikTok short URL without guessing its content type", () => {
    expect(parseTikTokInput("https://vm.tiktok.com/ZM123abc/")).toMatchObject({
      kind: "short_url",
    });
  });

  it.each([
    ["", "EMPTY_INPUT"],
    ["@", "INVALID_USERNAME"],
    ["https://example.com/@atlas.moves", "UNSUPPORTED_URL"],
    ["http://www.tiktok.com/@atlas.moves", "INVALID_URL"],
    ["https://user:pass@www.tiktok.com/@atlas.moves", "INVALID_URL"],
    ["https://www.tiktok.com/explore", "UNSUPPORTED_URL"],
  ])("rejects invalid input %#", (input, expectedCode) => {
    expect.assertions(2);

    try {
      parseTikTokInput(input);
    } catch (error) {
      expect(error).toBeInstanceOf(TikTokToolError);
      expect((error as TikTokToolError).code).toBe(expectedCode);
    }
  });
});
