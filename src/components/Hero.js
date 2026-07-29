"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero({ onShowAuth }) {
  const videos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4"];
  const [currentVideo, setCurrentVideo] = useState(0);
  const [isPopupOpen, setIsPopupOpen] = useState(true); // পপআপ স্টেট
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-20">
      {/* Background Video */}
      <video
        key={currentVideo}
        ref={videoRef}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={handleVideoEnd}
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={videos[currentVideo]} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Popup Message */}
      {isPopupOpen && (
        <div className="fixed bottom-10 right-10 z-50 bg-zinc-900 border border-blue-500/50 p-6 rounded-2xl shadow-2xl max-w-sm animate-in slide-in-from-bottom-10 fade-in duration-500">
          <button
            onClick={() => setIsPopupOpen(false)}
            className="absolute top-2 right-2 text-zinc-400 hover:text-white"
          >
            ✕
          </button>
          <h3 className="text-white font-bold text-lg mb-4">
            ডিজিটাল মার্কেটিং ও সাইবার সিকিউরিটি শিখতে চান?
          </h3>
          <button
            onClick={() => {
              setIsPopupOpen(false); // পপআপ বন্ধ হবে
              onShowAuth(); // AuthSection দৃশ্যমান করবে
              
              // সেকশনটি DOM এ আসার পর স্মুথ স্ক্রল করার জন্য সামান্য দেরি দিচ্ছি
              setTimeout(() => {
                document.getElementById('learning-section')?.scrollIntoView({ behavior: 'smooth' });
              }, 100);
            }}
            className="block w-full py-2 text-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
          >
            Click Here
          </button>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-blue-400 text-xs md:text-sm font-semibold uppercase tracking-widest">
            Available for New Projects
          </span>
        </div>

        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight">
          We Build <span className="text-blue-500">Digital Empires</span>
          <br />
          For Modern Businesses.
        </h1>

        <p className="max-w-3xl mx-auto mt-8 text-lg md:text-xl text-zinc-300 leading-8">
          Zyntrix Lab transforms your vision into powerful digital experiences
          through Web Development, UI/UX Design, Digital Marketing and Cyber
          Security.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-5 mt-12">
          <a
            href="#contact"
            className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-bold"
          >
            Start Your Project
          </a>
          <a
            href="#projects"
            className="px-8 py-4 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 transition text-white font-bold"
          >
            View Our Work
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-8 mt-16 max-w-lg mx-auto text-white">
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-bold text-blue-500">4+</span>
            <span className="text-sm uppercase tracking-wider text-zinc-400">Projects</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-bold text-blue-500">3+</span>
            <span className="text-sm uppercase tracking-wider text-zinc-400">Clients</span>
          </div>
          <div className="flex flex-col">
            <span className="text-3xl md:text-4xl font-bold text-blue-500">5★</span>
            <span className="text-sm uppercase tracking-wider text-zinc-400">Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}