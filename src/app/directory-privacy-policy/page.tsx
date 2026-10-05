import Link from 'next/link';
import '../sponsor-legal.css';

export const metadata = {
  title: 'Directory Privacy Policy | Rovelin Directory',
  description: 'Privacy policy for Rovelin Directory and sponsor submissions.',
};

export default function DirectoryPrivacyPolicyPage() {
  return (
    <main className="sponsor-legal-page">
      <div className="sponsor-legal-shell">
        <Link href="/Our-products" className="sponsor-legal-back">Back to Rovelin Directory</Link>
        <article className="sponsor-legal-card">
          <header className="sponsor-legal-hero">
            <h1>Directory Privacy Policy</h1>
            <p>How Rovelin Directory handles information for directory listings, sponsor inquiries, and sponsor placements.</p>
          </header>

          <div className="sponsor-legal-content">
            <section>
              <h2>Information We Collect</h2>
              <p>When you submit a product, sponsor request, or inquiry, we may collect your name, email address, product name, website or store link, logo, description, and payment or order reference details.</p>
            </section>

            <section>
              <h2>How We Use Information</h2>
              <ul>
                <li>To review and publish sponsor or directory placements.</li>
                <li>To contact you about your listing, payment, refund request, or required updates.</li>
                <li>To improve Rovelin Directory content, navigation, and sponsor placement quality.</li>
              </ul>
            </section>

            <section>
              <h2>Payments</h2>
              <p>Payments may be processed by third-party providers. We do not store full payment card details on Rovelin Directory. Payment providers may collect and process information according to their own policies.</p>
            </section>

            <section>
              <h2>Sharing</h2>
              <p>We do not sell personal information. Public sponsor listing details, such as product name, logo, category, and product link, may be displayed on Rovelin Directory as part of the purchased placement.</p>
            </section>

            <section>
              <h2>Contact</h2>
              <p>For privacy questions, listing changes, or removal requests, contact us through the Rovelin Directory contact page.</p>
            </section>
          </div>
        </article>
      </div>
    </main>
  );
}
