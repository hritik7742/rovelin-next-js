"use client";

import React from 'react';
import { useState, ReactElement } from 'react';
import Link from 'next/link';
import './tools.css';
import {
  FileText,
  Image,
  FileJson,
  Code,
  Mail,
  Phone,
  PenSquare,
  FileCog,
  QrCode,
  FileType,
  Crop,
  Ruler,
  Package,
  Palette,
  Binary,
  FileImage,
  Hash,
  LinkIcon,
  Lock,
  DiffIcon,
  Smartphone,
  Type,
  ListIcon,
  User,
  FileCode,
  FileDown,
  RefreshCw,
  Files,
  Search
} from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

interface Tool {
  name: string;
  description: string;
  path: string;
  icon: ReactElement;
  category: string;
}

interface ToolCategory {
  [key: string]: Tool[];
}

const tools: Tool[] = [
  {
    name: 'Image Converter',
    description: 'Convert between JPG, PNG, WebP, PDF, HEIC, SVG formats',
    path: '/tools/image-converter',
    icon: <Image className="w-6 h-6" role="img" aria-label="Image converter" />,
    category: 'Image Tools'
  },
  {
    name: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format with transparency',
    path: '/tools/jpg-to-png',
    icon: <FileImage className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG format with compression',
    path: '/tools/png-to-jpg',
    icon: <FileImage className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'WebP to JPG Converter',
    description: 'Convert WebP images to JPG format for compatibility',
    path: '/tools/webp-to-jpg',
    icon: <Files className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'HEIC to JPG Converter',
    description: 'Convert iPhone HEIC photos to JPG format',
    path: '/tools/heic-to-jpg',
    icon: <FileImage className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'SVG Converter',
    description: 'Convert SVG files to PNG/JPG or vice versa',
    path: '/tools/svg-converter',
    icon: <FileCode className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Image to PDF Converter',
    description: 'Convert images to PDF format easily',
    path: '/tools/image-to-pdf',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'PDF to JPG Converter',
    description: 'Convert PDF files to JPG images',
    path: '/tools/pdf-to-jpg',
    icon: <FileImage className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'PDF to PNG Converter',
    description: 'Convert PDF files to PNG images',
    path: '/tools/pdf-to-png',
    icon: <FileDown className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Image Resizer',
    description: 'Resize images to exact dimensions while maintaining quality',
    path: '/tools/image-resizer',
    icon: <Ruler className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Image Cropper',
    description: 'Crop images with precision and custom aspect ratios',
    path: '/tools/image-cropper',
    icon: <Crop className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },

  {
    name: 'Image Compressor',
    description: 'Compress and optimize images',
    path: '/tools/image-compressor',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'WebP Compressor',
    description: 'Compress WebP images efficiently while maintaining quality',
    path: '/tools/webp-compressor',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'PNG Compressor',
    description: 'Compress PNG images while preserving transparency',
    path: '/tools/png-compressor',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'JPEG Compressor',
    description: 'Compress JPEG/JPG images with advanced optimization',
    path: '/tools/jpeg-compressor',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'GIF Compressor',
    description: 'Compress GIF images and animations effectively',
    path: '/tools/gif-compressor',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and create custom color palettes',
    path: '/tools/color-picker',
    icon: <Palette className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Base64 Converter',
    description: 'Convert text and files to/from Base64 encoding',
    path: '/tools/base64-converter',
    icon: <Binary className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Base64 Image Converter',
    description: 'Convert images to Base64 and vice versa',
    path: '/tools/base64-image',
    icon: <FileImage className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size',
    path: '/tools/css-minifier',
    icon: <Hash className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'URL Encoder/Decoder',
    description: 'Encode and decode URLs for safe transmission',
    path: '/tools/url-encoder-decoder',
    icon: <LinkIcon className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    path: '/tools/password-generator',
    icon: <Lock className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Text Diff Checker',
    description: 'Compare two texts and find differences',
    path: '/tools/text-diff',
    icon: <DiffIcon className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Phone Number Generator',
    description: 'Generate random phone numbers for different countries',
    path: '/tools/phone-generator',
    icon: <Smartphone className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Lorem Ipsum Generator',
    description: 'Generate professional placeholder text',
    path: '/tools/lorem-generator',
    icon: <Type className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Comma Separator',
    description: 'Convert between different text separators',
    path: '/tools/comma-separator',
    icon: <ListIcon className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Random Name Generator',
    description: 'Generate unique names from different cultures',
    path: '/tools/random-name-generator',
    icon: <User className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Markdown to HTML',
    description: 'Convert Markdown to clean, valid HTML code',
    path: '/tools/markdown-to-html',
    icon: <FileCode className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Word Counter',
    description: 'Count words, characters, sentences, and paragraphs',
    path: '/tools/word-counter',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Credit Card Generator',
    description: 'Generate test credit card numbers with realistic preview',
    path: '/tools/credit-card-generator',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Video Compressor',
    description: 'Compress video files while maintaining quality',
    path: '/tools/video-compressor',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },

  {
    name: 'Emoji Generator',
    description: 'Generate perfect emojis based on mood or description',
    path: '/tools/emoji-generator',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Gradient Generator',
    description: 'Create beautiful CSS gradients with 150+ presets',
    path: '/tools/gradient-generator',
    icon: <Palette className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Video to Audio Converter',
    description: 'Extract audio from video files',
    path: '/tools/video-to-audio',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'JavaScript Minifier',
    description: 'Minify and compress JavaScript code',
    path: '/tools/js-minifier',
    icon: <FileCode className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Word to PDF Converter',
    description: 'Convert Word documents to PDF format',
    path: '/tools/word-to-pdf',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Unit Converter',
    description: 'Convert between different units of measurement',
    path: '/tools/unit-converter',
    icon: <Ruler className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Name Wheel Spinner',
    description: 'Randomly select names with an interactive spinning wheel',
    path: '/tools/name-wheel',
    icon: <RefreshCw className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },

  {
    name: 'Archive Converter',
    description: 'Convert between ZIP, RAR, 7Z, TAR, GZ formats',
    path: '/tools/archive-converter',
    icon: <Package className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'PDF to Word Converter',
    description: 'Convert PDF files to editable Word documents',
    path: '/tools/pdf-to-word',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Image to Text (OCR)',
    description: 'Extract text from images in multiple languages',
    path: '/tools/image-to-text',
    icon: <FileType className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Email Extractor',
    description: 'Extract email addresses from text or files',
    path: '/tools/email-extractor',
    icon: <Mail className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Phone Number Extractor',
    description: 'Extract phone numbers from text or files',
    path: '/tools/phone-number-extractor',
    icon: <Phone className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'Digital Signature Generator',
    description: 'Create and customize digital signatures',
    path: '/tools/digital-signature',
    icon: <PenSquare className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'PDF Tools',
    description: 'Work with PDF files',
    path: '/tools/pdf-tools',
    icon: <FileCog className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    path: '/tools/json-formatter',
    icon: <FileJson className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code',
    path: '/tools/html-formatter',
    icon: <Code className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  },
  {
    name: 'QR Code Generator',
    description: 'Create customizable QR codes',
    path: '/tools/qr-generator',
    icon: <QrCode className="w-6 h-6" aria-hidden="true" />,
    category: 'Image Tools'
  },
  {
    name: 'Text Paragraph Splitter',
    description: 'Split text into paragraphs by word count, sentences, or chunks',
    path: '/tools/text-paragraph-splitter',
    icon: <FileText className="w-6 h-6" aria-hidden="true" />,
    category: 'Text Tools'
  }
];

