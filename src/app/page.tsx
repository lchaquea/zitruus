'use client';

import React, { useState, Suspense, lazy, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Clock, Award, Handshake } from 'lucide-react';
import CandidateRequestForm from './components/CandidateRequestForm';
import ResumePoolForm from './components/ResumePool';
import { useCalendly } from './hooks/useCalendly';
import TestimonialBubble from './components/TestimonialBubble';
import { testimonials } from './data/testimonials';
import CalendlyButton from './components/CalendlyButton';
import Loading from './loading';

// Structured data for the homepage
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": "https://zitruus.com/#website",
      "url": "https://zitruus.com/",
      "name": "Zitruus",
      "description": "Connect Top LATAM Talent with US Companies",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://zitruus.com/jobs?search={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": "https://zitruus.com/#organization",
      "name": "Zitruus",
      "url": "https://zitruus.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
      },
      "sameAs": [
        "https://www.linkedin.com/company/zitruus",
        "https://twitter.com/zitruus"
      ]
    }
  ]
};

// Lazy load components with loading states
const Navbar = lazy(() => import('./components/layout/Navbar'));
const HowItWorks = lazy(() => import('./components/sections/HowWeWork'));
const BestInClassResources = lazy(() => import('./components/sections/BestInClassResources'));
const Services = lazy(() => import('./components/sections/Services'));
const JobBoard = lazy(() => import('./components/sections/JobBoard'));
const FAQ = lazy(() => import('./components/sections/FAQ'));
const Referral = lazy(() => import('./components/sections/Referral'));
const Footer = lazy(() => import('./components/layout/Footer'));
const IndustryFocus = lazy(() => import('./components/sections/IndustryFocus'));
const HiringChallenges = lazy(() => import('./components/sections/HiringChallenges'));

