'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, User, Briefcase, Building, Mail, Phone, FileText, Link, Shield, DollarSign } from 'lucide-react';
import { submitJobApplication } from '../../services/airtable';

interface JobApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
  jobTitle: string;
  jobId?: string;
}

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

export default function JobApplicationForm({ isOpen, onClose, jobTitle, jobId = '' }: JobApplicationFormProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    linkedinUrl: '',
    yearsOfExperience: '',
    salaryExpectations: '',
    'CV URL': '',
    isHuman: false,
  });
  
  const [formStep, setFormStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: (e.target as HTMLInputElement).checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUploadError(null);
    
    try {
      const result = await submitJobApplication({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        linkedinUrl: formData.linkedinUrl,
        yearsOfExperience: formData.yearsOfExperience,
        salaryExpectations: formData.salaryExpectations,
        cvUrl: formData['CV URL'],
        jobId: jobId,
        jobTitle: jobTitle
      });

      if (result) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit application');
      }
    } catch (err) {
      console.error('Error submitting application:', err);
      setIsSubmitting(false);
      setUploadError('Failed to submit application. Please try again.');
    }
  };
  
  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      linkedinUrl: '',
      yearsOfExperience: '',
      salaryExpectations: '',
      'CV URL': '',
      isHuman: false,
    });
    setFormStep(1);
    setIsSubmitted(false);
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
                  <h2 className="text-2xl font-bold text-white mb-2">Apply for {jobTitle}</h2>
                  <p className="text-gray-400 mb-6">Fill out the form below to apply for this position.</p>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="space-y-4">
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
                            placeholder="John Doe"
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
                              placeholder="john@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Phone Number</label>
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
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Years of Experience</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="yearsOfExperience"
                              value={formData.yearsOfExperience}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                            >
                              <option value="">Select years of experience</option>
                              <option value="0-2">0-2 years</option>
                              <option value="3-5">3-5 years</option>
                              <option value="5-10">5-10 years</option>
                              <option value="10+">10+ years</option>
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
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                            >
                              <option value="">Select salary range</option>
                              {salaryRanges.map((range) => (
                                <option key={range} value={range}>{range}</option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">LinkedIn Profile URL</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Link className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="linkedinUrl"
                            value={formData.linkedinUrl}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                            placeholder="https://linkedin.com/in/johndoe"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-gray-300 text-sm font-medium mb-1">CV URL</label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FileText className="h-5 w-5 text-gray-400" />
                          </div>
                          <input
                            type="url"
                            name="CV URL"
                            value={formData['CV URL']}
                            onChange={handleChange}
                            required
                            className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                            placeholder="https://drive.google.com/file/d/your-cv"
                          />
                        </div>
                        <p className="mt-2 text-sm text-gray-400">
                          Please provide a publicly accessible link to your CV/Resume (e.g., Google Drive, Dropbox, or other file sharing service)
                        </p>
                        {uploadError && (
                          <p className="mt-2 text-red-500 text-sm">{uploadError}</p>
                        )}
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          name="isHuman"
                          checked={formData.isHuman}
                          onChange={handleChange}
                          required
                          className="h-4 w-4 text-brand-lime focus:ring-brand-lime border-gray-700 rounded"
                        />
                        <label className="ml-2 block text-gray-300 text-sm">
                          I confirm I am a human and not a robot
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full px-6 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center justify-center">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Submitting...
                          </span>
                        ) : (
                          "Submit Application"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="h-16 w-16 text-brand-lime" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Application Submitted!</h2>
                  <p className="text-gray-400 mb-6">
                    Thank you for applying to {jobTitle}. We'll review your application and get back to you soon.
                  </p>
                  <button
                    onClick={closeModal}
                    className="px-6 py-3 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                  >
                    Close
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 