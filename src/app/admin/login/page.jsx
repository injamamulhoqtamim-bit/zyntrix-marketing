"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, User, ArrowRight, ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/admin-auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("isAdminLoggedIn", "true");
        router.push("/admin");
      } else {
        setError(data.message || "Access Denied! Invalid Credentials.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 relative overflow-hidden">
      <div className="absolute w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px]" />

      <div className="max-w-md w-full bg-zinc-900/80 border border-zinc-800 p-8 rounded-3xl shadow-2xl backdrop-blur-xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600/10 border border-blue-500/30 rounded-2xl text-blue-400 mb-4">
            <Lock size={28} />
          </div>

          <h1 className="text-2xl font-black">
            Admin Restricted Area
          </h1>

          <p className="text-zinc-400 text-sm mt-2">
            Authorized personnel only.
          </p>
        </div>

        {error && (
          <div className="mb-5 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 flex items-center gap-2">
            <ShieldAlert size={18} />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm">
              Username
            </label>

            <div className="relative">
              <User
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm">
              Password
            </label>

            <div className="relative">
              <Lock
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
              />

              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-zinc-950 border border-zinc-700 rounded-xl py-3 pl-11 pr-4 outline-none focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition font-bold flex items-center justify-center gap-2"
          >
            {loading ? "Verifying..." : "Login"}
            <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}