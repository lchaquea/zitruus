'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, CheckCircle, Users, Search, Clock, Award, MessageCircle } from 'lucide-react';
import CalendlyLink from '../../components/CalendlyLink';
import TestimonialBubble from '../../components/TestimonialBubble';

// Service schema for structured data
const recruitmentServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus Recruitment Services",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Specialized recruitment services to connect US companies with top LATAM talent, featuring rigorous vetting and cultural fit assessment.",
  "serviceType": "Recruitment",
  "areaServed": {
    "@type": "Country",
    "name": "United States"
  },
  "offers": {
    "@type": "Offer",
    "description": "Find pre-vetted LATAM talent for your team"
  }
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    imageSrc: "/assets/images/team-10.svg",
    name: "Juan F.",
    role: "Ops Lead",
    testimonial: "I was impressed by how thorough Zitruus's recruitment process was. The technical assessments were challenging and relevant to my role.",
    position: { top: '40%', left: '5%' }
  },
  {
    id: 2,
    imageSrc: "/assets/images/team-2.svg",
    name: "Natalia A.",
    role: "Paid Media Specialist",
    testimonial: "The recruitment team really took time to understand my career goals. They matched me with a company that aligns perfectly with my aspirations.",
    position: { top: '40%', left: '25%' }
  },
  {
    id: 3,
    imageSrc: "/assets/images/team-6.svg",
    name: "Nicolas G.",
    role: "Design Lead",
    testimonial: "My experience with Zitruus's recruitment was exceptional. They guided me through each step and found me a role that matches my skills perfectly.",
    position: { top: '40%', left: '45%' }
  },
  {
    id: 4,
    imageSrc: "/assets/images/team-9.svg",
    name: "Laura V.",
    role: "Executive Assistant",
    testimonial: "The recruitment process was transparent and professional. I appreciated how they focused on both my technical skills and cultural preferences.",
    position: { top: '40%', left: '65%' }
  },
  {
    id: 5,
    imageSrc: "/assets/images/team-5.svg",
    name: "Carlos M.",
    role: "Full Stack Developer",
    testimonial: "Zitruus found me a remote position with a US company that offers great benefits and work-life balance. Their recruitment process was smooth and efficient.",
    position: { top: '40%', left: '85%' }
  }
];

// FAQ data
const faqs = [
  {
    question: "What types of roles can Zitruus help recruit for?",
    answer: "We specialize in roles for your core teams and back office operations including software development, sales, logistics, product management, marketing, sales, and operations. Our talent pool consists of highly skilled professionals with experience working with US companies and fluent English proficiency."
  },
  {
    question: "How does your vetting process work?",
    answer: "Our comprehensive vetting includes technical assessments (coding challenges, system design exercises), cultural fit evaluations, English proficiency testing, and thorough background checks. We assess both hard and soft skills to ensure candidates will thrive in your environment."
  },
  {
    question: "What is your typical time-to-hire?",
    answer: "Our value prop is quality and long-term success not speed. However, most clients see qualified candidates within 1-2 weeks of engagement. Our average placement time is 4 weeks from initial briefing to accepted offer."
  },
  {
    question: "Do you offer any guarantees on placements?",
    answer: "Yes, we provide a replacement guarantee if a candidate doesn't meet expectations within the first 90 days. We're confident in our vetting process and stand behind our placements."
  },
  {
    question: "How do you ensure cultural fit with our company?",
    answer: "We take time to understand your company culture, values, and work style. Our cultural assessment evaluates candidates' communication style, teamwork approach, and alignment with your organization's mission and values."
  }
];

export default function RecruitmentPage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(recruitmentServiceSchema) }}
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
                LATAM Talent Recruitment
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Find exceptional tech professionals pre-vetted for skills and cultural fit
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                Our specialized recruitment service connects you with top Latin American talent that meets your exact technical requirements and integrates seamlessly with your team culture.
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
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">60%</div>
                  <div className="text-gray-400">Average Cost Savings</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">4</div>
                  <div className="text-gray-400">Weeks Average Placement</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">95%</div>
                  <div className="text-gray-400">Long-term Retention Rate</div>
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

        {/* Our Approach Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our Recruitment Approach
              </motion.h2>
              <div className="space-y-12">
                {[
                  {
                    title: "Deep Understanding of Your Needs",
                    description: "We start by thoroughly understanding your technical requirements, team dynamics, and company culture to find the perfect match.",
                    icon: <Search className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Rigorous Vetting Process",
                    description: "Our multi-stage assessment includes technical skills evaluation, cultural fit assessment, English proficiency testing, and background verification.",
                    icon: <CheckCircle className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Accelerated Hiring Timeline",
                    description: "Our established talent networks and streamlined process allow us to present qualified candidates within days, not months.",
                    icon: <Clock className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Quality Guarantee",
                    description: "We stand behind our placements with a replacement guarantee, ensuring you're completely satisfied with your new team members.",
                    icon: <Award className="h-12 w-12 text-brand-lime" />
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

        {/* Roles We Recruit For */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Roles We Recruit For
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  "IT Support Specialist",
                  "DevOps Engineer",
                  "Bookkeeper",
                  "Software Engineer",
                  "Operations Lead",
                  "Executive Assistant",
                  "Customer Support Representative",
                  "E-commerce Operations Lead",
                  "Paid Media Specialist",
                  "Content Marketing Manager",
                  "Graphic Designer",
                  "UX/UI Designer"
                ].map((role, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="bg-zinc-900/50 p-4 rounded-lg border border-zinc-800 hover:border-brand-lime transition-all duration-300"
                  >
                    <div className="flex items-center">
                      <Users className="text-brand-lime mr-3 h-5 w-5" />
                      <span className="text-white">{role}</span>
                    </div>
                  </motion.div>
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
                Ready to Build Your Dream Team?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss your talent needs and how we can help you find the perfect candidates.
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