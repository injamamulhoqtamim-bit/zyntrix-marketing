import React, { useState, useEffect } from 'react';
import { Play, ArrowRight, BookOpen, ShieldCheck, TrendingUp, ChevronDown, Lock, ArrowLeft, AlertTriangle } from "lucide-react";

export default function FreeResources({ lang = "en" }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  useEffect(() => {
    async function loadResources() {
      try {
        const res = await fetch("/api/content");
        const data = await res.json();

        if (data.success) {
          setResources(
            data.data.filter(item => item.section === "resources")
          );
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    loadResources();
  }, []);

  // ল্যাঙ্গুয়েজ প্রপ ট্র্যাকিং ও ফলব্যাক নিশ্চিত করার জন্য
  const currentLang = lang && lang.toLowerCase() === "bn" ? "bn" : "en";

  const content = {
    en: {
      badge: "Free Resources",
      title: "Free Learning Resources",
      subtitle: "Enhance your skills with our free comprehensive video courses.",
      watchBtn: "Watch Free",
      mainBtnText: "View All Videos",
      notFoundCode: "404",
      notFoundTitle: "Oops! Page Not Found",
      notFoundDesc: "The video archive or channel you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      backHomeBtn: "Back to Home",
    },
    bn: {
      badge: "ফ্রি রিসোর্স",
      title: "ফ্রি লার্নিং রিসোর্স",
      subtitle: "আমাদের ফ্রি কমপ্লিট ভিডিও কোর্সের মাধ্যমে আপনার দক্ষতা বাড়িয়ে নিন।",
      watchBtn: "ফ্রি দেখুন",
      mainBtnText: "সব ভিডিও দেখুন",
      notFoundCode: "৪১৫",
      notFoundTitle: "ওপস! পেজটি পাওয়া যায়নি",
      notFoundDesc: "আপনি যে ভিডিও আর্কাইভ বা চ্যানেলটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ রয়েছে।",
      backHomeBtn: "হোমে ফিরে যান",
    },
  };

  const t = content[currentLang] || content.en;

  if (isNotFoundPage) {
    return (
      <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl mb-8 group hover:border-red-500/50 transition-all duration-300">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 animate-pulse" />
          </div>

          <h1 className="text-7xl sm:text-9xl font-black tracking-widest bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">
            {t.notFoundCode}
          </h1>

          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            {t.notFoundTitle}
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
            {t.notFoundDesc}
          </p>

          <button 
            onClick={() => setIsNotFoundPage(false)}
            className="group inline-flex items-center gap-3 px-8 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer border border-blue-400/30"
          >
            <ArrowLeft size={18} className="transform group-hover:-translate-x-1.5 transition-transform" />
            <span className="text-sm sm:text-base">{t.backHomeBtn}</span>
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="resources" className="py-16 sm:py-24 md:py-28 bg-zinc-950 text-white relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[450px] md:w-[500px] h-[300px] sm:h-[450px] md:h-[500px] bg-blue-600/10 rounded-full blur-[100px] sm:blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-block mb-3 sm:mb-4">
            <span className="text-[11px] sm:text-xs md:text-sm font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/30 px-3.5 sm:px-4 py-1.5 rounded-full">
              {t.badge}
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 sm:mb-4 tracking-tight leading-snug sm:leading-tight">
            {t.title}
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base px-2 sm:px-0">
            {t.subtitle}
          </p>
        </div>

        {/* Loading Check */}
        {loading ? (
          <div className="text-center py-20 text-white">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10 sm:mb-12">
            {resources.map((item) => (
              <div key={item._id} className="group relative bg-zinc-900 border border-zinc-800 rounded-3xl p-6 flex flex-col justify-between">
                
                <div>
                  {/* Image check & Error Fallback */}
                  {item.image && item.image.trim() !== "" ? (
  <a href={item.link} target="_blank" rel="noopener noreferrer">
    <img 
      src={
        item.image.startsWith("http") 
          ? item.image 
          : encodeURI(item.image.startsWith("/") ? item.image : `/${item.image}`)
      } 
      alt={item.title} 
      className="w-full h-60 object-cover rounded-xl bg-zinc-800"
      onError={(e) => {
        e.target.style.display = 'none';
      }}
    />
  </a>
) : (
  <div className="w-full h-60 rounded-xl bg-gradient-to-br from-blue-900/40 to-zinc-800 flex items-center justify-center border border-zinc-800">
    <Play className="w-12 h-12 text-blue-400 opacity-60" />
  </div>
)}

                  <h3 className="text-2xl font-bold mt-5">
                    {item.title}
                  </h3>
                  <p className="text-zinc-400 mt-2">
                    {item.subtitle}
                  </p>
                </div>

                <a 
                  href={item.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="mt-6 inline-flex items-center justify-center gap-2 bg-blue-600 px-5 py-3 rounded-xl hover:bg-blue-700 transition-colors w-full font-semibold"
                >
                  {t.watchBtn} <ArrowRight size={18} />
                </a>

              </div>
            ))}
          </div>
        )}

        {/* Bottom Main Button */}
        <div className="text-center">
          <button 
            onClick={() => setIsNotFoundPage(true)}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-9 py-3.5 sm:py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer overflow-hidden border border-blue-400/30 w-full sm:w-auto"
          >
            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />

            <BookOpen size={18} className="text-blue-200 group-hover:text-white transition-colors relative z-10 shrink-0" />
            <span className="relative z-10 text-xs sm:text-sm md:text-base tracking-wide">{t.mainBtnText}</span>
            <ArrowRight size={16} className="relative z-10 transform group-hover:translate-x-1.5 transition-transform shrink-0" />
          </button>
        </div>

      </div>
    </section>
  );
}