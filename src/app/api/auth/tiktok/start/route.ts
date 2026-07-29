import { NextResponse } from "next/server";

import {
  oauthStateMaxAgeSeconds,
  secureCookieOptions,
  TIKTOK_OAUTH_STATE_COOKIE,
} from "@/services/tiktok/oauth/cookies";
import { createTikTokOAuthRequest } from "@/services/tiktok/oauth/oauth-runtime";

export const dynamic = "force-dynamic";

export function GET(request: Request) {
  const oauthRequest = createTikTokOAuthRequest();

  if (!oauthRequest) {
    return NextResponse.redirect(
      new URL("/tiktok-analytics?connection=not_configured", request.url),
      303,
    );
  }

  const response = NextResponse.redirect(oauthRequest.authorizationUrl, 302);
  response.cookies.set(
    TIKTOK_OAUTH_STATE_COOKIE,
    oauthRequest.state,
    secureCookieOptions(oauthStateMaxAgeSeconds),
  );
  response.headers.set("Cache-Control", "no-store");
  return response;
}
