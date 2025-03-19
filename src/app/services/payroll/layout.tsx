import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Global Payroll Solutions for LATAM Teams | Zitruus',
  description: 'Streamline your LATAM payroll operations with our comprehensive payroll management solutions. Ensure compliance, accuracy, and timely payments across multiple countries.',
  keywords: ['LATAM Payroll', 'Global Payroll', 'Payroll Management', 'International Payroll', 'Multi-country Payroll'],
  openGraph: {
    title: 'Global Payroll Solutions for LATAM Teams | Zitruus',
    description: 'Streamline your LATAM payroll operations with our comprehensive payroll management solutions.',
    images: ['/assets/images/payroll-og.svg'],
  },
  alternates: {
    canonical: 'https://zitruus.com/services/payroll'
  }
};

export default function PayrollLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 