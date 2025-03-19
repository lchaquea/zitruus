'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useCalendly } from '../hooks/useCalendly';
import CalendlyLoader from './CalendlyLoader';

interface CalendlyButtonProps {
  className?: string;
  children?: React.ReactNode;
  language?: string;
  variant?: 'fixed' | 'default';
}

export const CalendlyButton: React.FC<CalendlyButtonProps> = ({
  className = '',
  children,
  language = 'en',
  variant = 'default'
}) => {
  const { openCalendly, isLoading } = useCalendly();

  // Preload Calendly script when component mounts
  React.useEffect(() => {
    const preloadCalendly = () => {
      // Create a script element for Calendly
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.defer = true;
      
      // Also preload the script
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = script.src;
      
      // Add elements to head
      document.head.appendChild(link);
      document.head.appendChild(script);
      
      return () => {
        document.head.removeChild(link);
        // Only remove script if it's not being used
        if (!document.querySelector('.calendly-overlay')) {
          document.head.removeChild(script);
        }
      };
    };
    
    return preloadCalendly();
  }, []);

  const handleOpenCalendly = () => {
    openCalendly({ locale: language });
  };

  if (variant === 'fixed') {
    return (
      <>
        <motion.button
          onClick={handleOpenCalendly}
          className="fixed bottom-8 right-8 w-16 h-16 bg-[#e1f473] rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200 z-50"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Schedule a call"
        >
          <Calendar className="w-8 h-8 text-black" />
        </motion.button>
        <CalendlyLoader isVisible={isLoading} />
      </>
    );
  }

  return (
    <>
      <button
        onClick={handleOpenCalendly}
        className={`inline-flex items-center gap-2 ${className}`}
      >
        <Calendar className="w-5 h-5" />
        {children || 'Schedule a Call'}
      </button>
      <CalendlyLoader isVisible={isLoading} />
    </>
  );
};

export default CalendlyButton; 