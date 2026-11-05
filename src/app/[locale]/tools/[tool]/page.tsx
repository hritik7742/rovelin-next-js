import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale, getLanguage } from '@/lib/i18n/languages';
import { getToolDefinition, TOOLS_REGISTRY } from '@/lib/i18n/tools-registry';
import { getToolTranslation, getToolName } from '@/lib/i18n/translations';
import { generateToolMetadata, generateToolJsonLd } from '@/lib/i18n/seo-helpers';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import { getToolComponent } from '@/lib/i18n/tool-components';
import { ChevronRight, ShieldCheck, Zap, Award, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

interface LocalizedToolPageProps {
  params: Promise<{ locale: string; tool: string }>;
}

export async function generateMetadata({
  params
}: LocalizedToolPageProps): Promise<Metadata> {
  const { locale, tool } = await params;
  if (!isValidLocale(locale) || !getToolDefinition(tool)) {
    return {};
  }
  return generateToolMetadata(tool, locale);
}

export default async function LocalizedToolPage({
  params
}: LocalizedToolPageProps) {
  const { locale, tool: toolSlug } = await params;

  if (!isValidLocale(locale) || !getToolDefinition(toolSlug)) {
    notFound();
  }

  const lang = getLanguage(locale)!;
  const toolDef = getToolDefinition(toolSlug)!;
  const content = getToolTranslation(toolSlug, locale);
  const jsonLdSchemas = generateToolJsonLd(toolSlug, locale, content);
  const isRtl = lang.dir === 'rtl';

  // Get matching React component
  const ToolComponent = getToolComponent(toolSlug);

  // Filter 4 related tools in the same category
  const relatedTools = TOOLS_REGISTRY
    .filter(t => t.slug !== toolSlug && t.category === toolDef.category)
    .slice(0, 4);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 ${isRtl ? 'rtl' : 'ltr'}`} dir={lang.dir}>
      {/* JSON-LD Schemas */}
      {jsonLdSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Top Banner / Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-gray-900/60 border-b border-gray-200 dark:border-gray-800 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Home
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            <Link href={locale === 'en' ? '/tools' : `/${locale}/tools`} className="hover:text-indigo-600 dark:hover:text-indigo-400">
              Tools
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
            <span className="font-semibold text-gray-900 dark:text-white truncate max-w-[200px] sm:max-w-xs">
              {content.h1}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} currentToolSlug={toolSlug} />
          </div>
        </div>
      </div>

      {/* Tool Header */}
      <header className="max-w-5xl mx-auto pt-8 pb-4 px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
          <span>{content.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
          {content.h1}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </header>

      {/* Interactive Tool Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 my-6">
        <div className="bg-white dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-md p-4 sm:p-6 overflow-hidden">
          {ToolComponent ? (
            <ToolComponent />
          ) : (
            <div className="p-8 text-center text-gray-500">Tool loading...</div>
          )}
        </div>
      </main>

      {/* SEO Section: Key Benefits */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {content.benefitsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {content.benefits.map((b, i) => (
            <div
              key={i}
              className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 flex gap-4"
            >
              <span className="text-2xl shrink-0">{b.icon}</span>
              <div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {b.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section: How To Use */}
      <section className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {content.howToTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.howTo.map((step) => (
              <div
                key={step.step}
                className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs relative"
              >
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Section: Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
          {content.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {content.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-50 dark:bg-gray-900/60">
              <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section: Frequently Asked Questions (FAQ) */}
      <section className="bg-gray-50 dark:bg-gray-900/40 border-y border-gray-200 dark:border-gray-800 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <HelpCircle className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
              {content.faqTitle}
            </h2>
          </div>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-xs"
              >
                <h3 className="text-base font-bold text-gray-900 dark:text-white mb-2">
                  {faq.question}
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-gray-900 dark:text-white">
            {content.relatedTitle}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedTools.map(rel => {
              const relName = getToolName(rel.slug, locale);
              const relHref = locale === 'en' ? `/tools/${rel.slug}` : `/${locale}/tools/${rel.slug}`;
              return (
                <Link
                  key={rel.slug}
                  href={relHref}
                  className="p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-indigo-400 hover:shadow-md transition-all bg-white dark:bg-gray-900 group"
                >
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 line-clamp-1">
                    {relName}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 mt-1">
                    {rel.description}
                  </p>
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}

