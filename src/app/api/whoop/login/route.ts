import { NextRequest, NextResponse } from 'next/server';
import { generateAuthUrl } from '@/lib/whoop';

export async function GET(request: NextRequest) {
  try {
    const authUrl = generateAuthUrl();
    return NextResponse.redirect(authUrl);
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Failed to initiate login' },
      { status: 500 }
    );
  }
}

