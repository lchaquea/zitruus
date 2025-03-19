'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { Calendar, CheckCircle, BarChart2, Target, TrendingUp, LineChart, MessageCircle, Users, Search, Clock, Award } from 'lucide-react';
import CalendlyLink from '../../components/CalendlyLink';
import TestimonialBubble from '../../components/TestimonialBubble';

// Service schema for structured data
const performanceServiceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Zitruus Performance Management Services",
  "provider": {
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com"
  },
  "description": "Enhance your LATAM team's performance with comprehensive performance management solutions. Track metrics, provide feedback, and drive continuous improvement.",
  "serviceType": "Performance Management",
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
    "description": "Comprehensive performance management solutions for LATAM teams"
  }
};

// Testimonial data
const testimonials = [
  {
    id: 1,
    imageSrc: "/assets/images/team-10.svg",
    name: "Juan F.",
    role: "Ops Lead",
    testimonial: "Zitruus's performance management system has helped us track and improve our team's productivity in measurable ways.",
    position: { top: '40%', left: '5%' }
  },
  {
    id: 2,
    imageSrc: "/assets/images/team-2.svg",
    name: "Natalia A.",
    role: "Paid Media Specialist",
    testimonial: "Their performance metrics and feedback systems have been crucial in identifying and nurturing top talent in our team.",
    position: { top: '40%', left: '25%' }
  },
  {
    id: 3,
    imageSrc: "/assets/images/team-6.svg",
    name: "Nicolas G.",
    role: "Design Lead",
    testimonial: "Since implementing Zitruus's performance management tools, we've seen a 40% improvement in team productivity.",
    position: { top: '40%', left: '45%' }
  },
  {
    id: 4,
    imageSrc: "/assets/images/team-9.svg",
    name: "Laura V.",
    role: "Executive Assistant",
    testimonial: "The performance tracking and development programs have transformed how we manage and grow our team members.",
    position: { top: '40%', left: '65%' }
  },
  {
    id: 5,
    imageSrc: "/assets/images/team-5.svg",
    name: "Carlos M.",
    role: "Full Stack Developer",
    testimonial: "The performance feedback I receive through Zitruus's system is constructive and has helped me grow professionally in my role.",
    position: { top: '40%', left: '85%' }
  }
];

// FAQ data
const faqs = [
  {
    question: "How does Zitruus approach performance management?",
    answer: "We take a balanced approach that combines data-driven metrics with human-centered development. Our performance management system tracks key productivity indicators while also focusing on employee growth, engagement, and satisfaction."
  },
  {
    question: "What performance metrics do you track?",
    answer: "We customize metrics based on your business needs and team roles. Common metrics include productivity KPIs, quality indicators, project completion rates, collaboration effectiveness, skill development progress, and employee engagement scores."
  },
  {
    question: "How do you handle performance reviews?",
    answer: "We implement structured review processes that can include regular check-ins, quarterly assessments, and annual reviews. Our approach emphasizes constructive feedback, clear goal-setting, and actionable development plans."
  },
  {
    question: "Can you help with performance improvement plans?",
    answer: "Yes, we develop targeted improvement plans for team members who need additional support. These plans include clear objectives, necessary resources, milestone tracking, and regular feedback to ensure progress."
  },
  {
    question: "How do you measure the ROI of performance management?",
    answer: "We track metrics that directly impact your business outcomes, such as productivity increases, quality improvements, reduced turnover, and team satisfaction. Our reporting provides clear visibility into how performance management is affecting your bottom line."
  }
];

export default function PerformancePage() {
  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(performanceServiceSchema) }}
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
                Performance Management
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl md:text-2xl text-gray-400 mb-8"
              >
                Optimize your LATAM team's productivity and growth
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 mb-12 max-w-2xl mx-auto"
              >
                Our performance management services help you track, measure, and improve your team's effectiveness while fostering a culture of continuous growth and development.
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
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">35%</div>
                  <div className="text-gray-400">Average Productivity Increase</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">40%</div>
                  <div className="text-gray-400">Improved Retention Rate</div>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-zinc-900/50 p-8 rounded-lg border border-zinc-800 text-center"
                >
                  <div className="text-4xl font-bold text-[#E1F473] mb-2">90%</div>
                  <div className="text-gray-400">Employee Satisfaction</div>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <CalendlyLink className="inline-flex items-center px-8 py-4 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  <Calendar className="w-5 h-5 mr-2" />
                  Discuss Your Performance Needs
                </CalendlyLink>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Our Performance Services Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Our Performance Management Services
              </motion.h2>
              <div className="space-y-12">
                {[
                  {
                    title: "Performance Metrics & KPIs",
                    description: "Custom-designed performance indicators that align with your business goals and provide meaningful insights into team productivity.",
                    icon: <BarChart2 className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Goal Setting & Tracking",
                    description: "Structured goal-setting frameworks with regular tracking and adjustments to keep your team focused and motivated.",
                    icon: <Target className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Feedback & Review Systems",
                    description: "Comprehensive review processes that provide constructive feedback and clear development paths for team members.",
                    icon: <TrendingUp className="h-12 w-12 text-brand-lime" />
                  },
                  {
                    title: "Performance Analytics",
                    description: "Advanced analytics that identify trends, highlight opportunities, and provide actionable insights for continuous improvement.",
                    icon: <LineChart className="h-12 w-12 text-brand-lime" />
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
                Our Performance Management Approach
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
                {[
                  {
                    title: "Data-Driven",
                    description: "We use concrete metrics and analytics to measure performance objectively and identify areas for improvement."
                  },
                  {
                    title: "Human-Centered",
                    description: "We balance metrics with a focus on individual growth, well-being, and career development."
                  },
                  {
                    title: "Culturally Aligned",
                    description: "Our performance systems respect cultural differences while maintaining consistent standards across your global team."
                  },
                  {
                    title: "Continuous Improvement",
                    description: "We implement regular feedback loops and iterative improvements rather than relying solely on annual reviews."
                  },
                  {
                    title: "Transparent",
                    description: "Clear expectations, open communication, and accessible performance data create trust and accountability."
                  },
                  {
                    title: "Development-Focused",
                    description: "We emphasize growth and skill development, not just evaluation and assessment."
                  }
                ].map((approach, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative pl-12"
                  >
                    <div className="absolute left-0 top-0 w-8 h-8 bg-brand-lime rounded-full flex items-center justify-center">
                      <span className="text-black font-bold">{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{approach.title}</h3>
                    <p className="text-gray-400">{approach.description}</p>
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

        {/* Benefits Section */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12"
              >
                Benefits of Our Performance Management
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  {
                    title: "Increased Productivity",
                    description: "Clear goals and regular feedback lead to measurable improvements in team output and efficiency."
                  },
                  {
                    title: "Higher Retention",
                    description: "Employees who receive meaningful feedback and development opportunities are more likely to stay with your company."
                  },
                  {
                    title: "Better Decision Making",
                    description: "Data-driven insights help you make informed decisions about team structure, resource allocation, and growth planning."
                  },
                  {
                    title: "Improved Team Alignment",
                    description: "Consistent performance standards and shared goals create stronger alignment across distributed teams."
                  },
                  {
                    title: "Enhanced Employee Growth",
                    description: "Structured development plans help team members build skills and advance their careers within your organization."
                  },
                  {
                    title: "Stronger Company Culture",
                    description: "Fair, transparent performance management reinforces your values and strengthens your organizational culture."
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
                Ready to Optimize Your Team's Performance?
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Let's discuss how our performance management services can help your LATAM team reach its full potential.
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