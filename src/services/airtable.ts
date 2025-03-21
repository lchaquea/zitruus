import Airtable from 'airtable';

// Custom fetch function that removes AbortSignal
const customFetch = async (url: string, options: any = {}) => {
  // Remove the signal property from options
  const { signal, ...fetchOptions } = options;
  return fetch(url, fetchOptions);
};

// Initialize Airtable with API key
const apiKey = process.env.AIRTABLE_API_KEY;
const baseId = process.env.AIRTABLE_BASE_ID;
const jobsTableName = process.env.AIRTABLE_TABLE_NAME || 'Jobs';
const candidateReferralTableName = process.env.AIRTABLE_CANDIDATE_REFERRAL_TABLE || 'CandidateReferrals';
const candidateRequestTableName = process.env.AIRTABLE_CANDIDATE_REQUEST_TABLE || 'CandidateRequests';
const companyReferralTableName = process.env.AIRTABLE_COMPANY_REFERRAL_TABLE || 'CompanyReferrals';
const resumePoolTableName = process.env.AIRTABLE_RESUME_POOL_TABLE || 'ResumePool';

if (!apiKey) {
  console.error('Airtable API key is missing');
}

if (!baseId) {
  console.error('Airtable Base ID is missing');
}

// Initialize Airtable base directly
let airtableBase: any = null;

try {
  if (apiKey && baseId) {
    // Configure Airtable globally with custom fetch
    Airtable.configure({
      apiKey: apiKey,
      endpointUrl: 'https://api.airtable.com',
      requestTimeout: 300000, // 5 minutes timeout
      fetch: customFetch as any,
    });
    
    // Create base instance
    airtableBase = new Airtable().base(baseId);
  }
} catch (error) {
  console.error('Error initializing Airtable:', error);
}

// Helper function to safely execute Airtable operations
const safeAirtableOperation = async <T>(operation: () => Promise<T>): Promise<T> => {
  try {
    return await operation();
  } catch (error: any) {
    console.error('Airtable operation error:', error);
    // Return empty array for list operations
    return [] as any;
  }
};

// Helper function to get table
const getTable = (tableName: string) => {
  if (!airtableBase) {
    console.warn('Airtable base not initialized');
    return null;
  }
  return airtableBase(tableName);
};

// Initialize tables
const jobsTable = getTable(jobsTableName);
const candidateReferralTable = getTable(candidateReferralTableName);
const candidateRequestTable = getTable(candidateRequestTableName);
const companyReferralTable = getTable(companyReferralTableName);
const resumePoolTable = getTable(resumePoolTableName);

// Define the Job type
export type Job = {
  id?: string;           // Internal record ID from Airtable
  jobId?: string;        // Job ID field from Airtable
  title: string;           // Maps to "Job Title" in Airtable
  company: string;         // This might be missing in Airtable
  industry: string;        // Maps to "Industry" in Airtable
  function: string;        // Maps to "Function" in Airtable
  location: string;        // Maps to "Location" in Airtable
  salary: string;          // Maps to "Salary Range" in Airtable
  type: string;            // Maps to "Employment Type" in Airtable
  skills: string[];        // Maps to "Skills" in Airtable
  description: string;     // Maps to "Job Description" in Airtable
  responsibilities?: string[]; // Maps to "Responsibilities" in Airtable
  requirements?: string[];    // Maps to "Requirements" in Airtable
  benefits?: string[];        // Maps to "Benefits" in Airtable
  companyDescription?: string; // Maps to "Company Description" in Airtable
  postedDate?: string;        // Maps to "Date Posted" in Airtable
  applicationDeadline?: string; // Maps to "Application Deadline" in Airtable
  category?: string;          // This might be missing in Airtable
};

// Define the CandidateReferral type
export type CandidateReferral = {
  id?: string;
  yourName: string;
  yourEmail: string;
  candidateName: string;
  candidateEmail: string;
  candidatePhone?: string;
  relationship: string;
  submittedAt?: string;
};

