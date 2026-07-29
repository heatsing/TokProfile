import type { NextRequest } from "next/server";

import { publicEnv } from "@/config/env";

function firstHeaderValue(value: string | null) {
  return value?.split(",")[0]?.trim();
}

export function hasTrustedMutationOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");

  if (!origin) {
    return false;
  }

  try {
    const normalizedOrigin = new URL(origin).origin;
    const trustedOrigins = new Set([request.nextUrl.origin, publicEnv.siteUrl]);
    const forwardedHost =
      firstHeaderValue(request.headers.get("x-forwarded-host")) ??
      firstHeaderValue(request.headers.get("host"));
    const forwardedProtocol =
      firstHeaderValue(request.headers.get("x-forwarded-proto")) ??
      request.nextUrl.protocol.replace(":", "");

    if (
      forwardedHost &&
      /^(?:localhost|127\.0\.0\.1|\[[0-9a-f:]+\]|[a-z0-9.-]+)(?::\d{1,5})?$/i.test(
        forwardedHost,
      ) &&
      (forwardedProtocol === "http" || forwardedProtocol === "https")
    ) {
      trustedOrigins.add(`${forwardedProtocol}://${forwardedHost}`);
    }

    return trustedOrigins.has(normalizedOrigin);
  } catch {
    return false;
  }
}
