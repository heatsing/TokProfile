import { describe, expect, it } from "vitest";

import {
  MAX_MEDIA_FILE_SIZE,
  validateDownloaderUrl,
  validateMediaFile,
} from "../download-security";
import { DownloaderSecurityError } from "../errors";

const validMp4Bytes = new Uint8Array([
  0x00, 0x00, 0x00, 0x10, 0x66, 0x74, 0x79, 0x70, 0x69, 0x73, 0x6f, 0x6d, 0x00, 0x00,
  0x00, 0x00,
]);

describe("validateDownloaderUrl", () => {
  it("accepts a full HTTPS TikTok video URL", () => {
    expect(
      validateDownloaderUrl(
        "https://www.tiktok.com/@atlas.moves/video/7480000000000000000",
      ),
    ).toMatchObject({
      contentId: "7480000000000000000",
      kind: "video_url",
      username: "atlas.moves",
    });
  });

  it.each([
    "https://example.com/@atlas.moves/video/7480000000000000000",
    "http://www.tiktok.com/@atlas.moves/video/7480000000000000000",
    "https://www.tiktok.com/@atlas.moves",
    "https://vm.tiktok.com/ZM123abc/",
  ])("rejects an unsafe or unsupported URL: %s", (input) => {
    expect(() => validateDownloaderUrl(input)).toThrow(DownloaderSecurityError);
  });
});

describe("validateMediaFile", () => {
  it("accepts an MP4 with matching MIME, length and signature", () => {
    expect(
      validateMediaFile({
        bytes: validMp4Bytes,
        contentLength: validMp4Bytes.byteLength,
        contentType: "video/mp4; charset=binary",
      }),
    ).toMatchObject({
      extension: ".mp4",
      mimeType: "video/mp4",
      size: validMp4Bytes.byteLength,
    });
  });

  it.each([
    {
      expectedCode: "INVALID_FILE_TYPE",
      input: {
        bytes: validMp4Bytes,
        contentLength: validMp4Bytes.byteLength,
        contentType: "text/html",
      },
    },
    {
      expectedCode: "INVALID_FILE_SIGNATURE",
      input: {
        bytes: new Uint8Array(16),
        contentLength: 16,
        contentType: "video/mp4",
      },
    },
    {
      expectedCode: "FILE_SIZE_MISMATCH",
      input: {
        bytes: validMp4Bytes,
        contentLength: validMp4Bytes.byteLength - 1,
        contentType: "video/mp4",
      },
    },
    {
      expectedCode: "FILE_TOO_LARGE",
      input: {
        bytes: validMp4Bytes,
        contentLength: MAX_MEDIA_FILE_SIZE + 1,
        contentType: "video/mp4",
      },
    },
  ])("rejects unsafe file input: $expectedCode", ({ input, expectedCode }) => {
    expect.assertions(2);

    try {
      validateMediaFile(input);
    } catch (error) {
      expect(error).toBeInstanceOf(DownloaderSecurityError);
      expect((error as DownloaderSecurityError).code).toBe(expectedCode);
    }
  });
});
