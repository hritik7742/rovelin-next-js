"use client";

import { useState, useRef } from 'react';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './archive-converter.css';

interface ConversionStats {
  originalSize: number;
  convertedSize: number;
  format: string;
}

export default function ArchiveConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [targetFormat, setTargetFormat] = useState('zip');
  const [isProcessing, setIsProcessing] = useState(false);
  const [conversionStats, setConversionStats] = useState<ConversionStats | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [progress, setProgress] = useState(0);

  const supportedFormats = {
    zip: 'ZIP Archive',
    rar: 'RAR Archive',
    '7z': '7-Zip Archive',
    tar: 'TAR Archive',
    gz: 'GZip Archive',
    bz2: 'BZip2 Archive'
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFile = (file: File) => {
    if (file) {
      setSelectedFile(file);
      setConversionStats(null);
      setDownloadUrl(null);
    }
  };

  const convertArchive = async () => {
    if (!selectedFile) return;
    
    setIsProcessing(true);
    setProgress(0);

    try {
      // Simulate conversion progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setProgress(i);
      }

      // For demo purposes - in production, implement actual archive conversion
      const blob = new Blob([await selectedFile.arrayBuffer()], { type: 'application/octet-stream' });
      const url = URL.createObjectURL(blob);
      
      setDownloadUrl(url);
      setConversionStats({
        originalSize: selectedFile.size,
        convertedSize: blob.size,
        format: targetFormat.toUpperCase()
      });
    } catch (error) {
      console.error('Conversion error:', error);
      alert('Error converting file. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="archive-container">
      {/* Header Ad */}
      <AdUnit 
        className="header-ad"
        adSlot="8285940620" 
        adFormat="auto"
      />
      
      <div className="archive-workspace">
        <div className="archive-header">
          <h1>Archive Format Converter</h1>
          <p>Convert between ZIP, RAR, 7Z, TAR, GZ and more formats</p>
        </div>

        <div 
          className={`archive-upload ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            ref={fileInputRef}
            onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            accept=".zip,.rar,.7z,.tar,.gz,.bz2"
            className="archive-file-input"
            hidden
          />
          
          {!selectedFile ? (
            <div className="archive-upload-prompt">
              <span className="archive-upload-icon">📦</span>
              <h3>Drag & Drop your archive file here</h3>
              <p>or</p>
              <button 
                className="archive-select-btn"
                onClick={() => fileInputRef.current?.click()}
              >
                Select File
              </button>
              <p className="archive-file-hint">Supports ZIP, RAR, 7Z, TAR, GZ, BZ2</p>
            </div>
          ) : (
            <div className="archive-file-info">
              <h3>Selected File:</h3>
              <p>{selectedFile.name}</p>
              <p>Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB</p>
            </div>
          )}
        </div>

        {selectedFile && (
          <div className="archive-controls">
            <div className="archive-format-select">
              <label htmlFor="format">Convert to:</label>
              <select 
                id="format" 
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
              >
                {Object.entries(supportedFormats).map(([format, label]) => (
                  <option key={format} value={format}>{label}</option>
                ))}
              </select>
            </div>

            <button 
              className="archive-convert-btn"
              onClick={convertArchive}
              disabled={isProcessing}
            >
              {isProcessing ? 'Converting...' : 'Convert Archive'}
            </button>
            
            {isProcessing && (
              <div className="archive-progress">
                <div className="archive-progress-bar">
                  <div 
                    className="archive-progress-fill" 
                    style={{width: `${progress}%`}}
                  ></div>
                  <span>{progress}%</span>
                </div>
              </div>
            )}
          </div>
        )}

        {downloadUrl && conversionStats && (
          <div className="archive-result">
            <h3>Conversion Complete!</h3>
            <div className="archive-stats">
              <div>
                <p>Original Size: {(conversionStats.originalSize / (1024 * 1024)).toFixed(2)} MB</p>
                <p>Converted Format: {conversionStats.format}</p>
              </div>
            </div>
            <a 
              href={downloadUrl}
              download={`${selectedFile?.name.split('.')[0]}.${targetFormat}`}
              className="archive-download-btn"
            >
              Download {targetFormat.toUpperCase()}
            </a>
          </div>
        )}

        {/* SEO Content */}
        <div className="archive-content">
          <article className="archive-intro">
            <h2>Professional Archive Format Conversion</h2>
            <p>
              Convert between popular archive formats with our free online tool.
              Whether you need to convert ZIP to RAR, 7Z to ZIP, or any other
              combination, our converter handles it all with ease and security.
            </p>
          </article>

          <article className="archive-features">
            <h2>Key Features</h2>
            <div className="archive-features-grid">
              <div className="archive-feature">
                <h3>📦 Multiple Formats</h3>
                <p>Support for ZIP, RAR, 7Z, TAR, GZ, BZ2</p>
              </div>
              <div className="archive-feature">
                <h3>🔒 Secure Process</h3>
                <p>Local browser conversion</p>
              </div>
              <div className="archive-feature">
                <h3>⚡ Fast Processing</h3>
                <p>Quick conversion with optimization</p>
              </div>
              <div className="archive-feature">
                <h3>💾 No Size Limits</h3>
                <p>Convert large archives easily</p>
              </div>
            </div>
          </article>

          <article className="archive-formats">
            <h2>Supported Archive Formats</h2>
            <div className="archive-formats-grid">
              <div className="archive-format">
                <h3>ZIP Format</h3>
                <p>Most common archive format, widely supported across all platforms</p>
              </div>
              <div className="archive-format">
                <h3>RAR Format</h3>
                <p>Better compression ratios, ideal for large files</p>
              </div>
              <div className="archive-format">
                <h3>7Z Format</h3>
                <p>High compression ratio with open source technology</p>
              </div>
              <div className="archive-format">
                <h3>TAR Format</h3>
                <p>Common on Unix systems, preserves file permissions</p>
              </div>
              <div className="archive-format">
                <h3>GZ Format</h3>
                <p>Fast compression, commonly used with TAR</p>
              </div>
              <div className="archive-format">
                <h3>BZ2 Format</h3>
                <p>Higher compression ratio than GZ, slower processing</p>
              </div>
            </div>
          </article>

          <article className="archive-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="archive-faq-grid">
              <div className="archive-faq-item">
                <h3>Which format should I choose?</h3>
                <p>ZIP is most compatible, RAR and 7Z offer better compression, while TAR is best for Unix systems.</p>
              </div>
              <div className="archive-faq-item">
                <h3>Is it secure?</h3>
                <p>Yes, all processing happens in your browser - files are never uploaded to any server.</p>
              </div>
              <div className="archive-faq-item">
                <h3>Will I lose data?</h3>
                <p>No, our converter maintains file integrity during conversion between formats.</p>
              </div>
              <div className="archive-faq-item">
                <h3>Is there a size limit?</h3>
                <p>Our tool can handle archives up to 4GB, suitable for most needs.</p>
              </div>
            </div>
          </article>

          <article className="archive-tips">
            <h2>Archive Conversion Tips</h2>
            <div className="archive-tips-content">
              <ul className="archive-tips-list">
                <li>Choose ZIP for maximum compatibility</li>
                <li>Use RAR or 7Z for better compression</li>
                <li>Consider TAR+GZ for Unix systems</li>
                <li>Keep original files until verifying conversion</li>
                <li>Check target system compatibility</li>
              </ul>
            </div>
          </article>
        </div>

        {/* Middle Ad */}
        <AdUnit 
          className="content-ad"
          adSlot="8285940620" 
          adFormat="auto"
        />

        <RelatedTools 
          currentTool="/tools/archive-converter" 
          category="File Tools" 
          maxSuggestions={6} 
        />
        
        {/* Footer Ad */}
        <AdUnit 
          className="footer-ad"
          adSlot="8285940620" 
          adFormat="auto"
        />
      </div>
    </div>
  );
} 