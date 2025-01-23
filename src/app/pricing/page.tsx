"use client";

import { useState } from 'react';

interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  isPopular?: boolean;
  gumroadLink?: string;
}

interface Product {
  name: string;
  plans: Plan[];
}

interface Products {
  [key: string]: Product;
}

const products: Products = {
  leadspry: {
    name: 'Leadspry',
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: 'forever',
        features: [
          'Up to 15 leads data',
          'Basic lead information',
          'CSV export',
          'Community support'
        ]
      },
      {
        name: 'Monthly',
        price: '$9.99',
        period: 'per month',
        features: [
          'Unlimited leads data',
          'Advanced lead information',
          'Multiple export formats',
          'Priority support',
          'Regular updates',
          'License key via Gumroad'
        ],
        isPopular: true,
        gumroadLink: 'https://hritikkumarkota.gumroad.com/l/leadspry'
      },
      {
        name: '6 Months',
        price: '$59.94',
        period: '6 months',
        features: [
          'All Monthly plan features',
          'Save 16% ($10 off)',
          'Extended support',
          'Priority updates',
          'License key via Gumroad'
        ],
        gumroadLink: 'https://hritikkumarkota.gumroad.com/l/leadspry'
      }
    ]
  },
  wagroupfinder: {
    name: 'WA Group Finder',
    plans: [
      {
        name: 'Free',
        price: '$0',
        period: 'forever',
        features: [
          'Limited group search',
          'Basic filters',
          'Community support',
          'Standard features'
        ]
      },
      {
        name: 'Monthly',
        price: '$5',
        period: 'per month',
        features: [
          'Unlimited group search',
          'Advanced filters',
          'Priority support',
          'Regular updates',
          'License key via Gumroad'
        ],
        isPopular: true,
        gumroadLink: 'https://hritikkumarkota.gumroad.com/l/psyhyd'
      },
      {
        name: '6 Months',
        price: '$30',
        period: '6 months',
        features: [
          'All Monthly plan features',
          'Save on 6-month access',
          'Priority support',
          'Regular updates',
          'License key via Gumroad'
        ],
        gumroadLink: 'https://hritikkumarkota.gumroad.com/l/psyhyd'
      }
    ]
  }
};

export default function Pricing() {
  const [selectedProduct, setSelectedProduct] = useState('leadspry');

  const handleProductSelect = (productName: string) => {
    setSelectedProduct(productName);
  };

  return (
    <div className="pricing-container">
      <div className="pricing-header">
        <h1>Choose Your Plan</h1>
        <p>Select a product to view pricing</p>
        
        <div className="product-selector">
          <select 
            value={selectedProduct} 
            onChange={(e) => handleProductSelect(e.target.value)}
            className="product-select"
          >
            {Object.entries(products).map(([key, product]) => (
              <option key={key} value={key}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="pricing-grid">
        {products[selectedProduct].plans.map((plan, index) => (
          <div 
            key={index} 
            className={`pricing-card ${plan.isPopular ? 'popular' : ''}`}
          >
            {plan.isPopular && <div className="popular-tag">Most Popular</div>}
            <div className="plan-header">
              <h2>{plan.name}</h2>
              <div className="price">
                <span className="amount">{plan.price}</span>
                <span className="period">{plan.period}</span>
              </div>
            </div>

            <ul className="features-list">
              {plan.features.map((feature, idx) => (
                <li key={idx}>
                  <svg className="check-icon" viewBox="0 0 24 24">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>

            {plan.gumroadLink ? (
              <a 
                href={plan.gumroadLink}
                target="_blank"
                rel="noopener noreferrer"
                className="plan-button"
              >
                Purchase on Gumroad
              </a>
            ) : (
              <button className="plan-button free-plan">
                Get Started Free
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="pricing-faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-grid">
          <div className="faq-item">
            <h3>How does the license key work?</h3>
            <p>After purchasing through Gumroad, you&apos;ll receive a license key. Enter this key in the extension settings to unlock premium features.</p>
          </div>
          <div className="faq-item">
            <h3>Can I upgrade my plan?</h3>
            <p>Yes, you can upgrade to a higher plan at any time. Simply purchase the new plan and enter the new license key.</p>
          </div>
          <div className="faq-item">
            <h3>Do you offer refunds?</h3>
            <p>Yes, we offer a 30-day money-back guarantee if you&apos;re not satisfied with your purchase.</p>
          </div>
        </div>
      </div>
    </div>
  );
} 