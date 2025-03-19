'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CalendlyLink from '../../components/CalendlyLink';
import { Calendar } from 'lucide-react';
import { guides } from '../guidesData';

// Flag images for each country
const countryFlags = {
  Colombia: '/images/flags/colombia.svg',
  Mexico: '/images/flags/mexico.svg',
  Argentina: '/images/flags/argentina.svg'
};

export default function GuidePage() {
  const params = useParams();
  const slug = params.slug as string;
  
  // Find the guide that matches the slug
  const guide = guides.find(g => g.slug === slug);
  
  // Create structured data for the guide
  const guideSchema = guide ? {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": guide.title,
    "description": guide.metaDescription,
    "image": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png",
    "author": {
      "@type": "Organization",
      "name": "Zitruus"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zitruus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zitruus.com/guides/${guide.slug}`
    },
    "about": {
      "@type": "Thing",
      "name": guide.country
    }
  } : null;
  
  // If no guide is found, show a not found message
  if (!guide) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-black pt-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-white mb-6">Guide Not Found</h1>
              <p className="text-xl text-gray-400 mb-8">
                The guide you're looking for doesn't exist or has been moved.
              </p>
              <Link
                href="/guides"
                className="inline-block px-6 py-3 bg-brand-lime text-black font-medium rounded-lg"
              >
                Back to Guides
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        {/* Add JSON-LD structured data */}
        {guideSchema && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(guideSchema) }}
          />
        )}
        
        {/* Hero Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-8">
              <Link
                href="/guides"
                className="text-gray-400 hover:text-brand-lime transition-colors duration-200 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Back to Guides
              </Link>
            </div>
            
            <motion.div
              initial="hidden"
              animate="visible"
              className="text-center mb-16"
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4 bg-dark-300 flex items-center justify-center">
                  {countryFlags[guide.country] && (
                    <Image
                      src={countryFlags[guide.country]}
                      alt={guide.country}
                      width={36}
                      height={36}
                      className="object-cover"
                    />
                  )}
                </div>
                <h2 className="text-2xl font-semibold text-brand-lime">
                  Hire in {guide.country}
                </h2>
              </div>
              
              <motion.h1
                className="text-4xl sm:text-5xl font-bold text-white mb-6"
              >
                {guide.title}
              </motion.h1>
              
              <motion.p
                className="text-xl text-gray-400 max-w-3xl mx-auto"
              >
                {guide.excerpt}
              </motion.p>
              
              <motion.p
                className="text-sm text-gray-500 mt-6"
              >
                Last updated: {guide.lastUpdated}
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* Table of Contents */}
        <section className="py-8 border-t border-b border-gray-800 bg-dark-400">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-start">
              <h3 className="text-lg font-medium text-white mb-4 md:mb-0 md:mr-8 whitespace-nowrap">
                Table of Contents
              </h3>
              <ul className="flex flex-wrap gap-4">
                {guide.sections.map((section, index) => (
                  <li key={index}>
                    <a
                      href={`#${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-gray-400 hover:text-brand-lime transition-colors duration-200"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Guide Content */}
        <section className="py-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="space-y-16"
            >
              {guide.sections.map((section, index) => (
                <motion.div
                  key={index}
                  id={section.title.toLowerCase().replace(/\s+/g, '-')}
                  className="scroll-mt-32"
                >
                  <h2 className="text-3xl font-bold text-white mb-6 border-l-4 border-brand-lime pl-4">
                    {section.title}
                  </h2>
                  <div className="text-gray-300 mb-8 text-lg leading-relaxed">
                    {section.content}
                  </div>
                  
                  {section.subsections && section.subsections.length > 0 && (
                    <div className="space-y-8 mt-8">
                      {section.subsections.map((subsection, subIndex) => (
                        <div key={subIndex} className="bg-dark-300 border border-gray-800 rounded-xl p-6">
                          <h3 className="text-xl font-semibold text-brand-lime mb-4">
                            {subsection.title}
                          </h3>
                          <div className="text-gray-300 whitespace-pre-line">
                            {subsection.content}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-black">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-dark-300 border border-gray-800 rounded-xl p-8 md:p-12">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-3xl font-bold text-white mb-6">
                  Ready to hire in {guide.country}?
                </h2>
                <p className="text-xl text-gray-400 mb-8">
                  Our team of experts can guide you through the entire process, from finding the right talent to managing payroll and compliance.
                </p>
                <CalendlyLink
                  className="inline-block px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
                >
                  <Calendar className="w-5 h-5 mr-2 inline-block" />
                  Schedule a Consultation
                </CalendlyLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 