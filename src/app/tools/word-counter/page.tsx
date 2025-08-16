"use client";

import { useState, useEffect } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './word-counter.css';

interface Stats {
  words: number;
  characters: number;
  charactersNoSpaces: number;
  sentences: number;
  paragraphs: number;
  readingTime: number;
  speakingTime: number;
}

export default function WordCounter() {
  const [text, setText] = useState('');
  const [stats, setStats] = useState<Stats>({
    words: 0,
    characters: 0,
    charactersNoSpaces: 0,
    sentences: 0,
    paragraphs: 0,
    readingTime: 0,
    speakingTime: 0
  });

  useEffect(() => {
    // Add analytics tracking here if needed
    // logEvent('Tools', 'View', 'Word Counter');
  }, []);

  useEffect(() => {
    const calculateStats = () => {
      // Words
      const words = text.trim() ? text.trim().split(/\s+/).length : 0;

      // Characters
      const characters = text.length;
      const charactersNoSpaces = text.replace(/\s/g, '').length;

      // Sentences
      const sentences = text.trim() ? text.split(/[.!?]+/).filter(Boolean).length : 0;

      // Paragraphs
      const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(Boolean).length : 0;

      // Reading time (average 200 words per minute)
      const readingTime = Math.ceil(words / 200);

      // Speaking time (average 130 words per minute)
      const speakingTime = Math.ceil(words / 130);

      setStats({
        words,
        characters,
        charactersNoSpaces,
        sentences,
        paragraphs,
        readingTime,
        speakingTime
      });
    };

    calculateStats();
  }, [text]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleClearText = () => {
    setText('');
  };

  return (
    <div className="counter-container">
      <div className="tool-header">
        <h1>Word Counter & Text Analyzer</h1>
        <p>Count words, characters, sentences, and paragraphs. Get instant text statistics and reading time estimates.</p>
      </div>

      <div className="counter-workspace">
        <div className="text-input-section">
          <textarea
            value={text}
            onChange={handleTextChange}
            placeholder="Type or paste your text here..."
            className="text-input"
          />
          <button onClick={handleClearText} className="clear-button">
            Clear Text
          </button>
        </div>

        <div className="stats-section">
          <div className="stat-card">
            <h3>Words</h3>
            <span className="stat-number">{stats.words}</span>
          </div>
          <div className="stat-card">
            <h3>Characters</h3>
            <span className="stat-number">{stats.characters}</span>
            <small>(no spaces: {stats.charactersNoSpaces})</small>
          </div>
          <div className="stat-card">
            <h3>Sentences</h3>
            <span className="stat-number">{stats.sentences}</span>
          </div>
          <div className="stat-card">
            <h3>Paragraphs</h3>
            <span className="stat-number">{stats.paragraphs}</span>
          </div>
          <div className="stat-card">
            <h3>Reading Time</h3>
            <span className="stat-number">{stats.readingTime} min</span>
          </div>
          <div className="stat-card">
            <h3>Speaking Time</h3>
            <span className="stat-number">{stats.speakingTime} min</span>
          </div>
        </div>

        <div className="info-sections">
          <article className="info-box">
            <h2>Word Count Guidelines</h2>
            <div className="guidelines-grid">
              <div className="guideline-item">
                <h3>Essays & Assignments</h3>
                <ul>
                  <li>Short Essay: 500-1000 words</li>
                  <li>Standard Essay: 1500-5000 words</li>
                  <li>Thesis: 20,000-50,000 words</li>
                  <li>Dissertation: 40,000-80,000 words</li>
                </ul>
              </div>
              <div className="guideline-item">
                <h3>Content Writing</h3>
                <ul>
                  <li>Blog Post: 300-2000 words</li>
                  <li>News Article: 600-800 words</li>
                  <li>Product Description: 300-400 words</li>
                  <li>Meta Description: 150-160 characters</li>
                </ul>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Common Word Count Requirements</h2>
            <div className="requirements-grid">
              <div className="requirement-item">
                <h3>Social Media</h3>
                <p>Twitter: 280 characters</p>
                <p>Instagram Caption: 2200 characters</p>
                <p>Facebook Post: 63,206 characters</p>
                <p>LinkedIn Post: 3000 characters</p>
              </div>
              <div className="requirement-item">
                <h3>Professional Writing</h3>
                <p>Resume: 400-800 words</p>
                <p>Cover Letter: 250-400 words</p>
                <p>Press Release: 400-500 words</p>
                <p>Business Proposal: 2000-5000 words</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Writing Tips</h2>
            <ul className="writing-tips">
              <li>Keep sentences clear and concise (15-20 words ideal)</li>
              <li>Use paragraphs to organize ideas (3-5 sentences per paragraph)</li>
              <li>Include transition words for better flow</li>
              <li>Maintain consistent spacing and formatting</li>
              <li>Review and edit for clarity and brevity</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>SEO Writing Guidelines</h2>
            <div className="seo-guidelines">
              <h3>Optimal Content Length</h3>
              <ul>
                <li>Blog Posts: 1500-2500 words for comprehensive coverage</li>
                <li>Landing Pages: 500-1000 words</li>
                <li>Product Pages: 1000-1500 words</li>
                <li>Meta Titles: 50-60 characters</li>
              </ul>
            </div>
          </article>

          <article className="info-box">
            <h2>Tool Features</h2>
            <ul className="features-list">
              <li>Real-time word counting</li>
              <li>Character counting (with and without spaces)</li>
              <li>Sentence and paragraph detection</li>
              <li>Reading time estimation</li>
              <li>Speaking time calculation</li>
              <li>No registration required</li>
              <li>Works offline</li>
              <li>Free to use</li>
            </ul>
          </article>
        </div>

        <RelatedTools 
          currentTool="/tools/word-counter" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 