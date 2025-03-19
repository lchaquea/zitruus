import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "./contexts/LanguageContext";
import { metadata as homeMetadata } from './page-metadata';
import { Toaster } from 'react-hot-toast';
import { CalendlyButton } from "./components/CalendlyButton";
import { Suspense } from 'react';
import Loading from './loading';

const inter = Inter({ subsets: ["latin"] });

// Merge the existing metadata with our home page metadata
export const metadata: Metadata = {
  ...homeMetadata,
  icons: {
    icon: '/assets/logos/zitruusfavicon.ico',
    shortcut: '/assets/logos/zitruusfavicon.ico',
    apple: '/assets/logos/zitruusfavicon.ico',
    other: {
      rel: 'icon',
      url: '/assets/logos/zitruusfavicon.ico',
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://assets.calendly.com/assets/external/widget.css" rel="stylesheet" />
        <script src="https://assets.calendly.com/assets/external/widget.js" type="text/javascript" async></script>
        <link rel="icon" href="/assets/logos/zitruusfavicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta httpEquiv="Content-Language" content="en, es" />
        <link rel="alternate" href="/" hrefLang="en" />
        <link rel="alternate" href="/" hrefLang="es" />
      </head>
      <body className={`${inter.className} bg-dark-500 text-gray-100 antialiased min-h-screen overflow-x-hidden`}>
        <LanguageProvider>
          <div suppressHydrationWarning>
            {children}
            <CalendlyButton variant="fixed" />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#333',
                  color: '#fff',
                  border: '1px solid #444',
                },
                success: {
                  iconTheme: {
                    primary: '#E1F473',
                    secondary: '#000',
                  },
                },
              }}
            />
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
} 