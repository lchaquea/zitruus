'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, ArrowRight } from 'lucide-react';
import { BlogPost } from '../blog/types';

interface RelatedPostsProps {
  posts: BlogPost[];
  currentPostId: number;
  title?: string;
}

export default function RelatedPosts({ 
  posts, 
  currentPostId, 
  title = "You May Also Like" 
}: RelatedPostsProps) {
  // Filter out the current post
  const filteredPosts = posts.filter(post => post.id !== currentPostId);
  
  // Only show up to 3 related posts
  const displayPosts = filteredPosts.slice(0, 3);
  
  // If no related posts, don't render anything
  if (displayPosts.length === 0) {
    return null;
  }
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="mt-12 mb-8">
      <h3 className="text-2xl font-bold text-white mb-6">{title}</h3>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {displayPosts.map((post) => (
          <motion.div 
            key={post.id} 
            variants={itemVariants}
            className="bg-dark-300 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <Link href={`/blog/${post.slug}`} className="block group">
              {post.featuredImage && (
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={post.featuredImage}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="p-4">
                <div className="flex items-center text-gray-400 text-sm mb-2">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{post.date}</span>
                  {post.readingTime && (
                    <span className="ml-3">{post.readingTime}</span>
                  )}
                </div>
                
                <h4 className="text-lg font-semibold text-white group-hover:text-brand-lime transition-colors line-clamp-2 mb-2">
                  {post.title}
                </h4>
                
                <p className="text-gray-400 text-sm line-clamp-2 mb-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center text-brand-lime text-sm font-medium">
                  <span>Read more</span>
                  <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
} 