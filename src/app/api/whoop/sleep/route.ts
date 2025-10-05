import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { fetchWhoopSleep } from '@/lib/whoop';

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

    const sleep = await fetchWhoopSleep(session, start, end);
    return NextResponse.json(sleep);
  } catch (error) {
    console.error('Sleep fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch sleep' },
      { status: 500 }
    );
  }
}
