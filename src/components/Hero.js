"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4"];
  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center pt-32 sm:pt-40 pb-12">
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
      <div className="absolute inset-0 bg-black/65"></div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 sm:mb-8 rounded-full border border-blue-500/30 bg-blue-500/10">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          <span className="text-blue-400 text-[11px] sm:text-sm font-semibold uppercase tracking-widest">
            Available for New Projects
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl md:text-7xl font-black text-white leading-[1.2] sm:leading-tight">
          We Build <span className="text-blue-500">Digital Empires</span>
          <br className="hidden sm:inline" /> For Modern Businesses.
        </h1>

        <p className="max-w-3xl mx-auto mt-5 sm:mt-8 text-sm sm:text-lg md:text-xl text-zinc-300 leading-relaxed sm:leading-8 px-2 sm:px-0">
          Zyntrix Lab transforms your vision into powerful digital experiences
          through Web Development, UI/UX Design, Digital Marketing and Cyber
          Security.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-5 mt-8 sm:mt-12 px-4 sm:px-0">
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl bg-blue-600 hover:bg-blue-700 transition text-white font-bold text-sm sm:text-base shadow-lg shadow-blue-600/25 text-center"
          >
            Start Your Project
          </a>
          <a
            href="#projects"
            className="w-full sm:w-auto px-8 py-3.5 sm:py-4 rounded-xl border border-zinc-700 bg-zinc-900/60 hover:bg-zinc-800 transition text-white font-bold text-sm sm:text-base text-center"
          >
            View Our Work
          </a>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 sm:mt-16 max-w-md sm:max-w-lg mx-auto text-white px-2">
          <div className="flex flex-col p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">4+</span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-zinc-400 mt-1">Projects</span>
          </div>
          <div className="flex flex-col p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">3+</span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-zinc-400 mt-1">Clients</span>
          </div>
          <div className="flex flex-col p-3 rounded-xl bg-zinc-900/40 border border-zinc-800/60 backdrop-blur-sm">
            <span className="text-2xl sm:text-3xl md:text-4xl font-bold text-blue-500">5★</span>
            <span className="text-xs sm:text-sm uppercase tracking-wider text-zinc-400 mt-1">Rating</span>
          </div>
        </div>
      </div>
    </section>
  );
}