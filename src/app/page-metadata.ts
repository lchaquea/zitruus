import { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://zitruus.com'),
  title: 'Zitruus | Connect Top LATAM Talent with US Companies',
  description: 'Hire top LATAM talent and cut your HR costs by 80% while keeping high performance. We handle recruiting, HR, payroll, and compliance.',
  keywords: ['LATAM talent', 'remote hiring', 'HR solutions', 'tech recruitment', 'Latin America talent', 'global workforce', 'talent acquisition'],
  openGraph: {
    title: 'Zitruus | Connect Top LATAM Talent with US Companies',
    description: 'Hire top LATAM talent and cut your HR costs by 80% while keeping high performance. We handle recruiting, HR, payroll, and compliance.',
    url: 'https://zitruus.com',
    siteName: 'Zitruus',
    images: [
      {
        url: '/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png',
        width: 800,
        height: 600,
        alt: 'Zitruus',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zitruus | Connect Top LATAM Talent with US Companies',
    description: 'Hire top LATAM talent and cut your HR costs by 80% while keeping high performance. We handle recruiting, HR, payroll, and compliance.',
    images: ['/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png'],
  },
  alternates: {
    canonical: 'https://zitruus.com',
  },
}; 