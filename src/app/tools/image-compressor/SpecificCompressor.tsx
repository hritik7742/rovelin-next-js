"use client";

import { useState, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import imageCompression from 'browser-image-compression';
import RelatedTools from '../shared/RelatedTools';
import { compressorVariants, CompressorVariant } from './compressor-types';
import './image-compressor.css';

interface CompressedImage {
  originalFile: File;
  originalSize: number;
  originalUrl: string;
  compressedFile: File | null;
  compressedUrl: string;
  compressedSize: number;
  quality: number;
  format: string;
  dimensions: { width: number; height: number };
  savings: number;
}

interface SpecificCompressorProps {
  variant: CompressorVariant;
}

export default function SpecificCompressor({ variant }: SpecificCompressorProps) {
  const [image, setImage] = useState<CompressedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [quality, setQuality] = useState(85);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = compressorVariants[variant];
  const maxFileSize = 10 * 1024 * 1024; // 10MB

  const compressImage = useCallback(async (file: File, compressionQuality?: number) => {
    setLoading(true);
    setProgress(0);
    setError('');

    try {
      // Use provided quality or current state
      const currentQuality = compressionQuality ?? quality;

      // Get image dimensions
      const img = new Image();
      const originalUrl = URL.createObjectURL(file);
      
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalUrl;
      });

      const dimensions = { width: img.width, height: img.height };
      setProgress(20);

      // Configure compression options
      const compressionOptions = {
        maxSizeMB: Math.max(0.1, (currentQuality / 100) * 2),
        maxWidthOrHeight: Math.max(800, Math.min(img.width, img.height)),
        useWebWorker: true,
        quality: currentQuality / 100,
        fileType: `image/${config.outputFormat}`,
        initialQuality: currentQuality / 100,
        alwaysKeepResolution: true,
        onProgress: (progress: number) => {
          setProgress(40 + (progress * 0.5));
        }
      };

      // Compress using the professional library
      const compressedFile = await imageCompression(file, compressionOptions);
      setProgress(95);

      const compressedUrl = URL.createObjectURL(compressedFile);
      const savings = Math.round(((file.size - compressedFile.size) / file.size) * 100);

      const compressedImage: CompressedImage = {
        originalFile: file,
        originalSize: file.size,
        originalUrl,
        compressedFile,
        compressedUrl,
        compressedSize: compressedFile.size,
        quality: currentQuality,
        format: config.outputFormat,
        dimensions,
        savings: Math.max(0, savings)
      };

      setImage(compressedImage);
      setProgress(100);
      setLoading(false);

    } catch (err) {
      console.error('Compression failed:', err);
      setError('Failed to compress image. Please try again.');
      setLoading(false);
    }
  }, [config.outputFormat]);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    setError('');
    const extension = file.name.split('.').pop()?.toLowerCase();
    
    if (!extension || !config.allowedInputs.includes(extension)) {
      setError(`Please select a ${config.allowedInputs.join(' or ').toUpperCase()} file`);
      return;
    }
    
    if (file.size > maxFileSize) {
      setError(`File too large. Maximum size is 10MB.`);
      return;
    }

    // Clear previous image
    if (image) {
      URL.revokeObjectURL(image.originalUrl);
      URL.revokeObjectURL(image.compressedUrl);
    }

    await compressImage(file, quality);
  }, [config.allowedInputs, maxFileSize, image, compressImage]);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  }, [handleFiles]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  // Manual compression when quality changes
  const recompressImage = useCallback(() => {
    if (image && !loading) {
      compressImage(image.originalFile, quality);
    }
  }, [image, loading, compressImage, quality]);

  const downloadImage = () => {
    if (!image || !image.compressedFile) return;
    
    const link = document.createElement('a');
    link.href = image.compressedUrl;
    link.download = `compressed_${image.originalFile.name}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearImage = () => {
    if (image) {
      URL.revokeObjectURL(image.originalUrl);
      URL.revokeObjectURL(image.compressedUrl);
    }
    setImage(null);
    setProgress(0);
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="imgcomp-container">
      <div className="imgcomp-workspace">
        <div className="imgcomp-header">
          <h1>{config.title}</h1>
          <p>{config.description}</p>
        </div>

        {/* Upload Section */}
        <div 
          className={`imgcomp-upload-zone ${dragActive ? 'drag-active' : ''}`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept={config.allowedInputs.map(ext => `.${ext}`).join(',')}
            onChange={handleFileSelect}
            className="imgcomp-file-input"
          />
          
          <div className="imgcomp-upload-content">
            <div className="imgcomp-upload-icon">📁</div>
            <h3>Drag & Drop {config.allowedInputs.join('/').toUpperCase()} Image Here</h3>
            <p>or click to select a file</p>
            <button 
              className="imgcomp-upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose {config.allowedInputs.join('/').toUpperCase()} Image
            </button>
            <div className="imgcomp-upload-info">
              <p>Supported: {config.allowedInputs.join(', ').toUpperCase()} • Max size: 10MB</p>
            </div>
          </div>
        </div>

        {error && <div className="imgcomp-error">{error}</div>}

        {/* Quality Control */}
        {image && (
          <div className="imgcomp-options">
            <h3>Compression Quality</h3>
            
            <div className="imgcomp-simple-options">
              <div className="imgcomp-option-group">
                <label>Quality: {quality}%</label>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="imgcomp-slider"
                  disabled={loading}
                />
                <div className="imgcomp-live-preview">
                  {loading ? 'Compressing...' : `${image.savings}% size reduction`}
                </div>
              </div>

              <div className="imgcomp-option-group">
                <button 
                  onClick={recompressImage}
                  className="imgcomp-btn primary"
                  disabled={loading}
                >
                  {loading ? 'Compressing...' : 'Apply Changes'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {image && (
          <div className="imgcomp-results">
            <div className="imgcomp-results-header">
              <h3>Compression Result</h3>
              <div className="imgcomp-results-actions">
                <button onClick={downloadImage} className="imgcomp-btn primary" disabled={loading}>
                  Download Compressed {config.outputFormat.toUpperCase()}
                </button>
                <button onClick={clearImage} className="imgcomp-btn secondary">
                  Upload New Image
                </button>
              </div>
            </div>

            <div className="imgcomp-single-result">
              <div className="imgcomp-image-comparison">
                <div className="imgcomp-image-side">
                  <h4>Original</h4>
                  <div className="imgcomp-image-preview">
                    <NextImage src={image.originalUrl} alt="Original image" width={200} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  </div>
                  <div className="imgcomp-image-info">
                    <p>{formatFileSize(image.originalSize)}</p>
                    <p>{image.dimensions.width} × {image.dimensions.height}</p>
                  </div>
                </div>

                <div className="imgcomp-image-arrow">→</div>

                <div className="imgcomp-image-side">
                  <h4>Compressed</h4>
                  <div className="imgcomp-image-preview">
                    {loading ? (
                      <div className="imgcomp-loading">Compressing...</div>
                    ) : (
                      <NextImage src={image.compressedUrl} alt="Compressed image" width={200} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                    )}
                  </div>
                  <div className="imgcomp-image-info">
                    <p>{loading ? 'Processing...' : formatFileSize(image.compressedSize)}</p>
                    <p className="imgcomp-savings">
                      {loading ? 'Calculating...' : (image.savings > 0 ? `${image.savings}% smaller` : 'No reduction')}
                    </p>
                  </div>
                </div>
              </div>

              {loading && (
                <div className="imgcomp-progress">
                  <div 
                    className="imgcomp-progress-bar" 
                    style={{ width: `${progress}%` }}
                  ></div>
                  <span className="imgcomp-progress-text">{Math.round(progress)}%</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="imgcomp-articles">
          <article className="imgcomp-article">
            <h2>Why Compress {config.allowedInputs.join('/').toUpperCase()} Images?</h2>
            <p>{config.outputFormat.toUpperCase()} compression is essential for web performance. Large {config.outputFormat.toUpperCase()} files slow down your website and increase bandwidth costs.</p>
            
            <div className="imgcomp-benefits-grid">
              <div className="imgcomp-benefit">
                <h3>🚀 Faster Loading</h3>
                <p>Compressed {config.outputFormat.toUpperCase()} images load significantly faster, improving user experience.</p>
              </div>
              <div className="imgcomp-benefit">
                <h3>💰 Lower Costs</h3>
                <p>Smaller files mean less bandwidth usage and reduced hosting costs.</p>
              </div>
              <div className="imgcomp-benefit">
                <h3>📱 Mobile Friendly</h3>
                <p>Optimized {config.outputFormat.toUpperCase()} images perform better on mobile devices.</p>
              </div>
              <div className="imgcomp-benefit">
                <h3>⚡ Better SEO</h3>
                <p>Google considers page speed as a ranking factor. Faster sites rank higher.</p>
              </div>
            </div>
          </article>

          <article className="imgcomp-article">
            <h2>{config.outputFormat.toUpperCase()} Compression Features</h2>
            <div className="imgcomp-features-list">
              <div className="imgcomp-feature">
                <h3>Advanced {config.outputFormat.toUpperCase()} Optimization</h3>
                <p>Our tool uses professional algorithms specifically optimized for {config.outputFormat.toUpperCase()} format compression.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Quality Control</h3>
                <p>Adjust compression quality from 20-95% to find the perfect balance for your {config.outputFormat.toUpperCase()} images.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Real-time Processing</h3>
                <p>See compression results instantly as you adjust quality settings for your {config.outputFormat.toUpperCase()} files.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Format Preservation</h3>
                <p>Maintains all {config.outputFormat.toUpperCase()} format features while reducing file size significantly.</p>
              </div>
            </div>
          </article>

          <article className="imgcomp-article">
            <h2>{config.outputFormat.toUpperCase()} Compression Tips</h2>
            <ul className="imgcomp-tips">
              <li><strong>Quality 85-90%:</strong> Best for high-quality {config.outputFormat.toUpperCase()} images with minimal compression.</li>
              <li><strong>Quality 70-80%:</strong> Good balance of quality and file size for most {config.outputFormat.toUpperCase()} images.</li>
              <li><strong>Quality 50-65%:</strong> Aggressive compression for web use where file size is critical.</li>
              <li><strong>Test different settings:</strong> Use our preview to find the optimal compression for each {config.outputFormat.toUpperCase()} image.</li>
              <li><strong>Consider your audience:</strong> Higher compression for mobile users, moderate for desktop.</li>
            </ul>
          </article>

          <article className="imgcomp-article">
            <h2>Frequently Asked Questions</h2>
            <div className="imgcomp-faq">
              <div className="imgcomp-faq-item">
                <h3>How much can I compress {config.outputFormat.toUpperCase()} images?</h3>
                <p>Typically, you can achieve 30-80% file size reduction depending on the quality setting and original image content.</p>
              </div>
              <div className="imgcomp-faq-item">
                <h3>Will compressing affect {config.outputFormat.toUpperCase()} quality?</h3>
                <p>Our advanced algorithms minimize quality loss. Use the preview feature to ensure the compressed {config.outputFormat.toUpperCase()} meets your standards.</p>
              </div>
              <div className="imgcomp-faq-item">
                <h3>What&apos;s the maximum {config.outputFormat.toUpperCase()} file size?</h3>
                <p>You can compress {config.outputFormat.toUpperCase()} files up to 10MB. For larger files, consider resizing them first.</p>
              </div>
              <div className="imgcomp-faq-item">
                <h3>Is {config.outputFormat.toUpperCase()} compression safe?</h3>
                <p>Yes, compression only reduces file size without altering the original {config.outputFormat.toUpperCase()} format structure or compatibility.</p>
              </div>
            </div>
          </article>
        </div>

        <RelatedTools 
          currentTool={`/tools/${variant}`} 
          category="Image Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
}