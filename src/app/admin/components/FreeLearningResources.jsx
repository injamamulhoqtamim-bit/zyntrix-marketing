"use client";

import {
  AlertCircle,
  Image as ImageIcon,
  Upload,
} from "lucide-react";

export default function FreeLearningResources({
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
          placeholder="Enter Resource Title"
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

      {/* DESCRIPTION */}
      <div>
        <label className="font-semibold text-zinc-300 text-sm">
          Subtitle / Description
        </label>

        <textarea
          required
          rows={4}
          maxLength={500}
          className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500 resize-y"
          placeholder="Write description..."
          value={form.subtitle}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              subtitle: e.target.value,
            }))
          }
        />

        <div className="text-right text-xs text-zinc-500 mt-1">
          {form.subtitle.length}/500
        </div>
      </div>

      {/* LINK */}
      <div>
        <label className="font-semibold text-zinc-300 text-sm">
          Google Drive / Website Link
        </label>

        <input
          type="url"
          className="border border-zinc-300 p-3.5 rounded-xl w-full mt-2 text-zinc-900 bg-white focus:outline-none focus:border-blue-500"
          placeholder="https://example.com"
          value={form.link}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              link: e.target.value,
            }))
          }
        />

        <p className="text-xs text-zinc-500 mt-2">
          This link will open when visitors click the
          content.
        </p>
      </div>

      {/* IMAGE */}
      <div className="space-y-4">
        <label className="font-semibold text-zinc-300 text-sm block">
          Image Source
        </label>

        {/* IMAGE URL */}
        <div>
          <input
            type="url"
            className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full text-white focus:outline-none focus:border-blue-500"
            placeholder="Paste direct Image URL"
            value={form.imageUrl}
            onChange={(e) =>
              handleImageUrlChange(e.target.value)
            }
          />

          <p className="text-xs text-zinc-500 mt-2">
            Use a public/direct image URL.
          </p>
        </div>

        {/* OR */}
        <div className="flex items-center gap-3">
          <div className="h-px bg-zinc-800 flex-1" />

          <span className="text-xs text-zinc-500">
            OR
          </span>

          <div className="h-px bg-zinc-800 flex-1" />
        </div>

        {/* FILE UPLOAD */}
        <label
          htmlFor="admin-resource-image-upload"
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
            id="admin-resource-image-upload"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>

        {/* IMAGE PREVIEW */}
        {imagePreview && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 w-full">
            <div className="flex items-center justify-between gap-3 mb-3">
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
                className="text-xs text-red-400 hover:text-red-300"
              >
                Remove
              </button>
            </div>

            <div className="relative w-full max-w-xl h-52 sm:h-64 overflow-hidden rounded-xl bg-zinc-950 border border-zinc-800">
              {!imageError ? (
                <img
                  src={getImageSrc(imagePreview)}
                  alt="Image preview"
                  className="w-full h-full object-cover"
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center px-5">
                  <AlertCircle
                    className="text-red-400 mb-2"
                    size={30}
                  />

                  <p className="text-red-400 font-semibold">
                    Image could not be loaded
                  </p>

                  <p className="text-xs text-zinc-500 mt-1">
                    Check whether the image URL is
                    public and direct.
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* EDIT MODE */}
        {form.editingId &&
          !imagePreview &&
          !form.imageUrl && (
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-4">
              <p className="text-sm text-yellow-400">
                No new image selected. The existing
                image will remain unchanged.
              </p>
            </div>
          )}
      </div>
    </div>
  );
}