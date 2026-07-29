import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import {
  authorizationSessionMaxAgeSeconds,
  secureCookieOptions,
  TIKTOK_OAUTH_STATE_COOKIE,
  TIKTOK_SESSION_COOKIE,
} from "@/services/tiktok/oauth/cookies";
import { getTikTokOAuthRuntime } from "@/services/tiktok/oauth/oauth-runtime";
import { matchesOAuthState } from "@/services/tiktok/oauth/security";

export const dynamic = "force-dynamic";

function analyticsRedirect(request: NextRequest, status: string) {
  return new URL(`/tiktok-analytics?connection=${status}`, request.url);
}

export async function GET(request: NextRequest) {
  const responseState = request.nextUrl.searchParams.get("state") ?? "";
  const storedState = request.cookies.get(TIKTOK_OAUTH_STATE_COOKIE)?.value ?? "";
  const code = request.nextUrl.searchParams.get("code") ?? "";
  const upstreamError = request.nextUrl.searchParams.get("error");
  const runtime = getTikTokOAuthRuntime();

  if (
    !runtime ||
    !storedState ||
    !responseState ||
    !matchesOAuthState(storedState, responseState)
  ) {
    const response = NextResponse.redirect(
      analyticsRedirect(request, runtime ? "invalid_state" : "not_configured"),
      303,
    );
    response.cookies.delete(TIKTOK_OAUTH_STATE_COOKIE);
    return response;
  }

  if (upstreamError || !code) {
    const response = NextResponse.redirect(analyticsRedirect(request, "denied"), 303);
    response.cookies.delete(TIKTOK_OAUTH_STATE_COOKIE);
    return response;
  }

  try {
    const connection = await runtime.authorizationService.connect(code);
    const response = NextResponse.redirect(
      new URL(
        `/tiktok-analytics?q=${encodeURIComponent(connection.username)}&connection=connected`,
        request.url,
      ),
      303,
    );
    response.cookies.delete(TIKTOK_OAUTH_STATE_COOKIE);
    response.cookies.set(
      TIKTOK_SESSION_COOKIE,
      connection.sessionToken,
      secureCookieOptions(authorizationSessionMaxAgeSeconds),
    );
    response.headers.set("Cache-Control", "no-store");
    return response;
  } catch {
    const response = NextResponse.redirect(analyticsRedirect(request, "failed"), 303);
    response.cookies.delete(TIKTOK_OAUTH_STATE_COOKIE);
    return response;
  }
}
