import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/session";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";

export async function proxyToBackend(
  path: string,
  init?: RequestInit,
): Promise<NextResponse> {
  const token = await getAccessToken();
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const response = await fetchBackend(path, {
      ...init,
      accessToken: token,
    });
    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error: (json as { message?: string }).message ?? "Request failed",
          ...json,
        },
        { status: response.status },
      );
    }

    const data = extractEnvelopeData(json);
    return NextResponse.json(
      data !== null && data !== undefined ? { success: true, data } : json,
    );
  } catch (error) {
    console.error(`BFF proxy error ${path}:`, error);
    return NextResponse.json(
      { error: "Failed to reach backend" },
      { status: 502 },
    );
  }
}
