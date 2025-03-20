import Airtable from 'airtable';

// Server-side environment variables (no NEXT_PUBLIC prefix)
const AIRTABLE_API_KEY = process.env.AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const jobsTableName = process.env.AIRTABLE_TABLE_NAME || 'JobListings';
const candidateReferralTableName = process.env.AIRTABLE_CANDIDATE_REFERRAL_TABLE || 'CandidateReferrals';
const candidateRequestTableName = process.env.AIRTABLE_CANDIDATE_REQUEST_TABLE || 'CandidateRequests';
const companyReferralTableName = process.env.AIRTABLE_COMPANY_REFERRAL_TABLE || 'CompanyReferrals';
const resumePoolTableName = process.env.AIRTABLE_RESUME_POOL_TABLE || 'ResumePool';

// Type definitions
export interface Job {
  id: string;
  jobId: string;            // Maps to "Job ID"
  title: string;            // Maps to "Job Title"
  company: string;          // Maps to "Company"
  industry: string;         // Maps to "Industry (from Company)"
  function: string;         // Maps to "Function"
  location: string;         // Maps to "Location"
  salary: string;           // Maps to "Salary Range"
  type: string;            // Maps to "Employment Type"
  skills: string[];        // Maps to "Skills"
  description: string;     // Maps to "Job Description"
  responsibilities: string[]; // Maps to "Responsibilities"
  requirements: string[];    // Maps to "Requirements"
  benefits: string[];        // Maps to "Benefits"
  companyDescription: string; // Maps to "Company Description (from Company)"
  postedDate: string;        // Maps to "Date Posted"
  applicationDeadline: string; // Maps to "Application Deadline"
}

export interface CandidateReferral {
  "Candidate Name": string;
  "Notes": string;
  "Your Name": string;
  "Your Email": string;
  "Your Phone": string;
  "Your LinkedIn": string;
  "Candidate Email": string;
  "Candidate Phone": string;
  "Candidate LinkedIn": string;
  "Relationship": string;
  "Submitted At"?: string;
}

export interface CompanyReferral {
  "Company Name": string;
  "Your Name": string;
  "Your Email": string;
  "Relationship": string;
  "Contact Name": string;
  "Contact Email": string;
  "Contact Phone": string;
  "Submitted At"?: string;
}

export interface CandidateRequest {
  "Company Name": string;
  "Contact Name": string;
  "Contact Email": string;
  "Contact Phone": string;
  "Industry": string;
  "Company Size": string;
  "Position Title": string;
  "Position Type": string;
  "Location": string;
  "Budget": string;
  "Requirements": string;
  "Timeline": string;
  "Additional Info"?: string;
  "Submitted At"?: string;
}

export interface JobApplication {
  "Full Name": string;
  "Email": string;
  "Phone": string;
  "LinkedIn URL": string;
  "Years of Experience": string;
  "Salary Expectations": string;
  "CV URL": string;
  "Job ID": string;
  "Job Title": string;
  "Skills": string;
  "Experience": string;
  "Submitted At"?: string;
}

export interface ResumePoolEntry {
  "Full Name": string;
  "Phone": string;
  "Email": string;
  "Location": string;
  "Function": string;
  "Job Title": string;
  "Resume URL": string;
  "LinkedIn URL": string;
  "Portfolio URL"?: string;
  "Years of Experience": string;
  "Salary Expectations": string;
  "Skills": string;
  "Additional Info"?: string;
  "Submitted At": string;
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
    // Configure Airtable
    Airtable.configure({
      apiKey: currentApiKey,
      endpointUrl: 'https://api.airtable.com',
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
      skills: (record.get('Skills') as string[]) || [],
      description: record.get('Job Description')?.toString() || '',
      responsibilities: record.get('Responsibilities')?.toString()?.split('\n').filter(Boolean) || [],
      requirements: record.get('Requirements')?.toString()?.split('\n').filter(Boolean) || [],
      benefits: record.get('Benefits') as string[] || [],
      companyDescription: record.get('Company Description (from Company)')?.toString() || '',
      postedDate: record.get('Date Posted')?.toString() || new Date().toISOString(),
      applicationDeadline: record.get('Application Deadline')?.toString() || '',
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
      responsibilities: record.get('Responsibilities')?.toString()?.split('\n').filter(Boolean) || [],
      requirements: record.get('Requirements')?.toString()?.split('\n').filter(Boolean) || [],
      benefits: record.get('Benefits') as string[] || [],
      companyDescription: record.get('Company Description (from Company)')?.toString() || '',
      postedDate: record.get('Date Posted')?.toString() || new Date().toISOString(),
      applicationDeadline: record.get('Application Deadline')?.toString() || '',
    };
  } catch (error) {
    console.error('Error fetching job:', error);
    return null;
  }
}

