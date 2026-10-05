import { NextResponse } from 'next/server';
import { fetchVisibleSponsorListings } from '@/lib/sponsors';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const listings = await fetchVisibleSponsorListings();
    return NextResponse.json({ listings });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ listings: [] }, { status: 200 });
  }
}
