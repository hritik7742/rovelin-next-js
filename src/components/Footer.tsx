"use client";

import Link from 'next/link';
import { Mail } from 'lucide-react';

export default function Footer() {
  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hritikkumarkota@gmail.com', '_blank');
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-main">
          <div className="footer-brand">
            <h2>ROVELIN</h2>
            <p className="tagline">Empowering the Future, One Solution at a Time.</p>
            <p className="contact-bio">
              At Rovelin Studio, our mission is to develop innovative software, apps, and extensions 
              that solve global challenges and create meaningful impact.
            </p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h3>Quick Links</h3>
              <ul>
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/Our-products">Products</Link></li>
                <li><Link href="/pricing">Pricing</Link></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h3>Legal</h3>
              <ul>
                <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                <li><Link href="/terms">Terms of Service</Link></li>
                <li><Link href="/contact">Contact Us</Link></li>
              </ul>
            </div>

            <div className="footer-section">
              <h3>Contact</h3>
              <ul>
                <li>
                  <a href="#" onClick={handleEmailClick} className="footer-email-link">
                    <Mail size={16} />
                    <span>Email Us</span>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="copyright">© {new Date().getFullYear()} Rovelin Studio. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
} 