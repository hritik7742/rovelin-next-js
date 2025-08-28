"use client";

import { useState } from 'react';
import RelatedTools from '../shared/RelatedTools';
import AdUnit from '@/components/AdUnit';
import './credit-card-generator.css';
import { cardTypes } from './card-data';
import { ChipSVG, VisaLogo, MastercardLogo, AmexLogo } from './card-logos';

interface CardInfo {
  type: string;
  number: string;
  expiry: string;
  cvv: string;
  holderName: string;
}

export default function CreditCardGenerator() {
  const [selectedType, setSelectedType] = useState('visa');
  const [quantity, setQuantity] = useState(1);
  const [generatedCards, setGeneratedCards] = useState<CardInfo[]>([]);
  const [copied, setCopied] = useState(false);
  const [previewCard, setPreviewCard] = useState<CardInfo | null>(null);

  const generateLuhnNumber = (partial: string) => {
    let sum = 0;
    for (let i = 0; i < partial.length; i++) {
      let digit = parseInt(partial[i]);
      if ((partial.length - i) % 2 === 0) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
    }
    return (sum * 9) % 10;
  };

  const generateCardNumber = (type: string) => {
    const card = cardTypes[type as keyof typeof cardTypes];
    const prefix = card.prefix[Math.floor(Math.random() * card.prefix.length)];
    let number = prefix;
    
    while (number.length < card.length - 1) {
      number += Math.floor(Math.random() * 10);
    }
    
    number += generateLuhnNumber(number);
    return number.match(/.{1,4}/g)?.join(' ') || '';
  };

  const generateExpiryDate = () => {
    const currentYear = new Date().getFullYear();
    const year = currentYear + Math.floor(Math.random() * 5);
    const month = Math.floor(Math.random() * 12) + 1;
    return `${month.toString().padStart(2, '0')}/${year.toString().slice(-2)}`;
  };

  const generateCVV = (type: string) => {
    const card = cardTypes[type as keyof typeof cardTypes];
    const length = card.cvvLength;
    let cvv = '';
    for (let i = 0; i < length; i++) {
      cvv += Math.floor(Math.random() * 10);
    }
    return cvv;
  };

  const generateRandomName = () => {
    const firstNames = ['John', 'Emma', 'Michael', 'Sophia', 'William', 'Olivia'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  const generateCards = () => {
    const cards = [];
    for (let i = 0; i < quantity; i++) {
      const card = {
        type: selectedType,
        number: generateCardNumber(selectedType),
        expiry: generateExpiryDate(),
        cvv: generateCVV(selectedType),
        holderName: generateRandomName().toUpperCase()
      };
      cards.push(card);
    }
    setGeneratedCards(cards);
    setPreviewCard(cards[0]);
  };

  const copyToClipboard = () => {
    const text = generatedCards.map(card => 
      `Card Type: ${cardTypes[card.type as keyof typeof cardTypes].name}\nCard Number: ${card.number}\nExpiry: ${card.expiry}\nCVV: ${card.cvv}\nHolder: ${card.holderName}\n`
    ).join('\n');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getCardLogo = (type: string) => {
    switch(type) {
      case 'visa': return <VisaLogo />;
      case 'mastercard': return <MastercardLogo />;
      case 'amex': return <AmexLogo />;
      default: return null;
    }
  };

  return (
    <div className="generator-container">
      {/* Header Ad */}
      <AdUnit 
        className="header-ad"
        adSlot="8285940620" 
        adFormat="auto"
      />
      
      <div className="generator-workspace">
        <div className="tool-header">
          <h1>Credit Card Generator</h1>
          <p>Generate valid test credit card numbers for development and testing purposes.</p>
        </div>

        <div className="controls-section">
          <div className="control-group">
            <label>Card Type</label>
            <select 
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
            >
              {Object.entries(cardTypes).map(([key, { name }]) => (
                <option key={key} value={key}>{name}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label>Number of Cards</label>
            <input
              type="number"
              min="1"
              max="100"
              value={quantity}
              onChange={(e) => setQuantity(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            />
          </div>

          <button onClick={generateCards} className="generate-button">
            Generate Cards
          </button>
        </div>

        {previewCard && (
          <div className="cards-preview">
            {generatedCards.map((card, index) => (
              <div key={index} className={`credit-card ${card.type}`}>
                <div className="card-front">
                  <div className="card-chip">
                    <ChipSVG />
                  </div>
                  <div className="card-number">{card.number}</div>
                  <div className="card-details">
                    <div className="card-holder">
                      <span>Card Holder</span>
                      <div>{card.holderName}</div>
                    </div>
                    <div className="card-expires">
                      <span>Expires</span>
                      <div>{card.expiry}</div>
                    </div>
                    <div className="card-logo">
                      {getCardLogo(card.type)}
                    </div>
                  </div>
                </div>
                <div className="card-back">
                  <div className="magnetic-strip"></div>
                  <div className="cvv-container">
                    <div className="cvv-label">CVV</div>
                    <div className="cvv-number">{card.cvv}</div>
                  </div>
                  <div className="card-logo-back">
                    {getCardLogo(card.type)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {generatedCards.length > 0 && (
          <div className="results-section">
            <div className="results-header">
              <h3>Generated Cards</h3>
              <button 
                onClick={copyToClipboard}
                className="copy-button"
              >
                {copied ? 'Copied!' : 'Copy All'}
              </button>
            </div>
            <div className="cards-list">
              {generatedCards.map((card, index) => (
                <div key={index} className="card-item">
                  <div className="card-info">
                    <span className="card-label">Type:</span>
                    <span>{cardTypes[card.type as keyof typeof cardTypes].name}</span>
                  </div>
                  <div className="card-info">
                    <span className="card-label">Number:</span>
                    <span>{card.number}</span>
                  </div>
                  <div className="card-info">
                    <span className="card-label">Expiry:</span>
                    <span>{card.expiry}</span>
                  </div>
                  <div className="card-info">
                    <span className="card-label">CVV:</span>
                    <span>{card.cvv}</span>
                  </div>
                  <div className="card-info">
                    <span className="card-label">Holder:</span>
                    <span>{card.holderName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SEO Content */}
        <div className="info-sections">
          <article className="info-box">
            <h2>About Credit Card Numbers</h2>
            <p>
              Credit card numbers follow specific patterns and validation rules, including
              the Luhn algorithm. Our generator creates valid test numbers that follow
              these patterns but cannot be used for real transactions.
            </p>
          </article>

          <article className="info-box">
            <h2>Card Number Formats</h2>
            <div className="formats-grid">
              {Object.entries(cardTypes).map(([key, card]) => (
                <div key={key} className="format-item">
                  <h3>{card.name}</h3>
                  <ul>
                    <li>Starts with: {card.prefix.join(', ')}</li>
                    <li>Length: {card.length} digits</li>
                    <li>CVV: {card.cvvLength} digits</li>
                  </ul>
                </div>
              ))}
            </div>
          </article>

          <article className="info-box">
            <h2>Testing Guidelines</h2>
            <ul className="guidelines-list">
              <li>Always use test card numbers in development</li>
              <li>Test with different card types</li>
              <li>Verify Luhn algorithm validation</li>
              <li>Test expiry date validation</li>
              <li>Check CVV validation</li>
            </ul>
          </article>
        </div>

        {/* Middle Ad */}
        <AdUnit 
          className="content-ad"
          adSlot="8285940620" 
          adFormat="auto"
        />

        <RelatedTools 
          currentTool="/tools/credit-card-generator" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
        
        {/* Footer Ad */}
        <AdUnit 
          className="footer-ad"
          adSlot="8285940620" 
          adFormat="auto"
        />
      </div>
    </div>
  );
} 