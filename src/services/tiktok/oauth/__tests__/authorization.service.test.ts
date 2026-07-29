import { describe, expect, it, vi } from "vitest";

import { TikTokAuthorizationService } from "../authorization.service";
import { REQUIRED_TIKTOK_SCOPES } from "../oauth-client";
import { decryptOAuthToken } from "../security";
import type {
  StoreTikTokAuthorizationInput,
  TikTokAuthorizationRecord,
  TikTokAuthorizationRepository,
  RotateTikTokAuthorizationInput,
  TikTokOAuthTokenSet,
} from "../types";

const encryptionKey = Buffer.alloc(32, 9).toString("base64");
const now = new Date("2026-07-26T00:00:00.000Z");
const tokenSet: TikTokOAuthTokenSet = {
  accessToken: "access-token",
  accessTokenExpiresAt: "2026-07-27T00:00:00.000Z",
  grantedScopes: [...REQUIRED_TIKTOK_SCOPES],
  openId: "open-id-123",
  refreshToken: "refresh-token",
  refreshTokenExpiresAt: "2027-07-26T00:00:00.000Z",
  tokenType: "Bearer",
};

class MemoryAuthorizationRepository implements TikTokAuthorizationRepository {
  record: TikTokAuthorizationRecord | null = null;

  async storeConnection(input: StoreTikTokAuthorizationInput) {
    this.record = {
      authorizationId: 1,
      encryptedTokens: {
        accessTokenCiphertext: input.accessTokenCiphertext,
        encryptionKeyVersion: input.encryptionKeyVersion,
        refreshTokenCiphertext: input.refreshTokenCiphertext,
      },
      expiresAt: input.accessTokenExpiresAt,
      grantedScopes: input.grantedScopes,
      openId: input.openId,
      refreshExpiresAt: input.refreshTokenExpiresAt,
      status: "active",
      username: input.username,
    };
    return 1;
  }

  async findBySessionHash() {
    return this.record;
  }

  async rotateTokens(input: RotateTikTokAuthorizationInput) {
    if (!this.record) {
      throw new Error("Missing authorization");
    }
    this.record = {
      ...this.record,
      encryptedTokens: {
        accessTokenCiphertext: input.accessTokenCiphertext,
        encryptionKeyVersion: input.encryptionKeyVersion,
        refreshTokenCiphertext: input.refreshTokenCiphertext,
      },
      expiresAt: input.accessTokenExpiresAt,
      grantedScopes: input.grantedScopes,
      refreshExpiresAt: input.refreshTokenExpiresAt,
    };
  }

  async disconnect() {
    if (this.record) {
      this.record = { ...this.record, status: "disconnected" };
    }
  }
}

function createService(options: { tokens?: TikTokOAuthTokenSet } = {}) {
  const repository = new MemoryAuthorizationRepository();
  const oauthClient = {
    exchangeCode: vi.fn().mockResolvedValue(options.tokens ?? tokenSet),
    refresh: vi.fn().mockResolvedValue(options.tokens ?? tokenSet),
    revoke: vi.fn().mockResolvedValue(undefined),
  };
  const provider = {
    getIdentity: vi.fn().mockResolvedValue({ username: "creator" }),
  };
  const service = new TikTokAuthorizationService({
    encryptionKey,
    now: () => now,
    oauthClient,
    provider,
    repository,
  });

  return { oauthClient, repository, service };
}

describe("TikTok authorization service", () => {
  it("connects only after required scopes and encrypts both tokens", async () => {
    const { repository, service } = createService();
    const connection = await service.connect("authorization-code");

    expect(connection.username).toBe("creator");
    expect(repository.record).not.toBeNull();
    expect(repository.record?.encryptedTokens.accessTokenCiphertext).not.toContain(
      "access-token",
    );
    expect(
      decryptOAuthToken(
        repository.record!.encryptedTokens.refreshTokenCiphertext,
        encryptionKey,
      ),
    ).toBe("refresh-token");
  });

  it("rejects partial consent and revokes the issued token", async () => {
    const { oauthClient, repository, service } = createService({
      tokens: { ...tokenSet, grantedScopes: ["user.info.basic"] },
    });

    await expect(service.connect("authorization-code")).rejects.toMatchObject({
      code: "missing_required_scopes",
    });
    expect(oauthClient.revoke).toHaveBeenCalledWith("access-token");
    expect(repository.record).toBeNull();
  });

  it("refreshes an expiring token and checks the open id", async () => {
    const { oauthClient, repository, service } = createService({
      tokens: {
        ...tokenSet,
        accessToken: "new-access-token",
        accessTokenExpiresAt: "2026-07-27T00:00:00.000Z",
      },
    });
    await service.connect("authorization-code");
    repository.record = {
      ...repository.record!,
      expiresAt: "2026-07-26T00:01:00.000Z",
    };

    await expect(service.getValidAccessToken(repository.record)).resolves.toBe(
      "new-access-token",
    );
    expect(oauthClient.refresh).toHaveBeenCalled();
  });
});
