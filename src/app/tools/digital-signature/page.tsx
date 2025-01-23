"use client";

import { useState, useRef, useEffect } from 'react';
import { initializeCanvas, hexToRgb, downloadSignature } from './utils';
import './digital-signature.css';

const fonts = [
  { name: 'Cedarville Cursive', label: 'Signature Style' },
  { name: 'Dancing Script', label: 'Elegant Script' },
  { name: 'Homemade Apple', label: 'Natural Handwriting' },
  { name: 'Great Vibes', label: 'Formal Script' },
  { name: 'Sacramento', label: 'Flowing Script' },
  { name: 'Pacifico', label: 'Modern Script' }
];

export default function DigitalSignature() {
  const [signatureType, setSignatureType] = useState('draw');
  const [typedText, setTypedText] = useState('');
  const [fontFamily, setFontFamily] = useState('Cedarville Cursive');
  const [fontSize, setFontSize] = useState(48);
  const [color, setColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [showGrid, setShowGrid] = useState(true);
  const [penSize, setPenSize] = useState(2);
  const [isDrawing, setIsDrawing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);
  const [transparentBg, setTransparentBg] = useState(false);
  const [points, setPoints] = useState<[number, number][]>([]);
  const [pathHistory, setPathHistory] = useState<[number, number][][]>([]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    if (!context) return;
    
    initializeCanvas(canvas, context, color, penSize, backgroundColor);
    contextRef.current = context;
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let offsetX, offsetY;
    if ('touches' in e) {
      const rect = canvas.getBoundingClientRect();
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
    } else {
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    }

    contextRef.current?.beginPath();
    contextRef.current?.moveTo(offsetX, offsetY);
    setPoints([[offsetX, offsetY]]);
    setIsDrawing(true);
    setLastX(offsetX);
    setLastY(offsetY);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current) return;

    let offsetX, offsetY;
    if ('touches' in e) {
      e.preventDefault(); // Prevent scrolling on touch devices
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      offsetX = e.touches[0].clientX - rect.left;
      offsetY = e.touches[0].clientY - rect.top;
    } else {
      offsetX = e.nativeEvent.offsetX;
      offsetY = e.nativeEvent.offsetY;
    }

    const newPoints = [...points, [offsetX, offsetY] as [number, number]];
    setPoints(newPoints);

    if (newPoints.length > 3) {
      const lastTwoPoints = newPoints.slice(-2);
      const controlPoint = lastTwoPoints[0];
      const endPoint = {
        x: (lastTwoPoints[0][0] + lastTwoPoints[1][0]) / 2,
        y: (lastTwoPoints[0][1] + lastTwoPoints[1][1]) / 2,
      };

      contextRef.current.beginPath();
      contextRef.current.moveTo(lastX, lastY);
      contextRef.current.quadraticCurveTo(
        controlPoint[0],
        controlPoint[1],
        endPoint.x,
        endPoint.y
      );

      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = penSize;
      contextRef.current.stroke();

      setLastX(endPoint.x);
      setLastY(endPoint.y);
    }
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    
    if (points.length > 0) {
      setPathHistory([...pathHistory, points]);
    }
    setPoints([]);
    contextRef.current?.closePath();
    setIsDrawing(false);
  };

  const clearSignature = () => {
    if (!canvasRef.current || !contextRef.current) return;
    
    contextRef.current.fillStyle = backgroundColor;
    contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    setPathHistory([]);
  };

  const handleTypedSignature = () => {
    if (!canvasRef.current || !contextRef.current || !typedText) return;
    
    clearSignature();
    
    const ctx = contextRef.current;
    
    // Draw grid if enabled
    if (showGrid) {
      ctx.strokeStyle = '#e5e7eb';
      ctx.lineWidth = 1;
      
      // Draw horizontal lines
      for (let y = 0; y < canvasRef.current.height; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasRef.current.width, y);
        ctx.stroke();
      }
      
      // Draw vertical lines
      for (let x = 0; x < canvasRef.current.width; x += 20) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasRef.current.height);
        ctx.stroke();
      }
    }
    
    // Draw text
    ctx.fillStyle = color;
    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(typedText, canvasRef.current.width/2, canvasRef.current.height/2);
  };

  useEffect(() => {
    if (signatureType === 'type') {
      handleTypedSignature();
    }
  }, [typedText, fontFamily, fontSize, color, backgroundColor, showGrid]);

  const handleDownload = (format: string) => {
    if (!canvasRef.current) return;
    downloadSignature(canvasRef.current, format, transparentBg, backgroundColor);
  };

  return (
    <div className="digsig-container">
      <div className="digsig-workspace">
        <div className="digsig-header">
          <h1>Digital Signature Generator</h1>
          <p className="digsig-description">
            Create professional digital signatures instantly. Draw with your mouse/touch or type your signature.
            Download in multiple formats for documents, emails, or contracts.
          </p>
        </div>

        <div className="digsig-controls">
          <div className="digsig-type-selector">
            <button 
              className={`digsig-btn ${signatureType === 'draw' ? 'active' : ''}`}
              onClick={() => setSignatureType('draw')}
            >
              Draw Signature
            </button>
            <button 
              className={`digsig-btn ${signatureType === 'type' ? 'active' : ''}`}
              onClick={() => setSignatureType('type')}
            >
              Type Signature
            </button>
          </div>

          {signatureType === 'type' && (
            <div className="digsig-type-controls">
              <input
                type="text"
                value={typedText}
                onChange={(e) => setTypedText(e.target.value)}
                placeholder="Type your signature here"
                className="digsig-text-input"
              />
              
              <select 
                value={fontFamily}
                onChange={(e) => setFontFamily(e.target.value)}
                className="digsig-select"
              >
                {fonts.map(font => (
                  <option key={font.name} value={font.name}>{font.label}</option>
                ))}
              </select>

              <input
                type="number"
                value={fontSize}
                onChange={(e) => setFontSize(Number(e.target.value))}
                min="12"
                max="72"
                className="digsig-number-input"
              />
            </div>
          )}

          <div className="digsig-color-controls">
            <div className="digsig-color-group">
              <label>Signature Color:</label>
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="digsig-color-input"
              />
            </div>
            <div className="digsig-color-group">
              <label>Background Color:</label>
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className="digsig-color-input"
              />
            </div>
            <label className="digsig-checkbox-label">
              <input
                type="checkbox"
                checked={showGrid}
                onChange={(e) => setShowGrid(e.target.checked)}
                className="digsig-checkbox"
              />
              Show Grid
            </label>
          </div>

          {/* ... rest of your controls ... */}
        </div>

        <div className="digsig-canvas-container">
          <canvas
            ref={canvasRef}
            className={`digsig-canvas ${showGrid ? 'show-grid' : ''}`}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            onTouchStart={startDrawing}
            onTouchMove={draw}
            onTouchEnd={stopDrawing}
          />
        </div>

        <div className="digsig-actions">
          <button onClick={clearSignature} className="digsig-btn digsig-clear-btn">
            Clear
          </button>
          <div className="digsig-download-controls">
            <label className="digsig-checkbox-label">
              <input
                type="checkbox"
                checked={transparentBg}
                onChange={(e) => setTransparentBg(e.target.checked)}
                className="digsig-checkbox"
              />
              Transparent Background
            </label>
            <div className="digsig-download-group">
              <button onClick={() => handleDownload('png')} className="digsig-btn">
                Download PNG
              </button>
              <button onClick={() => handleDownload('jpeg')} className="digsig-btn">
                Download JPEG
              </button>
              <button onClick={() => handleDownload('svg')} className="digsig-btn">
                Download SVG
              </button>
            </div>
          </div>
        </div>

        <div className="digsig-content">
          <article className="digsig-features">
            <h2>Key Features</h2>
            <div className="digsig-features-grid">
              <div className="digsig-feature-card">
                <h3>Draw or Type</h3>
                <p>Choose between drawing your signature with mouse/touch or typing it with beautiful handwriting fonts.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Multiple Formats</h3>
                <p>Download your signature in PNG, JPEG, or SVG format for different use cases.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Customization</h3>
                <p>Adjust colors, size, and background. Add grid lines for better alignment.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Professional Fonts</h3>
                <p>Choose from a selection of handwriting-style fonts for typed signatures.</p>
              </div>
            </div>
          </article>

          <article className="digsig-use-cases">
            <h2>Common Use Cases</h2>
            <div className="digsig-features-grid">
              <div className="digsig-feature-card">
                <h3>Business Documents</h3>
                <ul>
                  <li>Contracts and Agreements</li>
                  <li>Business Proposals</li>
                  <li>NDAs and Legal Documents</li>
                  <li>Employee Forms</li>
                </ul>
              </div>
              <div className="digsig-feature-card">
                <h3>Personal Use</h3>
                <ul>
                  <li>Email Signatures</li>
                  <li>Personal Letters</li>
                  <li>Art and Creative Work</li>
                  <li>Digital Cards</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="digsig-faq">
            <h2>Frequently Asked Questions</h2>
            <div className="digsig-features-grid">
              <div className="digsig-feature-card">
                <h3>Is this digital signature legally binding?</h3>
                <p>While our tool creates visual signatures, the legal validity depends on your jurisdiction and the document&apos;s requirements. For legally binding electronic signatures, consider using certified e-signature services.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Can I save my signature for later use?</h3>
                <p>Yes, you can download your signature in multiple formats (PNG, JPEG, SVG) and save it for future use.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Is my signature data secure?</h3>
                <p>All signature creation happens locally in your browser. We don&apos;t store or transmit your signature data to any servers.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>What&apos;s the best format to download?</h3>
                <p>PNG is best for general use and transparency support. SVG is ideal for scaling without quality loss. JPEG is good for email signatures and small file sizes.</p>
              </div>
            </div>
          </article>

          <article className="digsig-tips">
            <h2>Best Practices for Digital Signatures</h2>
            <div className="digsig-features-grid">
              <div className="digsig-feature-card">
                <h3>Keep it Consistent</h3>
                <p>Try to maintain consistency in your signature style across different documents.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Size Matters</h3>
                <p>Create signatures at a larger size than needed - you can always scale down without losing quality.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Background Considerations</h3>
                <p>Use transparent backgrounds when possible for better document integration.</p>
              </div>
              <div className="digsig-feature-card">
                <h3>Regular Updates</h3>
                <p>Periodically update your digital signature to maintain security.</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 