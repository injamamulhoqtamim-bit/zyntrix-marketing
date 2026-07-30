import React from 'react';
import { Users, ArrowRight } from "lucide-react";

export default function About({ lang = "en", onShowTeam }) {
  // ভাষা অনুযায়ী টেক্সট কনটেন্ট
  const content = {
    en: {
      badge: "About Us",
      titlePart1: "We Are Dedicated To",
      titleHighlight: "Your Success.",
      description: "Zyntrix Lab is a team of passionate developers, designers, and marketers focused on creating high-quality digital solutions. We bridge the gap between complex technology and user-centric design to help businesses thrive in the digital era.",
      card1Title: "Innovation",
      card1Sub: "Modern approach",
      card2Title: "Excellence",
      card2Sub: "Quality first",
      btnText: "Meet Our Expert Team",
      btnSub: "Click to explore brilliance",
    },
    bn: {
      badge: "আমাদের সম্পর্কে",
      titlePart1: "আমরা নিবেদিত",
      titleHighlight: "আপনার সাফল্যে।",
      description: "জাইন্ট্রিক্স ল্যাব হলো আবেগপ্রবণ ডেভেলপার, ডিজাইনার এবং মার্কেটারদের একটি দল, যারা উচ্চমানের ডিজিটাল সলিউশন তৈরি করতে প্রতিশ্রুতিবদ্ধ। আধুনিক ব্যবসার প্রসারে আমরা জটিল প্রযুক্তি এবং ব্যবহারকারী-কেন্দ্রিক ডিজাইনের মধ্যকার দূরত্ব কমিয়ে আনি।",
      card1Title: "উদ্ভাবন",
      card1Sub: "আধুনিক দৃষ্টিভঙ্গি",
      card2Title: "উৎকর্ষতা",
      card2Sub: "গুণগত মান সবার আগে",
      btnText: "আমাদের এক্সপার্ট টিম দেখুন",
      btnSub: "এক ক্লিকে ঘুরে আসুন",
    },
  };

  const t = content[lang] || content.en;

  return (
    <section id="about" className="py-16 sm:py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Left Side: Image with glowing background shape */}
        <div className="relative px-4 sm:px-0">
          <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-20 filter blur-sm"></div>
          <img 
            src="/about.jpg" 
            alt="About Zyntrix Lab" 
            className="relative rounded-3xl shadow-2xl w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover border border-zinc-800/80"
          />
        </div>

        {/* Right Side: Text Content */}
        <div>
          <div className="inline-block mb-4">
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-xl">
              {t.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 leading-[1.2]">
            {t.titlePart1} <br />
            <span className="text-white">{t.titleHighlight}</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed sm:leading-8 mb-6 sm:mb-8">
            {t.description}
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm">
              <h3 className="font-bold text-base sm:text-lg text-white">{t.card1Title}</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{t.card1Sub}</p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm">
              <h3 className="font-bold text-base sm:text-lg text-white">{t.card2Title}</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{t.card2Sub}</p>
            </div>
          </div>

          {/* Ultra Premium Animated Team Button */}
          <div>
            <button 
              onClick={onShowTeam}
              className="group relative inline-flex items-center gap-3 w-full sm:w-auto px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl hover:scale-[1.03] active:scale-95 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer overflow-hidden border border-blue-400/30"
            >
              {/* Shimmer / Glowing Light Beam Effect */}
              <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />

              {/* Pulsing Background Ring */}
              <span className="absolute inset-0 rounded-2xl bg-blue-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>

              {/* Icon Container with pop effect */}
              <span className="relative z-10 flex items-center justify-center w-10 h-10 bg-white/10 rounded-xl border border-white/20 group-hover:rotate-12 transition-transform duration-300">
                <Users size={20} className="text-blue-200 group-hover:text-white transition-colors" />
              </span>

              {/* Text Layout */}
              <span className="relative z-10 flex flex-col text-left">
                <span className="text-sm sm:text-base tracking-wide font-extrabold">{t.btnText}</span>
                <span className="text-[11px] text-blue-200 font-medium tracking-wider">{t.btnSub}</span>
              </span>

              {/* Arrow Icon with Slide Animation */}
              <span className="relative z-10 ml-auto sm:ml-4 transform group-hover:translate-x-1.5 transition-transform duration-300">
                <ArrowRight size={18} className="text-white" />
              </span>
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}