"use client";

import { useState } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';
import RelatedTools from '../shared/RelatedTools';
import './qr-generator.css';

export default function QrGenerator() {
  const [input, setInput] = useState('');
  const [qrCode, setQrCode] = useState('');
  const [error, setError] = useState('');
  const [size, setSize] = useState(300);
  const [darkColor, setDarkColor] = useState('#000000');
  const [lightColor, setLightColor] = useState('#ffffff');
  const [showInput, setShowInput] = useState(true);

  const generateQR = async () => {
    try {
      if (!input.trim()) {
        setError('Please enter some content for the QR code');
        return;
      }

      const options = {
        width: size,
        margin: 1,
        color: {
          dark: darkColor,
          light: lightColor
        }
      };

      const url = await QRCode.toDataURL(input, options);
      setQrCode(url);
      setError('');
      setShowInput(false);
    } catch (err) {
      setError('Error generating QR code: ' + err);
    }
  };

  const downloadQR = () => {
    if (!qrCode) return;

    const link = document.createElement('a');
    link.href = qrCode;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setInput('');
    setQrCode('');
    setError('');
    setShowInput(true);
  };

  const toggleInput = () => {
    setShowInput(!showInput);
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>QR Code Generator</h1>
          <p>
            Create custom QR codes for websites, text, contact information, and more.
            Customize colors and size to match your needs.
          </p>
        </div>

        <div className="qr-generator">
          <div className="controls">
            <div className="control-group">
              <label>Size:</label>
              <input
                type="number"
                min="100"
                max="1000"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
              />
              <label>Colors:</label>
              <input
                type="color"
                value={darkColor}
                onChange={(e) => setDarkColor(e.target.value)}
                title="QR Code Color"
              />
              <input
                type="color"
                value={lightColor}
                onChange={(e) => setLightColor(e.target.value)}
                title="Background Color"
              />
            </div>
            <div className="control-buttons">
              <button onClick={clearAll}>Clear</button>
              <button onClick={toggleInput} className="toggle-btn">
                {showInput ? 'Hide Input' : 'Show Input'}
              </button>
            </div>
          </div>

          <div className={`editor-container ${showInput ? '' : 'input-hidden'}`}>
            {showInput && (
              <div className="input-section">
                <h2>Enter Content</h2>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter URL, text, or contact information..."
                />
                <button onClick={generateQR} className="generate-btn">
                  Generate QR Code
                </button>
              </div>
            )}

            <div className={`output-section ${showInput ? '' : 'full-width'}`}>
              <div className="output-header">
                <h2>Generated QR Code</h2>
                {qrCode && <button onClick={downloadQR}>Download</button>}
              </div>
              {error ? (
                <div className="error-message">{error}</div>
              ) : (
                <div className="qr-display">
                  {qrCode && <Image src={qrCode} alt="Generated QR Code" width={size} height={size} />}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>What is a QR Code?</h2>
            <div className="feature-content">
              <p>
                QR (Quick Response) codes are two-dimensional barcodes that can store various types
                of information. They can be quickly read by mobile devices and are commonly used
                for sharing URLs, contact information, and other data.
              </p>
              <div className="features-grid">
                <div className="feature-card">
                  <h3>Versatile Usage</h3>
                  <ul className="benefits-list">
                    <li>Website URLs and links</li>
                    <li>Business cards and contact info</li>
                    <li>Product packaging</li>
                    <li>Marketing materials</li>
                  </ul>
                </div>
                <div className="feature-card">
                  <h3>Key Features</h3>
                  <ul className="benefits-list">
                    <li>Custom colors and sizes</li>
                    <li>High error correction</li>
                    <li>Instant generation</li>
                    <li>Mobile-friendly output</li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Common Applications</h2>
            <div className="use-cases-grid">
              <div className="use-case">
                <h3>Business Uses</h3>
                <ul className="practices-list">
                  <li>Digital business cards</li>
                  <li>Product packaging and labels</li>
                  <li>Restaurant menus</li>
                  <li>Marketing campaigns</li>
                </ul>
              </div>
              <div className="use-case">
                <h3>Personal Uses</h3>
                <ul className="practices-list">
                  <li>Social media profiles</li>
                  <li>Wi-Fi network sharing</li>
                  <li>Contact information</li>
                  <li>Event tickets</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Best Practices</h2>
            <div className="tips-content">
              <ol className="practices-list">
                <li>
                  <h3>Size Matters</h3>
                  <p>Choose an appropriate QR code size based on scanning distance and usage.</p>
                </li>
                <li>
                  <h3>Color Contrast</h3>
                  <p>Ensure sufficient contrast between QR code and background colors.</p>
                </li>
                <li>
                  <h3>Testing</h3>
                  <p>Always test your QR codes before publishing or printing them.</p>
                </li>
                <li>
                  <h3>Quiet Zone</h3>
                  <p>Maintain adequate white space around the QR code for better scanning.</p>
                </li>
              </ol>
            </div>
          </article>

          <article className="info-box">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How do I scan a QR code?</h3>
                <p>
                  Most modern smartphones can scan QR codes using their built-in camera app.
                  Simply open your camera and point it at the QR code.
                </p>
              </div>
              <div className="faq-item">
                <h3>What content can I encode?</h3>
                <p>
                  QR codes can store URLs, plain text, contact information (vCard), 
                  email addresses, phone numbers, and Wi-Fi credentials.
                </p>
              </div>
              <div className="faq-item">
                <h3>Are QR codes secure?</h3>
                <p>
                  QR codes themselves are just a way to store data. Always verify the 
                  destination before accessing unknown QR codes.
                </p>
              </div>
              <div className="faq-item">
                <h3>{"What's the maximum capacity?"}</h3>
                <p>
                  QR codes can store up to 4,296 alphanumeric characters, depending on 
                  the version and error correction level used.
                </p>
              </div>
            </div>
          </article>
        </div>

        <RelatedTools 
          currentTool="/tools/qr-generator" 
          category="Image Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 