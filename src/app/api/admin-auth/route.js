import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();

    const username = String(body?.username ?? "").trim();
    const password = String(body?.password ?? "");

    const adminUsername = String(
      process.env.ADMIN_USERNAME ?? ""
    ).trim();

    const adminPassword = String(
      process.env.ADMIN_PASSWORD ?? ""
    );

    console.log("========== ADMIN LOGIN DEBUG ==========");
    console.log("Username received:", JSON.stringify(username));
    console.log("Username configured:", JSON.stringify(adminUsername));
    console.log("Username match:", username === adminUsername);
    console.log("Password provided:", password.length > 0);
    console.log("Password length received:", password.length);
    console.log("Password length configured:", adminPassword.length);
    console.log(
      "Password match:",
      password === adminPassword
    );
    console.log("========================================");

    if (!adminUsername || !adminPassword) {
      console.error(
        "ADMIN_USERNAME or ADMIN_PASSWORD is missing."
      );

      return NextResponse.json(
        {
          success: false,
          message:
            "Server authentication is not configured.",
        },
        { status: 500 }
      );
    }

    const isValid =
      username === adminUsername &&
      password === adminPassword;

    if (!isValid) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid username or password.",
        },
        { status: 401 }
      );
    }

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
    });

    response.cookies.set({
      name: "admin_session",
      value: "authenticated",
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    console.log("ADMIN LOGIN SUCCESS");

    return response;
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong.",
      },
      { status: 500 }
    );
  }
}