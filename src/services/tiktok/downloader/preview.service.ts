import { validateDownloaderUrl } from "./download-security";
import type { DownloaderPreview } from "./types";

export const TEMPORARY_MEDIA_RETENTION_MINUTES = 15;

export function createDownloaderPreview(input: string): DownloaderPreview {
  const parsed = validateDownloaderUrl(input);

  return {
    authorUsername: parsed.username,
    contentId: parsed.contentId ?? "",
    normalizedUrl: parsed.url ?? "",
    options: [
      {
        description: "Enabled only after a verified media source passes file validation.",
        format: "MP4",
        id: "original",
        label: "Original video",
        status: "unavailable",
      },
    ],
    storagePolicy: {
      permanentStorage: false,
      retentionMinutes: TEMPORARY_MEDIA_RETENTION_MINUTES,
    },
  };
}
