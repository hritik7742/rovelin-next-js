import type { Metadata } from 'next';
import './pdf-to-png.css';

export const metadata: Metadata = {
  title: 'PDF to PNG Converter',
  description: 'Convert PDF pages to high-quality PNG images',
};

export default function PdfToPngLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}