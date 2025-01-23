"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showProductsMenu, setShowProductsMenu] = useState(false);
  const productsMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (productsMenuRef.current && !productsMenuRef.current.contains(event.target as Node)) {
        setShowProductsMenu(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    // Handle body scroll when sidebar is open
    if (isOpen) {
      document.body.classList.add('menu-open');
    } else {
      document.body.classList.remove('menu-open');
    }

    return () => {
      document.body.classList.remove('menu-open');
    };
  }, [isOpen]);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-brand">
          <h1>Rovelin Studio</h1>
        </Link>

        {/* Mobile Menu Button */}
        <button 
          className="menu-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation */}
        <div className="nav-links desktop-nav">
          <Link href="/">Home</Link>
          <Link href="/services">Services</Link>
          <div 
            className="products-dropdown"
            ref={productsMenuRef}
            onMouseEnter={() => setShowProductsMenu(true)}
            onMouseLeave={() => setShowProductsMenu(false)}
          >
            <button className="products-button">
              Products <ChevronDown size={16} />
            </button>
            {showProductsMenu && (
              <div className="dropdown-menu">
                <Link href="/Our-products" className="dropdown-item">
                  Chrome Extensions
                </Link>
                <Link href="/tools" className="dropdown-item">
                  Free Tools
                </Link>
              </div>
            )}
          </div>
          <Link href="/pricing">Pricing</Link>
          <Link href="/contact" className="nav-cta">Contact Us</Link>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`mobile-menu ${isOpen ? 'open' : ''}`}>
          <div className="mobile-menu-content">
            <div className="mobile-links">
              <Link href="/" onClick={() => setIsOpen(false)}>Home</Link>
              <Link href="/services" onClick={() => setIsOpen(false)}>Services</Link>
              <Link href="/Our-products" onClick={() => setIsOpen(false)}>Chrome Extensions</Link>
              <Link href="/tools" onClick={() => setIsOpen(false)}>Free Tools</Link>
              <Link href="/pricing" onClick={() => setIsOpen(false)}>Pricing</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="nav-cta">
                Contact Us
              </Link>
            </div>
            
            {/* Social Links */}
            <div className="mobile-social">
              <p>Join our community:</p>
              <div className="social-links">
                <a 
                  href="YOUR_DISCORD_INVITE_LINK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link discord"
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
                  </svg>
                  Discord
                </a>
                <a 
                  href="YOUR_TELEGRAM_INVITE_LINK" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="social-link telegram"
                >
                  <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                    <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                  </svg>
                  Telegram
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;