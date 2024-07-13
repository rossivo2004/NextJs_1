// middleware.js
export function middleware(request) {
  const currentUserCookie = request.cookies.get('currentUser')?.value;
  const currentUser = currentUserCookie ? JSON.parse(currentUserCookie) : null;

  if (currentUser) {
    const { role } = currentUser;

    if (role === 'admin' && !request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/admin', request.url));
    }

    if (role !== 'admin' && request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/', request.url));
    }
  } else {
    if (!request.nextUrl.pathname.startsWith('/login')) {
      return Response.redirect(new URL('/login', request.url));
    }
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
