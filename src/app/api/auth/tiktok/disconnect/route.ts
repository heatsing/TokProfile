import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { TIKTOK_SESSION_COOKIE } from "@/services/tiktok/oauth/cookies";
import { getTikTokOAuthRuntime } from "@/services/tiktok/oauth/oauth-runtime";
import { hasTrustedMutationOrigin } from "@/services/tiktok/oauth/request-security";

export async function POST(request: NextRequest) {
  if (!hasTrustedMutationOrigin(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const sessionToken = request.cookies.get(TIKTOK_SESSION_COOKIE)?.value;
  const runtime = getTikTokOAuthRuntime();

  if (!sessionToken || !runtime) {
    return NextResponse.redirect(
      new URL("/tiktok-analytics?connection=not_connected", request.url),
      303,
    );
  }

  const record = await runtime.authorizationService.findSession(sessionToken);
  if (!record) {
    const response = NextResponse.redirect(
      new URL("/tiktok-analytics?connection=not_connected", request.url),
      303,
    );
    response.cookies.delete(TIKTOK_SESSION_COOKIE);
    return response;
  }

  try {
    await runtime.authorizationService.disconnect(record);
    const response = NextResponse.redirect(
      new URL("/tiktok-analytics?connection=disconnected", request.url),
      303,
    );
    response.cookies.delete(TIKTOK_SESSION_COOKIE);
    return response;
  } catch {
    return NextResponse.redirect(
      new URL("/tiktok-analytics?connection=disconnect_failed", request.url),
      303,
    );
  }
}
