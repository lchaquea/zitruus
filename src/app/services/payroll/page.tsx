'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, CheckCircle, DollarSign, Shield, Clock, Globe, MessageCircle } from 'lucide-react';
import CalendlyLink from '../../components/CalendlyLink';
import TestimonialBubble from '../../components/TestimonialBubble';

// Service schema for structured data
const payrollServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus Payroll Services",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Compliant payroll services for LATAM teams, handling local regulations, tax requirements, and timely payments across Latin America.",
  "serviceType": "Payroll",
  "areaServed": [
    {
      "@type": "Country",
      "name": "Colombia"
    },
    {
      "@type": "Country",
      "name": "Mexico"
    },
    {
      "@type": "Country",
      "name": "Argentina"
    },
    {
      "@type": "Country",
      "name": "Brazil"
    }
  ],
  "offers": {
    "@type": "Offer",
    "description": "Hassle-free, compliant payroll processing across LATAM"
  }
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    imageSrc: "/assets/images/team-10.svg",
    name: "Juan F.",
    role: "Ops Lead",
    testimonial: "Zitruus has streamlined our payroll operations completely. Their expertise in local regulations ensures we're always compliant.",
    position: { top: '40%', left: '5%' }
  },
  {
    id: 2,
    imageSrc: "/assets/images/team-2.svg",
    name: "Natalia A.",
    role: "Paid Media Specialist",
    testimonial: "Managing international payroll used to be complex. Zitruus made it simple and worry-free for our entire team.",
    position: { top: '40%', left: '25%' }
  },
  {
    id: 3,
    imageSrc: "/assets/images/team-6.svg",
    name: "Nicolas G.",
    role: "Design Lead",
    testimonial: "The accuracy and timeliness of Zitruus's payroll services have been exceptional. Our team is always paid on time.",
    position: { top: '40%', left: '45%' }
  },
  {
    id: 4,
    imageSrc: "/assets/images/team-9.svg",
    name: "Laura V.",
    role: "Executive Assistant",
    testimonial: "Their payroll system handles all our complex compensation structures effortlessly. The reporting is clear and comprehensive.",
    position: { top: '40%', left: '65%' }
  },
  {
    id: 5,
    imageSrc: "/assets/images/team-5.svg",
    name: "Carlos M.",
    role: "Full Stack Developer",
    testimonial: "As a developer working remotely, I appreciate how Zitruus handles all the payroll complexities. I get paid accurately and on time, every time.",
    position: { top: '40%', left: '85%' }
  }
];

// FAQ data
const faqs = [
  {
    question: "How does Zitruus handle payroll across different LATAM countries?",
    answer: "We have established payroll systems and expertise in each LATAM country where we operate. Our team manages all aspects of payroll processing, including currency conversions, tax calculations, and compliance with local regulations specific to each country."
  },
  {
    question: "What payroll frequency options do you support?",
    answer: "We support various payroll frequencies including monthly, bi-weekly, and weekly, depending on local regulations and your company's preferences. We'll work with you to establish the optimal payroll schedule for your team."
  },
  {
    question: "How do you ensure payroll compliance with local tax laws?",
    answer: "Our in-country payroll specialists stay current with all tax regulations and employment laws. We conduct regular compliance audits, maintain relationships with local authorities, and implement automated compliance checks in our payroll systems."
  },
  {
    question: "What kind of payroll reporting do you provide?",
    answer: "We provide comprehensive payroll reports including detailed breakdowns of payments, deductions, taxes, and benefits. Our customizable reporting dashboard gives you real-time visibility into payroll expenses across your LATAM operations."
  },
  {
    question: "How do you handle special payroll situations like bonuses or commissions?",
    answer: "Our flexible payroll system accommodates various compensation structures including bonuses, commissions, overtime, and other special payments. We ensure these are processed correctly according to local tax regulations."
  }
];

