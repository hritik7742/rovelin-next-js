"use client";

import { useState } from 'react';
import './css-minifier.css';

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [showInput, setShowInput] = useState(true);
  const [stats, setStats] = useState({ original: 0, minified: 0, saved: 0 });

  const minifyCss = () => {
    try {
      if (!input.trim()) {
        setError('Please enter CSS code to minify');
        return;
      }

      // Remove comments
      let minified = input.replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '');

      // Remove whitespace and newlines
      minified = minified
        .replace(/\s*{\s*/g, '{')
        .replace(/\s*}\s*/g, '}')
        .replace(/\s*;\s*/g, ';')
        .replace(/\s*:\s*/g, ':')
        .replace(/\s*,\s*/g, ',')
        .replace(/\s+/g, ' ')
        .trim();

      // Calculate stats
      const originalSize = input.length;
      const minifiedSize = minified.length;
      const savedBytes = originalSize - minifiedSize;
      const savedPercentage = ((savedBytes / originalSize) * 100).toFixed(1);

      setStats({
        original: originalSize,
        minified: minifiedSize,
        saved: Number(savedPercentage)
      });

      setOutput(minified);
      setError('');
      setShowInput(false);
    } catch (err: any) {
      setError('Error minifying CSS: ' + err.message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      // You could add a copied confirmation here
    } catch (err) {
      setError('Failed to copy to clipboard');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setShowInput(true);
    setStats({ original: 0, minified: 0, saved: 0 });
  };

  const toggleView = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="minifier-container">
      <div className="minifier-workspace">
        <div className="tool-header">
          <h1>CSS Minifier</h1>
          <p>Minify your CSS code to reduce file size and improve load times</p>
        </div>

        <div className="minifier-main">
          <div className="editor-section">
            <div className="editor-header">
              <h2>{showInput ? 'Input CSS' : 'Minified Output'}</h2>
              <div className="editor-actions">
                {!showInput && (
                  <button className="editor-button" onClick={copyToClipboard}>
                    Copy to Clipboard
                  </button>
                )}
                <button className="editor-button" onClick={toggleView}>
                  {showInput ? 'Show Output' : 'Show Input'}
                </button>
                <button className="editor-button" onClick={clearAll}>
                  Clear All
                </button>
                {showInput && (
                  <button className="editor-button primary" onClick={minifyCss}>
                    Minify CSS
                  </button>
                )}
              </div>
            </div>

            {error && <div className="error-message">{error}</div>}

            {showInput ? (
              <textarea
                className="editor-textarea"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your CSS code here..."
              />
            ) : (
              <textarea
                className="editor-textarea"
                value={output}
                readOnly
                placeholder="Minified CSS will appear here..."
              />
            )}

            {(stats.original > 0 || stats.minified > 0) && (
              <div className="stats-section">
                <div className="stat-item">
                  <div className="stat-label">Original Size</div>
                  <div className="stat-value">{stats.original} bytes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Minified Size</div>
                  <div className="stat-value">{stats.minified} bytes</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">Size Reduction</div>
                  <div className="stat-value">{stats.saved}%</div>
                </div>
              </div>
            )}
          </div>

          <div className="info-sections">
            <article className="info-box">
              <h2>What is CSS Minification?</h2>
              <p>
                CSS minification is the process of reducing CSS file size by removing unnecessary
                characters like whitespace, newlines, and comments without changing its functionality.
                This helps improve website loading speed and performance.
              </p>
            </article>

            <article className="info-box">
              <h2>Benefits of Minifying CSS</h2>
              <ul className="benefits-list">
                <li>Reduced file size and bandwidth usage</li>
                <li>Faster page load times</li>
                <li>Improved website performance</li>
                <li>Better user experience</li>
                <li>Lower hosting costs</li>
              </ul>
            </article>

            <article className="info-box">
              <h2>Best Practices</h2>
              <ul className="practices-list">
                <li>Always keep a copy of your original CSS</li>
                <li>Use source maps in development</li>
                <li>Test minified CSS thoroughly</li>
                <li>Combine multiple CSS files</li>
                <li>Use automated build tools</li>
              </ul>
            </article>

            <article className="info-box">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-grid">
                <div className="faq-item">
                  <h3>Is minification safe?</h3>
                  <p>
                    Yes, CSS minification is safe as it only removes unnecessary characters
                    without changing the functionality of your styles. However, always keep
                    a copy of your original CSS for future editing.
                  </p>
                </div>
                <div className="faq-item">
                  <h3>When should I minify CSS?</h3>
                  <p>
                    You should minify CSS when deploying to production. During development,
                    use the original CSS for better readability and debugging. Many build
                    tools can automate this process.
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
} 