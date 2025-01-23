import { converterVariants } from '../converterConfigs';

export async function generateMetadata({ params }: { params: { variant: string } }) {
  const config = converterVariants[params.variant as keyof typeof converterVariants];
  
  if (!config) {
    return {
      title: 'Converter Not Found',
      description: 'The requested converter could not be found.'
    };
  }

  return {
    title: `${config.title} | Free Online Converter`,
    description: config.metaDescription,
    keywords: config.keywords
  };
}

export default function ImageConverterVariantLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
} 