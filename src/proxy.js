import { NextResponse } from "next/server";

export function proxy(request) {
  const { pathname } = request.nextUrl;

  /*
   * Protect only actual admin routes.
   * /admin/login must remain public.
   */
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    // Allow login page
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