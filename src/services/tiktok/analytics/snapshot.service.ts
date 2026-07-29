import type {
  CaptureSnapshotRequest,
  CreatorSnapshotCache,
  CreatorSnapshotProvider,
  CreatorSnapshotRepository,
  SnapshotLookupResult,
} from "./snapshot-types";
import {
  normalizeSnapshotUsername,
  validateAuthorizedSnapshot,
} from "./snapshot-validation";

export interface SnapshotCaptureRateLimiter {
  consume(key: string): Promise<{ allowed: boolean; resetAt: number }>;
}

export class SnapshotCaptureRateLimitError extends Error {
  readonly resetAt: number;

  constructor(resetAt: number) {
    super("Creator snapshot capture rate limit reached.");
    this.name = "SnapshotCaptureRateLimitError";
    this.resetAt = resetAt;
  }
}

export class CreatorSnapshotService {
  constructor(
    private readonly dependencies: {
      cache: CreatorSnapshotCache;
      provider: CreatorSnapshotProvider;
      rateLimiter: SnapshotCaptureRateLimiter;
      repository: CreatorSnapshotRepository;
    },
  ) {}

  async findLatest(username: string): Promise<SnapshotLookupResult> {
    const normalized = normalizeSnapshotUsername(username);
    const cached = await this.dependencies.cache.get(normalized);

    if (cached) {
      return {
        cacheStatus: "hit",
        snapshot: validateAuthorizedSnapshot(cached),
        status: "available",
      };
    }

    const stored = await this.dependencies.repository.findLatest(normalized);
    if (!stored) {
      return { cacheStatus: "miss", snapshot: null, status: "unavailable" };
    }

    const snapshot = validateAuthorizedSnapshot(stored);
    await this.dependencies.cache.set(snapshot);

    return { cacheStatus: "miss", snapshot, status: "available" };
  }

  async capture(
    request: CaptureSnapshotRequest & { rateLimitKey: string },
  ): Promise<SnapshotLookupResult> {
    const rateLimit = await this.dependencies.rateLimiter.consume(request.rateLimitKey);

    if (!rateLimit.allowed) {
      throw new SnapshotCaptureRateLimitError(rateLimit.resetAt);
    }

    const snapshot = validateAuthorizedSnapshot(
      await this.dependencies.provider.capture(request),
    );
    await this.dependencies.repository.save(snapshot);
    await this.dependencies.cache.set(snapshot);

    return { cacheStatus: "miss", snapshot, status: "available" };
  }
}
