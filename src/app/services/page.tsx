'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Calendar, CheckCircle, ChevronRight, Users, Briefcase, DollarSign, BarChart2, Shield } from 'lucide-react';
import CalendlyLink from '../components/CalendlyLink';
import { useLanguage } from '../contexts/LanguageContext';

// FAQ data
const faqs = [
  {
    question: "How does Zitruus differ from traditional outsourcing companies?",
    answer: "Unlike traditional outsourcing companies, Zitruus functions as a true talent partner. We don't just provide staff; we integrate with your business goals, navigate growth alongside you, and offer comprehensive HR solutions tailored to your specific needs. Our 360° approach covers everything from recruitment to performance management, ensuring a seamless experience."
  },
  {
    question: "What cost savings can I expect when working with Zitruus?",
    answer: "Companies typically save 40-70% on talent costs when partnering with Zitruus. This includes not just salary savings, but also reduced overhead, lower recruitment costs, and elimination of compliance risks. Our transparent pricing model ensures you know exactly what you're paying for, with no hidden fees."
  },
  {
    question: "How does Zitruus ensure quality when recruiting in Latin America?",
    answer: "We maintain rigorous vetting processes including technical assessments, cultural fit evaluations, and English proficiency testing. Our local expertise in LATAM markets allows us to identify top performers, and our talent pool consists of pre-screened professionals with proven track records. We stand behind our placements with replacement guarantees."
  },
  {
    question: "What HR services does Zitruus handle beyond recruitment?",
    answer: "Our 360° HR approach includes complete employee lifecycle management: onboarding, cultural integration, ongoing HR support, payroll processing, benefits administration, performance management, and compliance handling. We serve as your full HR department in LATAM, allowing you to focus on your core business."
  },
  {
    question: "How quickly can Zitruus help us scale our team?",
    answer: "Most clients see their first qualified candidates within 1-2 weeks of engagement. Our established talent networks and local presence in LATAM markets allow for rapid scaling. We've helped companies grow from zero to 45+ employees in under 18 months while maintaining quality and cultural alignment."
  }
];

// Service schema for structured data
const servicesPageSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus Talent Solutions",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Comprehensive talent solutions including recruitment, HR management, payroll, and compliance for your LATAM team.",
  "serviceType": "Talent Services",
  "offers": {
    "@type": "Offer",
    "description": "Reduce costs while accessing top talent in Latin America"
  }
};

export default function ServicesPage() {
  const { t } = useLanguage();
  
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesPageSchema) }}
        />
        
        {/* Hero Section */}
        <section className="pt-32 pb-20 relative overflow-hidden">
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
                Your 360° Talent Partner
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Reduce costs while accessing top LATAM talent
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                We're not just a provider—we're your partner in growth. Zitruus offers comprehensive talent solutions that go beyond recruitment, handling the entire HR lifecycle for your LATAM team.
              </motion.p>
              
              {/* Service Cards moved directly below the intro text */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12 mb-12"
              >
                {[
                  {
                    title: "Recruitment",
                    description: "Find top LATAM tech talent pre-vetted for skills and cultural fit.",
                    icon: <Users className="h-8 w-8 text-brand-lime" />,
                    link: "/services/recruitment",
                    delay: 0
                  },
                  {
                    title: "HR Management",
                    description: "Complete employee lifecycle management and support.",
                    icon: <Briefcase className="h-8 w-8 text-brand-lime" />,
                    link: "/services/hr-management",
                    delay: 0.1
                  },
                  {
                    title: "Payroll",
                    description: "Hassle-free, compliant payroll processing across LATAM.",
                    icon: <DollarSign className="h-8 w-8 text-brand-lime" />,
                    link: "/services/payroll",
                    delay: 0.2
                  },
                  {
                    title: "Performance",
                    description: "Optimize team productivity and track meaningful metrics.",
                    icon: <BarChart2 className="h-8 w-8 text-brand-lime" />,
                    link: "/services/performance",
                    delay: 0.3
                  },
                  {
                    title: "Employer of Record",
                    description: "Compliant hiring without establishing a legal entity.",
                    icon: <Shield className="h-8 w-8 text-brand-lime" />,
                    link: "/services/eor",
                    delay: 0.4
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: service.delay }}
                    className="bg-black p-6 rounded-lg border border-zinc-800 hover:border-brand-lime transition-all duration-300"
                  >
                    <div className="mb-4">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                    <p className="text-gray-400 mb-4">{service.description}</p>
                    <Link 
                      href={service.link}
                      className="inline-flex items-center text-brand-lime hover:underline"
                    >
                      Learn more <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Consultation Call
                </CalendlyLink>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Why Choose Zitruus as Your Talent Partner
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Partner, Not Provider",
                    description: "We align with your business goals and navigate growth alongside you, not just provide staff."
                  },
                  {
                    title: "Cost Reduction",
                    description: "Save 40-70% on talent costs while maintaining or improving quality and performance."
                  },
                  {
                    title: "Complete HR Solution",
                    description: "From recruitment to performance management—we handle the entire employee lifecycle."
                  },
                  {
                    title: "LATAM Expertise",
                    description: "Deep understanding of local markets, cultures, and regulations across Latin America."
                  },
                  {
                    title: "Scalability",
                    description: "Quickly scale your team up or down based on your business needs without administrative burden."
                  },
                  {
                    title: "Risk Mitigation",
                    description: "We handle compliance, legal requirements, and local regulations so you don't have to."
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

        {/* FAQ Section - Updated to match referral program styling */}
        <section className="py-20 bg-zinc-900/50">
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
                className="bg-dark-300 rounded-xl p-8 border border-gray-800"
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
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white mb-6"
              >
                Ready to Transform Your Talent Strategy?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss how our 360° talent solutions can help you reduce costs and access top LATAM talent.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a Consultation Call
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