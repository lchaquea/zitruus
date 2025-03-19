import { MetadataRoute } from 'next';
import { getAllJobs } from '../services/airtable';
import { blogPosts } from './blog/blogData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Base URL for the site
  const baseUrl = 'https://zitruus.com';
  
  // Get all jobs for dynamic routes
  const jobs = await getAllJobs();
  
  // Create job URLs
  const jobUrls = jobs.map((job) => {
    // Use jobId if available, otherwise use record ID
    const jobId = job.jobId || job.id;
    return {
      url: `${baseUrl}/jobs/${jobId}`,
      lastModified: job.postedDate ? new Date(job.postedDate) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    };
  });
  
  // Create blog post URLs
  const blogUrls = blogPosts.map((post) => {
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.modifiedDate ? new Date(post.modifiedDate) : 
                    post.publishedDate ? new Date(post.publishedDate) : 
                    new Date(post.date),
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    };
  });
  
  // Static routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/careers`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];
  
  // Combine static and dynamic routes
  return [...routes, ...jobUrls, ...blogUrls];
} 