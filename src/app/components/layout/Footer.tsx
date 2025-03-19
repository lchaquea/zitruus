'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import CalendlyLink from '../../components/CalendlyLink';

export default function Footer() {
  return (
    <footer className="bg-black relative overflow-hidden">
      {/* Elegant Lime Green Pattern */}
      <div className="absolute inset-0">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="elegant-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 0 L40 20 L20 40 Z" fill="none" stroke="rgba(225,244,115,0.1)" strokeWidth="1" />
              <circle cx="20" cy="20" r="1" fill="rgba(225,244,115,0.1)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#elegant-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <Image
              src="/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
              alt="Zitruus Logo"
              width={208}
              height={65}
              className="h-16 w-auto mb-4"
            />
            <div className="text-gray-400 max-w-xs">
              Connecting US companies with LATAM top talent
            </div>
          </div>
          
          <div>
            <h3 className="text-brand-lime font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-gray-400 hover:text-brand-lime">About Us</Link></li>
              <li><Link href="/services" className="text-gray-400 hover:text-brand-lime">Services</Link></li>
              <li><Link href="/jobs" className="text-gray-400 hover:text-brand-lime">Jobs</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-brand-lime">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-lime font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link href="/services/recruitment" className="text-gray-400 hover:text-brand-lime">Recruitment</Link></li>
              <li><Link href="/services/hr-management" className="text-gray-400 hover:text-brand-lime">HR Management</Link></li>
              <li><Link href="/services/payroll" className="text-gray-400 hover:text-brand-lime">Payroll</Link></li>
              <li><Link href="/services/performance" className="text-gray-400 hover:text-brand-lime">Performance</Link></li>
              <li><Link href="/services/eor" className="text-gray-400 hover:text-brand-lime">EoR</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-lime font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/blog" className="text-gray-400 hover:text-brand-lime">Blog</Link></li>
              <li><Link href="/success-stories" className="text-gray-400 hover:text-brand-lime">Success Stories</Link></li>
              <li><Link href="/referral-program" className="text-gray-400 hover:text-brand-lime">Referral Program</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-brand-lime font-semibold mb-4">Connect</h3>
            <ul className="space-y-2">
              <li><Link href="https://www.linkedin.com/company/zitruus" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-brand-lime">LinkedIn</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Zitruus. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 