import { TIKTOK_TOOL_TYPES, type TikTokToolType } from "@/types/tiktok";

import { TikTokToolError } from "./errors";

const MAX_INPUT_LENGTH = 2_048;
const USERNAME_PATTERN = /^(?=.*[a-z0-9])[a-z0-9._]{2,24}$/i;
const TIKTOK_HOST_PATTERN = /(^|\.)tiktok\.com$/i;

export function validateInputLength(input: string): string {
  const normalized = input.trim();

  if (!normalized) {
    throw new TikTokToolError("EMPTY_INPUT", "Enter a TikTok username or URL.");
  }

  if (normalized.length > MAX_INPUT_LENGTH) {
    throw new TikTokToolError(
      "INPUT_TOO_LONG",
      "The input is longer than the supported limit.",
      { details: { maxLength: String(MAX_INPUT_LENGTH) } },
    );
  }

  return normalized;
}

export function normalizeUsername(input: string): string {
  const username = input.trim().replace(/^@/, "");

  if (!USERNAME_PATTERN.test(username)) {
    throw new TikTokToolError(
      "INVALID_USERNAME",
      "Use a TikTok username with 2–24 letters, numbers, periods, or underscores.",
    );
  }

  return username;
}

export function isTikTokHostname(hostname: string): boolean {
  return TIKTOK_HOST_PATTERN.test(hostname);
}

export function validateTikTokUrl(url: URL): void {
  if (url.protocol !== "https:") {
    throw new TikTokToolError("INVALID_URL", "TikTok URLs must use HTTPS.");
  }

  if (!isTikTokHostname(url.hostname)) {
    throw new TikTokToolError(
      "UNSUPPORTED_URL",
      "Only public URLs on tiktok.com are supported.",
    );
  }

  if (url.username || url.password || url.port) {
    throw new TikTokToolError(
      "INVALID_URL",
      "The TikTok URL contains unsupported credentials or a port.",
    );
  }
}

export function isTikTokToolType(value: string | undefined): value is TikTokToolType {
  return TIKTOK_TOOL_TYPES.some((tool) => tool === value);
}
