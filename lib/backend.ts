/**
 * Server-side backend API helpers for BFF route handlers.
 */
export function getBackendApiUrl(): string {
  const url =
    process.env.BACKEND_API_URL ??
    process.env.NEXT_PUBLIC_BFF_API_URL ??
    process.env.NEXT_PUBLIC_API_URL;
  if (!url) {
    throw new Error(
      "BACKEND_API_URL (or NEXT_PUBLIC_BFF_API_URL) is not configured",
    );
  }
  return url.replace(/\/$/, "");
}

export type BackendEnvelope<T = unknown> = {
  success: boolean;
  statusCode?: number;
  message?: string;
  data?: T;
};

export function extractEnvelopeData<T>(json: unknown): T | null {
  if (!json || typeof json !== "object") return null;
  const envelope = json as BackendEnvelope<T>;
  if ("data" in envelope && envelope.data !== undefined) {
    return envelope.data as T;
  }
  return json as T;
}

export async function fetchBackend(
  path: string,
  init?: RequestInit & { accessToken?: string },
): Promise<Response> {
  const base = getBackendApiUrl();
  const url = path.startsWith("http") ? path : `${base}${path.startsWith("/") ? path : `/${path}`}`;
  const headers = new Headers(init?.headers);
  if (!headers.has("Content-Type") && init?.body) {
    headers.set("Content-Type", "application/json");
  }
  if (init?.accessToken) {
    headers.set("Authorization", `Bearer ${init.accessToken}`);
  }
  const { accessToken: _token, ...rest } = init ?? {};
  return fetch(url, { ...rest, headers });
}
