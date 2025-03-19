'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Users, Building, DollarSign, CheckCircle } from 'lucide-react';
import CandidateReferralForm from '../components/CandidateReferralForm';
import CompanyReferralForm from '../components/CompanyReferralForm';

// Structured data for the referral program
const referralProgramSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus Referral Program",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Join the Zitruus Referral Program and earn rewards for referring candidates and companies. Help connect top LATAM talent with US companies.",
  "offers": {
    "@type": "Offer",
    "description": "Earn rewards for successful referrals"
  },
  "serviceType": "Referral Program"
};

export default function ReferralProgram() {
  const [isCandidateFormOpen, setIsCandidateFormOpen] = React.useState(false);
  const [isCompanyFormOpen, setIsCompanyFormOpen] = React.useState(false);

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
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(referralProgramSchema) }}
        />
        
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Zitruus Referral Program
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Earn rewards by referring top talent and companies to Zitruus. Our referral program is designed to benefit everyone involved.
              </motion.p>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20"
            >
              {/* Candidate Referral Card */}
              <motion.div
                variants={itemVariants}
                className="bg-dark-300 rounded-xl p-8 border border-gray-800 hover:border-brand-lime transition-all duration-300"
              >
                <div className="flex items-center justify-center w-20 h-20 bg-brand-lime/10 rounded-full mb-8 mx-auto">
                  <Users className="h-10 w-10 text-brand-lime" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Candidate Referral</h2>
                <p className="text-gray-400 mb-8 text-center">
                  Earn $1,000 USD for each successful candidate hire. No limit on referrals!
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-dark-400 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-lime text-black font-bold mr-3 flex-shrink-0">1</span>
                        <span className="text-gray-300">Submit your candidate's information through our referral form</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-lime text-black font-bold mr-3 flex-shrink-0">2</span>
                        <span className="text-gray-300">Our team reviews the candidate and reaches out if they're a good fit</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-lime text-black font-bold mr-3 flex-shrink-0">3</span>
                        <span className="text-gray-300">If the candidate is hired and completes 90 days, you receive $1,000 USD</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-dark-400 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Eligibility Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Candidate must not already be in our database</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Candidate must be hired through Zitruus</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Candidate must complete 90 days of employment</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
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
                <div className="flex items-center justify-center w-20 h-20 bg-brand-lime/10 rounded-full mb-8 mx-auto">
                  <Building className="h-10 w-10 text-brand-lime" />
                </div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Company Referral</h2>
                <p className="text-gray-400 mb-8 text-center">
                  Earn 20% commission on the first 3 months of the deal size after taxes.
                </p>
                
                <div className="space-y-6 mb-8">
                  <div className="bg-dark-400 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">How It Works</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-lime text-black font-bold mr-3 flex-shrink-0">1</span>
                        <span className="text-gray-300">Submit company and point of contact information</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-lime text-black font-bold mr-3 flex-shrink-0">2</span>
                        <span className="text-gray-300">Our team contacts the company and discusses their hiring needs</span>
                      </li>
                      <li className="flex items-start">
                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-brand-lime text-black font-bold mr-3 flex-shrink-0">3</span>
                        <span className="text-gray-300">If the company signs up, you earn 20% commission on the first 3 months</span>
                      </li>
                    </ol>
                  </div>
                  
                  <div className="bg-dark-400 rounded-lg p-6">
                    <h3 className="text-xl font-semibold text-white mb-4">Eligibility Requirements</h3>
                    <ul className="space-y-3">
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Company must not already be in our client database</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Company must sign a contract with Zitruus</span>
                      </li>
                      <li className="flex items-start">
                        <CheckCircle className="h-5 w-5 text-brand-lime mr-2 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">Commission is paid monthly as the client pays</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
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
              animate="visible"
              className="bg-dark-300 rounded-xl p-8 border border-gray-800 max-w-3xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-brand-lime mb-2">How and when will I get paid?</h3>
                  <p className="text-gray-400">
                    For candidate referrals, payment is made after the candidate completes 90 days of employment. For company referrals, commission is paid monthly as the client pays Zitruus, for the first 3 months of the contract.
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-brand-lime mb-2">Is there a limit to how many referrals I can make?</h3>
                  <p className="text-gray-400">
                    No, there is no limit to the number of candidates or companies you can refer. The more successful referrals you make, the more you earn!
                  </p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-brand-lime mb-2">What happens if my referral doesn't work out?</h3>
                  <p className="text-gray-400">
                    If a referred candidate leaves before 90 days or if a referred company doesn't sign a contract, no payment will be made. However, you're welcome to refer other candidates and companies.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Referral Forms */}
      <CandidateReferralForm isOpen={isCandidateFormOpen} onClose={() => setIsCandidateFormOpen(false)} />
      <CompanyReferralForm isOpen={isCompanyFormOpen} onClose={() => setIsCompanyFormOpen(false)} />
    </>
  );
} 