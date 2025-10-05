import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/whoop';
import { createSession, setSessionCookie } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(new URL('/?error=oauth_error', request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/?error=no_code', request.url));
    }

    // Exchange code for tokens
    const tokenData = await exchangeCodeForToken(code);
    
    // Create session with token data
    const sessionData = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: Date.now() + (tokenData.expires_in * 1000),
    };

    const sessionToken = await createSession(sessionData);
    await setSessionCookie(sessionToken);

    // Redirect to main page
    return NextResponse.redirect(new URL('/?success=true', request.url));
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.redirect(new URL('/?error=callback_error', request.url));
  }
}
