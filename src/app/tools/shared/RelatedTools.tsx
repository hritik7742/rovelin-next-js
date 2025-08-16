"use client";

import Link from 'next/link';
import { 
  FileText, 
  Image, 
  FileJson, 
  Code, 
  Mail, 
  Phone, 
  QrCode,
  Crop,
  Ruler,
  Package,
  Palette,
  Binary,
  FileImage,
  Hash,
  Lock,
  DiffIcon,
  Smartphone,
  FileCode,
  Files,
  Search
} from 'lucide-react';
import './related-tools.css';

interface RelatedTool {
  name: string;
  description: string;
  path: string;
  icon: React.ReactElement;
  category: string;
}

interface RelatedToolsProps {
  currentTool: string;
  category?: string;
  maxSuggestions?: number;
}

const allTools: RelatedTool[] = [
  {
    name: 'Image Converter',
    description: 'Convert between JPG, PNG, WebP, PDF, HEIC formats',
    path: '/tools/image-converter',
    icon: <Image className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'JPG to PNG Converter',
    description: 'Convert JPG images to PNG format',
    path: '/tools/jpg-to-png',
    icon: <FileImage className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'PNG to JPG Converter',
    description: 'Convert PNG images to JPG format',
    path: '/tools/png-to-jpg',
    icon: <FileImage className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'WebP to JPG Converter',
    description: 'Convert WebP images to JPG format',
    path: '/tools/webp-to-jpg',
    icon: <Files className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'HEIC to JPG Converter',
    description: 'Convert iPhone HEIC photos to JPG',
    path: '/tools/heic-to-jpg',
    icon: <FileImage className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'Image Resizer',
    description: 'Resize images to exact dimensions',
    path: '/tools/image-resizer',
    icon: <Ruler className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'Image Cropper',
    description: 'Crop images with precision',
    path: '/tools/image-cropper',
    icon: <Crop className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'Color Picker',
    description: 'Pick colors and create palettes',
    path: '/tools/color-picker',
    icon: <Palette className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'Image Compressor',
    description: 'Compress and optimize images',
    path: '/tools/image-compressor',
    icon: <Package className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'WebP Compressor',
    description: 'Compress WebP images efficiently',
    path: '/tools/webp-compressor',
    icon: <Package className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'PNG Compressor',
    description: 'Compress PNG images with transparency',
    path: '/tools/png-compressor',
    icon: <Package className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'JPEG Compressor',
    description: 'Compress JPEG/JPG images',
    path: '/tools/jpeg-compressor',
    icon: <Package className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'GIF Compressor',
    description: 'Compress GIF images and animations',
    path: '/tools/gif-compressor',
    icon: <Package className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'QR Code Generator',
    description: 'Create customizable QR codes',
    path: '/tools/qr-generator',
    icon: <QrCode className="w-5 h-5" />,
    category: 'Image Tools'
  },
  {
    name: 'CSS Minifier',
    description: 'Minify CSS code to reduce file size',
    path: '/tools/css-minifier',
    icon: <Hash className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'JavaScript Minifier',
    description: 'Minify and compress JavaScript code',
    path: '/tools/js-minifier',
    icon: <FileCode className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'JSON Formatter',
    description: 'Format and validate JSON data',
    path: '/tools/json-formatter',
    icon: <FileJson className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'HTML Formatter',
    description: 'Format and beautify HTML code',
    path: '/tools/html-formatter',
    icon: <Code className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Password Generator',
    description: 'Generate secure random passwords',
    path: '/tools/password-generator',
    icon: <Lock className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Word Counter',
    description: 'Count words, characters, sentences',
    path: '/tools/word-counter',
    icon: <FileText className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Text Diff Checker',
    description: 'Compare two texts and find differences',
    path: '/tools/text-diff',
    icon: <DiffIcon className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Email Extractor',
    description: 'Extract email addresses from text',
    path: '/tools/email-extractor',
    icon: <Mail className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Phone Number Extractor',
    description: 'Extract phone numbers from text',
    path: '/tools/phone-number-extractor',
    icon: <Phone className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Base64 Converter',
    description: 'Convert text and files to/from Base64',
    path: '/tools/base64-converter',
    icon: <Binary className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Unit Converter',
    description: 'Convert between different units',
    path: '/tools/unit-converter',
    icon: <Ruler className="w-5 h-5" />,
    category: 'Text Tools'
  },
  {
    name: 'Phone Number Generator',
    description: 'Generate random phone numbers for testing',
    path: '/tools/phone-generator',
    icon: <Smartphone className="w-5 h-5" />,
    category: 'Text Tools'
  }
];

