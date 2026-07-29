import { NextResponse, type NextRequest } from "next/server";

import {
  anonymizeClientIdentifier,
  consumeDownloaderRateLimit,
  createDownloaderPreview,
  handleDownloaderError,
  temporaryMediaStore,
  type DownloaderPreviewResponse,
} from "@/services/tiktok/downloader";
import { DownloaderSecurityError } from "@/services/tiktok/downloader/errors";

const MAX_REQUEST_BODY_SIZE = 4_096;

function getClientIdentifier(request: NextRequest): string {
  const forwardedFor =
    request.headers.get("x-vercel-forwarded-for") ??
    request.headers.get("x-forwarded-for") ??
    "anonymous";
  const address = forwardedFor.split(",", 1)[0]?.trim() || "anonymous";

  return anonymizeClientIdentifier(address);
}

function getRateLimitHeaders(rateLimit: {
  limit: number;
  remaining: number;
  resetAt: number;
}): HeadersInit {
  return {
    "Cache-Control": "no-store",
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1_000)),
  };
}

function getErrorStatus(code: string): number {
  switch (code) {
    case "RATE_LIMITED":
      return 429;
    case "RIGHTS_CONFIRMATION_REQUIRED":
    case "INVALID_REQUEST":
    case "INVALID_VIDEO_URL":
      return 400;
    default:
      return 500;
  }
}

export async function POST(request: NextRequest) {
  const rateLimit = await consumeDownloaderRateLimit(getClientIdentifier(request));
  const headers = getRateLimitHeaders(rateLimit);

  if (!rateLimit.allowed) {
    const retryAfter = Math.max(1, Math.ceil((rateLimit.resetAt - Date.now()) / 1_000));
    const response: DownloaderPreviewResponse = {
      data: null,
      error: {
        code: "RATE_LIMITED",
        message: "Too many preview requests. Please wait before trying again.",
      },
      ok: false,
    };

    return NextResponse.json(response, {
      headers: { ...headers, "Retry-After": String(retryAfter) },
      status: 429,
    });
  }

  try {
    const origin = request.headers.get("origin");

    if (origin && new URL(origin).origin !== request.nextUrl.origin) {
      throw new DownloaderSecurityError(
        "INVALID_REQUEST",
        "Cross-origin preview requests are not accepted.",
      );
    }

    const contentType = request.headers.get("content-type") ?? "";

    if (!contentType.toLowerCase().startsWith("application/json")) {
      throw new DownloaderSecurityError(
        "INVALID_REQUEST",
        "Preview requests must use JSON.",
      );
    }

    const declaredLength = Number(request.headers.get("content-length") ?? "0");

    if (
      !Number.isFinite(declaredLength) ||
      declaredLength < 0 ||
      declaredLength > MAX_REQUEST_BODY_SIZE
    ) {
      throw new DownloaderSecurityError(
        "INVALID_REQUEST",
        "The preview request is too large.",
      );
    }

    const body = (await request.json()) as unknown;

    if (!body || typeof body !== "object") {
      throw new DownloaderSecurityError("INVALID_REQUEST", "Enter a TikTok video URL.");
    }

    const candidate = body as Record<string, unknown>;

    if (candidate.rightsConfirmed !== true) {
      throw new DownloaderSecurityError(
        "RIGHTS_CONFIRMATION_REQUIRED",
        "Confirm that you own the content or have permission to save it.",
      );
    }

    if (typeof candidate.url !== "string") {
      throw new DownloaderSecurityError("INVALID_REQUEST", "Enter a TikTok video URL.");
    }

    await temporaryMediaStore.cleanupExpired();
    const response: DownloaderPreviewResponse = {
      data: createDownloaderPreview(candidate.url),
      error: null,
      ok: true,
    };

    return NextResponse.json(response, { headers });
  } catch (error) {
    const normalizedError = handleDownloaderError(error);
    const response: DownloaderPreviewResponse = {
      data: null,
      error: normalizedError,
      ok: false,
    };

    return NextResponse.json(response, {
      headers,
      status: getErrorStatus(normalizedError.code),
    });
  }
}
