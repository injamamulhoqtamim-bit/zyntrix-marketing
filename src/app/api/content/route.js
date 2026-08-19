import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { put, del } from "@vercel/blob";
import connectDB from "@/lib/mongodb";
import Content from "@/models/Content";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

/* =========================================================
   AUTHENTICATION
========================================================= */

async function isAdminAuthenticated() {
  try {
    const cookieStore = await cookies();

    const session = cookieStore.get("admin_session")?.value;

    return session === "authenticated";
  } catch (error) {
    console.error("AUTH CHECK ERROR:", error);

    return false;
  }
}

/* =========================================================
   IMAGE VALIDATION
========================================================= */

function isValidImage(file) {
  if (!file || typeof file === "string") {
    return false;
  }

  return (
    typeof file.type === "string" &&
    file.type.startsWith("image/")
  );
}

/* =========================================================
   BLOB IMAGE CHECK
========================================================= */

function isVercelBlobUrl(url) {
  if (!url || typeof url !== "string") {
    return false;
  }

  return (
    url.includes("blob.vercel-storage.com") ||
    url.includes(".public.blob.vercel-storage.com")
  );
}

/* =========================================================
   POST/PUT/DELETE AUTH HELPER
========================================================= */

async function requireAdmin() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json(
      {
        success: false,
        error: "Unauthorized. Please login as admin.",
      },
      {
        status: 401,
      }
    );
  }

  return null;
}

/* =========================================================
   GET
   PUBLIC API
========================================================= */

export async function GET(request) {
  try {
    console.log("===== GET /api/content =====");

    await connectDB();

    const { searchParams } = new URL(request.url);

    const section = searchParams.get("section");

    const query = section
      ? { section }
      : {};

    const data = await Content.find(query)
      .sort({
        createdAt: -1,
      })
      .lean();

    return NextResponse.json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(
      "GET /api/content ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error: "Failed to load content.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   POST
   ADMIN ONLY
========================================================= */

export async function POST(request) {
  try {
    console.log("===== POST /api/content =====");

    /* ---------------- AUTH CHECK ---------------- */

    const authError = await requireAdmin();

    if (authError) {
      return authError;
    }

    /* ---------------- DATABASE ---------------- */

    await connectDB();

    /* ---------------- FORM DATA ---------------- */

    const formData = await request.formData();

    const section =
      formData.get("section")?.toString() || "";

    const title =
      formData.get("title")?.toString() || "";

    const subtitle =
      formData.get("subtitle")?.toString() || "";

    const category =
      formData.get("category")?.toString() || "";

    const link =
      formData.get("link")?.toString() || "";

    const numberValue =
      formData.get("numberValue")?.toString() || "";

    const imageUrl =
      formData.get("imageUrl")?.toString() || "";

    const image = formData.get("image");

    /* ---------------- VALIDATION ---------------- */

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          error: "Section is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error: "Title is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ---------------- IMAGE ---------------- */

    let finalImage = imageUrl;

    /* ---------------- UPLOAD IMAGE ---------------- */

    if (image && isValidImage(image)) {
      /* File size */

      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Image must be 5MB or smaller.",
          },
          {
            status: 400,
          }
        );
      }

      /* Safe filename */

      const safeName = image.name
        .replace(
          /[^a-zA-Z0-9.-]/g,
          "-"
        )
        .toLowerCase();

      const filename =
        `content/${Date.now()}-${safeName}`;

      /* Upload to Vercel Blob */

      const blob = await put(
        filename,
        image,
        {
          access: "public",
          storeId:
            process.env.MEDIA_STORE_ID,
        }
      );

      finalImage = blob.url;

      console.log(
        "Blob uploaded:",
        finalImage
      );
    }

    /* ---------------- CREATE CONTENT ---------------- */

    const newContent =
      await Content.create({
        section,
        title: title.trim(),
        subtitle,
        category,
        link,
        image: finalImage,
        numberValue,
      });

    console.log(
      "Content created:",
      newContent._id
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Content created successfully.",
        data: newContent,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error(
      "POST /api/content ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to create content.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   PUT
   ADMIN ONLY
========================================================= */

export async function PUT(request) {
  try {
    console.log("===== PUT /api/content =====");

    /* ---------------- AUTH CHECK ---------------- */

    const authError = await requireAdmin();

    if (authError) {
      return authError;
    }

    /* ---------------- DATABASE ---------------- */

    await connectDB();

    /* ---------------- FORM DATA ---------------- */

    const formData = await request.formData();

    const id =
      formData.get("id")?.toString();

    /* ---------------- ID VALIDATION ---------------- */

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Content ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ---------------- FIND CONTENT ---------------- */

    const existing =
      await Content.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Content not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* ---------------- FORM VALUES ---------------- */

    const section =
      formData.get("section")?.toString() ||
      "";

    const title =
      formData.get("title")?.toString() ||
      "";

    const subtitle =
      formData.get("subtitle")?.toString() ||
      "";

    const category =
      formData.get("category")?.toString() ||
      "";

    const link =
      formData.get("link")?.toString() ||
      "";

    const numberValue =
      formData
        .get("numberValue")
        ?.toString() || "";

    const imageUrl =
      formData
        .get("imageUrl")
        ?.toString() || "";

    const image =
      formData.get("image");

    /* ---------------- VALIDATION ---------------- */

    if (!section) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Section is required.",
        },
        {
          status: 400,
        }
      );
    }

    if (!title.trim()) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Title is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ---------------- EXISTING IMAGE ---------------- */

    let finalImage =
      existing.image || "";

    /* =================================================
       NEW FILE UPLOAD
    ================================================= */

    if (
      image &&
      isValidImage(image)
    ) {
      /* File size */

      if (image.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            success: false,
            error:
              "Image must be 5MB or smaller.",
          },
          {
            status: 400,
          }
        );
      }

      /* Safe filename */

      const safeName =
        image.name
          .replace(
            /[^a-zA-Z0-9.-]/g,
            "-"
          )
          .toLowerCase();

      const filename =
        `content/${Date.now()}-${safeName}`;

      /* Upload new image */

      const blob =
        await put(
          filename,
          image,
          {
            access: "public",
            storeId:
              process.env.MEDIA_STORE_ID,
          }
        );

      finalImage = blob.url;

      console.log(
        "New Blob uploaded:",
        finalImage
      );

      /* ---------------------------------------------
         DELETE OLD VERCEL BLOB
      --------------------------------------------- */

      if (
        existing.image &&
        isVercelBlobUrl(
          existing.image
        )
      ) {
        try {
          await del(
            existing.image
          );

          console.log(
            "Old Blob deleted:",
            existing.image
          );
        } catch (deleteError) {
          console.warn(
            "Old Blob image could not be deleted:",
            deleteError?.message
          );
        }
      }
    }

    /* =================================================
       IMAGE URL
    ================================================= */

    else if (imageUrl) {
      finalImage = imageUrl;
    }

    /* =================================================
       UPDATE DATABASE
    ================================================= */

    existing.section = section;

    existing.title =
      title.trim();

    existing.subtitle =
      subtitle;

    existing.category =
      category;

    existing.link =
      link;

    existing.image =
      finalImage;

    existing.numberValue =
      numberValue;

    await existing.save();

    console.log(
      "Content updated:",
      existing._id
    );

    return NextResponse.json({
      success: true,
      message:
        "Content updated successfully.",
      data: existing,
    });
  } catch (error) {
    console.error(
      "PUT /api/content ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to update content.",
      },
      {
        status: 500,
      }
    );
  }
}

