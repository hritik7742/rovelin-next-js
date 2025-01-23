"use client";

import Image from 'next/image';

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
  }
];

export default function Products() {
  const handleProductClick = (product: Product) => {
    // Add your analytics logic here
  };

  const handleFeatureView = (product: Product, feature: string) => {
    // Add your analytics logic here
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
                    onMouseEnter={() => handleFeatureView(product, feature)}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              <div className="product-actions">
                <a 
                  onClick={() => handleProductClick(product)}
                  href={product.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="install-button"
                >
                  Install Extension
                </a>
                <a 
                  onClick={() => handleProductClick(product)}
                  href={product.src} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="learn-more"
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