'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User, Briefcase, Building, Mail, Phone, FileText, Link, DollarSign } from 'lucide-react';
import { submitResume } from '../../services/airtable';

interface ResumePoolFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const functionOptions = [
  'HR',
  'Product',
  'Marketing',
  'R&D',
  'Other',
  'Administration & Operations',
  'Operations',
  'Finance',
  'Sales',
  'Engineering',
  'Accounting',
  'Design',
  'Data & Analytics'
];

const salaryRanges = [
  'Under $15K USD/year',
  '$15K - $20K USD/year',
  '$20K - $30K USD/year',
  '$30K - $45K USD/year',
  '$45K - $60K USD/year',
  '$60K - $75K USD/year',
  '$75K - $90K USD/year',
  '$90K - $105K USD/year',
  'Above $105K USD/year'
];

const experienceLevels = [
  '0-2 years',
  '3-5 years',
  '5-10 years',
  '10+ years'
];

export default function ResumePoolForm({ isOpen, onClose }: ResumePoolFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    jobTitle: '',
    function: '',
    experience: '',
    salaryExpectations: '',
    skills: '',
    linkedInUrl: '',
    portfolioUrl: '',
    resumeUrl: '',
    additionalInfo: ''
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Submit to Airtable
      const result = await submitResume({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        jobTitle: formData.jobTitle,
        function: formData.function,
        experience: formData.experience,
        skills: formData.skills,
        linkedInUrl: formData.linkedInUrl,
        portfolioUrl: formData.portfolioUrl,
        resumeUrl: formData.resumeUrl,
        additionalInfo: formData.additionalInfo
      });
      
      if (result) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit resume');
      }
    } catch (err) {
      console.error('Error submitting resume:', err);
      setError('Failed to submit your resume. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      location: '',
      jobTitle: '',
      function: '',
      experience: '',
      salaryExpectations: '',
      skills: '',
      linkedInUrl: '',
      portfolioUrl: '',
      resumeUrl: '',
      additionalInfo: ''
    });
    setFormStep(1);
    setIsSubmitted(false);
    setError(null);
  };
  
  const closeModal = () => {
    resetForm();
    onClose();
  };
  
  const modalVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', damping: 25, stiffness: 300 } },
    exit: { opacity: 0, y: 50, transition: { duration: 0.2 } }
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };
  
  const nextStep = () => {
    setFormStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          />
          
          <motion.div
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div
              className="bg-dark-300 rounded-xl shadow-xl w-full max-w-xl overflow-hidden relative"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200"
              >
                <X size={24} />
              </button>
              
              {!isSubmitted ? (
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Join Our Talent Pool</h2>
                  <p className="text-gray-400 mb-6">
                    Submit your resume to be considered for future opportunities with top US companies.
                  </p>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    {formStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Personal Information</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Full Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="fullName"
                              value={formData.fullName}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="Your Full Name"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Email</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                                placeholder="you@example.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Phone</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Location</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="location"
                              value={formData.location}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="City, Country"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Professional Information</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Current/Desired Job Title</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="jobTitle"
                              value={formData.jobTitle}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="e.g. Senior Software Engineer"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Function</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="function"
                              value={formData.function}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                            >
                              <option value="">Select function</option>
                              {functionOptions.map(func => (
                                <option key={func} value={func}>
                                  {func}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Years of Experience</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Briefcase className="h-5 w-5 text-gray-400" />
                              </div>
                              <select
                                name="experience"
                                value={formData.experience}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                              >
                                <option value="">Select experience level</option>
                                {experienceLevels.map(level => (
                                  <option key={level} value={level}>
                                    {level}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Salary Expectations</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <DollarSign className="h-5 w-5 text-gray-400" />
                              </div>
                              <select
                                name="salaryExpectations"
                                value={formData.salaryExpectations}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                              >
                                <option value="">Select salary range</option>
                                {salaryRanges.map(range => (
                                  <option key={range} value={range}>
                                    {range}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Skills</label>
                          <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                              name="skills"
                              value={formData.skills}
                              onChange={handleChange}
                              required
                              placeholder="List your key skills, separated by commas"
                              rows={3}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Additional Information</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">LinkedIn URL (Optional)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Link className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              name="linkedInUrl"
                              value={formData.linkedInUrl}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="https://linkedin.com/in/yourprofile"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Portfolio/Website URL (Optional)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Link className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              name="portfolioUrl"
                              value={formData.portfolioUrl}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="https://yourportfolio.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Resume URL (Optional)</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              name="resumeUrl"
                              value={formData.resumeUrl}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="URL to your resume (Google Drive, Dropbox, etc.)"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Additional Information (Optional)</label>
                          <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                              <FileText className="h-5 w-5 text-gray-400" />
                            </div>
                            <textarea
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleChange}
                              placeholder="Any additional information you'd like to share"
                              rows={3}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 flex justify-between">
                      {formStep === 1 ? (
                        <>
                          <div></div> {/* Empty div for spacing */}
                          <button
                            type="button"
                            onClick={nextStep}
                            className="py-3 px-6 rounded-lg font-medium bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu transition-all duration-300"
                          >
                            Next
                          </button>
                        </>
                      ) : formStep === 3 ? (
                        <>
                          <button
                            type="button"
                            onClick={prevStep}
                            className="py-3 px-6 rounded-lg font-medium border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                              isSubmitting
                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                : 'bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu'
                            }`}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Resume'}
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={prevStep}
                            className="py-3 px-6 rounded-lg font-medium border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-colors duration-200"
                          >
                            Back
                          </button>
                          <button
                            type="button"
                            onClick={nextStep}
                            className="py-3 px-6 rounded-lg font-medium bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu transition-all duration-300"
                          >
                            Next
                          </button>
                        </>
                      )}
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-brand-lime" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Resume Submitted!</h2>
                  <p className="text-gray-400 mb-6">
                    Thank you for submitting your resume. We'll review your profile and contact you if there's a match with our opportunities.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={closeModal}
                      className="py-3 px-6 rounded-lg font-medium bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu transition-all duration-300"
                    >
                      Close
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 