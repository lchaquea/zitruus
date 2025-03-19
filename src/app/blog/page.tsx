import React from 'react';
import { Metadata } from 'next';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { blogPosts } from './blogData';
import dynamic from 'next/dynamic';

// Import the client component with dynamic import to avoid 'use client' directive issues
const BlogListingContent = dynamic(() => import('../components/BlogListingContent'), { ssr: true });

// Generate metadata for the blog listing page
export const metadata: Metadata = {
  title: 'Blog | Zitruus - Insights on LATAM Talent',
  description: 'Explore insights, guides, and best practices for hiring and managing top LATAM talent. Learn how to optimize your team with Latin American professionals.',
  keywords: 'LATAM talent, hiring, remote work, Latin American professionals, outsourcing, global teams',
  openGraph: {
    title: 'Zitruus Blog - Insights on LATAM Talent',
    description: 'Explore insights, guides, and best practices for hiring and managing top LATAM talent.',
    url: 'https://zitruus.com/blog',
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
    title: 'Zitruus Blog - Insights on LATAM Talent',
    description: 'Explore insights, guides, and best practices for hiring and managing top LATAM talent.',
    images: ['https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png'],
  },
  alternates: {
    canonical: 'https://zitruus.com/blog',
  },
};

// Define the type for the page props
type BlogPageProps = {
  searchParams: { [key: string]: string | string[] | undefined };
};

// Main component - now a Server Component
export default function Blog({ searchParams }: BlogPageProps) {
  // Get category and tag from search params
  const categoryParam = searchParams.category as string | undefined;
  const tagParam = searchParams.tag as string | undefined;
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <BlogListingContent 
          initialPosts={blogPosts}
          initialCategory={categoryParam || null}
          initialTag={tagParam || null}
        />
      </main>
      <Footer />
    </>
  );
} 