export default function RelatedTools({ currentTool, category, maxSuggestions = 6 }: RelatedToolsProps) {
  // Define special relationships between tools
  const getSpecialRelatedTools = (toolPath: string): string[] => {
    const relationships: { [key: string]: string[] } = {
      '/tools/email-extractor': ['/tools/phone-number-extractor', '/tools/phone-generator'],
      '/tools/phone-number-extractor': ['/tools/email-extractor', '/tools/phone-generator'],
      '/tools/phone-generator': ['/tools/phone-number-extractor', '/tools/email-extractor'],
    };
    
    return relationships[toolPath] || [];
  };

  // Filter out current tool and get related tools
  const getRelatedTools = (): RelatedTool[] => {
    const filtered = allTools.filter(tool => tool.path !== currentTool);
    
    // Get special related tools first
    const specialRelated = getSpecialRelatedTools(currentTool);
    const specialTools = filtered.filter(tool => specialRelated.includes(tool.path));
    
    // If category is provided, prioritize tools from the same category
    if (category) {
      const sameCategory = filtered.filter(tool => 
        tool.category === category && !specialRelated.includes(tool.path)
      );
      const otherCategory = filtered.filter(tool => 
        tool.category !== category && !specialRelated.includes(tool.path)
      );
      
      // Prioritize: Special tools (2) + Same category (3) + Other category (1)
      const specialCount = Math.min(specialTools.length, 2);
      const sameCategoryCount = Math.min(sameCategory.length, Math.max(1, maxSuggestions - specialCount - 1));
      const otherCategoryCount = maxSuggestions - specialCount - sameCategoryCount;
      
      return [
        ...specialTools.slice(0, specialCount),
        ...sameCategory.slice(0, sameCategoryCount),
        ...otherCategory.slice(0, otherCategoryCount)
      ];
    }
    
    // If no category, prioritize special tools then random
    const specialCount = Math.min(specialTools.length, 2);
    const remainingCount = maxSuggestions - specialCount;
    const remainingTools = filtered.filter(tool => !specialRelated.includes(tool.path));
    
    return [
      ...specialTools.slice(0, specialCount),
      ...remainingTools.sort(() => Math.random() - 0.5).slice(0, remainingCount)
    ];
  };

  const relatedTools = getRelatedTools();

  if (relatedTools.length === 0) return null;

  return (
    <div className="related-tools-section">
      <div className="related-tools-header">
        <h2>🔧 Related Tools</h2>
        <p>Discover more tools to boost your productivity</p>
      </div>
      
      <div className="related-tools-grid">
        {relatedTools.map((tool) => (
          <Link 
            href={tool.path} 
            key={tool.path} 
            className="related-tool-card"
          >
            <div className="related-tool-icon">
              {tool.icon}
            </div>
            <div className="related-tool-content">
              <h3>{tool.name}</h3>
              <p>{tool.description}</p>
              <span className="related-tool-category">{tool.category}</span>
            </div>
            <div className="related-tool-arrow">→</div>
          </Link>
        ))}
      </div>
      
      <div className="related-tools-footer">
        <Link href="/tools" className="view-all-tools-btn">
          <Search className="w-4 h-4" />
          View All Tools
        </Link>
      </div>
    </div>
  );
}