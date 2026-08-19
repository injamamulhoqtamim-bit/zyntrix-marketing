"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";

import {
  Home,
  Search,
  Plus,
  Loader2,
  Menu,
  X,
  RefreshCw,
  LogOut,
  Pencil,
  Trash2,
  ExternalLink,
  Image as ImageIcon,
} from "lucide-react";

// =========================================================
// SEPARATE FORM COMPONENTS
// =========================================================

import NavbarRunningStats from "./components/NavbarRunningStats";
import FreeLearningResources from "./components/FreeLearningResources";
import FeaturedWorks from "./components/FeaturedWorks";
import LatestBlogs from "./components/LatestBlogs";

export default function AdminPage() {
  // =========================================================
  // STATES
  // =========================================================

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

  const [imagePreview, setImagePreview] = useState("");
  const [imageError, setImageError] = useState(false);

  const fileInputRef = useRef(null);
  const objectUrlRef = useRef(null);

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

  // =========================================================
  // TIME
  // =========================================================

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleString("en-US", {
          dateStyle: "medium",
          timeStyle: "short",
        })
      );
    };

    updateTime();

    const timer = setInterval(updateTime, 60000);

    return () => clearInterval(timer);
  }, []);

  // =========================================================
  // CLEAN OBJECT URL
  // =========================================================

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(objectUrlRef.current);
      }
    };
  }, []);

  // =========================================================
  // STATS
  // =========================================================

  const stats = useMemo(() => {
    return {
      total: contents.length,

      resources: contents.filter(
        (item) => item.section === "resources"
      ).length,

      blogs: contents.filter(
        (item) => item.section === "blogs"
      ).length,

      works: contents.filter(
        (item) => item.section === "works"
      ).length,

      stats: contents.filter(
        (item) => item.section === "stats"
      ).length,
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
      current += 1;

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
    }, 35);

    return () => clearInterval(timer);
  }, [stats]);

  // =========================================================
  // LOAD DATA
  // =========================================================

  async function loadData(showToast = false) {
    setLoading(true);

    try {
      const res = await fetch("/api/content", {
        method: "GET",
        cache: "no-store",
      });

      if (!res.ok) {
        throw new Error(`HTTP error: ${res.status}`);
      }

      const data = await res.json();

      if (data.success) {
        const items = Array.isArray(data.data)
          ? data.data
          : [];

        setContents(items);

        if (showToast) {
          toast.success("Dashboard refreshed");
        }
      } else {
        toast.error(
          data.error || "Failed to load contents"
        );
      }
    } catch (error) {
      console.error("LOAD DATA ERROR:", error);

      toast.error("Failed to load contents");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // =========================================================
  // RESET FORM
  // =========================================================

  function resetForm(scroll = true) {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current);
      objectUrlRef.current = null;
    }

    setEditingId(null);

    setImagePreview("");
    setImageError(false);

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

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (scroll) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  // =========================================================
  // FORM VALIDATION
  // =========================================================

  function validateForm() {
    const title = form.title.trim();

    if (!title) {
      toast.error("Title is required");
      return false;
    }

    if (title.length < 3) {
      toast.error("Title must be at least 3 characters");
      return false;
    }

    if (
      (form.section === "works" ||
        form.section === "resources") &&
      !form.subtitle.trim()
    ) {
      toast.error("Description is required");
      return false;
    }

    if (
      (form.section === "works" ||
        form.section === "resources") &&
      form.subtitle.trim().length < 5
    ) {
      toast.error(
        "Description must be at least 5 characters"
      );
      return false;
    }

    if (form.link.trim()) {
      try {
        new URL(form.link.trim());
      } catch {
        toast.error("Invalid Website / Google Drive URL");
        return false;
      }
    }

    if (form.imageUrl.trim()) {
      try {
        new URL(form.imageUrl.trim());
      } catch {
        toast.error("Invalid Image URL");
        return false;
      }
    }

    if (
      form.section === "works" &&
      !form.category.trim()
    ) {
      toast.error("Category is required for works");
      return false;
    }

    if (
      form.section === "blogs" &&
      !form.category.trim()
    ) {
      toast.error("Category is required for blogs");
      return false;
    }

    return true;
  }

  // =========================================================
  // DUPLICATE TITLE
  // =========================================================

  function isDuplicateTitle() {
    const currentTitle = form.title
      .trim()
      .toLowerCase();

    return contents.some(
      (item) =>
        item.title?.trim().toLowerCase() ===
          currentTitle &&
        item._id !== editingId
    );
  }

  // =========================================================
  // FILTER
  // =========================================================

  const filteredContents = useMemo(() => {
    const searchValue = search
      .toLowerCase()
      .trim();

    return contents.filter((item) => {
      const matchSearch =
        !searchValue ||
        item.title
          ?.toLowerCase()
          .includes(searchValue) ||
        item.subtitle
          ?.toLowerCase()
          .includes(searchValue) ||
        item.category
          ?.toLowerCase()
          .includes(searchValue) ||
        item.section
          ?.toLowerCase()
          .includes(searchValue);

      const matchSection =
        filter === "all" ||
        item.section === filter;

      return matchSearch && matchSection;
    });
  }, [contents, search, filter]);

  // =========================================================
  // ADD / UPDATE CONTENT
  // =========================================================

  async function addContent(e) {
    e.preventDefault();

    if (saving) return;

    if (!validateForm()) return;

    if (isDuplicateTitle()) {
      toast.error("This title already exists");
      return;
    }

    setSaving(true);

    try {
      const formData = new FormData();

      formData.append(
        "section",
        form.section
      );

      formData.append(
        "title",
        form.title.trim()
      );

      formData.append(
        "subtitle",
        form.subtitle.trim()
      );

      formData.append(
        "category",
        form.category.trim()
      );

      formData.append(
        "link",
        form.link.trim()
      );

      formData.append(
        "numberValue",
        form.numberValue.trim()
      );

      if (form.imageUrl.trim()) {
        formData.append(
          "imageUrl",
          form.imageUrl.trim()
        );
      }

      if (editingId) {
        formData.append(
          "id",
          editingId
        );
      }

      if (form.image instanceof File) {
        formData.append(
          "image",
          form.image
        );
      }

      const method = editingId
        ? "PUT"
        : "POST";

      const res = await fetch(
        "/api/content",
        {
          method,
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            "Something went wrong"
        );
      }

      toast.success(
        editingId
          ? "Content updated successfully"
          : "Content added successfully"
      );

      resetForm(false);

      await loadData();

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch (error) {
      console.error(
        "SAVE CONTENT ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Server error"
      );
    } finally {
      setSaving(false);
    }
  }

  // =========================================================
  // DELETE
  // =========================================================

  async function deleteItem(id) {
    if (!id || deletingId) return;

    setDeletingId(id);

    try {
      const res = await fetch(
        `/api/content?id=${encodeURIComponent(id)}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            "Delete failed"
        );
      }

      toast.success(
        "Content deleted successfully"
      );

      setContents((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      setDeleteModal(false);
      setSelectedId(null);
    } catch (error) {
      console.error(
        "DELETE ERROR:",
        error
      );

      toast.error(
        error.message ||
          "Delete failed"
      );
    } finally {
      setDeletingId(null);
    }
  }

  // =========================================================
  // EDIT
  // =========================================================

  function editItem(item) {
    if (!item) return;

    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );

      objectUrlRef.current = null;
    }

    setEditingId(item._id);

    const existingImage =
      item.image || "";

    setImagePreview(existingImage);
    setImageError(false);

    setForm({
      section:
        item.section || "stats",

      title:
        item.title || "",

      subtitle:
        item.subtitle || "",

      category:
        item.category || "",

      link:
        item.link || "",

      image: null,

      imageUrl:
        existingImage.startsWith(
          "http://"
        ) ||
        existingImage.startsWith(
          "https://"
        )
          ? existingImage
          : "",

      numberValue:
        item.numberValue || "",
    });

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // IMAGE URL HANDLER
  // =========================================================

  function handleImageUrlChange(value) {
    setImageError(false);

    setForm((prev) => ({
      ...prev,
      imageUrl: value,
      image: null,
    }));

    setImagePreview(value);

    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );

      objectUrlRef.current = null;
    }
  }

  // =========================================================
  // FILE HANDLER
  // =========================================================

  function handleFileChange(e) {
    const file =
      e.target.files?.[0];

    if (!file) return;

    setImageError(false);

    if (!file.type.startsWith("image/")) {
      toast.error(
        "Please select a valid image file"
      );

      e.target.value = "";

      return;
    }

    if (
      file.size >
      5 * 1024 * 1024
    ) {
      toast.error(
        "Image must be 5MB or smaller"
      );

      e.target.value = "";

      return;
    }

    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );
    }

    const objectUrl =
      URL.createObjectURL(file);

    objectUrlRef.current =
      objectUrl;

    setForm((prev) => ({
      ...prev,
      image: file,
      imageUrl: "",
    }));

    setImagePreview(objectUrl);
  }

  // =========================================================
  // IMAGE URL NORMALIZER
  // =========================================================

  function getImageSrc(image) {
    if (!image) return "";

    const value =
      String(image).trim();

    if (!value) return "";

    if (
      value.startsWith("http://") ||
      value.startsWith("https://") ||
      value.startsWith("blob:") ||
      value.startsWith("data:")
    ) {
      return value;
    }

    if (value.startsWith("/")) {
      return encodeURI(value);
    }

    return encodeURI(`/${value}`);
  }

  // =========================================================
  // LOGOUT
  // =========================================================

  function logout() {
    localStorage.removeItem(
      "isAdminLoggedIn"
    );

    window.location.href =
      "/admin/login";
  }

  // =========================================================
  // CLOSE DELETE MODAL
  // =========================================================

  function closeDeleteModal() {
    if (deletingId) return;

    setDeleteModal(false);
    setSelectedId(null);
  }

  // =========================================================
  // RECENT CONTENTS
  // =========================================================

  const recentContents = useMemo(() => {
    return [...contents]
      .sort((a, b) => {
        const dateA = a.createdAt
          ? new Date(
              a.createdAt
            ).getTime()
          : 0;

        const dateB = b.createdAt
          ? new Date(
              b.createdAt
            ).getTime()
          : 0;

        return dateB - dateA;
      })
      .slice(0, 5);
  }, [contents]);

  // =========================================================
  // RENDER
  // =========================================================

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
            border:
              "1px solid #3f3f46",
          },
        }}
      />

      <div className="min-h-screen bg-zinc-950 text-white overflow-x-hidden">

        {/* =================================================
            HEADER
        ================================================= */}

        <header className="sticky top-0 z-40 bg-zinc-950/90 backdrop-blur-xl border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <div className="min-h-[76px] flex items-center justify-between gap-4">

              <div className="min-w-0">

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white truncate">
                  Zyntrix CMS
                </h1>

                <p className="hidden sm:block text-xs sm:text-sm text-zinc-400 mt-1">
                  Manage your website
                  contents, blogs,
                  resources & works
                </p>

              </div>

              {/* DESKTOP NAV */}

              <div className="hidden md:flex items-center gap-3">

                <Link
                  href="/"
                  className="bg-zinc-800 hover:bg-zinc-700 px-4 lg:px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <Home size={17} />
                  Home
                </Link>

                <button
                  type="button"
                  onClick={() =>
                    loadData(true)
                  }
                  disabled={loading}
                  className="bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <RefreshCw
                    size={17}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="bg-red-600/90 hover:bg-red-600 px-4 py-2.5 rounded-xl flex items-center gap-2 transition-colors text-sm font-medium"
                >
                  <LogOut size={17} />

                  Logout
                </button>

              </div>

              {/* MOBILE BUTTON */}

              <button
                type="button"
                onClick={() =>
                  setMobileMenu(
                    (prev) => !prev
                  )
                }
                className="md:hidden w-11 h-11 rounded-xl bg-zinc-800 hover:bg-zinc-700 flex items-center justify-center"
                aria-label="Toggle menu"
              >
                {mobileMenu ? (
                  <X size={21} />
                ) : (
                  <Menu size={21} />
                )}
              </button>

            </div>

            {/* MOBILE MENU */}

            {mobileMenu && (
              <div className="md:hidden border-t border-zinc-800 py-4 space-y-2">

                <Link
                  href="/"
                  onClick={() =>
                    setMobileMenu(false)
                  }
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <Home size={18} />
                  Home
                </Link>

                <button
                  type="button"
                  onClick={() => {
                    loadData(true);
                    setMobileMenu(false);
                  }}
                  className="w-full bg-zinc-800 hover:bg-zinc-700 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <RefreshCw size={18} />
                  Refresh Dashboard
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="w-full bg-red-600 hover:bg-red-500 px-4 py-3 rounded-xl flex items-center gap-2"
                >
                  <LogOut size={18} />
                  Logout
                </button>

              </div>
            )}

          </div>
        </header>

        {/* =================================================
            MAIN
        ================================================= */}

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          {/* TOP INFO */}

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-7 sm:mb-10">

            <div>

              <p className="text-zinc-500 text-sm">
                Content Management
                Dashboard
              </p>

              <h2 className="text-xl sm:text-2xl font-bold text-white mt-1">
                Manage Everything
                From One Place
              </h2>

            </div>

            <div className="flex flex-wrap gap-3">

              <div className="flex-1 min-w-[145px] sm:flex-none bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3">

                <p className="text-[11px] text-zinc-400">
                  Growth
                </p>

                <h3 className="text-xl font-black text-emerald-400">
                  +24%
                </h3>

              </div>

              <div className="flex-1 min-w-[190px] sm:flex-none bg-blue-500/10 border border-blue-500/30 rounded-xl px-4 py-3">

                <p className="text-[11px] text-zinc-400">
                  Last Updated
                </p>

                <h3 className="text-xs sm:text-sm font-bold text-white mt-1 break-words">
                  {currentTime ||
                    "Loading..."}
                </h3>

              </div>

            </div>

          </div>

          {/* =================================================
              DASHBOARD STATS
          ================================================= */}

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

          {/* =================================================
              RECENT + QUICK ACTION
          ================================================= */}

          <div className="grid lg:grid-cols-3 gap-5 sm:gap-6 mb-7 sm:mb-10">

            {/* RECENT */}

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

                {recentContents.map(
                  (item) => (
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
                  )
                )}

                {contents.length === 0 && (
                  <p className="text-zinc-500 text-sm py-5 text-center">
                    No activity yet.
                  </p>
                )}

              </div>

            </div>

            {/* QUICK ACTION */}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 sm:p-6">

              <h2 className="text-lg sm:text-xl font-bold mb-5">
                Quick Actions
              </h2>

              <div className="grid sm:grid-cols-3 lg:grid-cols-1 gap-3">

                <button
                  type="button"
                  onClick={() =>
                    resetForm(true)
                  }
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <Plus size={18} />
                  New Content
                </button>

                <button
                  type="button"
                  onClick={() =>
                    loadData(true)
                  }
                  disabled={loading}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <RefreshCw
                    size={17}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  Refresh
                </button>

                <button
                  type="button"
                  onClick={logout}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white transition-colors flex items-center justify-center gap-2 font-medium"
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>

            </div>

          </div>

          {/* =================================================
              FORM
          ================================================= */}

          <form
            onSubmit={addContent}
            className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-4 sm:p-6 lg:p-8 space-y-5 sm:space-y-6 mb-10 sm:mb-12"
          >

            {/* FORM HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

              <div>

                <h2 className="text-xl sm:text-2xl font-bold text-white">
                  {editingId
                    ? "Edit Content"
                    : "Add New Content"}
                </h2>

                <p className="text-xs sm:text-sm text-zinc-500 mt-1">
                  Add or update website
                  content from here.
                </p>

              </div>

              {editingId && (
                <span className="w-fit text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20 px-3 py-1.5 rounded-lg">
                  Editing Mode
                </span>
              )}

            </div>

            {/* =================================================
                SECTION SELECT
            ================================================= */}

            <div>

              <label className="font-semibold text-zinc-300 text-sm">
                Section
              </label>

              <select
                required
                className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
                value={form.section}
                onChange={(e) => {

                  const value =
                    e.target.value;

                  setForm((prev) => ({
                    ...prev,

                    section: value,

                    category:
                      value === "works"
                        ? "UI/UX Design"
                        : "",

                    subtitle:
                      value === "stats" ||
                      value === "blogs"
                        ? ""
                        : prev.subtitle,

                    link:
                      value === "stats"
                        ? ""
                        : prev.link,

                    image:
                      value === "stats"
                        ? null
                        : prev.image,

                    imageUrl:
                      value === "stats"
                        ? ""
                        : prev.imageUrl,

                    numberValue:
                      value === "stats"
                        ? prev.numberValue
                        : "",
                  }));

                  if (
                    value === "stats"
                  ) {
                    setImagePreview("");
                  }

                }}
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

            {/* =================================================
                SECTION COMPONENT
            ================================================= */}

            {form.section === "stats" && (
              <NavbarRunningStats
                form={form}
                setForm={setForm}
              />
            )}

            {form.section === "resources" && (
              <FreeLearningResources
                form={form}
                setForm={setForm}

                imagePreview={
                  imagePreview
                }

                setImagePreview={
                  setImagePreview
                }

                imageError={
                  imageError
                }

                setImageError={
                  setImageError
                }

                fileInputRef={
                  fileInputRef
                }

                objectUrlRef={
                  objectUrlRef
                }

                handleImageUrlChange={
                  handleImageUrlChange
                }

                handleFileChange={
                  handleFileChange
                }

                getImageSrc={
                  getImageSrc
                }

                editingId={
                  editingId
                }
              />
            )}

            {form.section === "works" && (
              <FeaturedWorks
                form={form}
                setForm={setForm}

                imagePreview={
                  imagePreview
                }

                setImagePreview={
                  setImagePreview
                }

                imageError={
                  imageError
                }

                setImageError={
                  setImageError
                }

                fileInputRef={
                  fileInputRef
                }

                objectUrlRef={
                  objectUrlRef
                }

                handleImageUrlChange={
                  handleImageUrlChange
                }

                handleFileChange={
                  handleFileChange
                }

                getImageSrc={
                  getImageSrc
                }

                editingId={
                  editingId
                }
              />
            )}

            {form.section === "blogs" && (
              <LatestBlogs
                form={form}
                setForm={setForm}

                imagePreview={
                  imagePreview
                }

                setImagePreview={
                  setImagePreview
                }

                imageError={
                  imageError
                }

                setImageError={
                  setImageError
                }

                fileInputRef={
                  fileInputRef
                }

                objectUrlRef={
                  objectUrlRef
                }

                handleImageUrlChange={
                  handleImageUrlChange
                }

                handleFileChange={
                  handleFileChange
                }

                getImageSrc={
                  getImageSrc
                }

                editingId={
                  editingId
                }
              />
            )}

            {/* =================================================
                BUTTONS
            ================================================= */}

            <div className="flex flex-col sm:flex-row gap-3 pt-2">

              <button
                type="submit"
                disabled={
                  saving ||
                  !form.title.trim()
                }
                className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 disabled:text-zinc-500 text-white px-7 py-3.5 rounded-xl font-medium transition-colors cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg shadow-blue-600/20"
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
                  onClick={() =>
                    resetForm(true)
                  }
                  disabled={saving}
                  className="w-full sm:w-auto bg-zinc-700 hover:bg-zinc-600 disabled:opacity-50 text-white px-7 py-3.5 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}

            </div>

          </form>

          {/* =================================================
              SEARCH + FILTER
          ================================================= */}

          <div className="flex flex-col sm:flex-row gap-3 mb-7 sm:mb-8">

            <div className="relative flex-1">

              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                size={18}
              />

              <input
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                placeholder="Search title, category, section..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500"
              />

            </div>

            <select
              value={filter}
              onChange={(e) =>
                setFilter(
                  e.target.value
                )
              }
              className="w-full sm:w-auto bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-500"
            >

              <option value="all">
                All Contents
              </option>

              <option value="stats">
                Stats
              </option>

              <option value="resources">
                Resources
              </option>

              <option value="works">
                Works
              </option>

              <option value="blogs">
                Blogs
              </option>

            </select>

          </div>

          {/* =================================================
              EXISTING CONTENTS
          ================================================= */}

          <div className="mt-8 sm:mt-14">

            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6 sm:mb-8">

              <h2 className="text-2xl sm:text-3xl font-bold">
                Existing Contents
              </h2>

              <p className="text-xs sm:text-sm text-zinc-500">
                Showing{" "}
                {
                  filteredContents.length
                }{" "}
                of {contents.length}
              </p>

            </div>

            {/* LOADING */}

            {loading ? (
              <div className="space-y-4">

                {[1, 2, 3].map(
                  (i) => (
                    <div
                      key={i}
                      className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-5 sm:p-6"
                    >

                      <div className="h-6 w-56 bg-zinc-800 rounded mb-4" />

                      <div className="h-4 w-full bg-zinc-800 rounded mb-2" />

                      <div className="h-4 w-3/4 bg-zinc-800 rounded" />

                    </div>
                  )
                )}

              </div>

            ) : filteredContents.length === 0 ? (

              <div className="text-zinc-500 text-center py-14 bg-zinc-900/50 rounded-2xl border border-zinc-800">

                <Search
                  className="mx-auto mb-3 opacity-50"
                  size={32}
                />

                <p className="font-medium">
                  No Content Found
                </p>

                <p className="text-xs mt-2">
                  Try changing your
                  search or filter.
                </p>

              </div>

            ) : (

              <div className="grid gap-4 sm:gap-5">

                {filteredContents.map(
                  (item) => (

                    <div
                      key={item._id}
                      className="border border-zinc-800 rounded-2xl p-4 sm:p-6 bg-zinc-900 shadow-lg"
                    >

                      <div className="flex flex-col xl:flex-row xl:justify-between gap-6">

                        {/* CONTENT */}

                        <div className="space-y-2.5 text-zinc-300 min-w-0 flex-1">

                          {/* BADGES */}

                          <div className="flex flex-wrap items-center gap-2 mb-3">

                            <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 capitalize">
                              {item.section ||
                                "unknown"}
                            </span>

                            {item.category && (
                              <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-violet-500/10 border border-violet-500/20 text-violet-400">
                                {
                                  item.category
                                }
                              </span>
                            )}

                          </div>

                          {/* TITLE */}

                          <p className="break-words">

                            <b className="text-white">
                              Title:
                            </b>{" "}

                            {item.title ||
                              "Untitled"}

                          </p>

                          {/* SUBTITLE */}

                          {item.subtitle && (
                            <p className="break-words leading-relaxed">

                              <b className="text-white">
                                Description:
                              </b>{" "}

                              {
                                item.subtitle
                              }

                            </p>
                          )}

                          {/* NUMBER */}

                          {item.numberValue && (
                            <p>

                              <b className="text-white">
                                Number:
                              </b>{" "}

                              {
                                item.numberValue
                              }

                            </p>
                          )}

                          {/* LINK */}

                          {item.link && (
                            <div className="flex flex-wrap items-center gap-2">

                              <b className="text-white">
                                Link:
                              </b>

                              <a
                                href={
                                  item.link
                                }
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 underline hover:text-blue-300 inline-flex items-center gap-1 max-w-full"
                              >

                                <span className="truncate max-w-[250px] sm:max-w-[450px]">
                                  Open Link
                                </span>

                                <ExternalLink
                                  size={14}
                                />

                              </a>

                            </div>
                          )}

                          {/* CREATED */}

                          {item.createdAt && (
                            <p className="text-xs text-zinc-500 pt-1">

                              Created:{" "}

                              {new Date(
                                item.createdAt
                              ).toLocaleString()}

                            </p>
                          )}

                          {/* IMAGE */}

                          {item.image ? (

                            <div className="pt-3">

                              <p className="text-sm font-semibold text-white mb-2 flex items-center gap-2">

                                <ImageIcon
                                  size={15}
                                />

                                Image

                              </p>

                              <div className="relative w-full max-w-sm h-44 sm:h-52 rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800">

                                <img
                                  src={getImageSrc(
                                    item.image
                                  )}
                                  alt={
                                    item.title ||
                                    "Content image"
                                  }
                                  className="w-full h-full object-cover hover:scale-105 transition duration-300"
                                  onError={(e) => {

                                    e.currentTarget.style.display =
                                      "none";

                                    const parent =
                                      e.currentTarget
                                        .parentElement;

                                    if (parent) {

                                      const message =
                                        document.createElement(
                                          "div"
                                        );

                                      message.className =
                                        "absolute inset-0 flex flex-col items-center justify-center text-center px-4 text-zinc-500";

                                      message.innerHTML = `
                                        <div style="font-size: 28px; margin-bottom: 8px;">
                                          🖼️
                                        </div>

                                        <div style="font-weight: 600; color: #a1a1aa;">
                                          Image unavailable
                                        </div>

                                        <div style="font-size: 12px; margin-top: 4px;">
                                          Check image URL/path
                                        </div>
                                      `;

                                      parent.appendChild(
                                        message
                                      );
                                    }
                                  }}
                                />

                              </div>

                            </div>

                          ) : (

                            item.section !==
                              "stats" && (
                              <div className="w-full max-w-sm h-40 rounded-xl bg-zinc-100 border flex flex-col items-center justify-center text-zinc-500 mt-3 font-medium">

                                <ImageIcon
                                  size={28}
                                  className="mb-2 opacity-50"
                                />

                                No Image

                              </div>
                            )

                          )}

                        </div>

                        {/* ACTIONS */}

                        <div className="flex flex-row xl:flex-col gap-2.5 xl:min-w-[120px] xl:self-start">

                          <button
                            type="button"
                            onClick={() =>
                              editItem(
                                item
                              )
                            }
                            className="flex-1 xl:flex-none bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2.5 rounded-xl font-semibold transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
                          >

                            <Pencil size={16} />

                            Edit

                          </button>

                          <button
                            type="button"
                            onClick={() => {

                              setSelectedId(
                                item._id
                              );

                              setDeleteModal(
                                true
                              );

                            }}
                            disabled={
                              deletingId ===
                              item._id
                            }
                            className="flex-1 xl:flex-none bg-red-600 hover:bg-red-700 disabled:bg-red-900 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl transition duration-300 cursor-pointer flex items-center justify-center gap-2"
                          >

                            {deletingId ===
                            item._id ? (
                              <Loader2
                                className="animate-spin"
                                size={16}
                              />
                            ) : (
                              <Trash2
                                size={16}
                              />
                            )}

                            {deletingId ===
                            item._id
                              ? "Deleting..."
                              : "Delete"}

                          </button>

                        </div>

                      </div>

                    </div>

                  )
                )}

              </div>

            )}

          </div>

        </main>

        {/* =================================================
            DELETE MODAL
        ================================================= */}

        {deleteModal && (
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center z-50 p-4"
            onMouseDown={(e) => {

              if (
                e.target ===
                e.currentTarget
              ) {
                closeDeleteModal();
              }

            }}
          >

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
                Are you sure you want
                to permanently delete
                this content? This
                action cannot be undone.
              </p>

              <div className="flex flex-col-reverse sm:flex-row justify-end gap-3 mt-7">

                <button
                  type="button"
                  onClick={
                    closeDeleteModal
                  }
                  disabled={
                    !!deletingId
                  }
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-zinc-200 hover:bg-zinc-300 disabled:opacity-50 text-zinc-800 cursor-pointer font-medium"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() =>
                    deleteItem(
                      selectedId
                    )
                  }
                  disabled={
                    !!deletingId ||
                    !selectedId
                  }
                  className="w-full sm:w-auto px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 disabled:bg-red-400 disabled:cursor-not-allowed text-white cursor-pointer font-medium flex items-center justify-center gap-2"
                >

                  {deletingId ? (
                    <Loader2
                      className="animate-spin"
                      size={16}
                    />
                  ) : (
                    <Trash2 size={16} />
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