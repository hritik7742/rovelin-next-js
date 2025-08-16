import { converterVariants } from '../image-converter/types';

const config = converterVariants['webp-to-jpg'];

export const metadata = {
  title: config.title + ' | Free Online Tool',
  description: config.metaDescription,
  keywords: config.keywords
};

export default function WebpToJpgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}