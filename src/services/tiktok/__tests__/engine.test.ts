import { describe, expect, it } from "vitest";

import { analyticsService } from "../analytics.service";
import { TikTokToolEngine, tiktokToolEngine } from "../engine";
import { profileService } from "../profile.service";

describe("TikTokToolEngine", () => {
  it("registers every supported tool", () => {
    expect(tiktokToolEngine.listTools()).toEqual([
      "profile",
      "video",
      "photo",
      "story",
      "analytics",
    ]);
  });

  it.each([
    ["@atlas.moves", "profile"],
    ["https://www.tiktok.com/@atlas.moves/video/7480000000000000000", "video"],
    ["https://www.tiktok.com/@atlas.moves/photo/7480000000000000000", "photo"],
    ["https://www.tiktok.com/@atlas.moves/story/7480000000000000000", "story"],
  ] as const)("infers %s as the %s tool", async (input, expectedTool) => {
    const result = await tiktokToolEngine.run({ input });

    expect(result.ok).toBe(true);
    expect(result.tool).toBe(expectedTool);
    expect(result.ok && result.data.kind).toBe(expectedTool);
  });

  it("runs analytics explicitly through the same engine", async () => {
    const result = await tiktokToolEngine.run({
      input: "@atlas.moves",
      tool: "analytics",
    });

    expect(result.ok).toBe(true);
    expect(result.tool).toBe("analytics");
    expect(result.ok && result.view.title).toBe("@atlas.moves analytics");
  });

  it("returns a typed error for a mismatched tool and input", async () => {
    const result = await tiktokToolEngine.run({
      input: "@atlas.moves",
      tool: "video",
    });

    expect(result.ok).toBe(false);
    expect(!result.ok && result.error.code).toBe("UNSUPPORTED_INPUT");
  });

  it("returns a retryable result for unresolved short links", async () => {
    const result = await tiktokToolEngine.run({
      input: "https://vm.tiktok.com/ZM123abc/",
    });

    expect(result.ok).toBe(false);
    expect(!result.ok && result.error).toMatchObject({
      code: "UNSUPPORTED_INPUT",
      retryable: true,
    });
  });

  it("supports a smaller registry without changing engine code", async () => {
    const engine = new TikTokToolEngine([profileService]);
    const profileResult = await engine.run({ input: "@atlas.moves" });
    const analyticsResult = await engine.run({
      input: "@atlas.moves",
      tool: "analytics",
    });

    expect(profileResult.ok).toBe(true);
    expect(analyticsResult.ok).toBe(false);
    expect(!analyticsResult.ok && analyticsResult.error.code).toBe("TOOL_NOT_REGISTERED");
  });

  it("prevents accidental duplicate service registration", () => {
    const engine = new TikTokToolEngine([analyticsService]);

    expect(() => engine.register(analyticsService)).toThrow(
      "A service is already registered for analytics.",
    );
  });
});
