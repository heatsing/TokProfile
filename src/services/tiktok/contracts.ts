import type {
  ParsedTikTokInput,
  TikTokToolDataMap,
  TikTokToolType,
  ToolResultViewModel,
} from "@/types/tiktok";

export interface TikTokToolService<K extends TikTokToolType = TikTokToolType> {
  readonly type: K;
  resolve(input: ParsedTikTokInput): Promise<{
    data: TikTokToolDataMap[K];
    view: ToolResultViewModel;
  }>;
  supports(input: ParsedTikTokInput): boolean;
}

export function createPublicSource() {
  return {
    access: "public",
    platform: "tiktok",
    retrievedAt: new Date().toISOString(),
    status: "unverified",
  } as const;
}
