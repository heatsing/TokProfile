import { describe, expect, it } from "vitest";

import { calculateFollowerEngagementRate } from "../engagement-calculator";

describe("follower engagement rate calculator", () => {
  it("calculates and rounds the estimated rate", () => {
    const result = calculateFollowerEngagementRate({
      averageComments: 80,
      averageLikes: 1_200,
      averageShares: 40,
      followers: 25_000,
    });

    expect(result.rate).toBe(5.28);
    expect(result.estimated).toBe(true);
    expect(result.officialTikTokData).toBe(false);
  });

  it("rejects a zero follower denominator", () => {
    expect(() =>
      calculateFollowerEngagementRate({
        averageComments: 0,
        averageLikes: 0,
        averageShares: 0,
        followers: 0,
      }),
    ).toThrow("followers must be a positive number");
  });
});
