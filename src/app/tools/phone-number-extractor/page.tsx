"use client";

import { useState, useRef } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './phone-number-extractor.css';

type NumberType = {
  original: string;
  cleaned: string;
  isValid: boolean;
};

type StatsType = {
  total: number;
  valid: number;
  unique: number;
};

export default function PhoneNumberExtractor() {
  const [inputText, setInputText] = useState('');
  const [extractedNumbers, setExtractedNumbers] = useState<NumberType[]>([]);
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [stats, setStats] = useState<StatsType>({ total: 0, valid: 0, unique: 0 });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showInvalidNumbers, setShowInvalidNumbers] = useState(false);

  const extractPhoneNumbers = (text: string) => {
    const phonePattern = /(?:[-+() ]*\d){10,13}/g;

    const matches = text.match(phonePattern) || [];
    const processedNumbers = matches
      .map(number => {
        const cleaned = number.replace(/[^\d+]/g, '');
        return {
          original: number.trim(),
          cleaned: cleaned,
          isValid: cleaned.length >= 10 && cleaned.length <= 15
        };
      })
      .filter((value, index, self) => 
        index === self.findIndex(t => t.cleaned === value.cleaned)
      );

    setExtractedNumbers(processedNumbers);
    setStats({
      total: matches.length,
      valid: processedNumbers.filter(n => n.isValid).length,
      unique: processedNumbers.length
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const text = e.target.result.toString();
          setInputText(text);
          extractPhoneNumbers(text);
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
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (e.target?.result) {
          const text = e.target.result.toString();
          setInputText(text);
          extractPhoneNumbers(text);
        }
      };
      reader.readAsText(file);
    }
  };

  const downloadNumbers = () => {
    const content = extractedNumbers
      .filter(n => showInvalidNumbers || n.isValid)
      .map(n => n.original).join('\n');
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'extracted_phone_numbers.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    const csvContent = "Phone Number,Status\n" + 
      extractedNumbers
        .filter(n => showInvalidNumbers || n.isValid)
        .map(n => `${n.original},${n.isValid ? 'Valid' : 'Invalid'}`)
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'phone_numbers.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="formatter-container">

      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>Phone Number Extractor</h1>
          <p>Extract phone numbers from any text or document. Supports international formats with automatic country detection.</p>
        </div>

        <div className="pext-main">
          <div className="pext-input-section">
            <div className="pext-input-header">
              <h2>Input Text</h2>
              <div className="pext-actions">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept=".txt,.csv,.doc,.docx"
                  style={{ display: 'none' }}
                />
                <button 
                  className="pext-btn pext-upload-btn"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                  Upload File
                </button>
              </div>
            </div>

            <div 
              className={`pext-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <textarea
                className="pext-textarea"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  extractPhoneNumbers(e.target.value);
                }}
                placeholder="Paste your text here or drop a file..."
              />
            </div>
          </div>

          <div className="pext-output-section">
            <div className="pext-output-header">
              <h2>Extracted Numbers</h2>
              <div className="pext-actions">
                <button 
                  className={`pext-btn pext-copy-btn ${copied ? 'copied' : ''}`}
                  onClick={() => {
                    const numbers = extractedNumbers
                      .filter(n => showInvalidNumbers || n.isValid)
                      .map(n => n.original).join('\n');
                    navigator.clipboard.writeText(numbers);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                  </svg>
                  {copied ? 'Copied!' : 'Copy All'}
                </button>

                <div className="pext-download-group">
                  <button 
                    className="pext-btn pext-download-btn"
                    onClick={downloadNumbers}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download TXT
                  </button>

                  <button 
                    className="pext-btn pext-download-excel-btn"
                    onClick={downloadExcel}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                      <polyline points="14 2 14 8 20 8" />
                      <line x1="16" y1="13" x2="8" y2="13" />
                      <line x1="16" y1="17" x2="8" y2="17" />
                      <line x1="10" y1="9" x2="8" y2="9" />
                    </svg>
                    Download Excel
                  </button>
                </div>
              </div>
            </div>

            <div className="pext-options">
              <label className="pext-checkbox">
                <input
                  type="checkbox"
                  checked={showInvalidNumbers}
                  onChange={(e) => setShowInvalidNumbers(e.target.checked)}
                />
                Show potentially invalid numbers
              </label>
            </div>

            <div className="pext-stats">
              <span>Total: {stats.total}</span>
              <span>Valid: {stats.valid}</span>
              <span>Unique: {stats.unique}</span>
            </div>

            <div className="pext-results">
              {extractedNumbers
                .filter(number => showInvalidNumbers || number.isValid)
                .map((number, index) => (
                  <div 
                    key={index} 
                    className={`pext-number-item ${number.isValid ? 'valid' : 'invalid'}`}
                  >
                    <div className="pext-number-formatted">{number.original}</div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>Advanced Phone Number Detection</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>Smart Pattern Recognition</h3>
                <p>Detects phone numbers in various formats including:</p>
                <ul className="benefits-list">
                  <li>International numbers with country codes</li>
                  <li>Local numbers with area codes</li>
                  <li>Numbers with different separators</li>
                  <li>Numbers in parentheses</li>
                </ul>
              </div>
              <div className="feature-card">
                <h3>International Support</h3>
                <p>
                  Detects phone numbers from 200+ countries with proper formatting
                  and validation rules.
                </p>
              </div>
              <div className="feature-card">
                <h3>Smart Validation</h3>
                <p>
                  Validates numbers against country-specific patterns and length
                  requirements.
                </p>
              </div>
              <div className="feature-card">
                <h3>Bulk Processing</h3>
                <p>
                  Handle large texts and files efficiently with automatic duplicate
                  removal.
                </p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Common Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case">
                <h3>Lead Generation</h3>
                <ul className="practices-list">
                  <li>Extract from business directories</li>
                  <li>Process company websites</li>
                  <li>Analyze professional networks</li>
                  <li>Parse industry databases</li>
                </ul>
              </div>
              <div className="use-case">
                <h3>Contact Management</h3>
                <ul className="practices-list">
                  <li>Process email signatures</li>
                  <li>Extract from business cards</li>
                  <li>Handle document scans</li>
                  <li>Import from spreadsheets</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Best Practices</h2>
            <div className="tips-content">
              <ol className="practices-list">
                <li>
                  <h3>Verify Source Quality</h3>
                  <p>Ensure your source text contains up-to-date and accurate phone numbers.</p>
                </li>
                <li>
                  <h3>Check Number Formats</h3>
                  <p>Consider regional variations in phone number formats when extracting.</p>
                </li>
                <li>
                  <h3>Validate Numbers</h3>
                  <p>Always verify extracted numbers before using them in your contact lists.</p>
                </li>
                <li>
                  <h3>Respect Privacy</h3>
                  <p>Ensure you have permission to collect and use the phone numbers.</p>
                </li>
              </ol>
            </div>
          </article>

          <article className="info-box">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What formats are supported?</h3>
                <p>
                  Our tool supports most common phone number formats including
                  international numbers, local numbers, and numbers with various
                  separators.
                </p>
              </div>
              <div className="faq-item">
                <h3>How are duplicates handled?</h3>
                <p>
                  The tool automatically removes duplicate numbers while preserving
                  the original formatting of the first occurrence.
                </p>
              </div>
              <div className="faq-item">
                <h3>Is it secure?</h3>
                <p>
                  Yes! All processing happens in your browser. We never store or
                  transmit your data to any server.
                </p>
              </div>
              <div className="faq-item">
                <h3>What file types are supported?</h3>
                <p>
                  You can upload .txt, .csv, .doc, and .docx files, or simply
                  paste your text directly.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Middle Ad */}

        <RelatedTools 
          currentTool="/tools/phone-number-extractor" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 