export async function submitCandidateReferral(referral: CandidateReferral) {
  try {
    const referralTable = getTable(candidateReferralTableName);
    if (!referralTable) {
      throw new Error('Referral table not available');
    }

    const record = await referralTable.create([
      {
        fields: {
          "Candidate Name": referral["Candidate Name"],
          "Notes": referral["Notes"],
          "Your Name": referral["Your Name"],
          "Your Email": referral["Your Email"],
          "Your Phone": referral["Your Phone"],
          "Your LinkedIn": referral["Your LinkedIn"],
          "Candidate Email": referral["Candidate Email"],
          "Candidate Phone": referral["Candidate Phone"],
          "Candidate LinkedIn": referral["Candidate LinkedIn"],
          "Relationship": referral["Relationship"],
          "Submitted At": new Date().toISOString(),
        },
      },
    ]);

    return record[0];
  } catch (error) {
    console.error("Error submitting referral:", error);
    throw error;
  }
}

export async function submitCompanyReferral(referral: CompanyReferral) {
  try {
    const referralTable = getTable(companyReferralTableName);
    if (!referralTable) {
      throw new Error('Company referral table not available');
    }

    const record = await referralTable.create([
      {
        fields: {
          "Company Name": referral["Company Name"],
          "Your Name": referral["Your Name"],
          "Your Email": referral["Your Email"],
          "Relationship": referral["Relationship"],
          "Contact Name": referral["Contact Name"],
          "Contact Email": referral["Contact Email"],
          "Contact Phone": referral["Contact Phone"],
          "Submitted At": new Date().toISOString(),
        },
      },
    ]);

    return record[0];
  } catch (error) {
    console.error("Error submitting company referral:", error);
    throw error;
  }
}

export async function submitCandidateRequest(request: CandidateRequest) {
  try {
    const requestTable = getTable(candidateRequestTableName);
    if (!requestTable) {
      throw new Error('Candidate request table not available');
    }

    const record = await requestTable.create([
      {
        fields: {
          "Company Name": request["Company Name"],
          "Contact Name": request["Contact Name"],
          "Contact Email": request["Contact Email"],
          "Contact Phone": request["Contact Phone"],
          "Industry": request["Industry"],
          "Company Size": request["Company Size"],
          "Position Title": request["Position Title"],
          "Position Type": request["Position Type"],
          "Location": request["Location"],
          "Budget": request["Budget"],
          "Requirements": request["Requirements"],
          "Timeline": request["Timeline"],
          "Additional Info": request["Additional Info"],
          "Submitted At": new Date().toISOString(),
        },
      },
    ]);

    return record[0];
  } catch (error) {
    console.error("Error submitting candidate request:", error);
    throw error;
  }
}

export async function submitJobApplication(application: JobApplication) {
  try {
    const applicationTable = getTable('JobApplications');
    if (!applicationTable) {
      throw new Error('Job applications table not available');
    }

    const record = await applicationTable.create([
      {
        fields: {
          "Full Name": application["Full Name"],
          "Email": application["Email"],
          "Phone": application["Phone"],
          "LinkedIn URL": application["LinkedIn URL"],
          "Years of Experience": application["Years of Experience"],
          "Salary Expectations": application["Salary Expectations"],
          "CV URL": application["CV URL"],
          "Job ID": application["Job ID"],
          "Job Title": application["Job Title"],
          "Skills": application["Skills"],
          "Experience": application["Experience"],
          "Submitted At": new Date().toISOString(),
        },
      },
    ]);

    return record[0];
  } catch (error) {
    console.error("Error submitting job application:", error);
    throw error;
  }
}

export async function submitResumePoolEntry(resume: ResumePoolEntry) {
  try {
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/ResumePool`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                "Full Name": resume["Full Name"],
                "Phone": resume["Phone"],
                "Email": resume["Email"],
                "Location": resume["Location"],
                "Function": resume["Function"],
                "Job Title": resume["Job Title"],
                "Resume URL": resume["Resume URL"],
                "LinkedIn URL": resume["LinkedIn URL"],
                "Portfolio URL": resume["Portfolio URL"],
                "Years of Experience": resume["Years of Experience"],
                "Salary Expectations": resume["Salary Expectations"],
                "Skills": resume["Skills"],
                "Additional Info": resume["Additional Info"],
                "Submitted At": resume["Submitted At"],
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error?.message || "Failed to submit resume");
    }

    return await response.json();
  } catch (error) {
    console.error("Error submitting resume to pool:", error);
    throw error;
  }
} 