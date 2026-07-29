import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { TIKTOK_SESSION_COOKIE } from "@/services/tiktok/oauth/cookies";
import { captureTikTokSnapshotForSession } from "@/services/tiktok/oauth/oauth-runtime";
import { hasTrustedMutationOrigin } from "@/services/tiktok/oauth/request-security";

export async function POST(request: NextRequest) {
  if (!hasTrustedMutationOrigin(request)) {
    return new NextResponse("Forbidden", { status: 403 });
  }

  const sessionToken = request.cookies.get(TIKTOK_SESSION_COOKIE)?.value;
  if (!sessionToken) {
    return NextResponse.redirect(
      new URL("/tiktok-analytics?capture=not_connected", request.url),
      303,
    );
  }

  try {
    const result = await captureTikTokSnapshotForSession(sessionToken);
    if (!result?.snapshot) {
      return NextResponse.redirect(
        new URL("/tiktok-analytics?capture=not_connected", request.url),
        303,
      );
    }

    return NextResponse.redirect(
      new URL(
        `/tiktok-analytics?q=${encodeURIComponent(result.snapshot.creator.username)}&capture=success`,
        request.url,
      ),
      303,
    );
  } catch {
    return NextResponse.redirect(
      new URL("/tiktok-analytics?capture=failed", request.url),
      303,
    );
  }
}
