"use client";

import { useState, useRef } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './url-encoder-decoder.css';

type Mode = 'encode' | 'decode';

interface StatusMessage {
  type: 'success' | 'error';
  message: string;
}

export default function URLEncoderDecoder() {
  const [mode, setMode] = useState<Mode>('encode');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'copied'>('idle');

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);

  // URL Encoding function
  const encodeURL = (text: string): string => {
    try {
      return encodeURIComponent(text);
    } catch (error) {
      throw new Error('Invalid characters for URL encoding' + error);
    }
  };

  // URL Decoding function
  const decodeURL = (text: string): string => {
    try {
      return decodeURIComponent(text);
    } catch (error) {
      throw new Error('Invalid URL encoded string' + error);
    }
  };

  // Process the input text
  const processText = () => {
    if (!inputText.trim()) {
      setStatusMessage({ type: 'error', message: 'Please enter some text to process' });
      return;
    }

    try {
      let result = '';
      
      if (mode === 'encode') {
        result = encodeURL(inputText);
        setStatusMessage({ type: 'success', message: 'URL encoded successfully!' });
      } else {
        result = decodeURL(inputText);
        setStatusMessage({ type: 'success', message: 'URL decoded successfully!' });
      }
      
      setOutputText(result);
      
      // Clear status message after 3 seconds
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setStatusMessage({ type: 'error', message: errorMessage });
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string) => {
    if (!text) {
      setStatusMessage({ type: 'error', message: 'Nothing to copy' });
      return;
    }

    try {
      setCopyStatus('copying');
      await navigator.clipboard.writeText(text);
      setCopyStatus('copied');
      setStatusMessage({ type: 'success', message: 'Copied to clipboard!' });
      
      setTimeout(() => {
        setCopyStatus('idle');
        setStatusMessage(null);
      }, 2000);
    } catch (error) {
      setCopyStatus('idle');
      setStatusMessage({ type: 'error', message: 'Failed to copy to clipboard' + error });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Clear all text
  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setStatusMessage(null);
    inputRef.current?.focus();
  };

  // Swap input and output
  const swapTexts = () => {
    if (!outputText) {
      setStatusMessage({ type: 'error', message: 'No output to swap' });
      return;
    }
    
    setInputText(outputText);
    setOutputText('');
    setMode(mode === 'encode' ? 'decode' : 'encode');
    setStatusMessage({ type: 'success', message: 'Texts swapped and mode switched!' });
    setTimeout(() => setStatusMessage(null), 2000);
  };

  // Handle example click
  const handleExampleClick = (text: string) => {
    setInputText(text);
    inputRef.current?.focus();
  };

  // Quick actions
  const quickActions = [
    {
      icon: '🔗',
      title: 'Encode URL',
      desc: 'Convert special characters',
      action: () => {
        setMode('encode');
        inputRef.current?.focus();
      }
    },
    {
      icon: '🔓',
      title: 'Decode URL',
      desc: 'Convert back to readable text',
      action: () => {
        setMode('decode');
        inputRef.current?.focus();
      }
    },
    {
      icon: '🔄',
      title: 'Swap & Switch',
      desc: 'Swap texts and switch mode',
      action: swapTexts
    },
    {
      icon: '🗑️',
      title: 'Clear All',
      desc: 'Clear input and output',
      action: clearAll
    }
  ];

  // Example URLs
  const examples = {
    encode: [
      {
        label: 'URL with spaces and special characters:',
        text: 'https://example.com/search?q=hello world&category=news'
      },
      {
        label: 'Text with symbols:',
        text: 'Hello World! How are you? 100% great!'
      },
      {
        label: 'Email address:',
        text: 'user@example.com'
      }
    ],
    decode: [
      {
        label: 'Encoded URL:',
        text: 'https%3A//example.com/search%3Fq%3Dhello%20world%26category%3Dnews'
      },
      {
        label: 'Encoded text:',
        text: 'Hello%20World!%20How%20are%20you%3F%20100%25%20great!'
      },
      {
        label: 'Encoded email:',
        text: 'user%40example.com'
      }
    ]
  };

  return (
    <div className="url-encoder-decoder">
      <div className="container">
        <header className="header">
          <h1>URL Encoder / Decoder</h1>
          <p className="description">
            Encode and decode URLs and text for web-safe transmission. Convert special characters, spaces, and symbols with ease.
          </p>
        </header>

        <div className="main-content">
          {/* Mode Selector */}
          <div className="mode-selector">
            <button
              className={`mode-button ${mode === 'encode' ? 'active' : ''}`}
              onClick={() => setMode('encode')}
            >
              🔗 Encode URL
            </button>
            <button
              className={`mode-button ${mode === 'decode' ? 'active' : ''}`}
              onClick={() => setMode('decode')}
            >
              🔓 Decode URL
            </button>
          </div>

          {/* Converter */}
          <div className="converter-container">
            {/* Input Section */}
            <div className="input-section">
              <div className="section-label">
                <h3>{mode === 'encode' ? 'Original Text/URL' : 'Encoded URL'}</h3>
                <span className="char-count">{inputText.length} characters</span>
              </div>
              <textarea
                ref={inputRef}
                className="text-input"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder={
                  mode === 'encode'
                    ? 'Enter text or URL to encode (e.g., https://example.com/search?q=hello world)'
                    : 'Enter encoded URL to decode (e.g., https%3A//example.com/search%3Fq%3Dhello%20world)'
                }
                rows={6}
              />
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
              <button className="action-button" onClick={processText}>
                {mode === 'encode' ? '🔗 Encode URL' : '🔓 Decode URL'}
              </button>
              <button className="action-button secondary" onClick={swapTexts}>
                🔄 Swap & Switch Mode
              </button>
              <button className="action-button secondary" onClick={clearAll}>
                🗑️ Clear All
              </button>
            </div>

            {/* Output Section */}
            <div className="output-section">
              <div className="section-label">
                <h3>{mode === 'encode' ? 'Encoded URL' : 'Decoded Text/URL'}</h3>
                <span className="char-count">{outputText.length} characters</span>
              </div>
              <div className="output-container">
                <textarea
                  ref={outputRef}
                  className="text-output"
                  value={outputText}
                  readOnly
                  placeholder={`${mode === 'encode' ? 'Encoded' : 'Decoded'} result will appear here...`}
                  rows={6}
                />
                {outputText && (
                  <button
                    className={`copy-button ${copyStatus === 'copied' ? 'copied' : ''}`}
                    onClick={() => copyToClipboard(outputText)}
                    disabled={copyStatus === 'copying'}
                  >
                    {copyStatus === 'copied' ? '✓ Copied' : copyStatus === 'copying' ? '⏳ Copying...' : '📋 Copy'}
                  </button>
                )}
              </div>
            </div>

            {/* Status Message */}
            {statusMessage && (
              <div className={`status-message ${statusMessage.type}`}>
                {statusMessage.message}
              </div>
            )}
          </div>

          {/* Quick Actions */}
          <div className="quick-actions">
            {quickActions.map((action, index) => (
              <div key={index} className="quick-action" onClick={action.action}>
                <div className="quick-action-icon">{action.icon}</div>
                <div className="quick-action-title">{action.title}</div>
                <div className="quick-action-desc">{action.desc}</div>
              </div>
            ))}
          </div>

          {/* Examples */}
          <div className="url-examples">
            <h3>Example {mode === 'encode' ? 'URLs to Encode' : 'URLs to Decode'}</h3>
            {examples[mode].map((example, index) => (
              <div key={index} className="example-item">
                <div className="example-label">{example.label}</div>
                <div 
                  className="example-text"
                  onClick={() => handleExampleClick(example.text)}
                  title="Click to use this example"
                >
                  {example.text}
                </div>
              </div>
            ))}
          </div>
        </div>

        <section className="features-section">
          <h2>Why Use Our URL Encoder/Decoder?</h2>
          <div className="features">
            <div className="feature">
              <h3>🚀 Instant Processing</h3>
              <p>Real-time encoding and decoding with immediate results. No waiting, no delays.</p>
            </div>
            <div className="feature">
              <h3>🔒 Privacy First</h3>
              <p>All processing happens in your browser. Your URLs and data never leave your device.</p>
            </div>
            <div className="feature">
              <h3>⚡ Developer Friendly</h3>
              <p>Perfect for web developers, API testing, and URL manipulation tasks.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-grid">
            <article className="info-card">
              <h3>What is URL Encoding?</h3>
              <p>URL encoding (also called percent encoding) converts characters into a format that can be transmitted over the Internet. Special characters are replaced with a % followed by two hexadecimal digits.</p>
              <p>Common characters that need encoding:</p>
              <ul>
                <li>Space → %20</li>
                <li>! → %21</li>
                <li>@ → %40</li>
                <li>& → %26</li>
                <li>? → %3F</li>
              </ul>
            </article>
            <article className="info-card">
              <h3>When to Use URL Encoding</h3>
              <p>URL encoding is essential when:</p>
              <ul>
                <li>Passing data in URL parameters</li>
                <li>Working with APIs that require encoded URLs</li>
                <li>Handling special characters in web forms</li>
                <li>Creating safe URLs for email or sharing</li>
                <li>Debugging web applications</li>
              </ul>
            </article>
            <article className="info-card">
              <h3>Best Practices</h3>
              <p>Follow these guidelines for effective URL encoding:</p>
              <ul>
                <li>Always encode user input before adding to URLs</li>
                <li>Decode URLs when displaying to users</li>
                <li>Use proper encoding for different URL parts</li>
                <li>Test encoded URLs before deployment</li>
                <li>Be aware of double-encoding issues</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Whats the difference between URL encoding and HTML encoding?</h3>
              <p>URL encoding is for URLs and uses % followed by hex codes. HTML encoding is for HTML content and uses entities like &amp; for &.</p>
            </div>
            <div className="faq-item">
              <h3>Can I encode entire URLs?</h3>
              <p>Yes, but typically you only encode the query parameters and path segments, not the entire URL including protocol and domain.</p>
            </div>
            <div className="faq-item">
              <h3>Is URL encoding reversible?</h3>
              <p>Yes, URL encoding is completely reversible. Decoding will restore the original text exactly as it was before encoding.</p>
            </div>
            <div className="faq-item">
              <h3>Are there characters that dont need encoding?</h3>
              <p>Yes, alphanumeric characters (A-Z, a-z, 0-9) and some special characters like hyphens, periods, and underscores are safe and dont need encoding.</p>
            </div>
          </div>
        </section>

        <RelatedTools 
          currentTool="/tools/url-encoder-decoder" 
          category="Developer Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
}