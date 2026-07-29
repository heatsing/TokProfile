import { describe, expect, it } from "vitest";

import { calculateCreatorAnalytics, calculatePostEngagementRate } from "../calculations";

const posts = [
  {
    comments: 50,
    id: "one",
    likes: 1_000,
    publishedAt: "2026-07-01T12:00:00.000Z",
    shares: 25,
    views: 10_000,
  },
  {
    comments: 100,
    id: "two",
    likes: 2_000,
    publishedAt: "2026-07-07T12:00:00.000Z",
    shares: 50,
    views: 20_000,
  },
];

describe("creator analytics calculations", () => {
  it("calculates averages, view-based engagement and weekly posting frequency", () => {
    const report = calculateCreatorAnalytics({
      posts,
      username: "creator",
      windowEnd: "2026-07-14T00:00:00.000Z",
      windowStart: "2026-07-01T00:00:00.000Z",
    });

    expect(report.metrics.averageViews.value).toBe(15_000);
    expect(report.metrics.averageLikes.value).toBe(1_500);
    expect(report.metrics.engagementRate.value).toBe(10.75);
    expect(report.metrics.postingFrequency.value).toBe(1);
    expect(report.topPerformingPosts.map((post) => post.id)).toEqual(["two", "one"]);
    expect(report.disclosure).toEqual({
      estimated: true,
      methodologyVersion: "1.0",
      officialTikTokData: false,
    });
  });

  it("returns unavailable values for an empty sample instead of zero", () => {
    const report = calculateCreatorAnalytics({
      posts: [],
      username: "creator",
      windowEnd: "2026-07-01",
      windowStart: "2026-07-01",
    });

    expect(report.metrics.averageViews.value).toBeNull();
    expect(report.metrics.engagementRate.value).toBeNull();
    expect(report.metrics.postingFrequency.value).toBeNull();
  });

  it("does not divide by zero for a post without views", () => {
    expect(
      calculatePostEngagementRate({
        comments: 2,
        likes: 10,
        shares: 1,
        views: 0,
      }),
    ).toBeNull();
  });

  it("rejects invalid counts and date windows", () => {
    expect(() =>
      calculateCreatorAnalytics({
        posts: [{ ...posts[0], likes: -1 }],
        username: "creator",
        windowEnd: "2026-07-14",
        windowStart: "2026-07-01",
      }),
    ).toThrow("likes must be a non-negative safe integer");

    expect(() =>
      calculateCreatorAnalytics({
        posts,
        username: "creator",
        windowEnd: "2026-07-01",
        windowStart: "2026-07-14",
      }),
    ).toThrow("windowEnd must be on or after windowStart");
  });
});
