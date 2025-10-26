import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { fetchWhoopWorkouts } from '@/lib/whoop';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const start = searchParams.get('start');
    const end = searchParams.get('end');

    if (!start || !end) {
      return NextResponse.json(
        { error: 'Missing start or end parameters' },
        { status: 400 }
      );
    }

    const workouts = await fetchWhoopWorkouts(session, start, end);
    return NextResponse.json(workouts);
  } catch (error) {
    console.error('Workouts fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workouts' },
      { status: 500 }
    );
  }
}




