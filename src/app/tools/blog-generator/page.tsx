'use client';

import { useState, useRef, useEffect } from 'react';
import { Download, Copy, Check, Eye, Code } from 'lucide-react';

// Type for Turndown service
interface TurndownService {
  turndown: (html: string) => string;
}

export default function BlogGeneratorPage() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [image, setImage] = useState('');
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'preview' | 'code'>('preview');
  const editorRef = useRef<HTMLDivElement>(null);
  const turndownService = useRef<TurndownService | null>(null);

  useEffect(() => {
    // Initialize Turndown service for HTML to Markdown conversion
    if (typeof window !== 'undefined') {
      import('turndown').then((TurndownModule) => {
        const TurndownService = TurndownModule.default;
        turndownService.current = new TurndownService({
          headingStyle: 'atx',
          codeBlockStyle: 'fenced',
        });
      });
    }
  }, []);

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const html = e.clipboardData.getData('text/html');
    const text = e.clipboardData.getData('text/plain');
    
    if (html) {
      // If HTML is available, insert it
      document.execCommand('insertHTML', false, html);
    } else {
      // Otherwise insert plain text
      document.execCommand('insertText', false, text);
    }
    
    // Update state
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  const handleInput = () => {
    if (editorRef.current) {
      setHtmlContent(editorRef.current.innerHTML);
    }
  };

  const htmlToMarkdown = (html: string): string => {
    if (!turndownService.current || !html) return '';
    try {
      return turndownService.current.turndown(html);
    } catch (error) {
      console.error('Error converting HTML to Markdown:', error);
      return html;
    }
  };

  const generateMDX = () => {
    const today = new Date().toISOString().split('T')[0];
    const tagsArray = tags.split(',').map(tag => `"${tag.trim()}"`).join(', ');
    const markdownContent = htmlToMarkdown(htmlContent);
    
    const mdxContent = `---
title: "${title}"
description: "${description}"
date: "${today}"
author: "${author}"
tags: [${tagsArray}]${image ? `\nimage: "${image}"` : ''}
published: true
---

${markdownContent}`;

    return mdxContent;
  };

  const handleDownload = () => {
    const mdxContent = generateMDX();
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const blob = new Blob([mdxContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${slug}.mdx`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = () => {
    const mdxContent = generateMDX();
    navigator.clipboard.writeText(mdxContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isValid = title && description && author && tags && htmlContent;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Blog Post Editor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Paste formatted text and it preserves all styling!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              Post Details
            </h2>

            <div className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="10 JavaScript Tips Every Developer Should Know"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Description *
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Brief description for SEO (150-160 characters)"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Author *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Tags * (comma-separated)
                </label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="JavaScript, Web Development, Tutorial"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Image */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Featured Image (optional)
                </label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/blog/my-image.jpg"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Rich Text Editor */}
              <div>
                <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                  Content * (Paste formatted text here)
                </label>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg mb-2">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    💡 <strong>Tip:</strong> Copy formatted text from anywhere (Word, Google Docs, websites) and paste here. All formatting will be preserved!
                  </p>
                </div>
                <div
                  ref={editorRef}
                  contentEditable
                  onPaste={handlePaste}
                  onInput={handleInput}
                  className="w-full min-h-[400px] px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent overflow-auto prose prose-lg dark:prose-invert max-w-none"
                  style={{
                    outline: 'none',
                  }}
                  data-placeholder="Paste your formatted content here or start typing..."
                />
                <style jsx>{`
                  [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                  }
                `}</style>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Preview
              </h2>
              <div className="flex gap-2">
                <button
                  onClick={() => setViewMode('preview')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    viewMode === 'preview'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Eye className="w-4 h-4" />
                  Preview
                </button>
                <button
                  onClick={() => setViewMode('code')}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    viewMode === 'code'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  <Code className="w-4 h-4" />
                  MDX
                </button>
              </div>
            </div>

            {viewMode === 'preview' ? (
              <div className="bg-white dark:bg-gray-900 rounded-lg p-8 overflow-auto max-h-[700px] border border-gray-200 dark:border-gray-700">
                {isValid ? (
                  <article className="prose prose-lg dark:prose-invert max-w-none">
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">{description}</p>
                    <div className="flex gap-2 mb-6 flex-wrap">
                      {tags.split(',').map((tag, i) => (
                        <span key={i} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                      <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                    </div>
                  </article>
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-12">
                    Fill in the required fields to see the preview...
                  </p>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-6 font-mono text-sm overflow-auto max-h-[700px]">
                <pre className="whitespace-pre-wrap text-gray-800 dark:text-gray-200">
                  {isValid ? generateMDX() : '// Fill in the required fields to see the MDX code...'}
                </pre>
              </div>
            )}

            {/* Actions */}
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleDownload}
                disabled={!isValid}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                <Download className="w-5 h-5" />
                Download MDX
              </button>

              <button
                onClick={handleCopy}
                disabled={!isValid}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors disabled:cursor-not-allowed"
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy MDX
                  </>
                )}
              </button>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                ✨ How it works:
              </h3>
              <ol className="text-sm text-green-800 dark:text-green-200 space-y-1 list-decimal list-inside">
                <li>Copy formatted text from anywhere (Word, Google Docs, etc.)</li>
                <li>Paste into the content editor above</li>
                <li>All formatting (bold, italic, headings, lists) is preserved!</li>
                <li>Preview shows exactly how it will look</li>
                <li>Download converts it to perfect MDX format</li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
