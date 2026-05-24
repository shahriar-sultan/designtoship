import { NextRequest, NextResponse } from "next/server";
import { extractEnvelopeData, fetchBackend } from "@/lib/backend";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, firstName, lastName, name, phone, profession } =
      body;

    let resolvedFirst = firstName;
    let resolvedLast = lastName;
    if (name && (!resolvedFirst || !resolvedLast)) {
      const parts = String(name).trim().split(/\s+/);
      resolvedFirst = resolvedFirst ?? parts[0] ?? "";
      resolvedLast = resolvedLast ?? parts.slice(1).join(" ") ?? "";
    }

    if (!email || !password || !resolvedFirst) {
      return NextResponse.json(
        { error: "Email, password, and name are required" },
        { status: 400 },
      );
    }

    const response = await fetchBackend("/auth/register", {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        firstName: resolvedFirst,
        lastName: resolvedLast || resolvedFirst,
        phone: phone || undefined,
        profession: profession || undefined,
      }),
    });

    const json = await response.json().catch(() => ({}));

    if (!response.ok) {
      return NextResponse.json(
        {
          error:
            (json as { message?: string }).message ?? "Registration failed",
        },
        { status: response.status },
      );
    }

    const data = extractEnvelopeData(json);
    return NextResponse.json({
      success: true,
      message:
        (json as { message?: string }).message ??
        "Registration successful. Please check your email to verify your account.",
      data,
    });
  } catch (error) {
    console.error("Registration BFF route error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 },
    );
  }
}
