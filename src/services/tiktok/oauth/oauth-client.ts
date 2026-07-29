import type { TikTokOAuthTokenSet } from "./types";

const authorizationEndpoint = "https://www.tiktok.com/v2/auth/authorize/";
const tokenEndpoint = "https://open.tiktokapis.com/v2/oauth/token/";
const revokeEndpoint = "https://open.tiktokapis.com/v2/oauth/revoke/";

export const REQUIRED_TIKTOK_SCOPES = [
  "user.info.basic",
  "user.info.profile",
  "user.info.stats",
  "video.list",
] as const;

interface RawTokenResponse {
  access_token?: string;
  error?: string;
  error_description?: string;
  expires_in?: number;
  log_id?: string;
  open_id?: string;
  refresh_expires_in?: number;
  refresh_token?: string;
  scope?: string;
  token_type?: string;
}

export class TikTokOAuthError extends Error {
  readonly code: string;
  readonly logId?: string;
  readonly retryable: boolean;

  constructor(
    message: string,
    code: string,
    options: { logId?: string; retryable?: boolean } = {},
  ) {
    super(message);
    this.name = "TikTokOAuthError";
    this.code = code;
    this.logId = options.logId;
    this.retryable = options.retryable ?? false;
  }
}

function requireString(value: unknown, field: string) {
  if (typeof value !== "string" || !value.trim()) {
    throw new TikTokOAuthError(
      `TikTok OAuth response is missing ${field}.`,
      "invalid_response",
    );
  }

  return value.trim();
}

function requirePositiveInteger(value: unknown, field: string) {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value <= 0) {
    throw new TikTokOAuthError(
      `TikTok OAuth response has an invalid ${field}.`,
      "invalid_response",
    );
  }

  return value;
}

function normalizeScopes(value: string) {
  return [
    ...new Set(
      value
        .split(",")
        .map((scope) => scope.trim())
        .filter(Boolean),
    ),
  ].sort();
}

async function requestForm(
  endpoint: string,
  values: Record<string, string>,
): Promise<RawTokenResponse> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const response = await fetch(endpoint, {
      body: new URLSearchParams(values),
      cache: "no-store",
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      method: "POST",
      signal: controller.signal,
    });
    const text = await response.text();
    const body = text ? (JSON.parse(text) as RawTokenResponse) : {};

    if (!response.ok || body.error) {
      throw new TikTokOAuthError(
        body.error_description || "TikTok OAuth request failed.",
        body.error || `http_${response.status}`,
        {
          logId: body.log_id,
          retryable:
            response.status >= 500 ||
            body.error === "server_error" ||
            body.error === "temporarily_unavailable",
        },
      );
    }

    return body;
  } catch (error) {
    if (error instanceof TikTokOAuthError) {
      throw error;
    }

    throw new TikTokOAuthError(
      "TikTok OAuth request could not be completed.",
      "network_error",
      { retryable: true },
    );
  } finally {
    clearTimeout(timeout);
  }
}

function parseTokenResponse(body: RawTokenResponse, now: Date): TikTokOAuthTokenSet {
  const accessToken = requireString(body.access_token, "access_token");
  const refreshToken = requireString(body.refresh_token, "refresh_token");
  const openId = requireString(body.open_id, "open_id");
  const scope = requireString(body.scope, "scope");
  const expiresIn = requirePositiveInteger(body.expires_in, "expires_in");
  const refreshExpiresIn = requirePositiveInteger(
    body.refresh_expires_in,
    "refresh_expires_in",
  );

  if (body.token_type !== "Bearer") {
    throw new TikTokOAuthError(
      "TikTok OAuth response has an unsupported token type.",
      "invalid_response",
    );
  }

  return {
    accessToken,
    accessTokenExpiresAt: new Date(now.getTime() + expiresIn * 1_000).toISOString(),
    grantedScopes: normalizeScopes(scope),
    openId,
    refreshToken,
    refreshTokenExpiresAt: new Date(
      now.getTime() + refreshExpiresIn * 1_000,
    ).toISOString(),
    tokenType: "Bearer",
  };
}

export function buildTikTokAuthorizationUrl(input: {
  clientKey: string;
  redirectUri: string;
  state: string;
}) {
  const url = new URL(authorizationEndpoint);
  url.search = new URLSearchParams({
    client_key: input.clientKey,
    redirect_uri: input.redirectUri,
    response_type: "code",
    scope: REQUIRED_TIKTOK_SCOPES.join(","),
    state: input.state,
  }).toString();
  return url;
}

export function hasRequiredTikTokScopes(scopes: readonly string[]) {
  const granted = new Set(scopes);
  return REQUIRED_TIKTOK_SCOPES.every((scope) => granted.has(scope));
}

export class TikTokOAuthClient {
  constructor(
    private readonly config: {
      clientKey: string;
      clientSecret: string;
      now?: () => Date;
      redirectUri: string;
    },
  ) {}

  async exchangeCode(code: string) {
    const body = await requestForm(tokenEndpoint, {
      client_key: this.config.clientKey,
      client_secret: this.config.clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: this.config.redirectUri,
    });

    return parseTokenResponse(body, this.config.now?.() ?? new Date());
  }

  async refresh(refreshToken: string) {
    const body = await requestForm(tokenEndpoint, {
      client_key: this.config.clientKey,
      client_secret: this.config.clientSecret,
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    });

    return parseTokenResponse(body, this.config.now?.() ?? new Date());
  }

  async revoke(accessToken: string) {
    await requestForm(revokeEndpoint, {
      client_key: this.config.clientKey,
      client_secret: this.config.clientSecret,
      token: accessToken,
    });
  }
}
