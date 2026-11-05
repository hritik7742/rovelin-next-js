import { Metadata } from 'next';
import { SUPPORTED_LANGUAGES, getLanguage } from './languages';
import { getToolTranslation, LocalizedToolContent } from './translations';
import { getToolDefinition } from './tools-registry';

const BASE_URL = 'https://www.rovelin.com';

export function buildHreflangAlternates(slug?: string) {
  const languages: Record<string, string> = {
    'x-default': slug ? `${BASE_URL}/tools/${slug}` : `${BASE_URL}/tools`,
    'en': slug ? `${BASE_URL}/tools/${slug}` : `${BASE_URL}/tools`,
  };

  for (const lang of SUPPORTED_LANGUAGES) {
    if (lang.code === 'en') continue;
    languages[lang.code] = slug
      ? `${BASE_URL}/${lang.code}/tools/${slug}`
      : `${BASE_URL}/${lang.code}/tools`;
  }

  return languages;
}

export function generateToolMetadata(slug: string, locale: string): Metadata {
  const lang = getLanguage(locale) || getLanguage('en')!;
  const tool = getToolDefinition(slug);
  const content = getToolTranslation(slug, locale);

  const canonical = locale === 'en'
    ? `${BASE_URL}/tools/${slug}`
    : `${BASE_URL}/${locale}/tools/${slug}`;

  const alternates = {
    canonical,
    languages: buildHreflangAlternates(slug),
  };

  return {
    title: content.title,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates,
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: canonical,
      siteName: 'Rovelin Studio',
      locale: lang.locale,
      type: 'website',
      images: [
        {
          url: '/images/og-image.png',
          width: 1200,
          height: 630,
          alt: content.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: content.title,
      description: content.metaDescription,
      images: ['/images/og-image.png'],
    },
  };
}

export function generateToolJsonLd(slug: string, locale: string, content: LocalizedToolContent) {
  const tool = getToolDefinition(slug);
  const lang = getLanguage(locale) || getLanguage('en')!;
  const canonical = locale === 'en'
    ? `${BASE_URL}/tools/${slug}`
    : `${BASE_URL}/${locale}/tools/${slug}`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: content.h1,
    description: content.metaDescription,
    url: canonical,
    applicationCategory: tool?.applicationCategory || 'UtilitiesApplication',
    operatingSystem: 'All (Web Browser)',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    author: {
      '@type': 'Organization',
      name: 'Rovelin Studio',
      url: BASE_URL,
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: content.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: BASE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Tools',
        item: `${BASE_URL}/tools`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: content.h1,
        item: canonical,
      },
    ],
  };

  return [webAppSchema, faqSchema, breadcrumbsSchema];
}

