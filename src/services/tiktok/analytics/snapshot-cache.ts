import type { Redis } from "@upstash/redis";

import type { AuthorizedCreatorSnapshot, CreatorSnapshotCache } from "./snapshot-types";
import { normalizeSnapshotUsername } from "./snapshot-validation";

const cacheTtlSeconds = 15 * 60;

interface MemoryEntry {
  expiresAt: number;
  snapshot: AuthorizedCreatorSnapshot;
}

export class MemoryCreatorSnapshotCache implements CreatorSnapshotCache {
  private readonly entries = new Map<string, MemoryEntry>();
  private readonly now: () => number;

  constructor(options: { now?: () => number } = {}) {
    this.now = options.now ?? Date.now;
  }

  async get(username: string) {
    const key = normalizeSnapshotUsername(username);
    const entry = this.entries.get(key);

    if (!entry || entry.expiresAt <= this.now()) {
      this.entries.delete(key);
      return null;
    }

    return entry.snapshot;
  }

  async set(snapshot: AuthorizedCreatorSnapshot) {
    this.entries.set(normalizeSnapshotUsername(snapshot.creator.username), {
      expiresAt: this.now() + cacheTtlSeconds * 1_000,
      snapshot,
    });
  }
}

export class UpstashCreatorSnapshotCache implements CreatorSnapshotCache {
  constructor(private readonly redis: Redis) {}

  private key(username: string) {
    return `toklens:analytics:snapshot:${normalizeSnapshotUsername(username)}`;
  }

  async get(username: string) {
    return this.redis.get<AuthorizedCreatorSnapshot>(this.key(username));
  }

  async set(snapshot: AuthorizedCreatorSnapshot) {
    await this.redis.set(this.key(snapshot.creator.username), snapshot, {
      ex: cacheTtlSeconds,
    });
  }
}
