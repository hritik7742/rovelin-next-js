import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'HEIC to JPG Converter - Convert iPhone Photos Online | Free Tool',
  description: 'Convert HEIC/HEIF images from iPhone to JPG or PNG format online. Fast, secure, and free. Supports batch conversion with quality control.',
  keywords: 'heic to jpg, convert heic to jpg, iphone photo converter, heic converter, heif to jpg, heic to png',
  openGraph: {
    title: 'HEIC to JPG Converter - Convert iPhone Photos',
    description: 'Convert HEIC/HEIF images from iPhone to JPG or PNG format online. Fast, secure, and free.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'HEIC to JPG Converter - Convert iPhone Photos',
    description: 'Convert HEIC/HEIF images from iPhone to JPG or PNG format online. Fast, secure, and free.',
  },
  alternates: {
    canonical: '/tools/heic-to-jpg',
  },
};

export default function HeicToJpgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}