import type { DownloaderErrorCode, DownloaderErrorShape } from "./types";

export class DownloaderSecurityError extends Error {
  readonly code: DownloaderErrorCode;

  constructor(code: DownloaderErrorCode, message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = "DownloaderSecurityError";
    this.code = code;
  }

  toJSON(): DownloaderErrorShape {
    return {
      code: this.code,
      message: this.message,
    };
  }
}

export function handleDownloaderError(error: unknown): DownloaderErrorShape {
  if (error instanceof DownloaderSecurityError) {
    return error.toJSON();
  }

  return new DownloaderSecurityError(
    "INTERNAL_ERROR",
    "TokLens could not prepare this video preview. Please try again.",
    { cause: error },
  ).toJSON();
}
