import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Zitruus Leadership Team',
  description: 'Meet the visionary team behind Zitruus. Our leadership combines expertise in talent acquisition, technology, and Latin American markets to revolutionize global hiring.',
  keywords: ['Zitruus team', 'leadership', 'talent acquisition', 'LATAM experts', 'global hiring'],
  openGraph: {
    title: 'About Us - Zitruus Leadership Team',
    description: 'Meet the visionary team behind Zitruus. Our leadership combines expertise in talent acquisition, technology, and Latin American markets to revolutionize global hiring.',
    url: 'https://zitruus.com/about',
    siteName: 'Zitruus',
    images: [
      {
        url: 'https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png',
        width: 800,
        height: 600,
        alt: 'Zitruus Team',
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Zitruus Leadership Team',
    description: 'Meet the visionary team behind Zitruus. Our leadership combines expertise in talent acquisition, technology, and Latin American markets to revolutionize global hiring.',
    images: ['https://zitruus.com/assets/logos/Logos_Zitruus_Mesa de trabajo 1 copia.png'],
  },
  alternates: {
    canonical: 'https://zitruus.com/about',
  },
}; 