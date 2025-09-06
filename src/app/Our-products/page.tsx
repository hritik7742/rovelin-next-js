"use client";

import React from 'react';
import Image from 'next/image';
import './products.css';
import { trackEvent } from '@/lib/analytics';
import { Users, ExternalLink, Download } from 'lucide-react';

interface Product {
  name: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  src: string;
  featured?: boolean;
  subtitle?: string;
}

interface Freebie {
  name: string;
  subtitle: string;
  description: string;
  category: string;
  downloadLink?: string;
}

const products: Product[] = [
  {
    name: 'Gemini Prime',
    subtitle: 'Custom Prompts | Chat Export | Notes & Folders',
    description: 'Enhance your AI chat experience with custom prompts, voice input, instant chat from webpages, and note-taking system.',
    image: '/images/gemini.png',
    category: 'EXTENSIONS',
    features: ['Custom prompts', 'Voice input', 'Chat organization'], 
    src: 'https://chromewebstore.google.com/detail/gemini-prime-165+custom-a/fejdghiopnhlijknlolkceklimkeopoe',
    featured: true
  },
  {
    name: 'DeepSeek Pro',
    subtitle: 'AI with streamlined tools for enhanced writing and analysis.',
    description: 'Chrome extension that enhances your AI chat experience with custom prompts, voice input, and themes.',
    image: '/images/deepseekpro.png',
    category: 'WEB APPS',
    features: ['Custom prompts', 'Voice input', 'Theme customization'],
    src: 'https://chromewebstore.google.com/detail/deepseek-pro-custom-promp/noboaggalobomdpdggapfibgodeedkpl',
    featured: true
  },
  {
    name: 'Claude ToolKit',
    subtitle: 'Custom Prompts | Chat Export, Voice | Notes & Folders',
    description: 'Transform your Claude AI experience with the ultimate productivity companion.',
    image: '/images/claude.png',
    category: 'EXTENSIONS',
    features: ['Custom prompts', 'Voice input', 'Chat organization'], 
    src: 'https://chromewebstore.google.com/detail/claude-toolkit-custom-pro/opnabjgijpbfgloabfopcbmkaegcojeh',
    featured: true
  },
  {
    name: 'AI Chat Exporter',
    subtitle: 'Save ChatGPT, Claude, Gemini & Deepseek as PDF/TXT/WORD',
    description: 'Export your AI conversations into professionally formatted documents with multiple theme styles.',
    image: '/images/chatgpt-to-pdf.png',
    category: 'EXTENSIONS',
    features: ['Multiple themes', 'PDF/DOCX export', 'Multiple AI platforms'],
    src: 'https://chromewebstore.google.com/detail/chatgpt-to-pdf-export-mul/dgkahgofldcancbehocmoiadgijedili'
  },
  {
    name: 'Leadspry',
    subtitle: 'Discover qualified leads and export clean CSVs.',
    description: 'Find leads across any niche with powerful Chrome extension for businesses and freelancers.',
    image: '/images/Leadspry.png',
    category: 'ANALYTICS',
    features: ['Email extraction', 'Contact finder', 'Lead organization'],
    src: 'https://chromewebstore.google.com/detail/leadspry-%E2%80%93-find-quality-l/blegkbedbdcoocieacjmpchfmcmdhfce'
  },
  {
    name: 'WA Group Finder',
    subtitle: 'Find WhatsApp groups tailored to your interests.',
    description: 'Innovative Chrome extension that helps users discover WhatsApp groups tailored to their interests.',
    image: '/images/whatsapplogo.png',
    category: 'Social Networking',
    features: ['Group discovery', 'Category filtering', 'Quick join'],
    src: 'https://chromewebstore.google.com/detail/wa-group-finder-find-what/dnhlhdlclknabfhnchaldipcidafnodj'
  },
  {
    name: 'Web Highlighter Pro',
    subtitle: 'Smart highlighting and note-taking for web content.',
    description: 'Save and organize important text from any webpage with multi-color highlighting, smart folders, and beautiful notes.',
    image: '/images/webhighlighter.png',
    category: 'Productivity',
    features: ['Multi-color highlighting', 'Smart folders', 'Custom notes'],
    src: 'https://chromewebstore.google.com/detail/web-highlighter-pro-smart/phgcbcconbpfhfkopjgoejjbhfgohenm'
  },
  {
    name: 'Mobile View Tester',
    subtitle: 'Preview responsive breakpoints and device presets.',
    description: 'Test website responsiveness across 85+ device profiles for perfect mobile-first designs.',
    image: '/images/mobileviewtester.png',
    category: 'DEVTOOLS',
    features: ['85+ device profiles', 'Instant preview', 'Performance testing'],
    src: 'https://chromewebstore.google.com/detail/mobile-view-tester-respon/lkndpmbcjincdjeddabmkokchnlhgmbi'
  },
  {
    name: 'FullPageScreenshot',
    subtitle: 'Capture pixel-perfect, full height screenshots with one click.',
    description: 'Chrome extension that enables users to capture complete webpage screenshots with high-quality output.',
    image: '/images/fullpagescreenshot.png',
    category: 'UTILITIES',
    features: ['Full page capture', 'Local processing', 'High-quality output'],
    src: 'https://chromewebstore.google.com/detail/fullpagescreenshot-custom/colimbbgbkkmcbkjnnmmpbbhmbcngdcj'
  },
  {
    name: 'YouTube Stats Viewer',
    subtitle: 'Instant channel and video analytics.',
    description: 'Display video statistics within YouTube interface with engagement metrics and insights.',
    image: '/images/youtubestatsviewer.png',
    category: 'ANALYTICS',
    features: ['Video stats', 'Engagement metrics', 'Performance insights'],
    src: 'https://chromewebstore.google.com/detail/youtube-stats-viewer-like/ilclmifkafialgiepabobbgdnofbbgge'
  },
  {
    name: 'ImageXtract',
    subtitle: 'Extract text from images with privacy-focused processing.',
    description: 'Versatile Chrome extension that enables users to extract text from images on the web with privacy focus.',
    image: '/images/imagextract.png',
    category: 'Productivity',
    features: ['Text extraction', 'Image upload', 'Privacy-focused'],
    src: 'https://chromewebstore.google.com/detail/imagextract-copy-text-fro/enafhefnjpdnhbmccghnphjjlflohpkg'
  },
  {
    name: 'SEO CheckUp',
    subtitle: 'One-click audits for meta, indexing, structure, and performance.',
    description: 'Comprehensive Chrome extension that offers SEO analysis and recommendations for webpages.',
    image: '/images/seocheckup.png',
    category: 'SEO',
    features: ['SEO analysis', 'Performance insights', 'Traffic improvement'],
    src: 'https://chromewebstore.google.com/detail/seo-checkupimprove-rankin/dddhmflnmblohpbjoabidfpkcdcljljl'
  },
  {
    name: 'CSS Scanly',
    subtitle: 'Inspect styles of any element and copy clean CSS instantly.',
    description: 'Chrome extension that allows users to view and edit CSS properties on webpages with real-time preview.',
    image: '/images/cssscanly.png',
    category: 'DEVTOOLS',
    features: ['CSS inspection', 'Style editing', 'Real-time preview'],
    src: 'https://chromewebstore.google.com/detail/css-scanly-copy-css-tailw/ilklniobjoigkehieijcncgnoemlljmk'
  },
  {
    name: 'Filtered YouTube',
    subtitle: 'Customize your YouTube experience with advanced filtering.',
    description: 'Chrome extension that helps users customize their YouTube experience with content filtering and privacy protection.',
    image: '/images/filteredyoutube.png',
    category: 'Content Management',
    features: ['Content filtering', 'Interface customization', 'Privacy protection'],
    src: 'https://chromewebstore.google.com/detail/filtered-youtube-remove-y/bkdalkbneidlmnkafimplljdajddmogb'
  },
  {
    name: 'MainTab',
    subtitle: 'A minimal new tab with widgets, quick notes, and shortcuts.',
    description: 'Chrome extension designed for efficient tab management with organization tools and privacy focus.',
    image: '/images/maintab.png',
    category: 'Productivity',
    features: ['Tab management', 'Organization tools', 'Privacy focused'],
    src: 'https://chromewebstore.google.com/detail/maintab-save-memory-manag/ghdkngiknandibhgcfmadapmiapopdel'
  }
];

