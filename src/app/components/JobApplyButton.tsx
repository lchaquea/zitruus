'use client';

import React, { useState } from 'react';
import JobApplicationForm from './JobApplicationForm';

interface JobApplyButtonProps {
  jobTitle: string;
  jobId: string;
}

export default function JobApplyButton({ jobTitle, jobId }: JobApplyButtonProps) {
  const [isApplicationFormOpen, setIsApplicationFormOpen] = useState(false);
  
  const openApplicationForm = () => {
    setIsApplicationFormOpen(true);
  };
  
  const closeApplicationForm = () => {
    setIsApplicationFormOpen(false);
  };
  
  return (
    <>
      <button
        onClick={openApplicationForm}
        className="w-full px-6 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
      >
        Apply Now
      </button>
      
      {/* Job Application Form Modal */}
      {isApplicationFormOpen && (
        <JobApplicationForm 
          isOpen={isApplicationFormOpen} 
          onClose={closeApplicationForm} 
          jobTitle={jobTitle}
          jobId={jobId}
        />
      )}
    </>
  );
} 