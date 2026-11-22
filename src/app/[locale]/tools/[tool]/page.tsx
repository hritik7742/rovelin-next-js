import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { isValidLocale, getLanguage } from '@/lib/i18n/languages';
import { getToolDefinition, TOOLS_REGISTRY } from '@/lib/i18n/tools-registry';
import { getToolTranslation, getToolName, getDictionary } from '@/lib/i18n/translations';
import { generateToolMetadata, generateToolJsonLd } from '@/lib/i18n/seo-helpers';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import ToolRenderer from './ToolRenderer';
import { ChevronRight, Sparkles, CheckCircle2, HelpCircle } from 'lucide-react';

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
  const dict = getDictionary(locale);
  const jsonLdSchemas = generateToolJsonLd(toolSlug, locale, content);
  const isRtl = lang.dir === 'rtl';

  // Filter 4 related tools in the same category
  const relatedTools = TOOLS_REGISTRY
    .filter(t => t.slug !== toolSlug && t.category === toolDef.category)
    .slice(0, 4);

  return (
    <div className={`locale-tool-container w-full min-h-screen bg-gray-950 text-gray-100 ${isRtl ? 'rtl' : 'ltr'}`} dir={lang.dir}>
      {/* Inline styles to suppress duplicate unlocalized headers & static English articles from embedded tool */}
      <style dangerouslySetInnerHTML={{ __html: `
        .locale-tool-container .tool-header,
        .locale-tool-container .tool-articles,
        .locale-tool-container .color-tips,
        .locale-tool-container .related-tools-container,
        .locale-tool-container .tools-navigation {
          display: none !important;
        }
      ` }} />

      {/* JSON-LD Schemas for Rich Search Snippets */}
      {jsonLdSchemas.map((schema, idx) => (
        <script
          key={idx}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Top Breadcrumbs & Language Switcher */}
      <div className="border-b border-gray-800 bg-gray-900/50 py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-3 text-sm text-gray-400">
          <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
            <Link href={locale === 'en' ? '/' : `/${locale}`} className="hover:text-purple-400 transition-colors">
              {dict.home || 'Home'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-gray-600" />
            <Link href={locale === 'en' ? '/tools' : `/${locale}/tools`} className="hover:text-purple-400 transition-colors">
              {dict.tools || 'Tools'}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180 text-gray-600" />
            <span className="text-gray-200 font-medium truncate max-w-[220px] sm:max-w-md">
              {content.h1}
            </span>
          </nav>

          <div className="flex items-center gap-2">
            <LanguageSwitcher currentLocale={locale} currentToolSlug={toolSlug} />
          </div>
        </div>
      </div>

      {/* Localized Tool Header */}
      <header className="max-w-5xl mx-auto pt-8 pb-4 px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-900/40 text-purple-300 border border-purple-700/50 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>{content.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white">
          {content.h1}
        </h1>
        <p className="mt-3 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </header>

      {/* Interactive Tool Area */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 my-6">
        <div className="bg-gray-900/90 rounded-3xl border border-gray-800 shadow-xl p-4 sm:p-6 overflow-hidden">
          <ToolRenderer toolSlug={toolSlug} locale={locale} />
        </div>
      </main>

      {/* SEO Section: Key Benefits */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-white">
          {content.benefitsTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.benefits.map((b, i) => (
            <div key={i} className="p-5 rounded-2xl bg-gray-900/60 border border-gray-800 flex flex-col gap-2">
              <span className="text-2xl">{b.icon}</span>
              <h3 className="text-base font-bold text-white">{b.title}</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section: How To Use in 3 Simple Steps */}
      <section className="bg-gray-900/40 border-y border-gray-800 py-12 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-white">
            {content.howToTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.howTo.map((step) => (
              <div key={step.step} className="bg-gray-900 p-6 rounded-2xl border border-gray-800 relative">
                <div className="w-8 h-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-sm mb-4">
                  {step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">{step.title}</h3>
                <p className="text-xs sm:text-sm text-gray-400">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Section: Features */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-white">
          {content.featuresTitle}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl mx-auto">
          {content.features.map((feature, i) => (
            <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-gray-900/60 border border-gray-800">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-gray-300">{feature}</span>
            </div>
          ))}
        </div>
      </section>

      {/* SEO Section: Frequently Asked Questions (FAQ) */}
      <section className="bg-gray-900/40 border-y border-gray-800 py-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center gap-2 mb-8">
            <HelpCircle className="w-6 h-6 text-purple-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {content.faqTitle}
            </h2>
          </div>
          <div className="space-y-4">
            {content.faqs.map((faq, i) => (
              <div key={i} className="bg-gray-900 p-5 rounded-2xl border border-gray-800">
                <h3 className="text-base font-bold text-white mb-2">{faq.question}</h3>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      {relatedTools.length > 0 && (
        <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-8 text-white">
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
                  className="p-4 rounded-xl border border-gray-800 hover:border-purple-500 hover:shadow-lg transition-all bg-gray-900 group"
                >
                  <h3 className="text-sm font-semibold text-white group-hover:text-purple-400 line-clamp-1">
                    {relName}
                  </h3>
                  <p className="text-xs text-gray-400 line-clamp-2 mt-1">
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
