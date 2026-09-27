"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  User,
  ArrowRight,
  ShieldAlert,
  Loader2,
  Eye,
  EyeOff,
  ShieldCheck,
} from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username.trim(),
          password,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Server sets HttpOnly authentication cookie.
        // Do NOT use localStorage for authentication.
        router.replace("/admin");
        router.refresh();
        return;
      }

      setError(
        data.message || "Access Denied! Invalid Credentials."
      );
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 relative overflow-hidden selection:bg-blue-500 selection:text-white">
      {/* Background ambient lighting */}
      <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] -top-20 -left-20 pointer-events-none" />
      <div className="absolute w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[140px] -bottom-20 -right-20 pointer-events-none" />

      <div className="max-w-md w-full bg-zinc-900/60 border border-zinc-800/80 p-8 sm:p-10 rounded-[2.5rem] shadow-2xl backdrop-blur-2xl relative z-10 transition-all duration-300 hover:border-zinc-700/80">
        
        {/* Header with Admin Avatar/Image Container */}
        <div className="text-center mb-8">
          <div className="relative inline-block mb-4">
            {/* Outer Glow Ring */}
            <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
            
            {/* Avatar Container */}
            <div className="relative w-20 h-20 bg-gradient-to-tr from-blue-600/20 to-indigo-600/30 border border-blue-500/40 rounded-full flex items-center justify-center text-blue-400 shadow-inner overflow-hidden group">
              {/* You can replace this with an actual <Image> or <img> if you have an admin photo */}
              <div className="absolute inset-0 bg-zinc-900/40 backdrop-blur-xs flex items-center justify-center">
                <User size={34} className="text-blue-400 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>

            {/* Security Badge Indicator */}
            <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-zinc-950 shadow-md">
              <ShieldCheck size={12} />
            </div>
          </div>

          <h1 className="text-2xl font-extrabold tracking-tight bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent">
            Admin Restricted Area
          </h1>

          <p className="text-zinc-400 text-sm mt-2 font-medium">
            Authorized personnel only. Secure gateway.
          </p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-2xl text-red-400 flex items-center gap-3 text-sm animate-shake">
            <ShieldAlert size={18} className="shrink-0 text-red-400" />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          {/* Username Field */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Username
            </label>

            <div className="relative group">
              <User
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setError("");
                }}
                placeholder="Enter admin username"
                autoComplete="username"
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-4 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block mb-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Password
            </label>

            <div className="relative group">
              <Lock
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-blue-400 transition-colors"
              />

              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="Enter secure password"
                autoComplete="current-password"
                className="w-full bg-zinc-950/80 border border-zinc-800 rounded-2xl py-3.5 pl-12 pr-12 text-sm text-white placeholder:text-zinc-600 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-inner"
                required
              />

              {/* Show / Hide Password Toggle */}
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-blue-400 transition-colors p-1.5 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none transition-all font-semibold text-sm shadow-lg shadow-blue-600/25 flex items-center justify-center gap-2 group cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                <span>Verifying credentials...</span>
              </>
            ) : (
              <>
                <span>Access Dashboard</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}