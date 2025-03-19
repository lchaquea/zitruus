'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import CalendlyLink from '../../components/CalendlyLink';
import { useLanguage, TranslationKey, translations } from '../../contexts/LanguageContext';
import { usePathname } from 'next/navigation';

// Navigation structure
const createNavigation = (language: 'en' | 'es') => {
  const t = (key: TranslationKey) => translations[language][key];
  
  return [
    { 
      name: t('services'), 
      href: '/services',
      hasSubmenu: true,
      submenu: [
        { name: t('recruiting'), href: '/services/recruitment' },
        { name: t('hrManagement'), href: '/services/hr-management' },
        { name: t('payroll'), href: '/services/payroll' },
        { name: t('performance'), href: '/services/performance' },
        { name: t('eor'), href: '/services/eor' },
      ]
    },
    { name: t('jobs'), href: '/jobs', hasSubmenu: false },
    { 
      name: t('resources'), 
      href: '/resources',
      hasSubmenu: true,
      submenu: [
        { name: t('blog'), href: '/blog' },
        { name: t('guides'), href: '/guides' },
        { name: t('successStories'), href: '/success-stories' },
      ]
    },
    { name: t('referral'), href: '/referral-program', hasSubmenu: false },
    { name: t('aboutUs'), href: '/about', hasSubmenu: false },
    { name: t('faqs'), href: '#faq', hasSubmenu: false },
  ];
};

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [navigation, setNavigation] = useState(createNavigation(language));
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const pathname = usePathname();

  // Update navigation when language changes
  useEffect(() => {
    setNavigation(createNavigation(language));
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'es' : 'en');
  };

  const toggleSubmenu = (name: string) => {
    setActiveSubmenu(activeSubmenu === name ? null : name);
  };

  const scrollToFAQs = (e: React.MouseEvent) => {
    e.preventDefault();
    const faqsSection = document.getElementById('faq');
    if (pathname !== '/') {
      window.location.href = '/#faq';
    } else if (faqsSection) {
      faqsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-black border-b border-brand-lime/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
                alt="Zitruus Logo"
                width={208}
                height={65}
                className="h-16 w-auto"
              />
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <div key={item.name} className="relative group">
                  {item.hasSubmenu ? (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="flex items-center text-brand-gray hover:text-brand-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown size={16} className="ml-1" />
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      className="text-brand-gray hover:text-brand-white px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                      onClick={item.name === t('faqs') ? scrollToFAQs : undefined}
                    >
                      {item.name}
                    </Link>
                  )}
                  
                  {/* Dropdown menu */}
                  {item.hasSubmenu && (
                    <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-dark-300 ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="py-1">
                        {item.submenu?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-dark-400 hover:text-white"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Language Selector */}
          <div className="hidden md:flex items-center mr-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-brand-gray hover:text-brand-white transition-colors duration-200"
            >
              <Globe size={18} className="mr-1" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ES'}</span>
            </button>
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <CalendlyLink className="inline-flex items-center px-6 py-3 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
              {t('bookCall')}
            </CalendlyLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleLanguage}
              className="flex items-center text-brand-gray hover:text-brand-white transition-colors duration-200 mr-4"
            >
              <Globe size={18} className="mr-1" />
              <span className="text-sm font-medium">{language === 'en' ? 'EN' : 'ES'}</span>
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-brand-gray hover:text-brand-white hover:bg-brand-lime/10 focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black border-t border-brand-lime/10"
          >
            <div className="px-4 pt-4 pb-6 space-y-3">
              {navigation.map((item) => (
                <div key={item.name}>
                  {item.hasSubmenu ? (
                    <>
                      <button
                        onClick={() => toggleSubmenu(item.name)}
                        className="flex items-center justify-between w-full px-3 py-3 text-lg font-medium text-brand-gray hover:text-brand-lime transition-colors duration-200"
                      >
                        {item.name}
                        <ChevronDown 
                          size={18} 
                          className={`transition-transform duration-200 ${activeSubmenu === item.name ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      {activeSubmenu === item.name && (
                        <div className="pl-6 mt-1 space-y-2">
                          {item.submenu?.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-3 py-2 text-base text-gray-400 hover:text-brand-lime transition-colors duration-200"
                              onClick={() => setIsOpen(false)}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block px-3 py-3 text-lg font-medium text-brand-gray hover:text-brand-lime transition-colors duration-200"
                      onClick={(e) => {
                        if (item.name === t('faqs')) {
                          e.preventDefault();
                          setIsOpen(false);
                          if (pathname !== '/') {
                            window.location.href = '/#faq';
                          } else {
                            const faqsSection = document.getElementById('faq');
                            if (faqsSection) {
                              faqsSection.scrollIntoView({ behavior: 'smooth' });
                            }
                          }
                        } else {
                          setIsOpen(false);
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="pt-4 mt-4 border-t border-brand-lime/10">
                <CalendlyLink className="w-full inline-flex items-center justify-center px-6 py-3 bg-[#E1F473] text-black font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(225,244,115,0.3)] transform-gpu">
                  {t('bookCall')}
                </CalendlyLink>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 