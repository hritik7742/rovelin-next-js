"use client";

import Image from 'next/image';
import './products.css';
import { trackEvent } from '@/lib/analytics';

interface Product {
  name: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  src: string;
}

const products: Product[] = [
  {
    name: 'Gemini Prime - Custom Prompts | Chat Export | Notes & Folders',
    description: 'Gemini Prime is a powerful Chrome extension that enhances your AI chat experience with custom prompts, voice input,Instant Chat from Webpages, Note Taking system and organizational features.',
    image: '/images/gemini.png',
    category: 'Development Tools',
    features: ['Custom prompts', 'Voice input', 'Instant Chat from Webpages', 'Chat organization','Note Taking system','165+ Custom Prompts Templates'], 

    src: 'https://chromewebstore.google.com/detail/gemini-prime-165+custom-a/fejdghiopnhlijknlolkceklimkeopoe'
  }
  ,
  {
    name: 'DeepSeek Pro',
    description: 'DeepSeek Pro is a powerful Chrome extension that enhances your AI chat experience with custom prompts, voice input, themes, and organizational features.',
    image: '/images/deepseekpro.png',
    category: 'Development Tools',
    features: ['Custom prompts', 'Voice input', 'Theme customization', 'Chat organization'],
    src: 'https://chromewebstore.google.com/detail/deepseek-pro-custom-promp/noboaggalobomdpdggapfibgodeedkpl'
  },

  {
    name: 'AI Chat Exporter: Save ChatGPT, Claude, Gemini & Deepseek as PDF/TXT/WORD',
    description: 'Transform your ChatGPT and Google Gemini conversations into professionally formatted documents with multiple theme styles. Export chats instantly in PDF, Word (DOCX), and TXT formats with custom styling.',
    image: '/images/chatgpt-to-pdf.png',
    category: 'Productivity',
    features: ['Multiple themes', 'PDF/DOCX export', 'chatgpt', 'Deepseek','claude Ai','Gemini'],
    src: 'https://chromewebstore.google.com/detail/chatgpt-to-pdf-export-mul/dgkahgofldcancbehocmoiadgijedili'
  },

  {
    name: 'Leadspry',
    description: 'LeadSpry is a powerful Chrome extension designed to assist businesses and freelancers in efficiently finding leads across any niche.',
    image: '/images/Leadspry.png',
    category: 'Lead Generation',
    features: ['Email extraction', 'Contact finder', 'Lead organization'],
    src: 'https://chromewebstore.google.com/detail/leadspry-%E2%80%93-find-quality-l/blegkbedbdcoocieacjmpchfmcmdhfce'
  },
  {
    name: 'WA Group Finder',
    description: 'WA Group Finder is an innovative Chrome extension that helps users discover WhatsApp groups tailored to their interests.',
    image: '/images/whatsapplogo.png',
    category: 'Social Networking',
    features: ['Group discovery', 'Category filtering', 'Quick join'],
    src: 'https://chromewebstore.google.com/detail/wa-group-finder-find-what/dnhlhdlclknabfhnchaldipcidafnodj'
  },
  {
    name: 'Web Highlighter Pro',
    description: 'Web Highlighter Pro helps you save and organize important text from any webpage with multi-color highlighting, smart folders, and beautiful notes. Perfect for students, researchers, and anyone who wants to organize web content.',
    image: '/images/webhighlighter.png',
    category: 'Productivity',
    features: ['Multi-color highlighting', 'Smart folders', 'Custom notes', 'Research assistant'],
    src: 'https://chromewebstore.google.com/detail/web-highlighter-pro-smart/phgcbcconbpfhfkopjgoejjbhfgohenm'
  },
  {
    name: 'Mobile View Tester',
    description: 'Mobile View Tester is a powerful Chrome extension for testing website responsiveness across 85+ device profiles, helping developers and designers ensure perfect mobile-first designs.',
    image: '/images/mobileviewtester.png',
    category: 'Development Tools',
    features: ['85+ device profiles', 'Instant preview', 'Performance testing', 'One-click switching'],
    src: 'https://chromewebstore.google.com/detail/mobile-view-tester-respon/lkndpmbcjincdjeddabmkokchnlhgmbi'
  },
  
  {
    name: 'FullPageScreenshot',
    description: 'FullPageScreenshot is a Chrome extension that enables users to capture complete webpage screenshots.',
    image: '/images/fullpagescreenshot.png',
    category: 'Utility',
    features: ['Full page capture', 'Local processing', 'High-quality output'],
    src: 'https://chromewebstore.google.com/detail/fullpagescreenshot-custom/colimbbgbkkmcbkjnnmmpbbhmbcngdcj'
  },
  {
    name: 'YouTube Stats Viewer',
    description: 'YouTube Stats Viewer is a Chrome extension that displays video statistics within the YouTube interface.',
    image: '/images/youtubestatsviewer.png',
    category: 'Analytics',
    features: ['Video stats', 'Engagement metrics', 'Performance insights'],
    src: 'https://chromewebstore.google.com/detail/youtube-stats-viewer-like/ilclmifkafialgiepabobbgdnofbbgge'
  },
  {
    name: 'ImageXtract',
    description: 'ImageXtract is a versatile Chrome extension that enables users to extract text from images on the web.',
    image: '/images/imagextract.png',
    category: 'Productivity',
    features: ['Text extraction', 'Image upload', 'Privacy-focused'],
    src: 'https://chromewebstore.google.com/detail/imagextract-copy-text-fro/enafhefnjpdnhbmccghnphjjlflohpkg'
  },
  {
    name: 'SEO CheckUp',
    description: 'SEO CheckUp is a comprehensive Chrome extension that offers SEO analysis and recommendations for webpages.',
    image: '/images/seocheckup.png',
    category: 'SEO Tools',
    features: ['SEO analysis', 'Performance insights', 'Traffic improvement'],
    src: 'https://chromewebstore.google.com/detail/seo-checkupimprove-rankin/dddhmflnmblohpbjoabidfpkcdcljljl'
  },
  {
    name: 'CSS Scanly',
    description: 'CSS Scanly is a Chrome extension that allows users to view and edit CSS properties on webpages.',
    image: '/images/cssscanly.png',
    category: 'Development Tools',
    features: ['CSS inspection', 'Style editing', 'Real-time preview'],
    src: 'https://chromewebstore.google.com/detail/css-scanly-copy-css-tailw/ilklniobjoigkehieijcncgnoemlljmk'
  },
  {
    name: 'Filtered YouTube',
    description: 'Filtered YouTube is a Chrome extension that helps users customize their YouTube experience.',
    image: '/images/filteredyoutube.png',
    category: 'Content Management',
    features: ['Content filtering', 'Interface customization', 'Privacy protection'],
    src: 'https://chromewebstore.google.com/detail/filtered-youtube-remove-y/bkdalkbneidlmnkafimplljdajddmogb'
  },
  {
    name: 'MainTab',
    description: 'MainTab is a Chrome extension designed for efficient tab management.',
    image: '/images/maintab.png',
    category: 'Productivity',
    features: ['Tab management', 'Organization tools', 'Privacy focused'],
    src: 'https://chromewebstore.google.com/detail/maintab-save-memory-manag/ghdkngiknandibhgcfmadapmiapopdel'
  },
  
];

export default function Products() {
  const handleProductClick = (productName: string, action: 'Install' | 'Learn More') => {
    trackEvent('Products', action, productName);
  };

  const handleInstallClick = (productName: string) => {
    trackEvent('Products', 'Install Click', productName);
  };

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Our Products</h1>
        <p>Discover our suite of powerful Chrome extensions</p>
      </div>

      <div className="products-container">
        {products.map((product, index) => (
          <div key={index} className="product-showcase">
            <div className="product-content">
              <div className="product-header">
                <span className="product-category">{product.category}</span>
                <h2>{product.name}</h2>
              </div>
              
              <p className="product-description">{product.description}</p>
              
              <div className="product-features">
                {product.features.map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="feature-tag"
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="product-actions">
                <a 
                  href={product.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="install-button"
                  onClick={() => handleInstallClick(product.name)}
                >
                  Install Extension
                </a>
                <a 
                  href={product.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="learn-more"
                  onClick={() => handleProductClick(product.name, 'Learn More')}
                >
                  Learn More →
                </a>
              </div>
            </div>

            <div className="product-visual">
              <div className="product-image-container">
                <Image 
                  src={product.image}
                  alt={product.name}
                  width={400}
                  height={300}
                  priority={index < 2}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 