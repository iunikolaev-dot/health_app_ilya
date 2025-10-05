import { SessionData } from './session';

const WHOOP_BASE_URL = 'https://api.prod.whoop.com/developer/v2';

export interface WhoopProfile {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

export interface WhoopCycle {
  id: number;
  user_id: number;
  start: string;
  end: string;
  timezone_offset: string;
  score_state: string;
  score: {
    strain: number;
    kilojoule: number;
    average_heart_rate: number;
    max_heart_rate: number;
  };
  recovery: {
    score: number;
    resting_heart_rate: number;
    hrv_rmssd_milli: number;
    spo2_percentage: number;
  };
  sleep: {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    start: string;
    end: string;
    timezone_offset: string;
    nap: boolean;
    score_state: string;
    score: {
      stage_summary: {
        total_in_bed_time_milli: number;
        total_awake_time_milli: number;
        total_no_data_time_milli: number;
        total_light_sleep_time_milli: number;
        total_slow_wave_sleep_time_milli: number;
        total_rem_sleep_time_milli: number;
        sleep_cycle_count: number;
        disturbance_count: number;
      };
      sleep_needed: {
        baseline_milli: number;
        need_from_sleep_debt_milli: number;
        need_from_recent_strain_milli: number;
        need_from_recent_nap_milli: number;
      };
      respiratory_rate: number;
      sleep_performance_percentage: number;
      sleep_consistency_percentage: number;
      sleep_efficiency_percentage: number;
    };
  };
}

export async function fetchWhoopProfile(session: SessionData): Promise<WhoopProfile> {
  const response = await fetch(`${WHOOP_BASE_URL}/user/profile/basic`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function fetchWhoopCycles(
  session: SessionData,
  start: string,
  end: string
): Promise<WhoopCycle[]> {
  const params = new URLSearchParams({
    start,
    end,
  });

  const response = await fetch(`${WHOOP_BASE_URL}/cycle?${params}`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch cycles: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.records || [];
}

export async function fetchWhoopRecovery(
  session: SessionData,
  start: string,
  end: string
): Promise<any[]> {
  const params = new URLSearchParams({
    start,
    end,
  });

  const response = await fetch(`${WHOOP_BASE_URL}/recovery?${params}`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch recovery: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.records || [];
}

export async function fetchWhoopSleep(
  session: SessionData,
  start: string,
  end: string
): Promise<any[]> {
  const params = new URLSearchParams({
    start,
    end,
  });

  const response = await fetch(`${WHOOP_BASE_URL}/activity/sleep?${params}`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch sleep: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.records || [];
}

export async function fetchWhoopWorkouts(
  session: SessionData,
  start: string,
  end: string
): Promise<any[]> {
  const params = new URLSearchParams({
    start,
    end,
  });

  const response = await fetch(`${WHOOP_BASE_URL}/activity/workout?${params}`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch workouts: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.records || [];
}

export async function fetchWhoopBodyMeasurements(session: SessionData): Promise<any> {
  const response = await fetch(`${WHOOP_BASE_URL}/user/measurement/body`, {
    headers: {
      'Authorization': `Bearer ${session.accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch body measurements: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export function generateAuthUrl(): string {
  const params = new URLSearchParams({
    response_type: 'code',
    client_id: process.env.WHOOP_CLIENT_ID!,
    redirect_uri: process.env.WHOOP_REDIRECT_URI!,
    scope: 'read:profile read:cycles read:recovery read:sleep read:workout read:body_measurement',
    state: Math.random().toString(36).substring(2, 10), // Generate 8 characters
  });

  return `https://api.prod.whoop.com/oauth/oauth2/auth?${params}`;
}

export async function exchangeCodeForToken(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
}> {
  const response = await fetch('https://api.prod.whoop.com/oauth/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.WHOOP_CLIENT_ID!,
      client_secret: process.env.WHOOP_CLIENT_SECRET!,
      redirect_uri: process.env.WHOOP_REDIRECT_URI!,
      code,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to exchange code for token: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
