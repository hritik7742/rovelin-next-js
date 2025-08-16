import { converterVariants } from '../image-converter/types';

const config = converterVariants['svg-converter'];

export const metadata = {
  title: config.title + ' | Free Online Tool',
  description: config.metaDescription,
  keywords: config.keywords
};

export default function SvgConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}