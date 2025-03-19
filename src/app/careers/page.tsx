'use client';

import React from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { getAllJobs } from '../../services/airtable';
import { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import Link from 'next/link';

export default function Careers() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    async function fetchJobs() {
      try {
        setLoading(true);
        const jobsData = await getAllJobs();
        setJobs(jobsData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError('Failed to load jobs. Please try again later.');
        setLoading(false);
      }
    }

    fetchJobs();
  }, []);

  // Filter jobs based on search term
  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.skills && job.skills.some(skill => 
      skill.toLowerCase().includes(searchTerm.toLowerCase())
    ))
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-black pt-24">
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl sm:text-5xl font-bold text-white mb-6">
                Careers
              </h1>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Find your next opportunity with top companies hiring LATAM talent
              </p>
            </div>

            <div className="mb-8">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-dark-300 border border-gray-800 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-primary-600 transition-colors duration-200"
                />
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-lime"></div>
              </div>
            ) : error ? (
              <div className="p-8 rounded-xl bg-dark-300 border border-gray-800 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  Error Loading Jobs
                </h3>
                <p className="text-gray-400 mb-4">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Retry
                </button>
              </div>
            ) : filteredJobs.length > 0 ? (
              <div className="grid gap-6">
                {filteredJobs.map((job) => (
                  <div key={job.id} className="p-6 rounded-xl bg-dark-300 border border-gray-800 hover:border-primary-600 transition-all duration-300">
                    <h3 className="text-xl font-semibold text-white">{job.title}</h3>
                    <p className="text-primary-500 mt-1">{job.company || 'Company'}</p>
                    <div className="mt-3 flex flex-wrap gap-4 text-gray-400">
                      <span>{job.location || 'Remote'}</span>
                      <span>{job.type || 'Full-time'}</span>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {job.skills && job.skills.slice(0, 4).map((skill) => (
                        <span
                          key={skill}
                          className="px-3 py-1 text-sm bg-primary-600/20 text-primary-500 rounded-full"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-xl bg-dark-300 border border-gray-800 text-center">
                <h3 className="text-xl font-semibold text-white mb-2">
                  No jobs match your criteria
                </h3>
                <p className="text-gray-400 mb-4">
                  Try adjusting your search to find more opportunities.
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Clear Search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
} 