"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import './products.css';
import { trackEvent } from '@/lib/analytics';
import type { SponsorListing } from '@/lib/sponsors';
import type { TrafficAnalytics, TrafficChartRange, TrafficPoint } from '@/lib/google-analytics-data';
import {
  ArrowRight,
  AtSign,
  Globe2,
  Hexagon,
  Megaphone,
  Send,
  Search,
  Sparkles,
  Star,
  X,
  Zap,
} from 'lucide-react';

interface Product {
  name: string;
  description: string;
  image: string;
  category: string;
  features: string[];
  src: string;
  featured?: boolean;
  subtitle?: string;
  impressions: string;
  accent: string;
}

interface EmptySponsorSlot {
  id: string;
  title: string;
  copy: string;
}

const products: Product[] = [
  {
    name: 'Gemini Prime',
    subtitle: 'Custom Prompts | Chat Export | Notes & Folders',
    description: 'Enhance your AI chat experience with custom prompts, voice input, instant chat from webpages, and note-taking system.',
    image: '/images/gemini.png',
    category: 'AI Tools',
    features: ['Custom prompts', 'Voice input', 'Chat organization'],
    src: 'https://chromewebstore.google.com/detail/gemini-prime-165+custom-a/fejdghiopnhlijknlolkceklimkeopoe',
    featured: true,
    impressions: '128K',
    accent: 'blue',
  },
  {
    name: 'DeepSeek Pro',
    subtitle: 'AI with streamlined tools for enhanced writing and analysis.',
    description: 'Chrome extension that enhances your AI chat experience with custom prompts, voice input, and themes.',
    image: '/images/deepseekpro.png',
    category: 'AI Tools',
    features: ['Custom prompts', 'Voice input', 'Theme customization'],
    src: 'https://chromewebstore.google.com/detail/deepseek-pro-custom-promp/noboaggalobomdpdggapfibgodeedkpl',
    featured: true,
    impressions: '96K',
    accent: 'black',
  },
  {
    name: 'Chat with Ai',
    subtitle: 'ChatGPT | DeepSeek | Gemini | Claude | Grok',
    description: 'Open ChatGPT, DeepSeek, Gemini, Claude, and Grok in a sidebar for explain, summarize, grammar fixes, and translation.',
    image: '/images/chatwithai.png',
    category: 'AI Tools',
    features: ['Explain', 'Summarize', 'Fix grammar', 'Translate'],
    src: 'https://chromewebstore.google.com/detail/chat-with-ai-gpt-grok-cla/fpbfpjeeglaaadigkppnnliomndbgiin?authuser=0&hl=en',
    featured: true,
    impressions: '84K',
    accent: 'violet',
  },
  {
    name: 'Claude ToolKit',
    subtitle: 'Custom Prompts | Chat Export, Voice | Notes & Folders',
    description: 'Transform your Claude AI experience with prompts, exports, voice input, notes, and folders.',
    image: '/images/claude.png',
    category: 'AI Tools',
    features: ['Custom prompts', 'Voice input', 'Chat organization'],
    src: 'https://chromewebstore.google.com/detail/claude-toolkit-custom-pro/opnabjgijpbfgloabfopcbmkaegcojeh',
    featured: true,
    impressions: '72K',
    accent: 'indigo',
  },
  {
    name: 'AI Chat Exporter',
    subtitle: 'Save ChatGPT, Claude, Gemini & Deepseek as PDF/TXT/WORD',
    description: 'Export AI conversations into professionally formatted documents with multiple theme styles.',
    image: '/images/chatgpt-to-pdf.png',
    category: 'AI Tools',
    features: ['Multiple themes', 'PDF/DOCX export', 'Multiple AI platforms'],
    src: 'https://chromewebstore.google.com/detail/chatgpt-to-pdf-export-mul/dgkahgofldcancbehocmoiadgijedili',
    impressions: '68K',
    accent: 'pink',
  },
  {
    name: 'Zoomflow',
    subtitle: 'Auto Zoom Screen Recorder & Editor',
    description: 'Record professional screen videos with auto zoom, cursor focus, webcam, and smooth animations.',
    image: '/images/cursor (1).png',
    category: 'Creator Tools',
    features: ['Screen recorder', 'Cursor focus', 'Video editor'],
    src: 'https://chromewebstore.google.com/detail/zoomflow-%E2%80%93-auto-zoom-scre/kodamnchafhpofhdnnijkpbdcknhedmn?authuser=0&hl=en',
    impressions: '42K',
    accent: 'cyan',
  },
  {
    name: 'Leadspry',
    subtitle: 'Discover qualified leads and export clean CSVs.',
    description: 'Find leads across any niche with a powerful Chrome extension for businesses and freelancers.',
    image: '/images/Leadspry.png',
    category: 'Marketing',
    features: ['Email extraction', 'Contact finder', 'Lead organization'],
    src: 'https://chromewebstore.google.com/detail/leadspry-%E2%80%93-find-quality-l/blegkbedbdcoocieacjmpchfmcmdhfce',
    impressions: '38K',
    accent: 'green',
  },
  {
    name: 'WA Group Finder',
    subtitle: 'Find WhatsApp groups tailored to your interests.',
    description: 'Discover WhatsApp groups tailored to your interests with quick category filtering.',
    image: '/images/whatsapplogo.png',
    category: 'Websites',
    features: ['Group discovery', 'Category filtering', 'Quick join'],
    src: 'https://chromewebstore.google.com/detail/wa-group-finder-find-what/dnhlhdlclknabfhnchaldipcidafnodj',
    impressions: '36K',
    accent: 'green',
  },
  {
    name: 'Web Highlighter Pro',
    subtitle: 'Smart highlighting and note-taking for web content.',
    description: 'Save and organize important text from any webpage with multi-color highlighting and smart folders.',
    image: '/images/webhighlighter.png',
    category: 'Productivity',
    features: ['Multi-color highlighting', 'Smart folders', 'Custom notes'],
    src: 'https://chromewebstore.google.com/detail/web-highlighter-pro-smart/phgcbcconbpfhfkopjgoejjbhfgohenm',
    impressions: '32K',
    accent: 'amber',
  },
  {
    name: 'Mobile View Tester',
    subtitle: 'Preview responsive breakpoints and device presets.',
    description: 'Test website responsiveness across 85+ device profiles for mobile-first designs.',
    image: '/images/mobileviewtester.png',
    category: 'Developer Tools',
    features: ['85+ device profiles', 'Instant preview', 'Performance testing'],
    src: 'https://chromewebstore.google.com/detail/mobile-view-tester-respon/lkndpmbcjincdjeddabmkokchnlhgmbi',
    impressions: '22K',
    accent: 'blue',
  },
  {
    name: 'FullPageScreenshot',
    subtitle: 'Capture pixel-perfect, full height screenshots with one click.',
    description: 'Capture complete webpage screenshots with high-quality output and local processing.',
    image: '/images/fullpagescreenshot.png',
    category: 'Utilities',
    features: ['Full page capture', 'Local processing', 'High-quality output'],
    src: 'https://chromewebstore.google.com/detail/fullpagescreenshot-custom/colimbbgbkkmcbkjnnmmpbbhmbcngdcj',
    impressions: '18K',
    accent: 'orange',
  },
  {
    name: 'YouTube Stats Viewer',
    subtitle: 'Instant channel and video analytics.',
    description: 'Display YouTube video statistics with engagement metrics and performance insights.',
    image: '/images/youtubestatsviewer.png',
    category: 'Marketing',
    features: ['Video stats', 'Engagement metrics', 'Performance insights'],
    src: 'https://chromewebstore.google.com/detail/youtube-stats-viewer-like/ilclmifkafialgiepabobbgdnofbbgge',
    impressions: '16K',
    accent: 'red',
  },
  {
    name: 'ImageXtract',
    subtitle: 'Extract text from images with privacy-focused processing.',
    description: 'Extract text from images on the web with a fast, privacy-focused browser workflow.',
    image: '/images/imagextract.png',
    category: 'Productivity',
    features: ['Text extraction', 'Image upload', 'Privacy-focused'],
    src: 'https://chromewebstore.google.com/detail/imagextract-copy-text-fro/enafhefnjpdnhbmccghnphjjlflohpkg',
    impressions: '14K',
    accent: 'teal',
  },
  {
    name: 'SEO CheckUp',
    subtitle: 'One-click audits for meta, indexing, structure, and performance.',
    description: 'Run SEO analysis and get practical recommendations directly from your browser.',
    image: '/images/seocheckup.png',
    category: 'Marketing',
    features: ['SEO analysis', 'Performance insights', 'Traffic improvement'],
    src: 'https://chromewebstore.google.com/detail/seo-checkupimprove-rankin/dddhmflnmblohpbjoabidfpkcdcljljl',
    impressions: '12K',
    accent: 'emerald',
  },
  {
    name: 'CSS Scanly',
    subtitle: 'Inspect styles of any element and copy clean CSS instantly.',
    description: 'View, edit, and copy CSS properties from webpages with real-time preview.',
    image: '/images/cssscanly.png',
    category: 'Developer Tools',
    features: ['CSS inspection', 'Style editing', 'Real-time preview'],
    src: 'https://chromewebstore.google.com/detail/css-scanly-copy-css-tailw/ilklniobjoigkehieijcncgnoemlljmk',
    impressions: '10K',
    accent: 'purple',
  },
  {
    name: 'Filtered YouTube',
    subtitle: 'Customize your YouTube experience with advanced filtering.',
    description: 'Shape your YouTube interface with content filtering, privacy controls, and layout cleanup.',
    image: '/images/filteredyoutube.png',
    category: 'Productivity',
    features: ['Content filtering', 'Interface customization', 'Privacy protection'],
    src: 'https://chromewebstore.google.com/detail/filtered-youtube-remove-y/bkdalkbneidlmnkafimplljdajddmogb',
    impressions: '9K',
    accent: 'rose',
  },
  {
    name: 'MainTab',
    subtitle: 'A minimal new tab with widgets, quick notes, and shortcuts.',
    description: 'A clean tab management extension with organization tools and a privacy-focused workspace.',
    image: '/images/maintab.png',
    category: 'Productivity',
    features: ['Tab management', 'Organization tools', 'Privacy focused'],
    src: 'https://chromewebstore.google.com/detail/maintab-save-memory-manag/ghdkngiknandibhgcfmadapmiapopdel',
    impressions: '8K',
    accent: 'slate',
  },
];

