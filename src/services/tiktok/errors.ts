import type { TikTokToolErrorCode, TikTokToolErrorShape } from "@/types/tiktok";

export class TikTokToolError extends Error implements TikTokToolErrorShape {
  readonly code: TikTokToolErrorCode;
  readonly details?: Record<string, string>;
  readonly retryable: boolean;

  constructor(
    code: TikTokToolErrorCode,
    message: string,
    options: {
      cause?: unknown;
      details?: Record<string, string>;
      retryable?: boolean;
    } = {},
  ) {
    super(message, { cause: options.cause });
    this.name = "TikTokToolError";
    this.code = code;
    this.details = options.details;
    this.retryable = options.retryable ?? false;
  }

  toJSON(): TikTokToolErrorShape {
    return {
      code: this.code,
      details: this.details,
      message: this.message,
      retryable: this.retryable,
    };
  }
}
