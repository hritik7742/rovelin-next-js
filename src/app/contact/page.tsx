"use client";


import { Twitter, Instagram, Mail, ArrowRight } from 'lucide-react';

export default function Contact() {
  const handleRedirectToForm = () => {
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSeAwnSHHZ1686-yW1QIqKwmu6mVL94ZWIi-LH_DBHva6k_s-Q/viewform?usp=sharing&ouid=114816121424926640815', '_blank');
  };

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open('https://mail.google.com/mail/?view=cm&fs=1&to=hritikkumarkota@gmail.com', '_blank');
  };

  return (
    <div className="contact-container">
      <h1>Get in Touch</h1>
      <p className="contact-subtitle">Connect with us through our social channels or submit your request through our form.</p>
      
      <div className="social-links-container">
        <a href="https://x.com/Rovelin_studio" target="_blank" rel="noopener noreferrer" className="social-link twitter">
          <Twitter size={24} />
          <span>Follow us on Twitter</span>
          <ArrowRight size={16} className="arrow-icon" />
        </a>
        
        <a href="https://www.instagram.com/rovelin_studio/" target="_blank" rel="noopener noreferrer" className="social-link instagram">
          <Instagram size={24} />
          <span>Follow us on Instagram</span>
          <ArrowRight size={16} className="arrow-icon" />
        </a>

        <a href="https://discord.gg/bDpEvQ9cXD" target="_blank" rel="noopener noreferrer" className="social-link discord">
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03z"/>
          </svg>
          <span>Join our Discord</span>
          <ArrowRight size={16} className="arrow-icon" />
        </a>

        <a href="https://t.me/+8aCxpczlf3oxZDJl" target="_blank" rel="noopener noreferrer" className="social-link telegram">
          <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
            <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
          </svg>
          <span>Join our Telegram</span>
          <ArrowRight size={16} className="arrow-icon" />
        </a>
        
        <a href="#" onClick={handleEmailClick} className="social-link email">
          <Mail size={24} />
          <span>Send us an Email</span>
          <ArrowRight size={16} className="arrow-icon" />
        </a>
      </div>

      <div className="contact-form-section">
        <h2>Have a Specific Request?</h2>
        <p>Fill out our form and we will get back to you as soon as possible.</p>
        <button onClick={handleRedirectToForm} className="google-form-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.5 3h-15A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zm-15 1.5h15v15h-15v-15z" fill="currentColor"/>
            <path d="M16.5 9h-9v1.5h9V9zm-9 3h9v1.5h-9V12zm6 3h-6v1.5h6V15z" fill="currentColor"/>
          </svg>
          Open Google Form
        </button>
      </div>

      
    </div>
  );
} 