export default function Home() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isResumePoolOpen, setIsResumePoolOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  // Harmonically distribute testimonials across sections
  const testimonialPairs = [
    // Hero Section
    [
      { ...testimonials[0], position: { top: '15%', left: '5%', position: 'absolute', zIndex: 50 } },
      { ...testimonials[1], position: { bottom: '30%', right: '5%', position: 'absolute', zIndex: 50 } },
    ],
    // How It Works Section
    [
      { ...testimonials[2], position: { top: '10%', left: '5%', position: 'absolute', zIndex: 50 } },
      { ...testimonials[3], position: { bottom: '10%', right: '5%', position: 'absolute', zIndex: 50 } },
    ],
    // Industry Focus First Pair
    [
      { ...testimonials[4], position: { top: '15%', left: '5%', position: 'absolute', zIndex: 50 } },
      { ...testimonials[5], position: { bottom: '15%', right: '5%', position: 'absolute', zIndex: 50 } },
    ],
    // Hiring Challenges Section
    [
      { ...testimonials[6], position: { top: '15%', left: '5%', position: 'absolute', zIndex: 999 } },
      { ...testimonials[7], position: { top: '85%', right: '25%', position: 'absolute', zIndex: 999 } },
    ],
    // Services Section
    [
      { ...testimonials[8], position: { top: '10%', left: '5%', position: 'absolute', zIndex: 999 } },
      { ...testimonials[9], position: { bottom: '10%', right: '5%', position: 'absolute', zIndex: 999 } },
    ],
    // Industry Focus Second Pair
    [
      { ...testimonials[10], position: { top: '45%', left: '5%', position: 'absolute', zIndex: 999 } },
      { ...testimonials[11], position: { bottom: '45%', right: '5%', position: 'absolute', zIndex: 999 } },
    ],
  ];
  
  return (
    <div suppressHydrationWarning>
      <Suspense fallback={<div className="h-20 bg-black animate-pulse" />}>
        <Navbar />
      </Suspense>

      <main className="bg-black">
        {/* Hero Section */}
        <section className="min-h-[85vh] flex items-center justify-center relative bg-black py-16 pt-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {testimonialPairs[0].map((testimonial, index) => (
              <div key={index} style={{
                ...testimonial.position,
                top: index === 0 ? '25%' : testimonial.position.top,
                bottom: index === 1 ? '20%' : testimonial.position.bottom,
                zIndex: 999
              }}>
                <TestimonialBubble
                  imageSrc={testimonial.imageSrc}
                  name={testimonial.name}
                  role={testimonial.role}
                  testimonial={testimonial.testimonial}
                  label="Hire with Zitruus"
                />
              </div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto mt-8"
            >
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.1] tracking-tight
                  bg-gradient-to-b from-[#FFB033] via-[#E08000] to-[#B85E00]
                  bg-clip-text text-transparent mb-6"
              >
                Top LATAM Talent.
                <br />
                Seamless Hiring.
                <br />
                Maximum Cost Savings.
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mt-6 text-lg sm:text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed"
              >
                We handle recruiting, HR, payroll, and performance so you can focus on growing your business.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <CalendlyButton
                  className="px-6 py-3 bg-brand-lime text-black text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                >
                  Book a Free Consultation
                </CalendlyButton>
                <button
                  onClick={() => setIsFormOpen(true)}
                  className="px-6 py-3 border-2 border-brand-lime text-brand-lime text-base font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.2)] hover:bg-brand-lime/10 transform-gpu"
                >
                  Request a Vetted Candidate
                </button>
              </motion.div>

              {/* Feature Boxes */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
              >
                <div className="relative p-6 rounded-xl border border-[#E1F473]/30 hover:border-[#E1F473] transition-colors duration-300 bg-gradient-to-b from-black to-dark-800/50">
                  <div className="text-[#E1F473] mb-4">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-lime mb-2">Use Your Time, Wisely</h3>
                  <p className="text-gray-300 text-sm">Get matched with pre-vetted candidates in 1-2 weeks, not months with unsuccessful processes and lost efforts.</p>
                </div>

                <div className="relative p-6 rounded-xl border border-[#E1F473]/30 hover:border-[#E1F473] transition-colors duration-300 bg-gradient-to-b from-black to-dark-800/50">
                  <div className="text-[#E1F473] mb-4">
                    <Award className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-lime mb-2">Elite Talent, No Trade-Offs</h3>
                  <p className="text-gray-300 text-sm">Access the top 5% of LATAM talent, rigorously vetted and increase cost savings without giving up quality.</p>
                </div>

                <div className="relative p-6 rounded-xl border border-[#E1F473]/30 hover:border-[#E1F473] transition-colors duration-300 bg-gradient-to-b from-black to-dark-800/50">
                  <div className="text-[#E1F473] mb-4">
                    <Handshake className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-semibold text-brand-lime mb-2">Partner, Not Provider</h3>
                  <p className="text-gray-300 text-sm">We handle everything from payroll to performance tracking. We foster your growth.</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <div className="space-y-20">
          <Suspense fallback={<Loading />}>
            <HiringChallenges testimonials={testimonialPairs[3]} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <HowItWorks testimonials={testimonialPairs[1]} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <BestInClassResources />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <Services testimonials={testimonialPairs[4]} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <IndustryFocus testimonials={[
              // Keep only the top pair
              { ...testimonials[4], position: { top: '15%', left: '5%', position: 'absolute', zIndex: 999 } },
              { ...testimonials[5], position: { bottom: '15%', right: '5%', position: 'absolute', zIndex: 999 } },
            ]} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <JobBoard testimonials={[
              // Add the middle pair from Industry Focus, positioned above search bar
              { ...testimonials[10], position: { top: '-5%', left: '5%', position: 'absolute', zIndex: 999 } },
              { ...testimonials[11], position: { top: '-5%', right: '5%', position: 'absolute', zIndex: 999 } },
            ]} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <FAQ />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <Referral />
          </Suspense>
        </div>
      </main>

      <Suspense fallback={<div className="h-40 bg-black animate-pulse" />}>
        <Footer />
      </Suspense>

      <CandidateRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
      <ResumePoolForm isOpen={isResumePoolOpen} onClose={() => setIsResumePoolOpen(false)} />
    </div>
  );
} 