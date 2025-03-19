'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, CheckCircle, Shield, Globe, Clock, FileText, MessageCircle } from 'lucide-react';
import CalendlyLink from '../../components/CalendlyLink';
import TestimonialBubble from '../../components/TestimonialBubble';

// Structured data for the EOR service
const eorServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus Employer of Record Services",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Employer of Record services for hiring in Latin America without establishing a legal entity, ensuring full compliance with local employment laws and regulations.",
  "serviceType": "Employer of Record",
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
    "description": "Compliant hiring without establishing a legal entity"
  }
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    imageSrc: "/assets/images/team-10.svg",
    name: "Juan F.",
    role: "Ops Lead",
    testimonial: "Zitruus's EoR services made our expansion into LATAM seamless. They handled all the complexities of local employment laws.",
    position: { top: '40%', left: '5%' }
  },
  {
    id: 2,
    imageSrc: "/assets/images/team-2.svg",
    name: "Natalia A.",
    role: "Paid Media Specialist",
    testimonial: "Working with Zitruus as our EoR partner has transformed our hiring process. They've simplified international employment while ensuring compliance.",
    position: { top: '40%', left: '25%' }
  },
  {
    id: 3,
    imageSrc: "/assets/images/team-6.svg",
    name: "Nicolas G.",
    role: "Design Lead",
    testimonial: "Zitruus's EoR solution helped us build our team quickly and compliantly. Their local expertise has been invaluable.",
    position: { top: '40%', left: '45%' }
  },
  {
    id: 4,
    imageSrc: "/assets/images/team-9.svg",
    name: "Laura V.",
    role: "Executive Assistant",
    testimonial: "The EoR services have streamlined our international hiring. We can now onboard talent across LATAM without any legal complications.",
    position: { top: '40%', left: '65%' }
  },
  {
    id: 5,
    imageSrc: "/assets/images/team-5.svg",
    name: "Carlos M.",
    role: "Full Stack Developer",
    testimonial: "As an employee hired through Zitruus's EoR services, I've had a smooth experience with all employment matters handled professionally.",
    position: { top: '40%', left: '85%' }
  }
];

// FAQ data
const faqs = [
  {
    question: "What exactly is an Employer of Record (EoR) service?",
    answer: "An Employer of Record (EoR) is a service that allows companies to legally hire employees in countries where they don't have a legal entity. The EoR becomes the official employer on paper, handling all legal compliance, payroll, benefits, and HR administration while you maintain day-to-day management of the employees."
  },
  {
    question: "How quickly can Zitruus help us hire through your EoR service?",
    answer: "We can typically onboard new employees through our EoR service within 1-2 weeks, depending on the country and specific requirements. This is significantly faster than establishing your own legal entity, which can take months."
  },
  {
    question: "In which LATAM countries do you offer EoR services?",
    answer: "We currently offer EoR services in Argentina, Colombia, Mexico, with plans to expand to additional countries. If you need to hire in a specific country not listed, please contact us to discuss options."
  },
  {
    question: "What employment benefits do you provide through your EoR service?",
    answer: "We provide all statutory benefits required by local laws, including healthcare, paid time off, and retirement contributions. We can also administer additional benefits you wish to offer, such as supplemental health insurance, wellness programs, and professional development allowances."
  },
  {
    question: "How does the pricing work for your EoR service?",
    answer: "Our EoR service is typically priced as a percentage of the employee's salary or a flat monthly fee per employee. The exact pricing depends on the country, number of employees, and specific services required. We provide transparent pricing with no hidden fees."
  }
];

export default function EoRPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(eorServiceSchema) }}
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
                Employer of Record (EoR)
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Hire in LATAM without establishing a legal entity
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                Our Employer of Record service enables you to quickly and compliantly hire talent across Latin America without the complexity and cost of setting up local entities.
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
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">3+</div>
                  <div className="text-gray-400">LATAM Countries Covered</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">1-2</div>
                  <div className="text-gray-400">Weeks to Hire</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">100%</div>
                  <div className="text-gray-400">Compliance Rate</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Discuss Your Hiring Needs
                </CalendlyLink>
              </motion.div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                How Our EoR Service Works
              </motion.h2>
              <div className="space-y-12">
                {[
                  {
                    title: "You Find the Talent",
                    description: "Identify the perfect candidates for your team, either through your own recruitment efforts or with our talent acquisition support.",
                    icon: <Shield className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "We Handle the Legal Employment",
                    description: "We become the legal employer of record, managing all employment contracts, compliance, and local regulations.",
                    icon: <FileText className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "We Manage Payroll & Benefits",
                    description: "We handle all aspects of payroll processing, tax withholding, and benefits administration in full compliance with local laws.",
                    icon: <Globe className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "You Manage Day-to-Day Work",
                    description: "You maintain full control over the employee's daily responsibilities, projects, and professional development.",
                    icon: <Clock className="h-12 w-12 text-brand-lime" />
                  }
                ].map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex flex-col md:flex-row items-start gap-6"
                  >
                    <div className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800">
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                      <p className="text-gray-400">{step.description}</p>
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
                    title: "Speed to Market",
                    description: "Hire talent in LATAM countries within days instead of months required to establish a legal entity."
                  },
                  {
                    title: "Cost Efficiency",
                    description: "Eliminate the significant expenses associated with setting up and maintaining foreign subsidiaries."
                  },
                  {
                    title: "Risk Mitigation",
                    description: "Avoid compliance risks with our expertise in local employment laws, tax regulations, and labor requirements."
                  },
                  {
                    title: "Flexibility",
                    description: "Test new markets or scale your team without long-term commitments or complex legal structures."
                  },
                  {
                    title: "Full Compliance",
                    description: "Ensure all employment practices adhere to local regulations, reducing legal and financial risks."
                  },
                  {
                    title: "Focus on Core Business",
                    description: "Concentrate on your business goals while we handle the administrative complexities of international employment."
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

        {/* Countries We Cover */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                LATAM Countries We Cover
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  "Colombia",
                  "México",
                  "Argentina"
                ].map((country, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 hover:border-brand-lime transition-all duration-300 text-center"
                  >
                    <span className="text-white">{country}</span>
                  </motion.div>
                ))}
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-400 text-center mt-8"
              >
                Need to hire in another country? Contact us to discuss your specific requirements.
              </motion.p>
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
                Ready to Hire in LATAM Without the Complexity?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss how our Employer of Record service can help you quickly and compliantly build your LATAM team.
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