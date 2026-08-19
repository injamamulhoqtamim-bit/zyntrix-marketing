import { NextResponse } from "next/server";

export function middleware(request) {
  const { pathname } = request.nextUrl;

  /*
   * Only protect the actual admin dashboard.
   *
   * /admin/login must remain public.
   */
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    // Allow login page
    if (pathname === "/admin/login") {
      return NextResponse.next();
    }

    const session = request.cookies.get("admin_session")?.value;

    // Not authenticated
    if (session !== "authenticated") {
      const loginUrl = new URL("/admin/login", request.url);

      // Prevent redirect loops
      loginUrl.searchParams.set("redirect", pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};