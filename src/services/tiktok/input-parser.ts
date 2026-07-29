import type { ParsedTikTokInput } from "@/types/tiktok";

import { detectTikTokUrl, isPotentialTikTokUrl } from "./url-detector";
import { detectTikTokUsername } from "./username-detector";
import { validateInputLength } from "./validation";

export function parseTikTokInput(input: string): ParsedTikTokInput {
  const raw = validateInputLength(input);

  if (isPotentialTikTokUrl(raw)) {
    return detectTikTokUrl(raw);
  }

  return detectTikTokUsername(raw);
}
