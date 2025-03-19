'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialBubbleProps {
  imageSrc: string;
  name: string;
  role: string;
  testimonial: string;
  position?: {
    top?: string;
    left?: string;
    right?: string;
    bottom?: string;
  };
  label?: string;
}

const TestimonialBubble: React.FC<TestimonialBubbleProps> = ({
  imageSrc,
  name,
  role,
  testimonial,
  position = {},
  label = "Click me"
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative flex flex-col items-center" style={{ ...position }}>
      <motion.div
        id={`bubble-${name.replace(/\s+/g, '-')}`}
        className="cursor-pointer group"
        onClick={() => setIsOpen(!isOpen)}
        onHoverStart={() => setIsOpen(true)}
        onHoverEnd={() => setIsOpen(false)}
        whileHover={{ scale: 1.05 }}
        animate={{
          rotate: [0, 2, -2, 0],
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: 3,
            ease: "easeInOut",
          }
        }}
      >
        <div className="w-[130px] h-[130px] rounded-full overflow-hidden border-4 border-brand-lime relative z-[60]">
          <div className={`absolute inset-0 ${isOpen ? 'bg-dark-800' : 'bg-transparent'} transition-colors duration-300`}></div>
          
          <Image
            src={imageSrc}
            alt={name}
            fill
            className={`object-cover ${isOpen ? 'opacity-70' : 'opacity-100'} transition-opacity duration-300`}
            sizes="130px"
            priority
          />
          
          <div className={`absolute inset-0 bg-black/50 flex flex-col items-center justify-center ${isOpen ? 'opacity-100' : 'opacity-0'} transition-opacity duration-300 pointer-events-none`}>
            <div className="text-center px-4">
              <p className="text-brand-lime text-xl font-semibold">{label}</p>
            </div>
          </div>
        </div>
      </motion.div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute z-[50] p-6 shadow-xl min-w-[280px] max-w-[320px]"
            style={{
              top: "calc(100% + 15px)",
              border: '2px solid #E1F473',
              borderRadius: '24px',
              boxShadow: '0 0 30px rgba(225,244,115,0.2)',
              backgroundColor: 'rgba(0, 0, 0, 0.95)'
            }}
          >
            <div className="flex flex-col gap-3">
              <div>
                <h4 className="text-brand-lime font-bold text-xl mb-1">{name}</h4>
                <p className="text-gray-300 text-base font-medium">{role}</p>
              </div>
              <p className="text-white text-base leading-relaxed italic">"{testimonial}"</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TestimonialBubble; 