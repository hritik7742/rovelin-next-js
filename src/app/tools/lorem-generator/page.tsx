"use client";

import { useState, useEffect } from 'react';
import './lorem-generator.css';

export default function LoremGenerator() {
  const [paragraphs, setParagraphs] = useState(1);
  const [words, setWords] = useState(50);
  const [includeHTML, setIncludeHTML] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [generatedText, setGeneratedText] = useState('');
  const [copied, setCopied] = useState(false);
  const [textType, setTextType] = useState('paragraphs'); // paragraphs or words

  useEffect(() => {
    // Add analytics tracking here if needed
    // logEvent('Tools', 'View', 'Lorem Ipsum Generator');
  }, []);

  const wordBank = [
    'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
    'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
    'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
    'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat',
    'duis', 'aute', 'irure', 'dolor', 'in', 'reprehenderit', 'voluptate', 'velit',
    'esse', 'cillum', 'dolore', 'eu', 'fugiat', 'nulla', 'pariatur', 'excepteur',
    'sint', 'occaecat', 'cupidatat', 'non', 'proident', 'sunt', 'culpa', 'qui',
    'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
  ];

  const generateText = () => {
    const result = [];
    const count = textType === 'paragraphs' ? paragraphs : 1;
    
    for (let i = 0; i < count; i++) {
      const paragraph = [];
      const wordCount = textType === 'paragraphs' ? 
        Math.floor(Math.random() * 50) + 50 : // 50-100 words per paragraph
        words;

      if (startWithLorem && i === 0) {
        paragraph.push('Lorem ipsum dolor sit amet,');
      }

      while (paragraph.length < wordCount) {
        const word = wordBank[Math.floor(Math.random() * wordBank.length)];
        paragraph.push(word);
      }

      result.push(paragraph.join(' '));
    }

    let finalText = result.join('\n\n');
    if (includeHTML) {
      finalText = result.map(p => `<p>${p}</p>`).join('\n');
    }

    setGeneratedText(finalText);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    // logEvent('Tools', 'Copy', 'Lorem Text');
  };

  return (
    <div className="lipsum-container">
      <div className="lipsum-workspace">
        <header className="lipsum-header">
          <h1>Lorem Ipsum Generator</h1>
          <p>Generate professional placeholder text for your designs and content</p>
        </header>

        <div className="lipsum-controls">
          <div className="lipsum-type-selector">
            <button 
              className={`lipsum-type-btn ${textType === 'paragraphs' ? 'active' : ''}`}
              onClick={() => setTextType('paragraphs')}
            >
              Paragraphs
            </button>
            <button 
              className={`lipsum-type-btn ${textType === 'words' ? 'active' : ''}`}
              onClick={() => setTextType('words')}
            >
              Words
            </button>
          </div>

          <div className="lipsum-options">
            {textType === 'paragraphs' ? (
              <div className="lipsum-input-group">
                <label>Number of Paragraphs:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="50" 
                  value={paragraphs} 
                  onChange={(e) => setParagraphs(Math.min(50, Math.max(1, parseInt(e.target.value) || 1)))}
                />
              </div>
            ) : (
              <div className="lipsum-input-group">
                <label>Number of Words:</label>
                <input 
                  type="number" 
                  min="1" 
                  max="1000" 
                  value={words} 
                  onChange={(e) => setWords(Math.min(1000, Math.max(1, parseInt(e.target.value) || 1)))}
                />
              </div>
            )}

            <div className="lipsum-checkbox-group">
              <label>
                <input 
                  type="checkbox" 
                  checked={includeHTML} 
                  onChange={(e) => setIncludeHTML(e.target.checked)}
                />
                Include HTML Tags
              </label>
              <label>
                <input 
                  type="checkbox" 
                  checked={startWithLorem} 
                  onChange={(e) => setStartWithLorem(e.target.checked)}
                />
                {"Start with 'Lorem ipsum'"}
              </label>
            </div>
          </div>

          <button className="lipsum-generate-btn" onClick={generateText}>
            Generate Text
          </button>
        </div>

        <div className="lipsum-output">
          <div className="lipsum-output-header">
            <h2>Generated Text</h2>
            <button 
              className={`lipsum-copy-btn ${copied ? 'copied' : ''}`}
              onClick={copyToClipboard}
            >
              {copied ? 'Copied!' : 'Copy Text'}
            </button>
          </div>
          <div className="lipsum-text-area">
            {generatedText || 'Click "Generate Text" to create Lorem Ipsum text'}
          </div>
        </div>

        {/* Info Section */}
        <div className="lipsum-info-section">
          <article className="lipsum-about">
            <h2>What is Lorem Ipsum?</h2>
            <p>
              Lorem Ipsum is dummy text used in laying out print, graphic or web designs. 
              It helps designers visualize the layout without getting distracted by meaningful content.
            </p>
          </article>

          <article className="lipsum-use-cases">
            <h2>Common Use Cases</h2>
            <div className="lipsum-use-grid">
              <div className="lipsum-use-card">
                <h3>Web Design</h3>
                <p>Create mockups and wireframes with realistic text distribution</p>
              </div>
              <div className="lipsum-use-card">
                <h3>Graphic Design</h3>
                <p>Test typography and layout in design compositions</p>
              </div>
              <div className="lipsum-use-card">
                <h3>Content Planning</h3>
                <p>Visualize content structure before final copy is ready</p>
              </div>
            </div>
          </article>

          <article className="lipsum-tips">
            <h2>Pro Tips for Using Lorem Ipsum</h2>
            <ul className="lipsum-tips-list">
              <li>Match text length to your final content</li>
              <li>Use HTML tags for web development</li>
              <li>Consider readability in your designs</li>
              <li>Test different paragraph lengths</li>
            </ul>
          </article>

          <article className="lipsum-history">
            <h2>History of Lorem Ipsum</h2>
            <p>{"Lorem Ipsum has been the industry's standard dummy text since the 1500s when an unknown printer scrambled text to create a specimen book."}</p>
          </article>

          <article className="lipsum-benefits">
            <h2>Benefits of Using Lorem Ipsum</h2>
            <ul className="lipsum-benefits-list">
              <li>Focus on design without content distractions</li>
              <li>Maintain neutral text weight and distribution</li>
              <li>Quick placeholder text generation</li>
              <li>Industry-standard practice</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
} 