// Define the CandidateRequest type
export type CandidateRequest = {
  id?: string;
  companyName: string;
  companyLinkedIn?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  industry: string;
  companySize: string;
  positionTitle: string;
  positionType: string;
  location: string;
  budget: string;
  requirements: string;
  timeline: string;
  additionalInfo?: string;
  submittedAt?: string;
};

// Define the CompanyReferral type
export type CompanyReferral = {
  id?: string;
  yourName: string;
  yourEmail: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  relationship: string;
  submittedAt?: string;
};

// Define the ResumePool type
export type ResumePool = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  jobTitle: string;
  function: string;
  experience: string;
  skills: string;
  linkedInUrl?: string;
  portfolioUrl?: string;
  resumeUrl?: string;
  additionalInfo?: string;
  submittedAt?: string;
};

// Define the JobApplication type
export type JobApplication = {
  id?: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  yearsOfExperience: string;
  salaryExpectations: string;
  cvUrl: string;
  jobId: string;
  jobTitle: string;
  submittedAt?: string;
};

// ==================== JOB OPERATIONS ====================

// Get all jobs with safe operation
export const getAllJobs = async (): Promise<Job[]> => {
  return safeAirtableOperation(async () => {
    if (!jobsTable) {
      console.warn('Jobs table not available');
      return [];
    }

    try {
      const records = await jobsTable.select().all();
      if (!records || records.length === 0) {
        console.log('No jobs found in Airtable');
        return [];
      }
      
      return records.map((record) => {
        try {
          return {
            id: record.id,
            jobId: record.get('Job ID') || record.id,
            title: record.get('Job Title') || 'Untitled Position',
            company: record.get('Company') || 'Company Name Not Available',
            industry: record.get('Industry (from Company)') || '',
            function: record.get('Function') || '',
            location: record.get('Location') || '',
            salary: record.get('Salary Range') || '',
            type: record.get('Employment Type') || '',
            skills: [],
            description: record.get('Job Description') || '',
          };
        } catch (error) {
          console.warn('Error mapping job record:', error);
          return {
            id: record.id,
            title: 'Error Loading Job Details',
            company: 'Error',
            industry: '',
            function: '',
            location: '',
            salary: '',
            type: '',
            skills: [],
            description: 'There was an error loading the job details.',
          };
        }
      });
    } catch (error) {
      console.error('Error fetching jobs:', error);
      return [];
    }
  });
};

