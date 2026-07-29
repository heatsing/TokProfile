import type { ParsedTikTokInput } from "@/types/tiktok";

import { normalizeUsername } from "./validation";

export function detectTikTokUsername(raw: string): ParsedTikTokInput {
  const username = normalizeUsername(raw);

  return {
    kind: "username",
    normalized: `@${username}`,
    raw,
    username,
  };
}
