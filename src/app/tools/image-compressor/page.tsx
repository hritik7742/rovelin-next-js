"use client";

import { useState, useRef, useCallback, useMemo } from 'react';
import Image from 'next/image';
import imageCompression from 'browser-image-compression';
import RelatedTools from '../shared/RelatedTools';
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

interface CompressionOptions {
  quality: number;
  format: string;
}

export default function ImageCompressor() {
  const [image, setImage] = useState<CompressedImage | null>(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState('');
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<CompressionOptions>({
    quality: 85,
    format: 'original'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const supportedFormats = useMemo(() => ['jpg', 'jpeg', 'png', 'webp', 'gif'], []);
  const maxFileSize = useMemo(() => 10 * 1024 * 1024, []); // 10MB

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const compressImage = useCallback(async (file: File, compressionQuality?: number, compressionFormat?: string) => {
    setLoading(true);
    setProgress(0);
    setError('');

    try {
      // Use provided options or current state
      const quality = compressionQuality ?? options.quality;
      const format = compressionFormat ?? options.format;

      // Get image dimensions
      const img = new window.Image();
      const originalUrl = URL.createObjectURL(file);

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = originalUrl;
      });

      const dimensions = { width: img.width, height: img.height };
      setProgress(20);

      // Determine output format
      let outputType = file.type;
      if (format !== 'original') {
        // Map format names to proper MIME types
        const formatMap: { [key: string]: string } = {
          'jpeg': 'image/jpeg',
          'jpg': 'image/jpeg',
          'png': 'image/png',
          'webp': 'image/webp',
          'gif': 'image/gif'
        };
        outputType = formatMap[format] || `image/${format}`;
      }

      setProgress(40);

      // Configure compression options for browser-image-compression
      const compressionOptions = {
        maxSizeMB: Math.max(0.1, (quality / 100) * 2), // Dynamic size based on quality
        maxWidthOrHeight: Math.max(800, Math.min(img.width, img.height)), // Maintain reasonable size
        useWebWorker: true,
        quality: quality / 100,
        fileType: outputType,
        initialQuality: quality / 100,
        alwaysKeepResolution: true,
        onProgress: (progress: number) => {
          setProgress(40 + (progress * 0.5)); // 40-90%
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
        quality: quality,
        format: outputType.split('/')[1],
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
  }, []);

  const handleFiles = useCallback(async (files: File[]) => {
    const file = files[0]; // Only handle single file
    if (!file) return;

    setError('');
    const extension = file.name.split('.').pop()?.toLowerCase();

    if (!extension || !supportedFormats.includes(extension)) {
      setError(`Unsupported format. Please use: ${supportedFormats.join(', ').toUpperCase()}`);
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

    await compressImage(file, options.quality, options.format);
  }, [supportedFormats, maxFileSize, image, compressImage]);

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

  const downloadImage = () => {
    if (!image || !image.compressedFile) return;

    const link = document.createElement('a');
    link.href = image.compressedUrl;

    // Create filename with correct extension based on output format
    const originalName = image.originalFile.name.split('.')[0]; // Remove original extension
    const newExtension = image.format === 'jpeg' ? 'jpg' : image.format;
    link.download = `compressed_${originalName}.${newExtension}`;

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

  // Manual compression when settings change
  const recompressImage = useCallback(() => {
    if (image && !loading) {
      compressImage(image.originalFile, options.quality, options.format);
    }
  }, [image, loading, compressImage, options.quality, options.format]);

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
          <h1>Image Compressor & Optimizer</h1>
          <p>Compress and optimize your images while maintaining quality. Reduce file sizes for faster web loading.</p>
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
            accept="image/*"
            onChange={handleFileSelect}
            className="imgcomp-file-input"
          />

          <div className="imgcomp-upload-content">
            <div className="imgcomp-upload-icon">📁</div>
            <h3>Drag & Drop Image Here</h3>
            <p>or click to select a file</p>
            <button
              className="imgcomp-upload-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Choose Image
            </button>
            <div className="imgcomp-upload-info">
              <p>Supported: JPG, PNG, WebP, GIF • Max size: 10MB per file</p>
            </div>
          </div>
        </div>

        {error && <div className="imgcomp-error">{error}</div>}

        {/* Real-time Compression Options */}
        {image && (
          <div className="imgcomp-options">
            <h3>Compression Settings</h3>

            <div className="imgcomp-simple-options">
              <div className="imgcomp-option-group">
                <label>Quality: {options.quality}%</label>
                <input
                  type="range"
                  min="20"
                  max="95"
                  value={options.quality}
                  onChange={(e) => {
                    const newQuality = parseInt(e.target.value);
                    setOptions({ ...options, quality: newQuality });
                  }}
                  className="imgcomp-slider"
                  disabled={loading}
                />
                <div className="imgcomp-live-preview">
                  {loading ? 'Compressing...' : `${image.savings}% size reduction`}
                </div>
              </div>

              <div className="imgcomp-option-group">
                <label>Output Format</label>
                <select
                  value={options.format}
                  onChange={(e) => setOptions({ ...options, format: e.target.value })}
                  className="imgcomp-select"
                  disabled={loading}
                >
                  <option value="original">Keep Original</option>
                  <option value="jpeg">JPG</option>
                  <option value="png">PNG</option>
                  <option value="webp">WebP</option>
                </select>
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

        {/* Single Image Results */}
        {image && (
          <div className="imgcomp-results">
            <div className="imgcomp-results-header">
              <h3>Compression Result</h3>
              <div className="imgcomp-results-actions">
                <button onClick={downloadImage} className="imgcomp-btn primary" disabled={loading}>
                  Download {image.format.toUpperCase()} File
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
                    <Image src={image.originalUrl} alt="Original image" width={200} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  </div>
                  <div className="imgcomp-image-info">
                    <p>{formatFileSize(image.originalSize)}</p>
                    <p>{image.dimensions.width} × {image.dimensions.height}</p>
                  </div>
                </div>

                <div className="imgcomp-image-arrow">→</div>

                <div className="imgcomp-image-side">
                  <h4>Compressed ({image.format.toUpperCase()})</h4>
                  <div className="imgcomp-image-preview">
                    {loading ? (
                      <div className="imgcomp-loading">Compressing...</div>
                    ) : (
                      <Image src={image.compressedUrl} alt="Compressed image" width={200} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                    )}
                  </div>
                  <div className="imgcomp-image-info">
                    <p>{loading ? 'Processing...' : formatFileSize(image.compressedSize)}</p>
                    <p className="imgcomp-savings">
                      {loading ? 'Calculating...' : (image.savings > 0 ? `${image.savings}% smaller` : 'No reduction')}
                    </p>
                    <p style={{ fontSize: '0.8rem', color: '#7c3aed' }}>
                      Format: {image.format.toUpperCase()}
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
            <h2>Why Compress Images?</h2>
            <p>Image compression is essential for web performance and user experience. Large image files slow down your website, increase bandwidth costs, and frustrate users with slow loading times.</p>

            <div className="imgcomp-benefits-grid">
              <div className="imgcomp-benefit">
                <h3>🚀 Faster Loading</h3>
                <p>Compressed images load significantly faster, improving user experience and reducing bounce rates.</p>
              </div>
              <div className="imgcomp-benefit">
                <h3>💰 Lower Costs</h3>
                <p>Smaller files mean less bandwidth usage and reduced hosting costs for your website.</p>
              </div>
              <div className="imgcomp-benefit">
                <h3>📱 Mobile Friendly</h3>
                <p>Optimized images perform better on mobile devices with limited data connections.</p>
              </div>
              <div className="imgcomp-benefit">
                <h3>⚡ Better SEO</h3>
                <p>Google considers page speed as a ranking factor. Faster sites rank higher in search results.</p>
              </div>
            </div>
          </article>

          <article className="imgcomp-article">
            <h2>Compression Features</h2>
            <div className="imgcomp-features-list">
              <div className="imgcomp-feature">
                <h3>Smart Auto Compression</h3>
                <p>Our intelligent algorithm automatically selects the optimal compression settings based on your image characteristics.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Manual Quality Control</h3>
                <p>Take full control with manual quality settings from 1-100% to achieve your desired balance of quality and file size.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Batch Processing</h3>
                <p>Compress multiple images simultaneously with progress tracking for each file.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Format Conversion</h3>
                <p>Convert between JPG, PNG, and WebP formats while compressing for maximum compatibility.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Image Resizing</h3>
                <p>Optionally resize images to specific dimensions while maintaining aspect ratios.</p>
              </div>
              <div className="imgcomp-feature">
                <h3>Instant Preview</h3>
                <p>See before and after comparisons with file size reduction percentages in real-time.</p>
              </div>
            </div>
          </article>

          <article className="imgcomp-article">
            <h2>Best Practices</h2>
            <ul className="imgcomp-tips">
              <li><strong>Choose the right format:</strong> Use JPG for photos, PNG for graphics with transparency, WebP for modern browsers.</li>
              <li><strong>Optimize for web:</strong> Most web images dont need to be larger than 1920px wide.</li>
              <li><strong>Quality settings:</strong> 80-90% quality usually provides the best balance of size and visual quality.</li>
              <li><strong>Test different settings:</strong> Use our preview feature to find the optimal compression for each image.</li>
              <li><strong>Consider your audience:</strong> Higher compression for mobile users, moderate compression for desktop.</li>
              <li><strong>Batch processing:</strong> Compress multiple images at once to save time on large projects.</li>
            </ul>
          </article>

          <article className="imgcomp-article">
            <h2>Frequently Asked Questions</h2>
            <div className="imgcomp-faq">
              <div className="imgcomp-faq-item">
                <h3>Is image compression lossy or lossless?</h3>
                <p>Our tool offers both options. JPG compression is lossy but provides smaller files, while PNG can be compressed losslessly. You can control the quality level to balance file size and image quality.</p>
              </div>
              <div className="imgcomp-faq-item">
                <h3>Whats the maximum file size I can compress?</h3>
                <p>You can compress images up to 10MB each. For larger files, consider resizing them first or using our batch processing feature for multiple smaller images.</p>
              </div>
              <div className="imgcomp-faq-item">
                <h3>Will compressing images affect their quality?</h3>
                <p>Some quality loss is normal with compression, but our smart algorithms minimize visible degradation. Use the preview feature to ensure the compressed image meets your quality standards.</p>
              </div>
              <div className="imgcomp-faq-item">
                <h3>Can I compress images for social media?</h3>
                <p>Absolutely! Our tool is perfect for optimizing images for social media platforms. Use the resize feature to match platform requirements and compression to reduce upload times.</p>
              </div>
            </div>
          </article>
        </div>

        <RelatedTools
          currentTool="/tools/image-compressor"
          category="Image Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
}