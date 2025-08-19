"use client";

import '@/app/shared/legal.css';

export default function TermsOfService() {
  return (
    <div className="legal-container">
      <h1>Terms & Conditions</h1>
      <div className="legal-content">
        <div className="legal-header">
          <p><strong>Effective Date:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        <section>
          <p>Welcome to Rovelin. These Terms & Conditions (&quot;Terms&quot;) govern your use of our website (https://rovelin.com), our software products (including Chrome extensions, plugins, mobile apps, and tools), and any related services (collectively, the &quot;Services&quot;). By accessing or using our Services, you agree to comply with these Terms. If you do not agree, you may not use our Services.</p>
        </section>

        <section>
          <h2>1. Use of Services</h2>
          <ul>
            <li>You may use our Services for personal or business purposes, provided you comply with these Terms.</li>
            <li>You agree not to misuse, copy, resell, or exploit our Services in ways that violate applicable laws.</li>
            <li>Some Services may be available through third-party marketplaces (e.g., Chrome Web Store, Play Store,Figma Marketplace,Airtable Marketplace). Your use of those platforms is also subject to their respective policies.</li>
          </ul>
        </section>

        <section>
          <h2>2. Accounts & Access</h2>
          <ul>
            <li>Certain Services may require you to create an account. You must provide accurate and up-to-date information.</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
            <li>Rovelin is not liable for unauthorized access caused by your failure to secure your account.</li>
          </ul>
        </section>

        <section>
          <h2>3. Intellectual Property</h2>
          <ul>
            <li>All software, trademarks, designs, and content provided by Rovelin are the property of Rovelin.</li>
            <li>You may not reverse-engineer, decompile, or distribute our software without permission.</li>
            <li>User-generated content remains yours, but you grant Rovelin a non-exclusive license to use it as needed to operate our Services.</li>
          </ul>
        </section>

        <section>
          <h2>4. Payments & Subscriptions</h2>
          <ul>
            <li>Some Services may be offered for free, while others require payment or subscription.</li>
            <li>Payments are managed through trusted third-party providers (such as Gumroad, Stripe, or marketplace payment systems).</li>
            <li>Subscription renewals, cancellations, and refunds are governed by the payment provider&apos;s policies, unless otherwise stated.</li>
          </ul>
        </section>

        <section>
          <h2>5. Privacy & Data</h2>
          <ul>
            <li>Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your data.</li>
            <li>By using our Services, you consent to our data practices as outlined in the Privacy Policy.</li>
          </ul>
        </section>

        <section>
          <h2>6. Third-Party Services</h2>
          <ul>
            <li>Our Services may integrate with third-party platforms (e.g., Google, HubSpot, Facebook).</li>
            <li>We are not responsible for the content, availability, or practices of third-party services.</li>
          </ul>
        </section>

        <section>
          <h2>7. Disclaimer of Warranties</h2>
          <ul>
            <li>Our Services are provided &quot;as is&quot; without warranties of any kind.</li>
            <li>We do not guarantee that the Services will be error-free, secure, or uninterrupted.</li>
          </ul>
        </section>

        <section>
          <h2>8. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Rovelin shall not be liable for any damages resulting from the use or inability to use our Services.</p>
        </section>

        <section>
          <h2>9. Changes to Terms</h2>
          <p>We may update these Terms from time to time. Continued use of our Services after updates constitutes your acceptance of the revised Terms.</p>
        </section>

        <section>
          <h2>10. Contact</h2>
          <p>If you have any questions about these Terms, please contact us at:</p>
          <div className="contact-info">
            <p>📧 <a href="mailto:hritikkumarkota@gmail.com">hritikkumarkota@gmail.com</a></p>
            <p>🌐 <a href="https://rovelin.com" target="_blank" rel="noopener noreferrer">https://rovelin.com</a></p>
          </div>
        </section>

        <div className="legal-footer">
          <p>Last Modified: {new Date().toLocaleDateString()}</p>
          <p>© {new Date().getFullYear()} Rovelin. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
} 