import { createHash, randomUUID } from "node:crypto";
import { mkdir, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { isAbsolute, join, relative, resolve } from "node:path";

import { validateMediaFile } from "./download-security";
import { DownloaderSecurityError } from "./errors";
import { TEMPORARY_MEDIA_RETENTION_MINUTES } from "./preview.service";
import type { TemporaryMediaRecord } from "./types";

const TOKEN_PATTERN = /^[0-9a-f-]{36}$/i;

export class TemporaryMediaStore {
  private readonly retentionMs: number;
  private readonly root: string;

  constructor(options: { retentionMs?: number; root?: string } = {}) {
    this.root = resolve(options.root ?? join(tmpdir(), "toklens-temporary-media"));
    this.retentionMs = options.retentionMs ?? TEMPORARY_MEDIA_RETENTION_MINUTES * 60_000;
  }

  async store(input: {
    bytes: Uint8Array;
    contentLength: number;
    contentType: string;
  }): Promise<TemporaryMediaRecord> {
    const validated = validateMediaFile(input);
    await this.ensureRoot();
    await this.cleanupExpired();

    const token = randomUUID();
    const createdAt = new Date();
    const record: TemporaryMediaRecord = {
      ...validated,
      createdAt: createdAt.toISOString(),
      expiresAt: new Date(createdAt.getTime() + this.retentionMs).toISOString(),
      token,
    };

    await writeFile(this.mediaPath(token), input.bytes, {
      flag: "wx",
      mode: 0o600,
    });
    await writeFile(this.metadataPath(token), JSON.stringify(record), {
      encoding: "utf8",
      flag: "wx",
      mode: 0o600,
    });

    return record;
  }

  async consume(token: string): Promise<{
    bytes: Uint8Array;
    record: TemporaryMediaRecord;
  }> {
    this.validateToken(token);
    await this.ensureRoot();

    let record: TemporaryMediaRecord;

    try {
      record = JSON.parse(
        await readFile(this.metadataPath(token), "utf8"),
      ) as TemporaryMediaRecord;
    } catch (error) {
      throw new DownloaderSecurityError(
        "TEMPORARY_FILE_NOT_FOUND",
        "This temporary download is no longer available.",
        { cause: error },
      );
    }

    if (Date.parse(record.expiresAt) <= Date.now()) {
      await this.remove(token);
      throw new DownloaderSecurityError(
        "TEMPORARY_FILE_EXPIRED",
        "This temporary download has expired.",
      );
    }

    try {
      const bytes = await readFile(this.mediaPath(token));
      const checksum = createHash("sha256").update(bytes).digest("hex");

      if (bytes.byteLength !== record.size || checksum !== record.checksum) {
        throw new DownloaderSecurityError(
          "INVALID_FILE_SIGNATURE",
          "The temporary media file failed its integrity check.",
        );
      }

      return { bytes: Uint8Array.from(bytes), record };
    } finally {
      await this.remove(token);
    }
  }

  async cleanupExpired(now = Date.now()): Promise<number> {
    await this.ensureRoot();
    const entries = await readdir(this.root, { withFileTypes: true });
    let removed = 0;

    for (const entry of entries) {
      if (!entry.isFile()) {
        continue;
      }

      const entryPath = this.safePath(entry.name);
      const entryStat = await stat(entryPath);

      if (now - entryStat.mtimeMs >= this.retentionMs) {
        await rm(entryPath, { force: true });
        removed += 1;
      }
    }

    return removed;
  }

  private async ensureRoot(): Promise<void> {
    if (!isAbsolute(this.root)) {
      throw new DownloaderSecurityError(
        "INTERNAL_ERROR",
        "Temporary media storage must use an absolute directory.",
      );
    }

    await mkdir(this.root, { mode: 0o700, recursive: true });
  }

  private mediaPath(token: string): string {
    this.validateToken(token);
    return this.safePath(`${token}.mp4`);
  }

  private metadataPath(token: string): string {
    this.validateToken(token);
    return this.safePath(`${token}.json`);
  }

  private async remove(token: string): Promise<void> {
    await Promise.all([
      rm(this.mediaPath(token), { force: true }),
      rm(this.metadataPath(token), { force: true }),
    ]);
  }

  private safePath(filename: string): string {
    const target = resolve(this.root, filename);
    const relativeTarget = relative(this.root, target);

    if (
      !relativeTarget ||
      relativeTarget.startsWith("..") ||
      isAbsolute(relativeTarget)
    ) {
      throw new DownloaderSecurityError("INTERNAL_ERROR", "Unsafe temporary media path.");
    }

    return target;
  }

  private validateToken(token: string): void {
    if (!TOKEN_PATTERN.test(token)) {
      throw new DownloaderSecurityError(
        "TEMPORARY_FILE_NOT_FOUND",
        "This temporary download is not available.",
      );
    }
  }
}

export const temporaryMediaStore = new TemporaryMediaStore();
