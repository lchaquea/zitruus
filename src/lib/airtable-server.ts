import Airtable from 'airtable';

// Server-side environment variables (no NEXT_PUBLIC prefix)
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const jobsTableName = process.env.AIRTABLE_TABLE_NAME || 'JobListings';
const candidateReferralTableName = process.env.AIRTABLE_CANDIDATE_REFERRAL_TABLE || 'CandidateReferrals';
const candidateRequestTableName = process.env.AIRTABLE_CANDIDATE_REQUEST_TABLE || 'CandidateRequests';
const companyReferralTableName = process.env.AIRTABLE_COMPANY_REFERRAL_TABLE || 'CompanyReferrals';
const resumePoolTableName = process.env.AIRTABLE_RESUME_POOL_TABLE || 'ResumePool';

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
  candidateName: string;
  candidateEmail: string;
  phoneNumber: string;
  resume: string[];
  jobId: string;
  message: string;
  submittedAt?: string;
}

// Custom fetch implementation that doesn't use AbortSignal
const customFetch = async (url: string, options: any = {}) => {
  try {
    // Remove the signal property to avoid AbortSignal issues
    const { signal, ...restOptions } = options;
    const response = await fetch(url, restOptions);
    return response;
  } catch (error) {
    console.error('Error in customFetch:', error);
    throw error;
  }
};

// Lazy initialization of Airtable client with custom fetch
function getAirtableClient() {
  const currentApiKey = process.env.AIRTABLE_API_KEY;
  const currentBaseId = process.env.AIRTABLE_BASE_ID;
  
  if (!currentApiKey || !currentBaseId) {
    console.warn('Airtable credentials missing');
    return null;
  }

  try {
    // Configure Airtable to use our custom fetch
    Airtable.configure({
      apiKey: currentApiKey,
      fetch: customFetch as any,
    });

    const base = new Airtable().base(currentBaseId);
    return base;
  } catch (error) {
    console.error('Error initializing Airtable:', error);
    return null;
  }
}

// Get table instance with lazy initialization
function getTable(tableName: string) {
  try {
    const base = getAirtableClient();
    if (!base) {
      console.warn(`Unable to get table ${tableName}: Airtable client not initialized`);
      return null;
    }
    return base(tableName);
  } catch (error) {
    console.error(`Error getting table ${tableName}:`, error);
    return null;
  }
}

// Server-side functions
export async function getAllJobs(): Promise<Job[]> {
  try {
    const jobsTable = getTable(jobsTableName);
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
  } catch (error) {
    console.error('Error fetching jobs:', error);
    return [];
  }
}

export async function getJobById(jobId: string): Promise<Job | null> {
  try {
    const jobsTable = getTable(jobsTableName);
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
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function submitCandidateReferral(data: Omit<CandidateReferral, 'id'>): Promise<{ success: boolean; error?: string }> {
  try {
    const referralTable = getTable(candidateReferralTableName);
    if (!referralTable) {
      return {
        success: false,
        error: 'Referral table not available'
      };
    }

    await referralTable.create([
      {
        fields: {
          'Candidate Name': data.candidateName,
          'Candidate Email': data.candidateEmail,
          'Phone Number': data.phoneNumber,
          'Resume': data.resume,
          'Job ID': data.jobId,
          'Message': data.message,
          'Submitted At': new Date().toISOString()
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
} 