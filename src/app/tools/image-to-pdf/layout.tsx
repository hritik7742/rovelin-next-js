import type { Metadata } from 'next';
import './image-to-pdf.css';

export const metadata: Metadata = {
  title: 'Image to PDF Converter',
  description: 'Convert multiple images into a single PDF document. Upload JPG, PNG, GIF, WebP, BMP images and create PDF files.',
};

export default function ImageToPdfLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}