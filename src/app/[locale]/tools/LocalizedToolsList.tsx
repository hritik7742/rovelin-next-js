"use client";

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  FileText,
  Image,
  FileJson,
  Code,
  Mail,
  Phone,
  PenSquare,
  FileCog,
  QrCode,
  FileType,
  Crop,
  Ruler,
  Package,
  Palette,
  Binary,
  FileImage,
  Hash,
  LinkIcon,
  Lock,
  DiffIcon,
  Smartphone,
  Type,
  ListIcon,
  User,
  FileCode,
  FileDown,
  RefreshCw,
  Files
} from 'lucide-react';
import LanguageSwitcher from '@/components/LanguageSwitcher';
import {
  TOOLS_CATALOG,
  getLocalizedToolItem,
  getCategoryTitle,
  getToolsPageHeaderAndInfo
} from '@/lib/i18n/tools-catalog';
import { trackEvent } from '@/lib/analytics';
import '@/app/tools/tools.css';

function renderCatalogIcon(iconName: string) {
  const props = { className: "w-6 h-6", "aria-hidden": "true" as const };
  switch (iconName) {
    case 'Image': return <Image {...props} />;
    case 'FileImage': return <FileImage {...props} />;
    case 'Files': return <Files {...props} />;
    case 'FileCode': return <FileCode {...props} />;
    case 'FileText': return <FileText {...props} />;
    case 'FileDown': return <FileDown {...props} />;
    case 'Ruler': return <Ruler {...props} />;
    case 'Crop': return <Crop {...props} />;
    case 'Package': return <Package {...props} />;
    case 'Palette': return <Palette {...props} />;
    case 'Binary': return <Binary {...props} />;
    case 'Hash': return <Hash {...props} />;
    case 'LinkIcon': return <LinkIcon {...props} />;
    case 'Lock': return <Lock {...props} />;
    case 'DiffIcon': return <DiffIcon {...props} />;
    case 'Smartphone': return <Smartphone {...props} />;
    case 'Type': return <Type {...props} />;
    case 'ListIcon': return <ListIcon {...props} />;
    case 'User': return <User {...props} />;
    case 'RefreshCw': return <RefreshCw {...props} />;
    case 'FileType': return <FileType {...props} />;
    case 'Mail': return <Mail {...props} />;
    case 'Phone': return <Phone {...props} />;
    case 'PenSquare': return <PenSquare {...props} />;
    case 'FileCog': return <FileCog {...props} />;
    case 'FileJson': return <FileJson {...props} />;
    case 'Code': return <Code {...props} />;
    case 'QrCode': return <QrCode {...props} />;
    default: return <FileText {...props} />;
  }
}

interface LocalizedToolsListProps {
  locale: string;
}

export default function LocalizedToolsList({ locale }: LocalizedToolsListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const copy = useMemo(() => getToolsPageHeaderAndInfo(locale), [locale]);

  const localizedTools = useMemo(() => {
    return TOOLS_CATALOG.map((tool) => {
      const loc = getLocalizedToolItem(tool.slug, locale);
      return {
        slug: tool.slug,
        name: loc.name,
        description: loc.description,
        path: locale === 'en' ? `/tools/${tool.slug}` : `/${locale}/tools/${tool.slug}`,
        category: tool.category,
        iconName: tool.iconName
      };
    });
  }, [locale]);

  const filteredTools = useMemo(() => {
    if (!searchQuery.trim()) return localizedTools;
    const q = searchQuery.toLowerCase();
    return localizedTools.filter((t) => {
      return (
        t.name.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q) ||
        t.slug.toLowerCase().includes(q)
      );
    });
  }, [localizedTools, searchQuery]);

  const imageCategoryTitle = useMemo(() => getCategoryTitle('Image Tools', locale), [locale]);
  const textCategoryTitle = useMemo(() => getCategoryTitle('Text Tools', locale), [locale]);

  const groupedTools = useMemo(() => {
    return {
      [imageCategoryTitle]: filteredTools.filter((t) => t.category === 'Image Tools'),
      [textCategoryTitle]: filteredTools.filter((t) => t.category === 'Text Tools')
    };
  }, [filteredTools, imageCategoryTitle, textCategoryTitle]);

  const handleToolClick = (toolName: string) => {
    trackEvent('Tools', 'Tool Click', `${toolName} (${locale})`);
  };

  return (
    <div className="tools-page">
      <div className="tools-header">
        <div className="flex items-center justify-center gap-3 mb-2">
          <LanguageSwitcher currentLocale={locale} />
        </div>
        <h1>{copy.h1}</h1>
        <p>{copy.subtitle}</p>

        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder={copy.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {Object.entries(groupedTools).map(([category, categoryTools]) => (
        categoryTools.length > 0 && (
          <div key={category}>
            <h2 className="tools-category">{category}</h2>
            <div className="tools-grid">
              {categoryTools.map((tool) => (
                <Link
                  href={tool.path}
                  key={tool.slug}
                  className="tool-card"
                  onClick={() => handleToolClick(tool.name)}
                >
                  <span className="tool-icon" aria-hidden="true">
                    {renderCatalogIcon(tool.iconName)}
                  </span>
                  <h2>{tool.name}</h2>
                  <p>{tool.description}</p>
                </Link>
              ))}
            </div>
          </div>
        )
      ))}

      <div className="tools-info">
        <h2>{copy.aboutTitle}</h2>
        <p>{copy.aboutDesc}</p>
        <div className="tools-features">
          <div className="feature">
            <h3>🔒 {copy.secureTitle}</h3>
            <p>{copy.secureDesc}</p>
          </div>
          <div className="feature">
            <h3>⚡ {copy.fastTitle}</h3>
            <p>{copy.fastDesc}</p>
          </div>
          <div className="feature">
            <h3>💻 {copy.freeTitle}</h3>
            <p>{copy.freeDesc}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
