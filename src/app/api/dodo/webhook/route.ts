import { NextResponse } from 'next/server';
import { verifyDodoWebhook, type DodoWebhookPayload } from '@/lib/dodo';
import { updateSponsorListing, updateSponsorListingBySubscription, type SponsorStatus } from '@/lib/sponsors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const getString = (value: unknown) => (typeof value === 'string' && value.trim() ? value.trim() : null);

const getNestedString = (data: Record<string, unknown>, paths: string[][]) => {
  for (const path of paths) {
    let current: unknown = data;

    for (const part of path) {
      if (!current || typeof current !== 'object') {
        current = null;
        break;
      }

      current = (current as Record<string, unknown>)[part];
    }

    const value = getString(current);
    if (value) return value;
  }

  return null;
};

const statusForEvent = (eventType: string): SponsorStatus | null => {
  if (['payment.succeeded', 'subscription.active', 'subscription.renewed', 'subscription.updated'].includes(eventType)) {
    return 'live';
  }

  if (eventType === 'subscription.cancelled') {
    return 'cancelled';
  }

  if (eventType === 'subscription.expired') {
    return 'expired';
  }

  if (eventType === 'subscription.past_due') {
    return 'past_due';
  }

  if (['payment.failed', 'subscription.failed'].includes(eventType)) {
    return 'failed';
  }

  if (eventType === 'refund.succeeded') {
    return 'removed';
  }

  return null;
};

export async function POST(request: Request) {
  const rawBody = await request.text();
  const verified = verifyDodoWebhook({
    rawBody,
    webhookId: request.headers.get('webhook-id'),
    webhookTimestamp: request.headers.get('webhook-timestamp'),
    webhookSignature: request.headers.get('webhook-signature'),
  });

  if (!verified) {
    return NextResponse.json({ error: 'Invalid webhook signature.' }, { status: 401 });
  }

  let payload: DodoWebhookPayload;

  try {
    payload = JSON.parse(rawBody) as DodoWebhookPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid webhook JSON.' }, { status: 400 });
  }

  const eventType = payload.type;
  const status = statusForEvent(eventType);

  if (!status) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const data = (payload.data || {}) as Record<string, unknown>;
  const listingId = getNestedString(data, [
    ['metadata', 'sponsor_listing_id'],
    ['payment_metadata', 'sponsor_listing_id'],
    ['subscription_metadata', 'sponsor_listing_id'],
    ['checkout_metadata', 'sponsor_listing_id'],
  ]);
  const subscriptionIdPaths = [
    ['subscription_id'],
    ['subscription', 'subscription_id'],
    ['subscription', 'id'],
  ];
  const subscriptionId = getNestedString(
    data,
    eventType.startsWith('subscription.') ? [...subscriptionIdPaths, ['id']] : subscriptionIdPaths,
  );
  const paymentId = getNestedString(data, [
    ['payment_id'],
    ['payment', 'payment_id'],
    ['payment', 'id'],
  ]);
  const currentPeriodEnd = getNestedString(data, [
    ['current_period_end'],
    ['current_period_ends_at'],
    ['next_billing_date'],
    ['next_charge_at'],
    ['renews_at'],
    ['expires_at'],
    ['billing', 'next_billing_date'],
  ]);

  const updates = Object.fromEntries(Object.entries({
    status,
    dodo_subscription_id: subscriptionId,
    dodo_payment_id: paymentId,
    current_period_end: currentPeriodEnd,
    raw_webhook: payload,
  }).filter(([, value]) => value !== null && value !== undefined));

  if (listingId) {
    await updateSponsorListing(listingId, updates);
  } else if (subscriptionId) {
    await updateSponsorListingBySubscription(subscriptionId, updates);
  }

  return NextResponse.json({ ok: true });
}
