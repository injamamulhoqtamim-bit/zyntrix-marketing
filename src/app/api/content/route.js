import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

// GET
export async function GET(request) {
  try {
    console.log("===== GET /api/content =====");

    await connectDB();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    let data;

    if (section) {
      data = await Content.find({ section }).sort({ createdAt: -1 });
    } else {
      data = await Content.find({}).sort({ createdAt: -1 });
    }

    return NextResponse.json({
      success: true,
      data,
    });

  } catch (err) {
    console.error("GET ERROR:");
    console.error(err);

    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack,
    }, {
      status: 500,
    });
  }
}

// POST
export async function POST(request) {
  try {
    console.log("===== POST /api/content =====");

    await connectDB();

    const contentType = request.headers.get("content-type") || "";
    let body = {};

    // FormData বা ফাইল আপলোড হ্যান্ডেল করার জন্য
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      for (const [key, value] of formData.entries()) {
        body[key] = value;
      }

      // যদি ইমেজ ফাইল অবজেক্ট হিসেবে আসে
      if (body.image && typeof body.image === "object") {
        body.image = body.image.name ? `/uploads/${body.image.name}` : "";
      }
    } else {
      // সাধারণ JSON ডেটার জন্য
      body = await request.json();
    }

    const newContent = await Content.create(body);

    return NextResponse.json({
      success: true,
      data: newContent,
    });

  } catch (err) {
    console.error("POST ERROR:");
    console.error(err);

    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack,
    }, {
      status: 500,
    });
  }
}

// DELETE
export async function DELETE(request) {
  try {
    console.log("===== DELETE /api/content =====");

    await connectDB();

    const { searchParams } = new URL(request.url);

    const id = searchParams.get("id");

    await Content.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });

  } catch (err) {
    console.error("DELETE ERROR:");
    console.error(err);

    return NextResponse.json({
      success: false,
      error: err.message,
    }, {
      status: 500,
    });
  }
}