const freebies: Freebie[] = [
  {
    name: 'AI Course 2025: Complete AI Generalist Blueprint',
    subtitle: 'Master Artificial Intelligence, ChatGPT, Automation & AI Tools for Career Success',
    description: 'Complete guide to mastering AI tools and automation for professional success',
    category: 'AI Course',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/ai-generalist-blueprint'
  },
  {
    name: 'Instagram Theme Page Business Course 2025',
    subtitle: 'Build & Monetize Instagram Pages - Make Money Online Without Showing Your Face',
    description: 'Complete guide to building profitable Instagram theme pages',
    category: 'Social Media',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/instagram-themepage-business'
  },
  {
    name: 'Amazon KDP Course 2025',
    subtitle: 'Complete Step-by-Step Guide to Make $10,000/Month Publishing Books Online',
    description: 'Kindle Direct Publishing training for beginners to advanced publishers',
    category: 'Publishing',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/amazonkdp'
  },
  {
    name: 'YouTube SEO Mastery',
    subtitle: 'Complete Course - Rank #1, Explode Views & Subscribers',
    description: 'Master YouTube SEO to dominate search results and grow your channel',
    category: 'SEO Course',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/youtubeseo'
  },
  {
    name: 'Dropshipping Success',
    subtitle: 'Complete Beginner\'s Course to $10K/Month',
    description: 'Step-by-step guide to building a profitable dropshipping business',
    category: 'E-commerce',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/dropshipping'
  },
  {
    name: 'Copywriting Mastery',
    subtitle: 'Your Path to £5,000-£10,000/Month - Complete Course',
    description: 'Master the art of persuasive writing and high-converting copy',
    category: 'Copywriting',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/copywriting'
  },
  {
    name: 'Sales Mastery',
    subtitle: 'The Complete Ebook Course',
    description: 'Comprehensive guide to mastering sales techniques and strategies',
    category: 'Sales',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/salesmastery'
  },
  {
    name: 'Amazon FBA Starter Guide',
    subtitle: 'Complete Beginner\'s Blueprint to Starting Your Amazon Business',
    description: 'Everything you need to know to start your Amazon FBA business',
    category: 'E-commerce',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/amazon-fba-course'
  },
  {
    name: 'Master Facebook Ads & Meta Marketing in 2025',
    subtitle: 'Complete guide to Facebook and Instagram advertising',
    description: 'Master Facebook Ads and Meta marketing for maximum ROI',
    category: 'Marketing',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/facebookads'
  },
  {
    name: 'Master Digital Marketing in 2025',
    subtitle: 'Complete Beginner to Advanced Course',
    description: 'Comprehensive digital marketing course covering all major channels',
    category: 'Marketing',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/digitalmarketing'
  },
  {
    name: '165+ AI Prompts to Supercharge Your Workflow',
    subtitle: 'Premium PDF with AI prompts for productivity',
    description: 'Collection of powerful AI prompts to boost your productivity and efficiency',
    category: 'AI Tools',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/ai-prompts'
  },
  {
    name: 'Comprehensive Micro SaaS Ideas Database',
    subtitle: 'Low-Competition, High-Profit Opportunities for 2025',
    description: 'Curated database of profitable micro SaaS ideas with low competition',
    category: 'SaaS',
    downloadLink: 'https://hritikkumarkota.gumroad.com/l/microsaas'
  }
];

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');

  const handleProductClick = (productName: string, action: 'Install' | 'Learn More') => {
    trackEvent('Products', action, productName);
  };

  const handleInstallClick = (productName: string) => {
    trackEvent('Products', 'Install Click', productName);
  };

  const handleFreebieDownload = (freebieName: string) => {
    trackEvent('Freebies', 'Download', freebieName);
  };

  const categories = ['All', 'EXTENSIONS', 'WEB APPS', 'DEVTOOLS', 'ANALYTICS', 'SEO', 'UTILITIES', 'Productivity', 'Social Networking', 'Content Management'];

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page">
      {/* Compact Hero Section */}
      <div className="products-hero">
        <span className="hero-badge">New releases every month</span>
        <h1>Our Products</h1>
        <p>Tools to help you work faster and more efficiently.</p>
        <div className="user-count-badge">
          <Users size={14} className="icon" />
          <span>Trusted by <span className="count">15,000+</span> users</span>
        </div>
      </div>


      {/* Category Filter */}
      <div className="category-filter">
        <div className="filter-tabs">
          {categories.map(category => (
            <button 
              key={category}
              className={`filter-tab ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category === 'All' ? 'All' : category.charAt(0) + category.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search products" 
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Products Grid */}
      <div className="products-grid">
        {filteredProducts.map((product, index) => (
          <div key={index} className={`product-card ${product.featured ? 'featured' : ''}`}>
            <div className="product-image">
              <Image 
                src={product.image}
                alt={product.name}
                width={300}
                height={200}
                priority={index < 6}
              />
              {product.featured && <span className="featured-indicator">Featured</span>}
            </div>

            <div className="product-info">
              <div className="product-header">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                {product.subtitle && <p className="product-subtitle">{product.subtitle}</p>}
              </div>

              <p className="product-description">{product.description}</p>

              <div className="product-features">
                {product.features.slice(0, 3).map((feature, idx) => (
                  <span key={idx} className="feature-tag">{feature}</span>
                ))}
              </div>

              <div className="product-actions">
                <a 
                  href={product.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-primary"
                  onClick={() => handleInstallClick(product.name)}
                >
                  Add to Chrome
                </a>
                <a 
                  href={product.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn-secondary"
                  onClick={() => handleProductClick(product.name, 'Learn More')}
                >
                  Learn more <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Freebies Section */}
      <div className="freebies-section">
        <div className="section-header">
          <span className="section-badge">Premium Courses</span>
          <h2>Free Resources & Courses</h2>
          <p>High-value courses and resources to accelerate your success.</p>
        </div>

        <div className="freebies-grid">
          {freebies.map((freebie, index) => (
            <div key={index} className="freebie-card">
              <div className="freebie-image">
                <div className="freebie-placeholder">
                  <Download size={32} />
                </div>
              </div>
              <div className="freebie-content">
                <span className="freebie-category">{freebie.category}</span>
                <h4>{freebie.name}</h4>
                <p className="freebie-subtitle">{freebie.subtitle}</p>
                <button 
                  className="btn-freebie"
                  onClick={() => {
                    handleFreebieDownload(freebie.name);
                    window.open(freebie.downloadLink, '_blank');
                  }}
                >
                  Get freebie!
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;