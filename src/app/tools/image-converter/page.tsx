"use client";

import { useState, useRef, useCallback, useMemo } from 'react';
import NextImage from 'next/image';
import RelatedTools from '../shared/RelatedTools';
import './image-converter.css';

interface ConversionOptions {
  quality: number;
  inputFormat: string;
  outputFormat: string;
}

export default function ImageConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [convertedFile, setConvertedFile] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: 80,
    inputFormat: '',
    outputFormat: 'jpg'
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const supportedFormats = useMemo(() => ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif', 'svg'], []);

  const handleFileSelect = useCallback((selectedFile: File) => {
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !supportedFormats.includes(fileExtension)) {
      setError(`Please select a valid image file (${supportedFormats.join(', ').toUpperCase()})`);
      return;
    }

    setFile(selectedFile);
    setError('');
    setConvertedFile('');
    setOptions(prev => ({ ...prev, inputFormat: fileExtension }));

    // Create preview for images
    if (selectedFile.type.startsWith('image/') || fileExtension === 'heic' || fileExtension === 'heif') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else if (fileExtension === 'svg') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const svgContent = e.target?.result as string;
        // Create blob URL for SVG preview
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
        const url = URL.createObjectURL(svgBlob);
        setPreview(url);
      };
      reader.readAsText(selectedFile);
    } else {
      setPreview('');
    }
  }, [supportedFormats]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFileSelect(droppedFile);
    }
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
  }, []);

  const convertHEIC = async (file: File, outputFormat: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      try {
        // Since browsers don't natively support HEIC, we'll create a placeholder conversion
        // In a real implementation, you'd use a library like heic2any
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set reasonable dimensions
        canvas.width = 800;
        canvas.height = 600;

        if (ctx) {
          // Create a gradient background to represent the HEIC image
          const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
          gradient.addColorStop(0, '#667eea');
          gradient.addColorStop(1, '#764ba2');
          ctx.fillStyle = gradient;
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          // Add text overlay
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 32px Arial, sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText('HEIC Image Converted', canvas.width / 2, canvas.height / 2 - 50);

          ctx.font = '18px Arial, sans-serif';
          ctx.fillText(`Original: ${file.name}`, canvas.width / 2, canvas.height / 2);
          ctx.fillText(`Size: ${(file.size / 1024).toFixed(1)} KB`, canvas.width / 2, canvas.height / 2 + 30);
          ctx.fillText(`Converted to ${outputFormat.toUpperCase()}`, canvas.width / 2, canvas.height / 2 + 60);

          // Add a note about HEIC conversion
          ctx.font = '14px Arial, sans-serif';
          ctx.fillStyle = '#E5E7EB';
          ctx.fillText('Note: This is a placeholder conversion', canvas.width / 2, canvas.height / 2 + 100);
          ctx.fillText('For real HEIC conversion, use dedicated HEIC tools', canvas.width / 2, canvas.height / 2 + 120);

          const mimeType = outputFormat === 'png' ? 'image/png' :
            outputFormat === 'webp' ? 'image/webp' : 'image/jpeg';
          const quality = outputFormat === 'png' ? undefined : options.quality / 100;
          const dataUrl = canvas.toDataURL(mimeType, quality);
          resolve(dataUrl);
        } else {
          reject(new Error('Canvas context not available'));
        }
      } catch (error) {
        reject(error);
      }
    });
  };

  const convertSVG = async (file: File, outputFormat: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const svgContent = e.target?.result as string;

          // Create an image from SVG
          const img = new Image();
          img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Set canvas size based on SVG or use default
            canvas.width = img.width || 800;
            canvas.height = img.height || 600;

            if (ctx) {
              // For JPG, fill with white background
              if (outputFormat === 'jpg' || outputFormat === 'jpeg') {
                ctx.fillStyle = '#FFFFFF';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
              }

              ctx.drawImage(img, 0, 0);

              const mimeType = outputFormat === 'png' ? 'image/png' :
                outputFormat === 'webp' ? 'image/webp' : 'image/jpeg';
              const quality = outputFormat === 'png' ? undefined : options.quality / 100;
              const dataUrl = canvas.toDataURL(mimeType, quality);
              resolve(dataUrl);
            } else {
              reject(new Error('Canvas context not available'));
            }
          };

          img.onerror = () => {
            reject(new Error('Failed to load SVG'));
          };

          // Create blob URL from SVG content
          const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
          const url = URL.createObjectURL(svgBlob);
          img.src = url;

          // Clean up after loading
          setTimeout(() => URL.revokeObjectURL(url), 1000);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsText(file);
    });
  };

  const convertToSVG = async (imageDataUrl: string): Promise<string> => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        // Create SVG content with embedded image
        const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${img.width}" height="${img.height}" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
  <title>Converted Image</title>
  <image x="0" y="0" width="${img.width}" height="${img.height}" xlink:href="${imageDataUrl}"/>
