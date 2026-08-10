import { NextResponse } from "next/server";
import { put, del } from "@vercel/blob";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

function isValidImage(file) {
  if (!file || typeof file === "string") return false;

  return (
    typeof file.type === "string" &&
    file.type.startsWith("image/")
  );
}

// GET
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
      { status: 500 }
    );
  }
}

// POST
export async function POST(request) {
  try {
    console.log("===== POST /api/content =====");

    await connectDB();

    const formData = await request.formData();

    const section = formData.get("section")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const subtitle = formData.get("subtitle")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const numberValue = formData.get("numberValue")?.toString() || "";
    const imageUrl = formData.get("imageUrl")?.toString() || "";

    const image = formData.get("image");

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          error: "Section is required",
        },
        { status: 400 }
      );
    }

    if (!title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required",
        },
        { status: 400 }
      );
    }

    let finalImage = imageUrl;

    // Upload image to Vercel Blob
    if (image && isValidImage(image)) {
      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: "Image must be 5MB or smaller",
          },
          { status: 400 }
        );
      }

      const safeName = image.name
        .replace(/[^a-zA-Z0-9.-]/g, "-")
        .toLowerCase();

      const filename = `content/${Date.now()}-${safeName}`;

      const blob = await put(filename, image, {
        access: "public",
      });

      finalImage = blob.url;

      console.log("Blob uploaded:", finalImage);
    }

    const newContent = await Content.create({
      section,
      title,
      subtitle,
      category,
      link,
      image: finalImage,
      numberValue,
    });

    console.log("Content created:", newContent._id);

    return NextResponse.json(
      {
        success: true,
        data: newContent,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/content ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// PUT
export async function PUT(request) {
  try {
    console.log("===== PUT /api/content =====");

    await connectDB();

    const formData = await request.formData();

    const id = formData.get("id")?.toString();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error: "Content ID is required",
        },
        { status: 400 }
      );
    }

    const existing = await Content.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Content not found",
        },
        { status: 404 }
      );
    }

    const section = formData.get("section")?.toString() || "";
    const title = formData.get("title")?.toString() || "";
    const subtitle = formData.get("subtitle")?.toString() || "";
    const category = formData.get("category")?.toString() || "";
    const link = formData.get("link")?.toString() || "";
    const numberValue =
      formData.get("numberValue")?.toString() || "";
    const imageUrl =
      formData.get("imageUrl")?.toString() || "";

    const image = formData.get("image");

    let finalImage = existing.image || "";

    // New uploaded image
    if (image && isValidImage(image)) {
      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error: "Image must be 5MB or smaller",
          },
          { status: 400 }
        );
      }

      const safeName = image.name
        .replace(/[^a-zA-Z0-9.-]/g, "-")
        .toLowerCase();

      const filename = `content/${Date.now()}-${safeName}`;

      const blob = await put(filename, image, {
        access: "public",
      });

      finalImage = blob.url;

      // Delete old Vercel Blob image
      if (
        existing.image &&
        existing.image.includes("blob.vercel-storage.com")
      ) {
        try {
          await del(existing.image);
        } catch (deleteError) {
          console.warn(
            "Old Blob image could not be deleted:",
            deleteError.message
          );
        }
      }
    } else if (imageUrl) {
      finalImage = imageUrl;
    }

    existing.section = section;
    existing.title = title;
    existing.subtitle = subtitle;
    existing.category = category;
    existing.link = link;
    existing.image = finalImage;
    existing.numberValue = numberValue;

    await existing.save();

    console.log("Content updated:", existing._id);

    return NextResponse.json({
      success: true,
      data: existing,
    });
  } catch (error) {
    console.error("PUT /api/content ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// DELETE
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
        { status: 400 }
      );
    }

    const existing = await Content.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error: "Content not found",
        },
        { status: 404 }
      );
    }

    // Delete Blob image if it belongs to Vercel Blob
    if (
      existing.image &&
      existing.image.includes("blob.vercel-storage.com")
    ) {
      try {
        await del(existing.image);
      } catch (deleteError) {
        console.warn(
          "Blob image could not be deleted:",
          deleteError.message
        );
      }
    }

    await Content.findByIdAndDelete(id);

    console.log("Content deleted:", id);

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
      { status: 500 }
    );
  }
}