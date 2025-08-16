"use client";

import { useState } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './comma-separator.css';

export default function CommaSeparator() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [separator, setSeparator] = useState(',');
  const [customSeparator, setCustomSeparator] = useState('');
  const [copied, setCopied] = useState(false);
  const [trimSpaces, setTrimSpaces] = useState(true);
  const [removeEmptyLines, setRemoveEmptyLines] = useState(true);
  const [sortAlphabetically, setSortAlphabetically] = useState(false);

  const processText = () => {
    const result = input;
    const activeSeparator = separator === 'custom' ? customSeparator : separator;

    // Split by common delimiters
    let items = result.split(/[,\n\t|;]+/);

    // Apply options
    if (trimSpaces) {
      items = items.map(item => item.trim());
    }
    if (removeEmptyLines) {
      items = items.filter(item => item.length > 0);
    }
    if (sortAlphabetically) {
      items = items.sort((a, b) => a.localeCompare(b));
    }

    // Join with selected separator
    setOutput(items.join(activeSeparator + ' '));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="csep-container">
      <div className="csep-workspace">
        <div className="csep-header">
          <h1>Comma Separator Tool</h1>
          <p>Convert between different text separators, clean your data, and format lists</p>
        </div>

        <div className="csep-main">
          <div className="csep-input-section">
            <div className="csep-input-header">
              <h2>Input Text</h2>
              <p>Paste your text with any separator (comma, newline, tab, etc.)</p>
            </div>
            <textarea
              className="csep-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your text here..."
            />
          </div>

          <div className="csep-controls">
            <div className="csep-separator-select">
              <label>Output Separator:</label>
              <select 
                value={separator}
                onChange={(e) => setSeparator(e.target.value)}
                className="csep-select"
              >
                <option value=",">Comma (,)</option>
                <option value=";">Semicolon (;)</option>
                <option value="|">Vertical Bar (|)</option>
                <option value="\n">New Line</option>
                <option value="\t">Tab</option>
                <option value="custom">Custom</option>
              </select>
              {separator === 'custom' && (
                <input
                  type="text"
                  value={customSeparator}
                  onChange={(e) => setCustomSeparator(e.target.value)}
                  className="csep-custom-input"
                  placeholder="Enter custom separator"
                />
              )}
            </div>

            <div className="csep-options">
              <label className="csep-checkbox">
                <input
                  type="checkbox"
                  checked={trimSpaces}
                  onChange={(e) => setTrimSpaces(e.target.checked)}
                />
                Trim Spaces
              </label>
              <label className="csep-checkbox">
                <input
                  type="checkbox"
                  checked={removeEmptyLines}
                  onChange={(e) => setRemoveEmptyLines(e.target.checked)}
                />
                Remove Empty Lines
              </label>
              <label className="csep-checkbox">
                <input
                  type="checkbox"
                  checked={sortAlphabetically}
                  onChange={(e) => setSortAlphabetically(e.target.checked)}
                />
                Sort Alphabetically
              </label>
            </div>

            <button 
              onClick={processText}
              className="csep-process-button"
            >
              Process Text
            </button>
          </div>

          <div className="csep-output-section">
            <div className="csep-output-header">
              <h2>Output Text</h2>
              <button 
                onClick={copyToClipboard}
                className="csep-copy-button"
              >
                {copied ? 'Copied!' : 'Copy Text'}
              </button>
            </div>
            <div className="csep-output">
              {output}
            </div>
          </div>
        </div>

        <div className="csep-info">
          <article className="csep-features">
            <h2>Key Features</h2>
            <div className="csep-features-grid">
              <div className="csep-feature-card">
                <h3>🔄 Multiple Separators</h3>
                <p>Convert between commas, semicolons, new lines, and custom separators</p>
              </div>
              <div className="csep-feature-card">
                <h3>✨ Text Cleaning</h3>
                <p>Remove extra spaces and empty lines automatically</p>
              </div>
              <div className="csep-feature-card">
                <h3>📋 Easy Copy</h3>
                <p>Copy formatted text with one click</p>
              </div>
              <div className="csep-feature-card">
                <h3>🔠 Sorting Options</h3>
                <p>Sort items alphabetically if needed</p>
              </div>
            </div>
          </article>

          <article className="csep-use-cases">
            <h2>Common Use Cases</h2>
            <ul className="csep-use-list">
              <li>Prepare data for CSV files</li>
              <li>Clean up messy data exports</li>
              <li>Format lists for databases</li>
              <li>Convert copy-pasted data</li>
              <li>Prepare email lists</li>
            </ul>
          </article>

          <article className="csep-data-tips">
            <h2>Data Formatting Tips</h2>
            <div className="csep-tips-content">
              <p>When working with separated values:</p>
              <ul>
                <li>Use consistent separators within datasets</li>
                <li>Remove unnecessary whitespace</li>
                <li>Check for duplicate entries</li>
                <li>Validate data after conversion</li>
              </ul>
            </div>
          </article>

          <article className="csep-best-practices">
            <h2>Best Practices</h2>
            <ul className="csep-best-list">
              <li>Choose appropriate separators for your data type</li>
              <li>Consider using tabs for structured data</li>
              <li>Avoid using separators that appear in your data</li>
              <li>Back up your data before processing</li>
            </ul>
          </article>

          <article className="csep-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="csep-faq-grid">
              <div className="csep-faq-item">
                <h3>What separators are supported?</h3>
                <p>Our tool supports commas, semicolons, tabs, new lines, and custom separators.</p>
              </div>
              <div className="csep-faq-item">
                <h3>Can I process large texts?</h3>
                <p>Yes, the tool can handle large amounts of text efficiently.</p>
              </div>
              <div className="csep-faq-item">
                <h3>Is my data secure?</h3>
                <p>All processing happens in your browser - no data is sent to servers.</p>
              </div>
            </div>
          </article>
        </div>

        <RelatedTools 
          currentTool="/tools/comma-separator" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 