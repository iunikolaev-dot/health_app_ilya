import { SignJWT, jwtVerify } from 'jose';
import { cookies } from 'next/headers';

const secret = new TextEncoder().encode(process.env.COOKIE_SECRET || 'fallback-secret');

export interface SessionData {
  accessToken: string;
  refreshToken?: string;
  expiresAt: number;
  [key: string]: unknown; // Add index signature for JWTPayload compatibility
}

export async function createSession(data: SessionData): Promise<string> {
  const token = await new SignJWT(data)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(secret);

  return token;
}

export async function getSession(): Promise<SessionData | null> {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get('session')?.value;

    if (!token) {
      return null;
    }

    const { payload } = await jwtVerify(token, secret);
    return payload as SessionData;
  } catch (error) {
    console.error('Session verification failed:', error);
    return null;
  }
}

export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60, // 24 hours
    path: '/',
  });
}

export async function clearSession(): Promise<void> {
  const cookieStore = cookies();
  cookieStore.delete('session');
}
