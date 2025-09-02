"use client";

import { useState, useRef } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './base64-converter.css';

type Mode = 'encode' | 'decode';
type InputType = 'text' | 'file';

interface StatusMessage {
  type: 'success' | 'error';
  message: string;
}

interface FileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

export default function Base64Converter() {
  const [mode, setMode] = useState<Mode>('encode');
  const [inputType, setInputType] = useState<InputType>('text');
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileInfo, setFileInfo] = useState<FileInfo | null>(null);
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null);
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copying' | 'copied'>('idle');
  const [isDragging, setIsDragging] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const outputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Base64 Encoding function
  const encodeBase64 = (text: string): string => {
    try {
      return btoa(unescape(encodeURIComponent(text)));
    } catch (error) {
      throw new Error('Invalid characters for Base64 encoding'+ error);
    }
  };

  // Base64 Decoding function
  const decodeBase64 = (text: string): string => {
    try {
      return decodeURIComponent(escape(atob(text)));
    } catch (error) {
      throw new Error('Invalid Base64 string' + error);
    }
  };

  // File to Base64 conversion
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (data:type;base64,)
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  // Base64 to file download
  const downloadBase64AsFile = (base64: string, filename: string, mimeType: string = 'application/octet-stream') => {
    try {
      const byteCharacters = atob(base64);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: mimeType });

      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);
    } catch (error) {
      throw new Error('Failed to convert Base64 to file' + error);
    }
  };

  // Process text input
  const processText = () => {
    if (!inputText.trim()) {
      setStatusMessage({ type: 'error', message: 'Please enter some text to process' });
      return;
    }

    try {
      let result = '';

      if (mode === 'encode') {
        result = encodeBase64(inputText);
        setStatusMessage({ type: 'success', message: 'Text encoded to Base64 successfully!' });
      } else {
        result = decodeBase64(inputText);
        setStatusMessage({ type: 'success', message: 'Base64 decoded to text successfully!' });
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

  // Process file input
  const processFile = async () => {
    if (!selectedFile) {
      setStatusMessage({ type: 'error', message: 'Please select a file to process' });
      return;
    }

    try {
      if (mode === 'encode') {
        const base64 = await fileToBase64(selectedFile);
        setOutputText(base64);
        setStatusMessage({ type: 'success', message: 'File encoded to Base64 successfully!' });
      } else {
        // For decode mode with file input, we expect the file to contain Base64 text
        const text = await selectedFile.text();
        const decoded = decodeBase64(text.trim());
        setOutputText(decoded);
        setStatusMessage({ type: 'success', message: 'Base64 file decoded successfully!' });
      }

      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      setStatusMessage({ type: 'error', message: errorMessage });
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  // Handle file selection
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setFileInfo({
      name: file.name,
      size: file.size,
      type: file.type || 'Unknown',
      lastModified: file.lastModified
    });
  };

  // File input change handler
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
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

  // Download as file
  const downloadAsFile = () => {
    if (!outputText) {
      setStatusMessage({ type: 'error', message: 'No output to download' });
      return;
    }

    try {
      if (mode === 'decode' && inputType === 'file') {
        // Try to download as the original file type
        const originalName = selectedFile?.name.replace(/\.[^/.]+$/, '') || 'decoded_file';
        downloadBase64AsFile(outputText, originalName, selectedFile?.type);
      } else {
        // Download as text file
        const blob = new Blob([outputText], { type: 'text/plain' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = mode === 'encode' ? 'encoded_base64.txt' : 'decoded_text.txt';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      }

      setStatusMessage({ type: 'success', message: 'File downloaded successfully!' });
      setTimeout(() => setStatusMessage(null), 2000);
    } catch (error) {
      setStatusMessage({ type: 'error', message: 'Failed to download file'+ error });
      setTimeout(() => setStatusMessage(null), 3000);
    }
  };

  // Clear all
  const clearAll = () => {
    setInputText('');
    setOutputText('');
    setSelectedFile(null);
    setFileInfo(null);
    setStatusMessage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Swap input and output
  const swapTexts = () => {
    if (inputType === 'file') {
      setStatusMessage({ type: 'error', message: 'Swap is only available for text input' });
      return;
    }

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
    setInputType('text');
    setInputText(text);
    inputRef.current?.focus();
  };

  // Format file size
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // Example data
  const examples = {
    encode: [
      {
        label: 'Simple text:',
        text: 'Hello, World!'
      },
      {
        label: 'JSON data:',
        text: '{"name": "John", "age": 30, "city": "New York"}'
      },
      {
        label: 'Special characters:',
        text: 'Hello! 你好 🌍 Café'
      }
    ],
    decode: [
      {
        label: 'Encoded "Hello, World!":',
        text: 'SGVsbG8sIFdvcmxkIQ=='
      },
      {
        label: 'Encoded JSON:',
        text: 'eyJuYW1lIjogIkpvaG4iLCAiYWdlIjogMzAsICJjaXR5IjogIk5ldyBZb3JrIn0='
      },
      {
        label: 'Encoded special characters:',
        text: 'SGVsbG8hIOS9oOWlvSDwn42NIENhZsOp'
      }
    ]
  };

  return (
    <div className="base64-converter">
      <div className="container">
        <header className="header">
          <h1>Base64 Encoder / Decoder</h1>
          <p className="description">
            Encode and decode Base64 strings for text and files. Perfect for data transmission, API integration, and file encoding.
          </p>
        </header>

        <div className="main-content">
          {/* Mode Selector */}
          <div className="mode-selector">
            <button
              className={`mode-button ${mode === 'encode' ? 'active' : ''}`}
              onClick={() => setMode('encode')}
            >
              🔒 Encode to Base64
            </button>
            <button
              className={`mode-button ${mode === 'decode' ? 'active' : ''}`}
              onClick={() => setMode('decode')}
            >
              🔓 Decode from Base64
            </button>
          </div>

          {/* Input Type Selector */}
          <div className="input-type-selector">
            <button
              className={`input-type-button ${inputType === 'text' ? 'active' : ''}`}
              onClick={() => setInputType('text')}
            >
              📝 Text Input
            </button>
            <button
              className={`input-type-button ${inputType === 'file' ? 'active' : ''}`}
              onClick={() => setInputType('file')}
            >
              📁 File Input
            </button>
          </div>

          {/* Converter */}
          <div className="converter-container">
            {inputType === 'file' ? (
              <>
                {/* File Upload Area */}
                <div 
                  className={`file-upload-area ${isDragging ? 'dragging' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileInputChange}
                    className="file-input"
                    accept={mode === 'decode' ? '.txt,.base64' : '*/*'}
                  />

                  <div className="upload-content">
                    <div className="upload-icon">📁</div>
                    <p>
                      {mode === 'encode' 
                        ? 'Drop any file here to encode to Base64'
                        : 'Drop a Base64 text file here to decode'
                      }
                    </p>
                    <p className="file-types">
                      {mode === 'encode' 
                        ? 'Supports any file type (images, documents, etc.)'
                        : 'Supports .txt, .base64 files containing Base64 data'
                      }
                    </p>
                    <button className="select-file-button">
                      Select File
                    </button>
                  </div>
                </div>

                {/* File Info */}
                {fileInfo && (
                  <div className="file-info">
                    <h4>Selected File</h4>
                    <div className="file-details">
                      <div className="file-detail">
                        <span>Name:</span>
                        <span>{fileInfo.name}</span>
                      </div>
                      <div className="file-detail">
                        <span>Size:</span>
                        <span>{formatFileSize(fileInfo.size)}</span>
                      </div>
                      <div className="file-detail">
                        <span>Type:</span>
                        <span>{fileInfo.type}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* File Action Buttons */}
                <div className="action-buttons">
                  <button className="action-button" onClick={processFile} disabled={!selectedFile}>
                    {mode === 'encode' ? '🔒 Encode File to Base64' : '🔓 Decode Base64 File'}
                  </button>
                  <button className="action-button secondary" onClick={clearAll}>
                    🗑️ Clear All
                  </button>
                </div>
              </>
            ) : (
              <>
                {/* Text Input Section */}
                <div className="input-section">
                  <div className="section-label">
                    <h3>{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</h3>
                    <span className="char-count">{inputText.length} characters</span>
                  </div>
                  <textarea
                    ref={inputRef}
                    className="text-input"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder={
                      mode === 'encode'
                        ? 'Enter text to encode to Base64...'
                        : 'Enter Base64 string to decode...'
                    }
                    rows={6}
                  />
                </div>

                {/* Text Action Buttons */}
                <div className="action-buttons">
                  <button className="action-button" onClick={processText}>
                    {mode === 'encode' ? '🔒 Encode to Base64' : '🔓 Decode from Base64'}
                  </button>
                  <button className="action-button secondary" onClick={swapTexts}>
                    🔄 Swap & Switch Mode
                  </button>
                  <button className="action-button secondary" onClick={clearAll}>
                    🗑️ Clear All
                  </button>
                </div>
              </>
            )}

            {/* Output Section */}
            <div className="output-section">
              <div className="section-label">
                <h3>{mode === 'encode' ? 'Base64 Output' : 'Decoded Output'}</h3>
                <span className="char-count">{outputText.length} characters</span>
              </div>
              <div className="output-container">
                <textarea
                  ref={outputRef}
                  className="text-output"
                  value={outputText}
                  readOnly
                  placeholder={`${mode === 'encode' ? 'Base64 encoded' : 'Decoded'} result will appear here...`}
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

            {/* Download Button */}
            {outputText && (
              <div className="action-buttons">
                <button className="action-button" onClick={downloadAsFile}>
                  💾 Download as File
                </button>
              </div>
            )}

            {/* Status Message */}
            {statusMessage && (
              <div className={`status-message ${statusMessage.type}`}>
                {statusMessage.message}
              </div>
            )}
          </div>

          {/* Examples */}
          {inputType === 'text' && (
            <div className="examples-section">
              <h3>Example {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</h3>
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
          )}
        </div>

        {/* Middle Ad */}

        <section className="features-section">
          <h2>Why Use Our Base64 Converter?</h2>
          <div className="features">
            <div className="feature">
              <h3>🔒 Secure Processing</h3>
              <p>All encoding and decoding happens in your browser. Your data never leaves your device.</p>
            </div>
            <div className="feature">
              <h3>📁 File Support</h3>
              <p>Encode any file type to Base64 or decode Base64 back to files with download support.</p>
            </div>
            <div className="feature">
              <h3>⚡ Instant Results</h3>
              <p>Real-time processing with immediate results for both text and file conversions.</p>
            </div>
          </div>
        </section>

        <section className="info-section">
          <div className="info-grid">
            <article className="info-card">
              <h3>What is Base64 Encoding?</h3>
              <p>Base64 is a binary-to-text encoding scheme that represents binary data in an ASCII string format. Its commonly used for:</p>
              <ul>
                <li>Email attachments (MIME)</li>
                <li>Data URLs in web pages</li>
                <li>API data transmission</li>
                <li>Configuration files</li>
                <li>Embedding images in CSS/HTML</li>
              </ul>
            </article>
            <article className="info-card">
              <h3>Common Use Cases</h3>
              <p>Base64 encoding is essential for:</p>
              <ul>
                <li>Embedding images in emails or web pages</li>
                <li>Storing binary data in JSON or XML</li>
                <li>API authentication tokens</li>
                <li>Database storage of binary data</li>
                <li>Cross-platform data exchange</li>
              </ul>
            </article>
            <article className="info-card">
              <h3>Best Practices</h3>
              <p>When working with Base64:</p>
              <ul>
                <li>Remember that Base64 increases size by ~33%</li>
                <li>Use for small to medium files only</li>
                <li>Always validate decoded data</li>
                <li>Consider compression before encoding</li>
                <li>Be aware of line length limits in some systems</li>
              </ul>
            </article>
          </div>
        </section>

        <section className="faq-section">
          <h2>Frequently Asked Questions</h2>
          <div className="faq-grid">
            <div className="faq-item">
              <h3>Is Base64 encoding secure?</h3>
              <p>Base64 is encoding, not encryption. Its easily reversible and should not be used for security purposes. Use proper encryption for sensitive data.</p>
            </div>
            <div className="faq-item">
              <h3>What file types can I encode?</h3>
              <p>You can encode any file type to Base64 - images, documents, videos, executables, etc. The tool handles all binary data.</p>
            </div>
            <div className="faq-item">
              <h3>Why does Base64 make files larger?</h3>
              <p>Base64 encoding increases file size by approximately 33% because it uses 4 ASCII characters to represent every 3 bytes of binary data.</p>
            </div>
            <div className="faq-item">
              <h3>Can I decode any Base64 string?</h3>
              <p>You can decode any valid Base64 string. Invalid characters or incorrect padding will result in an error message.</p>
            </div>
          </div>
        </section>

        <RelatedTools 
          currentTool="/tools/base64-converter" 
          category="Developer Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
}