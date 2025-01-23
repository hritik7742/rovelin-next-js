"use client";

import { useState } from 'react';
import './json-formatter.css';

export default function JsonFormatter() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [indentSize, setIndentSize] = useState(2);
  const [showInput, setShowInput] = useState(true);
  const [copyText, setCopyText] = useState('Copy');

  const formatJson = () => {
    setError('');
    try {
      if (!input.trim()) {
        setOutput('');
        return;
      }
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, indentSize);
      setOutput(formatted);
      setShowInput(false);
    } catch (err) {
      setError('Invalid JSON: ' + err);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(output);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    } catch (err) {
      setError('Failed to copy to clipboard' + err);
      setCopyText('Copy');
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setInput(text);
    } catch (err) {
      setError('Failed to paste from clipboard: ' + err);
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
          <h1>JSON Formatter</h1>
          <p>{"Format, validate, and beautify your JSON data. Make your JSON readable and catch syntax errors instantly."}</p>
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
                <h2>Input JSON</h2>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                />
                <button onClick={formatJson} className="format-btn">Format JSON</button>
              </div>
            )}

            <div className={`output-section ${showInput ? '' : 'full-width'}`}>
              <div className="output-header">
                <h2>Formatted JSON</h2>
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
            <h2>What is JSON?</h2>
            <p>{"JSON (JavaScript Object Notation) is a lightweight data-interchange format. It's easy for humans to read and write, and easy for machines to parse and generate."}</p>
          </article>

          <article className="info-box">
            <h2>Common Use Cases</h2>
            <ul className="practices-list">
              <li>API responses and requests</li>
              <li>Configuration files</li>
              <li>Data storage</li>
              <li>Web services integration</li>
              <li>Cross-origin resource sharing</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Benefits of Formatting</h2>
            <ul className="benefits-list">
              <li>Improves readability</li>
              <li>Easier debugging</li>
              <li>Better code maintenance</li>
              <li>Helps identify errors</li>
              <li>Enhanced collaboration</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>What makes JSON valid?</h3>
                <p>{"Valid JSON must follow specific rules: it must start with an object {} or array [], use double quotes for strings, and use valid data types."}</p>
              </div>
              <div className="faq-item">
                <h3>Why format JSON?</h3>
                <p>{"Formatting JSON makes it human-readable and easier to debug. It helps identify structure and relationships in the data."}</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 