"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import {
  Home,
  LogOut,
  Search,
  Plus,
  Loader2,
  Database,
  FileText,
  BookOpen,
  BarChart3,
  Upload,
} from "lucide-react";

export default function AdminPage() {
  const router = useRouter();

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

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  const [form, setForm] = useState({
    section: "stats",
    title: "",
    subtitle: "",
    category: "",
    link: "",
    image: null,
    numberValue: "",
  });

  const [imagePreview, setImagePreview] = useState("");

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

    const timer = setInterval(() => {
      current++;

      setAnimatedStats({
        total: Math.min(current, stats.total),
        resources: Math.min(current, stats.resources),
        blogs: Math.min(current, stats.blogs),
        works: Math.min(current, stats.works),
        stats: Math.min(current, stats.stats),
      });

      if (
        current >=
        Math.max(
          stats.total,
          stats.resources,
          stats.blogs,
          stats.works,
          stats.stats
        )
      ) {
        clearInterval(timer);
      }
    }, 40);

    return () => clearInterval(timer);
  }, [stats]);

  async function loadData() {
    setLoading(true);

    try {
      const res = await fetch("/api/content");
      const data = await res.json();

      if (data.success) {
        setContents(data.data);
      }
    } catch (err) {
      toast.error("Failed to load contents");
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

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

    return true;
  }

  function isDuplicateTitle() {
    return contents.some(
      (item) =>
        item.title.trim().toLowerCase() ===
          form.title.trim().toLowerCase() && item._id !== editingId
    );
  }

  const filteredContents = useMemo(() => {
    return contents.filter((item) => {
      const matchSearch =
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
        item.category?.toLowerCase().includes(search.toLowerCase()) ||
        item.section?.toLowerCase().includes(search.toLowerCase());

      const matchSection = filter === "all" || item.section === filter;

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
      if (editingId) formData.append("id", editingId);
      if (form.image instanceof File) {
        formData.append("image", form.image);
      }

      const endpoint = "/api/content";
      const method = editingId ? "PUT" : "POST";

      const res = await fetch(endpoint, {
        method: method,
        body: formData,
      });

      const data = await res.json();

      if (data.success) {
        toast.success(
          editingId
            ? "Content Updated Successfully"
            : "Content Added Successfully"
        );

        setEditingId(null);
        setImagePreview("");

        setForm({
          section: "stats",
          title: "",
          subtitle: "",
          category: "",
          link: "",
          image: null,
          numberValue: "",
        });

        loadData();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch (err) {
      toast.error("Server Error");
    } finally {
      setSaving(false);
    }
  }

  async function deleteItem(id) {
    setDeletingId(id);

    try {
      const res = await fetch(`/api/content?id=${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Deleted Successfully");
        loadData();
      } else {
        toast.error(data.error || "Something went wrong");
      }
    } catch {
      toast.error("Delete Failed");
    } finally {
      setDeletingId(null);
      setDeleteModal(false);
      setSelectedId(null);
    }
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

      <div className="min-h-screen bg-zinc-950 text-white">
        <div className="max-w-7xl mx-auto px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-10 gap-6">
            <div>
              <h1 className="text-5xl font-black text-white">Zyntrix CMS</h1>
              <p className="text-zinc-400 mt-2">
                Manage your Website Contents, Blogs, Resources & Featured Works
              </p>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <Link
                href="/"
                className="bg-zinc-800 hover:bg-zinc-700 px-5 py-3 rounded-xl flex items-center gap-2 transition-colors"
              >
                <Home size={18} />
                Home
              </Link>

              <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-5 py-3">
                <p className="text-xs text-zinc-400">Growth</p>
                <h2 className="text-2xl font-black text-emerald-400">+24%</h2>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl px-5 py-3">
                <p className="text-xs text-zinc-400">Last Updated</p>
                <h2 className="text-sm font-bold text-white">{currentTime}</h2>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-10">
            <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-6 shadow-lg">
              <p className="text-sm opacity-80">Total Contents</p>
              <h2 className="text-4xl font-black mt-2">
                {animatedStats.total}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white p-6 shadow-lg">
              <p className="text-sm opacity-80">Resources</p>
              <h2 className="text-4xl font-black mt-2">
                {animatedStats.resources}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-violet-600 to-purple-700 text-white p-6 shadow-lg">
              <p className="text-sm opacity-80">Blogs</p>
              <h2 className="text-4xl font-black mt-2">
                {animatedStats.blogs}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white p-6 shadow-lg">
              <p className="text-sm opacity-80">Featured Works</p>
              <h2 className="text-4xl font-black mt-2">
                {animatedStats.works}
              </h2>
            </div>

            <div className="rounded-2xl bg-gradient-to-r from-pink-600 to-fuchsia-700 text-white p-6 shadow-lg">
              <p className="text-sm opacity-80">Running Stats</p>
              <h2 className="text-4xl font-black mt-2">
                {animatedStats.stats}
              </h2>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-5">
                Recent Activity
              </h2>
              <div className="space-y-4">
                {[...contents]
                  .sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                  )
                  .slice(0, 5)
                  .map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center justify-between border-b border-zinc-800 pb-3"
                    >
                      <div>
                        <h3 className="text-white font-semibold">
                          {item.title}
                        </h3>
                        <p className="text-zinc-400 text-sm">{item.section}</p>
                      </div>
                      <span className="text-xs text-zinc-500">
                        {item.createdAt
                          ? new Date(item.createdAt).toLocaleDateString()
                          : "Recent"}
                      </span>
                    </div>
                  ))}
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
              <h2 className="text-xl font-bold text-white mb-5">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setForm({
                      section: "stats",
                      title: "",
                      subtitle: "",
                      category: "",
                      link: "",
                      image: null,
                      numberValue: "",
                    });
                    setImagePreview("");
                  }}
                  className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white cursor-pointer transition-colors"
                >
                  + New Content
                </button>

                <button
                  onClick={loadData}
                  className="w-full py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white cursor-pointer transition-colors"
                >
                  Refresh Dashboard
                </button>

                <button
                  onClick={() => {
                    localStorage.removeItem("isAdminLoggedIn");
                    window.location.href = "/admin/login";
                  }}
                  className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white cursor-pointer transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <form
            onSubmit={addContent}
            className="bg-zinc-900 border border-zinc-800 shadow-xl rounded-2xl p-8 space-y-6 mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-4">
              {editingId ? "Edit Content" : "Add New Content"}
            </h2>

            <div>
              <label className="font-semibold text-zinc-300">Section</label>
              <select
                required
                className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
                value={form.section}
                onChange={(e) =>
                  setForm({
                    ...form,
                    section: e.target.value,
                    category: e.target.value === "works" ? "UI/UX Design" : "",
                  })
                }
              >
                <option value="stats">Navbar Running Stats</option>
                <option value="resources">Free Learning Resources</option>
                <option value="works">Featured Works</option>
                <option value="blogs">Latest Blogs</option>
              </select>
            </div>

            {form.section === "works" && (
              <div>
                <label className="font-semibold text-zinc-300">Category</label>
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
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Web Design">Web Design</option>
                </select>
              </div>
            )}

            {form.section === "blogs" && (
              <div>
                <label className="font-semibold text-zinc-300">Category</label>
                <input
                  required
                  className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
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

            {form.section !== "stats" && (
              <div>
                <label className="font-semibold text-zinc-300">Title</label>
                <input
                  required
                  className={`border p-3 rounded w-full mt-2 text-zinc-900 bg-white ${
                    !form.title && "border-red-400"
                  }`}
                  placeholder="Enter Content Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {form.section === "stats" && (
              <div>
                <label className="font-semibold text-zinc-300">Title</label>
                <input
                  required
                  className={`border p-3 rounded w-full mt-2 text-zinc-900 bg-white ${
                    !form.title && "border-red-400"
                  }`}
                  placeholder="Enter Stat Title"
                  value={form.title}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      title: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {(form.section === "works" || form.section === "resources") && (
              <div>
                <label className="font-semibold text-zinc-300">
                  Subtitle / Description
                </label>
                <textarea
                  required
                  rows={4}
                  className="bg-zinc-950 border border-zinc-800 p-3.5 rounded-xl w-full mt-2 text-white focus:outline-none focus:border-blue-500"
                  placeholder="Write description..."
                  value={form.subtitle}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      subtitle: e.target.value,
                    })
                  }
                />
                <div className="text-right text-sm text-zinc-500 mt-1">
                  {form.subtitle.length}/500
                </div>
              </div>
            )}

            {form.section !== "stats" && (
              <div>
                <label className="font-semibold text-zinc-300">
                  Google Drive / Website Link
                </label>
                <input
                  className="border p-3 rounded w-full mt-2 text-zinc-900 bg-white"
                  placeholder="https://example.com"
                  value={form.link}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      link: e.target.value,
                    })
                  }
                />
              </div>
            )}

            {form.section !== "stats" && (
              <div>
                <label className="font-semibold text-zinc-300 block mb-2">
                  Upload Image File
                </label>
                <label className="flex flex-col items-center justify-center border-2 border-dashed border-zinc-700 bg-zinc-950 rounded-xl p-6 cursor-pointer hover:border-blue-500 transition-colors">
                  <Upload className="text-zinc-400 mb-2" size={24} />
                  <span className="text-sm text-zinc-300 font-medium">
                    Click to browse or drag & drop image
                  </span>
                  <span className="text-xs text-zinc-500 mt-1">
                    PNG, JPG, WEBP up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setForm({ ...form, image: file });
                        setImagePreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </label>

                {imagePreview && (
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 w-fit mt-4">
                    <p className="font-semibold text-zinc-300 mb-3">
                      Image Preview
                    </p>
                    <div className="relative w-[300px] h-[180px]">
                      <Image
                        src={imagePreview}
                        width={300}
                        height={180}
                        alt="Preview"
                        className="rounded-xl object-cover"
                        style={{ width: "auto", height: "auto" }}
                        unoptimized
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {form.section === "stats" && (
              <div>
                <label className="font-semibold text-zinc-300">
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

            <div className="flex items-center">
              <button
                type="submit"
                disabled={saving || !form.title.trim()}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-500 text-white px-8 py-3.5 rounded-xl font-medium transition-colors cursor-pointer flex items-center gap-2 shadow-lg shadow-blue-600/20"
              >
                {saving ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Saving...
                  </>
                ) : (
                  <>
                    <Plus size={18} />
                    {editingId ? "Update Content" : "Add Content"}
                  </>
                )}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setImagePreview("");
                    setForm({
                      section: "stats",
                      title: "",
                      subtitle: "",
                      category: "",
                      link: "",
                      image: null,
                      numberValue: "",
                    });
                  }}
                  className="ml-4 bg-zinc-700 hover:bg-zinc-600 text-white px-6 py-3.5 rounded-xl font-medium transition-colors cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>
          </form>

          <div className="flex gap-4 mb-8">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-4 text-zinc-500"
                size={18}
              />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-12 pr-4 py-3.5 text-white focus:outline-none focus:border-blue-500"
              />
            </div>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-zinc-900 border border-zinc-800 rounded-xl px-5 py-3.5 text-white focus:outline-none focus:border-blue-500"
            >
              <option value="all">All</option>
              <option value="stats">Stats</option>
              <option value="resources">Resources</option>
              <option value="works">Works</option>
              <option value="blogs">Blogs</option>
            </select>
          </div>

          <div className="mt-14">
            <h2 className="text-3xl font-bold mb-8">Existing Contents</h2>

            {loading ? (
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="animate-pulse rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                  >
                    <div className="h-6 w-56 bg-zinc-800 rounded mb-4"></div>
                    <div className="h-4 w-full bg-zinc-800 rounded mb-2"></div>
                    <div className="h-4 w-3/4 bg-zinc-800 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredContents.length === 0 ? (
              <p className="text-zinc-500 text-center py-10 bg-zinc-900/50 rounded-2xl border border-zinc-800">
                No Content Found
              </p>
            ) : (
              <div className="grid gap-5">
                {filteredContents.map((item) => (
                  <div
                    key={item._id}
                    className="border border-zinc-800 rounded-2xl p-6 flex justify-between items-start bg-zinc-900 shadow-lg"
                  >
                    <div className="space-y-2 text-zinc-300">
                      <p>
                        <b className="text-white">Section:</b> {item.section}
                      </p>
                      <p>
                        <b className="text-white">Title:</b> {item.title}
                      </p>
                      {item.subtitle && (
                        <p>
                          <b className="text-white">Subtitle:</b> {item.subtitle}
                        </p>
                      )}
                      {item.category && (
                        <p>
                          <b className="text-white">Category:</b> {item.category}
                        </p>
                      )}
                      {item.numberValue && (
                        <p>
                          <b className="text-white">Number:</b>{" "}
                          {item.numberValue}
                        </p>
                      )}
                      {item.link && (
                        <p>
                          <b className="text-white">Link:</b>{" "}
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 underline hover:text-blue-300"
                          >
                            Open
                          </a>
                        </p>
                      )}
                      {item.image ? (
                        <div className="relative w-52 h-36 mt-3">
                          <Image
                            src={item.image}
                            width={208}
                            height={144}
                            alt={item.title}
                            className="rounded-xl object-cover border border-zinc-200 shadow hover:scale-105 transition duration-300"
                            style={{ width: "auto", height: "auto" }}
                            unoptimized
                          />
                        </div>
                      ) : (
                        item.section !== "stats" && (
                          <div className="w-52 h-36 rounded-xl bg-zinc-100 border flex items-center justify-center text-zinc-500 mt-3 font-medium">
                            No Image
                          </div>
                        )
                      )}
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => {
                          setEditingId(item._id);
                          setImagePreview(item.image || "");
                          setForm({
                            section: item.section,
                            title: item.title || "",
                            subtitle: item.subtitle || "",
                            category: item.category || "",
                            link: item.link || "",
                            image: item.image || null,
                            numberValue: item.numberValue || "",
                          });
                          window.scrollTo({
                            top: 0,
                            behavior: "smooth",
                          });
                        }}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black px-5 py-2.5 rounded-xl font-semibold transition-colors cursor-pointer shadow-md"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setSelectedId(item._id);
                          setDeleteModal(true);
                        }}
                        disabled={deletingId === item._id}
                        className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition duration-300 cursor-pointer flex items-center gap-2"
                      >
                        {deletingId === item._id && (
                          <Loader2 className="animate-spin" size={16} />
                        )}
                        {deletingId === item._id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {deleteModal && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center z-50">
            <div className="bg-white rounded-2xl p-8 w-[420px] shadow-2xl">
              <h2 className="text-2xl font-bold text-zinc-900 mb-3">
                Delete Content
              </h2>
              <p className="text-zinc-600">
                Are you sure you want to permanently delete this content?
              </p>
              <div className="flex justify-end gap-3 mt-8">
                <button
                  onClick={() => {
                    setDeleteModal(false);
                    setSelectedId(null);
                  }}
                  className="px-6 py-3 rounded-lg bg-zinc-200 hover:bg-zinc-300 text-zinc-800 cursor-pointer font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteItem(selectedId)}
                  disabled={deletingId}
                  className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white cursor-pointer font-medium flex items-center gap-2"
                >
                  {deletingId && <Loader2 className="animate-spin" size={16} />}
                  {deletingId ? "Deleting..." : "Delete"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}