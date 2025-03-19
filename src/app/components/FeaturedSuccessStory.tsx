'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import SuccessStoryCard, { successStories, SuccessStory } from './SuccessStoryCard';

interface FeaturedSuccessStoryProps {
  storyId?: number; // Optional ID to specify which story to feature
  variant?: 'full' | 'compact' | 'testimonial' | 'featured';
  className?: string;
  showTitle?: boolean;
  showLink?: boolean;
}

const FeaturedSuccessStory: React.FC<FeaturedSuccessStoryProps> = ({ 
  storyId, 
  variant = 'featured',
  className = '',
  showTitle = true,
  showLink = true
}) => {
  // If storyId is provided, use that story; otherwise, get a random featured story
  const story: SuccessStory = storyId 
    ? successStories.find(s => s.id === storyId) || successStories.filter(s => s.featured)[0]
    : successStories.filter(s => s.featured)[Math.floor(Math.random() * successStories.filter(s => s.featured).length)];

  return (
    <div className={`${className}`}>
      {showTitle && (
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">Success Story</h2>
            {showLink && (
              <Link 
                href="/success-stories" 
                className="text-brand-lime flex items-center text-sm hover:underline"
              >
                View all stories <ChevronRight size={16} className="ml-1" />
              </Link>
            )}
          </div>
          <div className="h-px bg-gray-800 w-full mt-4"></div>
        </div>
      )}

      <SuccessStoryCard story={story} variant={variant} showLink={showLink} />
    </div>
  );
};

export default FeaturedSuccessStory; 