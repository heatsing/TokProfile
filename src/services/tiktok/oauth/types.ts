export interface TikTokOAuthTokenSet {
  accessToken: string;
  accessTokenExpiresAt: string;
  grantedScopes: string[];
  openId: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  tokenType: "Bearer";
}

export interface EncryptedTikTokTokens {
  accessTokenCiphertext: string;
  encryptionKeyVersion: number;
  refreshTokenCiphertext: string;
}

export interface TikTokAuthorizationRecord {
  authorizationId: number;
  encryptedTokens: EncryptedTikTokTokens;
  expiresAt: string;
  grantedScopes: string[];
  openId: string;
  refreshExpiresAt: string;
  status: "active" | "disconnected" | "refresh_failed";
  username: string;
}

export interface StoreTikTokAuthorizationInput extends EncryptedTikTokTokens {
  accessTokenExpiresAt: string;
  consentedAt: string;
  grantedScopes: string[];
  openId: string;
  refreshTokenExpiresAt: string;
  sessionExpiresAt: string;
  sessionTokenHash: string;
  username: string;
}

export interface RotateTikTokAuthorizationInput extends EncryptedTikTokTokens {
  accessTokenExpiresAt: string;
  authorizationId: number;
  grantedScopes: string[];
  refreshTokenExpiresAt: string;
}

export interface TikTokAuthorizationRepository {
  disconnect(authorizationId: number): Promise<void>;
  findBySessionHash(sessionTokenHash: string): Promise<TikTokAuthorizationRecord | null>;
  rotateTokens(input: RotateTikTokAuthorizationInput): Promise<void>;
  storeConnection(input: StoreTikTokAuthorizationInput): Promise<number>;
}
