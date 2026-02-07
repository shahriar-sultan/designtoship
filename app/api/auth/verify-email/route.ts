import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();

    // Validate input
    if (!token) {
      return NextResponse.json(
        { error: 'Verification token is required' },
        { status: 400 }
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_BFF_API_URL;
    if (!apiUrl) {
      console.error('NEXT_PUBLIC_BFF_API_URL is not configured');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Call external BFF API
    const response = await fetch(`${apiUrl}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'LMS-Platform-Frontend/1.0',
      },
      body: JSON.stringify({ token }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Email verification failed' },
        { status: response.status }
      );
    }

    const verificationData = await response.json();

    // Validate response structure
    if (!verificationData || !verificationData.success) {
      console.error('Invalid verification response structure from BFF API');
      return NextResponse.json(
        { error: 'Invalid response from verification service' },
        { status: 500 }
      );
    }

    // Return verification data
    return NextResponse.json({
      success: true,
      message: verificationData.message,
      email: verificationData.data?.email,
      verifiedAt: verificationData.data?.verifiedAt,
      ...verificationData.data
    });

  } catch (error) {
    console.error('Email verification BFF route error:', error);
    return NextResponse.json(
      { error: 'Internal server error during email verification' },
      { status: 500 }
    );
  }
}