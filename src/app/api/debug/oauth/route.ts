import { NextRequest, NextResponse } from 'next/server';
import { generateAuthUrl } from '@/lib/whoop';

export async function GET(request: NextRequest) {
  try {
    // Generate the auth URL to see what's being sent to WHOOP
    const authUrl = generateAuthUrl();
    
    // Parse the URL to show the parameters
    const url = new URL(authUrl);
    const params = Object.fromEntries(url.searchParams.entries());
    
    return NextResponse.json({
      message: 'OAuth Debug Information',
      generatedAuthUrl: authUrl,
      urlParameters: params,
      environmentCheck: {
        clientId: process.env.WHOOP_CLIENT_ID ? 'Set' : 'Missing',
        clientSecret: process.env.WHOOP_CLIENT_SECRET ? 'Set' : 'Missing',
        redirectUri: process.env.WHOOP_REDIRECT_URI,
        expectedRedirectUri: 'https://health-app-ilya.vercel.app/api/whoop/callback'
      },
      instructions: {
        step1: 'Check if the generated auth URL looks correct',
        step2: 'Verify client_id matches your WHOOP app',
        step3: 'Verify redirect_uri matches exactly',
        step4: 'Make sure your WHOOP app is active/enabled'
      }
    });
  } catch (error) {
    return NextResponse.json({
      error: 'Failed to generate auth URL',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}




