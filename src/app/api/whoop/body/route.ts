import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/session';
import { fetchWhoopBodyMeasurements } from '@/lib/whoop';

export async function GET(request: NextRequest) {
  try {
    const session = await getSession();
    
    if (!session) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const bodyMeasurements = await fetchWhoopBodyMeasurements(session);
    return NextResponse.json(bodyMeasurements);
  } catch (error) {
    console.error('Body measurements fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch body measurements' },
      { status: 500 }
    );
  }
}




