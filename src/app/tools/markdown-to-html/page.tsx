"use client";

import { useState, useEffect, useRef } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import './markdown-to-html.css';

const defaultMarkdown = `# Welcome to Markdown
## Write your markdown here

You can:
- Use **bold** text
- Create *italic* text
- Add [links](https://example.com)
- Insert images ![alt text](image.jpg)
- Make lists
  1. First item
  2. Second item
- Create \`inline code\` and code blocks

\`\`\`javascript
console.log('Hello World!');
\`\`\`

> Add blockquotes

Create tables:
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
`;

export default function MarkdownToHtml() {
  const [markdown, setMarkdown] = useState(defaultMarkdown);
  const [html, setHtml] = useState('');
  const [showPreview, setShowPreview] = useState(true);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showInput, setShowInput] = useState(true);
  const [preserveComments, setPreserveComments] = useState(false);
  const [sanitizeHtml, setSanitizeHtml] = useState(true);
  const [showHtmlPreview, setShowHtmlPreview] = useState(false);

  useEffect(() => {
    convertToHtml(markdown);
  }, [markdown, sanitizeHtml, preserveComments]);

  const convertToHtml = (md: string) => {
    try {
      marked.setOptions({
        gfm: true,
        breaks: true,
        headerIds: true,
        mangle: false
      });

      let convertedHtml = marked(md);
      
      if (sanitizeHtml) {
        convertedHtml = DOMPurify.sanitize(convertedHtml);
      }
      
      setHtml(convertedHtml);
      setError('');
    } catch (err) {
      setError('Error converting markdown: ' + (err as Error).message);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setMarkdown(e.target?.result as string);
      };
      reader.readAsText(file);
    }
  };

  const downloadHtml = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <header className="tool-header">
          <h1>Markdown to HTML Converter</h1>
          <p>Transform your Markdown content into clean, valid HTML code instantly.</p>
        </header>

        <div className="md2h-converter">
          <div className="md2h-input-section">
            <div className="md2h-header">
              <h2>Markdown Input</h2>
              <div className="md2h-actions">
                <input
                  type="file"
                  accept=".md,.markdown,text/markdown"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button 
                  className="md2h-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload MD File
                </button>
                <button 
                  onClick={() => setShowInput(!showInput)}
                  className="md2h-toggle-btn"
                >
                  {showInput ? 'Hide' : 'Show'} Editor
                </button>
              </div>
            </div>

            <div 
              className={`md2h-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {showInput && (
                <textarea
                  className="md2h-textarea"
                  value={markdown}
                  onChange={(e) => setMarkdown(e.target.value)}
                  placeholder="Write or paste your Markdown here..."
                />
              )}
            </div>
          </div>

          <div className="md2h-output-section">
            <div className="md2h-header">
              <h2>HTML Output</h2>
              <div className="md2h-actions">
                <button 
                  className="md2h-preview-btn"
                  onClick={() => setShowHtmlPreview(!showHtmlPreview)}
                >
                  {showHtmlPreview ? 'Show Code' : 'Preview HTML'}
                </button>
                <button 
                  className="md2h-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(html);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? 'Copied!' : 'Copy HTML'}
                </button>
                <button 
                  className="md2h-download-btn"
                  onClick={downloadHtml}
                >
                  Download HTML
                </button>
              </div>
            </div>
            <div className="md2h-output">
              {showHtmlPreview ? (
                <div 
                  className="md2h-preview"
                  dangerouslySetInnerHTML={{ __html: html }}
                />
              ) : (
                <pre className="md2h-code">{html}</pre>
              )}
            </div>
          </div>
        </div>

        <div className="md2h-options">
          <label className="md2h-option">
            <input
              type="checkbox"
              checked={preserveComments}
              onChange={(e) => setPreserveComments(e.target.checked)}
            />
            Preserve HTML comments
          </label>
          <label className="md2h-option">
            <input
              type="checkbox"
              checked={sanitizeHtml}
              onChange={(e) => setSanitizeHtml(e.target.checked)}
            />
            Sanitize HTML output
          </label>
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>What is Markdown to HTML Conversion?</h2>
            <p>
              Markdown is a lightweight markup language that makes it easy to write formatted content. 
              Our converter transforms your Markdown text into clean, valid HTML code that you can use 
              on websites, blogs, or content management systems.
            </p>
          </article>

          <article className="info-box">
            <h2>Markdown Syntax Guide</h2>
            <div className="md2h-guide-grid">
              <div className="md2h-syntax-item">
                <h3>Headers</h3>
                <code># H1<br/>## H2<br/>### H3</code>
              </div>
              <div className="md2h-syntax-item">
                <h3>Emphasis</h3>
                <code>*italic*<br/>**bold**<br/>~~strikethrough~~</code>
              </div>
              <div className="md2h-syntax-item">
                <h3>Lists</h3>
                <code>1. Ordered<br/>* Unordered<br/>- Also unordered</code>
              </div>
              <div className="md2h-syntax-item">
                <h3>Links & Images</h3>
                <code>[Text](url)<br/>![Image](url)</code>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Common Use Cases</h2>
            <div className="md2h-use-cases-grid">
              <div className="md2h-use-case">
                <h3>📝 Blog Posts</h3>
                <p>Convert your Markdown blog posts to HTML for publishing on any platform.</p>
              </div>
              <div className="md2h-use-case">
                <h3>📚 Documentation</h3>
                <p>Transform technical documentation from Markdown to web-ready HTML.</p>
              </div>
              <div className="md2h-use-case">
                <h3>📋 README Files</h3>
                <p>Convert GitHub README files to HTML for web display.</p>
              </div>
              <div className="md2h-use-case">
                <h3>🌐 Web Content</h3>
                <p>Prepare Markdown content for CMS platforms that require HTML.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 