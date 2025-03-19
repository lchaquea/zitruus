'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User, Briefcase, Building, Mail, Phone, FileText, DollarSign } from 'lucide-react';
import { submitCandidateRequest } from '../../services/airtable';

interface CandidateRequestFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const functionOptions = [
  'Software Development',
  'Product Management',
  'UI/UX Design',
  'Data Science',
  'DevOps Engineering',
  'Quality Assurance',
  'Technical Writing',
  'Marketing',
  'Customer Success',
  'Sales',
  'Human Resources',
  'Finance',
  'Legal',
  'Administrative'
];

const companySizeOptions = [
  '1-10',
  '11-50',
  '51-200',
  '201-500',
  '501-1000',
  '1001+'
];

const timelineOptions = [
  'Immediate (1-2 weeks)',
  'Short-term (2-4 weeks)',
  'Medium-term (1-2 months)',
  'Long-term (3+ months)'
];

export default function CandidateRequestForm({ isOpen, onClose }: CandidateRequestFormProps) {
  const [formData, setFormData] = useState({
    companyName: '',
    companyLinkedIn: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    industry: '',
    companySize: '',
    positionTitle: '',
    positionType: '',
    location: '',
    budget: '',
    requirements: '',
    timeline: '',
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
      const result = await submitCandidateRequest({
        companyName: formData.companyName,
        companyLinkedIn: formData.companyLinkedIn,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        industry: formData.industry,
        companySize: formData.companySize,
        positionTitle: formData.positionTitle,
        positionType: formData.positionType,
        location: formData.location,
        budget: formData.budget,
        requirements: formData.requirements,
        timeline: formData.timeline,
        additionalInfo: formData.additionalInfo
      });
      
      if (result) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit candidate request');
      }
    } catch (err) {
      console.error('Error submitting candidate request:', err);
      setError('Failed to submit your request. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const nextStep = () => {
    setFormStep(prev => prev + 1);
  };
  
  const prevStep = () => {
    setFormStep(prev => prev - 1);
  };
  
  const resetForm = () => {
    setFormData({
      companyName: '',
      companyLinkedIn: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      industry: '',
      companySize: '',
      positionTitle: '',
      positionType: '',
      location: '',
      budget: '',
      requirements: '',
      timeline: '',
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
                  <h2 className="text-2xl font-bold text-white mb-2">Request a Candidate</h2>
                  <p className="text-gray-400 mb-6">
                    Tell us about your hiring needs and we'll find the perfect candidate for your team.
                  </p>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    {formStep === 1 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Company Information</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Company Name</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Building className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="companyName"
                                value={formData.companyName}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                                placeholder="Company Name"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Company's LinkedIn URL</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-gray-400">
                                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                  <rect x="2" y="9" width="4" height="12"></rect>
                                  <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                              </div>
                              <input
                                type="url"
                                name="companyLinkedIn"
                                value={formData.companyLinkedIn}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                                placeholder="https://linkedin.com/company/..."
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Industry</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="industry"
                              value={formData.industry}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="e.g. Technology, Healthcare, Finance"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Company Size</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Building className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="companySize"
                              value={formData.companySize}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                            >
                              <option value="">Select company size</option>
                              {companySizeOptions.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-medium text-brand-lime mt-6">Contact Information</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Your Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="contactName"
                              value={formData.contactName}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="Your Name"
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
                                name="contactEmail"
                                value={formData.contactEmail}
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
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                required
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 2 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Position Details</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Position Title</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="positionTitle"
                              value={formData.positionTitle}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="e.g. Senior Software Engineer"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Position Type</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="positionType"
                              value={formData.positionType}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                            >
                              <option value="">Select position type</option>
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Freelance">Freelance</option>
                              <option value="Internship">Internship</option>
                            </select>
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
                              placeholder="e.g. Remote, New York, NY"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Budget</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="text-gray-400 w-5 h-5" />
                            </div>
                            <input
                              type="text"
                              name="budget"
                              value={formData.budget}
                              onChange={handleChange}
                              placeholder="Budget for this position in annual wages"
                              required
                              className="w-full pl-10 pr-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-lime/50 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {formStep === 3 && (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Position Requirements</h3>
                        
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Requirements</label>
                          <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                              <FileText className="text-gray-400 w-5 h-5" />
                            </div>
                            <textarea
                              name="requirements"
                              value={formData.requirements}
                              onChange={handleChange}
                              placeholder="Describe the skills, experience, and qualifications needed"
                              required
                              rows={4}
                              className="w-full pl-10 pr-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-lime/50 focus:border-transparent transition-all"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Hiring Timeline</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="timeline"
                              value={formData.timeline}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                            >
                              <option value="">Select timeline</option>
                              {timelineOptions.map(option => (
                                <option key={option} value={option}>
                                  {option}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 mb-2 font-medium">Additional Information (Optional)</label>
                          <div className="relative">
                            <div className="absolute top-3 left-3 pointer-events-none">
                              <FileText className="text-gray-400 w-5 h-5" />
                            </div>
                            <textarea
                              name="additionalInfo"
                              value={formData.additionalInfo}
                              onChange={handleChange}
                              placeholder="Any additional details about the position or your company"
                              rows={3}
                              className="w-full pl-10 pr-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-lime/50 focus:border-transparent transition-all"
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
                      ) : formStep === 2 ? (
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
                            type="submit"
                            disabled={isSubmitting}
                            className={`py-3 px-6 rounded-lg font-medium transition-all duration-300 ${
                              isSubmitting
                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                : 'bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu'
                            }`}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Request'}
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
                  <h2 className="text-2xl font-bold text-white mb-2">Request Submitted!</h2>
                  <p className="text-gray-400 mb-6">
                    Thank you for your candidate request. Our team will review your requirements and get back to you shortly.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={resetForm}
                      className="py-3 px-6 rounded-lg font-medium bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu transition-all duration-300"
                    >
                      Submit Another Request
                    </button>
                    <button
                      onClick={closeModal}
                      className="py-3 px-6 rounded-lg font-medium border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-colors duration-200"
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