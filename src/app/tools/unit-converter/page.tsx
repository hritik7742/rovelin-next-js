"use client";

import { useState, useEffect } from 'react';
import { CONVERSION_TYPES, formatValue } from './conversion-types';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './unit-converter.css';

type ConversionType = keyof typeof CONVERSION_TYPES;
type RecentConversion = {
  type: ConversionType;
  from: string;
  to: string;
  timestamp: number;
};

export default function UnitConverter() {
  const [selectedType, setSelectedType] = useState<ConversionType>('length');
  const [fromUnit, setFromUnit] = useState('');
  const [toUnit, setToUnit] = useState('');
  const [fromValue, setFromValue] = useState('');
  const [toValue, setToValue] = useState('');
  const [recentConversions, setRecentConversions] = useState<RecentConversion[]>([]);

  useEffect(() => {
    const units = Object.keys(CONVERSION_TYPES[selectedType].units);
    setFromUnit(units[0]);
    setToUnit(units[1]);
  }, [selectedType]);

  const convertTemperature = (value: number, from: string, to: string): number => {
    let celsius;
    switch (from) {
      case 'fahrenheit':
        celsius = (value - 32) * 5 / 9;
        break;
      case 'kelvin':
        celsius = value - 273.15;
        break;
      default:
        celsius = value;
    }

    switch (to) {
      case 'fahrenheit':
        return (celsius * 9 / 5) + 32;
      case 'kelvin':
        return celsius + 273.15;
      default:
        return celsius;
    }
  };

  const handleConvert = () => {
    if (!fromValue || !fromUnit || !toUnit) return;

    let result;
    if (selectedType === 'temperature') {
      result = convertTemperature(parseFloat(fromValue), fromUnit, toUnit);
    } else {
      const fromFactor = Number(CONVERSION_TYPES[selectedType].units[fromUnit]);
      const toFactor = Number(CONVERSION_TYPES[selectedType].units[toUnit]);
      result = (parseFloat(fromValue) * fromFactor) / toFactor;
    }

    setToValue(formatValue(result));

    const conversion: RecentConversion = {
      type: selectedType,
      from: `${fromValue} ${fromUnit}`,
      to: `${formatValue(result)} ${toUnit}`,
      timestamp: Date.now()
    };
    setRecentConversions(prev => [conversion, ...prev].slice(0, 5));
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>Unit Converter</h1>
          <p>Convert between different units of measurement with precision and ease.</p>
        </div>

        {/* Header Ad */}
        <AdUnit 
          adSlot="8285940620" 
          adFormat="auto"
          className="header-ad"
        />

        <div className="conversion-panel">
          <div className="type-selector">
            {Object.entries(CONVERSION_TYPES).map(([type, { name, icon }]) => (
              <button
                key={type}
                className={`type-button ${selectedType === type ? 'active' : ''}`}
                onClick={() => setSelectedType(type as ConversionType)}
              >
                <span className="type-icon">{icon}</span>
                <span className="type-name">{name}</span>
              </button>
            ))}
          </div>

          <div className="conversion-form">
            <div className="input-group">
              <input
                type="number"
                value={fromValue}
                onChange={(e) => {
                  setFromValue(e.target.value);
                  if (e.target.value) handleConvert();
                }}
                placeholder="Enter value"
                className="value-input"
              />
              <select
                value={fromUnit}
                onChange={(e) => {
                  setFromUnit(e.target.value);
                  if (fromValue) handleConvert();
                }}
                className="unit-select"
              >
                {Object.keys(CONVERSION_TYPES[selectedType].units).map(unit => (
                  <option key={unit} value={unit}>
                    {unit.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </option>
                ))}
              </select>
            </div>

            <button
              className="swap-button"
              onClick={() => {
                setFromUnit(toUnit);
                setToUnit(fromUnit);
                setFromValue(toValue);
                setToValue(fromValue);
              }}
            >
              ⇄
            </button>

            <div className="input-group">
              <input
                type="text"
                value={toValue}
                readOnly
                placeholder="Result"
                className="value-input"
              />
              <select
                value={toUnit}
                onChange={(e) => {
                  setToUnit(e.target.value);
                  if (fromValue) handleConvert();
                }}
                className="unit-select"
              >
                {Object.keys(CONVERSION_TYPES[selectedType].units).map(unit => (
                  <option key={unit} value={unit}>
                    {unit.replace(/([A-Z])/g, ' $1').toLowerCase()}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {recentConversions.length > 0 && (
            <div className="recent-conversions">
              <h3>Recent Conversions</h3>
              <div className="conversions-list">
                {recentConversions.map((conv, index) => (
                  <div key={index} className="conversion-item">
                    <span className="conversion-type">
                      {CONVERSION_TYPES[conv.type].icon}
                    </span>
                    <span className="conversion-values">
                      {conv.from} = {conv.to}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Middle Ad */}
        <AdUnit 
          adSlot="8285940620" 
          adFormat="auto"
          className="content-ad"
        />

        <div className="info-sections">
          <article className="info-box">
            <h2>Common Conversions</h2>
            <div className="conversions-grid">
              <div className="conversion-category">
                <h3>Length & Distance</h3>
                <ul>
                  <li>1 mile = 1.609344 kilometers</li>
                  <li>1 foot = 30.48 centimeters</li>
                  <li>1 inch = 2.54 centimeters</li>
                  <li>1 yard = 0.9144 meters</li>
                  <li>1 nautical mile = 1.852 kilometers</li>
                </ul>
              </div>
              <div className="conversion-category">
                <h3>Weight & Mass</h3>
                <ul>
                  <li>1 pound = 0.453592 kilograms</li>
                  <li>1 ounce = 28.3495 grams</li>
                  <li>1 stone = 6.35029 kilograms</li>
                  <li>1 metric ton = 1000 kilograms</li>
                  <li>1 gram = 1000 milligrams</li>
                </ul>
              </div>
              <div className="conversion-category">
                <h3>Volume & Capacity</h3>
                <ul>
                  <li>1 gallon = 3.78541 liters</li>
                  <li>1 cup = 236.588 milliliters</li>
                  <li>1 pint = 473.176 milliliters</li>
                  <li>1 quart = 946.353 milliliters</li>
                  <li>1 cubic meter = 1000 liters</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Understanding Unit Conversion</h2>
            <div className="systems-grid">
              <div className="system">
                <h3>Metric System (SI)</h3>
                <p>The International System of Units (SI) is the modern form of the metric system. It&apos;s used worldwide in science, industry, and everyday life.</p>
                <ul>
                  <li>Based on powers of 10</li>
                  <li>Standard prefixes (kilo-, milli-, etc.)</li>
                  <li>Used by most countries globally</li>
                  <li>Precise scientific measurements</li>
                </ul>
              </div>
              <div className="system">
                <h3>Imperial/US System</h3>
                <p>The traditional system used primarily in the United States and a few other countries. Important for international trade and communication.</p>
                <ul>
                  <li>Historical measurements</li>
                  <li>Common in US construction</li>
                  <li>Used in aviation</li>
                  <li>Everyday measurements in US</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Professional Applications</h2>
            <div className="use-cases-grid">
              <div className="use-case">
                <h3>🔬 Scientific Research</h3>
                <p>Precise unit conversions are crucial in laboratories, research facilities, and academic institutions for accurate measurements and reproducible results.</p>
              </div>
              <div className="use-case">
                <h3>🏗️ Engineering & Construction</h3>
                <p>Converting between metric and imperial units is essential for international projects, architectural plans, and structural calculations.</p>
              </div>
              <div className="use-case">
                <h3>🏥 Healthcare & Medicine</h3>
                <p>Medical professionals rely on accurate unit conversions for medication dosages, patient measurements, and medical equipment calibration.</p>
              </div>
              <div className="use-case">
                <h3>🌍 International Trade</h3>
                <p>Businesses need reliable unit conversion for shipping, product specifications, and compliance with international standards.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Best Practices for Accurate Conversion</h2>
            <ul className="tips-list">
              <li>Always double-check your conversions, especially for critical measurements</li>
              <li>Use reliable conversion factors from authoritative sources</li>
              <li>Consider significant figures in scientific calculations</li>
              <li>Document the original units and conversion process</li>
              <li>Be aware of temperature conversion formulas (they&apos;re different from other units)</li>
              <li>Verify industry-specific standards and requirements</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Digital Conversion Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit">
                <h3>Accuracy & Precision</h3>
                <p>Digital converters eliminate human error and provide consistent, accurate results across all unit types.</p>
              </div>
              <div className="benefit">
                <h3>Time Efficiency</h3>
                <p>Instantly convert between multiple units without manual calculations or reference tables.</p>
              </div>
              <div className="benefit">
                <h3>Universal Access</h3>
                <p>Access reliable conversion tools anywhere, ensuring consistency across teams and projects.</p>
              </div>
              <div className="benefit">
                <h3>Educational Value</h3>
                <p>Learn and understand relationships between different measurement systems and units.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Common Conversion Challenges</h2>
            <div className="challenges-grid">
              <div className="challenge">
                <h3>Temperature Scales</h3>
                <p>Converting between Celsius, Fahrenheit, and Kelvin requires specific formulas unlike direct multiplication.</p>
              </div>
              <div className="challenge">
                <h3>Precision Requirements</h3>
                <p>Different industries require different levels of precision in measurements and conversions.</p>
              </div>
              <div className="challenge">
                <h3>Regional Variations</h3>
                <p>Some units may have slight variations in different regions or industries.</p>
              </div>
            </div>
          </article>
        </div>

        {/* Footer Ad */}
        <AdUnit 
          adSlot="8285940620" 
          adFormat="auto"
          className="footer-ad"
        />

        <RelatedTools
          currentTool="/tools/unit-converter"
          category="Text Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
} 