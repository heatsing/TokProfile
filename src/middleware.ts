import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  if (request.nextUrl.hostname !== "www.tokprofile.com") {
    return NextResponse.next();
  }

  const canonicalUrl = request.nextUrl.clone();
  canonicalUrl.hostname = "tokprofile.com";
  canonicalUrl.protocol = "https:";
  canonicalUrl.port = "";

  return NextResponse.redirect(canonicalUrl, 308);
}

export const config = {
  matcher: "/:path*",
};
