import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/session";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";

export async function POST(request: NextRequest) {
  const session = await getAuthSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const body = await request.json();
  const response = await fetchBackend("/enrollments/admin", {
    method: "POST",
    accessToken: session.accessToken,
    body: JSON.stringify(body),
  });

  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    return NextResponse.json(
      { error: (json as { message?: string }).message ?? "Enrollment failed" },
      { status: response.status },
    );
  }

  return NextResponse.json({
    success: true,
    data: extractEnvelopeData(json),
  });
}
