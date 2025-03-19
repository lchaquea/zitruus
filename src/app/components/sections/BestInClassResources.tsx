'use client';

import React, { CSSProperties } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import TestimonialBubble from '../TestimonialBubble';

// Define the logos array with company names and image paths
const logos = [
  { name: 'WeWork', path: '/assets/logos/svg/wework.svg' },
  { name: 'Apple', path: '/assets/logos/svg/apple.svg' },
  { name: 'OpenAI', path: '/assets/logos/svg/openai.svg' },
  { name: 'AWS', path: '/assets/logos/svg/aws.svg' },
  { name: 'LinkedIn', path: '/assets/logos/svg/linkedin.svg' },
  { name: 'Bodytech', path: '/assets/logos/svg/bodytech.svg' },
  { name: 'Selia', path: '/assets/logos/svg/selia.svg' },
  { name: 'Coursera', path: '/assets/logos/svg/coursera.svg' },
  { name: 'Platzi', path: '/assets/logos/svg/platzi.svg' },
  { name: 'Slack', path: '/assets/logos/svg/slack.svg' },
  { name: 'Notion', path: '/assets/logos/svg/notion.svg' },
  { name: 'Zoom', path: '/assets/logos/svg/zoom.svg' },
  { name: 'Google Workspace', path: '/assets/logos/svg/google-workspace.svg' },
  { name: 'Microsoft Teams', path: '/assets/logos/svg/microsoft-teams.svg' },
  { name: 'Github', path: '/assets/logos/svg/github.svg' },
  { name: 'Salesforce', path: '/assets/logos/svg/salesforce.svg' },
  { name: 'Hubspot', path: '/assets/logos/svg/hubspot.svg' },
  { name: 'Azure', path: '/assets/logos/svg/azure.svg' },
  { name: 'Colsanitas', path: '/assets/logos/svg/colsanitas.svg' },
  { name: 'Sura', path: '/assets/logos/svg/sura.svg' },
  { name: 'Shopify', path: '/assets/logos/svg/shopify.svg' },
  { name: 'SmartFit', path: '/assets/logos/svg/smartfit.svg' },
  { name: 'Stark', path: '/assets/logos/svg/stark.svg' },
];

// Function to render a logo with fallback
const LogoImage = ({ logo, className }: { logo: { name: string, path: string }, className: string }) => {
  const [imageError, setImageError] = React.useState(false);

  return (
    <div className={className}>
      {imageError ? (
        <span className="text-white text-xs font-medium whitespace-nowrap">{logo.name}</span>
      ) : (
        <div className="relative h-full w-full flex items-center justify-center px-3 py-4">
          <Image
            src={logo.path}
            alt={`${logo.name} logo`}
            width={45}
            height={22}
            className="object-contain text-white"
            onError={() => setImageError(true)}
            unoptimized
            style={{ filter: 'brightness(0) invert(1)' }}
          />
        </div>
      )}
    </div>
  );
};

interface BestInClassResourcesProps {
  testimonials?: Array<{
    imageSrc: string;
    name: string;
    role: string;
    testimonial: string;
    position: CSSProperties;
  }>;
}

export default function BestInClassResources({ testimonials = [] }: BestInClassResourcesProps) {
  // Create a duplicate array of logos for seamless looping
  const duplicatedLogos = [...logos, ...logos];
  
  return (
    <section className="py-24 bg-black relative overflow-hidden">
      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-lime mb-4">
              Best in Class Resources
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              The best benefits and technology for our talent
            </p>
          </motion.div>
        </div>
        
        {/* Logo Slider - Full Width */}
        <div className="relative overflow-hidden h-24 w-screen pt-2">
          {/* Seamless slider */}
          <motion.div
            className="absolute flex pt-1"
            animate={{
              x: [0, "-50%"]
            }}
            transition={{
              x: {
                duration: 80, // Reduced speed by 50% (from 40 to 80)
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            <div className="flex items-center space-x-14"> {/* Reduced space by 30% (from 20 to 14) */}
              {duplicatedLogos.map((logo, index) => (
                <LogoImage 
                  key={`slider-${logo.name}-${index}`} 
                  logo={logo}
                  className="flex-shrink-0 h-16 w-32 relative transition-all duration-300 opacity-70 hover:opacity-100"
                />
              ))}
            </div>
          </motion.div>
        </div>

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
      </div>
    </section>
  );
} 