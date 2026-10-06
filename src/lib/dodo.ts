import crypto from 'crypto';
import type { SponsorPlanType } from './sponsors';
import { getPlanProductId } from './sponsors';

type DodoEnvironment = 'test_mode' | 'live_mode';

export interface DodoCheckoutResponse {
  session_id: string;
  checkout_url?: string | null;
  payment_id?: string | null;
}

export interface DodoWebhookPayload {
  type: string;
  timestamp?: string;
  data?: Record<string, unknown>;
  [key: string]: unknown;
}

export interface DodoCheckoutSessionStatus {
  id: string;
  created_at?: string;
  customer_email?: string | null;
  customer_name?: string | null;
  payment_id?: string | null;
  payment_status?: string | null;
}

export interface DodoPaymentDetails {
  payment_id: string;
  status?: string | null;
  subscription_id?: string | null;
  subscription_ids?: string[] | null;
  checkout_session_id?: string | null;
  metadata?: Record<string, unknown> | null;
  [key: string]: unknown;
}

export interface DodoSubscriptionDetails {
  subscription_id: string;
  status?: string | null;
  next_billing_date?: string | null;
  [key: string]: unknown;
}

const getDodoBaseUrl = () => {
  const environment = (process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode') as DodoEnvironment;
  return environment === 'live_mode' ? 'https://live.dodopayments.com' : 'https://test.dodopayments.com';
};

const getSiteUrl = () => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return siteUrl.replace(/\/$/, '');
};

const getDodoApiKey = () => {
  const apiKey = process.env.DODO_PAYMENTS_API_KEY;

  if (!apiKey) {
    throw new Error('Missing Dodo Payments API key.');
  }

  return apiKey;
};

const dodoRequest = async <T>(path: string) => {
  const response = await fetch(`${getDodoBaseUrl()}/${path}`, {
    headers: {
      Authorization: `Bearer ${getDodoApiKey()}`,
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Dodo request failed: ${details}`);
  }

  return response.json() as Promise<T>;
};

export const createDodoCheckout = async ({
  listingId,
  planType,
  email,
  sponsorName,
}: {
  listingId: string;
  planType: SponsorPlanType;
  email: string;
  sponsorName: string;
}) => {
  const siteUrl = getSiteUrl();
  const response = await fetch(`${getDodoBaseUrl()}/checkouts`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${getDodoApiKey()}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      product_cart: [{ product_id: getPlanProductId(planType), quantity: 1 }],
      customer: {
        email,
        name: sponsorName,
      },
      metadata: {
        sponsor_listing_id: listingId,
        plan_type: planType,
      },
      return_url: `${siteUrl}/sponsor/success?listing_id=${listingId}`,
      cancel_url: `${siteUrl}/sponsor?cancelled=1`,
      feature_flags: {
        allow_customer_editing_email: false,
        allow_customer_editing_name: true,
      },
      customization: {
        theme: 'light',
      },
    }),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Dodo checkout creation failed: ${details}`);
  }

  return response.json() as Promise<DodoCheckoutResponse>;
};

export const getDodoCheckoutSessionStatus = (sessionId: string) => (
  dodoRequest<DodoCheckoutSessionStatus>(`checkouts/${encodeURIComponent(sessionId)}`)
);

export const getDodoPayment = (paymentId: string) => (
  dodoRequest<DodoPaymentDetails>(`payments/${encodeURIComponent(paymentId)}`)
);

export const getDodoSubscription = (subscriptionId: string) => (
  dodoRequest<DodoSubscriptionDetails>(`subscriptions/${encodeURIComponent(subscriptionId)}`)
);

const normalizeWebhookSecret = (secret: string) => {
  const rawSecret = secret.startsWith('whsec_') ? secret.slice('whsec_'.length) : secret;
  return Buffer.from(rawSecret, 'base64');
};

const parseSignatures = (signatureHeader: string) => signatureHeader
  .split(' ')
  .flatMap((part) => part.split(','))
  .map((part) => part.trim())
  .filter(Boolean)
  .map((part) => part.replace(/^v1[=,]/, ''))
  .filter((part) => part && part !== 'v1');

const safeCompareBase64 = (expected: string, received: string) => {
  const expectedBuffer = Buffer.from(expected);
  const receivedBuffer = Buffer.from(received);

  if (expectedBuffer.length !== receivedBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(expectedBuffer, receivedBuffer);
};

export const verifyDodoWebhook = ({
  rawBody,
  webhookId,
  webhookTimestamp,
  webhookSignature,
}: {
  rawBody: string;
  webhookId: string | null;
  webhookTimestamp: string | null;
  webhookSignature: string | null;
}) => {
  const secret = process.env.DODO_WEBHOOK_SECRET;

  if (!secret) {
    throw new Error('Missing Dodo webhook secret.');
  }

  if (!webhookId || !webhookTimestamp || !webhookSignature) {
    return false;
  }

  const timestampSeconds = Number(webhookTimestamp);
  const nowSeconds = Math.floor(Date.now() / 1000);

  if (!Number.isFinite(timestampSeconds) || Math.abs(nowSeconds - timestampSeconds) > 5 * 60) {
    return false;
  }

  const signedPayload = `${webhookId}.${webhookTimestamp}.${rawBody}`;
  const expectedSignature = crypto
    .createHmac('sha256', normalizeWebhookSecret(secret))
    .update(signedPayload)
    .digest('base64');

  return parseSignatures(webhookSignature).some((signature) => safeCompareBase64(expectedSignature, signature));
};
