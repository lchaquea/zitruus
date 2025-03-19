'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Building, DollarSign } from 'lucide-react';
import Link from 'next/link';
import CandidateReferralForm from '../CandidateReferralForm';
import CompanyReferralForm from '../CompanyReferralForm';
import { submitCompanyReferral } from '../../../services/airtable';

export default function Referral() {
  const [isCandidateFormOpen, setIsCandidateFormOpen] = useState(false);
  const [isCompanyFormOpen, setIsCompanyFormOpen] = useState(false);
  const [airtableStatus, setAirtableStatus] = useState<'loading' | 'success' | 'error' | null>(null);

  // Test Airtable connection
  useEffect(() => {
    const testAirtableConnection = async () => {
      try {
        setAirtableStatus('loading');
        
        // Make a simple fetch request to the Airtable API
        const response = await fetch('/api/check-airtable-access');
        const data = await response.json();
        
        if (data.success) {
          setAirtableStatus('success');
        } else {
          setAirtableStatus('error');
        }
      } catch (error) {
        setAirtableStatus('error');
      }
    };
    
    testAirtableConnection();
  }, []);

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

  return (
    <section id="referral" className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Referral Program
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Earn rewards by referring candidates and companies to Zitruus
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Candidate Referral Card */}
          <motion.div
            variants={itemVariants}
            className="bg-dark-300 rounded-xl p-8 border border-gray-800 hover:border-brand-lime transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-brand-lime/10 rounded-full mb-6 mx-auto">
              <Users className="h-8 w-8 text-brand-lime" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Candidate Referral</h3>
            <p className="text-gray-400 mb-6 text-center">
              Earn $1,000 USD for each successful candidate hire. No limit on referrals!
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Receive payment after candidate completes 90 days</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Unlimited earning potential with multiple referrals</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Quick and easy referral process</span>
              </li>
            </ul>
            <button
              onClick={() => setIsCandidateFormOpen(true)}
              className="w-full px-6 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
            >
              Refer a Candidate
            </button>
          </motion.div>

          {/* Company Referral Card */}
          <motion.div
            variants={itemVariants}
            className="bg-dark-300 rounded-xl p-8 border border-gray-800 hover:border-brand-lime transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-brand-lime/10 rounded-full mb-6 mx-auto">
              <Building className="h-8 w-8 text-brand-lime" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4 text-center">Company Referral</h3>
            <p className="text-gray-400 mb-6 text-center">
              Earn 20% commission on the first 3 months of the deal size after taxes.
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Significant earning potential for larger deals</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Commission paid monthly as the client pays</span>
              </li>
              <li className="flex items-start">
                <DollarSign className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                <span className="text-gray-300">Ongoing partnership opportunities</span>
              </li>
            </ul>
            <button
              onClick={() => setIsCompanyFormOpen(true)}
              className="w-full px-6 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
            >
              Refer a Company
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <Link href="/referral-program" className="text-brand-lime hover:text-brand-lime/80 transition-colors duration-200">
            Learn more about our Referral Program →
          </Link>
        </motion.div>
      </div>

      {/* Referral Forms */}
      <CandidateReferralForm isOpen={isCandidateFormOpen} onClose={() => setIsCandidateFormOpen(false)} />
      <CompanyReferralForm isOpen={isCompanyFormOpen} onClose={() => setIsCompanyFormOpen(false)} />
    </section>
  );
} 