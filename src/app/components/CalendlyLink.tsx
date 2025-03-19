'use client';

import React from 'react';
import { useCalendly } from '../hooks/useCalendly';
import { useLanguage } from '../contexts/LanguageContext';
import CalendlyLoader from './CalendlyLoader';

interface CalendlyLinkProps {
  children: React.ReactNode;
  className?: string;
}

export default function CalendlyLink({ children, className }: CalendlyLinkProps) {
  const { openCalendly, isLoading } = useCalendly();
  const { language } = useLanguage();

  const handleOpenCalendly = () => {
    // Pass the language to the Calendly widget
    openCalendly({ locale: language });
  };

  return (
    <>
      <button onClick={handleOpenCalendly} className={className}>
        {children}
      </button>
      <CalendlyLoader isVisible={isLoading} />
    </>
  );
} 