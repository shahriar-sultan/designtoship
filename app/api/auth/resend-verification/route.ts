import { NextRequest, NextResponse } from "next/server";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const response = await fetchBackend("/auth/resend-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            (json as { message?: string }).message ??
            "Failed to resend verification",
        },
        { status: response.status },
      );
    }

    return NextResponse.json({
      success: true,
      message:
        (json as { message?: string }).message ??
        "Verification email sent if the account exists.",
      data: extractEnvelopeData(json),
    });
  } catch (error) {
    console.error("Resend verification BFF error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