const categories = [
  'All',
  'Browser Extensions',
  'SaaS',
  'Websites',
  'Productivity',
  'Developer Tools',
  'Creator Tools',
  'Utilities',
  'Design',
  'Marketing',
  'AI Tools',
  'Other',
];

const FEATURED_DESCRIPTION_LIMIT = 92;
const SPONSOR_FORM_URL = '/sponsor';
const FEATURED_SPONSOR_FORM_URL = `${SPONSOR_FORM_URL}?plan=featured`;
const DIRECTORY_SPONSOR_FORM_URL = `${SPONSOR_FORM_URL}?plan=directory`;

const chartTabs: Array<{ label: string; value: TrafficChartRange }> = [
  { label: '7 Days', value: '7d' },
  { label: '30 Days', value: '30d' },
  { label: '100 Days', value: '100d' },
  { label: 'All Time', value: 'all' },
];

const defaultTrafficAnalytics: TrafficAnalytics = {
  realtimeUsers: 43,
  source: 'fallback',
  metrics: [
    { value: '1,284', label: 'visitors today', change: '+12%' },
    { value: '64,400', label: 'visitors - Last 30 Days', change: '+34%' },
    { value: '214,800', label: 'visitors - All Time', change: '+42%' },
  ],
  charts: {
    '7d': [
      { label: 'Mon', value: 820 },
      { label: 'Tue', value: 980 },
      { label: 'Wed', value: 910 },
      { label: 'Thu', value: 1150 },
      { label: 'Fri', value: 1260 },
      { label: 'Sat', value: 1040 },
      { label: 'Sun', value: 1380 },
    ],
    '30d': [
      { label: 'Sep 6', value: 4400 },
      { label: 'Sep 11', value: 5200 },
      { label: 'Sep 16', value: 4900 },
      { label: 'Sep 21', value: 6100 },
      { label: 'Sep 26', value: 6800 },
      { label: 'Oct 1', value: 7400 },
    ],
    '100d': [
      { label: 'Jun 28', value: 15400 },
      { label: 'Jul 14', value: 17200 },
      { label: 'Jul 30', value: 18900 },
      { label: 'Aug 15', value: 21400 },
      { label: 'Aug 31', value: 23200 },
      { label: 'Sep 16', value: 24800 },
      { label: 'Oct 2', value: 28400 },
    ],
    all: [
      { label: 'Jan 2026', value: 38000 },
      { label: 'Mar 2026', value: 52000 },
      { label: 'May 2026', value: 71000 },
      { label: 'Jul 2026', value: 96000 },
      { label: 'Sep 2026', value: 128000 },
    ],
  },
  countries: [
    { countryCode: 'US', country: 'United States', percent: 38 },
    { countryCode: 'IN', country: 'India', percent: 12 },
    { countryCode: 'GB', country: 'United Kingdom', percent: 8 },
    { countryCode: 'DE', country: 'Germany', percent: 6 },
    { countryCode: 'CA', country: 'Canada', percent: 5 },
    { countryCode: '', country: 'Others', percent: 31 },
  ],
};

