import { HttpError, requestJson } from "@/services/http-client";

import type {
  AuthorizedCreatorSnapshot,
  CaptureSnapshotRequest,
  CreatorSnapshotProvider,
} from "./snapshot-types";
import {
  assertSafeCount,
  normalizeSnapshotUsername,
  optionalSafeCount,
  validateAuthorizedSnapshot,
} from "./snapshot-validation";

const apiOrigin = "https://open.tiktokapis.com";
const userFields = [
  "open_id",
  "username",
  "display_name",
  "avatar_url",
  "bio_description",
  "is_verified",
  "follower_count",
  "following_count",
  "likes_count",
  "video_count",
].join(",");
const videoFields = [
  "id",
  "create_time",
  "share_url",
  "video_description",
  "like_count",
  "comment_count",
  "share_count",
  "view_count",
].join(",");

interface TikTokError {
  code?: string;
  log_id?: string;
  message?: string;
}

interface TikTokUserResponse {
  data?: {
    user?: {
      avatar_url?: string;
      bio_description?: string;
      display_name?: string;
      follower_count?: number;
      following_count?: number;
      is_verified?: boolean;
      likes_count?: number;
      open_id?: string;
      username?: string;
      video_count?: number;
    };
  };
  error?: TikTokError;
}

interface TikTokVideoListResponse {
  data?: {
    cursor?: number;
    has_more?: boolean;
    videos?: Array<{
      comment_count?: number;
      create_time?: number;
      id?: string;
      like_count?: number;
      share_count?: number;
      share_url?: string;
      video_description?: string;
      view_count?: number;
    }>;
  };
  error?: TikTokError;
}

export class TikTokDisplayApiError extends Error {
  readonly code: string;
  readonly retryable: boolean;

  constructor(message: string, code: string, retryable = false) {
    super(message);
    this.name = "TikTokDisplayApiError";
    this.code = code;
    this.retryable = retryable;
  }
}

function assertTikTokSuccess(error: TikTokError | undefined) {
  if (error?.code && error.code !== "ok") {
    throw new TikTokDisplayApiError(
      error.message || "TikTok Display API request failed.",
      error.code,
      error.code === "rate_limit_exceeded",
    );
  }
}

function requiredString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new TikTokDisplayApiError(
      `TikTok response is missing ${field}.`,
      "invalid_response",
    );
  }

  return value.trim();
}

async function callTikTok<T>(path: string, accessToken: string, init?: RequestInit) {
  const headers = new Headers(init?.headers);
  headers.set("Authorization", `Bearer ${accessToken}`);
  headers.set("Content-Type", "application/json");
  const { signal, ...requestOptions } = init ?? {};

  try {
    return await requestJson<T>(`${apiOrigin}${path}`, {
      ...requestOptions,
      ...(signal ? { signal } : {}),
      headers,
      timeoutMs: 8_000,
    });
  } catch (error) {
    if (error instanceof HttpError && error.status === 429) {
      throw new TikTokDisplayApiError(
        "TikTok Display API rate limit reached.",
        "rate_limit_exceeded",
        true,
      );
    }

    throw error;
  }
}

export class TikTokDisplayApiProvider implements CreatorSnapshotProvider {
  readonly id = "tiktok_display_api" as const;
  private readonly now: () => Date;

  constructor(options: { now?: () => Date } = {}) {
    this.now = options.now ?? (() => new Date());
  }

  async getIdentity(request: CaptureSnapshotRequest) {
    const accessToken = request.accessToken.trim();
    if (!accessToken) {
      throw new TikTokDisplayApiError(
        "A creator-authorized access token is required.",
        "missing_access_token",
      );
    }

    const userResponse = await callTikTok<TikTokUserResponse>(
      `/v2/user/info/?fields=${encodeURIComponent(userFields)}`,
      accessToken,
    );
    assertTikTokSuccess(userResponse.error);

    const user = userResponse.data?.user;
    const username = normalizeSnapshotUsername(
      requiredString(user?.username, "username"),
    );
    if (
      request.expectedUsername &&
      normalizeSnapshotUsername(request.expectedUsername) !== username
    ) {
      throw new TikTokDisplayApiError(
        "The authorized TikTok account does not match the requested creator.",
        "account_mismatch",
      );
    }

    return {
      avatarUrl: user?.avatar_url,
      bioDescription: user?.bio_description,
      displayName: user?.display_name,
      followerCount: optionalSafeCount(user?.follower_count, "follower_count"),
      followingCount: optionalSafeCount(user?.following_count, "following_count"),
      isVerified: user?.is_verified,
      likesCount: optionalSafeCount(user?.likes_count, "likes_count"),
      sourceAccountId: user?.open_id,
      username,
      videoCount: optionalSafeCount(user?.video_count, "video_count"),
    };
  }

  async capture(request: CaptureSnapshotRequest): Promise<AuthorizedCreatorSnapshot> {
    const accessToken = request.accessToken.trim();
    const creator = await this.getIdentity(request);
    const videoResponse = await callTikTok<TikTokVideoListResponse>(
      `/v2/video/list/?fields=${encodeURIComponent(videoFields)}`,
      accessToken,
      {
        body: JSON.stringify({ max_count: 20 }),
        method: "POST",
      },
    );
    assertTikTokSuccess(videoResponse.error);

    const capturedAt = this.now();
    const posts = (videoResponse.data?.videos ?? []).map((video) => {
      const id = requiredString(video.id, "video id");
      const createTime = assertSafeCount(video.create_time, "create_time");

      return {
        comments: assertSafeCount(video.comment_count, "comment_count"),
        description: video.video_description,
        id,
        likes: assertSafeCount(video.like_count, "like_count"),
        publishedAt: new Date(createTime * 1_000).toISOString(),
        shareUrl: video.share_url,
        shares: assertSafeCount(video.share_count, "share_count"),
        views: assertSafeCount(video.view_count, "view_count"),
      };
    });
    const windowStart =
      posts.reduce(
        (oldest, post) =>
          new Date(post.publishedAt) < oldest ? new Date(post.publishedAt) : oldest,
        capturedAt,
      ) ?? capturedAt;

    return validateAuthorizedSnapshot({
      capturedAt: capturedAt.toISOString(),
      creator,
      posts,
      sourceAccess: "creator_authorized",
      sourceProvider: this.id,
      windowEnd: capturedAt.toISOString(),
      windowStart: windowStart.toISOString(),
    });
  }
}
