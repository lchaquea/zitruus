'use client';

import React from 'react';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { BlogPost } from '../blog/types';

interface InlineReferenceProps {
  post: BlogPost;
  text?: string;
}

export default function InlineReference({ post, text }: InlineReferenceProps) {
  return (
    <span className="inline-flex items-center text-brand-lime hover:underline group">
      <Link href={`/blog/${post.slug}`} className="inline-flex items-center">
        {text || "Read more about this topic"}
        <ExternalLink size={12} className="ml-1 opacity-70 group-hover:opacity-100" />
      </Link>
    </span>
  );
} 