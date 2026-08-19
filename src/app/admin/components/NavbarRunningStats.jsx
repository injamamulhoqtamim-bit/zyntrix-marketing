"use client";

import { AlertCircle } from "lucide-react";

export default function NavbarRunningStats({
  form,
  setForm,
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
          placeholder="Enter Stat Title"
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

      {/* NUMBER VALUE */}
      <div>
        <label className="font-semibold text-zinc-300 text-sm">
          Number Value
        </label>

        <input
          className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
          placeholder="500+"
          value={form.numberValue}
          onChange={(e) =>
            setForm((prev) => ({
              ...prev,
              numberValue: e.target.value,
            }))
          }
        />

        <p className="text-xs text-zinc-500 mt-2">
          Example: 500+, 1000+, 50+
        </p>
      </div>
    </div>
  );
}