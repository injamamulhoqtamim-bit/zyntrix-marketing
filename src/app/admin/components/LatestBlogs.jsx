"use client";

import {
  AlertCircle,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

export default function LatestBlogs({
  form,
  setForm,
  imagePreview,
  setImagePreview,
  imageError,
  setImageError,
  fileInputRef,
  objectUrlRef,
  handleImageUrlChange,
  handleFileChange,
  getImageSrc,
}) {
  return (
    <div className="space-y-5">
      {/* CATEGORY */}
      <div>
        <label className="font-semibold text-zinc-300 text-sm">
          Category
        </label>

        <input
          required
          className="bg-white border border-zinc-300 p-3.5 rounded-xl w-full mt-2 text-zinc-900 focus:outline-none focus:border-blue-500"
          placeholder="e.g. Development, Tech"
          value={form.category}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              category: e.target.value,
            }))
          }
        />
      </div>

      {/* TITLE */}
      <div>
        <label className="font-semibold text-zinc-300 text-sm">
          Title
        </label>

        <input
          required
          className={`border p-3.5 rounded-xl w-full mt-2 text-zinc-900 bg-white focus:outline-none focus:border-blue-500 ${
            !form.title.trim()
              ? "border-red-400"
              : "border-zinc-300"
          }`}
          placeholder="Enter Blog Title"
          value={form.title}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              title: e.target.value,
            }))
          }
        />

        {!form.title.trim() && (
          <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
            <AlertCircle size={13} />
            Title is required
          </p>
        )}
      </div>

      {/* LINK */}
      <div>
        <label className="font-semibold text-zinc-300 text-sm">
          Blog / Website Link
        </label>

        <input
          type="url"
          className="border border-zinc-300 p-3.5 rounded-xl w-full mt-2 text-zinc-900 bg-white focus:outline-none focus:border-blue-500"
          placeholder="https://example.com/blog"
          value={form.link}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              link: e.target.value,
            }))
          }
        />
      </div>

      {/* IMAGE */}
      <div className="space-y-4">
        <label className="font-semibold text-zinc-300 text-sm block">
          Blog Image
        </label>

        <input
          type="url"
          className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full text-white focus:outline-none focus:border-blue-500"
          placeholder="Paste direct Image URL"
          value={form.imageUrl}
          onChange={(e) =>
            handleImageUrlChange(e.target.value)
          }
        />

        <div className="flex items-center gap-3">
          <div className="h-px bg-zinc-800 flex-1" />

          <span className="text-xs text-zinc-500">
            OR
          </span>

          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        <label
          htmlFor="admin-blog-image-upload"
          className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 bg-zinc-950 rounded-xl p-6 sm:p-8 cursor-pointer hover:border-blue-500 hover:bg-zinc-900 transition-colors text-center"
        >
          <Upload
            className="text-zinc-400 mb-3"
            size={28}
          />

          <span className="text-sm text-zinc-300 font-medium">
            Click to browse image
          </span>

          <span className="text-xs text-zinc-500 mt-2">
            PNG, JPG, WEBP up to 5MB
          </span>

          <input
            ref={fileInputRef}
            id="admin-blog-image-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {imagePreview && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="font-semibold text-zinc-300 text-sm flex items-center gap-2">
                <ImageIcon size={16} />
                Image Preview
              </p>

              <button
                type="button"
                onClick={() => {
                  setImagePreview("");
                  setImageError(false);

                  setForm((prev) => ({
                    ...prev,
                    image: null,
                    imageUrl: "",
                  }));

                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }

                  if (objectUrlRef.current) {
                    URL.revokeObjectURL(
                      objectUrlRef.current
                    );
                    objectUrlRef.current = null;
                  }
                }}
                className="text-xs text-red-400"
              >
                Remove
              </button>
            </div>

            <div className="relative w-full max-w-xl h-52 overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800">
              {!imageError ? (
                <img
                  src={getImageSrc(imagePreview)}
                  alt="Blog preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center">
                  <AlertCircle
                    className="text-red-400 mb-2"
                    size={30}
                  />

                  <p className="text-red-400">
                    Image could not be loaded
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}