"use client";

import { useState, useEffect } from 'react';
import './name-generator.css';
import { nameDatabase, invalidCombinations, nameRules, nameFormatting } from './data/nameData';

export default function NameGenerator() {
  const [names, setNames] = useState<string[]>([]);
  const [count, setCount] = useState(10);
  const [nameType, setNameType] = useState('real');
  const [region, setRegion] = useState('us');
  const [gender, setGender] = useState('any');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const nameTypes = {
    real: 'Real Names',
    fantasy: 'Fantasy Names',
    popCulture: 'Pop Culture',
    ancient: 'Ancient Names',
    futuristic: 'Futuristic',
    mythological: 'Mythological'
  };

  const regions = {
    us: 'American',
    uk: 'British',
    in: 'Indian',
    cn: 'Chinese',
    jp: 'Japanese',
    kr: 'Korean',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    es: 'Spanish',
    ru: 'Russian',
    ar: 'Arabic'
  };

  const generateNames = () => {
    setLoading(true);
    
    try {
      const selectedRegion = nameDatabase[region] || nameDatabase.us;
      const formatting = nameFormatting[region] || nameFormatting.us;
      const rules = nameRules[region] || nameRules.us;
      
      const generatedNames = Array(count).fill(null).map(() => {
        let firstName, lastName, fullName;
        let isValid = false;
        
        while (!isValid) {
          if (gender === 'male') {
            firstName = selectedRegion.male[Math.floor(Math.random() * selectedRegion.male.length)];
          } else if (gender === 'female') {
            firstName = selectedRegion.female[Math.floor(Math.random() * selectedRegion.female.length)];
          } else {
            const names = [...selectedRegion.male, ...selectedRegion.female];
            firstName = names[Math.floor(Math.random() * names.length)];
          }
          
          lastName = selectedRegion.last[Math.floor(Math.random() * selectedRegion.last.length)];
          
          if (!invalidCombinations.some(invalid => 
            invalid.firstName === firstName && invalid.lastName === lastName
          )) {
            isValid = true;
          }
        }
        
        fullName = formatting.format === 'lastName firstName' 
          ? `${lastName}${formatting.separator}${firstName}`
          : `${firstName}${formatting.separator}${lastName}`;
        
        return fullName;
      });
      
      setNames(generatedNames);
    } catch (error) {
      console.error('Error generating names:', error);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(names.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    logEvent('Tools', 'Copy', 'Random Name Generator');
  };

  return (
    <div className="rng-container">
      <div className="rng-workspace">
        <div className="rng-header">
          <h1>Random Name Generator</h1>
          <p>Generate unique names from different cultures and genres</p>
        </div>

        <div className="rng-main">
          <div className="rng-controls">
            <div className="rng-control-group">
              <label>Name Type:</label>
              <select 
                value={nameType}
                onChange={(e) => setNameType(e.target.value)}
                className="rng-select"
              >
                {Object.entries(nameTypes).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="rng-control-group">
              <label>Region/Culture:</label>
              <select 
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="rng-select"
              >
                {Object.entries(regions).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </div>

            <div className="rng-control-group">
              <label>Gender:</label>
              <select 
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="rng-select"
              >
                <option value="any">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="rng-control-group">
              <label>Number of Names:</label>
              <input
                type="number"
                min="1"
                max="100"
                value={count}
                onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
                className="rng-number-input"
              />
            </div>

            <button 
              onClick={generateNames}
              className="rng-generate-button"
              disabled={loading}
            >
              {loading ? 'Generating...' : 'Generate Names'}
            </button>
          </div>

          {names.length > 0 && (
            <div className="rng-results">
              <div className="rng-results-header">
                <h2>Generated Names</h2>
                <button 
                  onClick={copyToClipboard}
                  className="rng-copy-button"
                >
                  {copied ? 'Copied!' : 'Copy All'}
                </button>
              </div>
              <div className="rng-names-list">
                {names.map((name, index) => (
                  <div key={index} className="rng-name-item">
                    {name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="rng-info">
          <article className="rng-features">
            <h2>Features</h2>
            <div className="rng-features-grid">
              <div className="rng-feature-card">
                <h3>🌍 Multiple Cultures</h3>
                <p>Generate names from various cultures and regions worldwide</p>
              </div>
              <div className="rng-feature-card">
                <h3>🎭 Different Genres</h3>
                <p>Create names for fantasy, sci-fi, historical, or modern settings</p>
              </div>
              <div className="rng-feature-card">
                <h3>⚡ Quick Generation</h3>
                <p>Generate multiple unique names instantly</p>
              </div>
              <div className="rng-feature-card">
                <h3>📋 Easy Export</h3>
                <p>Copy all generated names with one click</p>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
} 