'use client';

import { useState, useEffect } from 'react';
import { FileText, Upload, Download, Copy, Settings, Zap, Users, Star } from 'lucide-react';
import RelatedTools from '../shared/RelatedTools';
import './text-paragraph-splitter.css';

export default function TextParagraphSplitter() {
  const [inputText, setInputText] = useState(`How Much Do You Know About FS Industrial Switch? | FS YouTube - FS_com23 Apr 2025FS industrial switches are ideal for diverse applications, featuring durability, management protocols, and various port options and speeds.1:35Youtube - FS_comOverview of FS Testing Service See it, Test it, Trust itYoutube - FS_com30 Oct 2024FS offers comprehensive testing services to improve`);
  const [outputText, setOutputText] = useState('');
  const [splitMethod, setSplitMethod] = useState('paragraphs');
  const [paragraphCount, setParagraphCount] = useState(5);
  const [sentenceCount, setSentenceCount] = useState(2);
  const [chunkLength, setChunkLength] = useState(16);
  const [spacingBetween, setSpacingBetween] = useState(1);
  const [removePunctuation, setRemovePunctuation] = useState(false);
  const [removeLeftSpaces, setRemoveLeftSpaces] = useState(true);
  const [removeRightSpaces, setRemoveRightSpaces] = useState(true);
  const [copied, setCopied] = useState(false);

  const splitText = () => {
    if (!inputText.trim()) {
      setOutputText('');
      return;
    }

    let processedText = inputText;

    // Remove spaces if selected
    if (removeLeftSpaces) {
      processedText = processedText.replace(/^\s+/gm, '');
    }
    if (removeRightSpaces) {
      processedText = processedText.replace(/\s+$/gm, '');
    }

    // Remove punctuation if selected
    if (removePunctuation) {
      processedText = processedText.replace(/[.,;:!?'"()-]/g, '');
    }

    let result = '';
    const spacing = '\n'.repeat(spacingBetween);

    if (splitMethod === 'paragraphs') {
      const words = processedText.split(/\s+/).filter(word => word.length > 0);
      const wordsPerParagraph = Math.ceil(words.length / paragraphCount);

      for (let i = 0; i < paragraphCount && i * wordsPerParagraph < words.length; i++) {
        const paragraphWords = words.slice(i * wordsPerParagraph, (i + 1) * wordsPerParagraph);
        result += paragraphWords.join(' ');
        if (i < paragraphCount - 1 && (i + 1) * wordsPerParagraph < words.length) {
          result += spacing;
        }
      }
    } else if (splitMethod === 'sentences') {
      const sentences = processedText.split(/[.!?]+/).filter(s => s.trim().length > 0);
      for (let i = 0; i < sentences.length; i += sentenceCount) {
        const paragraphSentences = sentences.slice(i, i + sentenceCount);
        result += paragraphSentences.join('. ').trim();
        if (i + sentenceCount < sentences.length) {
          result += '.' + spacing;
        } else if (!result.endsWith('.')) {
          result += '.';
        }
      }
    } else if (splitMethod === 'chunk') {
      const words = processedText.split(/\s+/).filter(word => word.length > 0);
      for (let i = 0; i < words.length; i += chunkLength) {
        const chunk = words.slice(i, i + chunkLength);
        result += chunk.join(' ');
        if (i + chunkLength < words.length) {
          result += spacing;
        }
      }
    }

    setOutputText(result.trim());
  };

  useEffect(() => {
    splitText();
  }, [inputText, splitMethod, paragraphCount, sentenceCount, chunkLength, spacingBetween, removePunctuation, removeLeftSpaces, removeRightSpaces]);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(outputText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadText = () => {
    const blob = new Blob([outputText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'split-paragraphs.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearText = () => {
    setInputText('');
    setOutputText('');
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setInputText(e.target?.result as string);
      reader.readAsText(file);
    }
  };

  return (
    <div className="text-splitter-container">

      <div className="text-splitter-workspace">
        <div className="text-splitter-header">
          <h1>Text Paragraph Splitter</h1>
          <p className="text-splitter-description">
            Transform your long text into perfectly formatted paragraphs. Split by word count, sentences, or character length with advanced formatting options.
          </p>
          <div className="text-splitter-features">
            <div className="feature-item">
              <Zap className="w-4 h-4" />
              <span>Lightning Fast</span>
            </div>
            <div className="feature-item">
              <Users className="w-4 h-4" />
              <span>Free Forever</span>
            </div>
            <div className="feature-item">
              <Star className="w-4 h-4" />
              <span>No Registration</span>
            </div>
          </div>
        </div>

        <div className="text-splitter-editor">
          <div className="text-splitter-input">
            <div className="text-splitter-input-header">
              <h2>
                <Upload className="w-5 h-5" />
                Input Text
              </h2>
              <div className="text-splitter-input-actions">
                <input
                  type="file"
                  accept=".txt"
                  onChange={uploadFile}
                  className="file-input"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="upload-btn">
                  Upload File
                </label>
                <button onClick={clearText} className="clear-btn">
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste your text here or upload a file..."
              className="text-splitter-textarea"
            />
          </div>

          {/* Middle Ad */}

          <div className="text-splitter-output">
            <div className="text-splitter-output-header">
              <h2>
                <FileText className="w-5 h-5" />
                Result
              </h2>
              <div className="text-splitter-output-actions">
                <button
                  onClick={copyToClipboard}
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                >
                  <Copy className="w-4 h-4" />
                  {copied ? 'Copied!' : 'Copy'}
                </button>
                <button onClick={downloadText} className="download-btn">
                  <Download className="w-4 h-4" />
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={outputText}
              readOnly
              className="text-splitter-textarea"
              placeholder="Formatted text will appear here..."
            />
          </div>
        </div>

        <div className="text-splitter-settings">
          <h3 className="settings-title">
            <Settings className="w-5 h-5" />
            Separation Options
          </h3>

          <div className="settings-grid">
            <div className="setting-group">
              <h4>Splitting Method</h4>
              <div className="radio-group">
                <label className="radio-label">
                  <input
                    type="radio"
                    value="paragraphs"
                    checked={splitMethod === 'paragraphs'}
                    onChange={(e) => setSplitMethod(e.target.value)}
                  />
                  <span>Number of Paragraphs</span>
                </label>
                {splitMethod === 'paragraphs' && (
                  <input
                    type="number"
                    value={paragraphCount}
                    onChange={(e) => setParagraphCount(parseInt(e.target.value) || 1)}
                    min="1"
                    className="number-input"
                  />
                )}

                <label className="radio-label">
                  <input
                    type="radio"
                    value="sentences"
                    checked={splitMethod === 'sentences'}
                    onChange={(e) => setSplitMethod(e.target.value)}
                  />
                  <span>Sentences per Paragraph</span>
                </label>
                {splitMethod === 'sentences' && (
                  <input
                    type="number"
                    value={sentenceCount}
                    onChange={(e) => setSentenceCount(parseInt(e.target.value) || 1)}
                    min="1"
                    className="number-input"
                  />
                )}

                <label className="radio-label">
                  <input
                    type="radio"
                    value="chunk"
                    checked={splitMethod === 'chunk'}
                    onChange={(e) => setSplitMethod(e.target.value)}
                  />
                  <span>Use Chunk Length</span>
                </label>
                {splitMethod === 'chunk' && (
                  <input
                    type="number"
                    value={chunkLength}
                    onChange={(e) => setChunkLength(parseInt(e.target.value) || 1)}
                    min="1"
                    className="number-input"
                  />
                )}
              </div>
            </div>

            <div className="setting-group">
              <h4>Spacing Between Paragraphs</h4>
              <input
                type="number"
                value={spacingBetween}
                onChange={(e) => setSpacingBetween(parseInt(e.target.value) || 1)}
                min="1"
                max="5"
                className="number-input"
              />
              <p className="setting-hint">Number of new lines after each paragraph</p>

              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={removePunctuation}
                    onChange={(e) => setRemovePunctuation(e.target.checked)}
                  />
                  <span>Remove all punctuation marks</span>
                </label>
                <p className="setting-hint">Removes all punctuation from the text</p>
              </div>
            </div>

            <div className="setting-group">
              <h4>Remove Spaces and Tabs</h4>
              <div className="checkbox-group">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={removeLeftSpaces}
                    onChange={(e) => setRemoveLeftSpaces(e.target.checked)}
                  />
                  <span>Remove from left side</span>
                </label>
                <p className="setting-hint">Remove all spaces and tabs from the left side</p>

                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={removeRightSpaces}
                    onChange={(e) => setRemoveRightSpaces(e.target.checked)}
                  />
                  <span>Remove from right side</span>
                </label>
                <p className="setting-hint">Remove all spaces and tabs from the right side</p>
              </div>
            </div>
          </div>
        </div>

        <div className="text-splitter-articles">
          <article className="text-splitter-article">
            <h2>What is the Text Paragraph Splitter Tool?</h2>
            <p>
              Our advanced Text Paragraph Splitter is a powerful online tool designed to help content creators, writers, bloggers, and SEO professionals break down large blocks of text into well-structured, readable paragraphs. Whether you are working with lengthy articles, research papers, or any form of written content, this tool ensures optimal readability and user engagement.
            </p>
          </article>

          <article className="text-splitter-article">
            <h2>Key Features & Benefits</h2>
            <div className="benefits-grid">
              <div className="benefit-item">
                <h3>🎯 Multiple Split Methods</h3>
                <p>Split text by paragraph count, sentences per paragraph, or custom chunk lengths to meet your specific formatting needs.</p>
              </div>
              <div className="benefit-item">
                <h3>⚡ Real-time Processing</h3>
                <p>See instant results as you type or adjust settings. No waiting, no delays - just immediate text formatting.</p>
              </div>
              <div className="benefit-item">
                <h3>🔧 Advanced Formatting</h3>
                <p>Control spacing between paragraphs, remove punctuation, and trim unwanted spaces for perfect text cleanup.</p>
              </div>
              <div className="benefit-item">
                <h3>💾 Easy Export</h3>
                <p>Copy to clipboard or download as text file. Seamlessly integrate formatted text into your workflow.</p>
              </div>
            </div>
          </article>

          <article className="text-splitter-article">
            <h2>How to Use the Tool</h2>
            <ol className="usage-steps">
              <li>Paste your text into the input area or upload a text file</li>
              <li>Choose your preferred splitting method (paragraphs, sentences, or chunks)</li>
              <li>Adjust the settings for optimal formatting</li>
              <li>Watch the real-time preview in the result area</li>
              <li>Copy the formatted text or download as a file</li>
            </ol>
          </article>

          <article className="text-splitter-article">
            <h2>Perfect for SEO and Content Marketing</h2>
            <p>
              Well-formatted paragraphs are crucial for SEO success and user experience. Search engines favor content with proper structure, and readers are more likely to engage with text thats easy to scan and read. Our tool helps you create content that ranks better and converts more effectively.
            </p>
          </article>
        </div>

        <RelatedTools
          currentTool="/tools/text-paragraph-splitter"
          category="Text Tools"
          maxSuggestions={6}
        />
      </div>
    </div>
  );
}