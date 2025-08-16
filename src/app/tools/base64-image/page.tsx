"use client";

import { useState } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './base64-image.css';
import Image from 'next/image';

interface ImageInfo {
  size: string;
  type: string;
  dimensions: string;
}

export default function Base64Image() {
  const [base64String, setBase64String] = useState('');
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  const [mode, setMode] = useState('toBase64'); // toBase64 or fromBase64
  const [imageInfo, setImageInfo] = useState<ImageInfo>({ size: '', type: '', dimensions: '' });
  const [copied, setCopied] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [copyText, setCopyText] = useState('Copy Base64');

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImageFile(file);
    }
  };

  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (!e.target) return;
      const base64 = e.target.result as string;
      setBase64String(base64);
      setPreview(base64);
      
      // Get image dimensions
      const img = new window.Image();
      img.onload = () => {
        setImageInfo({
          size: (file.size / 1024).toFixed(2) + ' KB',
          type: file.type,
          dimensions: `${img.width} × ${img.height}px`
        });
      };
      img.src = base64;
    };
    reader.readAsDataURL(file);
    setError('');
  };

  const handleBase64Input = (value: string) => {
    try {
      if (!value.startsWith('data:image')) {
        setError('Invalid Base64 image string');
        return;
      }
      setBase64String(value);
      setPreview(value);
      setError('');
    } catch (err) {
      setError('Invalid Base64 image string' + err);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64String);
    setCopyText('Copied!');
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setCopyText('Copy Base64');
    }, 2000);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = base64String;
    link.download = 'converted_image.' + (imageInfo.type.split('/')[1] || 'png');
    link.click();
  };

  return (
    <div className="b64img-container">
      <div className="b64img-workspace">
        <header className="b64img-header">
          <h1>Base64 Image Converter</h1>
          <p>Convert images to Base64 strings and back with ease</p>
        </header>

        <div className="b64img-mode-selector">
          <button 
            className={`b64img-mode-btn ${mode === 'toBase64' ? 'active' : ''}`}
            onClick={() => setMode('toBase64')}
          >
            Image to Base64
          </button>
          <button 
            className={`b64img-mode-btn ${mode === 'fromBase64' ? 'active' : ''}`}
            onClick={() => setMode('fromBase64')}
          >
            Base64 to Image
          </button>
        </div>

        {mode === 'toBase64' ? (
          <div 
            className={`b64img-dropzone ${dragActive ? 'active' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <input
              type="file"
              onChange={handleFileSelect}
              accept="image/*"
              className="b64img-file-input"
            />
            <div className="b64img-dropzone-content">
              <span className="b64img-icon">🖼️</span>
              <p>Drag & drop an image or click to browse</p>
              <span className="b64img-formats">Supports JPG, PNG, GIF, WebP</span>
            </div>
          </div>
        ) : (
          <div className="b64img-input-section">
            <textarea
              className="b64img-textarea"
              placeholder="Paste Base64 image string here..."
              onChange={(e) => handleBase64Input(e.target.value)}
            />
          </div>
        )}

        {error && <div className="b64img-error">{error}</div>}
        {copied && <div className="b64img-success">Copied to clipboard!</div>}

        {preview && (
          <div className="b64img-preview-section">
            <h3>Preview</h3>
            <div className="b64img-preview">
              <Image src={preview} alt="Preview" />
            </div>
            {imageInfo.size && (
              <div className="b64img-info">
                <div>Size: {imageInfo.size}</div>
                <div>Type: {imageInfo.type}</div>
                <div>Dimensions: {imageInfo.dimensions}</div>
              </div>
            )}
            <div className="b64img-actions">
              <button className="b64img-btn primary" onClick={handleCopy}>
                {copyText}
              </button>
              <button className="b64img-btn secondary" onClick={downloadImage}>
                Download Image
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SEO Content */}
      <div className="b64img-articles">
        <article className="b64img-article">
          <h2>What is Base64 Image Encoding?</h2>
          <p>
            Base64 image encoding is a method of converting binary image data into a text format 
            that can be safely embedded in HTML, CSS, or JSON. This technique is particularly 
            useful for small images like icons, logos, or thumbnails.
          </p>
        </article>

        <article className="b64img-article">
          <h2>Use Cases</h2>
          <div className="b64img-use-cases">
            <div className="b64img-use-case">
              <h3>CSS Embedding</h3>
              <p>Embed images directly in your stylesheets using data URIs</p>
            </div>
            <div className="b64img-use-case">
              <h3>Email Templates</h3>
              <p>Include images in HTML emails without external references</p>
            </div>
            <div className="b64img-use-case">
              <h3>API Integration</h3>
              <p>Send images as part of JSON payloads</p>
            </div>
            <div className="b64img-use-case">
              <h3>Single File Apps</h3>
              <p>Create self-contained HTML files with embedded images</p>
            </div>
          </div>
        </article>

        <div className="b64img-faq">
          <h2>Frequently Asked Questions</h2>
          <div className="b64img-faq-item">
            <h3>{"What's the maximum file size recommended?"}</h3>
            <p>
              {"While there's no strict limit, we recommend keeping images under 1MB when converting to Base64 to avoid performance issues and large file sizes."}
            </p>
          </div>
          <div className="b64img-faq-item">
            <h3>Which image formats are supported?</h3>
            <p>
              {"Our tool supports all common image formats including JPG, PNG, GIF, WebP, and SVG. The output will maintain the original format's quality and characteristics."}
            </p>
          </div>
        </div>

        <RelatedTools 
          currentTool="/tools/base64-image" 
          category="Image Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 