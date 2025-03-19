import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Performance Management Solutions for LATAM Teams | Zitruus',
  description: 'Optimize your LATAM team performance with our comprehensive performance management solutions. Drive growth, track progress, and develop talent effectively.',
  keywords: ['Performance Management', 'LATAM Teams', 'Employee Development', 'Talent Management', 'Performance Reviews'],
  openGraph: {
    title: 'Performance Management Solutions for LATAM Teams | Zitruus',
    description: 'Optimize your LATAM team performance with our comprehensive performance management solutions.',
    images: ['/assets/images/performance-og.svg'],
  },
  alternates: {
    canonical: 'https://zitruus.com/services/performance'
  }
};

export default function PerformanceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 