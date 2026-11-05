"use client";

import React, { useState } from 'react';
import { Upload, FileText, Download, AlertCircle, Sparkles } from 'lucide-react';
import { jsPDF } from 'jspdf';
import RelatedTools from '../shared/RelatedTools';

export default function WordToPdf() {
  const [content, setContent] = useState('');
  const [fileName, setFileName] = useState('converted-document');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name.replace(/\.[^/.]+$/, ''));
    setError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setContent(text || '');
    };
    reader.onerror = () => {
      setError('Error reading file. Please paste your text directly.');
    };
    reader.readAsText(file);
  };

  const handleConvertToPdf = () => {
    if (!content.trim()) {
      setError('Please enter or upload document content first.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const doc = new jsPDF({
        unit: 'pt',
        format: 'a4',
      });

      const margin = 40;
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const maxLineWidth = pageWidth - margin * 2;

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(11);

      const lines = doc.splitTextToSize(content, maxLineWidth);
      let cursorY = margin + 10;

      for (let i = 0; i < lines.length; i++) {
        if (cursorY + 14 > pageHeight - margin) {
          doc.addPage();
          cursorY = margin + 10;
        }
        doc.text(lines[i], margin, cursorY);
        cursorY += 15;
      }

      doc.save(`${fileName || 'document'}.pdf`);
    } catch (err: any) {
      setError('Error creating PDF: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Upload Header */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-8 text-center hover:border-indigo-500 transition-colors bg-gray-50 dark:bg-gray-900/40">
        <Upload className="w-10 h-10 mx-auto text-indigo-600 mb-3" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          Upload document or paste text below
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Convert document text into a clean, formatted PDF file
        </p>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs sm:text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition-all shadow-md">
          <span>Choose Text / Doc File</span>
          <input
            type="file"
            accept=".txt,.doc,.docx,.rtf"
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </div>

      {error && (
        <div className="mt-4 p-4 rounded-xl bg-red-50 text-red-600 text-xs sm:text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Editor & Converter Box */}
      <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
          <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
            Document Content Editor
          </span>
          <button
            onClick={handleConvertToPdf}
            disabled={loading || !content.trim()}
            className="px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs sm:text-sm font-semibold flex items-center gap-2 hover:bg-indigo-700 disabled:opacity-50 transition-all shadow-sm"
          >
            <Download className="w-4 h-4" />
            <span>{loading ? 'Generating PDF...' : 'Convert & Download PDF'}</span>
          </button>
        </div>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Paste or type your document content here to convert to PDF..."
          rows={14}
          className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="mt-12">
        <RelatedTools currentTool="/tools/word-to-pdf" category="Text Tools" />
      </div>
    </div>
  );
}

