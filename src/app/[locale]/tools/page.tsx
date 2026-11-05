import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale, getLanguage } from '@/lib/i18n/languages';
import { TOOLS_REGISTRY } from '@/lib/i18n/tools-registry';
import { getToolsIndexTranslation, getToolName } from '@/lib/i18n/translations';
import { buildHreflangAlternates } from '@/lib/i18n/seo-helpers';
import LanguageSwitcher from '@/components/LanguageSwitcher';
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
  const content = getToolsIndexTranslation(locale);
  const isRtl = lang.dir === 'rtl';

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4 sm:px-6 lg:px-8 ${isRtl ? 'rtl' : 'ltr'}`} dir={lang.dir}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-indigo-700 bg-indigo-100 dark:bg-indigo-950 dark:text-indigo-300 rounded-full">
                {content.freeOnlineBadge}
              </span>
              <span className="text-xs text-gray-500 dark:text-gray-400">
                {content.totalToolsBadge(TOOLS_REGISTRY.length)}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              {content.h1}
            </h1>
            <p className="mt-2 text-base text-gray-600 dark:text-gray-300 max-w-3xl">
              {content.subtitle}
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <LanguageSwitcher currentLocale={locale} />
          </div>
        </div>

        {/* Client Interactive Filter & List */}
        <LocalizedToolsList
          locale={locale}
          searchPlaceholder={content.searchPlaceholder}
          allCategoriesText={content.allCategories}
          categoryNames={content.categoryNames}
          openToolText={content.openToolText}
        />
      </div>
    </div>
  );
}

