import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
  timingSafeEqual,
} from "node:crypto";

const tokenFormatVersion = "v1";
const keyVersion = 1;

function parseEncryptionKey(encodedKey: string) {
  const key = Buffer.from(encodedKey, "base64");

  if (key.length !== 32) {
    throw new TypeError(
      "TIKTOK_TOKEN_ENCRYPTION_KEY must be a base64-encoded 32-byte key.",
    );
  }

  return key;
}

export function createOAuthState() {
  return randomBytes(32).toString("base64url");
}

export function createAuthorizationSessionToken() {
  return randomBytes(32).toString("base64url");
}

export function hashAuthorizationSessionToken(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

export function matchesOAuthState(expected: string, received: string) {
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  return (
    expectedBuffer.length === receivedBuffer.length &&
    timingSafeEqual(expectedBuffer, receivedBuffer)
  );
}

export function encryptOAuthToken(token: string, encodedKey: string) {
  if (!token) {
    throw new TypeError("OAuth token cannot be empty.");
  }

  const key = parseEncryptionKey(encodedKey);
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(token, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();

  return {
    ciphertext: [
      tokenFormatVersion,
      iv.toString("base64url"),
      authTag.toString("base64url"),
      ciphertext.toString("base64url"),
    ].join("."),
    keyVersion,
  };
}

export function decryptOAuthToken(ciphertext: string, encodedKey: string) {
  const [version, ivValue, authTagValue, encryptedValue, extra] = ciphertext.split(".");

  if (
    version !== tokenFormatVersion ||
    !ivValue ||
    !authTagValue ||
    !encryptedValue ||
    extra
  ) {
    throw new TypeError("Encrypted OAuth token format is invalid.");
  }

  const decipher = createDecipheriv(
    "aes-256-gcm",
    parseEncryptionKey(encodedKey),
    Buffer.from(ivValue, "base64url"),
  );
  decipher.setAuthTag(Buffer.from(authTagValue, "base64url"));

  return Buffer.concat([
    decipher.update(Buffer.from(encryptedValue, "base64url")),
    decipher.final(),
  ]).toString("utf8");
}
