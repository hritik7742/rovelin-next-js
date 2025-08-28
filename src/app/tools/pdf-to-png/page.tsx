'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './pdf-to-png.css';


export default function PdfToPngConverter() {
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<string[]>([]);
  const [imageBlobs, setImageBlobs] = useState<Blob[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imagesRef = useRef<string[]>([]);

  // Sync ref with current images
  useEffect(() => {
    imagesRef.current = images;
  }, [images]);

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      imagesRef.current.forEach(url => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Cleanup previous images
    imagesRef.current.forEach(url => URL.revokeObjectURL(url));
    setImages([]);
    setImageBlobs([]);
    setError(null);
    setFile(selectedFile);
  };

  const convertPdfToPng = async () => {
    if (!file) {
      setError('Please select a PDF file first');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Dynamically import pdfjs-dist
      const pdfjsLib = await import('pdfjs-dist');
      const pdfjs = pdfjsLib.default || pdfjsLib;

      // Configure worker using local file from public folder
      if (typeof window !== 'undefined') {
        pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
      }

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjs.getDocument(arrayBuffer).promise;
      const newImages: string[] = [];
      const newBlobs: Blob[] = [];

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 2.0 });

        const canvas = document.createElement('canvas');
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const context = canvas.getContext('2d', { willReadFrequently: true });
        if (!context) throw new Error('Canvas context not available');

        await page.render({
          canvasContext: context,
          viewport,
        }).promise;

        const blob = await new Promise<Blob | null>(resolve =>
          canvas.toBlob(resolve, 'image/png', 0.95)
        );

        if (!blob) throw new Error('Failed to convert canvas to blob');

        newImages.push(URL.createObjectURL(blob));
        newBlobs.push(blob);
      }

      setImages(newImages);
      setImageBlobs(newBlobs);
    } catch (err) {
      console.error(err);
      setError('Failed to convert PDF: ' + (err instanceof Error ? err.message : 'Unknown error'));
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url: string, index: number) => {
    try {
      const blob = imageBlobs[index];
      if (!blob) {
        throw new Error('Blob not found');
      }

      // Create download link from blob
      const link = document.createElement('a');
      const downloadUrl = URL.createObjectURL(blob);
      link.href = downloadUrl;
      link.download = `page-${index + 1}.png`;
      link.style.display = 'none';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      console.error('Download failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  // Create ZIP file with all images
  const createZipFile = async (): Promise<Blob> => {
    const zipData: Uint8Array[] = [];
    const centralDirectory: Uint8Array[] = [];
    let offset = 0;

    for (let i = 0; i < imageBlobs.length; i++) {
      const fileName = `page-${i + 1}.png`;
      const blob = imageBlobs[i];
      const imageBytes = new Uint8Array(await blob.arrayBuffer());

      // Local file header
      const localHeader = new Uint8Array(30 + fileName.length);
      const view = new DataView(localHeader.buffer);

      view.setUint32(0, 0x04034b50, true); // Local file header signature
      view.setUint16(4, 20, true); // Version needed to extract
      view.setUint16(6, 0, true); // General purpose bit flag
      view.setUint16(8, 0, true); // Compression method (stored)
      view.setUint16(10, 0, true); // Last mod file time
      view.setUint16(12, 0, true); // Last mod file date
      view.setUint32(14, 0, true); // CRC-32 (we'll calculate this)
      view.setUint32(18, imageBytes.length, true); // Compressed size
      view.setUint32(22, imageBytes.length, true); // Uncompressed size
      view.setUint16(26, fileName.length, true); // File name length
      view.setUint16(28, 0, true); // Extra field length

      // Add filename
      for (let j = 0; j < fileName.length; j++) {
        localHeader[30 + j] = fileName.charCodeAt(j);
      }

      // Calculate CRC32 (simplified)
      let crc = 0xFFFFFFFF;
      for (let j = 0; j < imageBytes.length; j++) {
        crc ^= imageBytes[j];
        for (let k = 0; k < 8; k++) {
          crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
        }
      }
      crc = crc ^ 0xFFFFFFFF;
      view.setUint32(14, crc, true);

      zipData.push(localHeader);
      zipData.push(imageBytes);

      // Central directory entry
      const centralEntry = new Uint8Array(46 + fileName.length);
      const centralView = new DataView(centralEntry.buffer);

      centralView.setUint32(0, 0x02014b50, true); // Central directory signature
      centralView.setUint16(4, 20, true); // Version made by
      centralView.setUint16(6, 20, true); // Version needed to extract
      centralView.setUint16(8, 0, true); // General purpose bit flag
      centralView.setUint16(10, 0, true); // Compression method
      centralView.setUint16(12, 0, true); // Last mod file time
      centralView.setUint16(14, 0, true); // Last mod file date
      centralView.setUint32(16, crc, true); // CRC-32
      centralView.setUint32(20, imageBytes.length, true); // Compressed size
      centralView.setUint32(24, imageBytes.length, true); // Uncompressed size
      centralView.setUint16(28, fileName.length, true); // File name length
      centralView.setUint16(30, 0, true); // Extra field length
      centralView.setUint16(32, 0, true); // File comment length
      centralView.setUint16(34, 0, true); // Disk number start
      centralView.setUint16(36, 0, true); // Internal file attributes
      centralView.setUint32(38, 0, true); // External file attributes
      centralView.setUint32(42, offset, true); // Relative offset of local header

      // Add filename to central directory
      for (let j = 0; j < fileName.length; j++) {
        centralEntry[46 + j] = fileName.charCodeAt(j);
      }

      centralDirectory.push(centralEntry);
      offset += localHeader.length + imageBytes.length;
    }

    // End of central directory record
    const centralDirSize = centralDirectory.reduce((sum, entry) => sum + entry.length, 0);
    const endRecord = new Uint8Array(22);
    const endView = new DataView(endRecord.buffer);

    endView.setUint32(0, 0x06054b50, true); // End of central dir signature
    endView.setUint16(4, 0, true); // Number of this disk
    endView.setUint16(6, 0, true); // Number of disk with start of central directory
    endView.setUint16(8, imageBlobs.length, true); // Total number of entries on this disk
    endView.setUint16(10, imageBlobs.length, true); // Total number of entries
    endView.setUint32(12, centralDirSize, true); // Size of central directory
    endView.setUint32(16, offset, true); // Offset of start of central directory
    endView.setUint16(20, 0, true); // ZIP file comment length

    // Combine all parts
    const totalSize = zipData.reduce((sum, chunk) => sum + chunk.length, 0) + centralDirSize + endRecord.length;
    const zipBuffer = new Uint8Array(totalSize);
    let pos = 0;

    // Add file data
    for (const chunk of zipData) {
      zipBuffer.set(chunk, pos);
      pos += chunk.length;
    }

    // Add central directory
    for (const entry of centralDirectory) {
      zipBuffer.set(entry, pos);
      pos += entry.length;
    }

    // Add end record
    zipBuffer.set(endRecord, pos);

    return new Blob([zipBuffer], { type: 'application/zip' });
  };

  const downloadAsZip = async () => {
    try {
      const zipBlob = await createZipFile();
      const link = document.createElement('a');
      const downloadUrl = URL.createObjectURL(zipBlob);
      link.href = downloadUrl;
      link.download = `${file?.name.replace('.pdf', '') || 'pdf-pages'}.zip`;
      link.style.display = 'none';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);
    } catch (error) {
      console.error('ZIP download failed:', error);
      alert('ZIP download failed. Please try again.');
    }
  };

  const downloadAll = async () => {
    try {
      for (let index = 0; index < imageBlobs.length; index++) {
        const blob = imageBlobs[index];

        // Create download link from blob
        const link = document.createElement('a');
        const downloadUrl = URL.createObjectURL(blob);
        link.href = downloadUrl;
        link.download = `page-${index + 1}.png`;
        link.style.display = 'none';

        // Trigger download with small delay to avoid browser blocking
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        setTimeout(() => URL.revokeObjectURL(downloadUrl), 100);

        // Small delay between downloads
        if (index < imageBlobs.length - 1) {
          await new Promise(resolve => setTimeout(resolve, 300));
        }
      }
    } catch (error) {
      console.error('Download all failed:', error);
      alert('Download failed. Please try again.');
    }
  };

  return (
    <div className="pdf-converter-container">
      <div className="pdf-converter-workspace">
        <div className="pdf-converter-header">
          <h1>PDF to PNG Converter</h1>
          <p className="pdf-converter-description">
            Convert PDF pages to high-quality PNG images with ease. Upload your PDF and get individual PNG files or download all as a ZIP.
          </p>
        </div>

        {/* Header Ad */}
        <AdUnit
          adSlot="8285940620"
          adFormat="auto"
          className="header-ad"
        />

        <div
          className={`pdf-converter-upload-section ${loading ? 'disabled' : ''}`}
          onClick={() => !loading && fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            className="pdf-converter-file-input"
            accept=".pdf"
            onChange={handleFileChange}
            disabled={loading}
          />
          <div className="pdf-converter-file-label">
            <div className="pdf-converter-upload-icon">📄</div>
            <span className="pdf-converter-upload-text">
              {file ? file.name : 'Choose PDF file or drag & drop'}
            </span>
            <small className="pdf-converter-upload-hint">
              Supported format: PDF
            </small>
          </div>
        </div>

        {error && (
          <div className="pdf-converter-error">
            {error}
          </div>
        )}

        {loading && (
          <div className="pdf-converter-progress">
            <div className="pdf-converter-progress-bar">
              <div className="pdf-converter-progress-fill"></div>
            </div>
            <p className="pdf-converter-progress-text">Converting PDF pages...</p>
          </div>
        )}

        {file && !loading && images.length === 0 && (
          <div className="pdf-converter-controls">
            <button
              className="pdf-converter-convert-btn"
              onClick={convertPdfToPng}
            >
              Convert to PNG
            </button>
          </div>
        )}

        {images.length > 0 && (
          <div className="pdf-converter-results">
            <div className="pdf-converter-results-header">
              <h3>Converted Pages ({images.length})</h3>
              <div className="pdf-converter-download-options">
                <button
                  className="pdf-converter-download-btn zip"
                  onClick={downloadAsZip}
                >
                  📦 Download ZIP
                </button>
                <button
                  className="pdf-converter-download-btn all"
                  onClick={downloadAll}
                >
                  📥 Download All
                </button>
              </div>
            </div>

            <div className="pdf-converter-image-grid">
              {images.map((img, index) => (
                <div key={index} className="pdf-converter-image-card">
                  <div className="pdf-converter-image-container">
                    <Image
                      src={img}
                      alt={`Page ${index + 1}`}
                      className="pdf-converter-image"
                      width={300}
                      height={400}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <div className="pdf-converter-image-info">
                    <span className="pdf-converter-page-number">Page {index + 1}</span>
                    <button
                      className="pdf-converter-download-single"
                      onClick={() => downloadImage(img, index)}
                    >
                      Download
                    </button>
                  </div>
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

        <div className="pdf-converter-articles">
          <article className="pdf-converter-article">
            <h2>How to Use</h2>
            <p>Converting your PDF to PNG images is simple:</p>
            <ul>
              <li>Upload your PDF file</li>
              <li>Click convert to process all pages</li>
              <li>Download individual pages or get all as ZIP</li>
              <li>High-quality PNG output guaranteed</li>
            </ul>
          </article>

          <article className="pdf-converter-article">
            <h2>Why Convert PDF to PNG?</h2>
            <ul>
              <li>Create image thumbnails from PDF pages</li>
              <li>Use PDF content in image editors</li>
              <li>Share specific pages as images</li>
              <li>Convert presentations to image format</li>
              <li>Extract visual content from documents</li>
            </ul>
          </article>

          <article className="pdf-converter-article">
            <h2>Features</h2>
            <ul>
              <li><strong>High Quality:</strong> 2x scale for crisp images</li>
              <li><strong>Batch Download:</strong> ZIP all pages at once</li>
              <li><strong>Fast Processing:</strong> Client-side conversion</li>
              <li><strong>Privacy:</strong> Files never leave your browser</li>
            </ul>
          </article>
        </div>

        {/* Footer Ad */}
        <AdUnit
          adSlot="8285940620"
          adFormat="auto"
          className="footer-ad"
        />

        <RelatedTools
          currentTool="/tools/pdf-to-png"
          category="PDF Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
}