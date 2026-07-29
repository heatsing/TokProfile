import { describe, expect, it } from "vitest";

import { FixedWindowRateLimiter } from "../rate-limiter";

describe("FixedWindowRateLimiter", () => {
  it("blocks requests over the limit and resets after the window", () => {
    let now = 1_000;
    const limiter = new FixedWindowRateLimiter({
      limit: 2,
      now: () => now,
      windowMs: 1_000,
    });

    expect(limiter.consume("client")).toMatchObject({
      allowed: true,
      remaining: 1,
    });
    expect(limiter.consume("client")).toMatchObject({
      allowed: true,
      remaining: 0,
    });
    expect(limiter.consume("client")).toMatchObject({
      allowed: false,
      remaining: 0,
    });

    now = 2_001;

    expect(limiter.consume("client")).toMatchObject({
      allowed: true,
      remaining: 1,
    });
  });

  it("tracks different anonymized clients independently", () => {
    const limiter = new FixedWindowRateLimiter({
      limit: 1,
      windowMs: 1_000,
    });

    expect(limiter.consume("client-a").allowed).toBe(true);
    expect(limiter.consume("client-a").allowed).toBe(false);
    expect(limiter.consume("client-b").allowed).toBe(true);
  });
});
