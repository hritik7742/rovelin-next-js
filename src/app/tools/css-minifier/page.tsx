"use client";

import { useState } from 'react';
import { minifyCSS } from './minifier';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './css-minifier.css';

export default function CssMinifier() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [stats, setStats] = useState<{
    originalSize: number;
    minifiedSize: number;
    savings: string;
  } | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [options, setOptions] = useState({ 
    removeComments: true,
    removeWhitespace: true,
    optimizeColors: true
  });

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some CSS code');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const originalSize = new Blob([input]).size;
      const minifiedCode = minifyCSS(input, options);
      const minifiedSize = new Blob([minifiedCode]).size;
      
      setOutput(minifiedCode);
      setStats({
        originalSize,
        minifiedSize,
        savings: ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)
      });
    } catch (err) {
      setError('Error minifying CSS: ' + (err as Error).message);
      console.error('Minification error:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([output], { type: 'text/css' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.css';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="cssmin-container">
      <div className="cssmin-workspace">
        <div className="cssmin-header">
          <h1>CSS Minifier & Optimizer</h1>
          <p>Compress and optimize CSS code to reduce file size and improve website performance</p>
        </div>

        {/* Header Ad */}
        <AdUnit 
          adSlot="8285940620" 
          adFormat="auto"
          className="header-ad"
        />

        <div className="cssmin-editor">
          <div className="cssmin-input">
            <h2>Original CSS</h2>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your CSS code here..."
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          <div className="cssmin-controls">
            <div className="cssmin-options">
              <label>
                <input 
                  type="checkbox"
                  checked={options.removeComments}
                  onChange={(e) => setOptions({...options, removeComments: e.target.checked})}
                />
                Remove Comments
              </label>
              <label>
                <input 
                  type="checkbox"
                  checked={options.removeWhitespace}
                  onChange={(e) => setOptions({...options, removeWhitespace: e.target.checked})}
                />
                Remove Whitespace
              </label>
              <label>
                <input 
                  type="checkbox"
                  checked={options.optimizeColors}
                  onChange={(e) => setOptions({...options, optimizeColors: e.target.checked})}
                />
                Optimize Colors
              </label>
            </div>

            <button 
              className="cssmin-btn-minify"
              onClick={handleMinify}
              disabled={isProcessing || !input.trim()}
            >
              {isProcessing ? 'Processing...' : 'Minify CSS'}
            </button>
          </div>

          <div className="cssmin-output">
            <div className="cssmin-output-header">
              <h2>Minified CSS</h2>
              {output && (
                <button 
                  className={`cssmin-copy-btn ${copied ? 'copied' : ''}`}
                  onClick={() => handleCopy(output)}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <textarea 
              value={output}
              readOnly
              placeholder="Minified CSS will appear here..."
            />
            {error && <div className="cssmin-error">{error}</div>}
          </div>

          {stats && (
            <div className="cssmin-stats">
              <div className="stat-item">
                <span>Original Size</span>
                <span>{(stats.originalSize / 1024).toFixed(2)} KB</span>
              </div>
              <div className="stat-item">
                <span>Minified Size</span>
                <span>{(stats.minifiedSize / 1024).toFixed(2)} KB</span>
              </div>
              <div className="stat-item">
                <span>Savings</span>
                <span>{stats.savings}%</span>
              </div>
            </div>
          )}

          {output && (
            <div className="cssmin-actions">
              <button onClick={() => handleCopy(output)} className="cssmin-btn-copy">
                Copy to Clipboard
              </button>
              <button onClick={handleDownload} className="cssmin-btn-download">
                Download Minified CSS
              </button>
            </div>
          )}

          {/* Middle Ad */}
          <AdUnit 
            adSlot="8285940620" 
            adFormat="auto"
            className="content-ad"
          />

          <div className="info-sections">
            <article className="cssmin-info-box">
              <h2>What is CSS Minification?</h2>
              <p>CSS minification is the process of reducing CSS file size by removing unnecessary characters like whitespace, newlines, and comments without changing its functionality. This helps improve website loading speed and performance.</p>
            </article>

            <article className="cssmin-info-box">
              <h2>Benefits of Minifying CSS</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <h3>🚀 Faster Load Times</h3>
                  <p>Reduced file size means quicker downloads and faster page loads</p>
                </div>
                <div className="benefit-item">
                  <h3>💰 Lower Bandwidth Usage</h3>
                  <p>Smaller files consume less bandwidth, reducing hosting costs</p>
                </div>
                <div className="benefit-item">
                  <h3>📱 Better Mobile Experience</h3>
                  <p>Optimized CSS loads faster on mobile networks and devices</p>
                </div>
                <div className="benefit-item">
                  <h3>⚡ Improved Performance</h3>
                  <p>Better website performance and user experience</p>
                </div>
              </div>
            </article>

            <article className="cssmin-info-box">
              <h2>Best Practices</h2>
              <ul className="best-practices">
                <li>Always keep a copy of your original CSS</li>
                <li>Use source maps in development</li>
                <li>Test minified CSS thoroughly</li>
                <li>Combine multiple CSS files</li>
                <li>Use automated build tools</li>
                <li>Enable gzip compression on your server</li>
              </ul>
            </article>

            <article className="cssmin-info-box">
              <h2>Frequently Asked Questions</h2>
              <div className="faq-grid">
                <div className="faq-item">
                  <h3>Is minification safe?</h3>
                  <p>Yes, CSS minification is safe as it only removes unnecessary characters without changing the functionality of your styles. However, always keep a copy of your original CSS for future editing.</p>
                </div>
                <div className="faq-item">
                  <h3>When should I minify CSS?</h3>
                  <p>You should minify CSS when deploying to production. During development, use the original CSS for better readability and debugging. Many build tools can automate this process.</p>
                </div>
                <div className="faq-item">
                  <h3>Does minification affect browser compatibility?</h3>
                  <p>No, proper CSS minification maintains browser compatibility. The minified CSS works exactly the same as the original, just with a smaller file size.</p>
                </div>
                <div className="faq-item">
                  <h3>Can I minify CSS frameworks?</h3>
                  <p>Yes, you can minify CSS from frameworks like Bootstrap, Tailwind, or custom frameworks. This is especially beneficial for reducing the size of large CSS libraries.</p>
                </div>
              </div>
            </article>
          </div>
        </div>

        <RelatedTools 
          currentTool="/tools/css-minifier" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
}