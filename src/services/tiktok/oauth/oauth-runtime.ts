import "server-only";

import { createClient } from "@supabase/supabase-js";

import { publicEnv } from "@/config/env";
import { getServerEnv } from "@/config/server-env";
import { TikTokDisplayApiProvider } from "@/services/tiktok/analytics/display-api.provider";
import { captureAuthorizedCreatorSnapshot } from "@/services/tiktok/analytics/analytics-runtime";

import { TikTokAuthorizationService } from "./authorization.service";
import { TikTokOAuthClient, buildTikTokAuthorizationUrl } from "./oauth-client";
import { createOAuthState } from "./security";
import { SupabaseTikTokAuthorizationRepository } from "./supabase-authorization.repository";

interface TikTokOAuthRuntime {
  authorizationService: TikTokAuthorizationService;
  buildAuthorizationUrl(state: string): URL;
}

let runtime: TikTokOAuthRuntime | null | undefined;
let initialized = false;

function validateRedirectUri(value: string) {
  const url = new URL(value);

  if (
    url.protocol !== "https:" ||
    url.search ||
    url.hash ||
    !url.pathname.startsWith("/")
  ) {
    throw new TypeError(
      "TIKTOK_REDIRECT_URI must be a static absolute HTTPS URL without query parameters or a fragment.",
    );
  }

  return url.toString();
}

function createRuntime(): TikTokOAuthRuntime | null {
  const serverEnv = getServerEnv();
  const supabaseUrl = publicEnv.supabaseUrl;

  if (
    !supabaseUrl ||
    !serverEnv.supabaseServiceRoleKey ||
    !serverEnv.tiktokClientKey ||
    !serverEnv.tiktokClientSecret ||
    !serverEnv.tiktokRedirectUri ||
    !serverEnv.tiktokTokenEncryptionKey
  ) {
    return null;
  }

  const redirectUri = validateRedirectUri(serverEnv.tiktokRedirectUri);
  const supabase = createClient(supabaseUrl, serverEnv.supabaseServiceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  const repository = new SupabaseTikTokAuthorizationRepository(supabase);
  const oauthClient = new TikTokOAuthClient({
    clientKey: serverEnv.tiktokClientKey,
    clientSecret: serverEnv.tiktokClientSecret,
    redirectUri,
  });
  const authorizationService = new TikTokAuthorizationService({
    encryptionKey: serverEnv.tiktokTokenEncryptionKey,
    oauthClient,
    provider: new TikTokDisplayApiProvider(),
    repository,
  });

  return {
    authorizationService,
    buildAuthorizationUrl(state) {
      return buildTikTokAuthorizationUrl({
        clientKey: serverEnv.tiktokClientKey!,
        redirectUri,
        state,
      });
    },
  };
}

export function getTikTokOAuthRuntime() {
  if (!initialized) {
    runtime = createRuntime();
    initialized = true;
  }

  return runtime;
}

export function createTikTokOAuthRequest() {
  const currentRuntime = getTikTokOAuthRuntime();
  if (!currentRuntime) {
    return null;
  }

  const state = createOAuthState();
  return {
    authorizationUrl: currentRuntime.buildAuthorizationUrl(state),
    state,
  };
}

export async function captureTikTokSnapshotForSession(sessionToken: string) {
  const currentRuntime = getTikTokOAuthRuntime();
  if (!currentRuntime) {
    throw new Error("TikTok OAuth is not configured.");
  }

  const record = await currentRuntime.authorizationService.findSession(sessionToken);
  if (!record) {
    return null;
  }

  const accessToken =
    await currentRuntime.authorizationService.getValidAccessToken(record);

  return captureAuthorizedCreatorSnapshot({
    accessToken,
    expectedUsername: record.username,
    rateLimitKey: String(record.authorizationId),
  });
}
