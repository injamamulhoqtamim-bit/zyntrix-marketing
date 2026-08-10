import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

export async function GET(request) {
  try {
    console.log("===== GET /api/content =====");

    await connectDB();

    const { searchParams } = new URL(request.url);
    const section = searchParams.get("section");

    const query = section ? { section } : {};

    const data = await Content.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("GET /api/content ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    console.log("===== POST /api/content =====");

    await connectDB();

    const body = await request.json();

    const newContent = await Content.create(body);

    return NextResponse.json(
      {
        success: true,
        data: newContent,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("POST /api/content ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}

export async function DELETE(request) {
  try {
    console.log("===== DELETE /api/content =====");

    await connectDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Content ID is required",
        },
        {
          status: 400,
        }
      );
    }

    await Content.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("DELETE /api/content ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}