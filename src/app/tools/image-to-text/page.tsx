"use client";

import { useState, useEffect, useRef } from 'react';
import { validateFile, processImage } from './utils';
import { languages, type LanguageCode } from './languages';
import './image-to-text.css';

export default function ImageToText() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [extractedText, setExtractedText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [language, setLanguage] = useState<LanguageCode>('eng');
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === "dragenter" || e.type === "dragover");
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      await handleFile(file);
    }
  };

  const handleFile = async (file: File) => {
    try {
      validateFile(file);
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError('');
      setExtractedText('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      await handleFile(file);
    }
  };

  const extractText = async () => {
    if (!selectedFile) {
      setError('Please select an image first');
      return;
    }

    setIsProcessing(true);
    setProgress(0);
    setError('');

    try {
      const text = await processImage(
        selectedFile,
        language,
        (progress) => setProgress(progress)
      );

      if (!text || text.trim() === '') {
        throw new Error('No text was found in the image');
      }

      setExtractedText(text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(extractedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  return (
    <div className="ocr-container">
      <div className="ocr-workspace">
        <div className="ocr-header">
          <h1>Image to Text Converter (OCR)</h1>
          <p>Extract text from images in 35+ languages with high accuracy</p>
        </div>

        <div className="ocr-main">
          <div className="ocr-upload-section">
            <div 
              className={`ocr-dropzone ${dragActive ? 'drag-active' : ''}`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
            >
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                accept="image/*"
                className="file-input"
                style={{ display: 'none' }}
              />
              
              {preview ? (
                <img src={preview} alt="Preview" className="image-preview" />
              ) : (
                <div className="upload-prompt">
                  <span className="upload-icon">📷</span>
                  <p>Drag & drop an image or click to browse</p>
                </div>
              )}
            </div>

            <div className="ocr-controls">
              <select 
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="language-select"
                disabled={isProcessing}
              >
                {Object.entries(languages).map(([code, name]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>

              <button 
                onClick={extractText}
                disabled={!selectedFile || isProcessing}
                className="ocr-extract-button"
              >
                {isProcessing ? `Processing ${progress}%` : 'Extract Text'}
              </button>
            </div>

            {error && <div className="ocr-error">{error}</div>}
          </div>

          {extractedText && (
            <div className="ocr-result">
              <div className="result-header">
                <h3>Extracted Text</h3>
                <div className="edit-controls">
                  <span className="edit-indicator">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                    Click to edit
                  </span>
                  <button 
                    onClick={copyToClipboard}
                    className="ocr-copy-button"
                  >
                    {copied ? 'Copied!' : 'Copy Text'}
                  </button>
                </div>
              </div>
              <div 
                className="extracted-text" 
                contentEditable={true}
                suppressContentEditableWarning={true}
                onInput={(e) => setExtractedText(e.currentTarget.textContent || '')}
              >
                {extractedText}
              </div>
            </div>
          )}
        </div>

        {/* SEO-friendly content blocks */}
        <div className="ocr-info">
          <article className="ocr-features">
            <h2>Key Features of Our Image to Text Converter</h2>
            <div className="features-grid">
              <div className="feature-card">
                <h3>🌍 Multilingual Support</h3>
                <p>Extract text from images in 35+ languages including English, Chinese, Japanese, Korean, Hindi, Arabic, and many more.</p>
              </div>
              <div className="feature-card">
                <h3>📱 Mobile Friendly</h3>
                <p>Use our OCR tool on any device - works perfectly on smartphones, tablets, and computers.</p>
              </div>
              <div className="feature-card">
                <h3>🔒 Private & Secure</h3>
                <p>Your images are processed entirely in your browser. No data is sent to our servers.</p>
              </div>
              <div className="feature-card">
                <h3>⚡ Fast Processing</h3>
                <p>Advanced OCR engine powered by Tesseract.js for quick and accurate results.</p>
              </div>
            </div>
          </article>

          <article className="ocr-use-cases">
            <h2>Common Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case">
                <h3>Document Digitization</h3>
                <p>Convert scanned documents, PDFs, and printed materials into editable text format.</p>
              </div>
              <div className="use-case">
                <h3>Business Cards & Receipts</h3>
                <p>Quickly digitize contact information and financial records for easy organization.</p>
              </div>
              <div className="use-case">
                <h3>Academic Research</h3>
                <p>Extract text from research papers, books, and academic materials for reference.</p>
              </div>
            </div>
          </article>

          <article className="ocr-language-support">
            <h2>Multilingual OCR Support</h2>
            <p>Our Image to Text converter supports text extraction in multiple languages including:</p>
            <div className="language-list">
              {Object.values(languages).slice(0, 12).map((lang, index) => (
                <div key={index} className="language-item">{lang} OCR</div>
              ))}
            </div>
            <p className="mt-4">Whether you need to extract text from images in English, Chinese, Japanese, Korean, Hindi, Arabic, or any other supported language, our OCR tool provides accurate results.</p>
          </article>

          <article className="ocr-tips">
            <h2>Tips for Best OCR Results</h2>
            <ul className="tips-list">
              <li>Use clear, well-lit images with good contrast</li>
              <li>Ensure text is properly aligned and not skewed</li>
              <li>Avoid blurry or distorted images</li>
              <li>Select the correct language for better accuracy</li>
              <li>For multilingual text, process the image multiple times with different languages</li>
            </ul>
          </article>

          <article className="ocr-tech">
            <h2>How Our OCR Technology Works</h2>
            <p>Our Image to Text converter uses advanced Optical Character Recognition (OCR) technology powered by Tesseract.js. The process involves multiple stages:</p>
            <ol className="tech-steps">
              <li>Image preprocessing for optimal quality</li>
              <li>Text detection and layout analysis</li>
              <li>Character recognition using neural networks</li>
              <li>Post-processing for improved accuracy</li>
            </ol>
            <p>This ensures high accuracy in text extraction across different languages and image types.</p>
          </article>

          <article className="ocr-benefits">
            <h2>Benefits of Using Our OCR Tool</h2>
            <ul className="benefits-list">
              <li>Save time by automating text extraction</li>
              <li>Reduce manual data entry errors</li>
              <li>Create searchable digital archives</li>
              <li>Improve accessibility of printed materials</li>
              <li>Free to use with no registration required</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
} 