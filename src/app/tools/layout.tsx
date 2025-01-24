import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free Online Tools | Rovelin Studio',
  description: 'Collection of free online tools for developers and professionals. Text converters, formatters, generators, and more.',
  openGraph: {
    title: 'Free Online Developer Tools | Rovelin Studio',
    description: 'Collection of free online tools for developers and professionals. Text converters, formatters, generators, and more.',
    url: 'https://rovelinstudio.com/tools',
    siteName: 'Rovelin Studio',
    images: [
      {
        url: '/images/og-image.png', // Using same image for tools section
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
    images: ['/images/og-image.png'], // Using same image for tools section
  }
};

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 