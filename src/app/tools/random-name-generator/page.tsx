"use client";

import { useState } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './random-name-generator.css';
import { generateName } from './nameUtils';
import { blogContent } from './blog-content';
import { Globe, ChevronDown } from 'lucide-react';

type NameStyle = 'modern' | 'fantasy' | 'sci-fi' | 'ancient' | 'cute' | 'indian' | 'chinese' | 'japanese' | 'spanish' | 'french';
type NameGender = 'male' | 'female' | 'neutral';

export default function RandomNameGenerator() {
  const [names, setNames] = useState<string[]>([]);
  const [quantity, setQuantity] = useState(10);
  const [style, setStyle] = useState<NameStyle>('modern');
  const [gender, setGender] = useState<NameGender>('neutral');
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const newNames = Array.from({ length: quantity }, () => 
      generateName(style, gender)
    );
    setNames(newNames);
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(names.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rng-container">

      <div className="rng-workspace">
        <header className="rng-header">
          <h1>Random Name Generator</h1>
          <p>Generate unique names for characters, projects, or creative works</p>
        </header>

        <div className="rng-controls">
          <div className="rng-control-group">
            <label htmlFor="style">Name Style</label>
            <div className="rng-select-wrapper">
              <select 
                id="style"
                value={style}
                onChange={(e) => setStyle(e.target.value as NameStyle)}
                className="rng-select"
              >
                <optgroup label="General Styles">
                  <option value="modern">🌍 Modern</option>
                  <option value="fantasy">🏰 Fantasy</option>
                  <option value="sci-fi">🚀 Sci-Fi</option>
                  <option value="ancient">⚔️ Ancient</option>
                  <option value="cute">🌸 Cute</option>
                </optgroup>
                <optgroup label="Asian Names">
                  <option value="chinese">🇨🇳 Chinese</option>
                  <option value="japanese">🇯�� Japanese</option>
                  <option value="korean">🇰🇷 Korean</option>
                  <option value="vietnamese">🇻🇳 Vietnamese</option>
                </optgroup>
                <optgroup label="European Names">
                  <option value="french">��🇷 French</option>
                  <option value="german">🇩🇪 German</option>
                  <option value="greek">🇬🇷 Greek</option>
                  <option value="italian">🇮🇹 Italian</option>
                  <option value="russian">🇷🇺 Russian</option>
                  <option value="swedish">🇸🇪 Swedish</option>
                </optgroup>
                <optgroup label="Other Regions">
                  <option value="arabic">🌙 Arabic</option>
                  <option value="brazilian">🇧🇷 Brazilian</option>
                  <option value="indian">🇮🇳 Indian</option>
                  <option value="spanish">🇪🇸 Spanish</option>
                </optgroup>
              </select>
              <ChevronDown className="rng-select-icon" />
            </div>
          </div>

          <div className="rng-control-group">
            <label htmlFor="gender">Gender</label>
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value as NameGender)}
              className="rng-select"
            >
              <option value="neutral">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>

          <div className="rng-control-group">
            <label htmlFor="quantity">Number of Names</label>
            <input
              type="number"
              id="quantity"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rng-number-input"
            />
          </div>

          <button 
            onClick={handleGenerate}
            className="rng-generate-button"
          >
            <Globe className="rng-button-icon" />
            Generate Names
          </button>
        </div>

        {/* Middle Ad */}

        {names.length > 0 && (
          <div className="rng-results">
            <div className="rng-results-header">
              <h2>Generated Names</h2>
              <button
                onClick={handleCopy}
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

        <div className="rng-info">
          <article className="rng-features">
            <h2>Features</h2>
            <div className="rng-features-grid">
              <div className="rng-feature-card">
                <h3>🎲 Multiple Styles</h3>
                <p>Choose from modern, fantasy, sci-fi, ancient, and cute name styles</p>
              </div>
              <div className="rng-feature-card">
                <h3>⚡ Quick Generation</h3>
                <p>Generate up to 100 unique names instantly</p>
              </div>
              <div className="rng-feature-card">
                <h3>🔄 Flexible Options</h3>
                <p>Customize gender and quantity preferences</p>
              </div>
              <div className="rng-feature-card">
                <h3>📋 Easy Export</h3>
                <p>Copy all generated names with one click</p>
              </div>
            </div>
          </article>
        </div>

        <div className="rng-blog-content">
          {blogContent.sections.map((section, index) => (
            <article key={index} className="rng-blog-section">
              <h2>{section.title}</h2>
              <div className="rng-blog-text">
                {section.content}
              </div>
            </article>
          ))}

          <section className="rng-faqs">
            <h2>Frequently Asked Questions</h2>
            {blogContent.faqs.map((faq, index) => (
              <div key={index} className="rng-faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </section>
        </div>

        <RelatedTools 
          currentTool="/tools/random-name-generator" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 