import { afterEach, describe, expect, it, vi } from "vitest";

import {
  buildTikTokAuthorizationUrl,
  hasRequiredTikTokScopes,
  REQUIRED_TIKTOK_SCOPES,
  TikTokOAuthClient,
} from "../oauth-client";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("TikTok OAuth client", () => {
  it("builds the current web authorization URL without secrets or PKCE", () => {
    const url = buildTikTokAuthorizationUrl({
      clientKey: "client-key",
      redirectUri: "https://tokprofile.com/api/auth/tiktok/callback",
      state: "csrf-state",
    });

    expect(url.origin + url.pathname).toBe("https://www.tiktok.com/v2/auth/authorize/");
    expect(url.searchParams.get("client_key")).toBe("client-key");
    expect(url.searchParams.get("state")).toBe("csrf-state");
    expect(url.searchParams.get("scope")).toBe(REQUIRED_TIKTOK_SCOPES.join(","));
    expect(url.searchParams.has("client_secret")).toBe(false);
    expect(url.searchParams.has("code_challenge")).toBe(false);
  });

  it("exchanges a code server-side and derives exact expiration times", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(
        JSON.stringify({
          access_token: "access",
          expires_in: 86_400,
          open_id: "open-id-123",
          refresh_expires_in: 31_536_000,
          refresh_token: "refresh",
          scope: REQUIRED_TIKTOK_SCOPES.join(","),
          token_type: "Bearer",
        }),
        { headers: { "Content-Type": "application/json" } },
      ),
    );
    vi.stubGlobal("fetch", fetchMock);
    const client = new TikTokOAuthClient({
      clientKey: "key",
      clientSecret: "secret",
      now: () => new Date("2026-07-26T00:00:00.000Z"),
      redirectUri: "https://tokprofile.com/api/auth/tiktok/callback",
    });

    const tokens = await client.exchangeCode("authorization-code");

    expect(tokens.accessTokenExpiresAt).toBe("2026-07-27T00:00:00.000Z");
    expect(tokens.refreshTokenExpiresAt).toBe("2027-07-26T00:00:00.000Z");
    const body = fetchMock.mock.calls[0]?.[1]?.body as URLSearchParams;
    expect(body.get("client_secret")).toBe("secret");
    expect(body.get("grant_type")).toBe("authorization_code");
  });

  it("requires every analytics scope", () => {
    expect(hasRequiredTikTokScopes(REQUIRED_TIKTOK_SCOPES)).toBe(true);
    expect(hasRequiredTikTokScopes(["user.info.basic", "video.list"])).toBe(false);
  });
});
