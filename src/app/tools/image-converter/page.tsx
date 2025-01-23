"use client";

import { useState, useEffect, useCallback } from 'react';
import { PDFDocument } from 'pdf-lib';
import heic2any from 'heic2any';
import { saveAs } from 'file-saver';
import { converterVariants } from './converterConfigs';
import './image-converter.css';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';

interface ImageConverterProps {
  title?: string;
  description?: string;
  defaultTarget?: string;
  allowedInputs?: string[];
  allowedOutputs?: string[];
  metaDescription?: string;
  keywords?: string;
  variant?: string;
}

const supportedFormats = {
  'jpg': ['png', 'webp', 'heic', 'pdf', 'svg'],
  'jpeg': ['png', 'webp', 'heic', 'pdf', 'svg'],
  'png': ['jpg', 'webp', 'heic', 'pdf', 'svg'],
  'svg': ['png', 'jpg', 'webp', 'pdf'],
  'webp': ['jpg', 'png', 'pdf', 'svg'],
  'heic': ['jpg', 'png', 'webp', 'pdf'],
  'pdf': ['jpg', 'png', 'webp']
};

const supportedMimeTypes = {
  'jpg': 'image/jpeg',
  'png': 'image/png',
  'webp': 'image/webp',
  'svg': 'image/svg+xml',
  'pdf': 'application/pdf',
  'heic': 'image/heic'
};

