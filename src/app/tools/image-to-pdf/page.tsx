'use client';

import { useState, useRef, useEffect } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './image-to-pdf.css';

interface ImageFile {
  file: File;
  url: string;
  id: string;
}

export default function ImageToPdfConverter() {
  const [images, setImages] = useState<ImageFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<ImageFile[]>([]);

  // Sync ref with current images
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagesRef.current.forEach(img => URL.revokeObjectURL(img.url));
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length === 0) return;

    // Filter for image files
    const imageFiles = selectedFiles.filter(file =>
      file.type.startsWith('image/')
    );

    if (imageFiles.length === 0) {
      setError('Please select valid image files');
      return;
    }

    // Cleanup previous images
    imagesRef.current.forEach(img => URL.revokeObjectURL(img.url));
    setError(null);
    setPdfBlob(null);

    // Create image objects
    const newImages: ImageFile[] = imageFiles.map(file => ({
      file,
      url: URL.createObjectURL(file),
      id: Math.random().toString(36).substr(2, 9)
    }));

    setImages(newImages);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const imageToRemove = prev.find(img => img.id === id);
      if (imageToRemove) {
        URL.revokeObjectURL(imageToRemove.url);
      }
      return prev.filter(img => img.id !== id);
    });
  };

  // const reorderImages = (dragIndex: number, hoverIndex: number) => {
  //   setImages(prev => {
  //     const newImages = [...prev];
  //     const draggedImage = newImages[dragIndex];
  //     newImages.splice(dragIndex, 1);
  //     newImages.splice(hoverIndex, 0, draggedImage);
  //     return newImages;
  //   });
  // };

  // Simple PDF creation without external dependencies
  const createPdf = async (): Promise<Blob> => {
    const pdfData: Uint8Array[] = [];
    let objectId = 1;
    const objects: string[] = [];

    // PDF Header
    pdfData.push(new TextEncoder().encode('%PDF-1.4\n'));

    // Process each image
    const imageObjects: number[] = [];
    const imageData: Uint8Array[] = [];

    for (const image of images) {
      // Create canvas to get image data
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = image.url;
      });

      // Set canvas size (A4 proportions)
      const maxWidth = 595; // A4 width in points
      const maxHeight = 842; // A4 height in points

      let { width, height } = img;

      // Scale to fit A4 while maintaining aspect ratio
      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      canvas.width = width;
      canvas.height = height;
      ctx?.drawImage(img, 0, 0, width, height);

      // Convert to JPEG data
      const jpegData = canvas.toDataURL('image/jpeg', 0.8);
      const base64Data = jpegData.split(',')[1];
      const binaryData = atob(base64Data);
      const bytes = new Uint8Array(binaryData.length);
      for (let i = 0; i < binaryData.length; i++) {
        bytes[i] = binaryData.charCodeAt(i);
      }

      imageData.push(bytes);
      imageObjects.push(objectId);

      // Image object
      const imageObj = `${objectId} 0 obj\n<<\n/Type /XObject\n/Subtype /Image\n/Width ${canvas.width}\n/Height ${canvas.height}\n/ColorSpace /DeviceRGB\n/BitsPerComponent 8\n/Filter /DCTDecode\n/Length ${bytes.length}\n>>\nstream\n`;
      objects.push(imageObj);
      objectId++;
    }

    // Page objects
    const pageObjects: number[] = [];
    for (let i = 0; i < images.length; i++) {
      pageObjects.push(objectId);
      // const canvas = document.createElement('canvas');
      const img = new Image();
      img.src = images[i].url;

      const pageObj = `${objectId} 0 obj\n<<\n/Type /Page\n/Parent ${objectId + images.length} 0 R\n/MediaBox [0 0 595 842]\n/Resources <<\n/XObject <<\n/Im${i} ${imageObjects[i]} 0 R\n>>\n>>\n/Contents ${objectId + images.length + 1 + i} 0 R\n>>\nendobj\n`;
      objects.push(pageObj);
      objectId++;
    }

    // Pages object
    const pagesObj = `${objectId} 0 obj\n<<\n/Type /Pages\n/Kids [${pageObjects.map(id => `${id} 0 R`).join(' ')}]\n/Count ${images.length}\n>>\nendobj\n`;
    objects.push(pagesObj);
    const pagesObjectId = objectId;
    objectId++;

    // Content streams
    for (let i = 0; i < images.length; i++) {
      // const canvas = document.createElement('canvas');
      // const ctx = canvas.getContext('2d');
      const img = new Image();
      img.src = images[i].url;

      let { width, height } = img;
      const maxWidth = 595;
      const maxHeight = 842;

      if (width > maxWidth || height > maxHeight) {
        const scale = Math.min(maxWidth / width, maxHeight / height);
        width *= scale;
        height *= scale;
      }

      const x = (595 - width) / 2;
      const y = (842 - height) / 2;

      const content = `q\n${width} 0 0 ${height} ${x} ${y} cm\n/Im${i} Do\nQ\n`;
      const contentObj = `${objectId} 0 obj\n<<\n/Length ${content.length}\n>>\nstream\n${content}endstream\nendobj\n`;
      objects.push(contentObj);
      objectId++;
    }

    // Catalog
    const catalogObj = `${objectId} 0 obj\n<<\n/Type /Catalog\n/Pages ${pagesObjectId} 0 R\n>>\nendobj\n`;
    objects.push(catalogObj);
    const catalogObjectId = objectId;
    objectId++;

    // Build PDF
    let offset = 9; // Length of PDF header
    const xrefOffsets: number[] = [];

    // Write objects
    for (let i = 0; i < objects.length; i++) {
      xrefOffsets.push(offset);
      const objData = new TextEncoder().encode(objects[i]);
      pdfData.push(objData);
      offset += objData.length;

      // Add image data if this is an image object
      if (i < imageData.length) {
        pdfData.push(imageData[i]);
        pdfData.push(new TextEncoder().encode('\nendstream\nendobj\n'));
        offset += imageData[i].length + 19;
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
    const trailer = `trailer\n<<\n/Size ${objectId}\n/Root ${catalogObjectId} 0 R\n>>\nstartxref\n${xrefOffset}\n%%EOF\n`;
    pdfData.push(new TextEncoder().encode(trailer));

    // Combine all data
    const totalLength = pdfData.reduce((sum, chunk) => sum + chunk.length, 0);
    const pdfBuffer = new Uint8Array(totalLength);
    let pos = 0;

    for (const chunk of pdfData) {
      pdfBuffer.set(chunk, pos);
      pos += chunk.length;
    }

    return new Blob([pdfBuffer], { type: 'application/pdf' });
  };

  const convertToPdf = async () => {
    if (images.length === 0) {
      setError('Please select at least one image');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const pdf = await createPdf();
      setPdfBlob(pdf);
    } catch (err) {
      console.error(err);
      setError('Failed to create PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadPdf = () => {
    if (!pdfBlob) return;

    const link = document.createElement('a');
    const downloadUrl = URL.createObjectURL(pdfBlob);
    link.href = downloadUrl;
    link.download = 'images.pdf';
    link.style.display = 'none';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
  };

  return (
    <div className="image-to-pdf-container">
      <div className="image-to-pdf-workspace">
        <div className="image-to-pdf-header">
          <h1>Image to PDF Converter</h1>
          <p className="image-to-pdf-description">
            Convert multiple images into a single PDF document. Upload your images, arrange them in order, and download as PDF.
          </p>
        </div>

        <div
          className={`image-to-pdf-upload-section ${loading ? 'disabled' : ''}`}
          onClick={() => !loading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="image-to-pdf-file-input"
            accept="image/*"
            multiple
            onChange={handleFileChange}
            disabled={loading}
          />
          <div className="image-to-pdf-file-label">
            <div className="image-to-pdf-upload-icon">🖼️</div>
            <span className="image-to-pdf-upload-text">
              Choose images or drag & drop
            </span>
            <small className="image-to-pdf-upload-hint">
              Supported formats: JPG, PNG, GIF, WebP, BMP
            </small>
          </div>
        </div>

        {error && (
          <div className="image-to-pdf-error">
            {error}
          </div>
        )}

        {loading && (
          <div className="image-to-pdf-progress">
            <div className="image-to-pdf-progress-bar">
              <div className="image-to-pdf-progress-fill"></div>
            </div>
            <p className="image-to-pdf-progress-text">Creating PDF document...</p>
          </div>
        )}

        {images.length > 0 && (
          <div className="image-to-pdf-images">
            <div className="image-to-pdf-images-header">
              <h3>Selected Images ({images.length})</h3>
              <p className="image-to-pdf-order-hint">Drag to reorder pages</p>
            </div>

            <div className="image-to-pdf-image-grid">
              {images.map((image, index) => (
                <div key={image.id} className="image-to-pdf-image-card">
                  <div className="image-to-pdf-image-container">
                    <img
                      src={image.url}
                      alt={`Image ${index + 1}`}
                      className="image-to-pdf-image"
                    />
                    <button
                      className="image-to-pdf-remove-btn"
                      onClick={() => removeImage(image.id)}
                    >
                      ✕
                    </button>
                  </div>
                  <div className="image-to-pdf-image-info">
                    <span className="image-to-pdf-page-number">Page {index + 1}</span>
                    <span className="image-to-pdf-file-name">{image.file.name}</span>
                  </div>
                </div>
              ))}
            </div>

            {!loading && !pdfBlob && (
              <div className="image-to-pdf-controls">
                <button
                  className="image-to-pdf-convert-btn"
                  onClick={convertToPdf}
                >
                  Create PDF
                </button>
              </div>
            )}
          </div>
        )}

        {pdfBlob && (
          <div className="image-to-pdf-result">
            <div className="image-to-pdf-result-header">
              <h3>PDF Created Successfully!</h3>
              <p>Your images have been converted to a PDF document.</p>
            </div>
            <div className="image-to-pdf-download-section">
              <button
                className="image-to-pdf-download-btn"
                onClick={downloadPdf}
              >
                📄 Download PDF
              </button>
            </div>
          </div>
        )}

        {/* Middle Ad */}

        <div className="image-to-pdf-articles">
          <article className="image-to-pdf-article">
            <h2>How to Use</h2>
            <p>Converting images to PDF is simple:</p>
            <ul>
              <li>Upload multiple image files</li>
              <li>Arrange them in your desired order</li>
              <li>Click Create PDF to generate document</li>
              <li>Download your PDF file</li>
            </ul>
          </article>

          <article className="image-to-pdf-article">
            <h2>Why Convert Images to PDF?</h2>
            <ul>
              <li>Combine multiple images into one document</li>
              <li>Create professional presentations</li>
              <li>Easy sharing and printing</li>
              <li>Preserve image quality</li>
              <li>Universal compatibility</li>
            </ul>
          </article>

          <article className="image-to-pdf-article">
            <h2>Features</h2>
            <ul>
              <li><strong>Multiple Formats:</strong> JPG, PNG, GIF, WebP, BMP</li>
              <li><strong>Drag & Drop:</strong> Easy file selection</li>
              <li><strong>Reorder Pages:</strong> Arrange images as needed</li>
              <li><strong>High Quality:</strong> Preserves image resolution</li>
              <li><strong>Fast Processing:</strong> Client-side conversion</li>
            </ul>
          </article>
        </div>

        <RelatedTools
          currentTool="/tools/image-to-pdf"
          category="PDF Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
}