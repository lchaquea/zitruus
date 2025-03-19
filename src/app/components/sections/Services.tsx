'use client';

// Testimonial bubbles removed for cleaner UI
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { DollarSign, Clock, Shield, Users, Globe, BarChart } from 'lucide-react';
import CandidateRequestForm from '../CandidateRequestForm';
import CalendlyLink from '../CalendlyLink';
import TestimonialBubble from '../TestimonialBubble';

const services = [
  {
    title: '80% Cost Savings',
    description: 'Reduce your HR costs significantly while maintaining high performance.',
    icon: DollarSign,
    color: 'text-brand-lime',
  },
  {
    title: 'US Time Zone Alignment',
    description: 'Work with professionals in your time zone for seamless collaboration.',
    icon: Clock,
    color: 'text-brand-lime',
  },
  {
    title: 'Full HR & Legal Compliance',
    description: 'We handle all the paperwork, taxes, and legal requirements.',
    icon: Shield,
    color: 'text-brand-lime',
  },
  {
    title: 'Top 5% Talent',
    description: 'Access to pre-vetted professionals with proven track records.',
    icon: Users,
    color: 'text-brand-lime',
  },
  {
    title: 'Cultural Fit',
    description: 'LATAM professionals with excellent English and US business culture understanding.',
    icon: Globe,
    color: 'text-brand-lime',
  },
  {
    title: 'Performance Tracking',
    description: 'Regular performance reviews and KPI monitoring for optimal results.',
    icon: BarChart,
    color: 'text-brand-lime',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
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

interface ServicesProps {
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

export default function Services({ testimonials = [] }: ServicesProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section id="services" className="py-24 bg-black relative overflow-visible">
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
            Transform Your Hiring with Zitruus
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Get access to top LATAM talent with comprehensive HR support
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                variants={itemVariants}
                className="p-6 rounded-xl bg-dark-300 border border-gray-800 hover:border-primary-600 transition-all duration-300 hover:shadow-lg hover:shadow-primary-600/10"
                whileHover={{ y: -5 }}
              >
                <div className={`mb-4 ${service.color}`}>
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-400">{service.description}</p>
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
              Start Hiring Now
            </button>
          </div>
        </motion.div>
      </div>

      {/* Candidate Request Form */}
      <CandidateRequestForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </section>
  );
} 