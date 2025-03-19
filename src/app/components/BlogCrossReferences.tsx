'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { BlogPost } from '../blog/types';
import { motion } from 'framer-motion';

interface BlogCrossReferencesProps {
  title: string;
  posts: BlogPost[];
  type: 'series' | 'contextual' | 'bidirectional';
  currentPostId: number;
}

export default function BlogCrossReferences({ title, posts, type, currentPostId }: BlogCrossReferencesProps) {
  if (!posts || posts.length === 0) return null;
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };
  
  // Sort series posts by ID to maintain sequence
  const sortedPosts = type === 'series' 
    ? [...posts].sort((a, b) => a.id - b.id)
    : posts;
  
  // Determine the current post's position in the series
  let currentIndex = -1;
  if (type === 'series') {
    // Create a combined array with current post and series posts
    const allSeriesPosts = [...sortedPosts];
    // Find the current post in the combined array
    currentIndex = allSeriesPosts.findIndex(post => post.id === currentPostId);
  }
  
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className={`my-8 p-6 rounded-lg ${
        type === 'series' 
          ? 'bg-brand-lime bg-opacity-10 border border-brand-lime' 
          : type === 'contextual'
            ? 'bg-dark-300 border-l-4 border-brand-lime'
            : 'bg-dark-300 border border-gray-700'
      }`}
    >
      <h3 className="text-xl font-bold text-white mb-4 flex items-center">
        <BookOpen size={18} className="mr-2 text-brand-lime" />
        {title}
      </h3>
      
      {type === 'series' && (
        <div className="mb-4">
          <div className="flex items-center mb-2">
            <div className="h-1 bg-gray-700 flex-grow rounded-full overflow-hidden">
              <div 
                className="h-full bg-brand-lime" 
                style={{ width: `${((currentIndex + 1) / (sortedPosts.length + 1)) * 100}%` }}
              ></div>
            </div>
          </div>
          <div className="text-sm text-gray-400">
            Part {currentIndex + 1} of {sortedPosts.length + 1}
          </div>
        </div>
      )}
      
      <div className="space-y-3">
        {sortedPosts.map((post, index) => (
          <Link href={`/blog/${post.slug}`} key={post.id} className="block group">
            <div className="flex items-start">
              {type === 'series' && (
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-dark-300 flex items-center justify-center mr-3 border border-gray-700">
                  <span className="text-sm font-medium text-brand-lime">
                    {post.id < currentPostId ? index + 1 : index + 2}
                  </span>
                </div>
              )}
              <div className="flex-grow">
                <h4 className="text-white font-medium group-hover:text-brand-lime transition-colors">
                  {post.title}
                </h4>
                <p className="text-gray-400 text-sm mt-1 line-clamp-1">{post.excerpt}</p>
              </div>
              <ArrowRight size={16} className="flex-shrink-0 text-brand-lime mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
} 