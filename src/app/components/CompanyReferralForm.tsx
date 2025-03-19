'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, Building, User, Mail, Phone, Link as LinkIcon, Globe, ArrowRight, ArrowLeft } from 'lucide-react';
import { submitCompanyReferral } from '../../services/airtable';

interface CompanyReferralFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CompanyReferralForm({ isOpen, onClose }: CompanyReferralFormProps) {
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    relationship: '',
    companyLinkedIn: '',
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const nextStep = () => {
    // Validate first step
    if (!formData.yourName || !formData.yourEmail || !formData.relationship) {
      setError('Please fill in all required fields in step 1');
      return;
    }
    setError(null);
    setCurrentStep(2);
  };
  
  const prevStep = () => {
    setCurrentStep(1);
    setError(null);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Validate form data
      if (!formData.yourName || !formData.yourEmail || !formData.companyName || 
          !formData.contactName || !formData.contactEmail || !formData.relationship) {
        throw new Error('Please fill in all required fields');
      }
      
      // Submit to Airtable
      const result = await submitCompanyReferral({
        yourName: formData.yourName,
        yourEmail: formData.yourEmail,
        companyName: formData.companyName,
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        relationship: formData.relationship
      });
      
      if (result) {
        setIsSubmitting(false);
        setIsSubmitted(true);
      } else {
        throw new Error('Failed to submit company referral');
      }
    } catch (err) {
      console.error('Error submitting company referral:', err);
      setError('Failed to submit your referral. Please try again.');
      setIsSubmitting(false);
    }
  };
  
  const resetForm = () => {
    setFormData({
      yourName: '',
      yourEmail: '',
      companyName: '',
      contactName: '',
      contactEmail: '',
      contactPhone: '',
      relationship: '',
      companyLinkedIn: '',
    });
    setCurrentStep(1);
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
                  <h2 className="text-2xl font-bold text-white mb-2">Refer a Company</h2>
                  <p className="text-gray-400 mb-6">
                    Earn 20% commission on the first 3 months of the deal size after taxes. Fill out the form below to refer a company.
                  </p>
                  
                  {/* Step indicator */}
                  <div className="flex items-center justify-center mb-6">
                    <div className={`w-3 h-3 rounded-full ${currentStep === 1 ? 'bg-brand-lime' : 'bg-gray-600'} mr-2`}></div>
                    <div className={`w-3 h-3 rounded-full ${currentStep === 2 ? 'bg-brand-lime' : 'bg-gray-600'}`}></div>
                  </div>
                  
                  {error && (
                    <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-300">
                      {error}
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit}>
                    {currentStep === 1 ? (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Your Information</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Your Name</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="text"
                              name="yourName"
                              value={formData.yourName}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="Your Name"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Your Email</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Mail className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="email"
                              name="yourEmail"
                              value={formData.yourEmail}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="you@example.com"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Your Relationship to the Company</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <User className="h-5 w-5 text-gray-400" />
                            </div>
                            <select
                              name="relationship"
                              value={formData.relationship}
                              onChange={handleChange}
                              required
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent appearance-none"
                            >
                              <option value="">Select relationship</option>
                              <option value="Current Employee">Current Employee</option>
                              <option value="Former Employee">Former Employee</option>
                              <option value="Client">Client</option>
                              <option value="Partner">Partner</option>
                              <option value="Friend">Friend</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>
                        
                        <div className="mt-8">
                          <button
                            type="button"
                            onClick={nextStep}
                            className="w-full py-3 px-4 rounded-lg font-medium bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu transition-all duration-300 flex items-center justify-center"
                          >
                            Next Step <ArrowRight className="ml-2 h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <h3 className="text-lg font-medium text-brand-lime">Company Information</h3>
                        
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
                          <label className="block text-gray-300 text-sm font-medium mb-1">Company LinkedIn URL</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <LinkIcon className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                              type="url"
                              name="companyLinkedIn"
                              value={formData.companyLinkedIn}
                              onChange={handleChange}
                              className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                              placeholder="https://linkedin.com/company/example"
                            />
                          </div>
                        </div>
                        
                        <h3 className="text-lg font-medium text-brand-lime mt-6">Contact Information</h3>
                        
                        <div>
                          <label className="block text-gray-300 text-sm font-medium mb-1">Contact Name</label>
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
                              placeholder="Contact Name"
                            />
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Contact Email</label>
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
                                placeholder="contact@example.com"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-gray-300 text-sm font-medium mb-1">Contact Phone</label>
                            <div className="relative">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Phone className="h-5 w-5 text-gray-400" />
                              </div>
                              <input
                                type="tel"
                                name="contactPhone"
                                value={formData.contactPhone}
                                onChange={handleChange}
                                className="block w-full pl-10 pr-3 py-3 border border-gray-700 rounded-lg bg-dark-400 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-brand-lime focus:border-transparent"
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-8 flex gap-4">
                          <button
                            type="button"
                            onClick={prevStep}
                            className="w-1/3 py-3 px-4 rounded-lg font-medium border border-gray-700 text-gray-300 hover:border-gray-600 hover:text-white transition-colors duration-200 flex items-center justify-center"
                          >
                            <ArrowLeft className="mr-2 h-5 w-5" /> Back
                          </button>
                          <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`w-2/3 py-3 px-4 rounded-lg font-medium transition-all duration-300 flex items-center justify-center ${
                              isSubmitting
                                ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
                                : 'bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu'
                            }`}
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                          </button>
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              ) : (
                <div className="p-8 text-center">
                  <div className="w-16 h-16 bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="h-8 w-8 text-brand-lime" />
                  </div>
                  <h2 className="text-2xl font-bold text-white mb-2">Referral Submitted!</h2>
                  <p className="text-gray-400 mb-6">
                    Thank you for your company referral. We'll review the information and get in touch with them soon.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={resetForm}
                      className="py-3 px-6 rounded-lg font-medium bg-brand-lime text-black hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] hover:scale-[1.02] transform-gpu transition-all duration-300"
                    >
                      Submit Another Referral
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