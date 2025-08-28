"use client";

import { useState } from 'react';
import { convertDimension, getPreviewStyle } from './utils';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './image-resizer.css';
import Image from 'next/image';

export default function ImageResizer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [dimensions, setDimensions] = useState({ width: '', height: '' });
  const [maintainAspectRatio, setMaintainAspectRatio] = useState(false);
  const [originalDimensions, setOriginalDimensions] = useState({ width: 0, height: 0 });
  const [outputFormat, setOutputFormat] = useState('png');
  const [unit, setUnit] = useState('px');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return;
      }

      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }

      setSelectedFile(file);
      setError('');

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreview(result);
        const img = new window.Image();
        img.onload = () => {
          const pixelWidth = img.width;
          const pixelHeight = img.height;
          setOriginalDimensions({ width: pixelWidth, height: pixelHeight });
          
          const convertedWidth = convertDimension(pixelWidth, 'px', unit);
          const convertedHeight = convertDimension(pixelHeight, 'px', unit);
          setDimensions({ 
            width: convertedWidth.toString(), 
            height: convertedHeight.toString() 
          });
        };
        img.src = result || '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDimensionChange = (dimension: 'width' | 'height', value: string) => {
    const numValue = parseInt(value) || '';
    
    if (maintainAspectRatio && originalDimensions.width && originalDimensions.height) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      if (dimension === 'width') {
        setDimensions({
          width: numValue.toString(),
          height: Math.round(Number(numValue) / aspectRatio).toString()
        });
      } else {
        setDimensions({
          width: Math.round(Number(numValue) * aspectRatio).toString(),
          height: numValue.toString()
        });
      }
    } else {
      setDimensions(prev => ({
        ...prev,
        [dimension]: numValue.toString()
      }));
    }
  };

  const handleUnitChange = (newUnit: string) => {
    if (dimensions.width && dimensions.height) {
      const pxWidth = convertDimension(Number(dimensions.width), unit, 'px');
      const pxHeight = convertDimension(Number(dimensions.height), unit, 'px');
      
      const newWidth = convertDimension(pxWidth, 'px', newUnit);
      const newHeight = convertDimension(pxHeight, 'px', newUnit);
      
      setDimensions({
        width: newWidth.toString(),
        height: newHeight.toString()
      });
    }
    setUnit(newUnit);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setPreview(null);
    setDimensions({ width: '', height: '' });
    setOriginalDimensions({ width: 0, height: 0 });
    setError('');
  };

  const downloadResizedImage = () => {
    if (!selectedFile || !dimensions.width || !dimensions.height) {
      setError('Please select an image and set dimensions');
      return;
    }

    setLoading(true);
    setError('');

    const img = new window.Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const pxWidth = convertDimension(Number(dimensions.width), unit, 'px');
      const pxHeight = convertDimension(Number(dimensions.height), unit, 'px');
      
      canvas.width = pxWidth;
      canvas.height = pxHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, pxWidth, pxHeight);
        
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `resized-image.${outputFormat}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
          }
          setLoading(false);
        }, `image/${outputFormat}`);
      }
    };
    if (!preview) return;
    img.src = preview;
  };

  return (
    <div className="resizer-container">
      {/* Header Ad */}
      <AdUnit 
        className="header-ad"
        adSlot="8285940620" 
        adFormat="auto"
      />
      
      <div className="tool-header">
        <h1>Free Online Image Resizer</h1>
        <p>Resize any image to exact dimensions while maintaining quality. Perfect for social media, icons, and web graphics.</p>
      </div>

      <div className="resizer-workspace">
        <div className="editor-section">
          <div className="controls-panel">
            <div className="dimension-controls">
              <div className="input-group">
                <label>Width</label>
                <div className="dimension-input">
                  <input
                    type="number"
                    value={dimensions.width}
                    onChange={(e) => handleDimensionChange('width', e.target.value)}
                    min="1"
                  />
                </div>
              </div>
              <div className="input-group">
                <label>Height</label>
                <div className="dimension-input">
                  <input
                    type="number"
                    value={dimensions.height}
                    onChange={(e) => handleDimensionChange('height', e.target.value)}
                    min="1"
                  />
                </div>
              </div>
            </div>

            <div className="options-controls">
              <div className="unit-group">
                <label>Unit</label>
                <select
                  value={unit}
                  onChange={(e) => handleUnitChange(e.target.value)}
                >
                  <option value="px">Pixels (px)</option>
                  <option value="mm">Millimeters (mm)</option>
                  <option value="cm">Centimeters (cm)</option>
                  <option value="inch">Inches (in)</option>
                </select>
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="aspect-ratio"
                  checked={maintainAspectRatio}
                  onChange={(e) => setMaintainAspectRatio(e.target.checked)}
                />
                <label htmlFor="aspect-ratio">Maintain Aspect Ratio</label>
              </div>

              <div className="format-group">
                <label>Format</label>
                <select
                  value={outputFormat}
                  onChange={(e) => setOutputFormat(e.target.value)}
                >
                  <option value="png">PNG</option>
                  <option value="jpeg">JPEG</option>
                  <option value="webp">WebP</option>
                </select>
              </div>
            </div>

            <div className="action-buttons">
              {selectedFile && (
                <>
                  <button 
                    onClick={downloadResizedImage}
                    className="download-button"
                    disabled={loading}
                  >
                    {loading ? 'Processing...' : 'Download Resized Image'}
                  </button>
                  
                  <button 
                    onClick={handleReset}
                    className="back-button"
                  >
                    Upload Different Image
                  </button>
                </>
              )}
            </div>
          </div>

          <div className="preview-panel">
            {!selectedFile ? (
              <div className="upload-section">
                <input
                  type="file"
                  id="image-input"
                  className="file-input"
                  onChange={handleFileSelect}
                  accept="image/*"
                />
                <label htmlFor="image-input" className="upload-label">
                  <div className="upload-icon">📁</div>
                  <span>Click to upload image or drag and drop</span>
                  <small>Supports JPG, PNG, WebP (max 10MB)</small>
                </label>
              </div>
            ) : (
              <>
                {preview && typeof preview === 'string' && (
                  <Image 
                    src={preview} 
                    alt="Preview" 
                    className="preview-image"
                    width={originalDimensions.width}
                    height={originalDimensions.height}
                    style={getPreviewStyle(dimensions, unit)}
                  />
                )}
                <div className="original-info">
                  Original: {originalDimensions.width} x {originalDimensions.height}px
                </div>
              </>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="info-sections">
          <article className="info-box">
            <h2>Common Image Dimensions</h2>
            <div className="dimensions-grid">
              <div className="dimension-item">
                <h3>16x16 pixels</h3>
                <p>Perfect for favicons and small icons. Standard size for browser tab icons and bookmarks.</p>
              </div>
              <div className="dimension-item">
                <h3>32x32 pixels</h3>
                <p>Ideal for application icons and higher resolution favicons. Common in Windows system tray icons.</p>
              </div>
              <div className="dimension-item">
                <h3>48x48 pixels</h3>
                <p>Used for desktop icons and toolbar buttons. Popular in software interfaces and app stores.</p>
              </div>
              <div className="dimension-item">
                <h3>128x128 pixels</h3>
                <p>High-resolution app icons and thumbnails. Standard for macOS and modern Windows applications.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Popular Social Media Sizes</h2>
            <ul className="social-sizes">
              <li>Profile Picture: 400x400 pixels</li>
              <li>Cover Photo: 1500x500 pixels</li>
              <li>Post Image: 1200x630 pixels</li>
              <li>Story: 1080x1920 pixels</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Why Choose Our Image Resizer</h2>
            <ul className="features-list">
              <li>Precise pixel-perfect resizing</li>
              <li>Maintain aspect ratio option</li>
              <li>Multiple output formats (PNG, JPG, WebP)</li>
              <li>Support for common icon dimensions</li>
              <li>No registration required</li>
              <li>Free to use</li>
            </ul>
          </article>
        </div>

        {/* Middle Ad */}
        <AdUnit 
          className="content-ad"
          adSlot="8285940620" 
          adFormat="auto"
        />

        <RelatedTools 
          currentTool="/tools/image-resizer" 
          category="Image Tools" 
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