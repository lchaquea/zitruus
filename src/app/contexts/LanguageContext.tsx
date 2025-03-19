'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'es';

// Define translation types
export type TranslationKey = 
  | 'home'
  | 'services'
  | 'jobs'
  | 'resources'
  | 'referral'
  | 'aboutUs'
  | 'faqs'
  | 'bookCall'
  | 'recruiting'
  | 'hrManagement'
  | 'payroll'
  | 'performance'
  | 'eor'
  | 'blog'
  | 'guides'
  | 'successStories'
  | 'contactUs'
  | 'learnMore';

// Define translations
export const translations: Record<Language, Record<TranslationKey, string>> = {
  en: {
    home: 'Home',
    services: 'Services',
    jobs: 'Jobs',
    resources: 'Resources',
    referral: 'Referral',
    aboutUs: 'About Us',
    faqs: 'FAQs',
    bookCall: 'Book a Call Now',
    recruiting: 'Recruitment',
    hrManagement: 'HR Management',
    payroll: 'Payroll',
    performance: 'Performance',
    eor: 'EoR',
    blog: 'Blog',
    guides: 'Guides',
    successStories: 'Success Stories',
    contactUs: 'Contact Us',
    learnMore: 'Learn More'
  },
  es: {
    home: 'Inicio',
    services: 'Servicios',
    jobs: 'Empleos',
    resources: 'Recursos',
    referral: 'Referidos',
    aboutUs: 'Nosotros',
    faqs: 'Preguntas',
    bookCall: 'Agenda una Llamada',
    recruiting: 'Reclutamiento',
    hrManagement: 'Gestión de RRHH',
    payroll: 'Nómina',
    performance: 'Desempeño',
    eor: 'EoR',
    blog: 'Blog',
    guides: 'Guías',
    successStories: 'Casos de Éxito',
    contactUs: 'Contáctanos',
    learnMore: 'Saber Más'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function getInitialLanguage(): Language {
  if (typeof window === 'undefined') return 'en';
  
  const savedLanguage = localStorage.getItem('language') as Language;
  const browserLanguage = navigator.language.startsWith('es') ? 'es' : 'en';
  return (savedLanguage === 'en' || savedLanguage === 'es') ? savedLanguage : browserLanguage;
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [language, setLanguage] = useState<Language>('en');

  useEffect(() => {
    const initialLang = getInitialLanguage();
    setLanguage(initialLang);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('language', language);
      document.documentElement.lang = language;
      document.documentElement.setAttribute('data-language', language);
    }
  }, [language, mounted]);

  const t = (key: TranslationKey): string => {
    return translations[language][key] || translations.en[key] || key;
  };

  if (!mounted) {
    return <div suppressHydrationWarning>{children}</div>;
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div suppressHydrationWarning>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
} 