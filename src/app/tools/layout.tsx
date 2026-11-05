import { Metadata } from 'next';
import { buildHreflangAlternates } from '@/lib/i18n/seo-helpers';

export const metadata: Metadata = {
  title: 'Free Online Tools | Rovelin Studio',
  description: 'Collection of free online tools for developers and professionals. Text converters, formatters, generators, and more.',
  alternates: {
    canonical: 'https://www.rovelin.com/tools',
    languages: buildHreflangAlternates(),
  },
  openGraph: {
    title: 'Free Online Developer Tools | Rovelin Studio',
    description: 'Collection of free online tools for developers and professionals. Text converters, formatters, generators, and more.',
    url: 'https://www.rovelin.com/tools',
    siteName: 'Rovelin Studio',
    images: [
      {
        url: '/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Rovelin Studio Developer Tools'
      }
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Free Online Developer Tools | Rovelin Studio',
    description: 'Collection of free online tools for developers and professionals.',
    images: ['/images/og-image.png'],
  }
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
