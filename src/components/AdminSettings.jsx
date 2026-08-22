"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import {
  Save,
  RotateCcw,
  Globe,
  Mail,
  Wrench,
  BarChart3,
  BriefcaseBusiness,
  BookOpen,
  FileText,
  Bell,
  RefreshCw,
  Trash2,
  CheckCircle2,
} from "lucide-react";

const DEFAULT_SETTINGS = {
  siteName: "ZYNTRIX",
  tagline: "Creative Digital Lab",
  adminEmail: "",

  websiteEnabled: true,
  maintenanceMode: false,

  showRunningStats: true,
  showFeaturedWorks: true,
  showLearningResources: true,
  showLatestBlogs: true,

  itemsPerPage: 10,

  emailNotifications: true,
  autoRefresh: false,
  confirmBeforeDelete: true,
};

export default function AdminSettings() {
  const [settings, setSettings] = useState(DEFAULT_SETTINGS);
  const [saving, setSaving] = useState(false);
  const [loaded, setLoaded] = useState(false);

  // =========================================
  // LOAD SETTINGS
  // =========================================

  useEffect(() => {
    try {
      const saved = localStorage.getItem(
        "zyntrixAdminSettings"
      );

      if (saved) {
        const parsed = JSON.parse(saved);

        setSettings({
          ...DEFAULT_SETTINGS,
          ...parsed,
        });
      }
    } catch (error) {
      console.error(
        "SETTINGS LOAD ERROR:",
        error
      );
    } finally {
      setLoaded(true);
    }
  }, []);

  // =========================================
  // UPDATE SETTING
  // =========================================

  function updateSetting(key, value) {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  }

  // =========================================
  // SAVE
  // =========================================

  function saveSettings() {
    setSaving(true);

    try {
      localStorage.setItem(
        "zyntrixAdminSettings",
        JSON.stringify(settings)
      );

      toast.success(
        "Settings saved successfully"
      );
    } catch (error) {
      console.error(
        "SETTINGS SAVE ERROR:",
        error
      );

      toast.error(
        "Failed to save settings"
      );
    } finally {
      setTimeout(() => {
        setSaving(false);
      }, 400);
    }
  }

  // =========================================
  // RESET
  // =========================================

  function resetSettings() {
    const confirmed = window.confirm(
      "Reset all settings to default?"
    );

    if (!confirmed) return;

    setSettings(DEFAULT_SETTINGS);

    localStorage.setItem(
      "zyntrixAdminSettings",
      JSON.stringify(DEFAULT_SETTINGS)
    );

    toast.success(
      "Settings reset to default"
    );
  }

  if (!loaded) {
    return (
      <div className="flex min-h-[300px] items-center justify-center">
        <RefreshCw
          size={24}
          className="animate-spin text-blue-400"
        />
      </div>
    );
  }

  return (
    <section>
      {/* =========================================
          HEADER
      ========================================= */}

      <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-xs font-medium text-blue-400">
            <Globe size={14} />

            ADMIN PANEL

            <span className="text-zinc-700">
              /
            </span>

            SETTINGS
          </div>

          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Settings
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Manage your website and admin panel
            preferences.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetSettings}
            className="flex items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-3 text-sm font-semibold text-zinc-300 transition hover:bg-zinc-800 hover:text-white"
          >
            <RotateCcw size={16} />

            Reset
          </button>

          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw
                size={16}
                className="animate-spin"
              />
            ) : (
              <Save size={16} />
            )}

            {saving
              ? "Saving..."
              : "Save Settings"}
          </button>
        </div>
      </div>

      <div className="space-y-6">

        {/* =========================================
            GENERAL SETTINGS
        ========================================= */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10">
              <Globe
                size={19}
                className="text-blue-400"
              />
            </div>

            <div>
              <h2 className="font-bold text-white">
                General Settings
              </h2>

              <p className="text-xs text-zinc-500">
                Basic information about your website.
              </p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2">

            {/* SITE NAME */}

            <div>
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Site Name
              </label>

              <input
                value={settings.siteName}
                onChange={(e) =>
                  updateSetting(
                    "siteName",
                    e.target.value
                  )
                }
                placeholder="ZYNTRIX"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
              />
            </div>

            {/* TAGLINE */}

            <div>
              <label className="mb-2 block text-xs font-semibold text-zinc-400">
                Site Tagline
              </label>

              <input
                value={settings.tagline}
                onChange={(e) =>
                  updateSetting(
                    "tagline",
                    e.target.value
                  )
                }
                placeholder="Creative Digital Lab"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
              />
            </div>

            {/* EMAIL */}

            <div className="md:col-span-2">
              <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-zinc-400">
                <Mail size={13} />

                Admin Email
              </label>

              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) =>
                  updateSetting(
                    "adminEmail",
                    e.target.value
                  )
                }
                placeholder="admin@example.com"
                className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-blue-500/60"
              />
            </div>
          </div>
        </div>

        {/* =========================================
            WEBSITE STATUS
        ========================================= */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10">
              <Wrench
                size={19}
                className="text-orange-400"
              />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Website Status
              </h2>

              <p className="text-xs text-zinc-500">
                Control public website availability.
              </p>
            </div>
          </div>

          <div className="space-y-3">

            <ToggleRow
              title="Website Enabled"
              description="Allow visitors to access your website."
              checked={settings.websiteEnabled}
              onChange={(value) =>
                updateSetting(
                  "websiteEnabled",
                  value
                )
              }
            />

            <ToggleRow
              title="Maintenance Mode"
              description="Show a maintenance page to visitors."
              checked={settings.maintenanceMode}
              onChange={(value) =>
                updateSetting(
                  "maintenanceMode",
                  value
                )
              }
              warning
            />
          </div>
        </div>

        {/* =========================================
            WEBSITE SECTIONS
        ========================================= */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/10">
              <BarChart3
                size={19}
                className="text-purple-400"
              />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Website Sections
              </h2>

              <p className="text-xs text-zinc-500">
                Choose which sections should appear
                on the public website.
              </p>
            </div>
          </div>

          <div className="grid gap-3 md:grid-cols-2">

            <ToggleRow
              compact
              icon={BarChart3}
              title="Running Stats"
              description="Navbar statistics"
              checked={settings.showRunningStats}
              onChange={(value) =>
                updateSetting(
                  "showRunningStats",
                  value
                )
              }
            />

            <ToggleRow
              compact
              icon={BriefcaseBusiness}
              title="Featured Works"
              description="Featured projects"
              checked={settings.showFeaturedWorks}
              onChange={(value) =>
                updateSetting(
                  "showFeaturedWorks",
                  value
                )
              }
            />

            <ToggleRow
              compact
              icon={BookOpen}
              title="Learning Resources"
              description="Learning resources"
              checked={
                settings.showLearningResources
              }
              onChange={(value) =>
                updateSetting(
                  "showLearningResources",
                  value
                )
              }
            />

            <ToggleRow
              compact
              icon={FileText}
              title="Latest Blogs"
              description="Latest blog posts"
              checked={settings.showLatestBlogs}
              onChange={(value) =>
                updateSetting(
                  "showLatestBlogs",
                  value
                )
              }
            />
          </div>
        </div>

        {/* =========================================
            ADMIN PREFERENCES
        ========================================= */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
              <CheckCircle2
                size={19}
                className="text-emerald-400"
              />
            </div>

            <div>
              <h2 className="font-bold text-white">
                Admin Preferences
              </h2>

              <p className="text-xs text-zinc-500">
                Configure how the admin dashboard
                behaves.
              </p>
            </div>
          </div>

          <div className="space-y-3">

            <ToggleRow
              icon={Bell}
              title="Email Notifications"
              description="Enable admin notifications."
              checked={
                settings.emailNotifications
              }
              onChange={(value) =>
                updateSetting(
                  "emailNotifications",
                  value
                )
              }
            />

            <ToggleRow
              icon={RefreshCw}
              title="Auto Refresh"
              description="Automatically refresh dashboard data."
              checked={settings.autoRefresh}
              onChange={(value) =>
                updateSetting(
                  "autoRefresh",
                  value
                )
              }
            />

            <ToggleRow
              icon={Trash2}
              title="Confirm Before Delete"
              description="Ask for confirmation before deleting content."
              checked={
                settings.confirmBeforeDelete
              }
              onChange={(value) =>
                updateSetting(
                  "confirmBeforeDelete",
                  value
                )
              }
            />
          </div>
        </div>

        {/* =========================================
            CONTENT SETTINGS
        ========================================= */}

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900/80 p-5 sm:p-6">
          <div className="mb-6">
            <h2 className="font-bold text-white">
              Content Settings
            </h2>

            <p className="mt-1 text-xs text-zinc-500">
              Configure content management preferences.
            </p>
          </div>

          <div className="max-w-sm">
            <label className="mb-2 block text-xs font-semibold text-zinc-400">
              Items Per Page
            </label>

            <select
              value={settings.itemsPerPage}
              onChange={(e) =>
                updateSetting(
                  "itemsPerPage",
                  Number(e.target.value)
                )
              }
              className="w-full rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-white outline-none focus:border-blue-500/60"
            >
              <option value={5}>5 Items</option>
              <option value={10}>10 Items</option>
              <option value={20}>20 Items</option>
              <option value={30}>30 Items</option>
              <option value={50}>50 Items</option>
            </select>
          </div>
        </div>

        {/* =========================================
            SAVE BOTTOM
        ========================================= */}

        <div className="flex justify-end border-t border-zinc-800 pt-6">
          <button
            type="button"
            onClick={saveSettings}
            disabled={saving}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-500 disabled:opacity-50"
          >
            {saving ? (
              <RefreshCw
                size={16}
                className="animate-spin"
              />
            ) : (
              <Save size={16} />
            )}

            {saving
              ? "Saving..."
              : "Save All Settings"}
          </button>
        </div>
      </div>
    </section>
  );
}


// =========================================================
// TOGGLE ROW
// =========================================================

function ToggleRow({
  title,
  description,
  checked,
  onChange,
  icon: Icon,
  warning = false,
  compact = false,
}) {
  return (
    <div
      className={`flex items-center justify-between gap-4 rounded-xl border ${
        warning && checked
          ? "border-orange-500/30 bg-orange-500/5"
          : "border-zinc-800 bg-zinc-950/50"
      } ${
        compact ? "p-4" : "p-4"
      }`}
    >
      <div className="flex min-w-0 items-center gap-3">
        {Icon && (
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-zinc-400">
            <Icon size={16} />
          </div>
        )}

        <div className="min-w-0">
          <p className="text-sm font-semibold text-zinc-200">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-zinc-500">
            {description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        aria-pressed={checked}
        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
          checked
            ? warning
              ? "bg-orange-500"
              : "bg-blue-600"
            : "bg-zinc-700"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${
            checked
              ? "left-6"
              : "left-1"
          }`}
        />
      </button>
    </div>
  );
}