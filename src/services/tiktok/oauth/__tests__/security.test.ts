import { describe, expect, it } from "vitest";

import {
  createAuthorizationSessionToken,
  createOAuthState,
  decryptOAuthToken,
  encryptOAuthToken,
  hashAuthorizationSessionToken,
  matchesOAuthState,
} from "../security";

const encryptionKey = Buffer.alloc(32, 7).toString("base64");

describe("TikTok OAuth security helpers", () => {
  it("encrypts tokens with authenticated encryption", () => {
    const encrypted = encryptOAuthToken("secret-token", encryptionKey);

    expect(encrypted.ciphertext).not.toContain("secret-token");
    expect(decryptOAuthToken(encrypted.ciphertext, encryptionKey)).toBe("secret-token");
    expect(() =>
      decryptOAuthToken(`${encrypted.ciphertext}tampered`, encryptionKey),
    ).toThrow();
  });

  it("creates high-entropy state and compares it safely", () => {
    const state = createOAuthState();

    expect(state.length).toBeGreaterThanOrEqual(43);
    expect(matchesOAuthState(state, state)).toBe(true);
    expect(matchesOAuthState(state, `${state}x`)).toBe(false);
  });

  it("stores only a session-token hash", () => {
    const token = createAuthorizationSessionToken();
    const hash = hashAuthorizationSessionToken(token);

    expect(hash).toMatch(/^[a-f0-9]{64}$/);
    expect(hash).not.toContain(token);
  });
});
