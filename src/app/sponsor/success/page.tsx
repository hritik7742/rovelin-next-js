import Link from 'next/link';
import { ArrowRight, BadgeCheck } from 'lucide-react';
import { getDodoCheckoutSessionStatus, getDodoPayment, getDodoSubscription } from '@/lib/dodo';
import { fetchSponsorListing, updateSponsorListing, type SponsorStatus } from '@/lib/sponsors';
import '../sponsor.css';

export const dynamic = 'force-dynamic';

type SponsorSuccessPageProps = {
  searchParams?: Promise<{ listing_id?: string | string[] }>;
};

type ActivationResult = {
  status: 'confirmed' | 'pending';
  title: string;
  message: string;
};

const getListingId = async (searchParams: SponsorSuccessPageProps['searchParams']) => {
  const params = searchParams ? await searchParams : undefined;
  const listingId = params?.listing_id;
  return Array.isArray(listingId) ? listingId[0] : listingId;
};

const statusFromDodoStatus = (status?: string | null): SponsorStatus | null => {
  if (!status) return null;

  const normalizedStatus = status.toLowerCase();

  if (['active', 'succeeded', 'success', 'paid'].includes(normalizedStatus)) {
    return 'live';
  }

  if (['cancelled', 'canceled'].includes(normalizedStatus)) {
    return 'cancelled';
  }

  if (normalizedStatus === 'expired') {
    return 'expired';
  }

  if (normalizedStatus === 'past_due') {
    return 'past_due';
  }

  if (['failed', 'failure'].includes(normalizedStatus)) {
    return 'failed';
  }

  return null;
};

const confirmSponsorListing = async (listingId?: string): Promise<ActivationResult> => {
  const pendingResult = {
    status: 'pending' as const,
    title: 'Your sponsor listing is being activated',
    message: 'Dodo Payments will confirm your subscription through a webhook. Once confirmed, your listing will appear automatically in the correct sponsor section.',
  };

  if (!listingId) return pendingResult;

  try {
    const listing = await fetchSponsorListing(listingId);

    if (!listing) return pendingResult;
    if (listing.status === 'live') {
      return {
        status: 'confirmed',
        title: 'Your sponsor listing is live',
        message: 'Your payment is confirmed and your sponsor listing is now active in Rovelin Directory.',
      };
    }

    if (!listing.dodo_checkout_session_id) return pendingResult;

    const checkout = await getDodoCheckoutSessionStatus(listing.dodo_checkout_session_id);
    const payment = checkout.payment_id ? await getDodoPayment(checkout.payment_id) : null;
    const subscriptionId = payment?.subscription_id || payment?.subscription_ids?.[0] || null;
    const subscription = subscriptionId ? await getDodoSubscription(subscriptionId) : null;
    const resolvedStatus = statusFromDodoStatus(subscription?.status) || statusFromDodoStatus(payment?.status) || statusFromDodoStatus(checkout.payment_status);

    if (resolvedStatus !== 'live') return pendingResult;

    await updateSponsorListing(listingId, Object.fromEntries(Object.entries({
      status: 'live',
      dodo_payment_id: payment?.payment_id || checkout.payment_id || listing.dodo_payment_id,
      dodo_subscription_id: subscriptionId || listing.dodo_subscription_id,
      current_period_end: subscription?.next_billing_date || listing.current_period_end,
      raw_webhook: {
        type: 'checkout.session.confirmed',
        source: 'success_page_check',
        data: {
          checkout,
          payment,
          subscription,
        },
      },
    }).filter(([, value]) => value !== null && value !== undefined)));

    return {
      status: 'confirmed',
      title: 'Your sponsor listing is live',
      message: 'Your payment is confirmed and your sponsor listing is now active in Rovelin Directory.',
    };
  } catch (error) {
    console.error(error);
    return pendingResult;
  }
};

export default async function SponsorSuccessPage({ searchParams }: SponsorSuccessPageProps) {
  const activation = await confirmSponsorListing(await getListingId(searchParams));

  return (
    <main className="sponsor-page">
      <div className="sponsor-shell">
        <section className="sponsor-success-card">
          <span><BadgeCheck size={15} /> {activation.status === 'confirmed' ? 'Payment confirmed' : 'Payment received'}</span>
          <h1>{activation.title}</h1>
          <p>{activation.message}</p>
          <Link href="/Our-products" className="sponsor-submit">
            Back to Rovelin Directory <ArrowRight size={17} />
          </Link>
        </section>
      </div>
    </main>
  );
}
