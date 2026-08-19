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

  // Added missing icons
  ChevronRight,
  TrendingUp,
  Activity,
  LayoutDashboard,
  BriefcaseBusiness,
  Layers3,
  Settings,
  Sparkles,
  Clock3,
  BarChart3,
  BookOpen,
  FileText,
  Database,
} from "lucide-react";

// =========================================================
// ADMIN COMPONENTS
// =========================================================

import NavbarRunningStats from "../components/NavbarRunningStats";
import FreeLearningResources from "../components/FreeLearningResources";
import FeaturedWorks from "../components/FeaturedWorks";
import LatestBlogs from "../components/LatestBlogs";

// =========================================================
// SIDEBAR ITEM
// =========================================================

function SidebarItem({
  icon: Icon,
  label,
  active = false,
  onClick,
  href,
}) {
  const content = (
    <div
      className={`
        group flex items-center gap-3 px-3.5 py-2.5 rounded-xl
        transition-all duration-200 cursor-pointer
        ${
          active
            ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
            : "text-zinc-400 hover:bg-zinc-800/80 hover:text-white"
        }
      `}
      onClick={onClick}
    >
      <Icon
        size={18}
        className={
          active
            ? "text-white"
            : "text-zinc-500 group-hover:text-zinc-200"
        }
      />

      <span className="text-sm font-medium">{label}</span>

      {active && (
        <ChevronRight
          size={15}
          className="ml-auto opacity-70"
        />
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

// =========================================================
// STAT CARD
// =========================================================

function StatCard({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
  iconBg,
}) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-700 hover:shadow-xl hover:shadow-black/20">
      <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition" />

      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
            {title}
          </p>

          <h3 className="mt-2 text-3xl font-black tracking-tight text-white">
            {value}
          </h3>

          <div className="mt-2 flex items-center gap-1.5">
            <TrendingUp
              size={13}
              className="text-emerald-400"
            />

            <span className="text-xs font-medium text-emerald-400">
              {description}
            </span>
          </div>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon
            size={20}
            className={iconClass}
          />
        </div>
      </div>
    </div>
  );
}

// =========================================================
// ACTIVITY CHART
// =========================================================

function ActivityChart({ contents }) {
  const monthlyData = useMemo(() => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const values = new Array(12).fill(0);

    contents.forEach((item) => {
      if (!item.createdAt) return;

      const date = new Date(item.createdAt);

      if (!Number.isNaN(date.getTime())) {
        values[date.getMonth()] += 1;
      }
    });

    const max = Math.max(...values, 5);

    return {
      months,
      values,
      max,
    };
  }, [contents]);

  const width = 760;
  const height = 260;
  const paddingX = 35;
  const paddingY = 25;

  const points = activityPoints(
    monthlyData.values,
    monthlyData.max,
    width,
    height,
    paddingX,
    paddingY
  );

  const linePath = points
    .map(
      (point, index) =>
        `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`
    )
    .join(" ");

  const areaPath = `
    ${linePath}
    L ${
      points[points.length - 1]?.x ||
      width - paddingX
    } ${height - paddingY}
    L ${
      points[0]?.x || paddingX
    } ${height - paddingY}
    Z
  `;

  return (
    <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <Activity
              size={18}
              className="text-blue-400"
            />

            <h2 className="text-lg font-bold text-white">
              Content Activity
            </h2>
          </div>

          <p className="mt-1 text-xs text-zinc-500">
            Content creation activity throughout the year
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs text-zinc-400">
          <span className="h-2 w-2 rounded-full bg-blue-500" />
          All Content
        </div>
      </div>

      <div className="w-full overflow-hidden">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="h-[250px] w-full"
          preserveAspectRatio="none"
        >
          {/* Grid */}

          {[0, 1, 2, 3, 4].map((line) => {
            const y =
              paddingY +
              ((height - paddingY * 2) / 4) *
                line;

            return (
              <line
                key={line}
                x1={paddingX}
                x2={width - paddingX}
                y1={y}
                y2={y}
                stroke="currentColor"
                className="text-zinc-800"
                strokeWidth="1"
              />
            );
          })}

          {/* Area */}

          <path
            d={areaPath}
            fill="url(#activityGradient)"
            opacity="0.3"
          />

          {/* Line */}

          <path
            d={linePath}
            fill="none"
            stroke="currentColor"
            className="text-blue-500"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Points */}

          {points.map((point, index) => (
            <circle
              key={index}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="currentColor"
              className="text-blue-500"
            />
          ))}

          <defs>
            <linearGradient
              id="activityGradient"
              x1="0"
              y1="0"
              x2="0"
              y2="1"
            >
              <stop
                offset="0%"
                stopColor="#3b82f6"
              />

              <stop
                offset="100%"
                stopColor="#3b82f6"
                stopOpacity="0"
              />
            </linearGradient>
          </defs>

          {/* Month labels */}

          {monthlyData.months.map(
            (month, index) => {
              const x =
                paddingX +
                (index *
                  (width - paddingX * 2)) /
                  11;

              return (
                <text
                  key={month}
                  x={x}
                  y={height - 5}
                  textAnchor="middle"
                  className="fill-zinc-500 text-[11px]"
                >
                  {month}
                </text>
              );
            }
          )}
        </svg>
      </div>
    </div>
  );
}

