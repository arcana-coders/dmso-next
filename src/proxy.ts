import { NextRequest, NextResponse } from 'next/server';
import legacyRedirects from '@/data/legacyRedirects.json';

const redirects = legacyRedirects as Record<string, string>;

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname.replace(/\/$/, '') || '/';
  const destination = redirects[pathname];

  if (!destination) return NextResponse.next();

  // Build a fresh URL so legacy query strings such as ?add-to-cart do not
  // survive the redirect to the canonical destination.
  return NextResponse.redirect(new URL(destination, request.url), 301);
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|icon.svg).*)'],
};
