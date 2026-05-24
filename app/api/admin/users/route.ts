import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/session";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";

export async function GET(request: NextRequest) {
  const session = await getAuthSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const search = request.nextUrl.searchParams.get("search") ?? "";
  const response = await fetchBackend(
    `/users?search=${encodeURIComponent(search)}&limit=20`,
    { accessToken: session.accessToken },
  );
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    return NextResponse.json(
      { error: (json as { message?: string }).message },
      { status: response.status },
    );
  }
  return NextResponse.json({ success: true, data: extractEnvelopeData(json) });
}
