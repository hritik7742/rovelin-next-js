import type { Metadata } from 'next';
import './pdf-to-jpg.css';

export const metadata: Metadata = {
  title: 'PDF to JPG Converter',
  description: 'Convert PDF pages to high-quality JPG images with customizable quality settings',
};

export default function PdfToJpgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}