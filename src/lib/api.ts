import { Job, CandidateReferral } from './airtable-server';

const API_BASE = '/api';

export async function fetchJobs(): Promise<Job[]> {
  try {
    const response = await fetch(`${API_BASE}/jobs`);
    if (!response.ok) {
      throw new Error('Failed to fetch jobs');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function fetchJobById(jobId: string): Promise<Job | null> {
  try {
    const response = await fetch(`${API_BASE}/jobs/${jobId}`);
    if (!response.ok) {
      if (response.status === 404) {
        return null;
      }
      throw new Error('Failed to fetch job');
    }
    return response.json();
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function submitReferral(data: Omit<CandidateReferral, 'id'>): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE}/referrals`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to submit referral',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting referral:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
} 