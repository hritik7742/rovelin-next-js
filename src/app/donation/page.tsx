import './donation.css';

export default function DonationPage() {
  return (
    <div className="donation-page">
      <section className="donation-hero">
        <div className="donation-hero-inner">
          <span className="donation-badge">Support Rovelin Studio</span>
          <h1>Fuel the tools you love</h1>
          <p>
            Your donation keeps our extensions, tools, and courses improving every month.
            Every contribution helps us ship faster and stay independent.
          </p>
          <div className="donation-actions">
            <a
              className="donation-cta"
              href="https://hritikkumarkota.gumroad.com/l/donations"
              target="_blank"
              rel="noopener noreferrer"
            >
              Donate on Gumroad
            </a>
            <a className="donation-secondary" href="/Our-products">
              Explore our products
            </a>
          </div>
          <div className="donation-proof">
            <div className="proof-card">
              <span className="proof-label">Community</span>
              <p>15,000+ users trust Rovelin tools</p>
            </div>
            <div className="proof-card">
              <span className="proof-label">Monthly releases</span>
              <p>New features and fixes shipped weekly</p>
            </div>
            <div className="proof-card">
              <span className="proof-label">Secure checkout</span>
              <p>Payments handled by Gumroad</p>
            </div>
          </div>
        </div>
      </section>

      <section className="donation-grid">
        <div className="donation-panel">
          <h2>Where your support goes</h2>
          <ul>
            <li>Building new Chrome extensions and tools</li>
            <li>Maintaining servers and premium APIs</li>
            <li>Designing better experiences for every release</li>
          </ul>
        </div>
        <div className="donation-panel accent">
          <h2>Ready to help?</h2>
          <p>
            Click below to contribute. You will be redirected to Gumroad to complete
            your donation securely.
          </p>
          <a
            className="donation-cta large"
            href="https://hritikkumarkota.gumroad.com/l/donations"
            target="_blank"
            rel="noopener noreferrer"
          >
            Donate now
          </a>
        </div>
      </section>
    </div>
  );
}
