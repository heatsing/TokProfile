import { createHash } from "node:crypto";

import { Ratelimit } from "@upstash/ratelimit";
import type { Redis } from "@upstash/redis";

import { FixedWindowRateLimiter } from "@/services/tiktok/downloader/rate-limiter";

import type { SnapshotCaptureRateLimiter } from "./snapshot.service";

const localLimiter = new FixedWindowRateLimiter({
  limit: 6,
  windowMs: 15 * 60_000,
});

function stableIdentifier(value: string) {
  return createHash("sha256").update(value).digest("hex");
}

export class LocalSnapshotCaptureRateLimiter implements SnapshotCaptureRateLimiter {
  async consume(key: string) {
    return localLimiter.consume(stableIdentifier(key));
  }
}

export class UpstashSnapshotCaptureRateLimiter implements SnapshotCaptureRateLimiter {
  private readonly limiter: Ratelimit;

  constructor(redis: Redis) {
    this.limiter = new Ratelimit({
      analytics: false,
      limiter: Ratelimit.slidingWindow(6, "15 m"),
      prefix: "toklens:analytics:capture",
      redis,
    });
  }

  async consume(key: string) {
    const result = await this.limiter.limit(stableIdentifier(key));
    return { allowed: result.success, resetAt: result.reset };
  }
}
