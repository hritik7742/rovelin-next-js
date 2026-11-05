"use client";

import React, { useState } from 'react';
import { Upload, FileText, Download, Copy, Check, AlertCircle } from 'lucide-react';
import RelatedTools from '../shared/RelatedTools';

export default function PdfToWord() {
  const [file, setFile] = useState<File | null>(null);
  const [extractedText, setExtractedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.type !== 'application/pdf' && !selectedFile.name.endsWith('.pdf')) {
      setError('Please select a valid PDF file.');
      return;
    }

    setError('');
    setFile(selectedFile);
    setLoading(true);

    try {
      const pdfjs = await import('pdfjs-dist');
      pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

      const arrayBuffer = await selectedFile.arrayBuffer();
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let fullText = '';

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const textContent = await page.getTextContent();
        const pageStrings = textContent.items
          .filter((item: any) => typeof item.str === 'string')
          .map((item: any) => item.str)
          .join(' ');
        fullText += `--- Page ${i} ---\n\n` + pageStrings + '\n\n';
      }

      setExtractedText(fullText.trim());
    } catch (err: any) {
      setError('Failed to extract text from PDF: ' + (err.message || 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadDoc = () => {
    if (!extractedText) return;
    const blob = new Blob([extractedText], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = (file?.name.replace(/\.pdf$/i, '') || 'converted') + '.doc';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Upload Zone */}
      <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-3xl p-8 text-center hover:border-indigo-500 transition-colors bg-gray-50 dark:bg-gray-900/40">
        <Upload className="w-10 h-10 mx-auto text-indigo-600 mb-3" />
        <h3 className="text-base font-bold text-gray-900 dark:text-white mb-1">
          {file ? file.name : 'Upload your PDF document'}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 mb-4">
          Convert PDF pages into editable Word document format (.doc)
        </p>
        <label className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-600 text-white text-xs sm:text-sm font-semibold cursor-pointer hover:bg-indigo-700 transition-all shadow-md">
          <span>Choose PDF File</span>
          <input
            type="file"
            accept=".pdf,application/pdf"
            onChange={handleFileChange}
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

      {loading && (
        <div className="mt-8 text-center py-10">
          <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">Extracting and converting pages...</p>
        </div>
      )}

      {extractedText && !loading && (
        <div className="mt-8 bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 pb-3 border-b border-gray-100 dark:border-gray-800">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Editable Output Preview
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Text'}</span>
              </button>
              <button
                onClick={handleDownloadDoc}
                className="px-4 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-indigo-700"
              >
                <Download className="w-3.5 h-3.5" /> Download .DOC
              </button>
            </div>
          </div>

          <textarea
            value={extractedText}
            onChange={(e) => setExtractedText(e.target.value)}
            rows={12}
            className="w-full p-4 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-sm font-mono text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      )}

      <div className="mt-12">
        <RelatedTools currentTool="/tools/pdf-to-word" category="PDF Tools" />
      </div>
    </div>
  );
}

