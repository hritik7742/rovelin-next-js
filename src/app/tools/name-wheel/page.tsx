"use client";

import { useState, useRef } from 'react';
import { WHEEL_COLORS } from './wheel-colors';
import RelatedTools from '../shared/RelatedTools';
import './name-wheel.css';

export default function NameWheel() {
  const [names, setNames] = useState(['John', 'Jane', 'Mike', 'Sarah', 'Tom', 'Emily']);
  const [newName, setNewName] = useState('');
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotationDegree, setRotationDegree] = useState(0);
  const [winner, setWinner] = useState('');
  const wheelRef = useRef<SVGSVGElement>(null);

  const getSegmentPath = (index: number): string => {
    const segmentSize = 360 / names.length;
    const startAngle = index * segmentSize;
    const endAngle = (index + 1) * segmentSize;
    const radius = 150;
    const centerX = 200;
    const centerY = 200;

    const startRad = (startAngle - 90) * (Math.PI / 180);
    const endRad = (endAngle - 90) * (Math.PI / 180);

    const x1 = centerX + radius * Math.cos(startRad);
    const y1 = centerY + radius * Math.sin(startRad);
    const x2 = centerX + radius * Math.cos(endRad);
    const y2 = centerY + radius * Math.sin(endRad);

    const largeArcFlag = segmentSize > 180 ? 1 : 0;

    return `M${centerX},${centerY} L${x1},${y1} A${radius},${radius} 0 ${largeArcFlag},1 ${x2},${y2} Z`;
  };

  const handleAddName = (e: React.FormEvent) => {
    e.preventDefault();
    if (newName.trim() && names.length < 12) {
      setNames(prevNames => [...prevNames, newName.trim()]);
      setNewName('');
    }
  };

  const removeName = (indexToRemove: number) => {
    setNames(prevNames => prevNames.filter((_, index) => index !== indexToRemove));
  };

  const spinWheel = () => {
    if (!isSpinning && names.length > 1) {
      setIsSpinning(true);
      setWinner('');

      const minSpins = 5;
      const maxSpins = 8;
      const extraDegrees = Math.random() * 360;
      const totalDegrees = (minSpins + Math.random() * (maxSpins - minSpins)) * 360 + extraDegrees;

      setRotationDegree(prevRotation => prevRotation + totalDegrees);

      setTimeout(() => {
        const segmentSize = 360 / names.length;
        const normalizedRotation = (rotationDegree + totalDegrees) % 360;
        const winningIndex = Math.floor(
          (360 - (normalizedRotation % 360)) / segmentSize
        );
        setWinner(names[winningIndex]);
        setIsSpinning(false);
      }, 5000);
    }
  };

  const shuffleNames = () => {
    setNames(prevNames => {
      const shuffled = [...prevNames];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    });
  };

  return (
    <div className="formatter-container">

      <div className="formatter-workspace">
        <header className="tool-header">
          <h1>Random Name Wheel Spinner</h1>
          <p>Fair and engaging way to randomly select names for any occasion</p>
        </header>

        <div className="main-content">
          {/* Left Side - Wheel */}
          <div className="wheel-section">
            <div className="wheel-pointer"></div>
            <svg
              ref={wheelRef}
              viewBox="0 0 400 400"
              className="wheel"
              style={{
                transform: `rotate(${rotationDegree}deg)`
              }}
            >
              {names.map((name, index) => (
                <g key={index}>
                  <path
                    d={getSegmentPath(index)}
                    fill={WHEEL_COLORS[index % WHEEL_COLORS.length]}
                    stroke="white"
                    strokeWidth="2"
                  />
                  <text
                    x="200"
                    y="200"
                    transform={`rotate(${(360 / names.length) * index + (360 / names.length / 2)} 200 200) translate(0, -100)`}
                    textAnchor="middle"
                    fill="white"
                    className="wheel-text"
                  >
                    {name}
                  </text>
                </g>
              ))}
            </svg>

            <button
              onClick={spinWheel}
              disabled={isSpinning || names.length < 2}
              className="spin-button"
            >
              {isSpinning ? 'Spinning...' : 'Spin the Wheel!'}
            </button>

            {winner && (
              <div className="winner-announcement">
                Winner: {winner}! 🎉
              </div>
            )}
          </div>

          {/* Right Side - Names Input */}
          <div className="names-control-section">
            <div className="names-input-container">
              <h2>Add Participants</h2>
              <form onSubmit={handleAddName} className="name-input-form">
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="Enter name"
                  className="name-input"
                  maxLength={20}
                />
                <button
                  type="submit"
                  disabled={names.length >= 12}
                  className="add-button"
                >
                  Add Name
                </button>
              </form>

              <div className="names-list">
                <h3>Current Participants <span className="participant-count">({names.length}/12)</span></h3>
                <div className="names-grid">
                  {names.map((name, index) => (
                    <div key={index} className="name-tag">
                      <span>{name}</span>
                      <button
                        onClick={() => removeName(index)}
                        className="remove-name-btn"
                        aria-label="Remove name"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="quick-actions">
                <button 
                  onClick={() => setNames([])} 
                  className="clear-all-btn"
                  disabled={names.length === 0}
                >
                  Clear All
                </button>
                <button 
                  onClick={shuffleNames} 
                  className="shuffle-btn"
                  disabled={names.length < 2}
                >
                  🔀 Shuffle
                </button>
                <button 
                  onClick={() => setNames(['Alice', 'Bob', 'Charlie', 'David', 'Eva', 'Frank'])}
                  className="add-sample-btn"
                  disabled={names.length > 0}
                >
                  Add Samples
                </button>
              </div>
            </div>

            <div className="wheel-stats">
              <div className="stat-card">
                <span className="stat-label">Total Names</span>
                <span className="stat-value">{names.length}</span>
              </div>
              <div className="stat-card">
                <span className="stat-label">Last Winner</span>
                <span className="stat-value">{winner || '-'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Ad */}

        {/* Info Sections */}
        <div className="info-sections">
          <article className="info-box">
            <h2>Popular Use Cases</h2>
            <div className="use-cases-grid">
              <div className="use-case">
                <h3>🎓 Education</h3>
                <p>Randomly select students for class participation, presentations, or group assignments.</p>
              </div>
              <div className="use-case">
                <h3>🏢 Workplace</h3>
                <p>Choose team members for projects, select lunch order sequence, or assign tasks fairly.</p>
              </div>
              <div className="use-case">
                <h3>🎮 Games & Events</h3>
                <p>Pick winners for raffles, decide player order in games, or select participants for activities.</p>
              </div>
              <div className="use-case">
                <h3>👥 Team Building</h3>
                <p>Create random groups, pair employees for mentoring, or select speakers for meetings.</p>
              </div>
            </div>
          </article>

          <article className="info-box">
            <h2>Key Features</h2>
            <ul className="features-list">
              <li>✨ Visually engaging spinning animation</li>
              <li>🎯 Fair and random selection process</li>
              <li>📱 Works on all devices</li>
              <li>💾 No registration required</li>
              <li>🔒 Privacy-focused - no data stored</li>
              <li>🎨 Colorful and intuitive interface</li>
              <li>♾️ Unlimited free uses</li>
              <li>⚡ Instant results</li>
            </ul>
          </article>

          <article className="info-box">
            <h2>How to Use</h2>
            <ol className="instructions-list">
              <li>{"Enter names using the input field"}</li>
              <li>{"Add up to 12 names to the wheel"}</li>
              <li>{"Click 'Spin the Wheel' to start"}</li>
              <li>{"Wait for the wheel to stop spinning"}</li>
              <li>{"The winner will be highlighted and announced"}</li>
            </ol>
            <div className="pro-tip">
              <strong>Pro Tip:</strong> For the best experience, add at least 3 names to create a balanced wheel.
            </div>
          </article>
        </div>

        <RelatedTools 
          currentTool="/tools/name-wheel" 
          category="Utility Tools" 
          maxSuggestions={6} 
        />
      </div>
    </div>
  );
} 