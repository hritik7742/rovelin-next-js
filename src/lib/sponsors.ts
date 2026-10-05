export type SponsorPlanType = 'featured' | 'directory';
export type SponsorStatus = 'draft' | 'checkout_started' | 'live' | 'cancelled' | 'past_due' | 'expired' | 'removed' | 'failed';

export interface SponsorListing {
  id: string;
  sponsor_name: string;
  email: string;
  product_name: string;
  product_url: string;
  logo_url: string;
  description: string;
  category: string;
  plan_type: SponsorPlanType;
  status: SponsorStatus;
  dodo_checkout_session_id?: string | null;
  dodo_subscription_id?: string | null;
  dodo_payment_id?: string | null;
  current_period_end?: string | null;
  created_at?: string;
  updated_at?: string;
}

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_BUCKET = process.env.SUPABASE_SPONSOR_LOGOS_BUCKET || 'sponsor-logos1';

const assertServerEnv = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('Missing Supabase server environment variables.');
  }
};

const supabaseHeaders = {
  apikey: SUPABASE_SERVICE_ROLE_KEY || '',
  Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY || ''}`,
};

export const sponsorCategories = [
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

export const getPlanProductId = (planType: SponsorPlanType) => {
  const productId = planType === 'featured'
    ? process.env.DODO_FEATURED_SPONSOR_PRODUCT_ID
    : process.env.DODO_DIRECTORY_SPONSOR_PRODUCT_ID;

  if (!productId) {
    throw new Error(`Missing Dodo product id for ${planType} plan.`);
  }

  return productId;
};

export const uploadSponsorLogo = async (file: File) => {
  assertServerEnv();

  if (!['image/png', 'image/jpeg', 'image/webp'].includes(file.type)) {
    throw new Error('Logo must be a PNG, JPG, or WEBP image.');
  }

  if (file.size > 3 * 1024 * 1024) {
    throw new Error('Logo must be 3MB or smaller.');
  }

  const extension = file.type === 'image/png' ? 'png' : file.type === 'image/webp' ? 'webp' : 'jpg';
  const filePath = `${crypto.randomUUID()}.${extension}`;
  const uploadUrl = `${SUPABASE_URL}/storage/v1/object/${SUPABASE_BUCKET}/${filePath}`;
  const uploadResponse = await fetch(uploadUrl, {
    method: 'POST',
    headers: {
      ...supabaseHeaders,
      'Content-Type': file.type,
      'x-upsert': 'false',
    },
    body: await file.arrayBuffer(),
  });

  if (!uploadResponse.ok) {
    const details = await uploadResponse.text();
    throw new Error(`Logo upload failed: ${details}`);
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${SUPABASE_BUCKET}/${filePath}`;
};

export const createSponsorListing = async (
  listing: Omit<SponsorListing, 'id' | 'status'> & { status: SponsorStatus; raw_checkout?: unknown },
) => {
  assertServerEnv();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/sponsor_listings`, {
    method: 'POST',
    headers: {
      ...supabaseHeaders,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(listing),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sponsor listing insert failed: ${details}`);
  }

  const rows = await response.json() as SponsorListing[];
  return rows[0];
};

export const updateSponsorListing = async (
  id: string,
  updates: Partial<SponsorListing> & { raw_checkout?: unknown; raw_webhook?: unknown },
) => {
  assertServerEnv();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/sponsor_listings?id=eq.${encodeURIComponent(id)}`, {
    method: 'PATCH',
    headers: {
      ...supabaseHeaders,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sponsor listing update failed: ${details}`);
  }

  const rows = await response.json() as SponsorListing[];
  return rows[0] || null;
};

export const updateSponsorListingBySubscription = async (
  subscriptionId: string,
  updates: Partial<SponsorListing> & { raw_webhook?: unknown },
) => {
  assertServerEnv();

  const response = await fetch(`${SUPABASE_URL}/rest/v1/sponsor_listings?dodo_subscription_id=eq.${encodeURIComponent(subscriptionId)}`, {
    method: 'PATCH',
    headers: {
      ...supabaseHeaders,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify(updates),
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sponsor listing subscription update failed: ${details}`);
  }

  const rows = await response.json() as SponsorListing[];
  return rows[0] || null;
};

export const fetchVisibleSponsorListings = async () => {
  assertServerEnv();

  const response = await fetch(
    `${SUPABASE_URL}/rest/v1/sponsor_listings?select=*&status=in.(live,cancelled)&order=created_at.asc`,
    {
      headers: supabaseHeaders,
      cache: 'no-store',
    },
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Sponsor listing fetch failed: ${details}`);
  }

  const listings = await response.json() as SponsorListing[];
  const now = Date.now();

  return listings.filter((listing) => (
    listing.status === 'live'
    || (listing.status === 'cancelled' && listing.current_period_end && Date.parse(listing.current_period_end) >= now)
  ));
};
