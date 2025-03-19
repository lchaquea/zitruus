import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Building, MapPin } from 'lucide-react';
import { Job } from '../../services/airtable';

interface JobRecommendationsProps {
  currentJobId: string;
  currentJobTitle: string;
  currentJobIndustry: string;
  allJobs: Job[];
}

const JobRecommendations: React.FC<JobRecommendationsProps> = ({
  currentJobId,
  currentJobTitle,
  currentJobIndustry,
  allJobs,
}) => {
  // Filter out current job and get similar jobs based on industry or title keywords
  const getRecommendedJobs = () => {
    const titleWords = (currentJobTitle || '').toLowerCase().split(' ');
    
    return allJobs
      .filter(job => {
        // Exclude current job
        if (!job || job.id === currentJobId || job.jobId === currentJobId) return false;
        
        // Check if job is in same industry (safely handle undefined/null values)
        const jobIndustry = typeof job.industry === 'string' ? job.industry.toLowerCase() : '';
        const currentIndustryLower = typeof currentJobIndustry === 'string' ? currentJobIndustry.toLowerCase() : '';
        const sameIndustry = jobIndustry && currentIndustryLower && jobIndustry === currentIndustryLower;
        
        // Check if job title contains similar keywords (safely handle undefined/null values)
        const jobTitle = typeof job.title === 'string' ? job.title.toLowerCase() : '';
        const titleMatch = jobTitle && titleWords.some(word => 
          word.length > 3 && jobTitle.includes(word)
        );
        
        return sameIndustry || titleMatch;
      })
      .slice(0, 3); // Get top 3 recommendations
  };

  const recommendedJobs = getRecommendedJobs();

  if (!recommendedJobs || recommendedJobs.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-12 pt-12 border-t border-gray-800"
    >
      <h2 className="text-2xl font-bold text-white mb-6">Similar Positions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedJobs.map((job) => (
          <Link
            key={job.id || job.jobId}
            href={`/jobs/${job.jobId || job.id}`}
            className="group p-4 rounded-xl bg-dark-300 border border-gray-800 hover:border-brand-lime transition-all duration-300"
          >
            <h3 className="text-lg font-semibold text-white group-hover:text-brand-lime transition-colors duration-300">
              {job.title || 'Untitled Position'}
            </h3>
            <div className="mt-2 flex flex-wrap gap-2 text-gray-400 text-sm">
              <span className="flex items-center gap-1">
                <Building size={14} />
                {job.industry || 'General'}
              </span>
              <span className="flex items-center gap-1">
                <MapPin size={14} />
                {job.location || 'Remote'}
              </span>
            </div>
            <div className="mt-3 flex items-center gap-1 text-brand-lime text-sm font-medium">
              View Details
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default JobRecommendations; 