// Configure PDF.js worker
if (typeof window !== 'undefined') {
  GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${getDocument.version}/pdf.worker.min.js`;
}

export default function ImageConverter({
  title = "Image Converter",
  description = "Convert images between different formats including JPG, PNG, WebP, SVG, PDF, and HEIC.",
  defaultTarget = 'jpg',
  allowedInputs = ['jpg', 'png', 'webp', 'svg', 'pdf', 'heic'],
  allowedOutputs = ['jpg', 'png', 'webp', 'svg', 'pdf'],
  variant = "general"
}: ImageConverterProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [convertedImage, setConvertedImage] = useState<Blob | null>(null);
  const [targetFormat, setTargetFormat] = useState(defaultTarget);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [conversionProgress, setConversionProgress] = useState(0);

  const isValidFileType = useCallback((file: File) => {
    const fileType = file.type.split('/')[1]?.toLowerCase();
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    
    return (
      supportedFormats[fileType as keyof typeof supportedFormats] || 
      supportedFormats[fileExtension as keyof typeof supportedFormats] ||
      fileType === 'jpeg' ||
      fileExtension === 'jpeg' ||
      fileExtension === 'heic'
    );
  }, []);

  const handleFileSelect = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        setError('File size should be less than 10MB');
        return;
      }

      if (!isValidFileType(file)) {
        setError('Unsupported file format');
        return;
      }

      setSelectedFile(file);
      setError('');
      setConvertedImage(null);

      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result as string);
      reader.readAsDataURL(file);
    }
  }, [isValidFileType]);

  // Enhanced HEIC handling
  const handleHeicFile = async (file: File) => {
    try {
      setLoading(true);
      setConversionProgress(0);
      
      const buffer = await file.arrayBuffer();
      
      const conversionOptions = {
        buffer: buffer,
        format: targetFormat === 'jpg' ? 'JPEG' : targetFormat.toUpperCase(),
        quality: 0.92
      };

      const convertedBlob = await heic2any({
        ...conversionOptions,
        onProgress: (progress: number) => {
          setConversionProgress(Math.round(progress * 100));
        }
      });
      
      const resultBlob = Array.isArray(convertedBlob) ? convertedBlob[0] : convertedBlob;

      if (!resultBlob) {
        throw new Error('HEIC conversion failed');
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result as string);
        setConvertedImage(resultBlob);
      };
      reader.readAsDataURL(resultBlob);

    } catch (err) {
      console.error('HEIC conversion error:', err);
      setError('Error converting HEIC file. Please ensure it\'s a valid HEIC image.');
    } finally {
      setLoading(false);
      setConversionProgress(0);
    }
  };

  // Updated PDF to Image conversion
  const convertPDFToImage = async () => {
    try {
      if (!selectedFile) return;
      const arrayBuffer = await selectedFile.arrayBuffer();
      
      // Load the PDF using PDF.js
      const loadingTask = getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1); // Get first page
      
      const viewport = page.getViewport({ scale: 2.0 }); // Increase scale for better quality
      
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      // Render PDF page to canvas
      await page.render({
        canvasContext: ctx,
        viewport: viewport
      }).promise;
      
      // Convert to desired format
      return new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedImage(blob);
          }
          resolve();
        }, supportedMimeTypes[targetFormat as keyof typeof supportedMimeTypes], 0.92);
      });
    } catch (error) {
      console.error('PDF conversion error:', error);
      throw new Error('Failed to convert PDF');
    }
  };

  // Handle SVG conversion
  const handleSVGConversion = async () => {
    if (!selectedFile || !preview) return;
    
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = preview;
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (targetFormat === 'jpg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);
      
      return new Promise<void>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) {
            setConvertedImage(blob);
          }
          resolve();
        }, supportedMimeTypes[targetFormat as keyof typeof supportedMimeTypes], 0.92);
      });
    } catch (error) {
      throw new Error('Failed to convert SVG: ' + error);
    }
  };

  // Updated image conversion function
  const convertImage = async () => {
    if (!selectedFile) return;
    
    try {
      setLoading(true);
      setError('');

      // Handle HEIC files
      if (selectedFile.name.toLowerCase().endsWith('.heic')) {
        await handleHeicFile(selectedFile);
        return;
      }

      // Handle PDF conversion
      if (selectedFile.type === 'application/pdf') {
        await convertPDFToImage();
        return;
      }

      // Handle regular image conversion
      const img = new Image();
      const reader = new FileReader();

      await new Promise((resolve, reject) => {
        reader.onload = () => {
          img.onload = resolve;
          img.onerror = reject;
          img.src = reader.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(selectedFile);
      });

      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      
      if (!ctx) {
        throw new Error('Failed to get canvas context');
      }

      // Handle JPG white background
      if (targetFormat === 'jpg' || targetFormat === 'jpeg') {
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      ctx.drawImage(img, 0, 0);

      // Convert to target format
      const blob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob(
          (blob) => {
            if (blob) {
              resolve(blob);
            } else {
              reject(new Error('Failed to create blob'));
            }
          },
          supportedMimeTypes[targetFormat as keyof typeof supportedMimeTypes],
          0.92
        );
      });

      setConvertedImage(blob);
    } catch (err) {
      console.error('Conversion error:', err);
      setError(`Conversion error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const downloadConverted = () => {
    if (!convertedImage || !selectedFile) return;

    const originalName = selectedFile.name.split('.')[0];
    const fileName = `${originalName}.${targetFormat}`;
    saveAs(convertedImage, fileName);
  };

  return (
    <div className="imgconv-container">
      <div className="imgconv-header">
        <h1>{title}</h1>
        <p className="imgconv-description">{description}</p>
      </div>

      <div className="imgconv-workspace">
        <div className="imgconv-upload-section">
          <input
            type="file"
            accept="image/*,.pdf,.heic"
            onChange={handleFileSelect}
            className="imgconv-file-input"
            id="file-input"
          />
          <label htmlFor="file-input" className="imgconv-file-label">
            <span>Drop image here or click to select</span>
            <small>Supports JPG, PNG, WebP, SVG, PDF, HEIC (Max: 10MB)</small>
          </label>
        </div>

        {error && <div className="imgconv-error">{error}</div>}

        {loading && conversionProgress > 0 && (
          <div className="imgconv-progress">
            <div 
              className="imgconv-progress-bar" 
              style={{ width: `${conversionProgress}%` }}
            />
            <span>{conversionProgress}% Complete</span>
          </div>
        )}

        {selectedFile && (
          <div className="imgconv-controls">
            <div className="imgconv-format-selector">
              <label>Convert to:</label>
              <select
                value={targetFormat}
                onChange={(e) => setTargetFormat(e.target.value)}
              >
                {allowedOutputs.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={convertImage}
              disabled={loading}
              className="imgconv-convert-btn"
            >
              {loading ? 'Converting...' : 'Convert Image'}
            </button>
          </div>
        )}

        {(preview || convertedImage) && (
          <div className="imgconv-preview-section">
            {preview && (
              <div className="imgconv-preview-box">
                <div className="imgconv-preview-original">
                  <h3>Original Image</h3>
                  <div className="imgconv-preview-container">
                    <img src={preview} alt="Original" />
                  </div>
                </div>
              </div>
            )}

            {convertedImage && (
              <div className="imgconv-preview-box">
                <div className="imgconv-preview-converted">
                  <h3>Converted Image</h3>
                  <div className="imgconv-preview-container">
                    {targetFormat === 'pdf' ? (
                      <iframe
                        src={URL.createObjectURL(convertedImage)}
                        title="PDF Preview"
                        className="imgconv-pdf-preview"
                      />
                    ) : (
                      <img src={URL.createObjectURL(convertedImage)} alt="Converted" />
                    )}
                  </div>
                  <button onClick={downloadConverted} className="imgconv-download-btn">
                    Download Converted Image
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Article sections */}
      <div className="imgconv-articles">
        <article className="imgconv-article">
          <h2>Understanding Image Formats</h2>
          <ul>
            <li><strong>JPEG/JPG:</strong> Best for photographs and complex images with many colors</li>
            <li><strong>PNG:</strong> Perfect for images with transparency and screenshots</li>
            <li><strong>WebP:</strong> Modern format offering better compression than JPG and PNG</li>
            <li><strong>SVG:</strong> Vector format ideal for logos and icons that need to scale</li>
            <li><strong>HEIC:</strong> Apple's high-efficiency format with better compression</li>
            <li><strong>PDF:</strong> Document format that can contain images and text</li>
          </ul>
        </article>

        <article className="imgconv-article">
          <h2>When to Use Each Format</h2>
          <ul>
            <li>Use JPG for photographs and web images</li>
            <li>Use PNG for screenshots and images with transparency</li>
            <li>Use WebP for modern websites and web applications</li>
            <li>Use SVG for logos, icons, and scalable graphics</li>
            <li>Use PDF for documents and printable materials</li>
          </ul>
        </article>

        <article className="imgconv-article">
          <h2>Image Conversion Tips</h2>
          <ul>
            <li>Choose the right format based on your needs</li>
            <li>Consider file size vs. quality trade-offs</li>
            <li>Use modern formats like WebP where supported</li>
            <li>Convert HEIC files for broader compatibility</li>
            <li>Optimize images for web performance</li>
          </ul>
        </article>
      </div>
    </div>
  );
} 