import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Request Body:", body);

    const { username, password } = body;

    console.log("ENV Username:", process.env.ADMIN_USERNAME);
    console.log("ENV Password:", process.env.ADMIN_PASSWORD);

    if (
      username === process.env.ADMIN_USERNAME &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.json({
        success: true,
        message: "Login successful",
      });
    }

    return NextResponse.json(
      {
        success: false,
        message: "Invalid username or password",
      },
      { status: 401 }
    );
  } catch (error) {
    console.error("ADMIN AUTH ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}