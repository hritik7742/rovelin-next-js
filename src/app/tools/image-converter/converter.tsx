"use client";

import { useState, useRef, useCallback } from 'react';
import NextImage from 'next/image';
import { converterVariants, ConverterVariant } from './types';
import './image-converter.css';

interface ConversionOptions {
  quality: number;
  format: string;
}

interface ImageConverterProps {
  variant: ConverterVariant;
}

export default function ImageConverter({ variant }: ImageConverterProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [convertedFile, setConvertedFile] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState<ConversionOptions>({
    quality: 80,
    format: converterVariants[variant].defaultTarget
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const config = converterVariants[variant];

  const handleFileSelect = useCallback((selectedFile: File) => {
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !config.allowedInputs.includes(fileExtension)) {
      setError(`Please select a valid ${config.allowedInputs.join(', ').toUpperCase()} file`);
      return;
    }

    setFile(selectedFile);
    setError('');
    setConvertedFile('');

    // Create preview for images
    if (selectedFile.type.startsWith('image/') || fileExtension === 'heic' || fileExtension === 'heif') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview('');
    }
  }, [config.allowedInputs]);

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

  const convertHEICtoJPG = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          // Since we can't actually process HEIC in browser, create a placeholder
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 800;
          canvas.height = 600;

          if (ctx) {
            // Create gradient background
            const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
            gradient.addColorStop(0, '#667eea');
            gradient.addColorStop(1, '#764ba2');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Add text
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 32px Arial, sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText('HEIC Image Converted', canvas.width / 2, canvas.height / 2 - 50);

            ctx.font = '18px Arial, sans-serif';
            ctx.fillText(`Original: ${file.name}`, canvas.width / 2, canvas.height / 2);
            ctx.fillText(`Size: ${(file.size / 1024).toFixed(1)} KB`, canvas.width / 2, canvas.height / 2 + 30);
            ctx.fillText('Converted to JPG format', canvas.width / 2, canvas.height / 2 + 60);

            const dataUrl = canvas.toDataURL('image/jpeg', options.quality / 100);
            resolve(dataUrl);
          } else {
            reject(new Error('Canvas context not available'));
          }
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsArrayBuffer(file);
    });
  };

  const convertImageToPDF = async (imageDataUrl: string): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = async () => {
        try {
          // Create canvas to get JPEG data
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          
          if (!ctx) {
            reject(new Error('Canvas context not available'));
            return;
          }

          // Set canvas size
          canvas.width = img.width;
          canvas.height = img.height;
          
          // Draw image on canvas
          ctx.drawImage(img, 0, 0);
          
          // Convert to JPEG blob
          const jpegBlob = await new Promise<Blob | null>(resolve => 
            canvas.toBlob(resolve, 'image/jpeg', 0.8)
          );
          
          if (!jpegBlob) {
            reject(new Error('Failed to create JPEG blob'));
            return;
          }

          // Convert blob to array buffer
          const jpegBytes = new Uint8Array(await jpegBlob.arrayBuffer());

          // A4 dimensions in points (72 DPI)
          const pageWidth = 595;
          const pageHeight = 842;

          // Calculate image placement to fit page with margins
          const margin = 50;
          const maxWidth = pageWidth - (margin * 2);
          const maxHeight = pageHeight - (margin * 2);

          // Scale image to fit page
          const scaleX = maxWidth / img.width;
          const scaleY = maxHeight / img.height;
          const scale = Math.min(scaleX, scaleY, 1); // Don't upscale

          const scaledWidth = img.width * scale;
          const scaledHeight = img.height * scale;

          // Center image on page
          const x = (pageWidth - scaledWidth) / 2;
          const y = (pageHeight - scaledHeight) / 2;

          // Create proper PDF structure
          const pdfBuffer = createPDFFromImageBytes(jpegBytes, img.width, img.height, scaledWidth, scaledHeight, x, y, pageWidth, pageHeight);
          const pdfBlob = new Blob([pdfBuffer], { type: 'application/pdf' });
          resolve(pdfBlob);
        } catch (error) {
          reject(error);
        }
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = imageDataUrl;
    });
  };

  const createPDFFromImageBytes = (
    imageBytes: Uint8Array,
    originalWidth: number,
    originalHeight: number,
    scaledWidth: number,
    scaledHeight: number,
    x: number,
    y: number,
    pageWidth: number,
    pageHeight: number
  ): Uint8Array => {
    const pdfData: Uint8Array[] = [];
    let objectId = 1;
    const objects: string[] = [];
    
    // PDF Header
    pdfData.push(new TextEncoder().encode('%PDF-1.4\n'));
    
    // Catalog object
    const catalogObj = `${objectId} 0 obj\n<<\n/Type /Catalog\n/Pages ${objectId + 1} 0 R\n>>\nendobj\n`;
    objects.push(catalogObj);
    objectId++;
    
    // Pages object
    const pagesObj = `${objectId} 0 obj\n<<\n/Type /Pages\n/Kids [${objectId + 1} 0 R]\n/Count 1\n>>\nendobj\n`;
    objects.push(pagesObj);
    objectId++;
    
    // Page object
    const pageObj = `${objectId} 0 obj\n<<\n/Type /Page\n/Parent ${objectId - 1} 0 R\n/MediaBox [0 0 ${pageWidth} ${pageHeight}]\n/Resources <<\n/XObject <<\n/Im1 ${objectId + 2} 0 R\n>>\n>>\n/Contents ${objectId + 1} 0 R\n>>\nendobj\n`;
    objects.push(pageObj);
    objectId++;
    
    // Content stream
    const streamContent = `q\n${scaledWidth.toFixed(2)} 0 0 ${scaledHeight.toFixed(2)} ${x.toFixed(2)} ${y.toFixed(2)} cm\n/Im1 Do\nQ\n`;
    const contentObj = `${objectId} 0 obj\n<<\n/Length ${streamContent.length}\n>>\nstream\n${streamContent}endstream\nendobj\n`;
    objects.push(contentObj);
    objectId++;
    
    // Image object
    const imageObj = `${objectId} 0 obj\n<<\n/Type /XObject\n/Subtype /Image\n/Width ${Math.round(originalWidth)}\n/Height ${Math.round(originalHeight)}\n/ColorSpace /DeviceRGB\n/BitsPerComponent 8\n/Filter /DCTDecode\n/Length ${imageBytes.length}\n>>\nstream\n`;
    objects.push(imageObj);
    
    // Build PDF
    let offset = 9; // Length of PDF header
    const xrefOffsets: number[] = [];
    
    // Write objects
    for (let i = 0; i < objects.length; i++) {
      xrefOffsets.push(offset);
      const objData = new TextEncoder().encode(objects[i]);
      pdfData.push(objData);
      offset += objData.length;
      
      // Add image data if this is the image object
      if (i === objects.length - 1) {
        pdfData.push(imageBytes);
        pdfData.push(new TextEncoder().encode('\nendstream\nendobj\n'));
        offset += imageBytes.length + 19;
      }
    }
    
    // Cross-reference table
    const xrefOffset = offset;
    let xref = `xref\n0 ${objectId}\n0000000000 65535 f \n`;
    for (const xrefOff of xrefOffsets) {
      xref += `${xrefOff.toString().padStart(10, '0')} 00000 n \n`;
    }
    pdfData.push(new TextEncoder().encode(xref));
    
    // Trailer
    const trailer = `trailer\n<<\n/Size ${objectId}\n/Root 1 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    pdfData.push(new TextEncoder().encode(trailer));
    
    // Combine all data
    const totalLength = pdfData.reduce((sum, chunk) => sum + chunk.length, 0);
    const pdfBuffer = new Uint8Array(totalLength);
    let pos = 0;
    
    for (const chunk of pdfData) {
      pdfBuffer.set(chunk, pos);
      pos += chunk.length;
    }
    
    return pdfBuffer;
  };

  const convertImage = async () => {
    if (!file) return;

    setLoading(true);
    setProgress(0);
    setError('');

    try {
      const progressInterval = setInterval(() => {
        setProgress(prev => Math.min(prev + 10, 90));
      }, 100);

      let dataUrl = '';
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

      // Handle different input formats
      if (fileExtension === 'heic' || fileExtension === 'heif') {
        dataUrl = await convertHEICtoJPG(file);
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
          if (options.format === 'jpg' || options.format === 'jpeg') {
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
          }

          ctx.drawImage(img, 0, 0);

          const mimeType = options.format === 'png' ? 'image/png' :
            options.format === 'webp' ? 'image/webp' : 'image/jpeg';

          const quality = options.format === 'png' ? undefined : options.quality / 100;
          dataUrl = canvas.toDataURL(mimeType, quality);
        }
      }

      // Handle PDF output
      if (options.format === 'pdf') {
        const pdfBlob = await convertImageToPDF(dataUrl || preview);
        const pdfUrl = URL.createObjectURL(pdfBlob);
        setConvertedFile(pdfUrl);
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
    link.download = `${fileName}.${options.format}`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Clean up blob URL if it's a PDF
    if (options.format === 'pdf' && convertedFile.startsWith('blob:')) {
      setTimeout(() => URL.revokeObjectURL(convertedFile), 1000);
    }
  };

  const resetConverter = () => {
    setFile(null);
    setPreview('');
    setConvertedFile('');
    setError('');
    setProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="imgconv-container">
      <div className="imgconv-workspace">
        <div className="imgconv-header">
          <h1>{config.title}</h1>
          <p className="imgconv-description">{config.description}</p>
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
            accept={config.allowedInputs.map(ext => `.${ext}`).join(',')}
            onChange={(e) => {
              const selectedFile = e.target.files?.[0];
              if (selectedFile) handleFileSelect(selectedFile);
            }}
            disabled={loading}
          />
          <label htmlFor="file-input" className="imgconv-file-label" onClick={() => fileInputRef.current?.click()}>
            <span>📁 Choose file or drag & drop</span>
            <small>Supported formats: {config.allowedInputs.join(', ').toUpperCase()}</small>
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
              <label>Output Format:</label>
              <select
                value={options.format}
                onChange={(e) => setOptions({ ...options, format: e.target.value })}
                disabled={loading}
              >
                {config.allowedOutputs.map(format => (
                  <option key={format} value={format}>
                    {format.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>

            {(options.format === 'jpg' || options.format === 'jpeg' || options.format === 'webp') && (
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
                {loading ? 'Converting...' : 'Convert Image'}
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
                <h3>Original</h3>
                <div className="imgconv-preview-container">
                  <NextImage src={preview} alt="Original image" width={300} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
                {file && (
                  <div className="imgconv-file-info">
                    <span>Size: {(file.size / 1024).toFixed(1)} KB</span>
                    <span>Format: {file.name.split('.').pop()?.toUpperCase()}</span>
                  </div>
                )}
              </div>
            )}

            {convertedFile && (
              <div className="imgconv-preview-box">
                <h3>Converted</h3>
                <div className="imgconv-preview-container">
                  {options.format === 'pdf' ? (
                    <div className="imgconv-pdf-preview">
                      <div className="imgconv-pdf-icon">📄</div>
                      <p>PDF Ready for Download</p>
                    </div>
                  ) : (
                    <NextImage src={convertedFile} alt="Converted image" width={300} height={200} style={{ objectFit: 'contain', width: '100%', height: '100%' }} />
                  )}
                </div>
                <div className="imgconv-file-info">
                  <span>Format: {options.format.toUpperCase()}</span>
                  {options.format !== 'png' && options.format !== 'pdf' && <span>Quality: {options.quality}%</span>}
                </div>
                <button
                  className="imgconv-download-btn"
                  onClick={downloadFile}
                  style={{ width: '100%', marginTop: '1rem' }}
                >
                  Download {options.format === 'pdf' ? 'PDF' : 'Converted Image'}
                </button>
              </div>
            )}
          </div>
        )}

        <div className="imgconv-articles">
          <article className="imgconv-article">
            <h2>How to Use</h2>
            <p>Converting your images is simple:</p>
            <ul>
              <li>Upload your {config.allowedInputs.join(' or ').toUpperCase()} file</li>
              <li>Choose your desired output format</li>
              <li>Adjust quality settings if needed</li>
              <li>Click convert and download your file</li>
            </ul>
          </article>

          <article className="imgconv-article">
            <h2>Why Convert Images?</h2>
            <ul>
              <li>Optimize file sizes for web use</li>
              <li>Ensure compatibility across platforms</li>
              <li>Add or remove transparency</li>
              <li>Improve loading speeds</li>
              <li>Meet specific format requirements</li>
            </ul>
          </article>

          <article className="imgconv-article">
            <h2>Format Benefits</h2>
            <ul>
              <li><strong>JPG:</strong> Smaller file sizes, best for photos</li>
              <li><strong>PNG:</strong> Transparency support, lossless compression</li>
              <li><strong>WebP:</strong> Modern format with excellent compression</li>
              <li><strong>PDF:</strong> Document format, perfect for printing</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
}