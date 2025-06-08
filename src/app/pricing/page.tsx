"use client";

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  const handleGumroadClick = () => {
    window.open('https://hritikkumarkota.gumroad.com/', '_blank');
  };

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Flexible Pricing for Every Need</h1>
        <p className="subtitle">
          We offer a range of software solutions and applications tailored to your needs
        </p>
      </div>

      <div className="pricing-content">
        <div className="pricing-card main-card">
          <div className="card-content">
            <h2>Our Products on Gumroad</h2>
            <p>
              Find detailed pricing information and purchase our products directly through our Gumroad store.
              We offer various pricing tiers and licensing options to suit different needs and budgets.
            </p>
            <ul className="benefits-list">
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Flexible pricing plans
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Secure payment processing
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Instant delivery
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Global payment support
              </li>
            </ul>
            <button onClick={handleGumroadClick} className="cta-button">
              View Pricing on Gumroad
              <ArrowRight size={16} />
            </button>
          </div>
        </div>

        <div className="pricing-card contact-card">
          <div className="card-content">
            <h2>Custom Solutions</h2>
            <p>
              Need a custom solution or have specific requirements? Contact us for personalized pricing
              and detailed information about our products and services.
            </p>
            <ul className="benefits-list">
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Tailored solutions
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Custom feature development
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Priority support
              </li>
              <li>
                <svg className="check-icon" viewBox="0 0 24 24">
                  <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                </svg>
                Flexible payment options
              </li>
            </ul>
            <Link href="/contact" className="cta-button">
              Contact Us
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How do I get started?</h3>
            <p>Visit our Gumroad store to purchase our products or contact us for custom solutions. After purchase, you will receive instant access to your chosen product along with detailed setup instructions.</p>
          </div>
          
          <div className="faq-item">
            <h3>What payment methods do you accept?</h3>
            <p>Through Gumroad, we accept all major credit cards, PayPal, and various international payment methods, ensuring a secure and convenient purchase process for customers worldwide.</p>
          </div>

          <div className="faq-item">
            <h3>What is your refund policy?</h3>
            <p>Our refund policy varies by product. Some products offer a 7-day refund window, while others may have different terms or no refund option. Please check the specific product description on Gumroad for detailed refund terms before purchasing.</p>
          </div>

          <div className="faq-item">
            <h3>Why do you use Gumroad for payments?</h3>
            <p>We chose Gumroad for its robust digital product delivery system, secure payment processing, and excellent customer support. While they do take a commission, their platform provides us with reliable tax handling, easy refund management, and a trusted shopping experience for our customers worldwide.</p>
          </div>

          <div className="faq-item">
            <h3>Is purchasing through Gumroad secure?</h3>
            <p>Yes, absolutely! Gumroad is a trusted platform that processes millions of transactions. They use industry-standard encryption, comply with global security standards, and protect both buyers and sellers with their secure payment infrastructure.</p>
          </div>

          <div className="faq-item">
            <h3>Need help choosing?</h3>
            <p>If you are unsure which solution best fits your needs, dont hesitate to contact us. We are here to help you make the right choice and can provide detailed information about any products features and capabilities.</p>
          </div>
        </div>
      </div>
    </div>
  );
}