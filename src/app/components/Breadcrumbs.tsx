'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
  hideFromUI?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  // Generate structured data for breadcrumbs (include all items for SEO)
  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    'itemListElement': items.map((item, index) => ({
      '@type': 'ListItem',
      'position': index + 1,
      'item': {
        '@id': `https://zitruus.com${item.href}`,
        'name': item.label
      }
    }))
  };

  // Filter out items that should be hidden from UI
  const visibleItems = items.filter(item => !item.hideFromUI);

  return (
    <>
      {/* Add structured data for breadcrumbs */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      
      {/* Render breadcrumbs UI */}
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex items-center space-x-1 text-sm">
          {visibleItems.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight size={14} className="mx-1 text-gray-500" />
              )}
              
              {item.isCurrentPage ? (
                <span className="text-gray-400" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link 
                  href={item.href}
                  className="text-brand-lime hover:underline"
                >
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
} 