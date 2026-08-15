const DEFAULT_SITE_URL = "https://tokprofile.com";

function parsePublicUrl(value: string | undefined, fallback: string): string {
  const candidate = value?.trim() || fallback;

  try {
    return new URL(candidate).origin;
  } catch {
    throw new Error(
      `NEXT_PUBLIC_SITE_URL must be an absolute URL. Received: "${candidate}"`,
    );
  }
}

export const publicEnv = Object.freeze({
  siteUrl: parsePublicUrl(process.env.NEXT_PUBLIC_SITE_URL, DEFAULT_SITE_URL),
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || undefined,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || undefined,
});
