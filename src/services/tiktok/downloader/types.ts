export interface DownloaderPreview {
  authorUsername?: string;
  contentId: string;
  normalizedUrl: string;
  options: DownloadOption[];
  storagePolicy: {
    permanentStorage: false;
    retentionMinutes: number;
  };
}

export interface DownloadOption {
  description: string;
  format: "MP4";
  id: "original";
  label: string;
  status: "available" | "unavailable";
}

export interface ValidatedMediaFile {
  checksum: string;
  extension: ".mp4";
  mimeType: "video/mp4";
  size: number;
}

export interface TemporaryMediaRecord extends ValidatedMediaFile {
  createdAt: string;
  expiresAt: string;
  token: string;
}

export type DownloaderErrorCode =
  | "INVALID_REQUEST"
  | "INVALID_VIDEO_URL"
  | "RIGHTS_CONFIRMATION_REQUIRED"
  | "RATE_LIMITED"
  | "INVALID_FILE_TYPE"
  | "INVALID_FILE_SIGNATURE"
  | "FILE_TOO_LARGE"
  | "FILE_SIZE_MISMATCH"
  | "TEMPORARY_FILE_NOT_FOUND"
  | "TEMPORARY_FILE_EXPIRED"
  | "INTERNAL_ERROR";

export interface DownloaderErrorShape {
  code: DownloaderErrorCode;
  message: string;
}

export type DownloaderPreviewResponse =
  | {
      data: DownloaderPreview;
      error: null;
      ok: true;
    }
  | {
      data: null;
      error: DownloaderErrorShape;
      ok: false;
    };
