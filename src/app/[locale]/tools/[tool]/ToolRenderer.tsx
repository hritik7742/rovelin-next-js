"use client";

import React from 'react';
import { getToolComponent } from '@/lib/i18n/tool-components';
import LocalizedToolDOM from '@/lib/i18n/LocalizedToolDOM';

interface ToolRendererProps {
  toolSlug: string;
  locale: string;
}

export default function ToolRenderer({ toolSlug, locale }: ToolRendererProps) {
  const ToolComponent = getToolComponent(toolSlug);

  return (
    <LocalizedToolDOM locale={locale} toolSlug={toolSlug}>
      {ToolComponent ? (
        <ToolComponent />
      ) : (
        <div className="p-12 text-center text-gray-400">Loading tool...</div>
      )}
    </LocalizedToolDOM>
  );
}

