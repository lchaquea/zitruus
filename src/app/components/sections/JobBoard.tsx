'use client';

// Testimonial bubbles removed for cleaner UI
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Search, Filter } from 'lucide-react';
import ResumePoolForm from '../ResumePool';
import JobCard, { Job } from '../JobCard';
import { getAllJobs } from '../../../services/airtable';
import TestimonialBubble from '../TestimonialBubble';

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

interface JobBoardProps {
  showHeader?: boolean;
  testimonials?: Array<{
    imageSrc: string;
    name: string;
    role: string;
    testimonial: string;
    position: {
      top?: string;
      left?: string;
      right?: string;
      bottom?: string;
      position: string;
    };
  }>;
}

export default function JobBoard({ showHeader = true, testimonials = [] }: JobBoardProps) {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    type: '',
    industry: '',
    function: '',
    salary: ''
  });
  const [noMatchesFound, setNoMatchesFound] = useState(false);
  const [isResumePoolOpen, setIsResumePoolOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    location: [] as string[],
    type: [] as string[],
    industry: [] as string[],
    function: [] as string[],
    salary: [] as string[]
  });

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobsData = await getAllJobs();
        setJobs(jobsData);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        // Add a small delay to prevent flash
        setTimeout(() => setLoading(false), 300);
      }
    };

    fetchJobs();
  }, []);
  
  const clearFilters = () => {
    // Reset all filters to empty strings
    setFilters({
      location: '',
      type: '',
      industry: '',
      function: '',
      salary: ''
    });
    
    // Also clear the search term
    setSearchTerm('');
    
    // Explicitly set noMatchesFound to false to ensure job cards are displayed
    setNoMatchesFound(false);
    
    // Close the filter menu
    setShowFilters(false);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };
  
  // Filter jobs based on search term and selected filters
  const filteredJobs = jobs.filter(job => {
    // If no filters are active, return all jobs
    const noFiltersActive = 
      !searchTerm && 
      !filters.location && 
      !filters.type && 
      !filters.industry && 
      !filters.function && 
      !filters.salary;
    
    if (noFiltersActive) {
      return true; // Show all jobs when no filters are active
    }
    
    // Basic search term filter
    const matchesSearch = !searchTerm || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (job.skills && job.skills.some(skill => 
        skill.toLowerCase().includes(searchTerm.toLowerCase())
      ));
    
    if (searchTerm && !matchesSearch) return false;
    
    // Additional filters
    const matchesLocation = !filters.location || job.location === filters.location;
    const matchesType = !filters.type || job.type === filters.type;
    const matchesFunction = !filters.function || job.function === filters.function;
    const matchesSalary = !filters.salary || job.salary === filters.salary;
    
    // For industry, check both the industry field and the job title/description
    const matchesIndustry = !filters.industry || 
      job.industry === filters.industry ||
      job.title.toLowerCase().includes(filters.industry.toLowerCase()) ||
      job.description.toLowerCase().includes(filters.industry.toLowerCase());
    
    return matchesLocation && matchesType && matchesIndustry && matchesFunction && matchesSalary;
  });
  
  // Update noMatchesFound state whenever filters or search term changes
  useEffect(() => {
    // Check if any filters are active
    const hasActiveFilters = 
      searchTerm || 
      filters.location || 
      filters.type || 
      filters.industry || 
      filters.function || 
      filters.salary;
    
    // Only show "no matches found" message if we have active filters and no results
    setNoMatchesFound(hasActiveFilters && filteredJobs.length === 0);
    
    // If no filters are active, we should never show "no matches found"
    if (!hasActiveFilters) {
      setNoMatchesFound(false);
    }
  }, [filteredJobs.length, searchTerm, filters]);

  if (loading) {
    return (
      <section className="py-24 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-dark-300 rounded w-1/3 mx-auto"></div>
            <div className="h-4 bg-dark-300 rounded w-2/3 mx-auto"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-dark-300 rounded-lg p-6 space-y-4">
                  <div className="h-6 bg-dark-400 rounded w-3/4"></div>
                  <div className="h-4 bg-dark-400 rounded w-1/2"></div>
                  <div className="h-20 bg-dark-400 rounded"></div>
                  <div className="flex gap-2">
                    <div className="h-8 bg-dark-400 rounded w-1/3"></div>
                    <div className="h-8 bg-dark-400 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Add testimonial bubbles */}
        {testimonials.map((testimonial, index) => (
          <div key={index} style={{
            ...testimonial.position,
            zIndex: 50
          }}>
            <TestimonialBubble
              imageSrc={testimonial.imageSrc}
              name={testimonial.name}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
              label="Read more"
            />
          </div>
        ))}

        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="w-full"
        >
          {showHeader && (
            <motion.div
              variants={itemVariants}
              className="text-center mb-16"
            >
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Available Jobs
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Discover top remote positions with US companies hiring LATAM talent
              </p>
            </motion.div>
          )}

          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, industry, function or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-dark-300 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 focus:ring-2 focus:ring-primary-600/20 transition-all duration-300 shadow-lg"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center justify-center gap-2 px-6 py-4 bg-dark-300 border ${showFilters ? 'border-brand-lime text-brand-lime' : 'border-gray-800 text-white'} rounded-lg hover:border-brand-lime hover:text-brand-lime transition-all duration-300 shadow-lg group`}
              >
                <Filter size={18} className={`${showFilters ? 'text-brand-lime' : ''} transition-colors duration-300`} />
                <span>Filters</span>
                <span className={`ml-1 transform transition-transform duration-300 ${showFilters ? 'rotate-180' : 'rotate-0'}`}>
                  {showFilters ? '↑' : '↓'}
                </span>
              </button>
            </div>

            {/* Quick Filters */}
            <div className="mb-6 overflow-x-auto pb-2">
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => handleFilterChange('function', '')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === '' && filters.industry === '' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  All
                </button>
                
                {/* Function-based filters */}
                <button
                  onClick={() => handleFilterChange('function', 'Marketing')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'Marketing' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Marketing
                </button>
                
                <button
                  onClick={() => handleFilterChange('function', 'Sales')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'Sales' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Sales
                </button>
                
                <button
                  onClick={() => handleFilterChange('function', 'Engineering')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'Engineering' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Engineering
                </button>
                
                <button
                  onClick={() => handleFilterChange('function', 'Accounting')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'Accounting' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Accounting
                </button>
                
                <button
                  onClick={() => handleFilterChange('function', 'Executive Assistant')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'Executive Assistant' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Executive Assistants
                </button>
                
                <button
                  onClick={() => handleFilterChange('function', 'HR')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'HR' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  HR
                </button>
                
                <button
                  onClick={() => handleFilterChange('function', 'Operations')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.function === 'Operations' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Operations
                </button>
                
                {/* Industry-based filters */}
                <button
                  onClick={() => handleFilterChange('industry', 'Fintech')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.industry === 'Fintech' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Fintech
                </button>
                
                <button
                  onClick={() => handleFilterChange('industry', 'Retail & Ecommerce')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.industry === 'Retail & Ecommerce' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Retail & Ecommerce
                </button>
                
                <button
                  onClick={() => handleFilterChange('industry', 'Communications & Media')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.industry === 'Communications & Media' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Communications & Media
                </button>
                
                <button
                  onClick={() => handleFilterChange('industry', 'Technology')}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.industry === 'Technology' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Technology
                </button>
                
                <button
                  onClick={() => {
                    // Set both function and industry to empty to show all jobs
                    setFilters(prev => ({
                      ...prev,
                      function: '',
                      industry: 'Other'
                    }));
                  }}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    filters.industry === 'Other' 
                      ? 'bg-brand-lime text-black' 
                      : 'bg-dark-300 text-gray-300 hover:bg-dark-400'
                  }`}
                >
                  Other
                </button>
              </div>
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="p-8 bg-gradient-to-br from-dark-300 to-dark-400 border border-gray-800 rounded-xl mb-8 shadow-xl"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-white font-medium text-lg flex items-center">
                    <Filter size={18} className="mr-2 text-brand-lime" />
                    <span>Refine Your Search</span>
                  </h3>
                  <button
                    onClick={clearFilters}
                    className="px-4 py-2 text-sm text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 rounded-lg transition-all duration-200 flex items-center gap-2 hover:bg-dark-500/30"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 2v20M2 12h20"/>
                    </svg>
                    <span>Clear all</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {Object.entries(filterOptions).map(([key, options]) => (
                    <div key={key} className="filter-group">
                      <label className="block text-brand-lime text-sm font-medium mb-2 capitalize">
                        {key}
                      </label>
                      <div className="relative">
                        <select
                          value={filters[key]}
                          onChange={(e) => handleFilterChange(key, e.target.value)}
                          className="w-full px-4 py-3 bg-dark-500 border border-gray-700 rounded-lg text-white appearance-none focus:outline-none focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 transition-all duration-300 shadow-md"
                        >
                          <option value="">
                            {key === 'industry' ? 'All Industries' : 
                             key === 'function' ? 'All Functions' :
                             key === 'location' ? 'All Locations' :
                             key === 'type' ? 'All Types' :
                             key === 'salary' ? 'All Salary Ranges' :
                             `All ${key}s`}
                          </option>
                          {options.map((option) => (
                            <option key={option} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"></polyline>
                          </svg>
                        </div>
                        {filters[key] && (
                          <button 
                            onClick={() => handleFilterChange(key, '')}
                            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                            aria-label="Clear filter"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                
                {Object.values(filters).some(value => value !== '') && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex flex-wrap gap-2">
                      <span className="text-sm text-gray-400">Active filters:</span>
                      {Object.entries(filters).map(([key, value]) => 
                        value ? (
                          <span key={key} className="px-3 py-1 bg-dark-500 border border-gray-700 rounded-full text-sm text-white flex items-center gap-1">
                            <span className="text-brand-lime capitalize">{key}:</span> {value}
                            <button 
                              onClick={() => handleFilterChange(key, '')}
                              className="ml-1 text-gray-400 hover:text-white"
                              aria-label={`Remove ${key} filter`}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18"></line>
                                <line x1="6" y1="6" x2="18" y2="18"></line>
                              </svg>
                            </button>
                          </span>
                        ) : null
                      )}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </div>

          {/* Job Board */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lime"></div>
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <p className="text-red-500">{error}</p>
            </div>
          ) : (
            <JobCard jobs={filteredJobs} />
          )}

          <div className="mt-12 text-center">
            <a
              href="/jobs"
              className="inline-block px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
            >
              View All Jobs
            </a>
          </div>

          {/* Resume Pool Form Modal */}
          {isResumePoolOpen && (
            <ResumePoolForm 
              isOpen={isResumePoolOpen}
              onClose={() => setIsResumePoolOpen(false)} 
            />
          )}
        </motion.div>
      </div>
    </section>
  );
} 