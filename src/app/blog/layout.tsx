import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://zitruus.com'),
  title: 'LATAM Tech & HR Insights Blog | Zitruus',
  description: 'Expert insights on LATAM tech talent, HR management, and global team building. Stay updated with industry trends, best practices, and success stories.',
  keywords: ['LATAM Tech Blog', 'HR Insights', 'Global Team Management', 'Tech Recruitment', 'LATAM Business'],
  openGraph: {
    type: 'website',
    title: 'LATAM Tech & HR Insights Blog | Zitruus',
    description: 'Expert insights on LATAM tech talent, HR management, and global team building.',
    images: ['/assets/images/blog-og.svg'],
  },
  alternates: {
    canonical: 'https://zitruus.com/blog'
  }
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 