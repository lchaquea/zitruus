export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  author: string;
  slug: string;
  tags: string[];
  publishedDate?: string; // ISO date format for structured data
  modifiedDate?: string; // ISO date format for structured data
  featuredImage?: string; // URL to featured image
  readingTime?: string; // Estimated reading time
  metaDescription?: string; // Custom meta description (falls back to excerpt)
  metaKeywords?: string[]; // Custom meta keywords (falls back to tags)
} 