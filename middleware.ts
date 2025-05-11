import { NextRequest, NextResponse } from 'next/server';

// Define protected paths that require authentication
const protectedPaths = ['/admin', '/instructor', '/cart',
    '/learning', '/my-courses', '/payment'];

// Define public paths that don't require authentication
const publicPaths = ['/auth'];

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Get token from cookies - no change needed as we're already using cookies here
    const token = request.cookies.get('access_token')?.value;

    // Check if path is protected
    const isProtectedPath = protectedPaths.some((path) => {
        return pathname === path || pathname.startsWith(`${path}/`);
    });

    // Check if path is public
    const isPublicPath = publicPaths.some((path) =>
        pathname.startsWith(path)
    );

    let roles: string[] = [];
    if (token) {
        try {
            const payloadBase64 = token.split('.')[1];
            const payloadJson = atob(payloadBase64);
            const payload = JSON.parse(payloadJson);
            roles = payload.scope || [];
        } catch (error) {
            console.error('Invalid JWT:', error);
        }
    }

    // Example: Restrict /admin only to ROLE_admin
    if (pathname.startsWith('/admin') && !roles.includes('ROLE_admin')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname === '/instructor' || pathname.startsWith(`/instructor/`) && !roles.includes('ROLE_instructor')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    if (pathname.startsWith('/requests') && !roles.includes('ROLE_admin')
        && !roles.includes('ROLE_staff')) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    // Redirect unauthenticated users to login
    if (isProtectedPath && !token) {
        const url = new URL('/login', request.url);
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
    }

    // Redirect authenticated users away from login
    if (isPublicPath && token) {
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|manifest.webmanifest|favicon.ico|sitemap.xml|robots.txt|.*\\.png|.*\\.jpg|.*\\.jpeg$).*)',
  ],
};
