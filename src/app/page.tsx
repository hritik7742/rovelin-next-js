"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Users, Star } from 'lucide-react';
import '@/app/styles/stats.css';

// Import images (we'll need to move these to public directory)
const heroProducts = [
  {
    name: 'AI Chat Exporter',
    description: 'Transform your ChatGPT, Claude, Gemini & Deepseek conversations into professionally formatted documents. Export chats instantly in PDF, Word (DOCX), and TXT formats with multiple theme styles and custom formatting options.',
    image: '/images/chatgpt-to-pdf.png',
    src: 'https://chromewebstore.google.com/detail/chatgpt-to-pdf-export-mul/dgkahgofldcancbehocmoiadgijedili'
  },
  {
    name: 'DeepSeek Pro',
    description: 'DeepSeek Pro is a powerful Chrome extension that enhances your AI chat experience with custom prompts, voice input, themes, and organizational features. Streamline your AI interactions with advanced customization options.',
    image: '/images/deepseekpro.png',
    src: 'https://chromewebstore.google.com/detail/deepseek-pro-custom-promp/noboaggalobomdpdggapfibgodeedkpl'
  },
  {
    name: 'Gemini Prime',
    description: 'Gemini Prime enhances your AI chat experience with 165+ custom prompts, voice input, instant chat from webpages, and a powerful note-taking system. Organize and optimize your AI interactions like never before.',
    image: '/images/gemini.png',
    src: 'https://chromewebstore.google.com/detail/gemini-prime-165+custom-a/fejdghiopnhlijknlolkceklimkeopoe'
  },
  {
    name: 'Leadspry',
    description: 'LeadSpry is a powerful Chrome extension designed to help businesses and freelancers efficiently find leads across any niche. Collect valuable contact information and generate high-quality leads quickly and efficiently.',
    image: '/images/Leadspry.png',
    src: 'https://chromewebstore.google.com/detail/leadspry-%E2%80%93-find-quality-l/blegkbedbdcoocieacjmpchfmcmdhfce'
  }
];

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    rating: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => 
        prevSlide === heroProducts.length - 1 ? 0 : prevSlide + 1
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Animate statistics when component mounts
    const animationDuration = 2000; // 2 seconds
    const steps = 50;
    const interval = animationDuration / steps;

    const targetStats = {
      users: 15000,
      rating: 4.8
    };

    let currentStep = 0;

    const animation = setInterval(() => {
      if (currentStep >= steps) {
        clearInterval(animation);
        setAnimatedStats(targetStats);
        return;
      }

      setAnimatedStats(() => ({
       
        users: Math.floor((targetStats.users / steps) * currentStep),
        rating: Number(((targetStats.rating / steps) * currentStep).toFixed(1))
        
      }));

      currentStep++;
    }, interval);

    return () => clearInterval(animation);
  }, []);

  return (
    <div className="mainbox">
      <main>
        <section className="hero-slider">
          {heroProducts.map((product, index) => (
            <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
              <div className="content">
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <button 
                  className="cta"
                  onClick={() => window.location.href = product.src}
                >
                  DOWNLOAD EXTENSION
                </button>
              </div>
              <div className="logo">
                <Image 
                  src={product.image}
                  alt={`${product.name} Logo`}
                  width={400}
                  height={300}
                  priority={index === 0}
                />
              </div>
            </div>
          ))}
          <div className="slider-dots">
            {heroProducts.map((_, index) => (
              <button
                key={index}
                className={`dot ${currentSlide === index ? 'active' : ''}`}
                onClick={() => setCurrentSlide(index)}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </section>

        <section className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <Users className="stat-icon" size={32} />
              <div className="stat-number">{animatedStats.users.toLocaleString()}+</div>
              <div className="stat-label">Active Users</div>
              <div className="stat-description">Trust our extensions worldwide</div>
            </div>
            <div className="stat-card">
              <Star className="stat-icon" size={32} />
              <div className="stat-number">{animatedStats.rating}</div>
              <div className="stat-label">Average Rating</div>
              <div className="stat-description">Highly rated extensions on Chrome Web Store</div>
            </div>
          </div>
          <div className="stats-cta">
            <Link href="/Our-products" className="cta">
              Explore Our Products
            </Link>
          </div>
        </section>

        <section className="services-preview">
          <h2>Our Services</h2>
          <p>Professional Development Solutions for Your Business Needs</p>
          <div className="services-preview-grid">
            <div className="service-preview-card">
              <div className="service-icon">🌐</div>
              <h3>Website Development</h3>
              <p>Custom-built, responsive websites tailored to your business needs.</p>
              <Link href="/services" className="learn-more">Learn More →</Link>
            </div>
            <div className="service-preview-card">
              <div className="service-icon">🧩</div>
              <h3>Chrome Extensions</h3>
              <p>Professional Chrome extension development to enhance browser functionality.</p>
              <Link href="/services" className="learn-more">Learn More →</Link>
            </div>
            <div className="service-preview-card">
              <div className="service-icon">📱</div>
              <h3>Application Development</h3>
              <p>Full-stack application development services for web and mobile platforms.</p>
              <Link href="/services" className="learn-more">Learn More →</Link>
            </div>
          </div>
          <div className="services-cta">
            <Link href="/services" className="cta">View All Services</Link>
          </div>
        </section>

        <div className="who_we_are">
          <h1>Who are we?</h1>
          <div className="image-container">
            <Image 
              src="/images/web.jpg"
              alt="Rovelin Studio Illustration"
              width={800}
              height={400}
            />
          </div>
          <p>
            We are Rovelin Studio, an agency driven by the mission to solve global problems through innovative solutions. We specialize in developing apps, extensions, and software that make a meaningful impact worldwide. Our goal is to create value and positively influence people&apos;s lives through our work.
          </p>
          <Link href="/about" className="btn">READ MORE</Link>
        </div>

        <Link href="/Our-products">View Our Products</Link>
      </main>
    </div>
  );
}
