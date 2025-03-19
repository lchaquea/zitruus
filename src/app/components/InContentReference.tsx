'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { BlogPost } from '../blog/types';

interface InContentReferenceProps {
  post: BlogPost;
  context?: string;
}

export default function InContentReference({ post, context }: InContentReferenceProps) {
  return (
    <div className="my-3 p-3 bg-dark-300 border-l-2 border-brand-lime rounded-r-lg">
      <div className="flex items-center">
        <div className="flex-grow">
          <Link href={`/blog/${post.slug}`} className="group flex items-center">
            <div>
              <div className="text-xs text-brand-lime mb-0.5">
                {context ? `${context}:` : 'Related Article:'}
              </div>
              <h4 className="text-sm text-white font-medium group-hover:text-brand-lime transition-colors line-clamp-1">
                {post.title}
              </h4>
            </div>
            <ExternalLink size={12} className="text-brand-lime ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </div>
  );
} 