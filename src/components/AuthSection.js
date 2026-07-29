"use client";

import { useState } from "react";

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // লগইন স্ট্যাটাস

  // যদি লগইন সফল হয়
  if (isLoggedIn) {
    return (
      <section id="learning-section" className="py-20 bg-zinc-950 min-h-screen flex flex-col items-center justify-center px-6">
        <h2 className="text-white text-3xl font-bold mb-12">Welcome! Choose Your Path</h2>
        <div className="grid md:grid-cols-2 gap-8 w-full max-w-4xl">
          
          {/* Card 1: Digital Marketing */}
          <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:border-blue-500 transition flex flex-col items-center text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Digital Marketing</h3>
            <p className="text-zinc-400 mb-8">Master SEO, Social Media, and Content Strategy.</p>
            <a 
              href="YOUR_DIGITAL_MARKETING_DRIVE_LINK_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition w-full"
            >
              Access Course
            </a>
          </div>

          {/* Card 2: Ethical Hacking */}
          <div className="bg-zinc-900 p-10 rounded-3xl border border-zinc-800 hover:border-blue-500 transition flex flex-col items-center text-center">
            <h3 className="text-white text-2xl font-bold mb-4">Ethical Hacking</h3>
            <p className="text-zinc-400 mb-8">Learn cyber security and system protection.</p>
            <a 
              href="YOUR_ETHICAL_HACKING_DRIVE_LINK_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition w-full"
            >
              Access Course
            </a>
          </div>

        </div>
      </section>
    );
  }

  // লগইন ফর্ম (লগইন না থাকলে এটি দেখাবে)
  return (
    <section id="learning-section" className="py-20 bg-zinc-950 flex justify-center items-center min-h-screen">
      <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 w-full max-w-md shadow-2xl">
        <h2 className="text-white text-2xl font-bold text-center mb-6">
          {isLogin ? "Login to Continue" : "Create an Account"}
        </h2>

        <form 
          onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-zinc-400 text-sm mb-1">Name</label>
              <input type="text" className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 outline-none" required />
            </div>
          )}
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Email</label>
            <input type="email" className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 outline-none" required />
          </div>
          <div>
            <label className="block text-zinc-400 text-sm mb-1">Password</label>
            <input type="password" className="w-full p-3 rounded-lg bg-zinc-800 border border-zinc-700 text-white focus:border-blue-500 outline-none" required />
          </div>
          
          <button type="submit" className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-bold transition">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-zinc-400 text-center mt-4">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-bold hover:underline"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
}