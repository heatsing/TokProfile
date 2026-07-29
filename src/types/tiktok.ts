export const TIKTOK_TOOL_TYPES = [
  "profile",
  "video",
  "photo",
  "story",
  "analytics",
] as const;

export type TikTokToolType = (typeof TIKTOK_TOOL_TYPES)[number];

export type TikTokInputKind =
  "username" | "profile_url" | "video_url" | "photo_url" | "story_url" | "short_url";

export interface ParsedTikTokInput {
  contentId?: string;
  kind: TikTokInputKind;
  normalized: string;
  raw: string;
  url?: string;
  username?: string;
}

export interface TikTokPublicSource {
  access: "public";
  platform: "tiktok";
  retrievedAt: string;
  status: "available" | "unavailable" | "unverified";
}

export interface TikTokEngagementCounts {
  comments?: number;
  followers?: number;
  following?: number;
  likes?: number;
  plays?: number;
  posts?: number;
  saves?: number;
  shares?: number;
}

export interface TikTokProfile {
  avatarUrl?: string;
  bio?: string;
  counts?: TikTokEngagementCounts;
  displayName?: string;
  kind: "profile";
  profileUrl: string;
  source: TikTokPublicSource;
  username: string;
  verified?: boolean;
  visibility: "private" | "public" | "unknown";
}

export interface TikTokVideo {
  authorUsername?: string;
  caption?: string;
  contentUrl: string;
  counts?: TikTokEngagementCounts;
  coverUrl?: string;
  id: string;
  kind: "video";
  mediaUrl?: string;
  source: TikTokPublicSource;
}

export interface TikTokPhoto {
  authorUsername?: string;
  caption?: string;
  contentUrl: string;
  counts?: TikTokEngagementCounts;
  id: string;
  imageUrls?: string[];
  kind: "photo";
  source: TikTokPublicSource;
}

export interface TikTokStory {
  authorUsername?: string;
  contentUrl?: string;
  expiresAt?: string;
  id?: string;
  kind: "story";
  source: TikTokPublicSource;
  username: string;
}

export interface TikTokAnalytics {
  account: Pick<TikTokProfile, "profileUrl" | "username">;
  engagementRate?: number;
  kind: "analytics";
  period: {
    end?: string;
    label: string;
    start?: string;
  };
  source: TikTokPublicSource;
  totals?: TikTokEngagementCounts;
}

export interface TikTokToolDataMap {
  analytics: TikTokAnalytics;
  photo: TikTokPhoto;
  profile: TikTokProfile;
  story: TikTokStory;
  video: TikTokVideo;
}

export interface ToolDisplayField {
  label: string;
  value: string;
}

export interface ToolDisplaySection {
  fields: ToolDisplayField[];
  title: string;
}

export interface ToolResultViewModel {
  description: string;
  eyebrow: string;
  sections: ToolDisplaySection[];
  title: string;
}

export interface TikTokToolRequest {
  input: string;
  tool?: TikTokToolType;
}

export type TikTokToolErrorCode =
  | "EMPTY_INPUT"
  | "INPUT_TOO_LONG"
  | "INVALID_USERNAME"
  | "INVALID_URL"
  | "UNSUPPORTED_URL"
  | "UNSUPPORTED_INPUT"
  | "TOOL_NOT_REGISTERED"
  | "SERVICE_UNAVAILABLE"
  | "INTERNAL_ERROR";

export interface TikTokToolErrorShape {
  code: TikTokToolErrorCode;
  details?: Record<string, string>;
  message: string;
  retryable: boolean;
}

export type TikTokToolSuccess = {
  [K in TikTokToolType]: {
    data: TikTokToolDataMap[K];
    input: ParsedTikTokInput;
    ok: true;
    tool: K;
    view: ToolResultViewModel;
  };
}[TikTokToolType];

export interface TikTokToolFailure {
  data: null;
  error: TikTokToolErrorShape;
  input?: ParsedTikTokInput;
  ok: false;
  tool?: TikTokToolType;
}

export type TikTokToolResult = TikTokToolFailure | TikTokToolSuccess;
