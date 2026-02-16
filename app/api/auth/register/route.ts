import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, profession } =
      await request.json();

    // Validate input
    if (!email || !password || !firstName || !lastName) {
      return NextResponse.json(
        { error: "Email, password, first name, and last name are required" },
        { status: 400 },
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_BFF_API_URL;
    if (!apiUrl) {
      console.error("NEXT_PUBLIC_BFF_API_URL is not configured");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 },
      );
    }

    // Call external BFF API
    const response = await fetch(`${apiUrl}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": "LMS-Platform-Frontend/1.0",
      },
      body: JSON.stringify({
        email,
        password,
        firstName,
        lastName,
        profession,
      }),
      credentials: "include",
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || "Registration failed" },
        { status: response.status },
      );
    }

    const registrationData = await response.json();

    // Validate response structure
    if (!registrationData || !registrationData.success) {
      console.error("Invalid registration response structure from BFF API");
      return NextResponse.json(
        { error: "Invalid response from registration service" },
        { status: 500 },
      );
    }

    // Return registration data including any verification token
    return NextResponse.json({
      success: true,
      message: registrationData.message,
      user: registrationData.data?.user,
      verificationToken: registrationData.data?.verificationToken,
      ...registrationData.data,
    });
  } catch (error) {
    console.error("Registration BFF route error:", error);
    return NextResponse.json(
      { error: "Internal server error during registration" },
      { status: 500 },
    );
  }
}
