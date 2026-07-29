import type {
  AuthorizedCreatorProfile,
  AuthorizedCreatorSnapshot,
} from "./snapshot-types";

const usernamePattern = /^[a-zA-Z0-9._]{2,24}$/;

export function normalizeSnapshotUsername(value: string) {
  const username = value.trim().replace(/^@/, "").toLowerCase();

  if (!usernamePattern.test(username)) {
    throw new TypeError("Snapshot username is invalid.");
  }

  return username;
}

export function assertSafeCount(value: unknown, field: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 0) {
    throw new TypeError(`${field} must be a non-negative safe integer.`);
  }

  return value;
}

export function optionalSafeCount(value: unknown, field: string) {
  return value === undefined || value === null
    ? undefined
    : assertSafeCount(value, field);
}

export function validateAuthorizedSnapshot(
  snapshot: AuthorizedCreatorSnapshot,
): AuthorizedCreatorSnapshot {
  const username = normalizeSnapshotUsername(snapshot.creator.username);
  const capturedAt = new Date(snapshot.capturedAt);
  const windowStart = new Date(snapshot.windowStart);
  const windowEnd = new Date(snapshot.windowEnd);

  if ([capturedAt, windowStart, windowEnd].some((date) => Number.isNaN(date.getTime()))) {
    throw new TypeError("Snapshot dates must be valid.");
  }

  if (windowEnd < windowStart || capturedAt < windowEnd) {
    throw new TypeError("Snapshot date window is inconsistent.");
  }

  if (
    snapshot.sourceAccess !== "creator_authorized" ||
    snapshot.sourceProvider !== "tiktok_display_api"
  ) {
    throw new TypeError("Snapshot source is not authorized.");
  }

  const creator: AuthorizedCreatorProfile = {
    ...snapshot.creator,
    followerCount: optionalSafeCount(snapshot.creator.followerCount, "followerCount"),
    followingCount: optionalSafeCount(snapshot.creator.followingCount, "followingCount"),
    likesCount: optionalSafeCount(snapshot.creator.likesCount, "likesCount"),
    username,
    videoCount: optionalSafeCount(snapshot.creator.videoCount, "videoCount"),
  };

  const posts = snapshot.posts.map((post) => ({
    ...post,
    comments: assertSafeCount(post.comments, "comments"),
    likes: assertSafeCount(post.likes, "likes"),
    shares: assertSafeCount(post.shares, "shares"),
    views: assertSafeCount(post.views, "views"),
  }));

  return { ...snapshot, creator, posts };
}
