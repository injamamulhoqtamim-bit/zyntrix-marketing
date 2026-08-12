"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import {
  Home,
  Search,
  Plus,
  Loader2,
  Upload,
  Menu,
  X,
  RefreshCw,
  LogOut,
  Pencil,
  Trash2,
  ExternalLink,
} from "lucide-react";

export default function AdminPage() {
  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [editingId, setEditingId] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const [form, setForm] = useState({
    section: "stats",
    title: "",
    subtitle: "",
    category: "",
    link: "",
    image: null,
    imageUrl: "",
    numberValue: "",
  });

  const [imagePreview, setImagePreview] = useState("");

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleString());
    };

    updateTime();

    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  const stats = useMemo(() => {
    return {
      total: contents.length,
      resources: contents.filter((i) => i.section === "resources").length,
      blogs: contents.filter((i) => i.section === "blogs").length,
      works: contents.filter((i) => i.section === "works").length,
      stats: contents.filter((i) => i.section === "stats").length,
    };
  }, [contents]);

  const [animatedStats, setAnimatedStats] = useState({
    total: 0,
    resources: 0,
    blogs: 0,
    works: 0,
    stats: 0,
  });

  useEffect(() => {
    let current = 0;

    const maxValue = Math.max(
      stats.total,
      stats.resources,
      stats.blogs,
      stats.works,
      stats.stats
    );

    if (maxValue === 0) {
      setAnimatedStats({
        total: 0,
        resources: 0,
        blogs: 0,
        works: 0,
        stats: 0,
      });

      return;
    }

    const timer = setInterval(() => {
      current++;

      setAnimatedStats({
        total: Math.min(current, stats.total),
        resources: Math.min(current, stats.resources),
        blogs: Math.min(current, stats.blogs),
        works: Math.min(current, stats.works),
        stats: Math.min(current, stats.stats),
      });

      if (current >= maxValue) {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [stats]);

  async function loadData() {
    setLoading(true);

    try {
      const res = await fetch("/api/content", {
        cache: "no-store",
      });

      const data = await res.json();

      if (data.success) {
        setContents(Array.isArray(data.data) ? data.data : []);
      } else {
        toast.error(data.error || "Failed to load contents");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load contents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  function resetForm() {
    setEditingId(null);
    setImagePreview("");

    setForm({
      section: "stats",
      title: "",
      subtitle: "",
      category: "",
      link: "",
      image: null,
      imageUrl: "",
      numberValue: "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function validateForm() {
    if (!form.title.trim()) {
      toast.error("Title is required");
      return false;
    }

    if (form.title.trim().length < 3) {
      toast.error("Title must be at least 3 characters");
      return false;
    }

    if (
      form.section !== "stats" &&
      form.section !== "blogs" &&
      form.subtitle &&
      form.subtitle.length < 5
    ) {
      toast.error("Subtitle must be at least 5 characters");
      return false;
    }

    if (form.link) {
      try {
        new URL(form.link);
      } catch {
        toast.error("Invalid Website URL");
        return false;
      }
    }

    if (form.imageUrl) {
      try {
        new URL(form.imageUrl);
      } catch {
        toast.error("Invalid Image URL");
        return false;
      }
    }

    return true;
  }

  function isDuplicateTitle() {
    return contents.some(
      (item) =>
        item.title?.trim().toLowerCase() ===
          form.title.trim().toLowerCase() &&
        item._id !== editingId
    );
  }

  const filteredContents = useMemo(() => {
    const searchValue = search.toLowerCase().trim();

    return contents.filter((item) => {
      const matchSearch =
        !searchValue ||
        item.title?.toLowerCase().includes(searchValue) ||
        item.subtitle?.toLowerCase().includes(searchValue) ||
        item.category?.toLowerCase().includes(searchValue) ||
        item.section?.toLowerCase().includes(searchValue);

      const matchSection =
        filter === "all" || item.section === filter;

      return matchSearch && matchSection;
    });
  }, [contents, search, filter]);

  async function addContent(e) {
    e.preventDefault();

    if (!validateForm()) return;

    if (isDuplicateTitle()) {
      toast.error("This title already exists");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append("section", form.section);
      formData.append("title", form.title);
      formData.append("subtitle", form.subtitle);
      formData.append("category", form.category);
      formData.append("link", form.link);
      formData.append("numberValue", form.numberValue);

      if (form.imageUrl) {
        formData.append("imageUrl", form.imageUrl);
      }

      if (editingId) {
        formData.append("id", editingId);
      }

      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      const endpoint = "/api/content";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method,
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          editingId
            ? "Content Updated Successfully"
            : "Content Added Successfully"
        );

        resetForm();
        await loadData();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(id) {
    if (!id) return;

    setDeletingId(id);

    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Deleted Successfully");
        await loadData();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Delete Failed");
    } finally {
      setDeletingId(null);
      setDeleteModal(false);
      setSelectedId(null);
    }
  }

  function editItem(item) {
    setEditingId(item._id);

    setImagePreview(item.image || "");

    setForm({
      section: item.section || "stats",
      title: item.title || "",
      subtitle: item.subtitle || "",
      category: item.category || "",
      link: item.link || "",
      image: null,
      imageUrl: item.image?.startsWith("http") ? item.image : "",
      numberValue: item.numberValue || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#18181b",
            color: "#fff",
            border: "1px solid #3f3f46",
          },
        }}
      />

      <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">
        {/* ================= HEADER ================= */}
        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="min-h-[76px] flex items-center justify-between gap-4">
              <div className="min-w-0">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white truncate">
                  Zyntrix CMS
                </h1>

                <p className="hidden sm:block text-xs sm:text-sm text-zinc-400 mt-1">
                  Manage your website contents, blogs, resources & works
                </p>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-3">
                <Link
                  href="/"
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 lg:px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <Home size={17} />
                  Home
                </Link>

                <button
                  onClick={loadData}
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <RefreshCw
                    size={17}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("isAdminLoggedIn");
                    window.location.href = "/admin/login";
                  }}
                  className="bg-red-600/90 hover:bg-red-600 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenu(!mobileMenu)}
                className="md:hidden w-11 h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileMenu ? <X size={21} /> : <Menu size={21} />}
              </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenu && (
              <div className="md:hidden border-t border-zinc-800 py-4 space-y-2">
                <Link
                  href="/"
                  onClick={() => setMobileMenu(false)}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <Home size={18} />
                  Home
                </Link>

                <button
                  onClick={() => {
                    loadData();
                    setMobileMenu(false);
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Refresh Dashboard
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("isAdminLoggedIn");
                    window.location.href = "/admin/login";
                  }}
                  className="w-full bg-red-600 hover:bg-red-500 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
          {/* ================= TOP INFO ================= */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7 sm:mb-10">
            <div>
              <p className="text-zinc-500 text-sm">
                Content Management Dashboard
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Manage Everything From One Place
              </h2>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="flex-1 min-w-[145px] sm:flex-none bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">
                <p className="text-[11px] text-zinc-400">Growth</p>
                <h3 className="text-xl font-black text-emerald-400">
                  +24%
                </h3>
              </div>

              <div className="flex-1 min-w-[190px] sm:flex-none bg-blue-500/10 border border-blue-500/30 rounded-xl px-4 py-3">
                <p className="text-[11px] text-zinc-400">
                  Last Updated
                </p>

                <h3 className="text-xs sm:text-sm font-bold text-white mt-1 break-words">
                  {currentTime || "Loading..."}
                </h3>
              </div>
            </div>
          </div>

          {/* ================= STATS ================= */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4 lg:gap-5 mb-7 sm:mb-10">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-4 sm:p-6 shadow-lg">
              <p className="text-xs sm:text-sm opacity-80">
                Total Contents
              </p>

              <h2 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
                {animatedStats.total}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-4 sm:p-6 shadow-lg">
              <p className="text-xs sm:text-sm opacity-80">
                Resources
              </p>

              <h2 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
                {animatedStats.resources}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white p-4 sm:p-6 shadow-lg">
              <p className="text-xs sm:text-sm opacity-80">
                Blogs
              </p>

              <h2 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
                {animatedStats.blogs}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-4 sm:p-6 shadow-lg">
              <p className="text-xs sm:text-sm opacity-80">
                Featured Works
              </p>

              <h2 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
                {animatedStats.works}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-pink-600 to-fuchsia-700 text-white p-4 sm:p-6 shadow-lg col-span-2 lg:col-span-1">
              <p className="text-xs sm:text-sm opacity-80">
                Running Stats
              </p>

              <h2 className="text-2xl sm:text-4xl font-black mt-1 sm:mt-2">
                {animatedStats.stats}
              </h2>
            </div>
          </div>

          {/* ================= RECENT + QUICK ACTION ================= */}
          <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mb-7 sm:mb-10">
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3 mb-5">
                <h2 className="text-lg sm:text-xl font-bold">
                  Recent Activity
                </h2>

                <span className="text-xs text-zinc-500">
                  {contents.length} total
                </span>
              </div>

              <div className="space-y-3">
                {[...contents]
                  .sort(
                    (a, b) =>
                      new Date(b.createdAt) -
                      new Date(a.createdAt)
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-zinc-800 pb-3"
                    >
                      <div className="min-w-0">
                        <h3 className="text-white font-semibold truncate">
                          {item.title}
                        </h3>

                        <p className="text-zinc-400 text-xs sm:text-sm capitalize">
                          {item.section}
                        </p>
                      </div>

                      <span className="text-xs text-zinc-500 shrink-0">
                        {item.createdAt
                          ? new Date(
                              item.createdAt
                            ).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                  ))}

                {contents.length === 0 && (
                  <p className="text-zinc-500 text-sm py-5 text-center">
                    No activity yet.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6">
              <h2 className="text-lg sm:text-xl font-bold mb-5">
                Quick Actions
              </h2>

              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3">
                <button
                  onClick={resetForm}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white cursor-pointer transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Plus size={18} />
                  New Content
                </button>

                <button
                  onClick={loadData}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <RefreshCw
                    size={17}
                    className={loading ? "animate-spin" : ""}
                  />
                  Refresh
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("isAdminLoggedIn");
                    window.location.href = "/admin/login";
                  }}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white cursor-pointer transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut size={17} />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* ================= FORM ================= */}
          <form
            onSubmit={addContent}
            className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 mb-10 sm:mb-12"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingId
                    ? "Edit Content"
                    : "Add New Content"}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Add or update website content from here.
                </p>
              </div>

              {editingId && (
                <span className="w-fit text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-lg">
                  Editing Mode
                </span>
              )}
            </div>

            {/* SECTION */}
            <div>
              <label className="font-semibold text-zinc-300 text-sm">
                Section
              </label>

              <select
                required
                className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
                value={form.section}
                onChange={(e) =>
                  setForm({
                    ...form,
                    section: e.target.value,
                    category:
                      e.target.value === "works"
                        ? "UI/UX Design"
                        : "",
                  })
                }
              >
                <option value="stats">
                  Navbar Running Stats
                </option>
                <option value="resources">
                  Free Learning Resources
                </option>
                <option value="works">
                  Featured Works
                </option>
                <option value="blogs">
                  Latest Blogs
                </option>
              </select>
            </div>

            {/* CATEGORY */}
            {form.section === "works" && (
              <div>
                <label className="font-semibold text-zinc-300 text-sm">
                  Category
                </label>

                <select
                  required
                  className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                >
                  <option value="UI/UX Design">
                    UI/UX Design
                  </option>

                  <option value="Web Design">
                    Web Design
                  </option>
                </select>
              </div>
            )}

            {form.section === "blogs" && (
              <div>
                <label className="font-semibold text-zinc-300 text-sm">
                  Category
                </label>

                <input
                  required
                  className="bg-white border p-3.5 rounded-xl w-full mt-2 text-zinc-900 focus:outline-none focus:border-blue-500"
                  placeholder="e.g. Development, Tech"
                  value={form.category}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      category: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {/* TITLE */}
            <div>
              <label className="font-semibold text-zinc-300 text-sm">
                Title
              </label>

              <input
                required
                className={`border p-3.5 rounded-xl w-full mt-2 text-zinc-900 bg-white focus:outline-none focus:border-blue-500 ${
                  !form.title
                    ? "border-red-400"
                    : "border-zinc-300"
                }`}
                placeholder={
                  form.section === "stats"
                    ? "Enter Stat Title"
                    : "Enter Content Title"
                }
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                  })
                }
              />
            </div>

            {/* SUBTITLE */}
            {(form.section === "works" ||
              form.section === "resources") && (
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
                    setForm({
                      ...form,
                      subtitle: e.target.value,
                    })
                  }
                />

                <div className="text-right text-xs text-zinc-500 mt-1">
                  {form.subtitle.length}/500
                </div>
              </div>
            )}

            {/* LINK */}
            {form.section !== "stats" && (
              <div>
                <label className="font-semibold text-zinc-300 text-sm">
                  Google Drive / Website Link
                </label>

                <input
                  type="url"
                  className="border p-3.5 rounded-xl w-full mt-2 text-zinc-900 bg-white focus:outline-none focus:border-blue-500"
                  placeholder="https://example.com"
                  value={form.link}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      link: e.target.value,
                    })
                  }
                />

                <p className="text-xs text-zinc-500 mt-2">
                  This link will open when visitors click the
                  content.
                </p>
              </div>
            )}

            {/* IMAGE */}
            {form.section !== "stats" && (
              <div className="space-y-4">
                <label className="font-semibold text-zinc-300 text-sm block">
                  Image Source
                </label>

                {/* IMAGE URL */}
                <div>
                  <input
                    type="url"
                    className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full text-white focus:outline-none focus:border-blue-500"
                    placeholder="Paste direct Image URL (e.g. Cloudinary link)"
                    value={form.imageUrl}
                    onChange={(e) => {
                      setForm({
                        ...form,
                        imageUrl: e.target.value,
                        image: null,
                      });

                      setImagePreview(e.target.value);
                    }}
                  />

                  <p className="text-xs text-zinc-500 mt-2">
                    Use a public/direct image URL.
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-px bg-zinc-800 flex-1" />
                  <span className="text-xs text-zinc-500">
                    OR
                  </span>
                  <div className="h-px bg-zinc-800 flex-1" />
                </div>

                {/* FILE UPLOAD */}
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 bg-zinc-950 rounded-xl p-6 sm:p-8 cursor-pointer hover:border-blue-500 hover:bg-zinc-900 transition-colors text-center">
                  <Upload
                    className="text-zinc-400 mb-3"
                    size={28}
                  />

                  <span className="text-sm text-zinc-300 font-medium">
                    Click to browse or drag & drop image
                  </span>

                  <span className="text-xs text-zinc-500 mt-2">
                    PNG, JPG, WEBP up to 5MB
                  </span>

                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];

                      if (file) {
                        if (file.size > 5 * 1024 * 1024) {
                          toast.error(
                            "Image must be 5MB or smaller"
                          );

                          e.target.value = "";
                          return;
                        }

                        setForm({
                          ...form,
                          image: file,
                          imageUrl: "",
                        });

                        setImagePreview(
                          URL.createObjectURL(file)
                        );
                      }
                    }}
                  />
                </label>

                {/* IMAGE PREVIEW */}
                {imagePreview && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 w-full">
                    <p className="font-semibold text-zinc-300 mb-3 text-sm">
                      Image Preview
                    </p>

                    <div className="relative w-full max-w-md h-48 sm:h-56 overflow-hidden rounded-xl bg-zinc-950">
                      <Image
                        src={imagePreview}
                        fill
                        alt="Preview"
                        className="rounded-xl object-cover"
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* NUMBER VALUE */}
            {form.section === "stats" && (
              <div>
                <label className="font-semibold text-zinc-300 text-sm">
                  Number Value
                </label>

                <input
                  className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="500+"
                  value={form.numberValue}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      numberValue: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {/* BUTTONS */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                disabled={saving || !form.title.trim()}
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-7 py-3.5 rounded-xl font-medium transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {saving ? (
                  <>
                    <Loader2
                      className="animate-spin"
                      size={18}
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    {editingId ? (
                      <Pencil size={18} />
                    ) : (
                      <Plus size={18} />
                    )}

                    {editingId
                      ? "Update Content"
                      : "Add Content"}
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="w-full sm:w-auto bg-zinc-700 hover:bg-zinc-600 text-white px-7 py-3.5 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          {/* ================= SEARCH + FILTER ================= */}
          <div className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search title, category, section..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All Contents</option>
              <option value="stats">Stats</option>
              <option value="resources">Resources</option>
              <option value="works">Works</option>
              <option value="blogs">Blogs</option>
            </select>
          </div>

          {/* ================= EXISTING CONTENTS ================= */}
          <div className="mt-8 sm:mt-14">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">
                Existing Contents
              </h2>

              <p className="text-xs sm:text-sm text-zinc-500">
                Showing {filteredContents.length} of{" "}
                {contents.length}
              </p>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
                  >
                    <div className="h-6 w-56 bg-zinc-800 rounded mb-4" />
                    <div className="h-4 w-full bg-zinc-800 rounded mb-2" />
                    <div className="h-4 w-3/4 bg-zinc-800 rounded" />
                  </div>
                ))}
              </div>
            ) : filteredContents.length === 0 ? (
              <div className="text-zinc-500 text-center py-14 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                <p className="font-medium">
                  No Content Found
                </p>

                <p className="text-xs mt-2">
                  Try changing your search or filter.
                </p>
              </div>
            ) : (
              <div className="grid gap-4 sm:gap-5">
                {filteredContents.map((item) => (
                  <div
                    key={item._id}
                    className="border border-zinc-800 rounded-2xl p-4 sm:p-6 bg-zinc-900 shadow-lg"
                  >
                    <div className="flex flex-col xl:flex-row xl:justify-between gap-6">
                      {/* CONTENT INFORMATION */}
                      <div className="space-y-2.5 text-zinc-300 min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 capitalize">
                            {item.section}
                          </span>

                          {item.category && (
                            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                              {item.category}
                            </span>
                          )}
                        </div>

                        <p className="break-words">
                          <b className="text-white">
                            Title:
                          </b>{" "}
                          {item.title}
                        </p>

                        {item.subtitle && (
                          <p className="break-words">
                            <b className="text-white">
                              Subtitle:
                            </b>{" "}
                            {item.subtitle}
                          </p>
                        )}

                        {item.numberValue && (
                          <p>
                            <b className="text-white">
                              Number:
                            </b>{" "}
                            {item.numberValue}
                          </p>
                        )}

                        {item.link && (
                          <div className="flex flex-wrap items-center gap-2">
                            <b className="text-white">
                              Link:
                            </b>

                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-1 max-w-full"
                            >
                              <span className="truncate max-w-[250px] sm:max-w-[450px]">
                                Open Link
                              </span>

                              <ExternalLink size={14} />
                            </a>
                          </div>
                        )}

                        {/* IMAGE */}
                        {item.image ? (
                          <div className="pt-2">
                            <p className="text-sm font-semibold text-white mb-2">
                              Image:
                            </p>

                            <div className="relative w-full max-w-xs sm:max-w-sm h-44 sm:h-48 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">
                              <Image
                                src={
                                  item.image.startsWith(
                                    "http"
                                  )
                                    ? item.image
                                    : encodeURI(
                                        item.image.startsWith(
                                          "/"
                                        )
                                          ? item.image
                                          : `/${item.image}`
                                      )
                                }
                                fill
                                alt={item.title}
                                className="rounded-xl object-cover hover:scale-105 transition duration-300"
                                unoptimized
                              />
                            </div>
                          </div>
                        ) : (
                          item.section !== "stats" && (
                            <div className="w-full max-w-xs h-40 rounded-xl bg-zinc-100 border flex items-center justify-center text-zinc-500 mt-3 font-medium">
                              No Image
                            </div>
                          )
                        )}
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-row xl:flex-col gap-2.5 xl:min-w-[110px]">
                        <button
                          onClick={() => editItem(item)}
                          className="flex-1 xl:flex-none bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2.5 rounded-xl font-semibold transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                        >
                          <Pencil size={16} />
                          Edit
                        </button>

                        <button
                          onClick={() => {
                            setSelectedId(item._id);
                            setDeleteModal(true);
                          }}
                          disabled={deletingId === item._id}
                          className="flex-1 xl:flex-none bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white px-4 py-2.5 rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2"
                        >
                          {deletingId === item._id ? (
                            <Loader2
                              className="animate-spin"
                              size={16}
                            />
                          ) : (
                            <Trash2 size={16} />
                          )}

                          {deletingId === item._id
                            ? "Deleting..."
                            : "Delete"}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>

        {/* ================= DELETE MODAL ================= */}
        {deleteModal && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4">
            <div className="bg-white rounded-2xl p-5 sm:p-8 w-full max-w-[420px] shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <Trash2
                  className="text-red-600"
                  size={22}
                />
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 mb-3">
                Delete Content
              </h2>

              <p className="text-sm sm:text-base text-zinc-600">
                Are you sure you want to permanently delete
                this content? This action cannot be undone.
              </p>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">
                <button
                  onClick={() => {
                    setDeleteModal(false);
                    setSelectedId(null);
                  }}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 cursor-pointer font-medium"
                >
                  Cancel
                </button>

                <button
                  onClick={() => deleteItem(selectedId)}
                  disabled={!!deletingId}
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white cursor-pointer font-medium flex items-center justify-center gap-2"
                >
                  {deletingId && (
                    <Loader2
                      className="animate-spin"
                      size={16}
                    />
                  )}

                  {deletingId
                    ? "Deleting..."
                    : "Delete Permanently"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}