// =========================================================
// ACTIVITY POINTS
// =========================================================

function activityPoints(
  values,
  max,
  width,
  height,
  paddingX,
  paddingY
) {
  return values.map((value, index) => {
    const x =
      paddingX +
      (index *
        (width - paddingX * 2)) /
        11;

    const usableHeight =
      height - paddingY * 2;

    const y =
      height -
      paddingY -
      (value / max) * usableHeight;

    return {
      x,
      y,
    };
  });
}

// =========================================================
// MAIN PAGE
// =========================================================

export default function AdminPage() {
  // =========================================================
  // STATES
  // =========================================================

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const [deleteModal, setDeleteModal] =
    useState(false);

  const [selectedId, setSelectedId] =
    useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] =
    useState("all");

  const [editingId, setEditingId] =
    useState(null);

  const [currentTime, setCurrentTime] =
    useState("");

  const [mobileMenu, setMobileMenu] =
    useState(false);

  const [imagePreview, setImagePreview] =
    useState("");

  const [imageError, setImageError] =
    useState(false);

  const [activeView, setActiveView] =
    useState("dashboard");

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
        new Date().toLocaleString(
          "en-US",
          {
            dateStyle: "medium",
            timeStyle: "short",
          }
        )
      );
    };

    updateTime();

    const timer = setInterval(
      updateTime,
      60000
    );

    return () =>
      clearInterval(timer);
  }, []);

  // =========================================================
  // CLEAN OBJECT URL
  // =========================================================

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) {
        URL.revokeObjectURL(
          objectUrlRef.current
        );
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
        (item) =>
          item.section ===
          "resources"
      ).length,

      blogs: contents.filter(
        (item) =>
          item.section === "blogs"
      ).length,

      works: contents.filter(
        (item) =>
          item.section === "works"
      ).length,

      stats: contents.filter(
        (item) =>
          item.section === "stats"
      ).length,
    };
  }, [contents]);

  const [animatedStats, setAnimatedStats] =
    useState({
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
        total: Math.min(
          current,
          stats.total
        ),

        resources: Math.min(
          current,
          stats.resources
        ),

        blogs: Math.min(
          current,
          stats.blogs
        ),

        works: Math.min(
          current,
          stats.works
        ),

        stats: Math.min(
          current,
          stats.stats
        ),
      });

      if (current >= maxValue) {
        clearInterval(timer);
      }
    }, 30);

    return () =>
      clearInterval(timer);
  }, [stats]);

  // =========================================================
  // LOAD DATA
  // =========================================================

  async function loadData(
    showToast = false
  ) {
    setLoading(true);

    try {
      const res = await fetch(
        "/api/content",
        {
          method: "GET",
          cache: "no-store",
        }
      );

      if (!res.ok) {
        throw new Error(
          `HTTP error: ${res.status}`
        );
      }

      const data = await res.json();

      if (data.success) {
        const items = Array.isArray(
          data.data
        )
          ? data.data
          : [];

        setContents(items);

        if (showToast) {
          toast.success(
            "Dashboard refreshed"
          );
        }
      } else {
        toast.error(
          data.error ||
            "Failed to load contents"
        );
      }
    } catch (error) {
      console.error(
        "LOAD DATA ERROR:",
        error
      );

      toast.error(
        "Failed to load contents"
      );
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

  function resetForm(
    scroll = true
  ) {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(
        objectUrlRef.current
      );

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
      fileInputRef.current.value =
        "";
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
      toast.error(
        "Title is required"
      );

      return false;
    }

    if (title.length < 3) {
      toast.error(
        "Title must be at least 3 characters"
      );

      return false;
    }

    if (
      (form.section === "works" ||
        form.section ===
          "resources") &&
      !form.subtitle.trim()
    ) {
      toast.error(
        "Description is required"
      );

      return false;
    }

    if (
      (form.section === "works" ||
        form.section ===
          "resources") &&
      form.subtitle.trim().length <
        5
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
        toast.error(
          "Invalid Website / Google Drive URL"
        );

        return false;
      }
    }

    if (form.imageUrl.trim()) {
      try {
        new URL(
          form.imageUrl.trim()
        );
      } catch {
        toast.error(
          "Invalid Image URL"
        );

        return false;
      }
    }

    if (
      form.section === "works" &&
      !form.category.trim()
    ) {
      toast.error(
        "Category is required for works"
      );

      return false;
    }

    if (
      form.section === "blogs" &&
      !form.category.trim()
    ) {
      toast.error(
        "Category is required for blogs"
      );

      return false;
    }

    return true;
  }

  // =========================================================
  // DUPLICATE TITLE
  // =========================================================

  function isDuplicateTitle() {
    const currentTitle =
      form.title
        .trim()
        .toLowerCase();

    return contents.some(
      (item) =>
        item.title
          ?.trim()
          .toLowerCase() ===
          currentTitle &&
        item._id !== editingId
    );
  }

  // =========================================================
  // FILTER
  // =========================================================

  const filteredContents =
    useMemo(() => {
      const searchValue = search
        .toLowerCase()
        .trim();

      return contents.filter(
        (item) => {
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

          return (
            matchSearch &&
            matchSection
          );
        }
      );
    }, [
      contents,
      search,
      filter,
    ]);

  // =========================================================
  // ADD / UPDATE
  // =========================================================

  async function addContent(e) {
    e.preventDefault();

    if (saving) return;

    if (!validateForm()) return;

    if (isDuplicateTitle()) {
      toast.error(
        "This title already exists"
      );

      return;
    }

    setSaving(true);

    try {
      const formData =
        new FormData();

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

      if (
        form.image instanceof File
      ) {
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

      const data =
        await res.json();

      if (
        !res.ok ||
        !data.success
      ) {
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
        `/api/content?id=${encodeURIComponent(
          id
        )}`,
        {
          method: "DELETE",
        }
      );

      const data =
        await res.json();

      if (
        !res.ok ||
        !data.success
      ) {
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
          (item) =>
            item._id !== id
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

    setImagePreview(
      existingImage
    );

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
      fileInputRef.current.value =
        "";
    }

    setActiveView("manage");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // =========================================================
  // IMAGE URL
  // =========================================================

  function handleImageUrlChange(
    value
  ) {
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

    if (
      !file.type.startsWith(
        "image/"
      )
    ) {
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
  // IMAGE SOURCE
  // =========================================================

  function getImageSrc(image) {
    if (!image) return "";

    const value =
      String(image).trim();

    if (!value) return "";

    if (
      value.startsWith(
        "http://"
      ) ||
      value.startsWith(
        "https://"
      ) ||
      value.startsWith("blob:") ||
      value.startsWith("data:")
    ) {
      return value;
    }

    if (value.startsWith("/")) {
      return encodeURI(value);
    }

    return encodeURI(
      `/${value}`
    );
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
  // DELETE MODAL
  // =========================================================

  function closeDeleteModal() {
    if (deletingId) return;

    setDeleteModal(false);
    setSelectedId(null);
  }

  // =========================================================
  // RECENT CONTENTS
  // =========================================================

  const recentContents =
    useMemo(() => {
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
        .slice(0, 6);
    }, [contents]);

  // =========================================================
  // SECTION LABEL
  // =========================================================

  function getSectionLabel(
    section
  ) {
    const labels = {
      stats: "Running Stats",
      resources:
        "Learning Resource",
      works: "Featured Work",
      blogs: "Latest Blog",
    };

    return (
      labels[section] ||
      section ||
      "Content"
    );
  }

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

      <div className="min-h-screen bg-[#09090b] text-white overflow-x-hidden">

        {/* =====================================================
            MOBILE OVERLAY
        ===================================================== */}

        {mobileMenu && (
          <div
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            onClick={() =>
              setMobileMenu(false)
            }
          />
        )}

        {/* =====================================================
            SIDEBAR
        ===================================================== */}

        <aside
          className={`
            fixed left-0 top-0 z-50
            h-screen w-[270px]
            border-r border-zinc-800
            bg-[#0c0c0f]
            transition-transform duration-300
            lg:translate-x-0
            ${
              mobileMenu
                ? "translate-x-0"
                : "-translate-x-full"
            }
          `}
        >

          {/* Logo */}

          <div className="flex h-[76px] items-center justify-between border-b border-zinc-800 px-5">
            <Link
              href="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 shadow-lg shadow-blue-500/20">
                <span className="text-xl font-black">
                  Z
                </span>
              </div>

              <div>
                <h1 className="text-base font-black tracking-wide">
                  ZYNTRIX
                </h1>

                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  Lab CMS
                </p>
              </div>
            </Link>

            <button
              type="button"
              onClick={() =>
                setMobileMenu(false)
              }
              className="rounded-lg p-2 text-zinc-500 hover:bg-zinc-800 hover:text-white lg:hidden"
            >
              <X size={19} />
            </button>
          </div>

          {/* Navigation */}

          <div className="h-[calc(100vh-76px)] overflow-y-auto px-3 py-5">

            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
              Overview
            </p>

            <nav className="space-y-1">

              <SidebarItem
                icon={LayoutDashboard}
                label="Dashboard"
                active={
                  activeView ===
                  "dashboard"
                }
                onClick={() => {
                  setActiveView(
                    "dashboard"
                  );

                  setMobileMenu(false);
                }}
              />

              <SidebarItem
                icon={BarChart3}
                label="Analytics"
                onClick={() =>
                  toast(
                    "Analytics overview coming soon"
                  )
                }
              />

            </nav>

            <div className="my-6 h-px bg-zinc-800" />

            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
              Content
            </p>

            <nav className="space-y-1">

              <SidebarItem
                icon={BookOpen}
                label="Learning Resources"
                onClick={() => {
                  setActiveView(
                    "manage"
                  );

                  setFilter(
                    "resources"
                  );

                  setMobileMenu(false);

                  setTimeout(() => {
                    document
                      .getElementById(
                        "content-manager"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                      });
                  }, 100);
                }}
              />

              <SidebarItem
                icon={BriefcaseBusiness}
                label="Featured Works"
                onClick={() => {
                  setActiveView(
                    "manage"
                  );

                  setFilter("works");

                  setMobileMenu(false);

                  setTimeout(() => {
                    document
                      .getElementById(
                        "content-manager"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                      });
                  }, 100);
                }}
              />

              <SidebarItem
                icon={FileText}
                label="Latest Blogs"
                onClick={() => {
                  setActiveView(
                    "manage"
                  );

                  setFilter("blogs");

                  setMobileMenu(false);

                  setTimeout(() => {
                    document
                      .getElementById(
                        "content-manager"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                      });
                  }, 100);
                }}
              />

              <SidebarItem
                icon={Layers3}
                label="All Contents"
                active={
                  activeView ===
                  "manage"
                }
                onClick={() => {
                  setActiveView(
                    "manage"
                  );

                  setFilter("all");

                  setMobileMenu(false);

                  setTimeout(() => {
                    document
                      .getElementById(
                        "content-manager"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                      });
                  }, 100);
                }}
              />

            </nav>

            <div className="my-6 h-px bg-zinc-800" />

            <p className="px-3 mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-600">
              System
            </p>

            <nav className="space-y-1">

              <SidebarItem
                icon={Settings}
                label="Settings"
                onClick={() =>
                  toast(
                    "Settings coming soon"
                  )
                }
              />

              <SidebarItem
                icon={Home}
                label="View Website"
                href="/"
              />

            </nav>

            {/* Bottom User */}

            <div className="mt-8 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-3">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                  A
                </div>

                <div className="min-w-0">

                  <p className="truncate text-sm font-semibold text-white">
                    Admin User
                  </p>

                  <p className="truncate text-xs text-zinc-500">
                    Administrator
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={logout}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-red-500/10 px-3 py-2.5 text-xs font-semibold text-red-400 transition hover:bg-red-500/20"
              >
                <LogOut size={15} />
                Logout
              </button>

            </div>

          </div>
        </aside>

        {/* =====================================================
            MAIN AREA
        ===================================================== */}

        <div className="lg:pl-[270px]">

          {/* ===================================================
              TOP NAVBAR
          =================================================== */}

          <header className="sticky top-0 z-30 border-b border-zinc-800 bg-[#09090b]/85 backdrop-blur-xl">

            <div className="flex min-h-[76px] items-center justify-between gap-4 px-4 sm:px-6 xl:px-8">

              {/* Mobile */}

              <button
                type="button"
                onClick={() =>
                  setMobileMenu(true)
                }
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-300 lg:hidden"
              >
                <Menu size={20} />
              </button>

              {/* Search */}

              <div className="relative hidden max-w-xl flex-1 md:block">

                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search resources, blogs, works..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900/80 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none transition focus:border-blue-500/60 focus:bg-zinc-900"
                />

              </div>

              {/* Right */}

              <div className="ml-auto flex items-center gap-2 sm:gap-3">

                <button
                  type="button"
                  onClick={() =>
                    loadData(true)
                  }
                  disabled={loading}
                  className="hidden h-10 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-3 text-sm text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 sm:flex"
                >
                  <RefreshCw
                    size={16}
                    className={
                      loading
                        ? "animate-spin"
                        : ""
                    }
                  />

                  <span className="hidden xl:block">
                    Refresh
                  </span>
                </button>

                <button
                  type="button"
                  className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white"
                >
                  <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-red-500" />
                  <Activity size={17} />
                </button>

                <div className="hidden h-8 w-px bg-zinc-800 sm:block" />

                <div className="hidden items-center gap-3 sm:flex">

                  <div className="text-right">

                    <p className="text-xs font-semibold text-white">
                      Admin User
                    </p>

                    <p className="text-[10px] text-zinc-500">
                      Administrator
                    </p>

                  </div>

                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-700 bg-gradient-to-br from-blue-500 to-purple-600 text-sm font-bold">
                    A
                  </div>

                </div>

                <button
                  type="button"
                  onClick={logout}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400 hover:bg-red-500/20 sm:hidden"
                >
                  <LogOut size={17} />
                </button>

              </div>

            </div>

            {/* Mobile Search */}

            <div className="px-4 pb-4 md:hidden">

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search contents..."
                  className="w-full rounded-xl border border-zinc-800 bg-zinc-900 py-3 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/60"
                />

              </div>

            </div>

          </header>

          {/* ===================================================
              CONTENT
          =================================================== */}

          <main className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 xl:px-8">

            {/* HERO */}

            <section className="mb-7">

              <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-400">

                    <Sparkles size={14} />

                    ADMIN PANEL

                    <span className="text-zinc-700">
                      /
                    </span>

                    DASHBOARD

                  </div>

                  <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl xl:text-4xl">
                    Welcome back, Admin!
                  </h1>

                  <p className="mt-2 max-w-2xl text-sm text-zinc-500">
                    Manage your website
                    content, resources,
                    blogs and featured
                    works from one place.
                  </p>

                </div>

                <div className="flex flex-wrap gap-3">

                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/70 px-4 py-3">

                    <div className="flex items-center gap-2">

                      <Clock3
                        size={14}
                        className="text-zinc-500"
                      />

                      <span className="text-[10px] uppercase tracking-wider text-zinc-500">
                        Last Updated
                      </span>

                    </div>

                    <p className="mt-1 text-xs font-semibold text-white">
                      {currentTime ||
                        "Loading..."}
                    </p>

                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      resetForm(true);

                      setActiveView(
                        "manage"
                      );
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500"
                  >
                    <Plus size={17} />
                    Add Content
                  </button>

                </div>

              </div>

            </section>

            {/* =================================================
                STAT CARDS
            ================================================= */}

            <section className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">

              <StatCard
                title="Total Contents"
                value={
                  animatedStats.total
                }
                description="+24% this month"
                icon={Database}
                iconClass="text-blue-400"
                iconBg="bg-blue-500/10"
              />

              <StatCard
                title="Resources"
                value={
                  animatedStats.resources
                }
                description="+18% this month"
                icon={BookOpen}
                iconClass="text-emerald-400"
                iconBg="bg-emerald-500/10"
              />

              <StatCard
                title="Blogs"
                value={
                  animatedStats.blogs
                }
                description="+12% this month"
                icon={FileText}
                iconClass="text-purple-400"
                iconBg="bg-purple-500/10"
              />

              <StatCard
                title="Featured Works"
                value={
                  animatedStats.works
                }
                description="+9% this month"
                icon={
                  BriefcaseBusiness
                }
                iconClass="text-orange-400"
                iconBg="bg-orange-500/10"
              />

              <StatCard
                title="Running Stats"
                value={
                  animatedStats.stats
                }
                description="Active sections"
                icon={BarChart3}
                iconClass="text-pink-400"
                iconBg="bg-pink-500/10"
              />

            </section>

            {/* =================================================
                CHART + RECENT ACTIVITY
            ================================================= */}

            <section className="mb-8 grid gap-5 xl:grid-cols-3">

              <div className="xl:col-span-2">
                <ActivityChart
                  contents={contents}
                />
              </div>

              {/* Recent */}

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h2 className="text-lg font-bold text-white">
                      Recent Activity
                    </h2>

                    <p className="mt-1 text-xs text-zinc-500">
                      Latest content updates
                    </p>

                  </div>

                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">
                    <Activity
                      size={17}
                      className="text-blue-400"
                    />
                  </div>

                </div>

                <div className="space-y-4">

                  {recentContents.length >
                  0 ? (
                    recentContents.map(
                      (
                        item,
                        index
                      ) => (
                        <div
                          key={
                            item._id
                          }
                          className="flex gap-3"
                        >

                          <div className="relative">

                            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-800 bg-zinc-950">

                              {item.section ===
                              "blogs" ? (
                                <FileText
                                  size={
                                    15
                                  }
                                  className="text-purple-400"
                                />
                              ) : item.section ===
                                "resources" ? (
                                <BookOpen
                                  size={
                                    15
                                  }
                                  className="text-emerald-400"
                                />
                              ) : (
                                <Layers3
                                  size={
                                    15
                                  }
                                  className="text-blue-400"
                                />
                              )}

                            </div>

                            {index !==
                              recentContents.length -
                                1 && (
                              <div className="absolute left-1/2 top-9 h-5 w-px -translate-x-1/2 bg-zinc-800" />
                            )}

                          </div>

                          <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-semibold text-zinc-200">
                              {item.title ||
                                "Untitled"}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-zinc-500">
                              {getSectionLabel(
                                item.section
                              )}
                            </p>

                            <p className="mt-1 text-[10px] text-zinc-600">
                              {item.createdAt
                                ? new Date(
                                    item.createdAt
                                  ).toLocaleDateString()
                                : "Recently added"}
                            </p>

                          </div>

                        </div>
                      )
                    )
                  ) : (
                    <div className="py-10 text-center">

                      <Activity
                        size={28}
                        className="mx-auto mb-3 text-zinc-700"
                      />

                      <p className="text-sm text-zinc-500">
                        No recent activity
                      </p>

                    </div>
                  )}

                </div>

                <button
                  type="button"
                  onClick={() => {
                    setActiveView(
                      "manage"
                    );

                    document
                      .getElementById(
                        "content-manager"
                      )
                      ?.scrollIntoView({
                        behavior:
                          "smooth",
                      });
                  }}
                  className="mt-5 w-full rounded-xl border border-zinc-800 bg-zinc-950 py-2.5 text-xs font-semibold text-zinc-300 transition hover:border-zinc-700 hover:bg-zinc-800 hover:text-white"
                >
                  View All Contents
                </button>

              </div>

            </section>

            {/* =================================================
                QUICK ACTIONS
            ================================================= */}

            <section className="mb-8">

              <div className="mb-4">

                <h2 className="text-xl font-bold text-white">
                  Quick Actions
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Quickly create or manage
                  your website content.
                </p>

              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                {/* New Content */}

                <button
                  type="button"
                  onClick={() => {
                    resetForm(true);

                    setActiveView(
                      "manage"
                    );
                  }}
                  className="group rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-600/15 to-blue-600/5 p-5 text-left transition hover:-translate-y-1 hover:border-blue-500/40"
                >

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/15">

                    <Plus
                      size={21}
                      className="text-blue-400"
                    />

                  </div>

                  <h3 className="font-bold text-white">
                    New Content
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Add a new resource,
                    blog, work or stat.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-blue-400">
                    Create now
                    <ChevronRight
                      size={13}
                    />
                  </div>

                </button>

                {/* Resources */}

                <button
                  type="button"
                  onClick={() => {
                    setFilter(
                      "resources"
                    );

                    setActiveView(
                      "manage"
                    );

                    setTimeout(() => {
                      document
                        .getElementById(
                          "content-manager"
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",
                        });
                    }, 50);
                  }}
                  className="group rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-600/15 to-emerald-600/5 p-5 text-left transition hover:-translate-y-1 hover:border-emerald-500/40"
                >

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/15">

                    <BookOpen
                      size={21}
                      className="text-emerald-400"
                    />

                  </div>

                  <h3 className="font-bold text-white">
                    Resources
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Manage your learning
                    resources.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-emerald-400">
                    Manage
                    <ChevronRight
                      size={13}
                    />
                  </div>

                </button>

                {/* Blogs */}

                <button
                  type="button"
                  onClick={() => {
                    setFilter("blogs");

                    setActiveView(
                      "manage"
                    );

                    setTimeout(() => {
                      document
                        .getElementById(
                          "content-manager"
                        )
                        ?.scrollIntoView({
                          behavior:
                            "smooth",
                        });
                    }, 50);
                  }}
                  className="group rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-600/15 to-purple-600/5 p-5 text-left transition hover:-translate-y-1 hover:border-purple-500/40"
                >

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/15">

                    <FileText
                      size={21}
                      className="text-purple-400"
                    />

                  </div>

                  <h3 className="font-bold text-white">
                    Latest Blogs
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Publish and update
                    blog content.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-purple-400">
                    Manage
                    <ChevronRight
                      size={13}
                    />
                  </div>

                </button>

                {/* Refresh */}

                <button
                  type="button"
                  onClick={() =>
                    loadData(true)
                  }
                  className="group rounded-2xl border border-orange-500/20 bg-gradient-to-br from-orange-600/15 to-orange-600/5 p-5 text-left transition hover:-translate-y-1 hover:border-orange-500/40"
                >

                  <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/15">

                    <RefreshCw
                      size={21}
                      className={`text-orange-400 ${
                        loading
                          ? "animate-spin"
                          : ""
                      }`}
                    />

                  </div>

                  <h3 className="font-bold text-white">
                    Refresh Data
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-zinc-500">
                    Reload the latest
                    dashboard data.
                  </p>

                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-orange-400">
                    Refresh now
                    <ChevronRight
                      size={13}
                    />
                  </div>

                </button>

              </div>

            </section>

            {/* =================================================
                CONTENT MANAGER
            ================================================= */}

            <section
              id="content-manager"
              className="scroll-mt-28"
            >

              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <Layers3
                      size={19}
                      className="text-blue-400"
                    />

                    <h2 className="text-xl font-bold text-white">
                      Content Manager
                    </h2>

                  </div>

                  <p className="mt-1 text-xs text-zinc-500">
                    Create, edit, search and
                    manage all website content.
                  </p>

                </div>

                <div className="flex flex-wrap items-center gap-2">

                  <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-xs text-zinc-400">

                    Showing{" "}

                    <span className="font-bold text-white">
                      {
                        filteredContents.length
                      }
                    </span>{" "}

                    /{" "}

                    <span className="font-bold text-white">
                      {contents.length}
                    </span>

                  </div>

                </div>

              </div>

              {/* =================================================
                  FORM
              ================================================= */}

              <form
                onSubmit={addContent}
                className="mb-8 rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 shadow-xl shadow-black/10 sm:p-6 lg:p-8"
              >

                {/* Form header */}

                <div className="mb-7 flex flex-col gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center sm:justify-between">

                  <div>

                    <div className="flex items-center gap-2">

                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10">

                        {editingId ? (
                          <Pencil
                            size={17}
                            className="text-yellow-400"
                          />
                        ) : (
                          <Plus
                            size={17}
                            className="text-blue-400"
                          />
                        )}

                      </div>

                      <h3 className="text-lg font-bold text-white">
                        {editingId
                          ? "Edit Content"
                          : "Create New Content"}
                      </h3>

                    </div>

                    <p className="mt-2 text-xs text-zinc-500">
                      {editingId
                        ? "Update the selected content below."
                        : "Add new content to your website."}
                    </p>

                  </div>

                  {editingId && (
                    <span className="w-fit rounded-lg border border-yellow-500/20 bg-yellow-500/10 px-3 py-1.5 text-xs font-bold text-yellow-400">
                      Editing Mode
                    </span>
                  )}

                </div>

                {/* Section */}

                <div className="mb-6">

                  <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-zinc-500">
                    Content Section
                  </label>

                  <select
                    required
                    value={
                      form.section
                    }
                    onChange={(e) => {
                      const value =
                        e.target.value;

                      setForm(
                        (prev) => ({
                          ...prev,

                          section:
                            value,

                          category:
                            value ===
                            "works"
                              ? "UI/UX Design"
                              : "",

                          subtitle:
                            value ===
                              "stats" ||
                            value ===
                              "blogs"
                              ? ""
                              : prev.subtitle,

                          link:
                            value ===
                            "stats"
                              ? ""
                              : prev.link,

                          image:
                            value ===
                            "stats"
                              ? null
                              : prev.image,

                          imageUrl:
                            value ===
                            "stats"
                              ? ""
                              : prev.imageUrl,

                          numberValue:
                            value ===
                            "stats"
                              ? prev.numberValue
                              : "",
                        })
                      );

                      if (
                        value ===
                        "stats"
                      ) {
                        setImagePreview(
                          ""
                        );
                      }
                    }}
                    className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none transition focus:border-blue-500/60"
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

                {/* Section Components */}

                {form.section ===
                  "stats" && (
                  <NavbarRunningStats
                    form={form}
                    setForm={setForm}
                  />
                )}

                {form.section ===
                  "resources" && (
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

                {form.section ===
                  "works" && (
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

                {form.section ===
                  "blogs" && (
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

                {/* Buttons */}

                <div className="mt-7 flex flex-col gap-3 border-t border-zinc-800 pt-6 sm:flex-row">

                  <button
                    type="submit"
                    disabled={
                      saving ||
                      !form.title.trim()
                    }
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-7 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-600 sm:w-auto"
                  >

                    {saving ? (
                      <>
                        <Loader2
                          size={17}
                          className="animate-spin"
                        />

                        Saving...
                      </>
                    ) : (
                      <>
                        {editingId ? (
                          <Pencil
                            size={17}
                          />
                        ) : (
                          <Plus
                            size={17}
                          />
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
                      className="w-full rounded-xl border border-zinc-700 bg-zinc-800 px-7 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-700 disabled:opacity-50 sm:w-auto"
                    >
                      Cancel Edit
                    </button>
                  )}

                </div>

              </form>

              {/* =================================================
                  SEARCH + FILTER
              ================================================= */}

              <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900/70 p-4">

                <div className="flex flex-col gap-3 lg:flex-row">

                  <div className="relative flex-1">

                    <Search
                      size={17}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                    />

                    <input
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value
                        )
                      }
                      placeholder="Search title, description, category..."
                      className="w-full rounded-xl border border-zinc-800 bg-zinc-950 py-3.5 pl-11 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-blue-500/60"
                    />

                  </div>

                  <select
                    value={filter}
                    onChange={(e) =>
                      setFilter(
                        e.target.value
                      )
                    }
                    className="rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3.5 text-sm text-white outline-none focus:border-blue-500/60"
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

              </div>

              {/* =================================================
                  EXISTING CONTENTS
              ================================================= */}

              <div>

                <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                  <h3 className="text-lg font-bold text-white">
                    Existing Contents
                  </h3>

                  <span className="text-xs text-zinc-600">
                    {
                      filteredContents.length
                    }{" "}
                    results
                  </span>

                </div>

                {/* Loading */}

                {loading ? (
                  <div className="space-y-4">

                    {[1, 2, 3].map(
                      (item) => (
                        <div
                          key={item}
                          className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                        >

                          <div className="mb-4 h-5 w-48 rounded bg-zinc-800" />

                          <div className="mb-2 h-4 w-full rounded bg-zinc-800" />

                          <div className="h-4 w-2/3 rounded bg-zinc-800" />

                        </div>
                      )
                    )}

                  </div>
                ) : filteredContents.length ===
                  0 ? (
                  <div className="rounded-2xl border border-dashed border-zinc-800 bg-zinc-900/50 py-16 text-center">

                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-800/60">

                      <Search
                        size={25}
                        className="text-zinc-600"
                      />

                    </div>

                    <h3 className="font-semibold text-zinc-300">
                      No Content Found
                    </h3>

                    <p className="mt-1 text-xs text-zinc-600">
                      Try changing your
                      search or filter.
                    </p>

                  </div>
                ) : (
                  <div className="space-y-4">

                    {filteredContents.map(
                      (item) => (
                        <div
                          key={
                            item._id
                          }
                          className="group rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 transition-all duration-300 hover:border-zinc-700 hover:bg-zinc-900 sm:p-6"
                        >

                          <div className="flex flex-col gap-6 xl:flex-row">

                            {/* Content */}

                            <div className="min-w-0 flex-1">

                              {/* badges */}

                              <div className="mb-4 flex flex-wrap items-center gap-2">

                                <span className="rounded-lg border border-blue-500/20 bg-blue-500/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-blue-400">
                                  {item.section ||
                                    "unknown"}
                                </span>

                                {item.category && (
                                  <span className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-2.5 py-1 text-[10px] font-bold text-purple-400">
                                    {
                                      item.category
                                    }
                                  </span>
                                )}

                              </div>

                              <h4 className="break-words text-lg font-bold text-white">
                                {item.title ||
                                  "Untitled"}
                              </h4>

                              {item.subtitle && (
                                <p className="mt-2 max-w-3xl break-words text-sm leading-6 text-zinc-400">
                                  {
                                    item.subtitle
                                  }
                                </p>
                              )}

                              <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-zinc-600">

                                {item.numberValue && (
                                  <span>
                                    Number:{" "}
                                    <b className="text-zinc-400">
                                      {
                                        item.numberValue
                                      }
                                    </b>
                                  </span>
                                )}

                                {item.createdAt && (
                                  <span>
                                    Created:{" "}
                                    <b className="text-zinc-400">
                                      {new Date(
                                        item.createdAt
                                      ).toLocaleDateString()}
                                    </b>
                                  </span>
                                )}

                              </div>

                              {item.link && (
                                <div className="mt-4">

                                  <a
                                    href={
                                      item.link
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg border border-zinc-800 bg-zinc-950 px-3 py-2 text-xs font-semibold text-blue-400 transition hover:border-blue-500/30 hover:bg-blue-500/5"
                                  >
                                    Open Link

                                    <ExternalLink
                                      size={
                                        13
                                      }
                                    />
                                  </a>

                                </div>
                              )}

                              {/* Image */}

                              {item.image ? (
                                <div className="mt-5">

                                  <div className="relative h-44 w-full max-w-sm overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">

                                    <img
                                      src={getImageSrc(
                                        item.image
                                      )}
                                      alt={
                                        item.title ||
                                        "Content image"
                                      }
                                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                                      onError={(
                                        e
                                      ) => {
                                        e.currentTarget.style.display =
                                          "none";

                                        const parent =
                                          e
                                            .currentTarget
                                            .parentElement;

                                        if (
                                          parent &&
                                          !parent.querySelector(
                                            ".image-error-message"
                                          )
                                        ) {
                                          const message =
                                            document.createElement(
                                              "div"
                                            );

                                          message.className =
                                            "image-error-message absolute inset-0 flex flex-col items-center justify-center text-center text-zinc-600";

                                          message.innerHTML = `
                                            <div style="font-size:28px;margin-bottom:8px;">🖼️</div>
                                            <div style="font-weight:600;color:#a1a1aa;">Image unavailable</div>
                                            <div style="font-size:11px;margin-top:4px;">Check image URL/path</div>
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
                                  <div className="mt-5 flex h-32 w-full max-w-sm flex-col items-center justify-center rounded-xl border border-dashed border-zinc-800 bg-zinc-950 text-zinc-600">

                                    <ImageIcon
                                      size={
                                        25
                                      }
                                      className="mb-2"
                                    />

                                    <span className="text-xs">
                                      No Image
                                    </span>

                                  </div>
                                )
                              )}

                            </div>

                            {/* Actions */}

                            <div className="flex shrink-0 flex-row gap-2 xl:w-[115px] xl:flex-col">

                              <button
                                type="button"
                                onClick={() =>
                                  editItem(
                                    item
                                  )
                                }
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-yellow-500 px-4 py-3 text-xs font-bold text-black transition hover:bg-yellow-400 xl:flex-none"
                              >

                                <Pencil
                                  size={
                                    15
                                  }
                                />

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
                                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-red-600/90 px-4 py-3 text-xs font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50 xl:flex-none"
                              >

                                {deletingId ===
                                item._id ? (
                                  <Loader2
                                    size={
                                      15
                                    }
                                    className="animate-spin"
                                  />
                                ) : (
                                  <Trash2
                                    size={
                                      15
                                    }
                                  />
                                )}

                                {deletingId ===
                                item._id
                                  ? "Deleting"
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

            </section>

          </main>

        </div>

        {/* =====================================================
            DELETE MODAL
        ===================================================== */}

        {deleteModal && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 p-4 backdrop-blur-sm"
            onMouseDown={(e) => {
              if (
                e.target ===
                e.currentTarget
              ) {
                closeDeleteModal();
              }
            }}
          >

            <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-2xl shadow-black/40 sm:p-7">

              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">

                <Trash2
                  size={22}
                  className="text-red-500"
                />

              </div>

              <h2 className="text-xl font-bold text-white">
                Delete Content
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Are you sure you want
                to permanently delete
                this content? This action
                cannot be undone.
              </p>

              <div className="mt-7 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={
                    closeDeleteModal
                  }
                  disabled={
                    !!deletingId
                  }
                  className="rounded-xl border border-zinc-700 bg-zinc-800 px-5 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-700 disabled:opacity-50"
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
                  className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-50"
                >

                  {deletingId ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Trash2
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