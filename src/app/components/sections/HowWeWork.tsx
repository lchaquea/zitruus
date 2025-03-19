'use client';

// Testimonial bubbles removed for cleaner UI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { CheckCircle, Users, FileCheck, Rocket } from 'lucide-react';
import CandidateRequestForm from '../CandidateRequestForm';
import CalendlyLink from '../CalendlyLink';
import TestimonialBubble from '../TestimonialBubble';

interface HowItWorksProps {
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

const steps = [
  {
    title: 'Tell us your hiring needs',
    description: "Share your requirements and we'll find the perfect match from our pre-vetted talent pool.",
    icon: Users,
    color: 'text-brand-lime',
  },
  {
    title: 'We match you with top LATAM talent',
    description: 'Our rigorous vetting process ensures you get access to the top 5% of LATAM professionals.',
    icon: CheckCircle,
    color: 'text-brand-lime',
  },
  {
    title: 'You decide and we onboard',
    description: 'Enjoy our case-driven hiring process and select your ideal candidate, we\'ll handle contracts and onboarding—seamlessly.',
    icon: FileCheck,
    color: 'text-brand-lime',
  },
  {
    title: 'Start growing your business',
    description: 'Your new hire is onboarded and ready to contribute—naturally integrated into your team while driving growth.',
    icon: Rocket,
    color: 'text-brand-lime',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
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

export default function HowItWorks({ testimonials = [] }: HowItWorksProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="journey-to-better-hiring" className="py-24 bg-black relative overflow-visible">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Add testimonial bubbles */}
        {testimonials.map((testimonial, index) => (
          <div key={index} style={testimonial.position}>
            <TestimonialBubble
              imageSrc={testimonial.imageSrc}
              name={testimonial.name}
              role={testimonial.role}
              testimonial={testimonial.testimonial}
              label="Read more"
            />
          </div>
        ))}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-brand-lime mb-4"
          >
            Your Journey to Better Hiring
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-300 max-w-2xl mx-auto"
          >
            Get started with Zitruus in four simple steps
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.title}
                variants={itemVariants}
                className="relative p-6 rounded-xl bg-dark-800 border border-gray-800 hover:border-brand-lime transition-colors duration-300"
              >
                <div className="absolute -top-4 left-6 w-8 h-8 flex items-center justify-center rounded-full bg-black border border-gray-800">
                  <span className="text-brand-lime font-bold">{index + 1}</span>
                </div>
                <div className={`mb-4 ${step.color}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-brand-lime mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-300">{step.description}</p>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
              Request a Personalized Consultation
            </CalendlyLink>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 border border-brand-lime text-brand-lime font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.2)] hover:bg-brand-lime/10 transform-gpu"
            >
              Request a Vetted Candidate
            </button>
          </div>
        </motion.div>
      </div>

      {/* Candidate Request Form */}
      <CandidateRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
} 