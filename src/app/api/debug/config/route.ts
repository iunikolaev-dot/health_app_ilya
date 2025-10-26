import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Don't expose secrets in production, just check if they exist
  const config = {
    hasClientId: !!process.env.WHOOP_CLIENT_ID,
    hasClientSecret: !!process.env.WHOOP_CLIENT_SECRET,
    redirectUri: process.env.WHOOP_REDIRECT_URI,
    baseUrl: process.env.NEXTAUTH_URL,
  };

  return NextResponse.json({
    message: 'WHOOP OAuth2 Configuration Check',
    config,
    instructions: {
      step1: 'Verify WHOOP_CLIENT_ID is set',
      step2: 'Verify WHOOP_CLIENT_SECRET is set', 
      step3: 'Verify WHOOP_REDIRECT_URI matches your Vercel URL',
      step4: 'Check WHOOP developer dashboard settings',
    },
    commonIssues: [
      'Redirect URI mismatch between Vercel and WHOOP dashboard',
      'Client ID/Secret copied incorrectly',
      'WHOOP app not activated',
      'Environment variables not set in Vercel'
    ]
  });
}




