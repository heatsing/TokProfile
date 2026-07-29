import "server-only";

type OptionalServerVariable =
  | "R2_ACCESS_KEY_ID"
  | "R2_ACCOUNT_ID"
  | "R2_BUCKET_NAME"
  | "R2_SECRET_ACCESS_KEY"
  | "SUPABASE_SERVICE_ROLE_KEY"
  | "TIKTOK_CLIENT_KEY"
  | "TIKTOK_CLIENT_SECRET"
  | "TIKTOK_REDIRECT_URI"
  | "TIKTOK_TOKEN_ENCRYPTION_KEY"
  | "UPSTASH_REDIS_REST_TOKEN"
  | "UPSTASH_REDIS_REST_URL";

function readOptional(name: OptionalServerVariable): string | undefined {
  const value = process.env[name]?.trim();
  return value || undefined;
}

export function getServerEnv() {
  return Object.freeze({
    supabaseServiceRoleKey: readOptional("SUPABASE_SERVICE_ROLE_KEY"),
    tiktokClientKey: readOptional("TIKTOK_CLIENT_KEY"),
    tiktokClientSecret: readOptional("TIKTOK_CLIENT_SECRET"),
    tiktokRedirectUri: readOptional("TIKTOK_REDIRECT_URI"),
    tiktokTokenEncryptionKey: readOptional("TIKTOK_TOKEN_ENCRYPTION_KEY"),
    upstashRedisRestUrl: readOptional("UPSTASH_REDIS_REST_URL"),
    upstashRedisRestToken: readOptional("UPSTASH_REDIS_REST_TOKEN"),
    r2AccountId: readOptional("R2_ACCOUNT_ID"),
    r2AccessKeyId: readOptional("R2_ACCESS_KEY_ID"),
    r2SecretAccessKey: readOptional("R2_SECRET_ACCESS_KEY"),
    r2BucketName: readOptional("R2_BUCKET_NAME"),
  });
}
