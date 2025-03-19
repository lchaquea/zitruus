'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Star, ChevronRight, Quote } from 'lucide-react';
import { successStories } from '../components/SuccessStoryCard';

// Create structured data for success stories
const successStoriesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": successStories.map((story, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": "Article",
      "headline": `${story.company} Success Story`,
      "description": story.challenge,
      "image": story.logo,
      "author": {
        "@type": "Organization",
        "name": "Zitruus"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Zitruus",
        "logo": {
          "@type": "ImageObject",
          "url": "https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png"
        }
      },
      "about": {
        "@type": "Thing",
        "name": story.industry
      }
    }
  }))
};

export default function SuccessStories() {
  const [selectedIndustry, setSelectedIndustry] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  
  // Get unique industries
  const industries = ['All', ...Array.from(new Set(successStories.map(story => story.industry)))];
  
  // Filter stories based on selected industry
  const filteredStories = successStories.filter(story => 
    (selectedIndustry === 'All' || story.industry === selectedIndustry) &&
    (story.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
     story.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
     story.challenge.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  // Featured stories
  const featuredStories = successStories.filter(story => story.featured);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 bg-black">
        {/* Add JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(successStoriesSchema) }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">Success Stories</h1>
            <p className="text-xl text-gray-400">
              See how companies are transforming their teams and achieving their goals with Zitruus.
            </p>
          </div>
          
          {/* Featured Success Story */}
          <div className="mb-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-dark-300/50 backdrop-blur-sm rounded-xl border border-gray-800 p-8">
              {featuredStories.length > 0 && (
                <>
                  <div>
                    <div className="flex items-center mb-4">
                      <Star className="text-brand-lime mr-2" />
                      <h2 className="text-xl font-semibold text-brand-lime">Featured Success Story</h2>
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
                      {featuredStories[0].company}: {featuredStories[0].challenge}
                    </h3>
                    <div className="mb-6">
                      <h4 className="text-lg font-semibold text-white mb-2">Results:</h4>
                      <ul className="space-y-2">
                        {featuredStories[0].results.map((result, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-brand-lime mr-2">✓</span>
                            <span className="text-gray-300">{result}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-dark-400 p-4 rounded-lg mb-6">
                      <div className="flex items-start gap-4">
                        <div className="text-brand-lime text-4xl font-serif">"</div>
                        <p className="text-gray-300 italic">{featuredStories[0].testimonial.quote}</p>
                      </div>
                      <div className="flex items-center mt-4 ml-8">
                        <div className="mr-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden relative">
                            <Image 
                              src={featuredStories[0].testimonial.image || "/assets/images/placeholder.svg"} 
                              alt={featuredStories[0].testimonial.author}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-white">{featuredStories[0].testimonial.author}</p>
                          <p className="text-gray-400 text-sm">{featuredStories[0].testimonial.title}</p>
                        </div>
                      </div>
                    </div>
                    <Link 
                      href={`/success-stories/${featuredStories[0].id}`}
                      className="inline-flex items-center text-brand-lime hover:underline"
                    >
                      Read full story <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                  <div className="relative h-[400px] rounded-lg overflow-hidden">
                    <Image
                      src={featuredStories[0].testimonial.image || "/assets/images/placeholder.svg"}
                      alt={featuredStories[0].company}
                      fill
                      className="object-cover"
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          
          {/* Search and Filter */}
          <div className="mb-12">
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search success stories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-4 py-3 bg-dark-300 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 transition-all duration-300"
                />
              </div>
              <div className="relative">
                <select
                  value={selectedIndustry}
                  onChange={(e) => setSelectedIndustry(e.target.value)}
                  className="w-full md:w-48 pl-4 pr-8 py-3 bg-dark-300 border border-gray-800 rounded-lg text-white appearance-none focus:outline-none focus:border-brand-lime focus:ring-2 focus:ring-brand-lime/20 transition-all duration-300"
                >
                  {industries.map(industry => (
                    <option key={industry} value={industry}>{industry}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Success Stories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <Link key={story.id} href={`/success-stories/${story.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="bg-dark-300 rounded-xl p-6 border border-gray-800 hover:border-brand-lime transition-all duration-300 h-full flex flex-col"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-white">{story.company}</h3>
                      <p className="text-brand-lime text-sm">{story.industry}</p>
                    </div>
                    <p className="text-gray-400 text-sm mb-4 flex-grow">{story.challenge}</p>
                    <div className="flex justify-end">
                      <span className="text-brand-lime text-sm flex items-center">
                        Read more <ChevronRight size={16} className="ml-1" />
                      </span>
                    </div>
                  </motion.div>
                </Link>
              ))}
              
              {/* Be Our Next Success Story Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="relative bg-dark-300 rounded-xl p-6 border border-gray-800 hover:border-brand-lime transition-all duration-300 h-full flex flex-col overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-brand-lime/[0.08] to-transparent" />
                <div className="relative">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">Be Our Next Success Story</h3>
                    <Star className="text-brand-lime" size={20} />
                  </div>
                  <p className="text-gray-400 text-sm mb-4">
                    Your success story starts here. Join the ranks of thriving companies that have discovered exceptional LATAM talent through Zitruus. Enjoy first deal benefits now.
                  </p>
                  <div className="flex justify-end">
                    <Link href="/contact" className="text-brand-lime text-sm flex items-center hover:underline">
                      Start Your Success Story <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
} 