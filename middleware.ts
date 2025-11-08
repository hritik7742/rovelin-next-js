import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // The new Next.js blog system handles all /blog routes natively
  // This middleware is no longer needed for blog routes
  // You can add other middleware logic here if needed
  
  return NextResponse.next();
}

export const config = {
  // Update matcher to exclude blog routes since they're handled by Next.js App Router
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - blog (now handled by Next.js App Router)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|blog).*)',
  ],
};