export default function PayrollPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(payrollServiceSchema) }}
        />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden bg-black">
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
                LATAM Payroll Services
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Compliant, accurate, and hassle-free payroll management
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                Our comprehensive payroll services ensure your LATAM team is paid accurately and on time, while maintaining full compliance with local tax regulations and labor laws.
              </motion.p>

              {/* Stats Section - Moved here */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">100%</div>
                  <div className="text-gray-400">Compliance Rate</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">99.9%</div>
                  <div className="text-gray-400">Payroll Accuracy</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">10+</div>
                  <div className="text-gray-400">LATAM Countries Covered</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Discuss Your Payroll Needs
                </CalendlyLink>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Payroll Services Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our Payroll Services
              </motion.h2>
              <div className="space-y-12">
                {[
                  {
                    title: "Comprehensive Payroll Processing",
                    description: "End-to-end management of your payroll cycle, from calculation to disbursement, ensuring accurate and timely payments to your LATAM team.",
                    icon: <DollarSign className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Tax Compliance Management",
                    description: "Expert handling of all tax obligations, including withholdings, declarations, and payments to local tax authorities across LATAM countries.",
                    icon: <Shield className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Benefits Administration",
                    description: "Management of employee benefits including healthcare, retirement plans, and other statutory benefits in accordance with local requirements.",
                    icon: <Clock className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Multi-Country Payroll Solutions",
                    description: "Unified payroll management across multiple LATAM countries, providing consistency while adhering to local regulations.",
                    icon: <Globe className="h-12 w-12 text-brand-lime" />
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-start gap-6"
                  >
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                      {service.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Key Benefits Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Key Benefits
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Risk Mitigation",
                    description: "Eliminate compliance risks associated with incorrect payroll processing and tax filings in LATAM countries."
                  },
                  {
                    title: "Time and Resource Savings",
                    description: "Free your internal team from complex payroll administration to focus on core business activities."
                  },
                  {
                    title: "Enhanced Accuracy",
                    description: "Reduce errors with our automated systems and expert review processes for payroll calculations."
                  },
                  {
                    title: "Local Expertise",
                    description: "Benefit from our deep understanding of LATAM payroll regulations and best practices."
                  },
                  {
                    title: "Scalability",
                    description: "Easily scale your payroll operations as your LATAM team grows, without additional administrative burden."
                  },
                  {
                    title: "Transparent Reporting",
                    description: "Gain clear visibility into payroll expenses with comprehensive reporting and analytics."
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800"
                  >
                    <div className="flex">
                      <CheckCircle className="text-brand-lime mr-3 flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                        <p className="text-gray-400">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-6 bg-black relative min-h-[280px]">
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-6"
              >
                What Our Workforce Says
              </motion.h2>
              
              <div className="relative min-h-[280px]">
                {testimonials.map((testimonial) => (
                  <div key={testimonial.id} className="absolute" style={{ ...testimonial.position }}>
                    <TestimonialBubble
                      imageSrc={testimonial.imageSrc}
                      name={testimonial.name}
                      role={testimonial.role}
                      testimonial={testimonial.testimonial}
                      label="Read more"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Our Payroll Process */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our Payroll Process
              </motion.h2>
              <div className="relative">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {[
                    {
                      step: 1,
                      title: "Data Collection",
                      description: "We gather all necessary payroll information including hours worked, bonuses, and deductions."
                    },
                    {
                      step: 2,
                      title: "Calculation",
                      description: "Our system processes payroll data, calculating gross pay, taxes, and net pay with precision."
                    },
                    {
                      step: 3,
                      title: "Verification",
                      description: "Our payroll specialists review calculations to ensure accuracy and compliance."
                    },
                    {
                      step: 4,
                      title: "Disbursement",
                      description: "We process payments to employees via their preferred payment methods."
                    },
                    {
                      step: 5,
                      title: "Reporting",
                      description: "We provide detailed payroll reports and handle all required tax filings."
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-zinc-900/50 p-6 rounded-lg border border-zinc-800 relative"
                    >
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-lime text-black w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-bold text-white mb-3 mt-4 text-center">{step.title}</h3>
                      <p className="text-gray-400 text-center text-sm">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
                {/* Connecting line for desktop */}
                <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-brand-lime/30 -translate-y-1/2 z-0"></div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section - Updated to have black background */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Frequently Asked Questions
              </motion.h2>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-black rounded-xl p-8 border border-zinc-800"
              >
                <div className="space-y-6">
                  {faqs.map((faq, index) => (
                    <div key={index}>
                      <h3 className="text-lg font-medium text-brand-lime mb-2">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Ready to Simplify Your LATAM Payroll?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss how our payroll services can reduce your administrative burden and ensure compliance.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Schedule a Consultation
                </CalendlyLink>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 