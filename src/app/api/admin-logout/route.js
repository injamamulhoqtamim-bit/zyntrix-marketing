import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully",
    });

    // Delete authentication cookie
    response.cookies.set({
      name: "admin_session",
      value: "",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 0,
    });

    return response;
  } catch (error) {
    console.error("ADMIN LOGOUT ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Logout failed.",
      },
      {
        status: 500,
      }
    );
  }
}