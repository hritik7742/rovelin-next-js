"use client";

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SUPPORTED_LANGUAGES, getLanguage } from '@/lib/i18n/languages';
import { Globe, Search, X, Check } from 'lucide-react';

interface LanguageSwitcherProps {
  currentLocale?: string;
  currentToolSlug?: string;
}

export default function LanguageSwitcher({
  currentLocale = 'en',
  currentToolSlug
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const currentLang = useMemo(() => {
    return getLanguage(currentLocale) || getLanguage('en')!;
  }, [currentLocale]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Filter languages based on search query
  const filteredLanguages = useMemo(() => {
    if (!search.trim()) return SUPPORTED_LANGUAGES;
    const q = search.toLowerCase().trim();
    return SUPPORTED_LANGUAGES.filter(
      l =>
        l.name.toLowerCase().includes(q) ||
        l.nativeName.toLowerCase().includes(q) ||
        l.code.toLowerCase().includes(q)
    );
  }, [search]);

  // Build target URL for a given language code
  const getTargetUrl = (code: string) => {
    if (currentToolSlug) {
      return code === 'en' ? `/tools/${currentToolSlug}` : `/${code}/tools/${currentToolSlug}`;
    }
    return code === 'en' ? '/tools' : `/${code}/tools`;
  };

  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-1.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-50 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-700"
        aria-label="Select language"
      >
        <span className="text-base leading-none">{currentLang.flag}</span>
        <span className="font-semibold">{currentLang.nativeName}</span>
        <Globe className="w-3.5 h-3.5 text-gray-400" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-in fade-in duration-150">
          <div
            ref={modalRef}
            className="w-full max-w-xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-2">
                <Globe className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                <h3 className="text-base font-semibold text-gray-900 dark:text-white">
                  Select Language (50 Languages)
                </h3>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Input */}
            <div className="p-3 border-b border-gray-100 dark:border-gray-800">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search 50 languages (e.g. Spanish, Español, हिन्दी, 日本語)..."
                  className="w-full pl-9 pr-4 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900 dark:text-white"
                  autoFocus
                />
              </div>
            </div>

            {/* Languages Grid */}
            <div className="overflow-y-auto p-3 grid grid-cols-2 sm:grid-cols-3 gap-2">
              {filteredLanguages.map((lang) => {
                const isSelected = lang.code === currentLocale;
                const href = getTargetUrl(lang.code);

                return (
                  <Link
                    key={lang.code}
                    href={href}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                      isSelected
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200 dark:bg-indigo-950 dark:text-indigo-300 dark:border-indigo-800'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-base">{lang.flag}</span>
                      <span className="truncate">{lang.nativeName}</span>
                    </div>
                    {isSelected && <Check className="w-4 h-4 shrink-0 text-indigo-600 dark:text-indigo-400" />}
                  </Link>
                );
              })}
            </div>

            {/* Footer */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-800 text-center text-xs text-gray-500">
              Supports English + 50 top global languages. All tools run client-side in your browser.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

