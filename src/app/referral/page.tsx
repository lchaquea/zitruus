import React from 'react';
import { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import dynamic from 'next/dynamic';

// Import the client component with dynamic import
const ReferralContent = dynamic(() => import('../components/ReferralContent'), { ssr: true });

// Generate metadata for the referral page
export const metadata: Metadata = {
  title: 'Referral Program | Zitruus',
  description: 'Refer companies to Zitruus and earn commission on successful placements.',
  keywords: 'referral program, commission, LATAM talent, hiring referrals',
  openGraph: {
    title: 'Referral Program | Zitruus',
    description: 'Refer companies to Zitruus and earn commission on successful placements.',
    url: 'https://zitruus.com/referral',
    siteName: 'Zitruus',
    images: [
      {
        url: 'https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png',
        width: 800,
        height: 600,
        alt: 'Zitruus Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Referral Program | Zitruus',
    description: 'Refer companies to Zitruus and earn commission on successful placements.',
    images: ['https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png'],
  },
  alternates: {
    canonical: 'https://zitruus.com/referral',
  },
};

// Main component - Server Component
export default function Referral() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <ReferralContent />
      </main>
      <Footer />
    </>
  );
} 