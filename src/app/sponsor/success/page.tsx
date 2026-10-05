import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import '../sponsor.css';

export default function SponsorSuccessPage() {
  return (
    <main className="sponsor-page">
      <div className="sponsor-shell">
        <section className="sponsor-success-card">
          <span><BadgeCheck size={15} /> Payment received</span>
          <h1>Your sponsor listing is being activated</h1>
          <p>
            Dodo Payments will confirm your subscription through a webhook. Once confirmed,
            your listing will appear automatically in the correct sponsor section.
          </p>
          <Link href="/Our-products" className="sponsor-submit">
            Back to Rovelin Directory <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
