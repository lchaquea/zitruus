import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Employer of Record (EoR) Services for LATAM | Zitruus',
  description: 'Simplify your LATAM expansion with our Employer of Record services. Hire and manage employees legally and compliantly across Latin America.',
  keywords: ['Employer of Record', 'EoR Services', 'LATAM Employment', 'Global Expansion', 'International Hiring'],
  openGraph: {
    title: 'Employer of Record (EoR) Services for LATAM | Zitruus',
    description: 'Simplify your LATAM expansion with our Employer of Record services.',
    images: ['/assets/images/eor-og.svg'],
  },
  alternates: {
    canonical: 'https://zitruus.com/services/eor'
  }
};

export default function EoRLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 