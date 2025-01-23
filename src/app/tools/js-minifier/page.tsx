"use client";

import { useState, useEffect } from 'react';
import { minifyJS } from './minifier';
import './js-minifier.css';

export default function JsMinifier() {
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
    mangle: true,
    removeComments: true,
    compress: true
  });

  const handleMinify = () => {
    if (!input.trim()) {
      setError('Please enter some JavaScript code');
      return;
    }

    setIsProcessing(true);
    setError('');

    try {
      const originalSize = new Blob([input]).size;
      const minifiedCode = minifyJS(input, options);
      const minifiedSize = new Blob([minifiedCode]).size;
      
      setOutput(minifiedCode);
      setStats({
        originalSize,
        minifiedSize,
        savings: ((originalSize - minifiedSize) / originalSize * 100).toFixed(2)
      });
    } catch (err) {
      setError('Invalid JavaScript code: ' + (err as Error).message);
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
    const blob = new Blob([output], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'minified.js';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="jsmin-container">
      <div className="jsmin-workspace">
        <div className="jsmin-header">
          <h1>JavaScript & Library Minifier</h1>
          <p>Compress and optimize JavaScript code and popular libraries for production</p>
        </div>

        <div className="jsmin-editor">
          <div className="jsmin-input">
            <h2>Original Code</h2>
            <textarea 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your JavaScript code here..."
              spellCheck="false"
              autoCapitalize="off"
              autoComplete="off"
              autoCorrect="off"
            />
          </div>

          <div className="jsmin-controls">
            <div className="jsmin-options">
              <label>
                <input 
                  type="checkbox"
                  checked={options.compress}
                  onChange={(e) => setOptions({...options, compress: e.target.checked})}
                />
                Compress
              </label>
              <label>
                <input 
                  type="checkbox"
                  checked={options.mangle}
                  onChange={(e) => setOptions({...options, mangle: e.target.checked})}
                />
                Mangle Variables
              </label>
              <label>
                <input 
                  type="checkbox"
                  checked={options.removeComments}
                  onChange={(e) => setOptions({...options, removeComments: e.target.checked})}
                />
                Remove Comments
              </label>
            </div>

            <button 
              className="jsmin-btn-minify"
              onClick={handleMinify}
              disabled={isProcessing || !input.trim()}
            >
              {isProcessing ? 'Processing...' : 'Minify Code'}
            </button>
          </div>

          <div className="jsmin-output">
            <div className="jsmin-output-header">
              <h2>Minified Code</h2>
              {output && (
                <button 
                  className={`jsmin-copy-btn ${copied ? 'copied' : ''}`}
                  onClick={() => handleCopy(output)}
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              )}
            </div>
            <textarea 
              value={output}
              readOnly
              placeholder="Minified code will appear here..."
            />
            {error && <div className="jsmin-error">{error}</div>}
          </div>

          {stats && (
            <div className="jsmin-stats">
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
            <div className="jsmin-actions">
              <button onClick={() => handleCopy(output)} className="jsmin-btn-copy">
                Copy to Clipboard
              </button>
              <button onClick={handleDownload} className="jsmin-btn-download">
                Download Minified Code
              </button>
            </div>
          )}

          <div className="info-sections">
            <article className="jsmin-info-box">
              <h2>What is JavaScript Minification?</h2>
              <p>JavaScript minification is the process of reducing the code file size by:</p>
              <ul>
                <li>Removing unnecessary characters</li>
                <li>Shortening variable names</li>
                <li>Combining multiple files</li>
                <li>Optimizing code structure</li>
              </ul>
            </article>

            <article className="jsmin-info-box">
              <h2>Benefits of Minification</h2>
              <div className="benefits-grid">
                <div className="benefit-item">
                  <h3>🚀 Faster Load Times</h3>
                  <p>Reduced file size means quicker downloads and faster page loads</p>
                </div>
                <div className="benefit-item">
                  <h3>💰 Lower Bandwidth Costs</h3>
                  <p>Smaller files consume less bandwidth, reducing hosting costs</p>
                </div>
                <div className="benefit-item">
                  <h3>🔒 Basic Code Protection</h3>
                  <p>Minified code is harder to read and understand</p>
                </div>
                <div className="benefit-item">
                  <h3>📱 Better Mobile Experience</h3>
                  <p>Faster loading on mobile networks and devices</p>
                </div>
              </div>
            </article>

            <article className="jsmin-info-box">
              <h2>Best Practices</h2>
              <ul className="best-practices">
                <li>Always keep original source code</li>
                <li>Use source maps in development</li>
                <li>Test minified code before deployment</li>
                <li>Combine minification with compression</li>
                <li>Include version numbers in filenames</li>
              </ul>
            </article>
          </div>
        </div>
      </div>
    </div>
  );
} 