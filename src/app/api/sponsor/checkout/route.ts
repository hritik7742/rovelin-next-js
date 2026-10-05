import { NextResponse } from 'next/server';
import { createDodoCheckout } from '@/lib/dodo';
import {
  createSponsorListing,
  sponsorCategories,
  updateSponsorListing,
  uploadSponsorLogo,
  type SponsorPlanType,
} from '@/lib/sponsors';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const plans: SponsorPlanType[] = ['featured', 'directory'];

const getRequiredText = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === 'string' ? value.trim() : '';
};

const isValidUrl = (value: string) => {
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
};

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const planType = getRequiredText(formData, 'plan_type') as SponsorPlanType;
    const submittedSponsorName = getRequiredText(formData, 'sponsor_name');
    const email = getRequiredText(formData, 'email').toLowerCase();
    const productName = getRequiredText(formData, 'product_name');
    const sponsorName = planType === 'directory' ? submittedSponsorName || productName : submittedSponsorName;
    const productUrl = getRequiredText(formData, 'product_url');
    const description = planType === 'directory'
      ? getRequiredText(formData, 'description') || 'Directory sponsor listing.'
      : getRequiredText(formData, 'description');
    const category = planType === 'directory'
      ? getRequiredText(formData, 'category') || 'Other'
      : getRequiredText(formData, 'category');
    const logo = formData.get('logo');

    if (!plans.includes(planType)) {
      return NextResponse.json({ error: 'Choose a valid sponsor plan.' }, { status: 400 });
    }

    if (!email || !productName || !productUrl || (planType === 'featured' && (!sponsorName || !description || !category))) {
      return NextResponse.json({ error: 'Please fill every required field.' }, { status: 400 });
    }

    if (!email.includes('@')) {
      return NextResponse.json({ error: 'Enter a valid email address.' }, { status: 400 });
    }

    if (!isValidUrl(productUrl)) {
      return NextResponse.json({ error: 'Enter a valid product URL.' }, { status: 400 });
    }

    if (!sponsorCategories.includes(category)) {
      return NextResponse.json({ error: 'Choose a valid product category.' }, { status: 400 });
    }

    if (description.length > 140) {
      return NextResponse.json({ error: 'Keep the description under 140 characters.' }, { status: 400 });
    }

    if (!(logo instanceof File) || logo.size === 0) {
      return NextResponse.json({ error: 'Upload a product logo.' }, { status: 400 });
    }

    const logoUrl = await uploadSponsorLogo(logo);
    const listing = await createSponsorListing({
      sponsor_name: sponsorName,
      email,
      product_name: productName,
      product_url: productUrl,
      logo_url: logoUrl,
      description,
      category,
      plan_type: planType,
      status: 'checkout_started',
      raw_checkout: null,
    });

    const checkout = await createDodoCheckout({
      listingId: listing.id,
      planType,
      email,
      sponsorName,
    });

    await updateSponsorListing(listing.id, {
      dodo_checkout_session_id: checkout.session_id,
      dodo_payment_id: checkout.payment_id || null,
      raw_checkout: checkout,
    });

    if (!checkout.checkout_url) {
      return NextResponse.json({ error: 'Dodo did not return a checkout URL.' }, { status: 502 });
    }

    return NextResponse.json({ checkoutUrl: checkout.checkout_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Sponsor checkout failed.' },
      { status: 500 },
    );
  }
}
