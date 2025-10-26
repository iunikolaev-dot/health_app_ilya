import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { fetchWhoopCycles } from '@/lib/whoop';

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

    const cycles = await fetchWhoopCycles(session, start, end);
    return NextResponse.json(cycles);
  } catch (error) {
    console.error('Cycles fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch cycles' },
      { status: 500 }
    );
  }
}

