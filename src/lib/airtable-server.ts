import Airtable from 'airtable';

// Server-side environment variables (no NEXT_PUBLIC prefix)
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const jobsTableName = process.env.AIRTABLE_TABLE_NAME || 'Jobs';
const candidateReferralTableName = process.env.AIRTABLE_CANDIDATE_REFERRAL_TABLE || 'CandidateReferrals';
const candidateRequestTableName = process.env.AIRTABLE_CANDIDATE_REQUEST_TABLE || 'CandidateRequests';
const companyReferralTableName = process.env.AIRTABLE_COMPANY_REFERRAL_TABLE || 'CompanyReferrals';
const resumePoolTableName = process.env.AIRTABLE_RESUME_POOL_TABLE || 'ResumePool';

if (!apiKey) {
  throw new Error('Airtable API key is not configured');
}

if (!baseId) {
  throw new Error('Airtable Base ID is not configured');
}

// Initialize Airtable with custom fetch
const airtable = new Airtable({
  apiKey,
  fetch: async (url: string, init?: RequestInit) => {
    // Remove AbortSignal from the request
    if (init?.signal) {
      const { signal, ...rest } = init;
      return fetch(url, rest);
    }
    return fetch(url, init);
  }
});

// Configure base and tables
const base = airtable.base(baseId);
const jobsTable = base(jobsTableName);
const candidateReferralTable = base(candidateReferralTableName);
const candidateRequestTable = base(candidateRequestTableName);
const companyReferralTable = base(companyReferralTableName);
const resumePoolTable = base(resumePoolTableName);

// Helper function to safely handle Airtable operations
async function safeAirtableOperation<T>(operation: () => Promise<T>): Promise<T> {
  try {
    return await operation();
  } catch (error) {
    console.error('Airtable operation error:', error);
    throw error;
  }
}

// Type definitions
export interface Job {
  id: string;
  jobId?: string;
  title: string;
  company: string;
  industry: string;
  function: string;
  location: string;
  salary: string;
  type: string;
  skills: string[];
  description: string;
  postedDate?: string;
}

export interface CandidateReferral {
  id: string;
  name: string;
  email: string;
  phone: string;
  resume: string[];
  jobId: string;
  message: string;
}

// Server-side functions
export async function getAllJobs(): Promise<Job[]> {
  return safeAirtableOperation(async () => {
    const records = await jobsTable.select().all();
    return records.map((record) => ({
      id: record.id,
      jobId: record.get('Job ID')?.toString() || record.id,
      title: record.get('Job Title')?.toString() || 'Untitled Position',
      company: record.get('Company')?.toString() || 'Company Name Not Available',
      industry: record.get('Industry (from Company)')?.toString() || '',
      function: record.get('Function')?.toString() || '',
      location: record.get('Location')?.toString() || '',
      salary: record.get('Salary Range')?.toString() || '',
      type: record.get('Employment Type')?.toString() || '',
      skills: (record.get('Skills') as string[] || []),
      description: record.get('Job Description')?.toString() || '',
      postedDate: record.get('Date Posted')?.toString() || new Date().toISOString(),
    }));
  });
}

export async function getJobById(jobId: string): Promise<Job | null> {
  return safeAirtableOperation(async () => {
    const records = await jobsTable
      .select({
        filterByFormula: `OR({Job ID} = '${jobId}', RECORD_ID() = '${jobId}')`,
        maxRecords: 1,
      })
      .all();

    if (records.length === 0) {
      return null;
    }

    const record = records[0];
    return {
      id: record.id,
      jobId: record.get('Job ID')?.toString() || record.id,
      title: record.get('Job Title')?.toString() || 'Untitled Position',
      company: record.get('Company')?.toString() || 'Company Name Not Available',
      industry: record.get('Industry (from Company)')?.toString() || '',
      function: record.get('Function')?.toString() || '',
      location: record.get('Location')?.toString() || '',
      salary: record.get('Salary Range')?.toString() || '',
      type: record.get('Employment Type')?.toString() || '',
      skills: (record.get('Skills') as string[] || []),
      description: record.get('Job Description')?.toString() || '',
      postedDate: record.get('Date Posted')?.toString() || new Date().toISOString(),
    };
  });
}

export async function submitCandidateReferral(data: Omit<CandidateReferral, 'id'>): Promise<{ success: boolean; error?: string }> {
  return safeAirtableOperation(async () => {
    try {
      await candidateReferralTable.create([
        {
          fields: {
            Name: data.name,
            Email: data.email,
            Phone: data.phone,
            Resume: data.resume,
            'Job ID': data.jobId,
            Message: data.message,
          },
        },
      ]);
      return { success: true };
    } catch (error) {
      console.error('Error submitting candidate referral:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  });
} 