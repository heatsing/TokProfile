import type { TikTokDisplayApiProvider } from "@/services/tiktok/analytics/display-api.provider";

import type { TikTokOAuthClient } from "./oauth-client";
import { hasRequiredTikTokScopes, TikTokOAuthError } from "./oauth-client";
import {
  createAuthorizationSessionToken,
  decryptOAuthToken,
  encryptOAuthToken,
  hashAuthorizationSessionToken,
} from "./security";
import type {
  TikTokAuthorizationRecord,
  TikTokAuthorizationRepository,
  TikTokOAuthTokenSet,
} from "./types";

const refreshSkewMs = 5 * 60_000;

export class TikTokAuthorizationService {
  constructor(
    private readonly dependencies: {
      encryptionKey: string;
      now?: () => Date;
      oauthClient: Pick<TikTokOAuthClient, "exchangeCode" | "refresh" | "revoke">;
      provider: Pick<TikTokDisplayApiProvider, "getIdentity">;
      repository: TikTokAuthorizationRepository;
    },
  ) {}

  private now() {
    return this.dependencies.now?.() ?? new Date();
  }

  private encryptTokens(tokens: TikTokOAuthTokenSet) {
    const access = encryptOAuthToken(tokens.accessToken, this.dependencies.encryptionKey);
    const refresh = encryptOAuthToken(
      tokens.refreshToken,
      this.dependencies.encryptionKey,
    );

    return {
      accessTokenCiphertext: access.ciphertext,
      encryptionKeyVersion: access.keyVersion,
      refreshTokenCiphertext: refresh.ciphertext,
    };
  }

  async connect(code: string) {
    if (!code.trim()) {
      throw new TikTokOAuthError("Authorization code is missing.", "missing_code");
    }

    const tokens = await this.dependencies.oauthClient.exchangeCode(code.trim());
    if (!hasRequiredTikTokScopes(tokens.grantedScopes)) {
      await this.dependencies.oauthClient.revoke(tokens.accessToken).catch(() => {
        // The connection is rejected locally even if upstream cleanup is unavailable.
      });
      throw new TikTokOAuthError(
        "The required TikTok permissions were not granted.",
        "missing_required_scopes",
      );
    }

    const identity = await this.dependencies.provider.getIdentity({
      accessToken: tokens.accessToken,
    });
    const sessionToken = createAuthorizationSessionToken();
    const now = this.now();

    await this.dependencies.repository.storeConnection({
      ...this.encryptTokens(tokens),
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      consentedAt: now.toISOString(),
      grantedScopes: tokens.grantedScopes,
      openId: tokens.openId,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
      sessionExpiresAt: new Date(now.getTime() + 30 * 24 * 60 * 60_000).toISOString(),
      sessionTokenHash: hashAuthorizationSessionToken(sessionToken),
      username: identity.username,
    });

    return { sessionToken, username: identity.username };
  }

  async findSession(sessionToken: string | undefined) {
    if (!sessionToken) {
      return null;
    }

    return this.dependencies.repository.findBySessionHash(
      hashAuthorizationSessionToken(sessionToken),
    );
  }

  async getValidAccessToken(record: TikTokAuthorizationRecord) {
    if (new Date(record.refreshExpiresAt) <= this.now()) {
      throw new TikTokOAuthError(
        "TikTok authorization has expired. Reconnect the account.",
        "refresh_token_expired",
      );
    }

    if (new Date(record.expiresAt).getTime() - this.now().getTime() > refreshSkewMs) {
      return decryptOAuthToken(
        record.encryptedTokens.accessTokenCiphertext,
        this.dependencies.encryptionKey,
      );
    }

    const refreshToken = decryptOAuthToken(
      record.encryptedTokens.refreshTokenCiphertext,
      this.dependencies.encryptionKey,
    );
    const tokens = await this.dependencies.oauthClient.refresh(refreshToken);

    if (
      tokens.openId !== record.openId ||
      !hasRequiredTikTokScopes(tokens.grantedScopes)
    ) {
      throw new TikTokOAuthError(
        "Refreshed TikTok authorization is inconsistent.",
        "invalid_refresh_identity",
      );
    }

    await this.dependencies.repository.rotateTokens({
      ...this.encryptTokens(tokens),
      accessTokenExpiresAt: tokens.accessTokenExpiresAt,
      authorizationId: record.authorizationId,
      grantedScopes: tokens.grantedScopes,
      refreshTokenExpiresAt: tokens.refreshTokenExpiresAt,
    });

    return tokens.accessToken;
  }

  async disconnect(record: TikTokAuthorizationRecord) {
    const accessToken = await this.getValidAccessToken(record);
    await this.dependencies.oauthClient.revoke(accessToken);
    await this.dependencies.repository.disconnect(record.authorizationId);
  }
}
