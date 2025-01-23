"use client";

import { useState, useEffect } from 'react';
import './emoji-generator.css';
import { EMOJI_CATEGORIES, MOOD_SUGGESTIONS, EMOTIONAL_WORDS } from './emoji-data';

export default function EmojiGenerator() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEmojis, setSelectedEmojis] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<string | number | null>(null);
  const [activeCategory, setActiveCategory] = useState('Smileys');
  const [recentEmojis, setRecentEmojis] = useState<string[]>([]);

  useEffect(() => {
    const allEmojis = new Set<string>();
    Object.values(EMOJI_CATEGORIES).forEach(emojis => {
      if (Array.isArray(emojis)) {
        emojis.forEach(emoji => allEmojis.add(emoji));
      }
    });
    EMOJI_CATEGORIES.All = Array.from(allEmojis);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setSearchTerm(input);
    
    if (!input) {
      setSelectedEmojis([]);
      return;
    }

    const matchingEmojis = new Set<string>();

    // Match mood suggestions
    Object.entries(MOOD_SUGGESTIONS).forEach(([mood, emojis]) => {
      if (mood.includes(input)) {
        emojis.forEach(emoji => matchingEmojis.add(emoji));
      }
    });

    // Match word by word
    const words = input.split(/\s+/);
    words.forEach(word => {
      Object.entries(MOOD_SUGGESTIONS).forEach(([mood, emojis]) => {
        if (mood.includes(word) || word.includes(mood)) {
          emojis.forEach(emoji => matchingEmojis.add(emoji));
        }
      });

      Object.entries(EMOTIONAL_WORDS).forEach(([phrase, emojis]) => {
        if (word.includes(phrase) || phrase.includes(word)) {
          emojis.forEach(emoji => matchingEmojis.add(emoji));
        }
      });
    });

    // Match emotional phrases
    Object.entries(EMOTIONAL_WORDS).forEach(([phrase, emojis]) => {
      if (input.includes(phrase)) {
        emojis.forEach(emoji => matchingEmojis.add(emoji));
      }
    });

    setSelectedEmojis(Array.from(matchingEmojis));
  };

  const copyEmoji = (emoji: string, index: number | string) => {
    navigator.clipboard.writeText(emoji);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 1000);
    
    setRecentEmojis(prev => {
      const updated = [emoji, ...prev.filter(e => e !== emoji)].slice(0, 16);
      return updated;
    });
  };

  return (
    <div className="emoji-generator-container">
      <div className="emoji-workspace">
        <div className="tool-header">
          <h1>Emoji Generator</h1>
          <p className="tool-description">
            Find the perfect emoji for every mood and moment. Search by feeling or browse categories.
          </p>
        </div>

        <div className="search-section">
          <input
            type="text"
            className="mood-input"
            placeholder="Describe your mood or emotion..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>

        <div className="category-tabs">
          {Object.keys(EMOJI_CATEGORIES).map((category) => (
            <button
              key={category}
              className={`category-tab ${activeCategory === category ? 'active' : ''}`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="emoji-grid">
          {(searchTerm && selectedEmojis.length > 0 
            ? selectedEmojis 
            : EMOJI_CATEGORIES[activeCategory] || []
          ).map((emoji, index) => (
            <button
              key={`${emoji}-${index}`}
              className="emoji-item"
              onClick={() => copyEmoji(emoji, index)}
            >
              <span className="emoji">{emoji}</span>
              {copiedIndex === index && <span className="copied-tooltip">Copied!</span>}
            </button>
          ))}
        </div>

        {recentEmojis.length > 0 && (
          <div className="recent-emojis">
            <h3>Recently Used</h3>
            <div className="recent-emoji-grid">
              {recentEmojis.map((emoji, index) => (
                <button
                  key={`recent-${emoji}-${index}`}
                  className="emoji-item"
                  onClick={() => copyEmoji(emoji, `recent-${index}`)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="info-sections">
          <article className="info-box">
            <h2>Express Yourself with Emojis</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3>Enhanced Communication</h3>
                <p>Add emotion and context to your digital conversations.</p>
              </div>
              <div className="benefit-item">
                <h3>Social Media Ready</h3>
                <p>Perfect for creating engaging social media content.</p>
              </div>
              <div className="benefit-item">
                <h3>Quick Access</h3>
                <p>Find and copy emojis instantly for any platform.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Popular Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case">
                <h3>Social Media Posts 📱</h3>
                <p>Add personality to your tweets, Instagram captions, and status updates.</p>
              </div>
              <div className="use-case">
                <h3>Messages & Emails ✉️</h3>
                <p>Make your communications more engaging and expressive.</p>
              </div>
              <div className="use-case">
                <h3>Content Creation 🎨</h3>
                <p>Enhance your blog posts, presentations, and digital content.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Tips for Using Emojis</h2>
            <ul className="tips-list">
              <li>Use relevant emojis that match your message tone</li>
              <li>Don't overuse - 1-3 emojis per message is often ideal</li>
              <li>Consider your audience when selecting emojis</li>
              <li>Use emojis to complement, not replace, words</li>
            </ul>
          </article>
        </div>
      </div>
    </div>
  );
} 