"use client";

import { useState, useEffect, useCallback } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './color-picker.css';

interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export default function ColorPicker() {
  const [color, setColor] = useState('#7C3AED');
  const [format, setFormat] = useState('hex');
  const [palette, setPalette] = useState<HSLColor[]>([]);
  const [savedColors, setSavedColors] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generatePalette = useCallback((baseColor: string) => {
    const rgb = hexToRgb(baseColor);
    if (!rgb) return;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
    const newPalette: HSLColor[] = [];

    // Generate shades and tints
    for (let i = 0; i < 5; i++) {
      const lightness = Math.max(0, Math.min(100, hsl.l - 20 + (i * 10)));
      newPalette.push({
        h: hsl.h,
        s: hsl.s,
        l: lightness
      });
    }

    setPalette(newPalette);
  }, []);

  useEffect(() => {
    // Add analytics tracking here if needed
    // logEvent('Tools', 'View', 'Color Picker');
    generatePalette(color);
  }, [color, generatePalette]);

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };

  const rgbToHsl = (r: number, g: number, b: number): HSLColor => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }

    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    };
  };

  const hslToHex = (h: number, s: number, l: number): string => {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = (n: number): string => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`;
  };

  const getFormattedColor = () => {
    const rgb = hexToRgb(color);
    if (!rgb) return color;
    
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);

    switch (format) {
      case 'rgb':
        return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
      case 'hsl':
        return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
      default:
        return color.toUpperCase();
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
    // logEvent('Tools', 'Copy Color', 'Color Picker');
  };

  const saveColor = () => {
    if (savedColors.length < 10 && !savedColors.includes(color)) {
      setSavedColors([...savedColors, color]);
      // logEvent('Tools', 'Save Color', 'Color Picker');
    }
  };

  return (
    <div className="tool-page">
      <div className="tool-header">
        <h1>Color Picker</h1>
        <p className="tool-description">
          Pick colors, generate palettes, and convert between different color formats.
        </p>
      </div>

      <div className="tool-container color-picker">
        <div className="picker-section">
          <div className="color-input">
            <input
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="color-wheel"
            />
            <div className="color-formats">
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="format-select"
              >
                <option value="hex">HEX</option>
                <option value="rgb">RGB</option>
                <option value="hsl">HSL</option>
              </select>
              <div className="color-value" onClick={() => copyToClipboard(getFormattedColor())}>
                <span>{getFormattedColor()}</span>
                {copied && <span className="copied-tooltip">Copied!</span>}
              </div>
              <button onClick={saveColor} className="save-btn">Save Color</button>
            </div>
          </div>

          <div className="color-palette">
            <h2>Color Palette</h2>
            <div className="palette-grid">
              {palette.map((color, index) => (
                <div
                  key={index}
                  className="palette-color"
                  style={{ backgroundColor: hslToHex(color.h, color.s, color.l) }}
                  onClick={() => copyToClipboard(hslToHex(color.h, color.s, color.l))}
                >
                  <span className="color-tooltip">{hslToHex(color.h, color.s, color.l)}</span>
                </div>
              ))}
            </div>
          </div>

          {savedColors.length > 0 && (
            <div className="saved-colors">
              <h2>Saved Colors</h2>
              <div className="saved-grid">
                {savedColors.map((savedColor, index) => (
                  <div
                    key={index}
                    className="saved-color"
                    style={{ backgroundColor: savedColor }}
                    onClick={() => copyToClipboard(savedColor)}
                  >
                    <span className="color-tooltip">{savedColor}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="tool-articles">
        <article className="tool-article">
          <h2>Color Formats</h2>
          <ul>
            <li><strong>HEX:</strong> Web standard hexadecimal color code</li>
            <li><strong>RGB:</strong> Red, Green, Blue values (0-255)</li>
            <li><strong>HSL:</strong> Hue, Saturation, Lightness values</li>
          </ul>
        </article>

        <article className="tool-article">
          <h2>Features</h2>
          <ul>
            <li>Visual color picker</li>
            <li>Format conversion</li>
            <li>Palette generation</li>
            <li>Color saving</li>
            <li>One-click copying</li>
          </ul>
        </article>
      </div>

      <div className="color-tips">
        <h2>Color Design Tips & Best Practices</h2>
        <div className="tips-grid">
          <div className="tip-card">
            <h3>Color Psychology</h3>
            <p>
              Colors evoke emotions and feelings. Blue suggests trust and stability,
              red indicates energy and urgency, while green represents growth and harmony.
            </p>
          </div>
          <div className="tip-card">
            <h3>Accessibility</h3>
            <p>
              Ensure sufficient color contrast for text readability. WCAG guidelines
              recommend a minimum contrast ratio of 4.5:1 for normal text.
            </p>
          </div>
          <div className="tip-card">
            <h3>Color Harmony</h3>
            <p>
              Use complementary colors for contrast, analogous colors for harmony,
              and triadic colors for vibrant designs that catch attention.
            </p>
          </div>
          <div className="tip-card">
            <h3>Brand Colors</h3>
            <p>
              Maintain consistency in your brand colors across all platforms.
              Document your color palette and share it with your team.
            </p>
          </div>
          <div className="tip-card">
            <h3>Color Trends</h3>
            <p>
              {"Stay updated with color trends but don't sacrifice brand identity. Consider using trending colors in seasonal campaigns."}
            </p>
          </div>
          <div className="tip-card">
            <h3>Dark Mode</h3>
            <p>
              When designing for dark mode, avoid pure black backgrounds and
              ensure your colors work well in both light and dark themes.
            </p>
          </div>
        </div>

        <RelatedTools 
          currentTool="/tools/color-picker" 
          category="Image Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 