import { compressorVariants } from '../image-compressor/compressor-types';

const config = compressorVariants['png-compressor'];

export const metadata = {
  title: config.title + ' | Free Online Tool',
  description: config.metaDescription,
  keywords: config.keywords
};

export default function PngCompressorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}