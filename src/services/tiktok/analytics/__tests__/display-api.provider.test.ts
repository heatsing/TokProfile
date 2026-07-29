import { afterEach, describe, expect, it, vi } from "vitest";

import { TikTokDisplayApiProvider } from "../display-api.provider";

const userResponse = {
  data: {
    user: {
      follower_count: 10_000,
      open_id: "authorized-id",
      username: "creator",
    },
  },
  error: { code: "ok" },
};
const videoResponse = {
  data: {
    videos: [
      {
        comment_count: 10,
        create_time: 1_753_012_800,
        id: "123456789",
        like_count: 200,
        share_count: 5,
        video_description: "A post",
        view_count: 2_000,
      },
    ],
  },
  error: { code: "ok" },
};

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("TikTok Display API provider", () => {
  it("maps creator-authorized profile and video responses", async () => {
    const fetchMock = vi
      .fn()
      .mockResolvedValueOnce(
        new Response(JSON.stringify(userResponse), {
          headers: { "Content-Type": "application/json" },
        }),
      )
      .mockResolvedValueOnce(
        new Response(JSON.stringify(videoResponse), {
          headers: { "Content-Type": "application/json" },
        }),
      );
    vi.stubGlobal("fetch", fetchMock);
    const provider = new TikTokDisplayApiProvider({
      now: () => new Date("2026-07-26T12:00:00.000Z"),
    });

    const snapshot = await provider.capture({
      accessToken: "creator-token",
      expectedUsername: "@Creator",
    });

    expect(snapshot.creator).toMatchObject({
      followerCount: 10_000,
      sourceAccountId: "authorized-id",
      username: "creator",
    });
    expect(snapshot.posts[0]).toMatchObject({
      comments: 10,
      id: "123456789",
      likes: 200,
      shares: 5,
      views: 2_000,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    const headers = new Headers(fetchMock.mock.calls[0]?.[1]?.headers);
    expect(headers.get("Authorization")).toBe("Bearer creator-token");
    expect(headers.get("Accept")).toBe("application/json");
  });

  it("rejects an authorized account mismatch", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue(
        new Response(JSON.stringify(userResponse), {
          headers: { "Content-Type": "application/json" },
        }),
      ),
    );
    const provider = new TikTokDisplayApiProvider();

    await expect(
      provider.capture({
        accessToken: "creator-token",
        expectedUsername: "another_creator",
      }),
    ).rejects.toMatchObject({
      code: "account_mismatch",
    });
  });
});
