import type { ParsedTikTokInput, TikTokInputKind } from "@/types/tiktok";

import { TikTokToolError } from "./errors";
import { isTikTokHostname, normalizeUsername, validateTikTokUrl } from "./validation";

const CONTENT_PATH_PATTERN = /^\/@([^/]+)\/(video|photo|story)\/([0-9]+)\/?$/i;
const PROFILE_PATH_PATTERN = /^\/@([^/]+)\/?$/i;

export function isPotentialTikTokUrl(input: string): boolean {
  const candidate = input.split(/[/?#]/, 1)[0] ?? "";
  return (
    /^https?:\/\//i.test(input) ||
    isTikTokHostname(candidate) ||
    input.toLowerCase().startsWith("www.tiktok.com/")
  );
}

function createUrl(input: string): URL {
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  try {
    const url = new URL(withProtocol);
    validateTikTokUrl(url);
    return url;
  } catch (error) {
    if (error instanceof TikTokToolError) {
      throw error;
    }

    throw new TikTokToolError("INVALID_URL", "Enter a valid public TikTok URL.", {
      cause: error,
    });
  }
}

export function detectTikTokUrl(raw: string): ParsedTikTokInput {
  const url = createUrl(raw);
  const pathname = decodeURIComponent(url.pathname);
  const contentMatch = CONTENT_PATH_PATTERN.exec(pathname);

  if (contentMatch) {
    const [, rawUsername, rawContentType, contentId] = contentMatch;
    const username = normalizeUsername(rawUsername ?? "");
    const contentType = rawContentType?.toLowerCase() as "photo" | "story" | "video";
    const kind = `${contentType}_url` as TikTokInputKind;

    return {
      contentId,
      kind,
      normalized: url.href,
      raw,
      url: url.href,
      username,
    };
  }

  const profileMatch = PROFILE_PATH_PATTERN.exec(pathname);

  if (profileMatch) {
    const username = normalizeUsername(profileMatch[1] ?? "");

    return {
      kind: "profile_url",
      normalized: url.href,
      raw,
      url: url.href,
      username,
    };
  }

  if (
    ["vm.tiktok.com", "vt.tiktok.com"].includes(url.hostname.toLowerCase()) ||
    /^\/t\/[a-z0-9]+\/?$/i.test(pathname)
  ) {
    return {
      kind: "short_url",
      normalized: url.href,
      raw,
      url: url.href,
    };
  }

  throw new TikTokToolError(
    "UNSUPPORTED_URL",
    "Use a public TikTok profile, video, photo, or story URL.",
  );
}
