"use client";

import { useState } from 'react';
import './html-formatter.css';

export default function HtmlFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [showInput, setShowInput] = useState(true);
  const [preserveComments, setPreserveComments] = useState(true);
  const [copyText, setCopyText] = useState('Copy');

  const formatHtml = () => {
    setError('');
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }

      const inlineTags = new Set([
        'a', 'abbr', 'acronym', 'b', 'bdo', 'big', 'br', 'button', 'cite', 'code',
        'dfn', 'em', 'i', 'img', 'input', 'kbd', 'label', 'map', 'object', 'q',
        'samp', 'script', 'select', 'small', 'span', 'strong', 'sub', 'sup',
        'textarea', 'time', 'tt', 'var'
      ]);

      const voidElements = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
        'param', 'source', 'track', 'wbr'
      ]);

      // Store comments for later reinsertion
      const comments: { placeholder: string; content: string }[] = [];
      let commentCounter = 0;
      let processedHtml = input;

      if (preserveComments) {
        processedHtml = input.replace(/<!--[\s\S]*?-->/g, (match) => {
          const placeholder = `__COMMENT${commentCounter}__`;
          comments.push({ placeholder, content: match });
          commentCounter++;
          return placeholder;
        });
      } else {
        processedHtml = input.replace(/<!--[\s\S]*?-->/g, '');
      }

      // Pre-process the HTML
      processedHtml = processedHtml
        .replace(/\r\n|\r|\n/g, ' ')     // Normalize line breaks
        .replace(/\s+/g, ' ')            // Normalize whitespace
        .replace(/>\s+</g, '><')         // Remove spaces between tags
        .replace(/\s+>/g, '>')           // Remove spaces before closing brackets
        .replace(/<\s+/g, '<')           // Remove spaces after opening brackets
        .trim();

      // Split into tags while preserving text content
      const tokens = processedHtml.match(/<[^>]+>|[^<]+/g) || [];
      const result: string[] = [];
      let indent = 0;
      let lastTag = '';
      let inPreTag = false;

      tokens.forEach((token) => {
        // Check if we're in a <pre> tag
        if (token.toLowerCase().startsWith('<pre')) {
          inPreTag = true;
        } else if (token.toLowerCase().startsWith('</pre>')) {
          inPreTag = false;
        }

        if (inPreTag) {
          result.push(' '.repeat(indent * indentSize) + token);
          return;
        }

        // Handle DOCTYPE
        if (token.match(/^<!DOCTYPE/i)) {
          result.push(token);
          return;
        }

        // Handle closing tags
        if (token.startsWith('</')) {
          const tagName = token.match(/<\/([a-z0-9]+)/i)?.[1]?.toLowerCase();
          if (tagName && !inlineTags.has(tagName)) {
            indent = Math.max(0, indent - 1);
          }
          result.push(' '.repeat(indent * indentSize) + token);
        }
        // Handle self-closing and void tags
        else if (token.match(/<[^>]+\/>/) || (token.match(/<([a-z0-9]+)/i)?.[1] && 
                voidElements.has(token.match(/<([a-z0-9]+)/i)![1].toLowerCase()))) {
          const tagName = token.match(/<([a-z0-9]+)/i)?.[1]?.toLowerCase();
          if (tagName && !inlineTags.has(tagName)) {
            result.push(' '.repeat(indent * indentSize) + token);
          } else {
            result.push(token);
          }
        }
        // Handle opening tags
        else if (token.startsWith('<')) {
          const tagName = token.match(/<([a-z0-9]+)/i)?.[1]?.toLowerCase();
          if (tagName && !inlineTags.has(tagName)) {
            result.push(' '.repeat(indent * indentSize) + token);
            indent++;
          } else {
            result.push(token);
          }
        }
        // Handle text content
        else {
          const text = token.trim();
          if (text) {
            if (lastTag && !inlineTags.has(lastTag)) {
              result.push(' '.repeat(indent * indentSize) + text);
            } else {
              result.push(text);
            }
          }
        }

        // Update last tag
        const tagMatch = token.match(/<\/?([a-z0-9]+)/i);
        if (tagMatch) {
          lastTag = tagMatch[1].toLowerCase();
        }
      });

      let formattedOutput = result.join('\n');

      // Restore comments
      if (preserveComments) {
        comments.forEach(({ placeholder, content }) => {
          formattedOutput = formattedOutput.replace(placeholder, content);
        });
      }

      setOutput(formattedOutput);
      setShowInput(false);
    } catch (err: any) {
      setError('Error formatting HTML: ' + err.message);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyText('Copied!');
      
      // Reset back to "Copy" after 2 seconds
      setTimeout(() => {
        setCopyText('Copy');
      }, 2000);
    } catch (err) {
      setError('Failed to copy to clipboard');
      setCopyText('Copy');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      setError('Failed to paste from clipboard');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
    setShowInput(true);
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>HTML Formatter</h1>
          <p>Format and beautify your HTML code. Make your HTML readable with proper indentation and structure.</p>
        </div>

        <div className="formatter-main">
          <div className="controls">
            <div className="control-group">
              <label>Indent Size:</label>
              <input
                type="number"
                min="1"
                max="8"
                value={indentSize}
                onChange={(e) => setIndentSize(parseInt(e.target.value))}
              />
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={preserveComments}
                  onChange={(e) => setPreserveComments(e.target.checked)}
                />
                Preserve Comments
              </label>
            </div>
            <div className="control-buttons">
              <button onClick={handlePaste}>Paste</button>
              <button onClick={clearAll}>Clear</button>
              <button onClick={() => setShowInput(!showInput)}>
                {showInput ? 'Hide Input' : 'Show Input'}
              </button>
            </div>
          </div>

          <div className={`editor-container ${showInput ? '' : 'input-hidden'}`}>
            {showInput && (
              <div className="input-section">
                <h2>Input HTML</h2>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your HTML code here..."
                />
                <button onClick={formatHtml} className="format-btn">Format HTML</button>
              </div>
            )}

            <div className={`output-section ${showInput ? '' : 'full-width'}`}>
              <div className="output-header">
                <h2>Formatted HTML</h2>
                {output && (
                  <button 
                    onClick={copyToClipboard}
                    className={copyText === 'Copied!' ? 'copied' : ''}
                  >
                    {copyText}
                  </button>
                )}
              </div>
              {error ? (
                <div className="error-message">{error}</div>
              ) : (
                <pre className="output-content">
                  <code>{output}</code>
                </pre>
              )}
            </div>
          </div>
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>What is HTML Formatting?</h2>
            <p>
              HTML formatting is the process of organizing HTML code in a consistent, readable manner.
              Proper formatting makes code easier to maintain, debug, and collaborate on.
            </p>
          </article>

          <article className="info-box">
            <h2>Best Practices</h2>
            <ul className="practices-list">
              <li>Use proper indentation for nested elements</li>
              <li>Close all tags properly</li>
              <li>Use lowercase for tag names and attributes</li>
              <li>Include DOCTYPE declaration</li>
              <li>Validate your HTML code regularly</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Benefits of Formatting</h2>
            <ul className="benefits-list">
              <li>Improves code readability</li>
              <li>Makes debugging easier</li>
              <li>Facilitates team collaboration</li>
              <li>Helps identify structural issues</li>
              <li>Makes maintenance more efficient</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Is HTML formatting necessary?</h3>
                <p>
                  While not required for functionality, proper HTML formatting is essential for code maintainability
                  and collaboration. It makes your code easier to read, debug, and modify.
                </p>
              </div>
              <div className="faq-item">
                <h3>Does formatting affect performance?</h3>
                <p>
                  No, HTML formatting is purely for human readability. Browsers ignore extra whitespace
                  and indentation when rendering the page.
                </p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 