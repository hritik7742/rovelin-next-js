"use client";

import React, { useState, useMemo } from 'react';
import { Copy, Check, Sparkles, RefreshCw } from 'lucide-react';
import RelatedTools from '../shared/RelatedTools';

const PRESETS = [
  { name: 'Sunset Glow', colors: ['#ff7e5f', '#feb47b'], type: 'linear', angle: 90 },
  { name: 'Ocean Blue', colors: ['#2b5876', '#4e4376'], type: 'linear', angle: 135 },
  { name: 'Neon Purple', colors: ['#7F00FF', '#E100FF'], type: 'linear', angle: 45 },
  { name: 'Lush Green', colors: ['#11998e', '#38ef7d'], type: 'linear', angle: 90 },
  { name: 'Cosmic Violet', colors: ['#8E2DE2', '#4A00E0'], type: 'linear', angle: 120 },
  { name: 'Warm Flame', colors: ['#ff9a9e', '#fecfef'], type: 'linear', angle: 90 },
  { name: 'Midnight City', colors: ['#232526', '#414345'], type: 'linear', angle: 180 },
  { name: 'Emerald Water', colors: ['#348F50', '#56B4D3'], type: 'linear', angle: 90 },
  { name: 'Sweet Peach', colors: ['#ED4264', '#FFEDBC'], type: 'linear', angle: 90 },
  { name: 'Cyberpunk', colors: ['#f857a6', '#ff5858'], type: 'linear', angle: 45 },
  { name: 'Deep Space', colors: ['#000428', '#004e92'], type: 'linear', angle: 135 },
  { name: 'Sunny Morning', colors: ['#f6d365', '#fda085'], type: 'linear', angle: 120 },
];

export default function GradientGenerator() {
  const [color1, setColor1] = useState('#7C3AED');
  const [color2, setColor2] = useState('#EC4899');
  const [gradientType, setGradientType] = useState<'linear' | 'radial'>('linear');
  const [angle, setAngle] = useState(90);
  const [copied, setCopied] = useState(false);

  const cssCode = useMemo(() => {
    if (gradientType === 'linear') {
      return `background: linear-gradient(${angle}deg, ${color1}, ${color2});`;
    }
    return `background: radial-gradient(circle, ${color1}, ${color2});`;
  }, [gradientType, angle, color1, color2]);

  const gradientStyle = useMemo(() => {
    if (gradientType === 'linear') {
      return { background: `linear-gradient(${angle}deg, ${color1}, ${color2})` };
    }
    return { background: `radial-gradient(circle, ${color1}, ${color2})` };
  }, [gradientType, angle, color1, color2]);

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRandomize = () => {
    const randomHex = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setColor1(randomHex());
    setColor2(randomHex());
    setAngle(Math.floor(Math.random() * 360));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      {/* Interactive Preview Canvas */}
      <div
        className="w-full h-64 sm:h-80 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 transition-all flex items-center justify-center p-6"
        style={gradientStyle}
      >
        <button
          onClick={handleCopy}
          className="px-5 py-2.5 rounded-full bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg text-sm font-semibold text-gray-900 dark:text-white flex items-center gap-2 hover:scale-105 transition-all"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-indigo-600" />}
          <span>{copied ? 'Copied CSS!' : 'Copy CSS Code'}</span>
        </button>
      </div>

      {/* Controls */}
      <div className="mt-8 bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-800 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Gradient Colors
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 flex-1">
              <input
                type="color"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={color1}
                onChange={(e) => setColor1(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
            <div className="flex items-center gap-2 flex-1">
              <input
                type="color"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border-0"
              />
              <input
                type="text"
                value={color2}
                onChange={(e) => setColor2(e.target.value)}
                className="w-full px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-2">
            <button
              onClick={handleRandomize}
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex items-center gap-1.5 hover:bg-gray-100"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Randomize
            </button>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Type & Angle
            </label>
            <span className="text-xs font-semibold text-indigo-600">{gradientType === 'linear' ? `${angle}°` : 'Radial'}</span>
          </div>

          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setGradientType('linear')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                gradientType === 'linear' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              Linear
            </button>
            <button
              onClick={() => setGradientType('radial')}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
                gradientType === 'radial' ? 'bg-indigo-600 text-white shadow-xs' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700'
              }`}
            >
              Radial
            </button>
          </div>

          {gradientType === 'linear' && (
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-indigo-600"
            />
          )}
        </div>
      </div>

      {/* CSS Code Box */}
      <div className="mt-6 p-4 rounded-2xl bg-gray-900 text-gray-100 font-mono text-xs sm:text-sm flex items-center justify-between">
        <code>{cssCode}</code>
        <button
          onClick={handleCopy}
          className="p-1.5 rounded-lg bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
        </button>
      </div>

      {/* Presets Grid */}
      <div className="mt-10">
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-500" /> Curated Gradient Presets
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {PRESETS.map((p) => (
            <button
              key={p.name}
              onClick={() => {
                setColor1(p.colors[0]);
                setColor2(p.colors[1]);
                setAngle(p.angle);
                setGradientType(p.type as any);
              }}
              className="h-20 rounded-xl shadow-xs hover:scale-105 transition-all p-2 flex flex-col justify-end text-left relative overflow-hidden group"
              style={{ background: `linear-gradient(${p.angle}deg, ${p.colors[0]}, ${p.colors[1]})` }}
            >
              <span className="text-[11px] font-bold text-white drop-shadow-md">
                {p.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <RelatedTools currentTool="/tools/gradient-generator" category="Image Tools" />
      </div>
    </div>
  );
}

