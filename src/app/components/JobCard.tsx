'use client';

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Building, MapPin, DollarSign, ArrowRight, ChevronLeft, ChevronRight, Wrench } from 'lucide-react';
import JobApplicationForm from './JobApplicationForm';

// Animation variants
const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

// Define the job type
export type Job = {
  id?: string;           // Added id field for job identification
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
  jobId?: string;             // Added jobId field for job identification
};

type JobCardProps = {
  jobs: Job[];
};

// Helper function to format date
const formatDate = (dateString: string) => {
  if (!dateString) return '';
  
  try {
    const date = new Date(dateString);
    // Check if date is valid
    if (isNaN(date.getTime())) return dateString;
    
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

const JobCard: React.FC<JobCardProps> = ({ jobs }) => {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [selectedJob, setSelectedJob] = React.useState<Job | null>(null);
  const [isApplicationFormOpen, setIsApplicationFormOpen] = React.useState(false);
  const jobsPerPage = 4; // Changed from 6 to 4 jobs per page
  
  // Reset to page 1 when jobs array changes (e.g., when filters are applied)
  useEffect(() => {
    setCurrentPage(1);
  }, [jobs]);
  
  // Calculate total number of pages
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  
  // Get current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);
  
  // Change page
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  
  // Go to next page
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  // Go to previous page
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const openApplicationForm = (job: Job) => {
    setSelectedJob(job);
    setIsApplicationFormOpen(true);
  };

  const closeApplicationForm = () => {
    setSelectedJob(null);
    setIsApplicationFormOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Job Cards Grid Layout */}
      {currentJobs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {currentJobs.map((job) => (
            <motion.div
              key={job.id || job.title}
              variants={itemVariants}
              className="p-4 rounded-xl bg-dark-300 border border-gray-800 hover:border-primary-600 transition-all duration-300 flex flex-col h-full"
            >
              <div className="flex flex-col justify-between h-full">
                <div>
                  {/* Title and Salary in top row */}
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-semibold text-white line-clamp-1 flex-1 pr-2">{job.title}</h3>
                    <span className="flex items-center gap-1 text-brand-lime whitespace-nowrap">
                      <DollarSign size={14} className="text-brand-lime" />
                      {job.salary}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-2 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <Building size={14} />
                      {job.industry}
                    </span>
                    <span className="flex items-center gap-1">
                      <Wrench size={14} />
                      {job.function}
                    </span>
                  </div>
                  
                  <div className="mt-2 flex flex-wrap gap-2 text-gray-400 text-sm">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                      {job.type}
                    </span>
                  </div>
                  
                  {/* Date Posted */}
                  {job.postedDate && (
                    <div className="mt-2 flex items-center gap-1 text-gray-400 text-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>Date posted: {formatDate(job.postedDate)}</span>
                    </div>
                  )}
                  
                  <p className="mt-3 text-gray-300 text-sm line-clamp-2">{job.description}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {job.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 text-xs bg-brand-lime/20 text-brand-lime rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                    {job.skills.length > 3 && (
                      <span className="px-2 py-0.5 text-xs bg-dark-400 text-gray-400 rounded-full">
                        +{job.skills.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="mt-4 flex justify-between items-center">
                  {/* View Details button */}
                  {job.jobId && !job.jobId.startsWith('rec') ? (
                    <Link 
                      href={`/jobs/${job.jobId}`}
                      className="text-brand-lime hover:text-brand-lime/80 font-medium transition-colors duration-200 flex items-center gap-1 text-xs"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  ) : job.id && !job.id.startsWith('rec') ? (
                    <Link 
                      href={`/jobs/${job.id}`}
                      className="text-brand-lime hover:text-brand-lime/80 font-medium transition-colors duration-200 flex items-center gap-1 text-xs"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  ) : (
                    <Link 
                      href={`/jobs/${job.id || job.jobId}`}
                      className="text-brand-lime hover:text-brand-lime/80 font-medium transition-colors duration-200 flex items-center gap-1 text-xs"
                    >
                      View Details
                      <ArrowRight size={14} />
                    </Link>
                  )}
                  
                  <button
                    onClick={() => openApplicationForm(job)}
                    className="px-4 py-2 bg-brand-lime text-black text-sm font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="p-6 rounded-xl bg-dark-300 border border-gray-800 text-center">
          <p className="text-gray-300">No job postings available on this page.</p>
        </div>
      )}

      {/* Elegant Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-10">
          <nav className="inline-flex items-center bg-dark-300 rounded-full p-1.5 shadow-lg">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 ${
                currentPage === 1
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white hover:bg-dark-400'
              }`}
              aria-label="Previous page"
            >
              <ChevronLeft size={20} />
            </button>
            
            {/* Page numbers */}
            <div className="flex items-center px-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
                <button
                  key={number}
                  onClick={() => paginate(number)}
                  className={`flex items-center justify-center w-8 h-8 mx-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPage === number
                      ? 'bg-brand-lime text-black shadow-[0_0_10px_rgba(225,244,115,0.5)]'
                      : 'text-gray-300 hover:bg-dark-400 hover:text-white'
                  }`}
                  aria-label={`Page ${number}`}
                  aria-current={currentPage === number ? 'page' : undefined}
                >
                  {number}
                </button>
              ))}
            </div>
            
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`flex items-center justify-center rounded-full w-10 h-10 transition-all duration-300 ${
                currentPage === totalPages
                  ? 'text-gray-500 cursor-not-allowed'
                  : 'text-white hover:bg-dark-400'
              }`}
              aria-label="Next page"
            >
              <ChevronRight size={20} />
            </button>
          </nav>
        </div>
      )}

      {/* Job Application Form Modal */}
      {isApplicationFormOpen && selectedJob && (
        <JobApplicationForm
          isOpen={isApplicationFormOpen}
          onClose={closeApplicationForm}
          jobTitle={selectedJob.title}
          jobId={selectedJob.id || selectedJob.jobId || ''}
        />
      )}
    </div>
  );
};

export default JobCard; 