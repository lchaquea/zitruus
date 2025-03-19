'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { MapPin, Briefcase, Clock, ArrowLeft, DollarSign, Building, Calendar } from 'lucide-react';
import { getJobById, Job } from '../../../services/airtable';

export default function JobDetail() {
  const params = useParams();
  const jobId = params.id as string;
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Fetch job details from Airtable
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const jobData = await getJobById(jobId);
        setJob(jobData);
        if (!jobData) {
          setError('Job not found');
        } else {
          setError(null);
        }
      } catch (err) {
        console.error('Error fetching job details:', err);
        setError('Failed to load job details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJobDetails();
    }
  }, [jobId]);
  
  // Application form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    resume: null as File | null,
    coverLetter: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // If job not found or error
  if (loading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lime"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }
  
  if (error || !job) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-4">Job Not Found</h1>
              <p className="text-gray-400 mb-8">The job you're looking for doesn't exist or has been removed.</p>
              <Link href="/careers" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400">
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
  
  // Form handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, resume: e.target.files![0] }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
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

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <Link href="/careers" className="inline-flex items-center gap-2 text-primary-500 hover:text-primary-400 mb-8">
            <ArrowLeft size={16} />
            Back to all jobs
          </Link>
          
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Job details - 2/3 width on large screens */}
            <div className="lg:col-span-2">
              <motion.div variants={itemVariants} className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">{job.title}</h1>
                <p className="text-primary-500 text-xl mb-4">{job.company}</p>
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
                    {job.category || 'General'}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    Posted {formatDate(job.postedDate || '')}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-8">
                  {job.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 text-sm bg-primary-600/20 text-primary-500 rounded-full"
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
                  <h2 className="text-2xl font-bold text-white mb-4">About {job.company}</h2>
                  <p className="text-gray-300 leading-relaxed">{job.companyDescription}</p>
                </motion.div>
              )}
            </div>
            
            {/* Application form - 1/3 width on large screens */}
            <motion.div variants={itemVariants} className="lg:sticky lg:top-24 self-start">
              <div className="bg-dark-300 border border-gray-800 rounded-xl p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Apply for this position</h2>
                
                {isSubmitted ? (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-primary-600/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2">Application Submitted!</h3>
                    <p className="text-gray-400 mb-6">Thank you for your interest. We'll review your application and get back to you soon.</p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                    >
                      Apply for Another Position
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-gray-400 text-sm mb-1">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary-600 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-gray-400 text-sm mb-1">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary-600 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-gray-400 text-sm mb-1">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary-600 transition-colors duration-200"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="resume" className="block text-gray-400 text-sm mb-1">Resume/CV</label>
                      <input
                        type="file"
                        id="resume"
                        name="resume"
                        onChange={handleFileChange}
                        required
                        className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary-600 transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                      />
                      <p className="text-xs text-gray-500 mt-1">PDF, DOCX, or TXT (Max 5MB)</p>
                    </div>
                    
                    <div>
                      <label htmlFor="coverLetter" className="block text-gray-400 text-sm mb-1">Cover Letter (Optional)</label>
                      <textarea
                        id="coverLetter"
                        name="coverLetter"
                        value={formData.coverLetter}
                        onChange={handleChange}
                        rows={4}
                        className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-md text-white focus:outline-none focus:border-primary-600 transition-colors duration-200 resize-none"
                      ></textarea>
                    </div>
                    
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg transition-colors duration-200 ${
                        isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'
                      }`}
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Application'}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
} 