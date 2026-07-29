import type { TikTokToolErrorShape } from "@/types/tiktok";

import { TikTokToolError } from "./errors";

export function handleTikTokToolError(error: unknown): TikTokToolErrorShape {
  if (error instanceof TikTokToolError) {
    return error.toJSON();
  }

  return new TikTokToolError(
    "INTERNAL_ERROR",
    "TokLens could not prepare this result. Please try again.",
    { cause: error, retryable: true },
  ).toJSON();
}
