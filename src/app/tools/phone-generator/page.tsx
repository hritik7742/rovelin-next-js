"use client";

import { useState } from 'react';
import './phone-generator.css';

// First, let's define an interface for the country format structure
interface CountryFormat {
  code: string;
  format: string;
  name: string;
}

// Define the type for the countryFormats object
interface CountryFormats {
  [key: string]: CountryFormat;
}

// Then define your countryFormats object with the proper type
const countryFormats: CountryFormats = {
  US: { code: '+1', format: 'XXX-XXX-XXXX', name: 'United States' },
  UK: { code: '+44', format: 'XXXX XXXXXX', name: 'United Kingdom' },
  IN: { code: '+91', format: 'XXXXX XXXXX', name: 'India' },
  AU: { code: '+61', format: 'XXX XXX XXX', name: 'Australia' },
  CA: { code: '+1', format: 'XXX-XXX-XXXX', name: 'Canada' },
  DE: { code: '+49', format: 'XXXX XXXXXXX', name: 'Germany' },
  FR: { code: '+33', format: 'X XX XX XX XX', name: 'France' },
  IT: { code: '+39', format: 'XXX XXX XXXX', name: 'Italy' },
  ES: { code: '+34', format: 'XXX XXX XXX', name: 'Spain' },
  JP: { code: '+81', format: 'XX XXXX XXXX', name: 'Japan' },
  BR: { code: '+55', format: 'XX XXXXX-XXXX', name: 'Brazil' },
  MX: { code: '+52', format: 'XXX XXX XXXX', name: 'Mexico' },
  RU: { code: '+7', format: 'XXX XXX-XX-XX', name: 'Russia' },
  CN: { code: '+86', format: 'XXX XXXX XXXX', name: 'China' },
  KR: { code: '+82', format: 'XX-XXXX-XXXX', name: 'South Korea' },
  SG: { code: '+65', format: 'XXXX XXXX', name: 'Singapore' },
  AE: { code: '+971', format: 'XX XXX XXXX', name: 'UAE' },
  SA: { code: '+966', format: 'XX XXX XXXX', name: 'Saudi Arabia' },
  ZA: { code: '+27', format: 'XX XXX XXXX', name: 'South Africa' },
  NZ: { code: '+64', format: 'XX XXX XXXX', name: 'New Zealand' }
};

export default function PhoneGenerator() {
  const [selectedCountry, setSelectedCountry] = useState('random');
  const [quantity, setQuantity] = useState(1);
  const [generatedNumbers, setGeneratedNumbers] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);

  const generateRandomNumber = (format: string) => {
    return format.replace(/X/g, () => Math.floor(Math.random() * 10).toString());
  };

  const generateNumbers = () => {
    const numbers: string[] = [];
    
    try {
      for (let i = 0; i < quantity; i++) {
        if (selectedCountry === 'random') {
          const countries = Object.keys(countryFormats);
          const randomCountry = countries[Math.floor(Math.random() * countries.length)];
          const { code, format, name } = countryFormats[randomCountry];
          numbers.push(`${code} ${generateRandomNumber(format)} (${name})`);
        } else {
          const { code, format } = countryFormats[selectedCountry];
          numbers.push(`${code} ${generateRandomNumber(format)}`);
        }
      }
      setGeneratedNumbers(numbers);
    } catch (error) {
      console.error('Error generating phone numbers:', error);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedNumbers.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>Random Phone Number Generator</h1>
          <p>Generate realistic phone numbers for different countries. Perfect for testing and development purposes.</p>
        </div>

        <div className="generator-main">
          <div className="controls-section">
            <div className="control-group">
              <label>Select Country</label>
              <select 
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
              >
                <option value="random">Random Country</option>
                {Object.entries(countryFormats).map(([code, { name }]) => (
                  <option key={code} value={code}>{name}</option>
                ))}
              </select>
            </div>

            <div className="control-group">
              <label>Number of Phone Numbers</label>
              <input
                type="number"
                min="1"
                max="100"
                value={quantity}
                onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
              />
            </div>

            <button onClick={generateNumbers} className="generate-button">
              Generate Numbers
            </button>
          </div>

          {generatedNumbers.length > 0 && (
            <div className="results-section">
              <div className="results-header">
                <h3>Generated Numbers</h3>
                <button 
                  onClick={copyToClipboard}
                  className="copy-button"
                >
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>
              <div className="numbers-list">
                {generatedNumbers.map((number, index) => (
                  <div key={index} className="number-item">{number}</div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>Common Phone Number Formats</h2>
            <div className="formats-grid">
              <div className="format-item">
                <h3>United States (+1)</h3>
                <p>Format: XXX-XXX-XXXX</p>
                <p>Example: +1 555-123-4567</p>
              </div>
              <div className="format-item">
                <h3>United Kingdom (+44)</h3>
                <p>Format: XXXX XXXXXX</p>
                <p>Example: +44 7911 123456</p>
              </div>
              <div className="format-item">
                <h3>India (+91)</h3>
                <p>Format: XXXXX XXXXX</p>
                <p>Example: +91 98765 43210</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Use Cases</h2>
            <ul className="use-cases-list">
              <li>Software Testing and QA</li>
              <li>Database Population</li>
              <li>UI/UX Prototyping</li>
              <li>Form Testing</li>
              <li>API Testing</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Features</h2>
            <ul className="features-list">
              <li>Support for 20+ countries</li>
              <li>Bulk generation (up to 100 numbers)</li>
              <li>Country-specific formats</li>
              <li>Random country option</li>
              <li>One-click copy</li>
              <li>No registration required</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Phone Number Formats by Region</h2>
            <div className="region-grid">
              <div className="region-item">
                <h3>North America</h3>
                <p>North American phone numbers follow the format: +1 XXX-XXX-XXXX, where the first three digits represent the area code.</p>
              </div>
              <div className="region-item">
                <h3>European Union</h3>
                <p>European phone numbers vary by country but typically include a country code followed by a city/region code and local number.</p>
              </div>
              <div className="region-item">
                <h3>Asia Pacific</h3>
                <p>Asian phone numbers often have varying lengths and formats, with country codes ranging from +60 to +95 for Southeast Asia.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Phone Number Testing Guide</h2>
            <div className="guide-content">
              <h3>Best Practices for Phone Number Testing</h3>
              <ul className="guide-list">
                <li>Test with different country codes</li>
                <li>Include various number lengths</li>
                <li>Consider local formatting rules</li>
                <li>Test with and without country codes</li>
                <li>Verify international dialing compatibility</li>
              </ul>
            </div>
          </article>

          <article className="info-box">
            <h2>Technical Specifications</h2>
            <div className="specs-content">
              <p>Our phone number generator follows the E.164 international telephone numbering plan, ensuring compatibility with:</p>
              <ul className="specs-list">
                <li>International dialing standards</li>
                <li>SMS and messaging systems</li>
                <li>VoIP applications</li>
                <li>Mobile networks worldwide</li>
              </ul>
            </div>
          </article>
        </div>

      </div>
    </div>
  );
} 