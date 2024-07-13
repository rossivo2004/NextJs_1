export function middleware(request) {
  const currentUserCookie = request.cookies.get('user')?.value;
  const currentUser = currentUserCookie ? JSON.parse(currentUserCookie) : null;

  const { pathname } = request.nextUrl;

  // Nếu chưa đăng nhập và cố gắng truy cập /admin, chuyển hướng đến /login
  if (!currentUser && pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/', request.url));
  }

  // Nếu đã đăng nhập với role là user và cố gắng truy cập /admin, chuyển hướng đến /
  if (currentUser && currentUser.role !== 'admin' && pathname.startsWith('/admin')) {
    return Response.redirect(new URL('/', request.url));
  }

  // Nếu đã đăng nhập với role là admin và cố gắng truy cập /, chuyển hướng đến /admin
  if (currentUser && currentUser.role === 'admin' && pathname === '/') {
    return Response.redirect(new URL('/admin', request.url));
  }

  // Nếu đã đăng nhập với role là user và cố gắng truy cập /login, chuyển hướng đến /
  if (currentUser && currentUser.role === 'user' && pathname === '/login') {
    return Response.redirect(new URL('/', request.url));
  }

  // Nếu đã đăng nhập với role là admin và cố gắng truy cập /login, chuyển hướng đến /admin
  if (currentUser && currentUser.role === 'admin' && pathname === '/login') {
    return Response.redirect(new URL('/admin', request.url));
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
