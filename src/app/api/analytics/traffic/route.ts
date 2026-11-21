import { NextResponse } from 'next/server';
import { getTrafficAnalytics } from '@/lib/google-analytics-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  const analytics = await getTrafficAnalytics();

  return NextResponse.json(analytics, {
    headers: {
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=86400',
    },
  });
}