const chartPlot = {
  left: 42,
  right: 642,
  top: 50,
  bottom: 194,
};

const formatTrafficNumber = (value: number) => new Intl.NumberFormat('en-US').format(value);

const getChartTotal = (points: TrafficPoint[]) => points.reduce((sum, point) => sum + point.value, 0);

const getFlagImageUrl = (countryCode: string) => `https://flagcdn.com/w40/${countryCode.toLowerCase()}.png`;

const isValidCountryCode = (countryCode: string) => /^[A-Z]{2}$/.test(countryCode);

const getChartGeometry = (points: TrafficPoint[]) => {
  const safePoints = points.length ? points : defaultTrafficAnalytics.charts['7d'];
  const maxValue = Math.max(...safePoints.map((point) => point.value), 1);
  const widthStep = safePoints.length > 1 ? (chartPlot.right - chartPlot.left) / (safePoints.length - 1) : 0;
  const coordinates = safePoints.map((point, index) => {
    const x = chartPlot.left + index * widthStep;
    const y = chartPlot.bottom - (point.value / maxValue) * (chartPlot.bottom - chartPlot.top);

    return { ...point, x, y };
  });
  const linePath = coordinates.map((point, index) => `${index === 0 ? 'M' : 'L'}${point.x} ${point.y}`).join(' ');
  const areaPath = `${linePath} L${coordinates[coordinates.length - 1].x} 214 L${coordinates[0].x} 214 Z`;
  const peak = coordinates.reduce((highest, point) => (point.value > highest.value ? point : highest), coordinates[0]);
  const tooltipX = Math.min(Math.max(peak.x - 58, 42), 560);
  const tooltipY = Math.max(peak.y - 45, 8);

  return { coordinates, linePath, areaPath, peak, tooltipX, tooltipY };
};

