'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Clock, DollarSign, Shield, AlertTriangle } from 'lucide-react';
import TestimonialBubble from '../TestimonialBubble';

interface HiringChallengesProps {
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

const HiringChallenges = ({ testimonials = [] }: HiringChallengesProps) => {
  const brandLime = 'rgb(225, 244, 115)'; // brand-lime color
  
  const challenges = [
    {
      icon: Clock,
      title: 'Time-Consuming Hiring',
      description: 'Months spent on recruitment, interviews, and paperwork',
      color: brandLime,
      delay: 0.1,
      animation: {
        icon: {
          rotate: [0, 0, 180, 180, 0],
          scale: [1, 1.1, 1.1, 1, 1],
          transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
        }
      }
    },
    {
      icon: DollarSign,
      title: 'High Costs',
      description: 'Expensive local talent and overhead costs',
      color: brandLime,
      delay: 0.2,
      animation: {
        icon: {
          x: [0, -2, 1, -1, 2, 0],
          y: [0, 1, -1, 2, -1, 0],
          rotate: [0, -1, 1, -0.5, 0.5, 0],
          transition: { 
            duration: 2.5, 
            repeat: Infinity, 
            ease: "easeInOut",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1]
          }
        }
      }
    },
    {
      icon: Shield,
      title: 'Compliance Risks',
      description: 'Complex international labor laws and regulations',
      color: brandLime,
      delay: 0.3,
      animation: {
        icon: {
          rotateY: [0, 180, 0],
          transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
        }
      }
    },
    {
      icon: AlertTriangle,
      title: 'Quality Concerns',
      description: 'Previous bad experiences with outsourcing',
      color: brandLime,
      delay: 0.4,
      animation: {
        icon: {}
      },
      customRender: (color) => (
        <div className="relative w-10 h-10">
          <AlertTriangle style={{ color }} className="w-10 h-10 absolute top-0 left-0" />
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[2px] h-[8px] bg-current rounded-full mb-[6px]"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [1, 0.7, 1],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-[2px] h-[2px] bg-current rounded-full mt-[8px]"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [1, 0.6, 1],
              }}
              transition={{
                duration: 1.5,
                delay: 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          </div>
        </div>
      )
    },
  ];

  // Generate straight vertical line positions - fewer lines
  const generateVerticalLinePositions = () => {
    const positions = [];
    // Only 12 vertical lines for a cleaner look
    for (let i = 0; i < 12; i++) {
      positions.push(8 + (i * 7)); // More spaced out
    }
    return positions;
  };

  // Generate horizontal cross lines
  const generateHorizontalLinePositions = () => {
    const positions = [];
    // Only 6 horizontal lines
    for (let i = 1; i <= 6; i++) {
      positions.push(i * 12); // Evenly spaced
    }
    return positions;
  };

  const verticalLinePositions = generateVerticalLinePositions();
  const horizontalLinePositions = generateHorizontalLinePositions();

  // Generate tech-inspired dash patterns
  const generateDashPattern = (index) => {
    // Create various dash patterns for a tech look
    const patterns = [
      "0.3 4", // Sparse dots
      "0.3 2", // Medium dots
      "0.3 1", // Dense dots
      "1 3", // Sparse dashes
      "1 1.5", // Medium dashes
    ];
    return patterns[index % patterns.length];
  };

  // Consistent line properties
  const lineOpacity = 0.04;
  const lineWidth = 0.1;

  // Generate lemon drop properties - more elegant and tech-inspired
  const generateLemonDrops = () => {
    const drops = [];
    // Create more drops per line
    for (let i = 0; i < verticalLinePositions.length; i++) {
      // Add 2-4 drops per line for more visibility
      const dropCount = Math.floor(Math.random() * 3) + 2;
      
      for (let j = 0; j < dropCount; j++) {
        drops.push({
          position: verticalLinePositions[i],
          delay: 1 + (Math.random() * 5), // Less delay for more frequent drops
          duration: 4 + (Math.random() * 3), // Slightly faster for more activity
          size: 0.15 + (Math.random() * 0.2), // Smaller, more refined size (0.15-0.35)
          opacity: 0.25 + (Math.random() * 0.25), // Keep higher opacity for visibility
          // Shorter, more subtle tails for a tech-inspired look
          tailLength: Math.random() > 0.7 ? 0.4 + (Math.random() * 0.6) : 0, // Fewer drops have tails (30%), and tails are shorter
        });
      }
    }
    return drops;
  };

  const lemonDrops = generateLemonDrops();

  return (
    <section className="py-24 bg-black relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Add testimonial bubbles with higher z-index and proper overflow handling */}
        <div className="absolute inset-0 overflow-visible" style={{ zIndex: 999 }}>
          {testimonials.map((testimonial, index) => (
            <div key={index} style={{
              ...testimonial.position,
              zIndex: 999,
              transform: index === 1 ? 'translateY(0)' : undefined,
              marginTop: index === 1 ? '50px' : undefined
            }}>
              <TestimonialBubble
                imageSrc={testimonial.imageSrc}
                name={testimonial.name}
                role={testimonial.role}
                testimonial={testimonial.testimonial}
                label="Hire with Zitruus"
              />
            </div>
          ))}
      </div>

      <div className="relative z-10">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Tired of These <span className="text-brand-lime">Hiring Challenges</span>?
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            You're not alone. Many companies struggle with these common hiring pain points.
            </p>
        </motion.div>

          {/* Pain points grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative mt-10">
            {challenges.map((challenge, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: challenge.delay + 0.5 }}
                className="relative"
              >
                {/* Pain point content */}
                <div className="flex flex-col items-center text-center">
                  {/* Icon with animation */}
                  <motion.div
                    className="relative z-10 mb-6"
                    whileHover={{ scale: 1.1 }}
                  >
                    <motion.div
                      className="relative"
                      animate={{
                        boxShadow: [
                          `0 0 0 rgba(${challenge.color}, 0)`,
                          `0 0 30px ${challenge.color}40`,
                          `0 0 0 rgba(${challenge.color}, 0)`,
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    >
                      <motion.div
                        className="w-20 h-20 flex items-center justify-center rounded-full"
                        style={{ 
                          background: `radial-gradient(circle at center, ${challenge.color}30 0%, transparent 70%)` 
                        }}
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      >
                        {challenge.customRender ? (
                          challenge.customRender(challenge.color)
                        ) : (
                          <motion.div
                            animate={challenge.animation.icon}
                          >
                            <challenge.icon style={{ color: challenge.color }} className="w-10 h-10" />
                          </motion.div>
                        )}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                  
                  {/* Title and description */}
                  <h3 className="text-xl font-bold mb-3 text-brand-lime">
                    {challenge.title}
                  </h3>
                  
                  <p className="text-gray-400">
                    {challenge.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add a debug indicator to check if the component is rendering */}
      <div className="fixed top-0 left-0 bg-black text-white p-2 z-50 opacity-0">
        HiringChallenges Component Rendered
      </div>
    </section>
  );
};

export default HiringChallenges; 