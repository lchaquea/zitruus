'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Linkedin, Star, Heart, Target } from 'lucide-react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import CalendlyButton from '../components/CalendlyButton';

// Service schema for structured data
const aboutPageSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": "About Zitruus",
  "description": "Meet the visionary team behind Zitruus. Our leadership combines expertise in talent acquisition, technology, and Latin American markets to revolutionize global hiring.",
  "publisher": {
    "@type": "Organization",
    "name": "Zitruus",
    "logo": {
      "@type": "ImageObject",
      "url": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
    }
  }
};

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  linkedin: string;
  imageUrl: string;
}

const team: TeamMember[] = [
  {
    name: 'Lucas Chaquea',
    role: 'Founder',
    bio: 'A visionary leader, serial entrepreneur, with extensive experience in talent acquisition accross its ventures for the tech industry. Lucas founded Zitruus with a mission to bridge the gap between US companies and Latin American talent.',
    linkedin: 'https://www.linkedin.com/in/lchaquea/',
    imageUrl: '/assets/images/LucasChaqueaProfile.svg'
  },
  {
    name: 'Sebastian Chaquea',
    role: 'Founder & Head of Talent Strategy',
    bio: 'With 15+ years in the U.S. and deep expertise in HR, performance, and career strategy, Sebastian ensures seamless cultural fit between LATAM talent and U.S. companies, optimizing workforce success. He is your go-to-person for your strategy challenges.',
    linkedin: 'https://www.linkedin.com/in/juanschaquea/',
    imageUrl: '/assets/images/JuanChaqueaProfile.svg'
  },
  {
    name: 'Santiago Cruz',
    role: 'Colombia Hub Managing Partner',
    bio: 'Santiago brings over a decade of experience in managing international teams with hubs of +400 employees. His expertise in nearshore talent management ensures successful partnerships between US companies and LATAM professionals.',
    linkedin: 'https://www.linkedin.com/in/santiago-cruz-orozco/',
    imageUrl: '/assets/images/SantiagoCruzProfile.svg'
  },
  {
    name: 'Maria Escobar',
    role: 'HR Manager',
    bio: 'Maria is a seasoned HR professional with expertise in workforce management. In her 5+ years at 3M she developed skills and knowledge which ensures our talent receives exceptional support throughout their journey with Zitruus.',
    linkedin: 'https://www.linkedin.com/in/maria-angela-escobar-marquez-69361a68/',
    imageUrl: '/assets/images/MariaEscobarProfile.svg'
  },
  {
    name: 'Gabriela Barrera',
    role: 'Payroll & HR Specialist',
    bio: 'Gabriela expertly manages our international payroll operations and HR compliance. Her attention to detail ensures smooth operations for both our clients and talent pool.',
    linkedin: '#',
    imageUrl: '/assets/images/GabrielaBarreraProfile.svg'
  }
];

export default function About() {
  const values = [
    {
      icon: <Star className="w-12 h-12 text-brand-lime" />,
      title: "Excellence",
      description: "We are committed to delivering the highest quality in all our processes. From talent selection to ongoing support, we maintain rigorous standards to ensure exceptional results for our clients and opportunities for top LATAM professionals.",
      animation: { rotate: [0, 360], scale: [1, 1.2, 1] }
    },
    {
      icon: <Heart className="w-12 h-12 text-brand-lime" />,
      title: "Empathy",
      description: "As your dedicated talent partner, we deeply understand that your business growth is our priority. We build lasting relationships based on trust, understanding, and mutual success, ensuring every interaction adds value to your journey.",
      animation: { scale: [1, 1.2, 1] }
    },
    {
      icon: <Target className="w-12 h-12 text-brand-lime" />,
      title: "Impact",
      description: "We go beyond hiring; we empower businesses with the right talent and infrastructure to scale, optimize costs, and grow sustainably. Our commitment extends to creating meaningful opportunities for LATAM professionals while driving business success.",
      animation: { scale: [1, 1.1, 1], rotate: [0, -360] }
    }
  ];

  // Organization schema for structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Zitruus",
    "url": "https://zitruus.com",
    "logo": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png",
    "description": "Zitruus connects top LATAM talent with US companies, providing comprehensive HR solutions, recruitment, and compliance services.",
    "foundingDate": "2022",
    "founders": [
      {
        "@type": "Person",
        "name": "Lucas Chaquea"
      },
      {
        "@type": "Person",
        "name": "Sebastian Chaquea"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "United States"
    },
    "sameAs": [
      "https://www.linkedin.com/company/zitruus",
      "https://twitter.com/zitruus"
    ]
  };

  return (
    <>
      <Navbar />
      <main className="bg-black min-h-screen">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([aboutPageSchema, organizationSchema]) }}
        />
        
        {/* Hero Section */}
        <section className="pt-32 pb-12 relative overflow-hidden">
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
                Meet Our Team
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-xl text-gray-400 mb-8"
              >
                Connecting US Companies with LATAM's Exceptional Talent
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-gray-400 max-w-2xl mx-auto"
              >
                We're revolutionizing how US companies build and manage their teams by providing access to Latin America's most talented professionals while ensuring seamless operations through our comprehensive suite of services.
              </motion.p>
            </div>
          </div>
        </section>

        {/* Team Section - Redesigned with elegant rounded photos */}
        <section className="py-12 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-zinc-900/30 rounded-xl p-6 border border-zinc-800/50 group hover:bg-zinc-900/50 transition-all duration-300 flex flex-col items-center text-center"
                >
                  <div className="w-32 h-32 mb-6 rounded-full border-2 border-brand-lime/30 group-hover:border-brand-lime transition-all duration-300 overflow-hidden">
                    <img 
                      src={member.imageUrl} 
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 filter grayscale hover:grayscale-0 contrast-125 brightness-90"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">{member.name}</h3>
                  <p className="text-brand-lime text-sm mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">{member.bio}</p>
                  <Link
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand-lime transition-colors p-2 rounded-full bg-zinc-800/50 hover:bg-zinc-800 transition-all duration-300"
                  >
                    <Linkedin className="h-5 w-5" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Mission Section - Redesigned to be more attractive */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-zinc-900/50 to-zinc-900/30 p-10 rounded-2xl border border-zinc-800/50 text-center group hover:border-brand-lime/30 transition-all duration-500 shadow-lg hover:shadow-[0_10px_30px_rgba(225,244,115,0.1)]"
              >
                <motion.div 
                  className="inline-block mb-6 p-4 rounded-full bg-zinc-800/50 border border-brand-lime/20"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <Target className="w-10 h-10 text-brand-lime" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">Our Mission</h2>
                <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mx-auto">
                  To empower US companies with exceptional LATAM talent while creating meaningful career opportunities that drive growth and innovation across borders.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section - Redesigned to be more elegant */}
        <section className="py-20 bg-black">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-white text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300"
              >
                Our Values
              </motion.h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-zinc-900/30 rounded-xl p-8 border border-zinc-800/50 text-center group hover:bg-zinc-900/50 transition-all duration-300 hover:border-brand-lime/30 shadow-md hover:shadow-[0_5px_20px_rgba(225,244,115,0.07)]"
                  >
                    <motion.div
                      className="mb-6 inline-block p-4 rounded-full bg-zinc-800/50 border border-brand-lime/20"
                      whileHover={value.animation}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      {value.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4">{value.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Calendly Button */}
        <CalendlyButton variant="fixed" />
      </main>
      <Footer />
    </>
  );
} 