// Get a job by ID with safe operation
export const getJobById = async (id: string): Promise<Job | null> => {
  return safeAirtableOperation(async () => {
    console.log('getJobById called with ID:', id);
    
    if (!id) {
      console.error('No job ID provided to getJobById');
      return null;
    }
    
    // First try to find the job by Job ID field
    try {
      // Get all records and filter by Job ID field
      const records = await jobsTable.select({
        filterByFormula: `{Job ID} = '${id}'`
      }).all();
      
      if (records.length > 0) {
        const record = records[0];
        console.log('Job found by Job ID field:', record.id);
        
        // Helper function to safely get field values
        const safeGet = (fieldName: string): any => {
          const value = record.get(fieldName);
          
          // Check if the value is an object with an enterprise restriction
          if (value && typeof value === 'object' && 'state' in value) {
            const restrictedValue = value as any;
            if (restrictedValue.state === 'error' && restrictedValue.errorType === 'enterpriseRestricted') {
              // Return the value property if it exists
              return restrictedValue.value || '';
            }
          }
          
          return value || '';
        };
        
        // Helper function to safely get array field values
        const safeGetArray = (fieldName: string): string[] => {
          const value = safeGet(fieldName);
          
          if (Array.isArray(value)) {
            return value;
          }
          
          if (typeof value === 'string') {
            return value.split(',').map(item => item.trim());
          }
          
          return [];
        };
        
        return {
          id: record.id,
          jobId: safeGet('Job ID') || record.id,
          title: safeGet('Job Title'),
          company: safeGet('Company') || 'N/A',
          industry: safeGet('Industry (from Company)') || '',
          function: safeGet('Function') || '',
          location: safeGet('Location') || '',
          salary: safeGet('Salary Range') || safeGet('Average Salary') || '',
          type: safeGet('Employment Type') || '',
          skills: typeof safeGet('Requirement Keywords') === 'string' 
            ? safeGet('Requirement Keywords').split(',').map((skill: string) => skill.trim())
            : safeGet('Skills') 
              ? safeGetArray('Skills') 
              : [],
          description: safeGet('Job Description') || safeGet('Job Description Summary') || '',
          responsibilities: typeof safeGet('Responsibilities') === 'string' ? 
            safeGet('Responsibilities').split('\n').filter(Boolean) : [],
          requirements: typeof safeGet('Requirements') === 'string' ? 
            safeGet('Requirements').split('\n').filter(Boolean) : [],
          benefits: typeof safeGet('Benefits') === 'string' ? 
            safeGet('Benefits').split('\n').filter(Boolean) : [],
          companyDescription: safeGet('Company Description') || '',
          postedDate: safeGet('Date Posted') || '',
          category: safeGet('Category') || '',
        };
      }
    } catch (error) {
      console.error('Error finding job by Job ID field:', error);
    }
    
    // If not found by Job ID field, try to find by record ID
    try {
      console.log('Job not found by Job ID field, trying to find by record ID');
      const record = await jobsTable.find(id);
      console.log('Job record found by record ID:', record.id);
      
      // Helper function to safely get field values
      const safeGet = (fieldName: string): any => {
        const value = record.get(fieldName);
        
        // Check if the value is an object with an enterprise restriction
        if (value && typeof value === 'object' && 'state' in value) {
          const restrictedValue = value as any;
          if (restrictedValue.state === 'error' && restrictedValue.errorType === 'enterpriseRestricted') {
            // Return the value property if it exists
            return restrictedValue.value || '';
          }
        }
        
        return value || '';
      };
      
      // Helper function to safely get array field values
      const safeGetArray = (fieldName: string): string[] => {
        const value = safeGet(fieldName);
        
        if (Array.isArray(value)) {
          return value;
        }
        
        if (typeof value === 'string') {
          return value.split(',').map(item => item.trim());
        }
        
        return [];
      };
      
      return {
        id: record.id,
        jobId: safeGet('Job ID') || record.id,
        title: safeGet('Job Title'),
        company: safeGet('Company') || 'N/A',
        industry: safeGet('Industry (from Company)') || '',
        function: safeGet('Function') || '',
        location: safeGet('Location') || '',
        salary: safeGet('Salary Range') || safeGet('Average Salary') || '',
        type: safeGet('Employment Type') || '',
        skills: typeof safeGet('Requirement Keywords') === 'string' 
          ? safeGet('Requirement Keywords').split(',').map((skill: string) => skill.trim())
          : safeGet('Skills') 
            ? safeGetArray('Skills') 
            : [],
        description: safeGet('Job Description') || safeGet('Job Description Summary') || '',
        responsibilities: typeof safeGet('Responsibilities') === 'string' ? 
          safeGet('Responsibilities').split('\n').filter(Boolean) : [],
        requirements: typeof safeGet('Requirements') === 'string' ? 
          safeGet('Requirements').split('\n').filter(Boolean) : [],
        benefits: typeof safeGet('Benefits') === 'string' ? 
          safeGet('Benefits').split('\n').filter(Boolean) : [],
        companyDescription: safeGet('Company Description') || '',
        postedDate: safeGet('Date Posted') || '',
        category: safeGet('Category') || '',
      };
    } catch (error) {
      console.error(`Error finding job by record ID ${id}:`, error);
      return null;
    }
  });
};