/* =========================================================
   DELETE
   ADMIN ONLY
========================================================= */

export async function DELETE(request) {
  try {
    console.log(
      "===== DELETE /api/content ====="
    );

    /* ---------------- AUTH CHECK ---------------- */

    const authError =
      await requireAdmin();

    if (authError) {
      return authError;
    }

    /* ---------------- DATABASE ---------------- */

    await connectDB();

    /* ---------------- GET ID ---------------- */

    const { searchParams } =
      new URL(request.url);

    const id =
      searchParams.get("id");

    /* ---------------- ID VALIDATION ---------------- */

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Content ID is required.",
        },
        {
          status: 400,
        }
      );
    }

    /* ---------------- FIND CONTENT ---------------- */

    const existing =
      await Content.findById(id);

    if (!existing) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Content not found.",
        },
        {
          status: 404,
        }
      );
    }

    /* =================================================
       DELETE VERCEL BLOB IMAGE
    ================================================= */

    if (
      existing.image &&
      isVercelBlobUrl(
        existing.image
      )
    ) {
      try {
        await del(
          existing.image
        );

        console.log(
          "Blob deleted:",
          existing.image
        );
      } catch (deleteError) {
        console.warn(
          "Blob image could not be deleted:",
          deleteError?.message
        );
      }
    }

    /* ---------------- DELETE DATABASE RECORD ---------------- */

    await Content.findByIdAndDelete(id);

    console.log(
      "Content deleted:",
      id
    );

    return NextResponse.json({
      success: true,
      message:
        "Content deleted successfully.",
    });
  } catch (error) {
    console.error(
      "DELETE /api/content ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        error:
          error?.message ||
          "Failed to delete content.",
      },
      {
        status: 500,
      }
    );
  }
}