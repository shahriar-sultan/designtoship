import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Implement proper authentication after fixing NextAuth issues
    // const session = await auth();
    // if (!session?.user) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const apiUrl = process.env.NEXT_PUBLIC_BFF_API_URL;
    if (!apiUrl) {
      throw new Error('NEXT_PUBLIC_BFF_API_URL is not configured');
    }

    // Call backend API for dashboard stats
    const response = await fetch(`${apiUrl}/dashboard/stats`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // TODO: Add proper authentication headers after fixing NextAuth
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`Backend API error: ${response.status}`);
    }

    const data = await response.json();

    // Validate required fields
    if (!data || typeof data.totalCourses !== 'number' || typeof data.activeStudents !== 'number') {
      console.error('Invalid stats data structure from BFF API:', data);
      return NextResponse.json(
        { error: 'Invalid data structure from backend API' },
        { status: 502 }
      );
    }

    // Return data as-is from backend (no transformation needed)
    return NextResponse.json(data);
  } catch (error) {
    console.error('Dashboard stats API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch dashboard statistics' },
      { status: 500 }
    );
  }
}