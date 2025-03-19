import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';
import Link from 'next/link';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { ArrowLeft } from 'lucide-react';
import { blogPosts, getAuthorByName } from '../blogData';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';
import { authors } from '../authors';
import type { BlogPost } from '../types';  // Import the BlogPost type

// Import the client component with dynamic import to avoid 'use client' directive issues
const BlogPostContent = dynamic(() => import('../../components/BlogPostContent'), { ssr: true });
const BackToTop = dynamic(() => import('../../components/BackToTop'), { ssr: false });

// Define the type for the page props
type BlogPostPageProps = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Generate metadata for the blog post page
export async function generateMetadata(
  { params }: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { slug } = params;
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Zitruus Blog',
      description: 'The requested blog post could not be found.',
    };
  }

  // Find the author
  const author = getAuthorByName(post.author);
  
  // Get the parent metadata
  const previousImages = (await parent).openGraph?.images || [];
  
  // Create structured data for the blog post
  const blogPostSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.metaDescription || post.excerpt,
    "image": post.featuredImage || 'https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png',
    "datePublished": post.publishedDate || post.date,
    "dateModified": post.modifiedDate || post.date,
    "author": {
      "@type": "Person",
      "name": author.name,
      "url": author.website || "https://zitruus.com/about",
      "jobTitle": author.role,
      "image": author.image,
      "description": author.bio
    },
    "publisher": {
      "@type": "Organization",
      "name": "Zitruus",
      "logo": {
        "@type": "ImageObject",
        "url": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://zitruus.com/blog/${slug}`
    },
    "keywords": post.tags.join(", "),
    "articleSection": post.category,
    "wordCount": post.excerpt.split(/\s+/).length,
    "timeRequired": post.readingTime || "PT5M",
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "hasPart": [
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#introduction"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#why-latam-talent"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#unique-insights"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#actionable-strategies"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#how-zitruus-helps"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#getting-started"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#conclusion"
      },
      {
        "@type": "WebPageElement",
        "isAccessibleForFree": true,
        "cssSelector": "#faq"
      }
    ]
  };

  // Add FAQ schema if the post has FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What makes LATAM talent unique?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Latin American professionals offer a unique combination of technical expertise, cultural alignment with US business practices, and favorable time zone overlap. They typically have strong English language skills, are familiar with US business culture, and work in time zones that substantially overlap with US business hours."
        }
      },
      {
        "@type": "Question",
        "name": "How can I get started with hiring LATAM talent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The best way to get started is to schedule a consultation with our team. We'll help you understand the process, assess your needs, and create a tailored strategy for building your LATAM team."
        }
      }
    ]
  };

  // Add category-specific FAQ questions
  if (post.category === "Remote Hiring & Talent Acquisition") {
    faqSchema.mainEntity.push(
      {
        "@type": "Question",
        "name": "How long does it take to hire LATAM talent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The hiring process typically takes 2-3 weeks from initial search to onboarding. This includes candidate sourcing, interviews, technical assessments, and contract signing."
        }
      },
      {
        "@type": "Question",
        "name": "What are the cost savings when hiring LATAM talent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Companies typically save 40-70% on talent costs when hiring LATAM professionals compared to US-based hires, without compromising on quality."
        }
      }
    );
  } else if (post.category === "HR, Payroll, & Compliance") {
    faqSchema.mainEntity.push(
      {
        "@type": "Question",
        "name": "How do you handle payroll and benefits for LATAM employees?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Through an Employer of Record (EoR) service like Zitruus, we handle all payroll, benefits, and compliance requirements in accordance with local labor laws."
        }
      },
      {
        "@type": "Question",
        "name": "What are the main compliance considerations?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Key compliance considerations include proper employment contracts, adherence to local labor laws, tax regulations, data protection requirements, and mandatory benefits."
        }
      }
    );
  }

  // Update the image handling
  const previousImagesFromPost = post.featuredImage ? [{
    url: post.featuredImage,
    width: 1200,
    height: 630,
    alt: post.title,
  }] : [];

  // Set metadataBase to fix the warning
  return {
    title: `${post.title} | Zitruus Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.metaKeywords?.join(", ") || post.tags.join(", "),
    metadataBase: new URL('https://zitruus.com'),
    openGraph: {
      title: post.title,
      description: post.metaDescription || post.excerpt,
      url: `https://zitruus.com/blog/${slug}`,
      siteName: 'Zitruus Blog',
      images: [
        {
          url: post.featuredImage || 'https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png',
          width: 1200,
          height: 630,
          alt: post.title,
        },
        ...previousImagesFromPost,
      ],
      locale: 'en_US',
      type: 'article',
      publishedTime: post.publishedDate || post.date,
      modifiedTime: post.modifiedDate,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.metaDescription || post.excerpt,
      images: [post.featuredImage || 'https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png'],
      creator: '@ZitruusTalent',
      site: '@ZitruusTalent',
    },
    alternates: {
      canonical: `https://zitruus.com/blog/${slug}`,
      languages: {
        'en-US': `https://zitruus.com/blog/${slug}`,
      },
    },
    other: {
      'application-ld+json': [
        JSON.stringify(blogPostSchema),
        JSON.stringify(faqSchema)
      ],
    },
  };
}

// Main component - Server Component
export default function BlogPost({ params }: BlogPostPageProps) {
  const { slug } = params;
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    notFound();
  }
  
  const author = getAuthorByName(post.author);
  
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <BlogPostContent post={post} author={author} />
        <BackToTop threshold={400} />
      </main>
    </>
  );
} 