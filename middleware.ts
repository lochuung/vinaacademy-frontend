import {NextRequest, NextResponse} from 'next/server';

// Define protected paths that require authentication
const protectedPaths = ['/admin', '/instructor', '/cart',
    '/learning', '/my-courses', '/payment'];

// Define public paths that don't require authentication
const publicPaths = ['/auth'];

export function middleware(request: NextRequest) {
    const {pathname} = request.nextUrl;

    // Get token from cookies
    const token = request.cookies.get('access_token')?.value;

    // Check if path is protected
    const isProtectedPath = protectedPaths.some((path) =>
        pathname.startsWith(path)
    );

    // Check if path is public
    const isPublicPath = publicPaths.some((path) =>
        pathname.startsWith(path)
    );

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

// export const config = {
//     // Matcher for paths to apply the middleware to
//     matcher: [
//         /*
//          * Match all request paths except:
//          * - api routes
//          * - static files (e.g. images, js, css, etc.)
//          * - favicon.ico
//          */
//         '/((?!api|_next/static|_next/image|favicon.ico).*)',
//     ],
// };