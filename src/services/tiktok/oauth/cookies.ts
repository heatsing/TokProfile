export const TIKTOK_OAUTH_STATE_COOKIE = "toklens_tiktok_oauth_state";
export const TIKTOK_SESSION_COOKIE = "toklens_tiktok_session";

export const oauthStateMaxAgeSeconds = 10 * 60;
export const authorizationSessionMaxAgeSeconds = 30 * 24 * 60 * 60;

export function secureCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    maxAge,
    path: "/",
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
  };
}
