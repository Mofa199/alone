import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define a user type for type safety
interface User {
  role: 'student' | 'admin';
}

export function middleware(request: NextRequest) {
  const isAuthenticated = request.cookies.get('synapse-med-auth')?.value === 'true';
  const userCookie = request.cookies.get('synapse-med-user')?.value;

  const { pathname } = request.nextUrl;

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    if (!isAuthenticated) {
      // Not logged in, redirect to auth page
      return NextResponse.redirect(new URL('/auth', request.url));
    }

    // Logged in, check role
    try {
      const user: User = userCookie ? JSON.parse(userCookie) : null;
      if (user?.role !== 'admin') {
        // Not an admin, redirect to homepage
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      // Cookie is malformed, treat as unauthenticated
      return NextResponse.redirect(new URL('/auth', request.url));
    }
  }

  // For all other routes, just check if the user is authenticated
  if (!isAuthenticated && !pathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/auth', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
