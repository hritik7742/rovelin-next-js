"use client";

import { useState, useRef, useEffect } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './email-extractor.css';
import { trackEvent } from '@/lib/analytics';

interface Stats {
  total: number;
  unique: number;
}

export default function EmailExtractor() {
  const [inputText, setInputText] = useState('');
  const [extractedEmails, setExtractedEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [stats, setStats] = useState<Stats>({ total: 0, unique: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    trackEvent('Tools', 'View', 'Email Extractor');
  }, []);

  const extractEmails = (text: string) => {
    // Advanced email regex pattern
    const emailPattern = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/gi;
    
    const matches = text.match(emailPattern) || [];
    const uniqueEmails = [...new Set(matches)];
    
    setExtractedEmails(uniqueEmails);
    setStats({
      total: matches.length,
      unique: uniqueEmails.length
    });
    trackEvent('Tools', 'Extract', 'Email Extractor');
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const text = e.target?.result as string | undefined;
        if (text) {
          setInputText(text);
          extractEmails(text);
        }
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
        const text = e.target?.result as string | undefined;
        if (text) {
          setInputText(text);
          extractEmails(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadEmails = () => {
    const content = extractedEmails.join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_emails.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    trackEvent('Tools', 'Download', 'Email Extractor');
  };

  return (
    <div className="eext-container">
      <div className="eext-workspace">
        <div className="eext-header">
          <h1>Email Extractor</h1>
          <p className="eext-description">
            Extract email addresses from any text or document. Upload files or paste your content to find all email addresses instantly.
          </p>
        </div>

        <div className="eext-main">
          {/* Input Section */}
          <div className="eext-input-section">
            <div className="eext-input-header">
              <h2>Input Text</h2>
              <div className="eext-actions">
                <input
                  type="file"
                  accept=".txt,.csv,.md,.html"
                  onChange={handleFileUpload}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button 
                  className="eext-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Upload File
                </button>
              </div>
            </div>
            
            <div 
              className={`eext-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                className="eext-textarea"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  extractEmails(e.target.value);
                }}
                placeholder="Paste your text here or drop a file..."
              />
            </div>
          </div>

          {/* Output Section */}
          <div className="eext-output-section">
            <div className="eext-output-header">
              <h2>Extracted Emails</h2>
              <div className="eext-stats">
                <span>Total: {stats.total}</span>
                <span>Unique: {stats.unique}</span>
              </div>
              <div className="eext-actions">
                <button 
                  className="eext-copy-btn"
                  onClick={() => {
                    navigator.clipboard.writeText(extractedEmails.join('\n'));
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
                <button 
                  className="eext-download-btn"
                  onClick={downloadEmails}
                >
                  Download
                </button>
              </div>
            </div>
            
            <div className="eext-results">
              {extractedEmails.map((email, index) => (
                <div key={index} className="eext-email-item">
                  {email}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="eext-info">
          {/* Features Section */}
          <article className="eext-features">
            <h2>Advanced Features</h2>
            <div className="eext-features-grid">
              <div className="eext-feature-card">
                <h3>Bulk Extraction</h3>
                <p>Extract multiple email addresses at once from large texts or files.</p>
              </div>
              <div className="eext-feature-card">
                <h3>File Upload</h3>
                <p>Support for TXT, CSV, MD, and HTML files with drag-and-drop.</p>
              </div>
              <div className="eext-feature-card">
                <h3>Duplicate Removal</h3>
                <p>Automatically removes duplicate email addresses.</p>
              </div>
              <div className="eext-feature-card">
                <h3>Advanced Pattern Matching</h3>
                <p>Finds complex email patterns and variations.</p>
              </div>
            </div>
          </article>

          {/* Use Cases Section */}
          <article className="eext-use-cases">
            <h2>Common Use Cases</h2>
            <div className="eext-use-cases-grid">
              <div className="eext-use-case">
                <h3>Lead Generation</h3>
                <p>Extract contact emails from business documents and websites.</p>
              </div>
              <div className="eext-use-case">
                <h3>Marketing Research</h3>
                <p>Collect email addresses for market analysis and outreach.</p>
              </div>
              <div className="eext-use-case">
                <h3>Data Migration</h3>
                <p>Extract emails from legacy systems and documents.</p>
              </div>
              <div className="eext-use-case">
                <h3>Contact Management</h3>
                <p>Organize and export email lists from various sources.</p>
              </div>
            </div>
          </article>

          {/* Tips Section */}
          <article className="eext-tips">
            <h2>Pro Tips</h2>
            <ul className="eext-tips-list">
              <li>Clean your text data before extraction for better results</li>
              <li>Use the file upload feature for large documents</li>
              <li>Download results for backup and further processing</li>
              <li>Check for false positives in complex texts</li>
              <li>Verify extracted emails before using them</li>
            </ul>
          </article>

          {/* SEO Section */}
          <article className="eext-seo">
            <h2>Why Choose Our Email Extractor?</h2>
            <div className="eext-seo-content">
              <p>
                {" Our email extraction tool is designed for professionals who need to quickly and accurately find email addresses in large texts and documents. Whether you're a marketer, researcher, or data analyst, our tool provides the perfect balance of power and ease of use."}
              </p>
              <ul className="eext-benefits-list">
                <li>Fast and accurate email extraction</li>
                <li>Support for multiple file formats</li>
                <li>Privacy-focused - all processing happens in your browser</li>
                <li>Advanced pattern matching for complex email formats</li>
                <li>Export options for further analysis</li>
                <li>Mobile-friendly interface</li>
              </ul>
            </div>
          </article>

          {/* FAQ Section */}
          <article className="eext-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="eext-faq-grid">
              <div className="eext-faq-item">
                <h3>Is this tool free to use?</h3>
                <p>Yes, our email extractor is completely free with no usage limits.</p>
              </div>
              <div className="eext-faq-item">
                <h3>Is my data secure?</h3>
                <p>All processing happens in your browser - we never store or transmit your data.</p>
              </div>
              <div className="eext-faq-item">
                <h3>What file types are supported?</h3>
                <p>We support TXT, CSV, MD, and HTML files for email extraction.</p>
              </div>
              <div className="eext-faq-item">
                <h3>How accurate is the extraction?</h3>
                <p>Our tool uses advanced pattern matching to ensure high accuracy in email detection.</p>
              </div>
            </div>
          </article>
        </div>

        <RelatedTools 
          currentTool="/tools/email-extractor" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 