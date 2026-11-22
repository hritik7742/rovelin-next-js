import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { isValidLocale, getLanguage } from '@/lib/i18n/languages';
import { getToolsIndexTranslation } from '@/lib/i18n/translations';
import { buildHreflangAlternates } from '@/lib/i18n/seo-helpers';
import LocalizedToolsList from './LocalizedToolsList';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};

  const lang = getLanguage(locale);
  const content = getToolsIndexTranslation(locale);
  const canonical = locale === 'en'
    ? 'https://www.rovelin.com/tools'
    : `https://www.rovelin.com/${locale}/tools`;

  return {
    title: content.title,
    description: content.metaDescription,
    keywords: content.keywords,
    alternates: {
      canonical,
      languages: buildHreflangAlternates(),
    },
    openGraph: {
      title: content.title,
      description: content.metaDescription,
      url: canonical,
      siteName: 'Rovelin Studio',
      locale: lang?.locale || 'en_US',
      type: 'website',
    },
  };
}

export default async function LocalizedToolsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) {
    notFound();
  }

  const lang = getLanguage(locale)!;
  const isRtl = lang.dir === 'rtl';

  return (
    <div className={`tools-page-wrapper ${isRtl ? 'rtl' : 'ltr'}`} dir={lang.dir}>
      <LocalizedToolsList locale={locale} />
    </div>
  );
}
