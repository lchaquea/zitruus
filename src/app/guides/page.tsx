'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CalendlyLink from '../components/CalendlyLink';
import { Calendar } from 'lucide-react';
import { guides } from './guidesData';

// Flag images for each country
const countryFlags = {
  Colombia: '/images/flags/colombia.svg',
  Mexico: '/images/flags/mexico.svg',
  Argentina: '/images/flags/argentina.svg'
};

// Structured data for guides collection
const guidesSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "LATAM Hiring Guides",
  "description": "Comprehensive guides for hiring and managing talent in Latin America",
  "publisher": {
    "@type": "Organization",
    "name": "Zitruus",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
    }
  },
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": guides.map((guide, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Article",
        "headline": guide.title,
        "description": guide.metaDescription,
        "author": {
          "@type": "Organization",
          "name": "Zitruus"
        },
        "publisher": {
          "@type": "Organization",
          "name": "Zitruus"
        },
        "url": `https://zitruus.com/guides/${guide.slug}`
      }
    }))
  }
};

export default function GuidesPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(guidesSchema) }}
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Hero Section */}
          <div className="mb-16">
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
                LATAM Hiring Guides
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Comprehensive resources for hiring and managing talent in Latin America
              </motion.p>
            </motion.div>
          </div>

          {/* Guides Grid */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {guides.map((guide, index) => (
              <motion.div
                key={guide.slug}
                variants={itemVariants}
                className="bg-dark-300 rounded-xl overflow-hidden border border-gray-800 hover:border-brand-lime transition-all duration-300 h-full flex flex-col"
              >
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <div className="w-8 h-8 mr-3 relative">
                      <Image
                        src={countryFlags[guide.country as keyof typeof countryFlags] || '/images/flags/default.svg'}
                        alt={guide.country}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-white">{guide.title}</h3>
                  </div>
                  <p className="text-gray-400 text-sm mb-6">{guide.excerpt}</p>
                  <div className="space-y-2 mb-6">
                    {guide.sections.slice(0, 3).map((section, idx) => (
                      <div key={idx} className="flex items-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-lime mr-2"></div>
                        <p className="text-sm text-gray-300">{section.title}</p>
                      </div>
                    ))}
                    {guide.sections.length > 3 && (
                      <p className="text-xs text-gray-500 pl-3">+ {guide.sections.length - 3} more sections</p>
                    )}
                  </div>
                </div>
                <div className="p-6 pt-0">
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex items-center px-4 py-2 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:bg-brand-lime/90"
                  >
                    Read Guide
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <div className="mt-20 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Need Personalized Guidance?</h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8">
              Our team of experts can help you navigate the complexities of hiring and managing talent in Latin America
            </p>
            <CalendlyLink className="inline-flex items-center px-6 py-3 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:bg-brand-lime/90">
              <Calendar className="w-5 h-5 mr-2" />
              Schedule a Consultation
            </CalendlyLink>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 