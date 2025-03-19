'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import CalendlyLink from './CalendlyLink';

export default function ReferralContent() {
  const [formData, setFormData] = useState({
    yourName: '',
    yourEmail: '',
    companyName: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    additionalInfo: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // Here you would typically send the form data to your backend
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSubmitted(true);
    } catch (err) {
      setError('There was an error submitting your referral. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Refer a Company
          </motion.h1>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 mb-8"
          >
            Earn 20% commission on the first 3 months of the deal size after taxes. Fill out the form below to refer a company.
          </motion.p>
        </motion.div>

        {!isSubmitted ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-dark-300 rounded-xl p-8 border border-gray-800"
          >
            {error && (
              <motion.div 
                variants={itemVariants}
                className="mb-6 p-4 bg-red-900/30 border border-red-800 rounded-lg text-red-200"
              >
                {error}
              </motion.div>
            )}
            
            <form onSubmit={handleSubmit}>
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Your Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="yourName" className="block text-gray-300 mb-2">Your Name *</label>
                    <input
                      type="text"
                      id="yourName"
                      name="yourName"
                      value={formData.yourName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="yourEmail" className="block text-gray-300 mb-2">Your Email *</label>
                    <input
                      type="email"
                      id="yourEmail"
                      name="yourEmail"
                      value={formData.yourEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-gray-300 mb-2">Company Name *</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactName" className="block text-gray-300 mb-2">Contact Name *</label>
                    <input
                      type="text"
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactEmail" className="block text-gray-300 mb-2">Contact Email *</label>
                    <input
                      type="email"
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactPhone" className="block text-gray-300 mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                    />
                  </div>
                </div>
              </motion.div>
              
              <motion.div variants={itemVariants} className="mb-8">
                <label htmlFor="additionalInfo" className="block text-gray-300 mb-2">Additional Information</label>
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  value={formData.additionalInfo}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 bg-dark-400 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-brand-lime transition-colors"
                  placeholder="Any additional details about the company or their hiring needs..."
                ></textarea>
              </motion.div>
              
              <motion.div variants={itemVariants} className="flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                </button>
              </motion.div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="bg-dark-300 rounded-xl p-8 border border-gray-800 text-center"
          >
            <motion.div variants={itemVariants} className="mb-8">
              <div className="w-16 h-16 bg-brand-lime rounded-full flex items-center justify-center mx-auto mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-4">Thank You for Your Referral!</h2>
              <p className="text-gray-300 mb-6">
                We've received your referral and our team will review it shortly. We'll be in touch with you about next steps and commission details.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold text-white mb-4">Want to discuss more details?</h3>
              <div className="flex justify-center">
                <CalendlyLink className="px-6 py-3 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2 inline-block" />
                  Schedule a Call
                </CalendlyLink>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
} 