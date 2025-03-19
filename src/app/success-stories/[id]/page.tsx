'use client';

import React from 'react';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';

// Define the case study data structure
interface CaseStudy {
  id: string;
  title: string;
  company: string;
  industry: string;
  location: string;
  challenge: string;
  solution: string;
  results: {
    metric: string;
    value: string;
  }[];
  testimonial: {
    quote: string;
    author: string;
    position: string;
  };
  timeline: string;
  technologies: string[];
  imageUrl: string;
}

// Sample case study data (you can replace this with dynamic data fetching)
const caseStudy: CaseStudy = {
  id: '1',
  title: 'Scaling Engineering Team with Top LATAM Talent',
  company: 'TechCorp Inc.',
  industry: 'SaaS / FinTech',
  location: 'United States',
  challenge: 'TechCorp was struggling to scale their engineering team quickly while maintaining quality and managing costs. They needed to hire 10 senior developers within 3 months but faced challenges with local talent scarcity and high salary demands.',
  solution: 'Zitruus provided a tailored talent acquisition strategy, leveraging our extensive network of pre-vetted LATAM developers. We implemented a rigorous screening process, ensuring cultural fit and technical excellence.',
  results: [
    { metric: 'Cost Savings', value: '45%' },
    { metric: 'Time-to-Hire', value: '2 weeks' },
    { metric: 'Retention Rate', value: '95%' },
    { metric: 'Team Satisfaction', value: '4.8/5' }
  ],
  testimonial: {
    quote: 'Zitruus transformed our hiring process. We found exceptional talent that integrated seamlessly with our team, and the cost savings allowed us to scale faster than expected.',
    author: 'Sarah Johnson',
    position: 'CTO at TechCorp Inc.'
  },
  timeline: '3 months',
  technologies: ['React', 'Node.js', 'Python', 'AWS'],
  imageUrl: '/assets/case-studies/techcorp.svg'
};

const metadata = {
  title: `${caseStudy.company} Success Story - Zitruus Case Study`,
  description: `Learn how ${caseStudy.company} achieved ${caseStudy.results[0].value} ${caseStudy.results[0].metric} and ${caseStudy.results[1].value} ${caseStudy.results[1].metric} by partnering with Zitruus for LATAM talent acquisition.`,
  keywords: ['LATAM talent', 'engineering team', 'talent acquisition', 'remote hiring', 'tech recruitment'],
};

export default function CaseStudy() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
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
        <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-12"
          >
            {/* Header */}
            <motion.header variants={itemVariants} className="text-center">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">{caseStudy.title}</h1>
              <div className="flex flex-wrap justify-center gap-4 text-gray-400">
                <span>{caseStudy.company}</span>
                <span>•</span>
                <span>{caseStudy.industry}</span>
                <span>•</span>
                <span>{caseStudy.location}</span>
              </div>
            </motion.header>

            {/* Key Results */}
            <motion.section variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {caseStudy.results.map((result, index) => (
                <div key={index} className="bg-dark-300 rounded-lg p-6 text-center">
                  <div className="text-3xl font-bold text-brand-lime mb-2">{result.value}</div>
                  <div className="text-gray-400">{result.metric}</div>
                </div>
              ))}
            </motion.section>

            {/* Challenge & Solution */}
            <motion.section variants={itemVariants} className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                <p className="text-gray-400">{caseStudy.challenge}</p>
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-4">Our Solution</h2>
                <p className="text-gray-400">{caseStudy.solution}</p>
              </div>
            </motion.section>

            {/* Technologies Used */}
            <motion.section variants={itemVariants}>
              <h2 className="text-2xl font-bold text-white mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-3">
                {caseStudy.technologies.map((tech, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-dark-300 text-gray-300 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.section>

            {/* Testimonial */}
            <motion.section variants={itemVariants} className="bg-dark-300 rounded-lg p-8">
              <blockquote className="text-xl text-gray-300 italic mb-4">
                "{caseStudy.testimonial.quote}"
              </blockquote>
              <div className="text-brand-lime">
                <div className="font-medium">{caseStudy.testimonial.author}</div>
                <div className="text-sm">{caseStudy.testimonial.position}</div>
              </div>
            </motion.section>

            {/* CTA */}
            <motion.section variants={itemVariants} className="text-center">
              <Link
                href="/contact"
                className="inline-block px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
              >
                Start Your Success Story
              </Link>
            </motion.section>
          </motion.div>
        </article>
      </main>
      <Footer />
    </>
  );
} 