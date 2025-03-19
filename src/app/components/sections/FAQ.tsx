'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-2 overflow-hidden bg-transparent">
      <button
        className="flex justify-between items-center w-full py-2 px-1 text-left focus:outline-none group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="text-lg font-medium text-white group-hover:text-brand-lime transition-colors duration-300">{question}</h3>
        <span className={`ml-4 flex-shrink-0 p-1 rounded-full border ${isOpen ? 'border-brand-lime bg-brand-lime/10' : 'border-gray-700 bg-transparent'} transition-all duration-300`}>
          {isOpen ? <Minus size={16} className="text-brand-lime" /> : <Plus size={16} className="text-gray-400 group-hover:text-brand-lime transition-colors duration-300" />}
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
      >
        <div className="py-2 pl-1 pr-10 text-gray-400 border-l-2 border-brand-lime/20 ml-1 pl-4">
          {answer}
        </div>
      </motion.div>
    </div>
  );
};

export default function FAQ() {
  const faqs = [
    {
      question: "What is Zitruus and how does it work?",
      answer: "Zitruus is a talent acquisition partner that connects US companies with top-tier talent from Latin America. We handle the entire hiring process, from sourcing and vetting candidates to managing payroll, compliance, and HR administration, allowing you to focus on growing your business."
    },
    {
      question: "What types of roles can Zitruus help me fill?",
      answer: "We specialize in roles for your core teams and back office operations including software development, sales, logistics, product management, marketing, sales, and operations. Our talent pool consists of highly skilled professionals with experience working with US companies and fluent English proficiency."
    },
    {
      question: "How much can I save by hiring through Zitruus?",
      answer: "Companies typically save 40-80% on total employment costs when hiring through Zitruus compared to hiring in the US. This includes not just salary savings but also reduced overhead, benefits, and administrative costs."
    },
    {
      question: "How does pricing work?",
      answer: "Our pricing is transparent and simple—we charge a flat-rate overhead fee + insignificant one-time fee per hire, ensuring cost efficiency without unpredictable markups. Unlike traditional recruitment agencies that charge a full salary for a single hire, we act as your 360° long-term talent partner."
    },
    {
      question: "How does the hiring process work?",
      answer: "Our process is simple: 1) We discuss your needs and requirements, 2) We source and vet candidates from our talent pool with case studies and references, 3) You interview and select your preferred candidate, 4) We handle all paperwork, onboarding, and ongoing administration while you work directly with your new team member."
    },
    {
      question: "How are payments handled?",
      answer: "We provide a simple monthly billing process. You pay Zitruus directly, and we handle all payments to your team members, including taxes, benefits, and compliance requirements in their local countries."
    },
    {
      question: "What if a hire doesn't work out?",
      answer: "We offer a 30-day replacement guarantee. If you're not satisfied with a hire within the first 30 days, we'll find a replacement at no additional cost. We also provide ongoing support to ensure successful working relationships."
    },
    {
      question: "Do I need to set up a foreign entity to hire through Zitruus?",
      answer: "No. Zitruus acts as the Employer of Record (EoR), which means we handle all legal and compliance requirements. You can hire talent from Latin America without setting up a foreign entity or dealing with international compliance issues."
    },
    {
      question: "What about time zone differences?",
      answer: "Latin America shares similar time zones with the US, with most countries being in EST, CST, or PST. This allows for real-time collaboration and overlapping working hours, unlike offshore teams in Asia or Eastern Europe."
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

  return (
    <section id="faq" className="py-24 bg-black relative">
      <div className="absolute inset-0 bg-gradient-to-b from-brand-lime/5 to-transparent opacity-50"></div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Everything you need to know about hiring top LATAM talent
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {faqs.map((faq, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-dark-300/50 backdrop-blur-sm rounded-lg p-1.5 border border-gray-800 hover:border-brand-lime/30 transition-all duration-300"
            >
              <FAQItem question={faq.question} answer={faq.answer} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 