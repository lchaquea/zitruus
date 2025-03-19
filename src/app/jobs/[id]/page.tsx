import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { getJobById, getAllJobs } from '../../../services/airtable';
import { Job } from '../../../services/airtable';
import JobDetailsContent from '../../components/JobDetailsContent';

// Function to create a user-friendly job ID from the job title
const createFriendlyJobId = (title: string, id: string): string => {
  // Create a slug from the title
  const slug = title
    .toLowerCase()
    .replace(/[^\w\s]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .substring(0, 20); // Limit length
    
  // Use last 4 characters of the ID (whether it's a record ID or custom ID)
  const shortId = id.slice(-4);
  
  return `${slug}-${shortId}`;
};

// Define the type for the page props
type JobDetailPageProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for the job detail page
export async function generateMetadata(
  { params }: JobDetailPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const jobId = params.id;
  
  // First try to find by direct lookup if it's a numeric ID
  let job = null;
  if (/^\d+$/.test(jobId)) {
    job = await getJobById(jobId);
  }
  
  // If not found or not a numeric ID, try to find in all jobs
  if (!job) {
    const allJobs = await getAllJobs();
    job = allJobs.find(j => {
      // Check for exact ID matches first
      if (j.jobId === jobId || j.id === jobId) {
        return true;
      }
      
      // Then check for friendly URL matches
      const friendlyId = createFriendlyJobId(j.title, j.id || j.jobId || '');
      return friendlyId === jobId;
    });
  }
  
  // If job not found, return default metadata
  if (!job) {
    return {
      title: 'Job Not Found | Zitruus',
      description: 'The job you are looking for does not exist or has been removed.',
    };
  }
  
  // Create a display job ID
  const displayJobId = job.jobId && !job.jobId.startsWith('rec')
    ? job.jobId
    : createFriendlyJobId(job.title, job.id || job.jobId || '');
  
  // Get the parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  
  // Create structured data for job posting (JSON-LD)
  const jobPostingSchema = {
    "@context": "https://schema.org/",
    "@type": "JobPosting",
    "title": job.title,
    "description": job.description,
    "datePosted": job.postedDate || new Date().toISOString(),
    "validThrough": job.applicationDeadline || "",
    "employmentType": job.type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": job.company || "Zitruus",
      "sameAs": "https://zitruus.com",
      "logo": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": job.location,
        "addressLocality": job.location
      }
    },
    "baseSalary": job.salary ? {
      "@type": "MonetaryAmount",
      "currency": "USD",
      "value": {
        "@type": "QuantitativeValue",
        "value": job.salary,
        "unitText": "YEAR"
      }
    } : undefined,
    "skills": job.skills ? job.skills.join(", ") : "",
    "industry": job.industry || "",
    "occupationalCategory": job.function || "",
    "jobBenefits": job.benefits ? job.benefits.join(", ") : "",
    "identifier": {
      "@type": "PropertyValue",
      "name": "Zitruus Job ID",
      "value": displayJobId || jobId
    }
  };
  
  return {
    title: `${job.title} - ${job.company || 'Zitruus'} | Job Opportunity`,
    description: `${job.title} job opportunity at ${job.company || 'Zitruus'}. ${job.location}, ${job.type}. ${job.description?.substring(0, 150)}...`,
    keywords: `${job.title}, ${job.function || ''}, ${job.industry || ''}, ${job.skills?.join(', ') || ''}, job opportunity, career, ${job.location}, ${job.type}`,
    openGraph: {
      title: `${job.title} - ${job.company || 'Zitruus'} | Job Opportunity`,
      description: `${job.title} job opportunity at ${job.company || 'Zitruus'}. ${job.location}, ${job.type}. Apply now!`,
      url: `https://zitruus.com/jobs/${jobId}`,
      siteName: 'Zitruus',
      images: [
        {
          url: 'https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png',
          width: 800,
          height: 600,
          alt: 'Zitruus Logo',
        },
        ...previousImages,
      ],
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${job.title} - ${job.company || 'Zitruus'} | Job Opportunity`,
      description: `${job.title} job opportunity at ${job.company || 'Zitruus'}. ${job.location}, ${job.type}. Apply now!`,
      images: ['https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png'],
    },
    alternates: {
      canonical: `https://zitruus.com/jobs/${jobId}`,
    },
    other: {
      'application-ld+json': JSON.stringify(jobPostingSchema),
    },
  };
}

// Main component - now a Server Component
export default async function JobDetail({ params }: JobDetailPageProps) {
  const jobId = params.id;
  
  // Fetch all jobs first
  const allJobs = await getAllJobs();
  
  // Try to find the job by ID or record ID
  let job = allJobs.find(j => 
    j.jobId === jobId || 
    j.id === jobId || 
    createFriendlyJobId(j.title, j.id || j.jobId || '') === jobId
  );
  
  // If not found in allJobs, try direct lookup
  if (!job) {
    job = await getJobById(jobId);
  }
  
  // If job not found or error
  if (!job) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Job Not Found</h1>
              <p className="text-gray-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
              <Link href="/jobs" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400">
                <ArrowLeft size={16} />
                Back to all jobs
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  // Create a display-safe version of the job data
  const displayJob = {
    ...job,
    displayId: createFriendlyJobId(job.title, job.id || job.jobId || '')
  };

  // Keep the original job object for functionality but use displayJob for rendering
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <JobDetailsContent 
            job={job} // Pass the original job object for functionality
            displayJobId={displayJob.displayId} // Pass the display ID separately
            allJobs={allJobs}
          />
        </div>
      </main>
      <Footer />
    </>
  );
} 