'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import dynamic from 'next/dynamic';
import ResumePoolForm from '../components/ResumePool';

// Use dynamic import with no SSR to avoid hydration issues
const JobBoard = dynamic(() => import('../components/sections/JobBoard'), { ssr: false });

export default function Careers() {
  const [isResumePoolOpen, setIsResumePoolOpen] = useState(false);
  
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
        {/* Job Board Section */}
        <section>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <JobBoard />
          </div>
        </section>
        
        {/* Resume Pool CTA Section */}
        <section className="py-12 bg-black">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4 leading-[1.4]">
                Didn't Find Your <span className="text-brand-lime">Perfect Match</span>?
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto mb-8">
                Join our exclusive talent pool and be the first to know when new opportunities match your skills
              </p>
              <button
                onClick={() => setIsResumePoolOpen(true)}
                className="px-6 py-3 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
              >
                Submit Your Resume
              </button>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
      
      {/* Resume Pool Form Modal */}
      {isResumePoolOpen && (
        <ResumePoolForm 
          isOpen={isResumePoolOpen}
          onClose={() => setIsResumePoolOpen(false)} 
        />
      )}
    </>
  );
} 