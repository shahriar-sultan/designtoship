import { NextRequest, NextResponse } from "next/server";
import { getAuthSession } from "@/lib/session";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getAuthSession();
  if (!session?.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params;
  const body = await request.json();
  const payload = {
    ...body,
    courseId: id,
    questions: body.questions ?? [
      {
        question: "Submit your written response",
        type: "ESSAY",
        correctAnswer: "Reviewed by instructor",
        order: 1,
        points: 100,
      },
    ],
  };
  const response = await fetchBackend("/assessments", {
    method: "POST",
    accessToken: session.accessToken,
    body: JSON.stringify(payload),
  });
  const json = await response.json().catch(() => ({}));
  if (!response.ok) {
    return NextResponse.json(
      { error: (json as { message?: string }).message },
      { status: response.status },
    );
  }
  return NextResponse.json({ success: true, data: extractEnvelopeData(json) });
}
