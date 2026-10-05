import Link from 'next/link';
import '../sponsor-legal.css';

export const metadata = {
  title: 'Refund Policy | Rovelin Directory Sponsors',
  description: 'Refund policy for Rovelin Directory Featured Sponsor and Directory Sponsor placements.',
};

export default function RovelinDirectoryRefundPolicyPage() {
  return (
    <main className="sponsor-legal-page">
      <div className="sponsor-legal-shell">
        <Link href="/Our-products" className="sponsor-legal-back">Back to Rovelin Directory</Link>
        <article className="sponsor-legal-card">
          <header className="sponsor-legal-hero">
            <h1>Rovelin Directory Refund Policy</h1>
            <p>Refund terms for Rovelin Directory sponsor placements, including Featured Sponsor and Directory Sponsor listings.</p>
          </header>

          <div className="sponsor-legal-content">
            <section>
              <h2>Refund Window</h2>
              <p className="sponsor-legal-highlight">
                If you request a refund within 1 hour after purchase, we can proceed with the refund review. After 1 hour from purchase, no refund will be processed.
              </p>
            </section>

            <section>
              <h2>Covered Sponsor Plans</h2>
              <p>This refund policy applies to both Rovelin Directory sponsor placement types:</p>
              <ul>
                <li>Featured Sponsor placements</li>
                <li>Directory Sponsor placements</li>
              </ul>
            </section>

            <section>
              <h2>How to Request a Refund</h2>
              <p>Contact us with your purchase details, sponsor plan, purchase time, and the email used during checkout. Requests received after the 1 hour window are not eligible for refund processing.</p>
            </section>

            <section>
              <h2>Placement Changes</h2>
              <p>If you need to update sponsor details, product links, logos, or listing text, contact us as soon as possible. Minor listing corrections may be handled without requiring a refund.</p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
