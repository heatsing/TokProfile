import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";

import { hasTrustedMutationOrigin } from "../request-security";

describe("OAuth mutation origin validation", () => {
  it("accepts the externally visible host behind a local proxy", () => {
    const request = new NextRequest(
      "http://localhost:3000/api/tiktok-analytics/capture",
      {
        headers: {
          host: "127.0.0.1:3000",
          origin: "http://127.0.0.1:3000",
        },
        method: "POST",
      },
    );

    expect(hasTrustedMutationOrigin(request)).toBe(true);
  });

  it("rejects a cross-site origin", () => {
    const request = new NextRequest(
      "https://tokprofile.com/api/tiktok-analytics/capture",
      {
        headers: {
          host: "tokprofile.com",
          origin: "https://evil.example",
        },
        method: "POST",
      },
    );

    expect(hasTrustedMutationOrigin(request)).toBe(false);
  });

  it("rejects requests without an Origin header", () => {
    const request = new NextRequest(
      "https://tokprofile.com/api/tiktok-analytics/capture",
      {
        method: "POST",
      },
    );

    expect(hasTrustedMutationOrigin(request)).toBe(false);
  });
});
