import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken } from '@/lib/whoop';
import { createSession, setSessionCookie } from '@/lib/session';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');

    console.log('Callback received:', { code: !!code, error, state, url: request.url });

    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.json({ 
        error: 'OAuth error', 
        details: error,
        url: request.url,
        searchParams: Object.fromEntries(searchParams.entries())
      });
    }

    if (!code) {
      console.error('No code received');
      return NextResponse.json({ 
        error: 'No code received',
        url: request.url,
        searchParams: Object.fromEntries(searchParams.entries())
      });
    }

    console.log('Exchanging code for token...');
    // Exchange code for tokens
    const tokenData = await exchangeCodeForToken(code);
    console.log('Token exchange successful');
    
    // Create session with token data
    const sessionData = {
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token,
      expiresAt: Date.now() + (tokenData.expires_in * 1000),
    };

    console.log('Creating session...');
    const sessionToken = await createSession(sessionData);
    await setSessionCookie(sessionToken);
    console.log('Session created successfully');

    // Redirect to main page
    return NextResponse.redirect(new URL('/?success=true', request.url));
  } catch (error) {
    console.error('Callback error:', error);
    return NextResponse.json({ 
      error: 'Callback error', 
      details: error instanceof Error ? error.message : 'Unknown error',
      url: request.url
    });
  }
}