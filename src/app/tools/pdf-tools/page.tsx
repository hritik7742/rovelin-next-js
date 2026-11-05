"use client";

import React from 'react';
import Link from 'next/link';
import { FileText, FileImage, FileDown, ArrowRight, ShieldCheck, Zap, Sparkles } from 'lucide-react';
import RelatedTools from '../shared/RelatedTools';

const PDF_SUITE = [
  {
    title: 'PDF to JPG Converter',
    description: 'Convert every page of your PDF into high-quality JPG images instantly.',
    path: '/tools/pdf-to-jpg',
    icon: <FileImage className="w-6 h-6 text-indigo-600" />
  },
  {
    title: 'PDF to PNG Converter',
    description: 'Extract crisp PNG images from your PDF files with full clarity.',
    path: '/tools/pdf-to-png',
    icon: <FileDown className="w-6 h-6 text-purple-600" />
  },
  {
    title: 'Image to PDF Converter',
    description: 'Combine JPG, PNG, and WebP images into a single professional PDF document.',
    path: '/tools/image-to-pdf',
    icon: <FileText className="w-6 h-6 text-emerald-600" />
  },
  {
    title: 'PDF to Word Converter',
    description: 'Convert PDF files into editable document text directly in your browser.',
    path: '/tools/pdf-to-word',
    icon: <FileText className="w-6 h-6 text-blue-600" />
  },
  {
    title: 'Word to PDF Converter',
    description: 'Convert documents and text files into clean, shareable PDF documents.',
    path: '/tools/word-to-pdf',
    icon: <FileText className="w-6 h-6 text-amber-600" />
  }
];

export default function PdfToolsPage() {
  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> All-in-One PDF Suite
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white">
          Free Online PDF Tools
        </h1>
        <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Convert, process, and optimize PDF documents securely in your browser with zero limits.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {PDF_SUITE.map((tool) => (
          <Link
            key={tool.path}
            href={tool.path}
            className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xs hover:shadow-lg hover:border-indigo-400 transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="p-3 w-fit rounded-xl bg-gray-50 dark:bg-gray-800 mb-4 group-hover:scale-110 transition-transform">
                {tool.icon}
              </div>
              <h3 className="text-base font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                {tool.title}
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                {tool.description}
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Open Tool</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-12">
        <RelatedTools currentTool="/tools/pdf-tools" category="PDF Tools" />
      </div>
    </div>
  );
}