// Create a new job
export const createJob = async (job: Omit<Job, 'id'>): Promise<Job | null> => {
  try {
    const record = await jobsTable.create({
      title: job.title,
      company: job.company,
      industry: job.industry,
      function: job.function,
      location: job.location,
      salary: job.salary,
      type: job.type,
      skills: job.skills.join(', '),
      description: job.description,
      responsibilities: job.responsibilities?.join('\n'),
      requirements: job.requirements?.join('\n'),
      benefits: job.benefits?.join('\n'),
      companyDescription: job.companyDescription,
      postedDate: job.postedDate || new Date().toISOString().split('T')[0],
      category: job.category,
    });

    return {
      id: record.id,
      ...job,
    };
  } catch (error) {
    console.error('Error creating job in Airtable:', error);
    return null;
  }
};

// Update a job
export const updateJob = async (id: string, job: Partial<Job>): Promise<Job | null> => {
  try {
    const fields: Record<string, any> = {};

    // Only include fields that are provided
    if (job.title) fields.title = job.title;
    if (job.company) fields.company = job.company;
    if (job.industry) fields.industry = job.industry;
    if (job.function) fields.function = job.function;
    if (job.location) fields.location = job.location;
    if (job.salary) fields.salary = job.salary;
    if (job.type) fields.type = job.type;
    if (job.skills) fields.skills = job.skills.join(', ');
    if (job.description) fields.description = job.description;
    if (job.responsibilities) fields.responsibilities = job.responsibilities.join('\n');
    if (job.requirements) fields.requirements = job.requirements.join('\n');
    if (job.benefits) fields.benefits = job.benefits.join('\n');
    if (job.companyDescription) fields.companyDescription = job.companyDescription;
    if (job.postedDate) fields.postedDate = job.postedDate;
    if (job.category) fields.category = job.category;

    const record = await jobsTable.update(id, fields);

    // Get the updated job
    return await getJobById(id);
  } catch (error) {
    console.error(`Error updating job with ID ${id} in Airtable:`, error);
    return null;
  }
};

// Delete a job
export const deleteJob = async (id: string): Promise<boolean> => {
  try {
    await jobsTable.destroy(id);
    return true;
  } catch (error) {
    console.error(`Error deleting job with ID ${id} from Airtable:`, error);
    return false;
  }
};

// ==================== CANDIDATE REFERRAL OPERATIONS ====================

