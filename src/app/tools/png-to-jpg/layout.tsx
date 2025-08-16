import { converterVariants } from '../image-converter/types';

const config = converterVariants['png-to-jpg'];

export const metadata = {
  title: config.title + ' | Free Online Tool',
  description: config.metaDescription,
  keywords: config.keywords
};

export default function PngToJpgLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}