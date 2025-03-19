'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, ShoppingCart, LineChart, MessageSquare, Palette, Rocket, UserCog, Globe2, Users, Building2, Code2, Briefcase, Wallet, ShoppingBag, Newspaper } from 'lucide-react';
import Image from 'next/image';
import FeaturedSuccessStory from '../FeaturedSuccessStory';
import CandidateRequestForm from '../CandidateRequestForm';
import { useCalendly } from '../../hooks/useCalendly';
import CalendlyButton from '../CalendlyButton';
import TestimonialBubble from '../TestimonialBubble';

const industries = [
  {
    title: 'Tech',
    icon: Code,
    roles: ['Software Development', 'IT Support', 'DevOps'],
    color: 'from-blue-500/20 to-blue-600/20',
    iconColor: 'text-blue-400'
  },
  {
    title: 'E-commerce',
    icon: ShoppingCart,
    roles: ['Operations', 'Customer Support', 'Marketing'],
    color: 'from-green-500/20 to-green-600/20',
    iconColor: 'text-green-400'
  },
  {
    title: 'Finance',
    icon: LineChart,
    roles: ['Bookkeeping', 'Accounting', 'Financial Analysis'],
    color: 'from-purple-500/20 to-purple-600/20',
    iconColor: 'text-purple-400'
  },
  {
    title: 'Communications & Media',
    icon: MessageSquare,
    roles: ['Content Creation', 'Marketing', 'Design'],
    color: 'from-orange-500/20 to-orange-600/20',
    iconColor: 'text-orange-400'
  },
  {
    title: 'Design Agencies',
    icon: Palette,
    roles: ['Graphic Design', 'UX/UI', 'Motion Graphics'],
    color: 'from-pink-500/20 to-pink-600/20',
    iconColor: 'text-pink-400'
  },
  {
    title: 'Executive Assistants',
    icon: UserCog,
    roles: ['General Back-Office', 'C-Level Assistance', 'HR & Admin'],
    color: 'from-teal-500/20 to-teal-600/20',
    iconColor: 'text-teal-400'
  }
];

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

interface IndustryFocusProps {
  testimonials?: Array<{
    imageSrc: string;
    name: string;
    role: string;
    testimonial: string;
    position: {
      top?: string;
      left?: string;
      right?: string;
      bottom?: string;
      position: string;
    };
  }>;
}

export default function IndustryFocus({ testimonials = [] }: IndustryFocusProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/5 to-transparent opacity-50"></div>
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-12 w-24 h-24 bg-brand-lime/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 -right-12 w-24 h-24 bg-brand-orange/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        {/* Add testimonial bubbles */}
        {testimonials.map((testimonial, index) => (
          <div key={index} style={{
            ...testimonial.position,
            zIndex: 30
          }}>
            <TestimonialBubble
              imageSrc={testimonial.imageSrc}
              name={testimonial.name}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
              label="Read more"
            />
          </div>
        ))}

        {/* Introduction Section */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-24 relative z-40"
        >
          <motion.div
            variants={itemVariants}
            className="inline-block mb-4"
          >
            <span className="bg-brand-lime/10 text-brand-lime px-4 py-2 rounded-full text-sm font-medium">
              Industry Expertise
            </span>
          </motion.div>
          
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-6"
          >
            Join the Top Companies that are Transforming their Industries{' '}
            <span className="text-brand-lime"></span>
          </motion.h2>
          
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto mb-12"
          >
            From startups to enterprises and family businesses, we help companies across various industries build high-performing teams with top LATAM talent.
          </motion.p>

          {/* Key Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                <span className="text-brand-lime">93</span>%
              </div>
              <p className="text-gray-400">Success rate in long-term placements</p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                <span className="text-brand-lime">7</span>+
              </div>
              <p className="text-gray-400">Industries served successfully</p>
            </motion.div>
            
            <motion.div
              variants={itemVariants}
              className="text-center"
            >
              <div className="text-4xl font-bold text-white mb-2">
                <span className="text-brand-lime">48</span>h
              </div>
              <p className="text-gray-400">Average time to your first consultancy</p>
            </motion.div>
          </div>
        </motion.div>

        {/* Industry Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
        >
          {industries.map((industry) => (
            <motion.div
              key={industry.title}
              variants={itemVariants}
              className="relative group"
            >
              <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${industry.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
              <div className="relative p-6 bg-dark-300/50 backdrop-blur-sm rounded-xl border border-gray-800 group-hover:border-gray-700 transition-all duration-300">
                <div className="flex items-center mb-4">
                  <div className={`p-3 rounded-lg bg-gray-800/50 ${industry.iconColor}`}>
                    <industry.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white ml-4">{industry.title}</h3>
                </div>
                <ul className="space-y-2">
                  {industry.roles.map((role) => (
                    <li key={role} className="text-gray-400 flex items-center">
                      <span className="w-2 h-2 rounded-full bg-brand-lime mr-2"></span>
                      {role}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Story */}
        <FeaturedSuccessStory 
          storyId={1} 
          variant="featured" 
          className="mb-16" 
          showTitle={true}
        />

        {/* Call to Action */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <motion.h3
            variants={itemVariants}
            className="text-2xl font-bold text-white mb-4"
          >
            Ready to Transform Your Team?
          </motion.h3>
          
          <motion.p
            variants={itemVariants}
            className="text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Join the companies that are transforming with Zitruus. Let's discuss how we can help you build your dream team.
          </motion.p>
          
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <CalendlyButton
              className="px-8 py-4 bg-brand-lime text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu"
            >
              Schedule a Call
            </CalendlyButton>
            <button 
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 border border-brand-lime text-brand-lime font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:bg-brand-lime/10 hover:shadow-[0_0_20px_rgba(225,244,115,0.2)] transform-gpu"
            >
              Submit a Candidate Request
            </button>
          </motion.div>
        </motion.div>
      </div>
      <CandidateRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
} 