"use client";

import { notFound } from 'next/navigation';
import { converterVariants } from '../converterConfigs';
import ImageConverter from '../page';

export default function ImageConverterVariant({
  params
}: {
  params: { variant: string }
}) {
  const config = converterVariants[params.variant as keyof typeof converterVariants];

  if (!config) {
    notFound();
  }

  return (
    <ImageConverter
      title={config.title}
      description={config.description}
      defaultTarget={config.defaultTarget}
      allowedInputs={config.allowedInputs}
      allowedOutputs={config.allowedOutputs}
      metaDescription={config.metaDescription}
      keywords={config.keywords}
      variant={params.variant}
    />
  );
} 