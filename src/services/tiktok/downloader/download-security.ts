import { createHash } from "node:crypto";

import { parseTikTokInput } from "../input-parser";
import { DownloaderSecurityError } from "./errors";
import type { ValidatedMediaFile } from "./types";

export const MAX_MEDIA_FILE_SIZE = 100 * 1024 * 1024;
export const ALLOWED_MEDIA_TYPES = ["video/mp4"] as const;

export function validateDownloaderUrl(input: string) {
  try {
    const parsed = parseTikTokInput(input);

    if (parsed.kind !== "video_url" || !parsed.contentId || !parsed.url) {
      throw new DownloaderSecurityError(
        "INVALID_VIDEO_URL",
        "Enter a full public TikTok video URL.",
      );
    }

    return parsed;
  } catch (error) {
    if (error instanceof DownloaderSecurityError) {
      throw error;
    }

    throw new DownloaderSecurityError(
      "INVALID_VIDEO_URL",
      "Enter a valid public video URL on tiktok.com.",
      { cause: error },
    );
  }
}

function hasMp4Signature(bytes: Uint8Array): boolean {
  return (
    bytes.byteLength >= 12 &&
    bytes[4] === 0x66 &&
    bytes[5] === 0x74 &&
    bytes[6] === 0x79 &&
    bytes[7] === 0x70
  );
}

export function validateMediaFile(input: {
  bytes: Uint8Array;
  contentLength: number;
  contentType: string;
}): ValidatedMediaFile {
  const normalizedContentType = input.contentType.split(";", 1)[0]?.trim().toLowerCase();

  if (!ALLOWED_MEDIA_TYPES.some((type) => type === normalizedContentType)) {
    throw new DownloaderSecurityError(
      "INVALID_FILE_TYPE",
      "Only MP4 video files are accepted.",
    );
  }

  if (!Number.isSafeInteger(input.contentLength) || input.contentLength < 0) {
    throw new DownloaderSecurityError(
      "FILE_SIZE_MISMATCH",
      "The media file size does not match its declared length.",
    );
  }

  if (
    input.contentLength > MAX_MEDIA_FILE_SIZE ||
    input.bytes.byteLength > MAX_MEDIA_FILE_SIZE
  ) {
    throw new DownloaderSecurityError(
      "FILE_TOO_LARGE",
      "The media file exceeds the 100 MB temporary processing limit.",
    );
  }

  if (input.contentLength !== input.bytes.byteLength) {
    throw new DownloaderSecurityError(
      "FILE_SIZE_MISMATCH",
      "The media file size does not match its declared length.",
    );
  }

  if (!hasMp4Signature(input.bytes)) {
    throw new DownloaderSecurityError(
      "INVALID_FILE_SIGNATURE",
      "The media bytes do not contain a valid MP4 signature.",
    );
  }

  return {
    checksum: createHash("sha256").update(input.bytes).digest("hex"),
    extension: ".mp4",
    mimeType: "video/mp4",
    size: input.bytes.byteLength,
  };
}
