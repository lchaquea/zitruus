'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronRight, Quote } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

// Success story type definition
export interface SuccessStory {
  id: number;
  company: string;
  logo?: string;
  industry: string;
  challenge: string;
  solution: string;
  results: string[];
  testimonial: {
    quote: string;
    author: string;
    title: string;
    image?: string;
  };
  featured: boolean;
}

// Sample success stories data
export const successStories: SuccessStory[] = [
  {
    id: 1,
    company: "Filta",
    logo: "/assets/logos/filta.png",
    industry: "Financial Technology",
    challenge: "Needed to establish a cost-effective and compliant nearshore operation in Colombia, but navigating payroll, local regulations, and HR complexities posed significant challenges.",
    solution: "Zitruus provided a comprehensive nearshore solution, establishing a Colombia hub that aligned with Filta's culture and quality standards while offering significant cost advantages.",
    results: [
      "Built a Colombia hub with +45 employees in under 1.5 years",
      "Reduced soft-landing costs for Filta's expansion by ~60%",
      "Set up the support team for Filta's operations and benefits for LATAM team in less than 1 month"
    ],
    testimonial: {
      quote: "Joining Filta through Zitruus was effortless. Everything—contracts, benefits, and onboarding—was handled smoothly, so I could focus on my role from day one.",
      author: "Juan",
      title: "Ops Lead at Filta",
      image: "/assets/images/team-3.svg"
    },
    featured: true
  }
];

interface SuccessStoryCardProps {
  story: SuccessStory;
  variant?: 'compact' | 'full' | 'testimonial' | 'featured';
  className?: string;
  showLink?: boolean;
}

const SuccessStoryCard: React.FC<SuccessStoryCardProps> = ({ 
  story, 
  variant = 'full',
  className = '',
  showLink = true
}) => {
  if (variant === 'testimonial') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`bg-dark-300 rounded-xl p-6 border border-gray-800 ${className}`}
      >
        <div className="flex items-start gap-4 mb-4">
          <div className="text-brand-lime">
            <Quote size={24} />
          </div>
          <p className="text-gray-300 italic">{story.testimonial.quote}</p>
        </div>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-white font-medium">{story.testimonial.author}</p>
            <p className="text-gray-400 text-sm">{story.testimonial.title}</p>
          </div>
          <div className="text-sm text-brand-lime">{story.company}</div>
        </div>
        {showLink && (
          <div className="mt-4">
            <Link 
              href={`/success-stories/${story.id}`}
              className="text-brand-lime text-sm flex items-center hover:underline"
            >
              Read full story <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        )}
      </motion.div>
    );
  }

  if (variant === 'compact') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className={`bg-dark-300 rounded-xl p-6 border border-gray-800 hover:border-brand-lime transition-all duration-300 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">{story.company}</h3>
          <p className="text-brand-lime text-sm">{story.industry}</p>
        </div>
        <p className="text-gray-400 text-sm mb-4">{story.challenge}</p>
        {showLink && (
          <div className="flex justify-end">
            <Link 
              href={`/success-stories/${story.id}`}
              className="text-brand-lime text-sm flex items-center hover:underline"
            >
              Read more <ChevronRight size={16} className="ml-1" />
            </Link>
          </div>
        )}
      </motion.div>
    );
  }

  if (variant === 'featured') {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className={`bg-dark-300/50 backdrop-blur-sm rounded-xl border border-gray-800 ${className}`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-8 md:p-12">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-xl overflow-hidden">
              <Image
                src={story.testimonial.image || "/assets/images/success-story.svg"}
                alt={`${story.company} Success Story`}
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="text-brand-lime" fill="#E1F473" />
              <span className="text-brand-lime font-medium">Success Story</span>
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-4">
              {story.company}: {story.challenge}
            </h3>
            
            <div className="mb-6">
              <h4 className="text-white font-medium mb-2">Results:</h4>
              <ul className="text-gray-400 text-sm space-y-1">
                {story.results.map((result, index) => (
                  <li key={index} className="flex items-start">
                    <ChevronRight size={16} className="text-brand-lime mr-1 mt-0.5 flex-shrink-0" />
                    <span>{result}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mb-6">
              <div className="flex items-start gap-2">
                <Quote size={24} className="text-brand-lime flex-shrink-0" />
                <p className="text-gray-400 italic">
                  {story.testimonial.quote}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden relative">
                  <Image
                    src={story.testimonial.image || "/assets/images/team-3.svg"}
                    alt={story.testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div>
                <div className="font-medium text-white">{story.testimonial.author}</div>
                <div className="text-gray-400">{story.testimonial.title}</div>
              </div>
            </div>
            
            {showLink && (
              <div className="mt-6">
                <Link 
                  href="/success-stories"
                  className="inline-flex items-center text-brand-lime hover:underline"
                >
                  View more success stories <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </motion.div>
    );
  }

  // Full variant (default)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`bg-dark-300 rounded-xl overflow-hidden border border-gray-800 hover:border-brand-lime transition-all duration-300 ${className}`}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center">
            <div className="text-xl font-bold text-brand-lime">{story.company.substring(0, 2)}</div>
          </div>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={16} className="text-brand-lime" fill="#E1F473" />
            ))}
          </div>
        </div>
        
        <h3 className="text-xl font-bold text-white mb-2">{story.company}</h3>
        <p className="text-brand-lime text-sm mb-4">{story.industry}</p>
        
        <div className="mb-6">
          <h4 className="text-white font-medium mb-2">Challenge:</h4>
          <p className="text-gray-400 text-sm">{story.challenge}</p>
        </div>
        
        <div className="mb-6">
          <h4 className="text-white font-medium mb-2">Results:</h4>
          <ul className="text-gray-400 text-sm space-y-1">
            {story.results.map((result, index) => (
              <li key={index} className="flex items-start">
                <ChevronRight size={16} className="text-brand-lime mr-1 mt-0.5 flex-shrink-0" />
                <span>{result}</span>
              </li>
            ))}
          </ul>
        </div>
        
        {showLink && (
          <Link 
            href={`/success-stories/${story.id}`}
            className="inline-block px-4 py-2 bg-brand-lime text-black font-medium rounded-lg text-sm transition-all duration-300 hover:scale-105"
          >
            View Full Case Study
          </Link>
        )}
      </div>
    </motion.div>
  );
};

export default SuccessStoryCard; 