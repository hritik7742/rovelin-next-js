"use client";

import { useState } from 'react';
import RelatedTools from '../shared/RelatedTools';
import './text-diff.css';

type DiffItem = {
  type: 'added' | 'removed' | 'unchanged';
  line: string;
  lineNum: number;
};

interface DiffError {
  message: string;
}

export default function TextDiff() {
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [diff, setDiff] = useState<DiffItem[]>([]);
  const [error, setError] = useState('');
  const [showInputs, setShowInputs] = useState(true);

  const computeDiff = () => {
    try {
      if (!text1.trim() || !text2.trim()) {
        setError('Please enter text in both fields');
        return;
      }

      const lines1 = text1.split('\n');
      const lines2 = text2.split('\n');
      const result: DiffItem[] = [];
      let i = 0, j = 0;

      while (i < lines1.length || j < lines2.length) {
        if (i >= lines1.length) {
          result.push({ type: 'added', line: lines2[j], lineNum: j + 1 });
          j++;
        } else if (j >= lines2.length) {
          result.push({ type: 'removed', line: lines1[i], lineNum: i + 1 });
          i++;
        } else if (lines1[i] === lines2[j]) {
          result.push({ type: 'unchanged', line: lines1[i], lineNum: i + 1 });
          i++;
          j++;
        } else {
          result.push({ type: 'removed', line: lines1[i], lineNum: i + 1 });
          result.push({ type: 'added', line: lines2[j], lineNum: j + 1 });
          i++;
          j++;
        }
      }

      setDiff(result);
      setError('');
      setShowInputs(false);
    } catch (err) {
      const error = err as DiffError;
      setError('Error comparing texts: ' + error.message);
    }
  };

  const clearAll = () => {
    setText1('');
    setText2('');
    setDiff([]);
    setError('');
    setShowInputs(true);
  };

  return (
    <div className="formatter-container">
      <div className="formatter-workspace">
        <div className="tool-header">
          <h1>Text Diff Tool</h1>
          <p>Compare two texts and highlight the differences. Perfect for finding changes between text versions or documents.</p>
        </div>

        <div className="text-diff">
          <div className="controls">
            <div className="control-buttons">
              <button onClick={clearAll}>Clear All</button>
              {diff.length > 0 && (
                <button onClick={() => setShowInputs(!showInputs)} className="toggle-btn">
                  {showInputs ? 'Show Diff' : 'Show Inputs'}
                </button>
              )}
            </div>
          </div>

          <div className="editor-container">
            {showInputs ? (
              <div className="input-sections">
                <div className="input-section">
                  <h2>Original Text</h2>
                  <textarea
                    value={text1}
                    onChange={(e) => setText1(e.target.value)}
                    placeholder="Paste your original text here..."
                  />
                </div>
                <div className="input-section">
                  <h2>Modified Text</h2>
                  <textarea
                    value={text2}
                    onChange={(e) => setText2(e.target.value)}
                    placeholder="Paste your modified text here..."
                  />
                </div>
                <button onClick={computeDiff} className="compare-btn">Compare Texts</button>
              </div>
            ) : (
              <div className="output-section full-width">
                <div className="output-header">
                  <h2>Differences</h2>
                </div>
                {error ? (
                  <div className="error-message">{error}</div>
                ) : (
                  <div className="diff-output">
                    {diff.map((item, index) => (
                      <div key={index} className={`diff-line ${item.type}`}>
                        <span className="line-number">{item.lineNum}</span>
                        <span className="line-content" dangerouslySetInnerHTML={{ 
                          __html: item.line.replace(/"/g, '&quot;') 
                        }} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="info-sections">
            <article className="info-box">
              <h2>What is Text Diff?</h2>
              <p>
                Text diff is a way to compare two texts and identify the differences between them.
                It&apos;s commonly used in programming for code reviews, but it&apos;s also useful for
                comparing documents, contracts, or any text-based content.
              </p>
            </article>

            <article className="info-box">
              <h2>Common Use Cases</h2>
              <ul className="use-cases-list">
                <li>Comparing document versions</li>
                <li>Code review and debugging</li>
                <li>Contract revision tracking</li>
                <li>Content editing and proofreading</li>
                <li>Finding unauthorized changes</li>
              </ul>
            </article>

            <article className="info-box">
              <h2>How to Use</h2>
              <ol className="guide-list">
                <li>Paste your original text in the first box</li>
                <li>Paste the modified version in the second box</li>
                <li>Click Compare Texts to see differences</li>
                <li>Green highlights show additions</li>
                <li>Red highlights show deletions</li>
              </ol>
            </article>

            <article className="info-box">
              <h2>Features</h2>
              <ul className="features-list">
                <li>Line-by-line comparison</li>
                <li>Color-coded differences</li>
                <li>Easy-to-read output</li>
                <li>Support for large texts</li>
                <li>No registration required</li>
              </ul>
            </article>
          </div>
        </div>

        <RelatedTools 
          currentTool="/tools/text-diff" 
          category="Text Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 