const truncateDescription = (description: string) => {
  if (description.length <= FEATURED_DESCRIPTION_LIMIT) return description;
  return `${description.slice(0, FEATURED_DESCRIPTION_LIMIT).trimEnd()}...`;
};

const matchesProductSearch = (product: Product, query: string) => {
  if (!query) return true;

  const searchableText = [
    product.name,
    product.subtitle || '',
    product.description,
    product.category,
    product.features.join(' '),
  ].join(' ').toLowerCase();

  return searchableText.includes(query);
};

const featuredSponsorSlots: EmptySponsorSlot[] = [
  { id: 'featured-ad-1', title: 'Ad Sponsor', copy: 'Reserve this sponsor slot and promote your product here.' },
  { id: 'featured-ad-2', title: 'Ad Sponsor', copy: 'Reserve this sponsor slot and promote your product here.' },
  { id: 'featured-ad-3', title: 'Ad Sponsor', copy: 'Reserve this sponsor slot and promote your product here.' },
];
const feedSponsorSlots: EmptySponsorSlot[] = [
  { id: 'feed-ad-1', title: 'Ad Sponsor', copy: 'Reserve this sponsor slot.' },
  { id: 'feed-ad-2', title: 'Ad Sponsor', copy: 'Reserve this sponsor slot.' },
  { id: 'feed-ad-3', title: 'Ad Sponsor', copy: 'Reserve this sponsor slot.' },
];

const stats = [
  { label: 'Today', value: '5,842', change: '12%' },
  { label: 'Last 7 Days', value: '32,100', change: '18%' },
  { label: 'Last 30 Days', value: '128,400', change: '24%' },
  { label: 'Last 100 Days', value: '401,230', change: '32%' },
];

