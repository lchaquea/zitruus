import { Metadata } from 'next';
import { blogPosts } from '../blogData';

// Generate metadata for each blog post
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = blogPosts.find(post => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Blog Post Not Found | Zitruus',
      description: 'This blog post could not be found or has been moved.',
    };
  }

  return {
    metadataBase: new URL('https://zitruus.com'),
    title: `${post.title} | Zitruus Blog`,
    description: post.excerpt,
    keywords: [...post.tags, 'LATAM', 'Tech Talent', 'HR Management', post.category],
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
    alternates: {
      canonical: `https://zitruus.com/blog/${post.slug}`
    }
  };
}

export default function BlogPostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 