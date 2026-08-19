import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  // Only protect admin routes
  if (pathname.startsWith("/admin")) {
    // Login page must remain public
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    // Check authentication cookie
    const session = request.cookies.get("admin_session")?.value;

    // User is not authenticated
    if (session !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);

      // Remember where the user wanted to go
      loginUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};