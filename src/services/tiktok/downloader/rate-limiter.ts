import { createHmac, randomBytes } from "node:crypto";

import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

export interface RateLimitResult {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
}

interface RateLimitBucket {
  count: number;
  resetAt: number;
}

export class FixedWindowRateLimiter {
  private readonly buckets = new Map<string, RateLimitBucket>();
  private readonly limit: number;
  private readonly now: () => number;
  private readonly windowMs: number;

  constructor(options: { limit: number; now?: () => number; windowMs: number }) {
    this.limit = options.limit;
    this.now = options.now ?? Date.now;
    this.windowMs = options.windowMs;
  }

  consume(key: string): RateLimitResult {
    const now = this.now();
    const current = this.buckets.get(key);
    const bucket =
      !current || current.resetAt <= now
        ? { count: 0, resetAt: now + this.windowMs }
        : current;

    bucket.count += 1;
    this.buckets.set(key, bucket);

    if (this.buckets.size > 10_000) {
      this.prune(now);
    }

    return {
      allowed: bucket.count <= this.limit,
      limit: this.limit,
      remaining: Math.max(0, this.limit - bucket.count),
      resetAt: bucket.resetAt,
    };
  }

  private prune(now: number): void {
    for (const [key, bucket] of this.buckets) {
      if (bucket.resetAt <= now) {
        this.buckets.delete(key);
      }
    }
  }
}

const processSalt = randomBytes(32);

export function anonymizeClientIdentifier(value: string): string {
  return createHmac("sha256", processSalt).update(value).digest("hex");
}

export const downloaderRateLimiter = new FixedWindowRateLimiter({
  limit: 8,
  windowMs: 60_000,
});

let distributedRateLimiter: Ratelimit | undefined;

function getDistributedRateLimiter(): Ratelimit | undefined {
  const url = process.env.UPSTASH_REDIS_REST_URL?.trim();
  const token = process.env.UPSTASH_REDIS_REST_TOKEN?.trim();

  if (!url || !token) {
    return undefined;
  }

  distributedRateLimiter ??= new Ratelimit({
    analytics: false,
    limiter: Ratelimit.slidingWindow(8, "1 m"),
    prefix: "toklens:downloader:preview",
    redis: new Redis({ token, url }),
  });

  return distributedRateLimiter;
}

export async function consumeDownloaderRateLimit(
  identifier: string,
): Promise<RateLimitResult> {
  const limiter = getDistributedRateLimiter();

  if (!limiter) {
    return downloaderRateLimiter.consume(identifier);
  }

  const result = await limiter.limit(identifier);

  return {
    allowed: result.success,
    limit: result.limit,
    remaining: result.remaining,
    resetAt: result.reset,
  };
}
