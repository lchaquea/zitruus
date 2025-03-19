'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Briefcase, ArrowLeft, DollarSign, Building, Calendar } from 'lucide-react';
import JobApplyButton from './JobApplyButton';
import { Job } from '../../services/airtable';

interface JobDetailsContentProps {
  job: Job;
  displayJobId: string;
  allJobs: Job[];
}

export default function JobDetailsContent({
  job,
  displayJobId,
}: JobDetailsContentProps) {
  // Format date to relative time (e.g., "2 days ago")
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Recently';
    
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  // Format regular date
  const formatRegularDate = (dateString: string) => {
    if (!dateString) return '';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString;
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

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

  // Get the numeric Job ID from Airtable (not the internal record ID)
  const jobIdDisplay = job.jobId || '';

  return (
    <div className="space-y-8">
      {/* Job Header Section */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4 text-gray-400">
          <Link href="/jobs" className="flex items-center gap-2 hover:text-brand-lime">
            <ArrowLeft size={16} />
            Back to all jobs
          </Link>
        </div>
        
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Job details - 2/3 width on large screens */}
          <div className="lg:col-span-2 job-details-container">
            <motion.div variants={itemVariants} className="mb-8">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{job.title}</h1>
                <p className="text-primary-500 text-xl mb-4">{job.company}</p>
                {/* Only show the Job ID if it exists and is a numeric ID */}
                {job.jobId && /^\d+$/.test(job.jobId) && (
                  <p className="text-gray-400 mb-4">Job ID: {job.jobId}</p>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4 text-gray-400 mb-6">
                <span className="flex items-center gap-1">
                  <MapPin size={16} />
                  {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Briefcase size={16} />
                  {job.type}
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign size={16} />
                  {job.salary}
                </span>
                <span className="flex items-center gap-1">
                  <Building size={16} />
                  {job.industry || 'General'}
                </span>
                <span className="flex items-center gap-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                  {job.function || 'General'}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  Posted {formatDate(job.postedDate || '')}
                </span>
              </div>
              
              {job.applicationDeadline && (
                <div className="mb-6 p-3 bg-dark-300 border border-gray-800 rounded-lg">
                  <p className="text-gray-300">
                    <span className="font-semibold">Application Deadline:</span> {formatRegularDate(job.applicationDeadline)}
                  </p>
                </div>
              )}
              
              <div className="flex flex-wrap gap-2 mb-8">
                {job.skills && job.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 text-sm bg-brand-lime/20 text-brand-lime rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
            
            <motion.div variants={itemVariants} className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">About the Role</h2>
              <p className="text-gray-300 mb-6 leading-relaxed">{job.description}</p>
            </motion.div>
            
            {job.responsibilities && job.responsibilities.length > 0 && (
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Responsibilities</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {job.responsibilities.map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {job.requirements && job.requirements.length > 0 && (
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Requirements</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {job.requirements.map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {job.benefits && job.benefits.length > 0 && (
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Benefits</h2>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  {job.benefits.map((item, index) => (
                    <li key={index} className="leading-relaxed">{item}</li>
                  ))}
                </ul>
              </motion.div>
            )}
            
            {job.companyDescription && (
              <motion.div variants={itemVariants}>
                <h2 className="text-2xl font-bold text-white mb-4">About the Company</h2>
                <p className="text-gray-300 leading-relaxed">{job.companyDescription}</p>
              </motion.div>
            )}
          </div>
          
          {/* Application button - 1/3 width on large screens */}
          <motion.div variants={itemVariants} className="lg:sticky lg:top-24 self-start">
            <div className="bg-dark-300 border border-gray-800 rounded-xl p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Interested in this position?</h2>
              <JobApplyButton jobTitle={job.title} jobId={job.jobId || job.id || ''} />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
} 