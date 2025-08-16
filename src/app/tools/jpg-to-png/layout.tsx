import { converterVariants } from '../image-converter/types';

const config = converterVariants['jpg-to-png'];

export const metadata = {
  title: config.title + ' | Free Online Tool',
  description: config.metaDescription,
  keywords: config.keywords
};

export default function JpgToPngLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}