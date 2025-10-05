'use client';

import { useState, useEffect } from 'react';

interface ProfileData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
}

interface CycleData {
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

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [cyclesData, setCyclesData] = useState<CycleData[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Check if user is authenticated by trying to fetch profile
    checkAuthentication();
  }, []);

  const checkAuthentication = async () => {
    try {
      const response = await fetch('/api/whoop/profile');
      setIsAuthenticated(response.ok);
    } catch (error) {
      setIsAuthenticated(false);
    }
  };

  const handleConnectWhoop = () => {
    window.location.href = '/api/whoop/login';
  };

  const handleLoadProfile = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/whoop/profile');
      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }
      const data = await response.json();
      setProfileData(data);
    } catch (error) {
      setError('Failed to load profile');
      console.error('Profile fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadCycles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Get cycles for the last 7 days
      const end = new Date().toISOString();
      const start = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
      
      const response = await fetch(`/api/whoop/cycle?start=${start}&end=${end}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cycles');
      }
      const data = await response.json();
      setCyclesData(data);
    } catch (error) {
      setError('Failed to load cycles');
      console.error('Cycles fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            WHOOP Demo App
          </h1>
          
          {!isAuthenticated ? (
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Connect to WHOOP
              </h2>
              <p className="text-gray-600 mb-6">
                Click the button below to authenticate with WHOOP and access your health data.
              </p>
              <button
                onClick={handleConnectWhoop}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Connect WHOOP
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  WHOOP Data
                </h2>
                <div className="flex space-x-4">
                  <button
                    onClick={handleLoadProfile}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                  >
                    {loading ? 'Loading...' : 'Load Profile'}
                  </button>
                  <button
                    onClick={handleLoadCycles}
                    disabled={loading}
                    className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded"
                  >
                    {loading ? 'Loading...' : 'Load Cycles'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                  {error}
                </div>
              )}

              {profileData && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Profile Data
                  </h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
                    {JSON.stringify(profileData, null, 2)}
                  </pre>
                </div>
              )}

              {cyclesData && (
                <div className="bg-white shadow rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Cycles Data (Last 7 Days)
                  </h3>
                  <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm max-h-96">
                    {JSON.stringify(cyclesData, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
