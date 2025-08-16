"use client";

import { useState } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './password-generator.css';

type OptionsType = {
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
};

export default function PasswordGenerator() {
  const [password, setPassword] = useState('');
  const [length, setLength] = useState(12);
  const [copyText, setCopyText] = useState('Copy');
  const [options, setOptions] = useState<OptionsType>({
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true
  });

  const calculateStrength = (pwd: string) => {
    let strength = 0;
    if (pwd.match(/[a-z]/)) strength++;
    if (pwd.match(/[A-Z]/)) strength++;
    if (pwd.match(/[0-9]/)) strength++;
    if (pwd.match(/[^a-zA-Z0-9]/)) strength++;
    if (pwd.length >= 12) strength++;
    
    return ['Weak', 'Fair', 'Good', 'Strong', 'Very Strong'][strength - 1] || '';
  };

  const generatePassword = () => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?'
    } as const;

    let validChars = '';
    (Object.keys(options) as Array<keyof typeof options>).forEach(key => {
      if (options[key]) validChars += chars[key];
    });

    if (validChars.length === 0) return;

    let newPassword = '';
    for (let i = 0; i < length; i++) {
      newPassword += validChars.charAt(Math.floor(Math.random() * validChars.length));
    }

    setPassword(newPassword);
    setCopyText('Copy');
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(password);
      setCopyText('Copied!');
      setTimeout(() => setCopyText('Copy'), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>Password Generator</h1>
          <p>Create strong, secure passwords instantly with our free password generator.</p>
        </div>

        <div className="generator-main">
          <div className="password-display">
            <input 
              type="text" 
              value={password} 
              readOnly 
              placeholder="Generated password will appear here"
            />
            <button 
              onClick={copyToClipboard}
              className={copyText === 'Copied!' ? 'copied' : ''}
            >
              {copyText}
            </button>
          </div>

          <div className="options-container">
            <div className="length-selector">
              <label>Password Length: {length}</label>
              <input
                type="range"
                min="8"
                max="32"
                value={length}
                onChange={(e) => setLength(parseInt(e.target.value))}
              />
            </div>

            <div className="checkboxes">
              {Object.entries(options).map(([key, value]) => (
                <label key={key} className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={value}
                    onChange={() => setOptions(prev => ({...prev, [key as keyof typeof options]: !prev[key as keyof typeof options]}))}
                  />
                  Include {key}
                </label>
              ))}
            </div>
          </div>

          <button onClick={generatePassword} className="generate-btn">
            Generate Password
          </button>

          {password && (
            <div className="strength-indicator">
              <span>Strength:</span>
              <span className={`strength-${calculateStrength(password).toLowerCase()}`}>
                {calculateStrength(password)}
              </span>
            </div>
          )}
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>Why Use a Password Generator?</h2>
            <p>
              Strong passwords are crucial for protecting your online accounts.
              Our generator creates complex, unique passwords that are:
            </p>
            <ul className="benefits-list">
              <li>Hard to guess or crack</li>
              <li>Unique for each account</li>
              <li>Free from personal information</li>
              <li>Compliant with requirements</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>Password Security Tips</h2>
            <ul className="practices-list">
              <li>Use unique passwords for each account</li>
              <li>Make passwords at least 12 characters</li>
              <li>Include mixed characters and symbols</li>
              <li>Avoid personal information</li>
              <li>Use a password manager</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>How It Works</h2>
            <p>
              Our generator uses secure random number generation to create strong passwords.
              All processing happens in your browser - we never store or transmit your passwords.
            </p>
          </article>

          <article className="info-box">
            <h2>Frequently Asked Questions</h2>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>Is this generator safe?</h3>
                <p>
                  Yes! Everything runs locally in your browser. We never store or transmit
                  your generated passwords.
                </p>
              </div>
              <div className="faq-item">
                <h3>What makes a strong password?</h3>
                <p>
                  A strong password is long (12+ characters), uses mixed characters,
                  and avoids personal information or common words.
                </p>
              </div>
            </div>
          </article>
        </div>

        <RelatedTools 
          currentTool="/tools/password-generator" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 