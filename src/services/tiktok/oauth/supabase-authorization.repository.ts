import type { SupabaseClient } from "@supabase/supabase-js";

import type {
  StoreTikTokAuthorizationInput,
  TikTokAuthorizationRecord,
  TikTokAuthorizationRepository,
  RotateTikTokAuthorizationInput,
} from "./types";

interface SessionRow {
  authorization_id: number;
  expires_at: string;
  revoked_at: string | null;
}

interface AuthorizationRow {
  granted_scopes: string[];
  id: number;
  open_id: string;
  status: TikTokAuthorizationRecord["status"];
  username: string | null;
}

interface TokenRow {
  access_token_ciphertext: string;
  access_token_expires_at: string;
  encryption_key_version: number;
  refresh_token_ciphertext: string;
  refresh_token_expires_at: string;
}

export class SupabaseTikTokAuthorizationRepository implements TikTokAuthorizationRepository {
  constructor(private readonly client: SupabaseClient) {}

  async storeConnection(input: StoreTikTokAuthorizationInput) {
    const result = await this.client.rpc("store_tiktok_authorization", {
      payload: input,
    });

    if (result.error) {
      throw result.error;
    }
    if (typeof result.data !== "number") {
      throw new TypeError("Authorization persistence returned an invalid id.");
    }

    return result.data;
  }

  async findBySessionHash(sessionTokenHash: string) {
    const sessionResult = await this.client
      .from("tiktok_authorization_sessions")
      .select("authorization_id,expires_at,revoked_at")
      .eq("session_token_hash", sessionTokenHash)
      .maybeSingle<SessionRow>();

    if (sessionResult.error) {
      throw sessionResult.error;
    }
    if (
      !sessionResult.data ||
      sessionResult.data.revoked_at ||
      new Date(sessionResult.data.expires_at) <= new Date()
    ) {
      return null;
    }

    const authorizationResult = await this.client
      .from("tiktok_authorizations")
      .select("id,open_id,username,granted_scopes,status")
      .eq("id", sessionResult.data.authorization_id)
      .maybeSingle<AuthorizationRow>();

    if (authorizationResult.error) {
      throw authorizationResult.error;
    }
    const authorization = authorizationResult.data;
    if (!authorization || authorization.status !== "active" || !authorization.username) {
      return null;
    }

    const tokenResult = await this.client
      .from("tiktok_oauth_tokens")
      .select(
        "access_token_ciphertext,refresh_token_ciphertext,access_token_expires_at,refresh_token_expires_at,encryption_key_version",
      )
      .eq("authorization_id", authorization.id)
      .maybeSingle<TokenRow>();

    if (tokenResult.error) {
      throw tokenResult.error;
    }
    if (!tokenResult.data) {
      return null;
    }

    return {
      authorizationId: authorization.id,
      encryptedTokens: {
        accessTokenCiphertext: tokenResult.data.access_token_ciphertext,
        encryptionKeyVersion: tokenResult.data.encryption_key_version,
        refreshTokenCiphertext: tokenResult.data.refresh_token_ciphertext,
      },
      expiresAt: tokenResult.data.access_token_expires_at,
      grantedScopes: authorization.granted_scopes,
      openId: authorization.open_id,
      refreshExpiresAt: tokenResult.data.refresh_token_expires_at,
      status: authorization.status,
      username: authorization.username,
    };
  }

  async rotateTokens(input: RotateTikTokAuthorizationInput) {
    const result = await this.client.rpc("rotate_tiktok_oauth_tokens", {
      payload: input,
    });

    if (result.error) {
      throw result.error;
    }
  }

  async disconnect(authorizationId: number) {
    const result = await this.client.rpc("disconnect_tiktok_authorization", {
      target_authorization_id: authorizationId,
    });

    if (result.error) {
      throw result.error;
    }
  }
}