// Submit a candidate referral
export const submitCandidateReferral = async (referral: Omit<CandidateReferral, 'id' | 'submittedAt'>): Promise<CandidateReferral | null> => {
  try {
    const record = await candidateReferralTable.create({
      yourName: referral.yourName,
      yourEmail: referral.yourEmail,
      candidateName: referral.candidateName,
      candidateEmail: referral.candidateEmail,
      candidatePhone: referral.candidatePhone || '',
      relationship: referral.relationship,
      submittedAt: new Date().toISOString(),
    });

    return {
      id: record.id,
      ...referral,
      submittedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error submitting candidate referral to Airtable:', error);
    return null;
  }
};

// ==================== CANDIDATE REQUEST OPERATIONS ====================

// Submit a candidate request
export const submitCandidateRequest = async (request: Omit<CandidateRequest, 'id' | 'submittedAt'>): Promise<CandidateRequest | null> => {
  try {
    const record = await candidateRequestTable.create({
      'Company Name': request.companyName,
      'Company LinkedIn': request.companyLinkedIn || '',
      'Contact Name': request.contactName,
      'Contact Email': request.contactEmail,
      'Contact Phone': request.contactPhone,
      'Industry': request.industry,
      'Company Size': request.companySize,
      'Position Title': request.positionTitle,
      'Position Type': request.positionType,
      'Location': request.location,
      'Budget': request.budget,
      'Requirements': request.requirements,
      'Timeline': request.timeline,
      'Additional Info': request.additionalInfo || '',
      'Submitted At': new Date().toISOString(),
    });

    return {
      id: record.id,
      ...request,
      submittedAt: new Date().toISOString(),
    };
  } catch (error) {
    console.error('Error submitting candidate request to Airtable:', error);
    return null;
  }
};

// ==================== COMPANY REFERRAL OPERATIONS ====================

// Submit a company referral
export const submitCompanyReferral = async (referral: Omit<CompanyReferral, 'id' | 'submittedAt'>): Promise<CompanyReferral | null> => {
  try {
    // Create a new record in the Company Referrals table
    const recordData = {
      'Your Name': referral.yourName,
      'Your Email': referral.yourEmail,
      'Company Name': referral.companyName,
      'Contact Name': referral.contactName,
      'Contact Email': referral.contactEmail,
      'Contact Phone': referral.contactPhone || '',
      'Relationship': referral.relationship,
      'Submitted At': new Date().toISOString()
    };

    const record = await companyReferralTable.create(recordData);

    return {
      id: record.id,
      yourName: referral.yourName,
      yourEmail: referral.yourEmail,
      companyName: referral.companyName,
      contactName: referral.contactName,
      contactEmail: referral.contactEmail,
      contactPhone: referral.contactPhone,
      relationship: referral.relationship,
      submittedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Error submitting company referral:', error);
    return null;
  }
};

// ==================== RESUME POOL OPERATIONS ====================

// Submit a resume to the pool
export const submitResume = async (resume: Omit<ResumePool, 'id' | 'submittedAt'>): Promise<ResumePool | null> => {
  try {
    const record = await resumePoolTable.create({
      'Full Name': resume.fullName,
      'Email': resume.email,
      'Phone': resume.phone,
      'Location': resume.location,
      'Job Title': resume.jobTitle,
      'Function': resume.function,
      'Years of Experience': resume.experience,
      'Skills': resume.skills,
      'LinkedIn URL': resume.linkedInUrl,
      'Portfolio URL': resume.portfolioUrl,
      'Resume URL': resume.resumeUrl,
      'Additional Info': resume.additionalInfo,
      'Submitted At': new Date().toISOString()
    });

    return {
      id: record.id,
      fullName: record.get('Full Name') as string,
      email: record.get('Email') as string,
      phone: record.get('Phone') as string,
      location: record.get('Location') as string,
      jobTitle: record.get('Job Title') as string,
      function: record.get('Function') as string,
      experience: record.get('Years of Experience') as string,
      skills: record.get('Skills') as string,
      linkedInUrl: record.get('LinkedIn URL') as string,
      portfolioUrl: record.get('Portfolio URL') as string,
      resumeUrl: record.get('Resume URL') as string,
      additionalInfo: record.get('Additional Info') as string,
      submittedAt: record.get('Submitted At') as string
    };
  } catch (error) {
    console.error('Error submitting resume to Airtable:', error);
    return null;
  }
};

// Submit a job application
export async function submitJobApplication(application: {
  fullName: string;
  email: string;
  phone: string;
  linkedinUrl: string;
  yearsOfExperience: string;
  salaryExpectations: string;
  cvUrl: string;
  jobId: string;
  jobTitle: string;
}) {
  try {
    const table = base(process.env.AIRTABLE_JOB_APPLICATIONS_TABLE || 'JobApplications');
    
    const record = await table.create([
      {
        fields: {
          'Full Name': application.fullName,
          'Email': application.email,
          'Phone': application.phone,
          'LinkedIn URL': application.linkedinUrl,
          'Years of Experience': application.yearsOfExperience,
          'Salary Expectations': application.salaryExpectations,
          'CV URL': application.cvUrl,
          'Job ID': application.jobId,
          'Job Title': application.jobTitle,
          'Submitted At': new Date().toLocaleString()
        }
      }
    ]);

    return record;
  } catch (error) {
    console.error('Error submitting job application:', error);
    throw error;
  }
}

export default {
  // Job operations
  getAllJobs,
  getJobById,
  createJob,
  updateJob,
  deleteJob,
  
  // Form submissions
  submitCandidateReferral,
  submitCandidateRequest,
  submitCompanyReferral,
  submitResume,
  submitJobApplication,
}; 