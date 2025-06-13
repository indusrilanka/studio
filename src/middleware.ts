import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true'; // In real app, verify a secure token

  const { pathname } = request.nextUrl;

  // If trying to access an app page and not authenticated, redirect to login
  if (pathname.startsWith('/dashboard') && !isAuthenticated) {
    return NextResponse.redirect(new URL('/', request.url)); // Redirect to login page (root)
  }

  // If authenticated and trying to access login page, redirect to dashboard
  // The root page IS the login page in this setup.
  // If user is authenticated and on '/', let them proceed (or redirect them to /dashboard if needed).
  // This example keeps it simple: / is login, /dashboard/* is protected.
  // If you had a dedicated /login path and / was something else:
  // if (isAuthenticated && pathname === '/login') {
  //   return NextResponse.redirect(new URL('/dashboard', request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images folder)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images).*)',
  ],
};
