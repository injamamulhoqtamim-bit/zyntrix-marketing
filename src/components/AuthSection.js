"use client";

import { useState } from "react";

export default function AuthSection() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // লগইন স্ট্যাটাস

  // যদি লগইন সফল হয়
  if (isLoggedIn) {
    return (
      <section id="learning-section" className="py-16 sm:py-24 bg-zinc-950 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6">
        <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-12 text-center">Welcome! Choose Your Path</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 w-full max-w-4xl">
          
          {/* Card 1: Digital Marketing */}
          <div className="bg-zinc-900 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-zinc-800 hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center shadow-xl">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Digital Marketing</h3>
            <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">Master SEO, Social Media, and Content Strategy.</p>
            <a 
              href="YOUR_DIGITAL_MARKETING_DRIVE_LINK_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition w-full text-sm sm:text-base shadow-md"
            >
              Access Course
            </a>
          </div>

          {/* Card 2: Ethical Hacking */}
          <div className="bg-zinc-900 p-6 sm:p-10 rounded-2xl sm:rounded-3xl border border-zinc-800 hover:border-blue-500 transition-all duration-300 flex flex-col items-center text-center shadow-xl">
            <h3 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Ethical Hacking</h3>
            <p className="text-zinc-400 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed">Learn cyber security and system protection.</p>
            <a 
              href="YOUR_ETHICAL_HACKING_DRIVE_LINK_HERE" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition w-full text-sm sm:text-base shadow-md"
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
    <section id="learning-section" className="py-16 sm:py-24 bg-zinc-950 flex justify-center items-center min-h-screen px-4 sm:px-6">
      <div className="bg-zinc-900 p-6 sm:p-8 rounded-2xl sm:rounded-3xl border border-zinc-800 w-full max-w-md shadow-2xl">
        <h2 className="text-white text-xl sm:text-2xl font-bold text-center mb-6">
          {isLogin ? "Login to Continue" : "Create an Account"}
        </h2>

        <form 
          onSubmit={(e) => { e.preventDefault(); setIsLoggedIn(true); }}
          className="space-y-4"
        >
          {!isLogin && (
            <div>
              <label className="block text-zinc-400 text-xs sm:text-sm mb-1.5 font-medium">Name</label>
              <input type="text" className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-blue-500 outline-none transition" required />
            </div>
          )}
          <div>
            <label className="block text-zinc-400 text-xs sm:text-sm mb-1.5 font-medium">Email</label>
            <input type="email" className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-blue-500 outline-none transition" required />
          </div>
          <div>
            <label className="block text-zinc-400 text-xs sm:text-sm mb-1.5 font-medium">Password</label>
            <input type="password" className="w-full p-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white text-sm focus:border-blue-500 outline-none transition" required />
          </div>
          
          <button type="submit" className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition text-sm sm:text-base shadow-lg cursor-pointer mt-2">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-zinc-400 text-center text-xs sm:text-sm mt-5">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-500 font-bold hover:underline cursor-pointer ml-1"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>
      </div>
    </section>
  );
}