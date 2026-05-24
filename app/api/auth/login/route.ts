import { NextRequest, NextResponse } from "next/server";
import { loginWithBackend } from "@/lib/auth-options";
import { extractEnvelopeData as extractData } from "@/lib/backend";

type LoginData = {
  user?: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    role?: string;
  };
  accessToken?: string;
  refreshToken?: string;
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const { response, json } = await loginWithBackend(email, password);

    if (!response.ok) {
      const message =
        (json as { message?: string })?.message ?? "Authentication failed";
      return NextResponse.json({ error: message }, { status: response.status });
    }

    const data = extractData<LoginData>(json);
    const user = data?.user;

    if (!user?.id || !user?.email || !data?.accessToken) {
      return NextResponse.json(
        { error: "Invalid response from authentication service" },
        { status: 500 },
      );
    }

    const res = NextResponse.json({
      id: user.id,
      email: user.email,
      name: [user.firstName, user.lastName].filter(Boolean).join(" "),
      role: user.role ?? "STUDENT",
      accessToken: data.accessToken,
    });

    if (data.refreshToken) {
      res.cookies.set("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
        maxAge: 7 * 24 * 60 * 60,
      });
    }

    return res;
  } catch (error) {
    console.error("Auth BFF route error:", error);
    return NextResponse.json(
      { error: "Internal server error during authentication" },
      { status: 500 },
    );
  }
}
