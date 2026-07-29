import { describe, expect, it } from "vitest";

import { MemoryCreatorSnapshotRepository } from "../memory-snapshot.repository";
import { MemoryCreatorSnapshotCache } from "../snapshot-cache";
import {
  CreatorSnapshotService,
  SnapshotCaptureRateLimitError,
} from "../snapshot.service";
import type {
  AuthorizedCreatorSnapshot,
  CreatorSnapshotProvider,
} from "../snapshot-types";

const snapshot: AuthorizedCreatorSnapshot = {
  capturedAt: "2026-07-26T12:00:00.000Z",
  creator: { username: "creator" },
  posts: [
    {
      comments: 3,
      id: "123",
      likes: 50,
      publishedAt: "2026-07-20T12:00:00.000Z",
      shares: 2,
      views: 1_000,
    },
  ],
  sourceAccess: "creator_authorized",
  sourceProvider: "tiktok_display_api",
  windowEnd: "2026-07-26T12:00:00.000Z",
  windowStart: "2026-07-20T12:00:00.000Z",
};

function createService(options: { allowed?: boolean } = {}) {
  const repository = new MemoryCreatorSnapshotRepository();
  const provider: CreatorSnapshotProvider = {
    id: "tiktok_display_api",
    async capture() {
      return snapshot;
    },
  };
  const service = new CreatorSnapshotService({
    cache: new MemoryCreatorSnapshotCache(),
    provider,
    rateLimiter: {
      async consume() {
        return {
          allowed: options.allowed ?? true,
          resetAt: 123,
        };
      },
    },
    repository,
  });

  return { repository, service };
}

describe("creator snapshot service", () => {
  it("captures, persists and serves an authorized snapshot from cache", async () => {
    const { repository, service } = createService();

    await service.capture({
      accessToken: "secret",
      expectedUsername: "creator",
      rateLimitKey: "account-id",
    });
    const lookup = await service.findLatest("@Creator");

    expect(lookup.status).toBe("available");
    expect(lookup.cacheStatus).toBe("hit");
    expect(lookup.snapshot?.creator.username).toBe("creator");
    expect(await repository.findLatest("creator")).not.toBeNull();
  });

  it("returns unavailable when no snapshot exists", async () => {
    const { service } = createService();
    await expect(service.findLatest("missing")).resolves.toEqual({
      cacheStatus: "miss",
      snapshot: null,
      status: "unavailable",
    });
  });

  it("stops before provider access when the capture limit is exceeded", async () => {
    const { service } = createService({ allowed: false });

    await expect(
      service.capture({
        accessToken: "secret",
        rateLimitKey: "account-id",
      }),
    ).rejects.toBeInstanceOf(SnapshotCaptureRateLimitError);
  });
});
