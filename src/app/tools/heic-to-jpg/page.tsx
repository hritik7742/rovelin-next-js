"use client";

import { useState, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './heic-to-jpg.css';

interface ConversionOptions {
  quality: number;
  format: 'jpg' | 'png';
}

// Extend Window interface to include heic2any
declare global {
  interface Window {
    heic2any?: (options: {
      blob: Blob;
      toType: string;
      quality: number;
    }) => Promise<Blob | Blob[]>;
  }
}

export default function HeicToJpgConverter() {
  const [files, setFiles] = useState<File[]>([]);
  const [convertedFiles, setConvertedFiles] = useState<{ url: string; name: string; size: number }[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: 85,
    format: 'jpg'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const loadHeic2Any = async () => {
    if (typeof window !== 'undefined' && !window.heic2any) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/heic2any@0.0.4/dist/heic2any.min.js';
      document.head.appendChild(script);

      return new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
      });
    }
  };

  const handleFileSelect = useCallback((selectedFiles: FileList) => {
    const validFiles: File[] = [];

    Array.from(selectedFiles).forEach(file => {
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      if (fileExtension && ['heic', 'heif'].includes(fileExtension)) {
        validFiles.push(file);
      }
    });

    if (validFiles.length === 0) {
      setError('Please select valid HEIC/HEIF files');
      return;
    }

    setFiles(validFiles);
    setError('');
    setConvertedFiles([]);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles.length > 0) {
      handleFileSelect(droppedFiles);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const convertHeicFiles = async () => {
    if (files.length === 0) return;

    setLoading(true);
    setProgress(0);
    setError('');
    setConvertedFiles([]);

    try {
      // Load heic2any library
      await loadHeic2Any();

      if (!window.heic2any) {
        throw new Error('HEIC converter library failed to load');
      }

      const converted: { url: string; name: string; size: number }[] = [];
      const totalFiles = files.length;

      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        setProgress(((i + 0.5) / totalFiles) * 100);

        try {
          // Convert HEIC to target format
          const convertedBlob = await window.heic2any!({
            blob: file,
            toType: `image/${options.format === 'jpg' ? 'jpeg' : 'png'}`,
            quality: options.quality / 100
          });

          // Handle both single blob and array of blobs
          const blob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;
          const url = URL.createObjectURL(blob);
          const fileName = file.name.replace(/\.(heic|heif)$/i, `.${options.format}`);

          converted.push({
            url,
            name: fileName,
            size: blob.size
          });

        } catch (fileError) {
          console.error(`Error converting ${file.name}:`, fileError);
          setError(prev => prev + `Failed to convert ${file.name}. `);
        }

        setProgress(((i + 1) / totalFiles) * 100);
      }

      setConvertedFiles(converted);

      if (converted.length === 0) {
        setError('No files were successfully converted. Please check your HEIC files.');
      }

    } catch (err) {
      console.error('Conversion error:', err);
      setError('Conversion failed: ' + (err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const downloadFile = (fileData: { url: string; name: string }) => {
    const link = document.createElement('a');
    link.href = fileData.url;
    link.download = fileData.name;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadAll = () => {
    convertedFiles.forEach(file => {
      setTimeout(() => downloadFile(file), 100);
    });
  };

  const resetConverter = () => {
    // Clean up blob URLs
    convertedFiles.forEach(file => URL.revokeObjectURL(file.url));

    setFiles([]);
    setConvertedFiles([]);
    setError('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="heic-container">
      <div className="heic-workspace">
        <div className="heic-header">
          <h1>HEIC to JPG Converter</h1>
          <p className="heic-description">
            Convert HEIC/HEIF images from iPhone to JPG or PNG format.
            Supports batch conversion and maintains image quality.
          </p>
        </div>

        {/* Header Ad */}
        <AdUnit 
          adSlot="8285940620" 
          adFormat="auto"
          className="header-ad"
        />

        <div
          className={`heic-upload-section ${loading ? 'disabled' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="heic-file-input"
            accept=".heic,.heif"
            multiple
            onChange={(e) => {
              const selectedFiles = e.target.files;
              if (selectedFiles) handleFileSelect(selectedFiles);
            }}
            disabled={loading}
          />
          <label className="heic-file-label" onClick={() => fileInputRef.current?.click()}>
            <div className="heic-upload-icon">📱</div>
            <span>Choose HEIC files or drag & drop</span>
            <small>Supports multiple files • HEIC, HEIF formats</small>
          </label>
        </div>

        {error && <div className="heic-error">{error}</div>}

        {loading && (
          <div className="heic-progress">
            <div className="heic-progress-bar" style={{ width: `${progress}%` }}></div>
            <span className="heic-progress-text">{Math.round(progress)}%</span>
          </div>
        )}

        {files.length > 0 && (
          <div className="heic-controls">
            <div className="heic-options">
              <div className="heic-format-selector">
                <label>Output Format:</label>
                <select
                  value={options.format}
                  onChange={(e) => setOptions({ ...options, format: e.target.value as 'jpg' | 'png' })}
                  disabled={loading}
                >
                  <option value="jpg">JPG</option>
                  <option value="png">PNG</option>
                </select>
              </div>

              <div className="heic-quality-selector">
                <label>Quality: {options.quality}%</label>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={options.quality}
                  onChange={(e) => setOptions({ ...options, quality: parseInt(e.target.value) })}
                  disabled={loading}
                />
              </div>
            </div>

            <div className="heic-actions">
              <button
                className="heic-convert-btn"
                onClick={convertHeicFiles}
                disabled={loading || files.length === 0}
              >
                {loading ? 'Converting...' : `Convert ${files.length} File${files.length > 1 ? 's' : ''}`}
              </button>

              <button
                className="heic-reset-btn"
                onClick={resetConverter}
                disabled={loading}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {files.length > 0 && (
          <div className="heic-file-list">
            <h3>Selected Files ({files.length})</h3>
            <div className="heic-files">
              {files.map((file, index) => (
                <div key={index} className="heic-file-item">
                  <div className="heic-file-icon">📷</div>
                  <div className="heic-file-info">
                    <span className="heic-file-name">{file.name}</span>
                    <span className="heic-file-size">{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {convertedFiles.length > 0 && (
          <div className="heic-results">
            <div className="heic-results-header">
              <h3>Converted Files ({convertedFiles.length})</h3>
              <button
                className="heic-download-all-btn"
                onClick={downloadAll}
              >
                Download All
              </button>
            </div>

            <div className="heic-converted-files">
              {convertedFiles.map((file, index) => (
                <div key={index} className="heic-converted-item">
                  <div className="heic-converted-preview">
                    <NextImage
                      src={file.url}
                      alt={file.name}
                      width={120}
                      height={120}
                      style={{ objectFit: 'cover', borderRadius: '8px' }}
                    />
                  </div>
                  <div className="heic-converted-info">
                    <span className="heic-converted-name">{file.name}</span>
                    <span className="heic-converted-size">{(file.size / 1024).toFixed(1)} KB</span>
                    <span className="heic-converted-format">{options.format.toUpperCase()}</span>
                  </div>
                  <button
                    className="heic-download-btn"
                    onClick={() => downloadFile(file)}
                  >
                    Download
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Middle Ad */}
        <AdUnit 
          adSlot="8285940620" 
          adFormat="auto"
          className="content-ad"
        />

        <div className="heic-info">
          <div className="heic-info-grid">
            <div className="heic-info-card">
              <h3>🚀 Fast & Secure</h3>
              <p>All conversions happen in your browser. Your files never leave your device.</p>
            </div>

            <div className="heic-info-card">
              <h3>📱 iPhone Compatible</h3>
              <p>Perfect for converting iPhone photos to widely supported formats.</p>
            </div>

            <div className="heic-info-card">
              <h3>🔄 Batch Processing</h3>
              <p>Convert multiple HEIC files at once to save time.</p>
            </div>

            <div className="heic-info-card">
              <h3>⚙️ Quality Control</h3>
              <p>Adjust compression quality to balance file size and image quality.</p>
            </div>
          </div>

          <div className="heic-faq">
            <h3>About HEIC Format</h3>
            <p>
              HEIC (High Efficiency Image Container) is Apples modern image format used by iPhones since iOS 11.
              While it offers better compression than JPG, its not widely supported by all devices and platforms.
              Converting to JPG or PNG ensures maximum compatibility.
            </p>

            <h4>Why Convert HEIC?</h4>
            <ul>
              <li>Share photos on social media platforms</li>
              <li>View images on Windows or Android devices</li>
              <li>Upload to websites that dont support HEIC</li>
              <li>Edit in software that requires JPG/PNG</li>
              <li>Reduce file sizes for email attachments</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Ad */}
      <AdUnit 
        adSlot="8285940620" 
        adFormat="auto"
        className="footer-ad"
      />

      <RelatedTools
        currentTool="/tools/heic-to-jpg"
        category="Image Tools"
        maxSuggestions={6}
      />
    </div>
  );
}