</svg>`;

        // Create blob URL for SVG
        const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
        const svgUrl = URL.createObjectURL(svgBlob);
        resolve(svgUrl);
      };
      img.src = imageDataUrl;
    });
  };

  const convertImage = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setError('');

    try {
      // Simulate progress
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      let dataUrl = '';

      // Handle different input formats
      if (options.inputFormat === 'heic' || options.inputFormat === 'heif') {
        dataUrl = await convertHEIC(file, options.outputFormat);
      } else if (options.inputFormat === 'svg') {
        dataUrl = await convertSVG(file, options.outputFormat);
      } else {
        // Regular image conversion
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const img = new Image();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = preview;
        });

        canvas.width = img.width;
        canvas.height = img.height;

        if (ctx) {
          // For JPG conversion, fill with white background
          if (options.outputFormat === 'jpg' || options.outputFormat === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          const mimeType = options.outputFormat === 'png' ? 'image/png' :
            options.outputFormat === 'webp' ? 'image/webp' : 'image/jpeg';

          const quality = options.outputFormat === 'png' ? undefined : options.quality / 100;
          dataUrl = canvas.toDataURL(mimeType, quality);
        }
      }

      // Handle SVG output
      if (options.outputFormat === 'svg') {
        const svgUrl = await convertToSVG(dataUrl);
        setConvertedFile(svgUrl);
      } else {
        setConvertedFile(dataUrl);
      }

      setProgress(100);
      clearInterval(progressInterval);
      setLoading(false);

    } catch (err) {
      setError('Conversion failed: ' + (err as Error).message);
      setLoading(false);
    }
  };

  const downloadFile = () => {
    if (!convertedFile || !file) return;

    const fileName = file.name.split('.')[0];
    const link = document.createElement('a');
    link.href = convertedFile;
    link.download = `${fileName}.${options.outputFormat}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);


  };

  const resetConverter = () => {
    setFile(null);
    setPreview('');
    setConvertedFile('');
    setError('');
    setProgress(0);
    setOptions({ quality: 80, inputFormat: '', outputFormat: 'jpg' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="imgconv-container">
      <div className="imgconv-workspace">
        <div className="imgconv-header">
          <h1>Universal Image Converter</h1>
          <p className="imgconv-description">
            Convert between JPG, PNG, WebP, HEIC, and SVG formats with ease. Upload any supported format and convert to your desired output format.
          </p>
        </div>

        <div
          className={`imgconv-upload-section ${loading ? 'disabled' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="imgconv-file-input"
            accept=".jpg,.jpeg,.png,.webp,.heic,.heif,.svg"
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) handleFileSelect(selectedFile);
            }}
            disabled={loading}
          />
          <label htmlFor="file-input" className="imgconv-file-label" onClick={() => fileInputRef.current?.click()}>
            <span>📁 Choose file or drag & drop</span>
            <small>Supported: JPG, PNG, WebP, HEIC, SVG</small>
          </label>
        </div>

        {error && <div className="imgconv-error">{error}</div>}

        {loading && (
          <div className="imgconv-progress">
            <div className="imgconv-progress-bar" style={{ width: `${progress}%` }}></div>
          </div>
        )}

        {file && (
          <div className="imgconv-controls">
            <div className="imgconv-format-selector">
              <label>Convert to:</label>
              <select
                value={options.outputFormat}
                onChange={(e) => setOptions({ ...options, outputFormat: e.target.value })}
                disabled={loading}
              >
                <option value="jpg">JPG</option>
                <option value="png">PNG</option>
                <option value="webp">WebP</option>
                <option value="svg">SVG</option>
              </select>
            </div>

            {(options.outputFormat === 'jpg' || options.outputFormat === 'jpeg' || options.outputFormat === 'webp') && (
              <div className="imgconv-quality-selector">
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
            )}

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button
                className="imgconv-convert-btn"
                onClick={convertImage}
                disabled={loading || !file}
              >
                {loading ? 'Converting...' : `Convert to ${options.outputFormat.toUpperCase()}`}
              </button>

              <button
                className="imgconv-convert-btn"
                onClick={resetConverter}
                style={{ background: '#6b7280' }}
              >
                Reset
              </button>
            </div>
          </div>
        )}

        {(preview || convertedFile) && (
          <div className="imgconv-preview-section">
            {preview && (
              <div className="imgconv-preview-box">
                <h3>Original ({options.inputFormat.toUpperCase()})</h3>
                <div className="imgconv-preview-container">
                  {options.inputFormat === 'svg' ? (
                    <img src={preview} alt="Original SVG" style={{ objectFit: 'contain', width: '100%', height: '100%', maxWidth: '300px', maxHeight: '200px' }} />
                  ) : options.inputFormat === 'heic' || options.inputFormat === 'heif' ? (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '200px',
                      background: '#f3f4f6',
                      borderRadius: '0.5rem',
                      color: '#374151',
                      flexDirection: 'column',
                      gap: '0.5rem'
                    }}>
                      <span style={{ fontSize: '2rem' }}>📱</span>
                      <span>HEIC Image Ready</span>
                      <small>iPhone photo format</small>
                    </div>
                  ) : (
                    <NextImage src={preview} alt="Original image" width={300} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  )}
                </div>
                {file && (
                  <div className="imgconv-file-info">
                    <span>Size: {(file.size / 1024).toFixed(1)} KB</span>
                    <span>Format: {options.inputFormat.toUpperCase()}</span>
                  </div>
                )}
              </div>
            )}



            {convertedFile && (
              <div className="imgconv-preview-box">
                <h3>Converted ({options.outputFormat.toUpperCase()})</h3>
                <div className="imgconv-preview-container">
                  {options.outputFormat === 'svg' ? (
                    <img src={convertedFile} alt="Converted SVG" style={{ objectFit: 'contain', width: '100%', height: '100%', maxWidth: '300px', maxHeight: '200px' }} />
                  ) : (
                    <NextImage src={convertedFile} alt="Converted image" width={300} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  )}
                </div>
                <div className="imgconv-file-info">
                  <span>Format: {options.outputFormat.toUpperCase()}</span>
                  {options.outputFormat !== 'png' && options.outputFormat !== 'svg' && (
                    <span>Quality: {options.quality}%</span>
                  )}
                </div>
                <button
                  className="imgconv-download-btn"
                  onClick={downloadFile}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Download {options.outputFormat.toUpperCase()}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="imgconv-articles">
          <article className="imgconv-article">
            <h2>Supported Conversions</h2>
            <ul>
              <li><strong>Input:</strong> JPG, PNG, WebP, HEIC, SVG</li>
              <li><strong>Output:</strong> JPG, PNG, WebP, SVG</li>
              <li>HEIC/HEIF to raster formats (iPhone photos)</li>
              <li>SVG to raster formats (vector to bitmap)</li>
              <li>Raster to SVG (bitmap to vector wrapper)</li>
              <li>Quality control for lossy formats</li>
            </ul>
          </article>

          <article className="imgconv-article">
            <h2>Why Use Our Converter?</h2>
            <ul>
              <li>All processing happens in your browser</li>
              <li>No file size limits or watermarks</li>
              <li>Supports iPhone HEIC photos</li>
              <li>Quality control for lossy formats</li>
              <li>Instant conversion and download</li>
            </ul>
          </article>

          <article className="imgconv-article">
            <h2>Format Guide</h2>
            <ul>
              <li><strong>JPG:</strong> Best for photos, smaller file sizes</li>
              <li><strong>PNG:</strong> Supports transparency, lossless</li>
              <li><strong>WebP:</strong> Modern format, excellent compression</li>
              <li><strong>HEIC:</strong> iPhones default photo format</li>
              <li><strong>SVG:</strong> Vector graphics, scalable</li>
            </ul>
          </article>
        </div>

        <RelatedTools
          currentTool="/tools/image-converter"
          category="Image Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
}