export default function ToolsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const totalTools = tools.length;

  const filterTools = (tools: Tool[], query: string): Tool[] => {
    if (!query) return tools;
    return tools.filter(tool => {
      const searchString = [
        tool.name,
        tool.description,
        tool.category
      ].join(' ').toLowerCase();
      return searchString.includes(query.toLowerCase());
    });
  };

  const groupedTools: ToolCategory = {
    'Image Tools': filterTools(tools, searchQuery).filter(tool =>
      tool.category === 'Image Tools'
    ),
    'Text Tools': filterTools(tools, searchQuery).filter(tool =>
      tool.category === 'Text Tools'
    ),
    'Other Tools': filterTools(tools, searchQuery).filter(tool =>
      !['Image Tools', 'Text Tools'].includes(tool.category)
    )
  };

  const handleToolClick = (toolName: string) => {
    trackEvent('Tools', 'Tool Click', toolName);
  };

  return (
    <div className="tools-page">
      <div className="tools-header">
        <h1>Free Online Tools</h1>
        <p>A collection of {totalTools} free tools to help with your daily tasks</p>

        <div className="search-container">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search tools..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>
        </div>
      </div>

      {Object.entries(groupedTools).map(([category, categoryTools], ) => (
       
        <div key={category}>
          <h2 className="tools-category">{category}</h2>
          <div className="tools-grid">
            {categoryTools.map((tool) => (
              <Link
                href={tool.path}
                key={tool.path}
                className="tool-card"
                onClick={() => handleToolClick(tool.name)}
              >
                <span className="tool-icon" aria-hidden="true">{tool.icon}</span>
                <h2>{tool.name}</h2>
                <p>{tool.description}</p>
              </Link>
            ))}
          </div>


        </div>
      ))}

      <div className="tools-info">
        <h2>About Our Tools</h2>
        <p>
          All tools are free to use and run entirely in your browser. No data is sent
          to our servers, ensuring your information remains private and secure.
        </p>
        <div className="tools-features">
          <div className="feature">
            <h3>🔒 Secure</h3>
            <p>All processing happens in your browser</p>
          </div>
          <div className="feature">
            <h3>⚡ Fast</h3>
            <p>Instant results with no server delays</p>
          </div>
          <div className="feature">
            <h3>💻 Free</h3>
            <p>All tools are completely free to use</p>
          </div>
        </div>
      </div>
    </div>
  );
}