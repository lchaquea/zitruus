'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { ChevronLeft, Star, CheckCircle } from 'lucide-react';
import { successStories } from '../../components/SuccessStoryCard';

export default function FiltaSuccessStory() {
  const story = successStories.find(s => s.id === 1);
  
  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Story not found</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-black">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link 
              href="/success-stories" 
              className="inline-flex items-center text-brand-lime hover:underline"
            >
              <ChevronLeft size={16} className="mr-1" /> Back to all success stories
            </Link>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center mb-4">
                <Star className="text-brand-lime mr-2" />
                <h2 className="text-xl font-semibold text-brand-lime">Success Story</h2>
              </div>
              
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Scaling a Nearshore Hub in Colombia with Zitruus
              </h1>
              
              <div className="bg-dark-300 p-6 rounded-xl border border-gray-800 mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">Results:</h3>
                <ul className="space-y-3">
                  {story.results.map((result, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle className="text-brand-lime mr-2 flex-shrink-0 mt-1" size={18} />
                      <span className="text-gray-300">{result}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-white mb-4">The Challenge:</h3>
                <p className="text-gray-300 mb-6">
                  Needed to establish a cost-effective and compliant nearshore operation in Colombia, but navigating payroll, local regulations, and HR complexities posed significant challenges.
                </p>
                
                <h3 className="text-xl font-semibold text-white mb-4">Our Solution:</h3>
                <p className="text-gray-300">
                  {story.solution}
                </p>
              </div>
              
              <div className="bg-dark-300 p-6 rounded-xl border border-gray-800">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-brand-lime text-4xl font-serif">"</div>
                  <p className="text-gray-300 italic">
                    {story.testimonial.quote}
                  </p>
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full overflow-hidden relative">
                      <Image 
                        src={story.testimonial.image || "/assets/images/placeholder.svg"} 
                        alt={story.testimonial.author}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-white">{story.testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{story.testimonial.title}</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative"
            >
              <div className="sticky top-24">
                <div className="relative h-[500px] rounded-xl overflow-hidden mb-6">
                  <Image
                    src="/assets/images/team-3.svg"
                    alt="Juan from Filta"
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="bg-dark-300 p-6 rounded-xl border border-gray-800">
                  <h3 className="text-xl font-semibold text-white mb-4">Impact:</h3>
                  <p className="text-gray-300">
                    With Zitruus, Filta successfully scaled its Colombia hub, integrating skilled professionals into their team. Zitruus set up the support team for Filta's operations and benefits for the LATAM team in less than 1 month, demonstrating our expertise in supporting companies entering the LATAM market—offering a blueprint for seamless international hiring.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="text-center">
            <Link 
              href="/contact"
              className="inline-block px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
            >
              Start Your Success Story
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 