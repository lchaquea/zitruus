'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar } from 'lucide-react';

export default function RecruitingPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E1F473]/10 to-transparent" />
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-5xl md:text-6xl font-bold text-white mb-6"
              >
                Tech Talent Recruiting
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Access Top LATAM Tech Professionals
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                Our specialized recruiting service connects you with exceptional Latin American tech talent. 
                We handle everything from sourcing and vetting to cultural alignment and technical assessment.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link
                  href="https://calendly.com/lucas-unno/zitruus-consultany-call"
                  target="_blank"
                  className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
              >
                <div className="text-4xl font-bold text-[#E1F473] mb-2">70%</div>
                <div className="text-gray-400">Cost Reduction</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
              >
                <div className="text-4xl font-bold text-[#E1F473] mb-2">2</div>
                <div className="text-gray-400">Weeks Average Placement</div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
              >
                <div className="text-4xl font-bold text-[#E1F473] mb-2">95%</div>
                <div className="text-gray-400">Success Rate</div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-20 bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our Recruiting Process
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Technical Assessment",
                    description: "Rigorous evaluation including live coding, system design, and practical assessments."
                  },
                  {
                    title: "Cultural Fit",
                    description: "Comprehensive assessment of soft skills and team compatibility."
                  },
                  {
                    title: "English Proficiency",
                    description: "Thorough evaluation of communication skills for seamless collaboration."
                  },
                  {
                    title: "Background Check",
                    description: "Detailed verification of work history, references, and credentials."
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-[#E1F473] transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-[#E1F473] mb-4">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Why Choose Our Recruiting Service
              </motion.h2>
              <div className="space-y-8">
                {[
                  {
                    title: "Pre-vetted Talent Pool",
                    description: "Access to thoroughly screened and tested tech professionals."
                  },
                  {
                    title: "Cost Efficiency",
                    description: "Significant reduction in hiring costs while maintaining quality."
                  },
                  {
                    title: "Fast Placement",
                    description: "Accelerated hiring process with our extensive network."
                  },
                  {
                    title: "Zero Risk",
                    description: "Full replacement guarantee if the candidate doesn't meet expectations."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 hover:border-[#E1F473] transition-all duration-300"
                  >
                    <h3 className="text-xl font-bold text-[#E1F473] mb-4">{benefit.title}</h3>
                    <p className="text-gray-400">{benefit.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-zinc-900/50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Ready to Build Your Dream Team?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss how we can help you find the perfect tech talent.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  href="https://calendly.com/lucas-unno/zitruus-consultany-call"
                  target="_blank"
                  className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Call
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 