const ProductLogo = ({ product, compact = false }: { product: Product; compact?: boolean }) => (
  <div className={`directory-logo directory-logo-${product.accent} ${compact ? 'compact' : ''}`}>
    {product.image.startsWith('/') ? (
      <Image src={product.image} alt={product.name} width={compact ? 54 : 72} height={compact ? 54 : 72} />
    ) : (
      <img src={product.image} alt={product.name} />
    )}
  </div>
);

const sponsorToProduct = (sponsor: SponsorListing): Product => ({
  name: sponsor.product_name,
  subtitle: sponsor.sponsor_name,
  description: sponsor.description,
  image: sponsor.logo_url,
  category: sponsor.category,
  features: [sponsor.plan_type === 'featured' ? 'Featured Sponsor' : 'Directory Sponsor'],
  src: sponsor.product_url,
  impressions: 'Sponsored',
  accent: sponsor.plan_type === 'featured' ? 'blue' : 'cyan',
});

const MiniSparkline = () => (
  <svg className="mini-sparkline" viewBox="0 0 82 28" aria-hidden="true">
    <path d="M2 22 C10 18 14 22 20 17 C27 11 30 18 36 15 C43 11 47 18 54 10 C60 3 66 9 71 4 C75 1 78 0 80 2" />
  </svg>
);

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState('All');
  const [searchTerm, setSearchTerm] = React.useState('');
  const [paidSponsors, setPaidSponsors] = React.useState<SponsorListing[]>([]);
  const [trafficAnalytics, setTrafficAnalytics] = React.useState<TrafficAnalytics>(defaultTrafficAnalytics);
  const [activeChartRange, setActiveChartRange] = React.useState<TrafficChartRange>('7d');
  const [isContactDialogOpen, setIsContactDialogOpen] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    fetch('/api/sponsors/live')
      .then((response) => response.json())
      .then((payload: { listings?: SponsorListing[] }) => {
        if (!cancelled) {
          setPaidSponsors(payload.listings || []);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setPaidSponsors([]);
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    let refreshTimer: ReturnType<typeof setInterval>;

    const loadTrafficAnalytics = () => {
      fetch('/api/analytics/traffic')
      .then((response) => response.json())
      .then((payload: TrafficAnalytics) => {
        if (!cancelled) {
          setTrafficAnalytics(payload);
        }
      })
      .catch(() => {
        if (!cancelled) {
          setTrafficAnalytics(defaultTrafficAnalytics);
        }
      });
    };

    loadTrafficAnalytics();
    refreshTimer = setInterval(loadTrafficAnalytics, 60000);

    return () => {
      cancelled = true;
      clearInterval(refreshTimer);
    };
  }, []);

  const handleProductClick = (productName: string, placement: string) => {
    trackEvent('Products', placement, productName);
  };

  const paidFeaturedSponsors = paidSponsors
    .filter((sponsor) => sponsor.plan_type === 'featured')
    .map(sponsorToProduct);
  const paidDirectorySponsors = paidSponsors
    .filter((sponsor) => sponsor.plan_type === 'directory')
    .map(sponsorToProduct);
  const featuredFallbackCount = Math.max(0, 5 - Math.max(paidFeaturedSponsors.length, 3));
  const feedFallbackCount = Math.max(0, 5 - Math.max(paidDirectorySponsors.length, 3));
  const featuredSponsors = [
    ...products.slice(0, featuredFallbackCount),
    ...paidFeaturedSponsors,
  ].slice(0, 5);
  const sponsoredFeed = [
    ...products.slice(2, 2 + feedFallbackCount),
    ...paidDirectorySponsors,
  ].slice(0, 5);
  const sponsoredProductNames = new Set([
    ...featuredSponsors.map((product) => product.name),
    ...sponsoredFeed.map((product) => product.name),
  ]);
  const recommendedProducts = products.filter((product) => !sponsoredProductNames.has(product.name));
  const normalizedSearch = searchTerm.trim().toLowerCase();
  const visibleFeaturedSponsors = featuredSponsors.filter((product) => matchesProductSearch(product, normalizedSearch));
  const visibleSponsoredFeed = sponsoredFeed.filter((product) => matchesProductSearch(product, normalizedSearch));
  const featuredEmptySlots = normalizedSearch ? [] : featuredSponsorSlots.slice(0, Math.max(0, 5 - featuredSponsors.length));
  const feedEmptySlots = normalizedSearch ? [] : feedSponsorSlots.slice(0, Math.max(0, 5 - sponsoredFeed.length));

  const filteredRecommended = recommendedProducts.filter((product) => {
    const matchesCategory = (() => {
      if (selectedCategory === 'All') return true;
      if (selectedCategory === 'Browser Extensions') return true;
      if (selectedCategory === 'SaaS') return ['AI Tools', 'Marketing', 'Productivity'].includes(product.category);
      if (selectedCategory === 'Design') return product.name === 'CSS Scanly' || product.name === 'Zoomflow';
      if (selectedCategory === 'Other') return !categories.includes(product.category);
      return product.category === selectedCategory;
    })();

    return matchesCategory && matchesProductSearch(product, normalizedSearch);
  });
  const visibleRecommended = filteredRecommended;
  const activeChartPoints = trafficAnalytics.charts[activeChartRange] || defaultTrafficAnalytics.charts[activeChartRange];
  const activeChartLabel = chartTabs.find((tab) => tab.value === activeChartRange)?.label || '7 Days';
  const chartGeometry = getChartGeometry(activeChartPoints);
  const chartTotalViews = getChartTotal(activeChartPoints);
  const activeCountries = trafficAnalytics.countries.length ? trafficAnalytics.countries : defaultTrafficAnalytics.countries;

  return (
    <main className="toolhub-page">
      <header className="toolhub-header">
        <Link href="/Our-products" className="toolhub-brand">
          <span><Hexagon size={19} /></span>
          <strong>Rovelin Directory</strong>
        </Link>
        <nav className="toolhub-nav" aria-label="Directory navigation">
          <a href="#featured">Featured Sponsors</a>
          <a href="#sponsored-feed">Sponsored Feed</a>
          <a href="#recommended">Recommended Products</a>
        </nav>
        <div className="toolhub-actions">
          <label className="directory-search">
            <Search size={16} />
            <input
              type="search"
              placeholder="Search sponsors and products..."
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
          </label>
          <a href={SPONSOR_FORM_URL} className="signin-button">Ad Sponsor</a>
        </div>
      </header>

      <section className="traffic-hero" aria-labelledby="traffic-hero-title">
        <div className="traffic-intro">
          <span className="traffic-eyebrow"><Sparkles size={13} /> Live traffic analytics</span>
          <h1 id="traffic-hero-title">A Growing Directory of Amazing Products</h1>
          <p>Real people. Real traffic. Real opportunities. Join thousands of creators getting discovered on Rovelin Directory.</p>
          <div className="live-browsing">
            <span />
            <strong>{formatTrafficNumber(trafficAnalytics.realtimeUsers)} users browsing right now</strong>
          </div>
          <div className="user-stack" aria-label="Active users">
            {products.slice(0, 6).map((product) => (
              <ProductLogo key={product.name} product={product} compact />
            ))}
            <em>+38</em>
          </div>
        </div>

        <div className="traffic-dashboard">
          <div className="metric-card-row">
            {trafficAnalytics.metrics.map((metric) => (
              <article key={metric.label} className="top-metric-card">
                <div>
                  <strong>{metric.value}</strong>
                  <p>{metric.label}</p>
                </div>
                <span>{metric.change}</span>
                <MiniSparkline />
              </article>
            ))}
          </div>

          <div className="traffic-main-grid">
            <div className="compact-chart-card">
              <div className="compact-tabs">
                {chartTabs.map((item) => (
                  <button
                    key={item.value}
                    className={item.value === activeChartRange ? 'active' : ''}
                    type="button"
                    onClick={() => setActiveChartRange(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <svg className="compact-traffic-chart" viewBox="0 0 720 260" role="img" aria-label="Traffic chart">
                <defs>
                  <linearGradient id="compactTrafficFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#0b6fff" stopOpacity="0.22" />
                    <stop offset="100%" stopColor="#0b6fff" stopOpacity="0.02" />
                  </linearGradient>
                </defs>
                {[50, 98, 146, 194].map((y) => <line key={y} x1="42" y1={y} x2="690" y2={y} />)}
                {[145, 250, 355, 460, 565].map((x) => <line key={x} x1={x} y1="36" x2={x} y2="214" />)}
                <path d={chartGeometry.areaPath} fill="url(#compactTrafficFill)" />
                <path d={chartGeometry.linePath} className="traffic-chart-line" />
                <rect x="456" y="14" width="154" height="54" rx="8" className="chart-tooltip-dark" />
                <text x="472" y="35" className="tooltip-light">{formatTrafficNumber(chartTotalViews)} visitors</text>
                <text x="472" y="52" className="tooltip-light muted">{activeChartLabel}</text>
                {chartGeometry.coordinates.map((point) => (
                  <text key={point.label} x={point.x} y="244" className="chart-day">{point.label}</text>
                ))}
              </svg>
            </div>

            <aside className="traffic-side-metrics countries-card" aria-label="Top countries">
              <div className="countries-card-head">
                <span><Globe2 size={19} /></span>
                <div>
                  <h2>Top Countries</h2>
                  <p>Traffic distribution</p>
                </div>
                <svg className="countries-map" viewBox="0 0 150 72" aria-hidden="true">
                  {[18, 27, 36, 45, 63, 72, 81, 99, 108, 126].map((x, index) => (
                    <circle key={x} cx={x} cy={18 + (index % 4) * 9} r={index % 3 === 0 ? 3 : 2.3} />
                  ))}
                  {[12, 22, 31, 48, 58, 69, 88, 104, 116, 132, 140].map((x, index) => (
                    <circle key={`b-${x}`} cx={x} cy={42 + (index % 3) * 8} r={index % 2 === 0 ? 2.4 : 3} />
                  ))}
                </svg>
              </div>
              {activeCountries.map(({ countryCode, country, percent }) => (
                <article key={country} className="country-row">
                  <span className={`country-flag ${isValidCountryCode(countryCode) ? 'country-flag-image' : 'flag-other'}`} aria-label={`${country} flag`}>
                    {isValidCountryCode(countryCode) ? (
                      <img src={getFlagImageUrl(countryCode)} alt="" loading="lazy" />
                    ) : (
                      <Globe2 size={19} />
                    )}
                  </span>
                  <div>
                    <div className="country-line">
                      <p>{country}</p>
                      <em>{percent}%</em>
                    </div>
                    <span className="country-progress">
                      <span style={{ width: `${percent}%` }} />
                    </span>
                  </div>
                </article>
              ))}
            </aside>
          </div>
        </div>
      </section>

      <section id="featured" className="directory-section">
        <div className="section-heading">
          <div>
            <h2>Featured Sponsors</h2>
            <p>Support innovative products from our sponsors. Get your product in front of thousands of visitors.</p>
          </div>
          <a href={FEATURED_SPONSOR_FORM_URL}>Ad Sponsor <ArrowRight size={15} /></a>
        </div>
        <div className="featured-grid">
          {visibleFeaturedSponsors.map((product, index) => (
            <article key={product.name} className="featured-card">
              <div className="featured-top">
                <ProductLogo product={product} />
                <span>Sponsored</span>
              </div>
              <h3>{product.name}</h3>
              <p title={product.description}>{truncateDescription(product.description)}</p>
              <span className="tag-pill">{product.category}</span>
              <a
                href={product.src}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => handleProductClick(product.name, `Featured Sponsor ${index + 1}`)}
              >
                Visit Product <ArrowRight size={15} />
              </a>
            </article>
          ))}
          {featuredEmptySlots.map((slot) => (
            <a key={slot.id} href={FEATURED_SPONSOR_FORM_URL} className="featured-card empty-sponsor-card">
              <span className="empty-sponsor-icon"><Megaphone size={31} /></span>
              <span className="empty-sponsor-label">Ad Sponsor</span>
              <h3>{slot.title}</h3>
              <p>{slot.copy}</p>
              <span className="empty-sponsor-arrow"><ArrowRight size={18} /></span>
            </a>
          ))}
        </div>
      </section>

      <section id="sponsored-feed" className="directory-section sponsored-feed-section">
        <div className="section-heading compact">
          <div>
            <h2>Sponsored Feed</h2>
            <p>More great products from our sponsors.</p>
          </div>
          <a href={DIRECTORY_SPONSOR_FORM_URL}>Ad Sponsor <ArrowRight size={15} /></a>
        </div>
        <div className="feed-grid">
          {visibleSponsoredFeed.map((product, index) => (
            <a
              key={product.name}
              className="feed-card"
              href={product.src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit ${product.name}`}
              onClick={() => handleProductClick(product.name, `Sponsored Feed ${index + 1}`)}
            >
              <ProductLogo product={product} compact />
              <h3>{product.name}</h3>
            </a>
          ))}
          {feedEmptySlots.map((slot) => (
            <a key={slot.id} href={DIRECTORY_SPONSOR_FORM_URL} className="feed-card empty-feed-card">
              <span className="empty-feed-icon"><Megaphone size={22} /></span>
              <span className="empty-feed-label">Ad Sponsor</span>
              <h3>{slot.title}</h3>
            </a>
          ))}
        </div>
      </section>

      <section id="recommended" className="directory-section">
        <div className="section-heading">
          <div>
            <h2>Recommended Products</h2>
            <p>Handpicked tools and products from our directory.</p>
          </div>
        </div>
        <div className="category-filter">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={selectedCategory === category ? 'active' : ''}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="recommended-grid">
          {visibleRecommended.map((product, index) => (
            <article key={product.name} className="recommended-card">
              <ProductLogo product={product} compact />
              <div className="recommended-content">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="recommended-meta">
                  <span className="tag-pill">{product.category}</span>
                  <span className="tag-pill">{product.features[0]}</span>
                  <a
                    href={product.src}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => handleProductClick(product.name, `Recommended ${index + 1}`)}
                  >
                    Visit <ArrowRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sponsor-plans" className="sponsor-panel">
        <div className="sponsor-panel-copy">
          <h2>Build something great? Put it in front of our audience.</h2>
          <p>Reach thousands of developers, creators and businesses who are actively looking for useful tools.</p>
          <div>
            <a href={SPONSOR_FORM_URL} className="primary-hero-button">Ad Sponsor</a>
            <a href={SPONSOR_FORM_URL} className="secondary-hero-button">Become a Sponsor</a>
          </div>
        </div>
        <div className="plans">
          <h3>Sponsor Plans</h3>
          <p>Get more visibility and reach the right audience.</p>
          <div className="plan-grid">
            {[
              { icon: Star, title: 'Featured Sponsor', price: '$49', copy: 'Showcase at the top of our directory with maximum visibility.', plan: 'featured', popular: true },
              { icon: Zap, title: 'Directory Sponsor', price: '$29', copy: 'Appear in sponsored listings across the directory.', plan: 'directory', popular: false },
            ].map(({ icon: Icon, title, price, copy, plan, popular }) => (
              <article key={title} className={`plan-card ${popular ? 'popular' : ''}`}>
                <span className="plan-card-icon"><Icon size={23} /></span>
                {popular && <span className="popular-badge">Popular</span>}
                <h4>{title}</h4>
                <p>{copy}</p>
                <strong>{price}<span> / week</span></strong>
                <a href={plan === 'featured' ? FEATURED_SPONSOR_FORM_URL : DIRECTORY_SPONSOR_FORM_URL}>
                  Get Started <ArrowRight size={14} />
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <footer className="directory-footer">
        <Link href="/Our-products" className="toolhub-brand">
          <span><Hexagon size={19} /></span>
          <strong>Rovelin Directory</strong>
        </Link>
        <p>Discover useful products. Extensions, websites, SaaS and more.</p>
        <nav aria-label="Footer navigation">
          <Link href="/rovelin-directory-refund-policy">Refund Policy</Link>
          <Link href="/directory-privacy-policy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/about">About</Link>
          <button type="button" onClick={() => setIsContactDialogOpen(true)}>Contact</button>
        </nav>
      </footer>

      {isContactDialogOpen && (
        <div className="contact-dialog-backdrop" role="presentation" onClick={() => setIsContactDialogOpen(false)}>
          <section
            className="contact-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-dialog-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button type="button" className="contact-dialog-close" aria-label="Close contact dialog" onClick={() => setIsContactDialogOpen(false)}>
              <X size={18} />
            </button>
            <h2 id="contact-dialog-title">Contact</h2>
            <p>Reach Rovelin Directory here.</p>
            <div className="contact-dialog-links">
              <a href="mailto:hritikkumarkota@gmail.com?subject=Rovelin%20Directory%20Contact">
                <AtSign size={19} />
                <span>
                  <strong>Email</strong>
                  hritikkumarkota@gmail.com
                </span>
              </a>
              <a href="https://x.com/Hritik7742" target="_blank" rel="noopener noreferrer">
                <Send size={19} />
                <span>
                  <strong>X / Twitter</strong>
                  @Hritik7742
                </span>
              </a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
};

export default Products;
