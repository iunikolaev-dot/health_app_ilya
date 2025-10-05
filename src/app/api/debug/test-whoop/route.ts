import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  // Let's test the token exchange directly to see if the credentials work
  const testData = {
    message: 'WHOOP Credentials Test',
    clientId: process.env.WHOOP_CLIENT_ID,
    clientSecret: process.env.WHOOP_CLIENT_SECRET ? 'Set (hidden)' : 'Missing',
    redirectUri: process.env.WHOOP_REDIRECT_URI,
    possibleIssues: [
      'WHOOP app might need to be approved/activated by WHOOP team',
      'Client secret might be incorrect',
      'WHOOP might require additional verification',
      'App might be in sandbox mode and need production approval'
    ],
    troubleshooting: {
      step1: 'Check WHOOP developer dashboard for any pending approvals',
      step2: 'Verify the app shows as "Active" not just "Created"',
      step3: 'Try regenerating the client secret',
      step4: 'Check if there are any error messages in WHOOP dashboard',
      step5: 'Contact WHOOP support if app appears active but OAuth fails'
    },
    testUrl: 'https://api.prod.whoop.com/oauth/oauth2/auth?response_type=code&client_id=8c8079d3-80ce-4239-942b-45cf7013eecd&redirect_uri=https%3A%2F%2Fhealth-app-ilya.vercel.app%2Fapi%2Fwhoop%2Fcallback&scope=read%3Aprofile+read%3Acycles&state=test123'
  };

  return NextResponse.json(testData);
}