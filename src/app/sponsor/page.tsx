"use client";

import React from 'react';
import {
  ArrowRight,
  Building2,
  Crown,
  FileText,
  Info,
  Link as LinkIcon,
  Mail,
  Megaphone,
  Package,
  Tag,
  UploadCloud,
} from 'lucide-react';
import './sponsor.css';

const categories = [
  'AI Tools',
  'Developer Tools',
  'Productivity',
  'Marketing',
  'Creator Tools',
  'Utilities',
  'Websites',
  'Design',
  'SaaS',
  'Other',
];

const plans = [
  {
    id: 'featured',
    title: 'Featured Sponsor',
    price: '$49 / week',
    description: 'Large sponsor card in the Featured Sponsors section.',
  },
  {
    id: 'directory',
    title: 'Directory Sponsor',
    price: '$29 / week',
    description: 'Compact sponsor tile in the Sponsored Feed section.',
  },
];

export default function SponsorPage() {
  const [selectedPlan, setSelectedPlan] = React.useState('featured');
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState('');
  const isFeaturedPlan = selectedPlan === 'featured';

  React.useEffect(() => {
    const plan = new URLSearchParams(window.location.search).get('plan');
    if (plan === 'featured' || plan === 'directory') {
      setSelectedPlan(plan);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const form = event.currentTarget;
      const formData = new FormData(form);
      formData.set('plan_type', selectedPlan);

      const response = await fetch('/api/sponsor/checkout', {
        method: 'POST',
        body: formData,
      });
      const payload = await response.json() as { checkoutUrl?: string; error?: string };

      if (!response.ok || !payload.checkoutUrl) {
        throw new Error(payload.error || 'Unable to create checkout.');
      }

      window.location.href = payload.checkoutUrl;
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Something went wrong.');
      setIsSubmitting(false);
    }
  };

  return (
    <main className="sponsor-page">
      <div className="sponsor-shell">
        <section className="sponsor-layout">
          <form className="sponsor-form" onSubmit={handleSubmit}>
            <div className="plan-options" role="radiogroup" aria-label="Sponsor plan">
              {plans.map((plan) => (
                <button
                  key={plan.id}
                  type="button"
                  className={selectedPlan === plan.id ? 'active' : ''}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  <span className="plan-icon">
                    {plan.id === 'featured' ? <Crown size={28} /> : <Megaphone size={28} />}
                  </span>
                  <span className="plan-copy">
                    <strong>{plan.title}</strong>
                    <b>{plan.price.replace(' / ', ' / ')}</b>
                    <em>{plan.description}</em>
                  </span>
                  <span className="plan-radio" aria-hidden="true" />
                </button>
              ))}
            </div>

            <div className="form-grid">
              {isFeaturedPlan && (
                <label>
                  Sponsor Name
                  <span className="input-shell">
                    <Building2 size={18} />
                    <input name="sponsor_name" required maxLength={80} placeholder="Your name or company" />
                  </span>
                </label>
              )}
              <label>
                Email
                <span className="input-shell">
                  <Mail size={18} />
                  <input name="email" type="email" required placeholder="you@example.com" />
                </span>
              </label>
              <label>
                Product Name
                <span className="input-shell">
                  <Package size={18} />
                  <input name="product_name" required maxLength={60} placeholder="Product name" />
                </span>
              </label>
              <label>
                Product URL
                <span className="input-shell">
                  <LinkIcon size={18} />
                  <input name="product_url" type="url" required placeholder="https://example.com" />
                </span>
              </label>
              {isFeaturedPlan && (
                <label>
                  Category
                  <span className="input-shell">
                    <Tag size={18} />
                    <select name="category" required defaultValue="AI Tools">
                      {categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </span>
                </label>
              )}
              <label className="logo-field">
                Product Logo
                <span><UploadCloud size={17} /> PNG, JPG, or WEBP up to 3MB</span>
                <span className="file-shell">
                  <input name="logo" type="file" accept="image/png,image/jpeg,image/webp" required />
                </span>
              </label>
              {isFeaturedPlan && (
                <label className="full">
                  Short Description
                  <span className="textarea-shell">
                    <FileText size={18} />
                    <textarea name="description" required maxLength={140} placeholder="Describe your product in one short sentence." />
                  </span>
                </label>
              )}
            </div>

            <p className="sponsor-policy-note">
              <Info size={17} />
              Refunds are available only within 1 hour after purchase. Weekly sponsor subscriptions can be cancelled through Dodo Payments. Email hritikkumarkota@gmail.com for help.
            </p>

            {error && <p className="sponsor-error">{error}</p>}

            <button className="sponsor-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Creating checkout...' : 'Continue to Payment'} <ArrowRight size={17} />
            </button>
          </form>
        </section>
      </div>
    </main>
  );
}
