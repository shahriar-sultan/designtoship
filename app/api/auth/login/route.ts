import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
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
    const response = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'LMS-Platform-Frontend/1.0',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Authentication failed' },
        { status: response.status }
      );
    }

    const userData = await response.json();

    // Validate response structure
    if (!userData || !userData.id || !userData.email) {
      console.error('Invalid user data structure from BFF API');
      return NextResponse.json(
        { error: 'Invalid response from authentication service' },
        { status: 500 }
      );
    }

    // Return user data for NextAuth
    return NextResponse.json({
      id: userData.id,
      email: userData.email,
      name: userData.name,
      role: userData.role || 'user',
      ...userData
    });

  } catch (error) {
    console.error('Auth BFF route error:', error);
    return NextResponse.json(
      { error: 'Internal server error during authentication' },
      { status: 500 }
    );
  }
}