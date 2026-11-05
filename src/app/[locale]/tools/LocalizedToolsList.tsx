"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { TOOLS_REGISTRY, ToolDefinition } from '@/lib/i18n/tools-registry';
import { getToolName } from '@/lib/i18n/translations';
import { Search, ArrowRight, Sparkles } from 'lucide-react';

interface LocalizedToolsListProps {
  locale: string;
  searchPlaceholder: string;
  allCategoriesText: string;
  categoryNames: Record<string, string>;
  openToolText: string;
}

export default function LocalizedToolsList({
  locale,
  searchPlaceholder,
  allCategoriesText,
  categoryNames,
  openToolText
}: LocalizedToolsListProps) {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    const cats = new Set<string>();
    TOOLS_REGISTRY.forEach(t => cats.add(t.category));
    return Array.from(cats);
  }, []);

  const localizedTools = useMemo(() => {
    return TOOLS_REGISTRY.map(t => ({
      ...t,
      localizedName: getToolName(t.slug, locale),
    }));
  }, [locale]);

  const filteredTools = useMemo(() => {
    return localizedTools.filter(t => {
      const matchesCategory = selectedCategory === 'all' || t.category === selectedCategory;
      if (!matchesCategory) return false;
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return (
        t.localizedName.toLowerCase().includes(q) ||
        t.name.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
      );
    });
  }, [localizedTools, query, selectedCategory]);

  return (
    <div>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xs text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Categories Bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
              selectedCategory === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {allCategoriesText}
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
            >
              {categoryNames[cat] || cat}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTools.map(t => {
          const href = locale === 'en' ? `/tools/${t.slug}` : `/${locale}/tools/${t.slug}`;
          return (
            <Link
              key={t.slug}
              href={href}
              className="group relative bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-200 dark:border-gray-800 shadow-xs hover:shadow-lg hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                    {categoryNames[t.category] || t.category}
                  </span>
                  <Sparkles className="w-4 h-4 text-amber-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {t.localizedName}
                </h3>
                <p className="mt-1.5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                  {t.description}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs font-medium text-indigo-600 dark:text-indigo-400">
                <span>{openToolText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

