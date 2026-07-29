import type { AnalyticsPostInput } from "./calculations";

export interface AuthorizedCreatorProfile {
  avatarUrl?: string;
  bioDescription?: string;
  displayName?: string;
  followerCount?: number;
  followingCount?: number;
  isVerified?: boolean;
  likesCount?: number;
  sourceAccountId?: string;
  username: string;
  videoCount?: number;
}

export interface AuthorizedCreatorSnapshot {
  capturedAt: string;
  creator: AuthorizedCreatorProfile;
  posts: Array<AnalyticsPostInput & { shareUrl?: string }>;
  sourceAccess: "creator_authorized";
  sourceProvider: "tiktok_display_api";
  windowEnd: string;
  windowStart: string;
}

export interface CaptureSnapshotRequest {
  accessToken: string;
  expectedUsername?: string;
}

export interface CreatorSnapshotProvider {
  readonly id: AuthorizedCreatorSnapshot["sourceProvider"];
  capture(request: CaptureSnapshotRequest): Promise<AuthorizedCreatorSnapshot>;
}

export interface CreatorSnapshotRepository {
  findLatest(username: string): Promise<AuthorizedCreatorSnapshot | null>;
  save(snapshot: AuthorizedCreatorSnapshot): Promise<void>;
}

export interface CreatorSnapshotCache {
  get(username: string): Promise<AuthorizedCreatorSnapshot | null>;
  set(snapshot: AuthorizedCreatorSnapshot): Promise<void>;
}

export type SnapshotLookupResult =
  | {
      cacheStatus: "hit" | "miss";
      snapshot: AuthorizedCreatorSnapshot;
      status: "available";
    }
  | {
      cacheStatus: "miss";
      snapshot: null;
      status: "unavailable";
    };
