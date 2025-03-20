import { MetadataRoute } from 'next';
import { getAllJobs } from '../services/airtable';
import { blogPosts } from './blog/blogData';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://zitruus.com';
  
  // Static routes (these will always be included)
  const staticRoutes = [
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

  // Blog post URLs (these are static and will always work)
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.modifiedDate || post.publishedDate || post.date),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  // Dynamic job routes (these might fail, but we handle it gracefully)
  let jobRoutes: MetadataRoute.Sitemap = [];
  try {
    const jobs = await getAllJobs().catch(() => []);
    jobRoutes = (jobs || []).map((job) => ({
      url: `${baseUrl}/jobs/${job.jobId || job.id}`,
      lastModified: job.postedDate ? new Date(job.postedDate) : new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    }));
  } catch (error) {
    console.warn('Failed to generate job routes for sitemap:', error);
    // Continue without job routes
  }

  // Combine all routes, with static routes taking precedence
  return [...staticRoutes, ...blogRoutes, ...jobRoutes];
} 