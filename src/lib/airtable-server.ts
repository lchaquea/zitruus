import Airtable from 'airtable';

// Server-side environment variables (no NEXT_PUBLIC prefix)
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const jobsTableName = process.env.AIRTABLE_TABLE_NAME || 'Jobs';
const candidateReferralTableName = process.env.AIRTABLE_CANDIDATE_REFERRAL_TABLE || 'CandidateReferrals';
const candidateRequestTableName = process.env.AIRTABLE_CANDIDATE_REQUEST_TABLE || 'CandidateRequests';
const companyReferralTableName = process.env.AIRTABLE_COMPANY_REFERRAL_TABLE || 'CompanyReferrals';
const resumePoolTableName = process.env.AIRTABLE_RESUME_POOL_TABLE || 'ResumePool';

// Initialize Airtable with fallback for missing credentials
let airtable: Airtable | null = null;
let base: Airtable.Base | null = null;
let jobsTable: Airtable.Table<any> | null = null;
let candidateReferralTable: Airtable.Table<any> | null = null;
let candidateRequestTable: Airtable.Table<any> | null = null;
let companyReferralTable: Airtable.Table<any> | null = null;
let resumePoolTable: Airtable.Table<any> | null = null;

try {
  if (!apiKey || !baseId) {
    console.warn('Airtable credentials missing. Some functionality will be limited.');
  } else {
    // Initialize Airtable with custom fetch
    airtable = new Airtable({
      apiKey,
      endpointUrl: 'https://api.airtable.com',
      apiVersion: '0.1.0',
      noRetryIfRateLimited: false,
      requestTimeout: 30000, // 30 second timeout
    });

    // Configure base and tables
    base = airtable.base(baseId);
    jobsTable = base(jobsTableName);
    candidateReferralTable = base(candidateReferralTableName);
    candidateRequestTable = base(candidateRequestTableName);
    companyReferralTable = base(companyReferralTableName);
    resumePoolTable = base(resumePoolTableName);
  }
} catch (error) {
  console.error('Error initializing Airtable:', error);
}

// Helper function to safely handle Airtable operations
async function safeAirtableOperation<T>(operation: () => Promise<T>, fallback: T): Promise<T> {
  if (!airtable || !base) {
    console.warn('Airtable not initialized. Returning fallback value.');
    return fallback;
  }

  try {
    return await operation();
  } catch (error) {
    console.error('Airtable operation error:', error);
    return fallback;
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
    if (!jobsTable) {
      console.warn('Jobs table not available');
      return [];
    }

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
  }, []);
}

export async function getJobById(jobId: string): Promise<Job | null> {
  return safeAirtableOperation(async () => {
    if (!jobsTable) {
      console.warn('Jobs table not available');
      return null;
    }

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
  }, null);
}

export async function submitCandidateReferral(data: Omit<CandidateReferral, 'id'>): Promise<{ success: boolean; error?: string }> {
  return safeAirtableOperation(async () => {
    if (!candidateReferralTable) {
      return { 
        success: false, 
        error: 'Candidate referral table not available' 
      };
    }

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
  }, { success: false, error: 'Airtable not initialized' });
} 