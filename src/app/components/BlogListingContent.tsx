'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Search, Calendar, User, Tag } from 'lucide-react';
import { BlogPost } from '../blog/types';

interface BlogListingContentProps {
  initialPosts: BlogPost[];
  initialCategory?: string | null;
  initialTag?: string | null;
}

export default function BlogListingContent({ 
  initialPosts,
  initialCategory,
  initialTag
}: BlogListingContentProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || '');
  const [selectedTag, setSelectedTag] = useState(initialTag || '');
  
  // Get unique categories and tags
  const categories = Array.from(new Set(initialPosts.map(post => post.category)));
  const tags = Array.from(new Set(initialPosts.flatMap(post => post.tags)));
  
  // Filter posts based on search, category, and tag
  const filteredPosts = initialPosts.filter(post => {
    const matchesSearch = searchTerm === '' || 
                         post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === '' || post.category === selectedCategory;
    const matchesTag = selectedTag === '' || post.tags.includes(selectedTag);
    
    return matchesSearch && matchesCategory && matchesTag;
  });

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl font-bold text-white mb-6"
          >
            Zitruus Blog
          </motion.h1>
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Insights, guides, and best practices for hiring and managing top LATAM talent
          </motion.p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="max-w-3xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search articles by title, content, or tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-dark-300 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors duration-200"
            />
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-3 mb-6"
        >
          <button
            onClick={() => {
              setSelectedCategory('');
              setSelectedTag('');
            }}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
              selectedCategory === '' && selectedTag === '' 
                ? 'bg-brand-lime text-black' 
                : 'bg-dark-300 text-gray-400 hover:bg-dark-400'
            }`}
          >
            All Categories
          </button>
          
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setSelectedCategory(category);
                setSelectedTag('');
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                selectedCategory === category 
                  ? 'bg-brand-lime text-black' 
                  : 'bg-dark-300 text-gray-400 hover:bg-dark-400'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {selectedTag && (
          <motion.div
            variants={itemVariants}
            className="flex justify-center mb-12"
          >
            <div className="bg-dark-300 px-4 py-2 rounded-lg flex items-center">
              <span className="text-white mr-2">Filtered by tag:</span>
              <span className="px-3 py-1 bg-dark-400 text-brand-lime rounded-full text-sm flex items-center">
                <Tag size={12} className="mr-1" />
                {selectedTag}
                <button 
                  onClick={() => setSelectedTag('')}
                  className="ml-2 text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </span>
            </div>
          </motion.div>
        )}

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              variants={itemVariants}
              className="bg-dark-300 rounded-xl overflow-hidden border border-gray-800 hover:border-brand-lime transition-all duration-300"
            >
              <Link href={`/blog/${post.slug}`} className="block h-full">
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center text-sm text-gray-400 mb-3">
                    <Calendar size={14} className="mr-1" />
                    <span>{post.date}</span>
                    <span className="mx-2">•</span>
                    <User size={14} className="mr-1" />
                    <span>{post.author}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold text-white mb-3 line-clamp-2">{post.title}</h2>
                  
                  <p className="text-gray-400 mb-4 flex-grow line-clamp-3">{post.excerpt}</p>
                  
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {post.tags.slice(0, 3).map((tag) => (
                      <span 
                        key={tag} 
                        className={`inline-flex items-center text-xs ${
                          tag === selectedTag ? 'text-white bg-brand-lime bg-opacity-20 px-2 py-1 rounded-full' : 'text-brand-lime'
                        }`}
                      >
                        <Tag size={12} className="mr-1" />
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 text-brand-lime font-medium">
                    Read more →
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {filteredPosts.length === 0 && (
          <motion.div
            variants={itemVariants}
            className="text-center py-12"
          >
            <h3 className="text-2xl font-bold text-white mb-4">No posts found</h3>
            <p className="text-gray-400">
              Try adjusting your search or filter criteria to find what you're looking for.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
                setSelectedTag('');
              }}
              className="mt-6 px-6 py-3 bg-brand-lime text-black rounded-lg font-medium hover:bg-opacity-90 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
} 