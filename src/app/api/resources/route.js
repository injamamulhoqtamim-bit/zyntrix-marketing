import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Resource from "@/models/Resource";

export async function GET() {
  try {
    console.log("Connecting to MongoDB...");

    await connectDB();

    console.log("MongoDB Connected");

    const resources = await Resource.find({});

    console.log(resources);

    return NextResponse.json(
      {
        success: true,
        data: resources,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("GET ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();

    const body = await request.json();

    const resource = await Resource.create(body);

    return NextResponse.json(
      {
        success: true,
        data: resource,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST ERROR:");
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
        stack: error.stack,
      },
      { status: 500 }
    );
  }
}