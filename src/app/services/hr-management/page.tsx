'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, CheckCircle, Users, FileText, Shield, Clock, MessageCircle } from 'lucide-react';
import CalendlyLink from '../../components/CalendlyLink';
import TestimonialBubble from '../../components/TestimonialBubble';

// Service schema for structured data
const hrManagementServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus HR Management Services",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Comprehensive HR management services for your LATAM team, including onboarding, employee development, performance management, and more.",
  "serviceType": "HR Management",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "offers": {
    "@type": "Offer",
    "description": "Complete employee lifecycle management for your LATAM team"
  }
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    imageSrc: "/assets/images/team-10.svg",
    name: "Juan F.",
    role: "Ops Lead",
    testimonial: "Zitruus's HR management has transformed our team dynamics. Their support in employee development and engagement is outstanding.",
    position: { top: '40%', left: '5%' }
  },
  {
    id: 2,
    imageSrc: "/assets/images/team-2.svg",
    name: "Natalia A.",
    role: "Paid Media Specialist",
    testimonial: "The HR support we receive is exceptional. They've streamlined our processes and improved employee satisfaction significantly.",
    position: { top: '40%', left: '25%' }
  },
  {
    id: 3,
    imageSrc: "/assets/images/team-6.svg",
    name: "Nicolas G.",
    role: "Design Lead",
    testimonial: "Their HR team understands our needs perfectly. They've helped create a positive work environment that keeps our team motivated.",
    position: { top: '40%', left: '45%' }
  },
  {
    id: 4,
    imageSrc: "/assets/images/team-9.svg",
    name: "Laura V.",
    role: "Executive Assistant",
    testimonial: "The level of HR support and guidance has been invaluable. They truly understand how to manage and develop talent in LATAM.",
    position: { top: '40%', left: '65%' }
  },
  {
    id: 5,
    imageSrc: "/assets/images/team-5.svg",
    name: "Carlos M.",
    role: "Full Stack Developer",
    testimonial: "The HR team at Zitruus has made my onboarding and integration seamless. They're responsive, supportive, and truly care about employee well-being.",
    position: { top: '40%', left: '85%' }
  }
];

// FAQ data
const faqs = [
  {
    question: "What HR services does Zitruus provide?",
    answer: "Our comprehensive HR management includes employee onboarding, cultural integration, ongoing HR support, benefits administration, performance management, conflict resolution, and compliance handling across all LATAM countries."
  },
  {
    question: "How do you handle employee onboarding?",
    answer: "Our structured onboarding process includes documentation preparation, equipment setup, company introduction, cultural orientation, benefits enrollment, and regular check-ins during the first 90 days to ensure smooth integration."
  },
  {
    question: "Can you manage HR for employees across different LATAM countries?",
    answer: "Yes, we have expertise in HR regulations across Latin America. We can manage your workforce in multiple countries, ensuring compliance with local labor laws and providing consistent HR support regardless of location."
  },
  {
    question: "How do you handle employee relations and conflict resolution?",
    answer: "Our experienced HR professionals provide mediation services, conduct regular check-ins, and implement structured resolution processes. We focus on maintaining positive workplace relationships while addressing concerns promptly and fairly."
  },
  {
    question: "What kind of reporting do you provide on HR metrics?",
    answer: "We deliver comprehensive monthly reports covering employee satisfaction, retention rates, performance metrics, and compliance status. Our dashboard gives you real-time visibility into your LATAM team's HR health."
  }
];

export default function HRManagementPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(hrManagementServiceSchema) }}
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
                HR Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Comprehensive HR support for your LATAM team
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                We handle the entire employee lifecycle, from onboarding to ongoing support, ensuring your LATAM team members thrive while you focus on your core business.
              </motion.p>

              {/* Key Benefits - Moved here */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                {[
                  {
                    title: "Reduced Administrative Burden",
                    description: "We handle all HR paperwork, compliance, and day-to-day employee management so you can focus on your core business."
                  },
                  {
                    title: "Local Expertise",
                    description: "Our team understands LATAM cultures, regulations, and best practices to ensure your employees receive appropriate support."
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

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Discuss Your HR Needs
                </CalendlyLink>
              </motion.div>
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
                    title: "Reduced Administrative Burden",
                    description: "We handle all HR paperwork, compliance, and day-to-day employee management so you can focus on your core business."
                  },
                  {
                    title: "Local Expertise",
                    description: "Our team understands LATAM cultures, regulations, and best practices to ensure your employees receive appropriate support."
                  },
                  {
                    title: "Scalable HR Solutions",
                    description: "Whether you have 5 or 500 employees, our HR services scale with your needs without requiring additional internal resources."
                  },
                  {
                    title: "Risk Mitigation",
                    description: "We ensure compliance with local labor laws and regulations, reducing your legal and operational risks."
                  },
                  {
                    title: "Enhanced Employee Experience",
                    description: "Our dedicated HR professionals provide responsive support, improving satisfaction and retention."
                  },
                  {
                    title: "Comprehensive Reporting",
                    description: "Gain visibility into key HR metrics and employee performance through regular, detailed reporting."
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

        {/* Our HR Services Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our HR Management Services
              </motion.h2>
              <div className="space-y-12">
                {[
                  {
                    title: "Employee Onboarding",
                    description: "Comprehensive onboarding process that integrates new hires smoothly into your team, including documentation, equipment setup, and cultural orientation.",
                    icon: <Users className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Compliance Management",
                    description: "Ensuring all HR practices adhere to local labor laws and regulations across LATAM countries, minimizing legal risks.",
                    icon: <Shield className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Performance Management",
                    description: "Structured performance review processes, goal setting, and development planning to optimize your team's productivity.",
                    icon: <FileText className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Employee Relations",
                    description: "Ongoing support for workplace issues, conflict resolution, and maintaining positive team dynamics across cultural boundaries.",
                    icon: <Clock className="h-12 w-12 text-brand-lime" />
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

        {/* HR Process Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our HR Management Process
              </motion.h2>
              <div className="relative">
                {/* Process Steps */}
                <div className="border-l-2 border-brand-lime ml-6 md:ml-0 md:mx-auto md:max-w-3xl">
                  {[
                    {
                      title: "Initial Assessment",
                      description: "We analyze your current HR needs, team structure, and specific requirements to create a tailored HR management plan."
                    },
                    {
                      title: "Setup & Integration",
                      description: "We establish HR processes, documentation systems, and communication channels aligned with your company culture."
                    },
                    {
                      title: "Ongoing Management",
                      description: "Our team handles day-to-day HR operations, employee support, and compliance monitoring."
                    },
                    {
                      title: "Regular Reporting",
                      description: "We provide detailed reports on key HR metrics, employee performance, and recommendations for improvement."
                    },
                    {
                      title: "Continuous Optimization",
                      description: "We regularly review and refine HR processes to adapt to your changing business needs and team growth."
                    }
                  ].map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="relative mb-12 last:mb-0 ml-8 md:ml-0 md:grid md:grid-cols-2 md:gap-8"
                    >
                      <div className="absolute -left-10 mt-1.5 h-6 w-6 rounded-full bg-brand-lime flex items-center justify-center md:relative md:left-auto md:mt-0 md:justify-end md:pr-8">
                        <span className="text-black font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="md:text-right md:pr-8">
                        <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                      </div>
                      <div className="md:border-l-2 md:border-brand-lime/30 md:pl-8">
                        <p className="text-gray-400">{step.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
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
                Ready to Streamline Your HR Operations?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss how our HR management services can support your LATAM team and reduce your administrative burden.
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