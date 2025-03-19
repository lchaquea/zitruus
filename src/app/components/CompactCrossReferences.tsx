'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BlogPost } from '../blog/types';
import { motion } from 'framer-motion';

interface CompactCrossReferencesProps {
  title: string;
  posts: BlogPost[];
  type: 'series' | 'contextual' | 'bidirectional';
  currentPostId: number;
}

export default function CompactCrossReferences({ title, posts, type, currentPostId }: CompactCrossReferencesProps) {
  if (!posts || posts.length === 0) return null;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  };
  
  // Sort series posts by ID to maintain sequence
  const sortedPosts = type === 'series' 
    ? [...posts].sort((a, b) => a.id - b.id)
    : posts;
  
  // Take only the first 2 posts to keep it compact
  const limitedPosts = sortedPosts.slice(0, 2);
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`my-3 p-3 rounded-lg ${
        type === 'series' 
          ? 'bg-brand-lime bg-opacity-5 border border-brand-lime border-opacity-30' 
          : 'bg-dark-300 border-l-2 border-brand-lime'
      }`}
    >
      <div className="flex items-center mb-2">
        <BookOpen size={14} className="mr-2 text-brand-lime" />
        <h3 className="text-sm font-bold text-white">
          {title}
        </h3>
        {posts.length > 2 && (
          <Link href="/blog" className="ml-auto text-xs text-brand-lime hover:underline">
            View all
          </Link>
        )}
      </div>
      
      <div className="space-y-2">
        {limitedPosts.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
            <div className="flex items-center">
              <div className="flex-grow">
                <h4 className="text-sm text-white group-hover:text-brand-lime transition-colors line-clamp-1">
                  {post.title}
                </h4>
              </div>
              <ArrowRight size={12} className="flex-shrink-0 text-brand-lime ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
} 