import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HR Management Solutions | Zitruus',
  description: 'Transform your HR operations with our comprehensive HR management solutions for LATAM teams. Streamline processes, ensure compliance, and boost employee satisfaction.',
  keywords: ['HR Management', 'LATAM HR', 'HR Solutions', 'Employee Management', 'HR Compliance'],
  openGraph: {
    title: 'HR Management Solutions | Zitruus',
    description: 'Transform your HR operations with our comprehensive HR management solutions for LATAM teams.',
    images: ['/assets/images/hr-management-og.svg'],
  },
  alternates: {
    canonical: 'https://zitruus.com/services/hr-management'
  }
};

export default function HRManagementLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 