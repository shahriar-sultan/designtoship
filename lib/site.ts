const DEFAULT_SITE_URL = "https://www.thedesignworkbench.com";

function normalizePublicSiteUrl(url: string): string {
  try {
    const parsed = new URL(url);
    if (
      parsed.protocol === "http:" &&
      parsed.hostname !== "localhost" &&
      parsed.hostname !== "127.0.0.1"
    ) {
      parsed.protocol = "https:";
      return parsed.toString().replace(/\/$/, "");
    }
    return url.replace(/\/$/, "");
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export const SITE_URL = normalizePublicSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL ?? DEFAULT_SITE_URL,
);

export const CANONICAL_HOST = "www.thedesignworkbench.com";
