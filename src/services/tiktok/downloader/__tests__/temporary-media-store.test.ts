import { mkdtemp, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

import { afterEach, describe, expect, it } from "vitest";

import { DownloaderSecurityError } from "../errors";
import { TemporaryMediaStore } from "../temporary-media-store";

const validMp4Bytes = new Uint8Array([
  0x00, 0x00, 0x00, 0x10, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00,
  0x00, 0x00,
]);

const temporaryRoots: string[] = [];

async function createStore(retentionMs = 60_000) {
  const root = await mkdtemp(join(tmpdir(), "toklens-media-test-"));
  temporaryRoots.push(root);
  return new TemporaryMediaStore({ retentionMs, root });
}

afterEach(async () => {
  await Promise.all(
    temporaryRoots.splice(0).map((root) => rm(root, { force: true, recursive: true })),
  );
});

describe("TemporaryMediaStore", () => {
  it("uses one-time delivery and deletes the temporary copy", async () => {
    const store = await createStore();
    const record = await store.store({
      bytes: validMp4Bytes,
      contentLength: validMp4Bytes.byteLength,
      contentType: "video/mp4",
    });

    const consumed = await store.consume(record.token);

    expect(consumed.bytes).toEqual(validMp4Bytes);
    await expect(store.consume(record.token)).rejects.toMatchObject({
      code: "TEMPORARY_FILE_NOT_FOUND",
    });
  });

  it("removes expired media and metadata files", async () => {
    const store = await createStore(1_000);
    const record = await store.store({
      bytes: validMp4Bytes,
      contentLength: validMp4Bytes.byteLength,
      contentType: "video/mp4",
    });

    const removed = await store.cleanupExpired(Date.now() + 2_000);

    expect(removed).toBe(2);
    await expect(store.consume(record.token)).rejects.toBeInstanceOf(
      DownloaderSecurityError,
    );
  });

  it("rejects path traversal tokens", async () => {
    const store = await createStore();

    await expect(store.consume("../../secret")).rejects.toMatchObject({
      code: "TEMPORARY_FILE_NOT_FOUND",
    });
  });
});
