import { compressorVariants } from '../image-compressor/compressor-types';

const config = compressorVariants['jpeg-compressor'];

export const metadata = {
  title: config.title + ' | Free Online Tool',
  description: config.metaDescription,
  keywords: config.keywords
};

export default function JpegCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}