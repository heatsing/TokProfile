import "server-only";

import { Redis } from "@upstash/redis";
import { createClient } from "@supabase/supabase-js";

import { publicEnv } from "@/config/env";
import { getServerEnv } from "@/config/server-env";

import { TikTokDisplayApiProvider } from "./display-api.provider";
import {
  MemoryCreatorSnapshotCache,
  UpstashCreatorSnapshotCache,
} from "./snapshot-cache";
import {
  LocalSnapshotCaptureRateLimiter,
  UpstashSnapshotCaptureRateLimiter,
} from "./snapshot-rate-limiter";
import { CreatorSnapshotService } from "./snapshot.service";
import { SupabaseCreatorSnapshotRepository } from "./supabase-snapshot.repository";

let snapshotService: CreatorSnapshotService | null | undefined;
let snapshotServiceInitialized = false;

function createSnapshotService() {
  const serverEnv = getServerEnv();
  const supabaseUrl = publicEnv.supabaseUrl;
  const serviceRoleKey = serverEnv.supabaseServiceRoleKey;

  if (!supabaseUrl || !serviceRoleKey) {
    return null;
  }

  const supabase = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const repository = new SupabaseCreatorSnapshotRepository(supabase);
  const provider = new TikTokDisplayApiProvider();

  if (serverEnv.upstashRedisRestUrl && serverEnv.upstashRedisRestToken) {
    const redis = new Redis({
      token: serverEnv.upstashRedisRestToken,
      url: serverEnv.upstashRedisRestUrl,
    });

    return new CreatorSnapshotService({
      cache: new UpstashCreatorSnapshotCache(redis),
      provider,
      rateLimiter: new UpstashSnapshotCaptureRateLimiter(redis),
      repository,
    });
  }

  return new CreatorSnapshotService({
    cache: new MemoryCreatorSnapshotCache(),
    provider,
    rateLimiter: new LocalSnapshotCaptureRateLimiter(),
    repository,
  });
}

function getSnapshotService() {
  if (!snapshotServiceInitialized) {
    snapshotService = createSnapshotService();
    snapshotServiceInitialized = true;
  }

  return snapshotService;
}

export async function findAuthorizedCreatorSnapshot(username: string) {
  const service = getSnapshotService();
  if (!service) {
    return null;
  }

  const result = await service.findLatest(username);
  return result.snapshot;
}

export async function captureAuthorizedCreatorSnapshot(input: {
  accessToken: string;
  expectedUsername?: string;
  rateLimitKey: string;
}) {
  const service = getSnapshotService();
  if (!service) {
    throw new Error(
      "Creator snapshot persistence is not configured. Supabase server credentials are required.",
    );
  }

  return service.capture(input);
}
