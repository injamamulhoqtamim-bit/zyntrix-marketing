import React, { useState } from 'react';
import { Play, ArrowRight, BookOpen, ShieldCheck, TrendingUp, ChevronDown, Lock, ArrowLeft, AlertTriangle } from "lucide-react";

export default function FreeResources({ lang = "en" }) {
  // ডিজিটাল মার্কেটিং সাব-মেনু ওপেন/ক্লোজ স্টেট
  const [showMarketingLinks, setShowMarketingLinks] = useState(false);
  
  // 404 পেজ দেখানোর জন্য স্টেট (true হলে 404 পেজ রেন্ডার হবে)
  const [isNotFoundPage, setIsNotFoundPage] = useState(false);

  // ভাষা অনুযায়ী টেক্সট কনটেন্ট এবং লিংকসমূহ
  const content = {
    en: {
      badge: "Free Resources",
      title: "Free Learning Resources",
      subtitle: "Enhance your skills with our free comprehensive video courses.",
      card1Title: "Digital Marketing Course",
      card1Sub: "Master SEO, Social Media & Ads",
      marketingSub1: "Digital Marketing Basic UY LAB",
      marketingSub1Link: "https://drive.google.com/drive/folders/1BHpFXqwWsmo4xPyAlUKFKlKzSmFh_cb2?usp=drive_link",
      marketingSub2: "Email Marketing",
      marketingSub2Link: "https://drive.google.com/drive/folders/1OeVjeYT1i3RMEWQAecv_xNXaH7tV-BGA?usp=drive_link",
      card2Title: "Cyber Security & Ethical Hacking Course",
      card2Sub: "Learn Penetration Testing & Defense",
      card2Link: "https://drive.google.com/drive/folders/1uszP50mxR3K59cKqTrIOwQmH8PaKHJ0V?usp=drive_link",
      // নতুন কার্ডের ইংরেজি টেক্সট
      card3Title: "Cyber Security Expert for Social Media",
      card3Sub: "সোশ্যাল মিডিয়া সিকিউরিটি, অ্যাকাউন্ট রিকভারি, ডিজেবল/ব্যান, কপিরাইট ও মেটা সলিউশনসহ সম্পূর্ণ প্রফেশনাল ট্রেনিং।",
      card3Link: "https://drive.google.com/drive/folders/1eJrij244cBqwKYOpFedxRnR7hX99mYj0?usp=drive_link",
      watchBtn: "Watch Free",
      mainBtnText: "View All Videos",
      // 404 পেজের জন্য টেক্সট
      notFoundCode: "404",
      notFoundTitle: "Oops! Page Not Found",
      notFoundDesc: "The video archive or channel you are looking for might have been removed, had its name changed, or is temporarily unavailable.",
      backHomeBtn: "Back to Home",
    },
    bn: {
      badge: "ফ্রি রিসোর্স",
      title: "ফ্রি লার্নিং রিসোর্স",
      subtitle: "আমাদের ফ্রি কমপ্লিট ভিডিও কোর্সের মাধ্যমে আপনার দক্ষতা বাড়িয়ে নিন।",
      card1Title: "ডিজিটাল মার্কেটিং কোর্স",
      card1Sub: "এসইও, সোশ্যাল মিডিয়া এবং এডস মাস্টার করুন",
      marketingSub1: "Digital Marketing Basic UY LAB",
      marketingSub1Link: "https://drive.google.com/drive/folders/1BHpFXqwWsmo4xPyAlUKFKlKzSmFh_cb2?usp=drive_link",
      marketingSub2: "Email Marketing",
      marketingSub2Link: "https://drive.google.com/drive/folders/1OeVjeYT1i3RMEWQAecv_xNXaH7tV-BGA?usp=drive_link",
      card2Title: "সাইবার সিকিউরিটি ও ইথিকাল হ্যাকিং কোর্স",
      card2Sub: "পেনিট্রেশন টেস্টিং এবং ডিফেন্স শিখুন",
      card2Link: "https://drive.google.com/drive/folders/1uszP50mxR3K59cKqTrIOwQmH8PaKHJ0V?usp=drive_link",
      // নতুন কার্ডের বাংলা টেক্সট
      card3Title: "সোশ্যাল মিডিয়া সাইবার সিকিউরিটি এক্সপার্ট",
      card3Sub: "আপনার সোশ্যাল একাউন্ট ও ডিজিটাল ফুটপ্রিন্ট সুরক্ষিত রাখুন",
      card3Link: "https://drive.google.com/drive/folders/YOUR_SOCIAL_MEDIA_SECURITY_LINK",
      watchBtn: "ফ্রি দেখুন",
      mainBtnText: "সব ভিডিও দেখুন",
      // 404 পেজের জন্য টেক্সট
      notFoundCode: "404",
      notFoundTitle: "ওপস! পেজটি পাওয়া যায়নি",
      notFoundDesc: "আপনি যে ভিডিও আর্কাইভ বা চ্যানেলটি খুঁজছেন তা হয়তো সরিয়ে ফেলা হয়েছে, নাম পরিবর্তন করা হয়েছে অথবা সাময়িকভাবে অনুপলব্ধ রয়েছে।",
      backHomeBtn: "হোমে ফিরে যান",
    },
  };

  const t = content[lang] || content.en;

  // যদি `isNotFoundPage` ট্রু হয়, তবে প্রিমিয়াম 404 পেজ রেন্ডার করবে
  if (isNotFoundPage) {
    return (
      <section className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4 sm:px-6 relative overflow-hidden">
        {/* Background Glow Effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-xl mx-auto text-center relative z-10">
          {/* Icon Badge */}
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl mb-8 group hover:border-red-500/50 transition-all duration-300">
            <AlertTriangle className="w-10 h-10 sm:w-12 sm:h-12 text-red-500 animate-pulse" />
          </div>

          {/* 404 Number with Gradient */}
          <h1 className="text-7xl sm:text-9xl font-black tracking-widest bg-gradient-to-r from-red-500 via-rose-500 to-orange-500 bg-clip-text text-transparent mb-4">
            {t.notFoundCode}
          </h1>

          {/* Title & Description */}
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">
            {t.notFoundTitle}
          </h2>
          <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
            {t.notFoundDesc}
          </p>

          {/* Back Home Button */}
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

  // মূল রিসোর্স সেকশন
  return (
    <section id="resources" className="py-16 sm:py-24 md:py-28 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Glow Effect - Responsive sizing */}
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

        {/* Cards Grid (3 Cards now) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-10 sm:mb-12">
          
          {/* Card 1: Digital Marketing */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              {/* Image / Thumbnail Container */}
              <div className="relative block h-44 sm:h-52 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-zinc-950 border border-zinc-800">
                <img 
                  src="/digitalMarketing.png" 
                  alt="Digital Marketing Course" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={22} className="fill-white ml-0.5 sm:ml-1" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <TrendingUp size={13} /> Marketing
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-400 transition-colors">
                {t.card1Title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                {t.card1Sub}
              </p>
            </div>

            {/* Action Button & Sub-links Container */}
            <div className="relative">
              <button 
                onClick={() => setShowMarketingLinks(!showMarketingLinks)}
                className="inline-flex items-center justify-between w-full py-2.5 sm:py-3 px-4 bg-zinc-800/80 hover:bg-blue-600 text-zinc-200 hover:text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 cursor-pointer"
              >
                <span>{t.watchBtn}</span>
                <ChevronDown size={16} className={`transform transition-transform duration-300 ${showMarketingLinks ? "rotate-180" : ""}`} />
              </button>

              {/* Sub-links Dropdown / Pop-up */}
              {showMarketingLinks && (
                <div className="absolute left-0 bottom-full mb-2 w-full bg-zinc-900 border border-zinc-700/80 rounded-xl sm:rounded-2xl p-2 shadow-2xl z-20 flex flex-col gap-2 animate-fadeIn">
                  <a 
                    href={t.marketingSub1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg sm:rounded-xl bg-zinc-800/60 hover:bg-blue-600 text-zinc-200 hover:text-white text-xs font-semibold transition-colors group/sub"
                  >
                    <span className="truncate pr-2">{t.marketingSub1}</span>
                    <ArrowRight size={14} className="shrink-0 transform group-hover/sub:translate-x-1 transition-transform" />
                  </a>
                  
                  <a 
                    href={t.marketingSub2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-lg sm:rounded-xl bg-zinc-800/60 hover:bg-blue-600 text-zinc-200 hover:text-white text-xs font-semibold transition-colors group/sub"
                  >
                    <span className="truncate pr-2">{t.marketingSub2}</span>
                    <ArrowRight size={14} className="shrink-0 transform group-hover/sub:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Card 2: Cyber Security & Ethical Hacking */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              {/* Image / Thumbnail Container */}
              <a 
                href={t.card2Link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block h-44 sm:h-52 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-zinc-950 border border-zinc-800 cursor-pointer"
              >
                <img 
                  src="/cyberSecurity.png" 
                  alt="Cyber Security & Ethical Hacking Course" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={22} className="fill-white ml-0.5 sm:ml-1" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <ShieldCheck size={13} /> Security
                </div>
              </a>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-400 transition-colors">
                {t.card2Title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                {t.card2Sub}
              </p>
            </div>

            {/* Action Button inside Card */}
            <a 
              href={t.card2Link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full py-2.5 sm:py-3 px-4 bg-zinc-800/80 hover:bg-blue-600 text-zinc-200 hover:text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 group/btn"
            >
              <span>{t.watchBtn}</span>
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Card 3: Cyber Security Expert for Social Media */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between">
            <div>
              {/* Image / Thumbnail Container */}
              <a 
                href={t.card3Link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block h-44 sm:h-52 md:h-60 rounded-xl sm:rounded-2xl overflow-hidden mb-4 sm:mb-6 bg-zinc-950 border border-zinc-800 cursor-pointer"
              >
                <img 
                  src="/CyberForSocial.png" 
                  alt="Cyber Security Expert for Social Media" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={22} className="fill-white ml-0.5 sm:ml-1" />
                  </div>
                </div>
                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-2.5 sm:px-3 py-1 rounded-lg text-[11px] sm:text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <Lock size={13} /> Social Security
                </div>
              </a>

              {/* Title & Subtitle */}
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-1.5 sm:mb-2 group-hover:text-blue-400 transition-colors">
                {t.card3Title}
              </h3>
              <p className="text-zinc-400 text-xs sm:text-sm md:text-base mb-4 sm:mb-6">
                {t.card3Sub}
              </p>
            </div>

            {/* Action Button inside Card */}
            <a 
              href={t.card3Link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full py-2.5 sm:py-3 px-4 bg-zinc-800/80 hover:bg-blue-600 text-zinc-200 hover:text-white rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 group/btn"
            >
              <span>{t.watchBtn}</span>
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Bottom Main "View All Videos" Button (Clicking this will show 404 Page) */}
        <div className="text-center">
          <button 
            onClick={() => setIsNotFoundPage(true)}
            className="group relative inline-flex items-center justify-center gap-2 sm:gap-3 px-6 sm:px-9 py-3.5 sm:py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-xl sm:rounded-2xl hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer overflow-hidden border border-blue-400/30 w-full sm:w-auto"
          >
            {/* Shimmer Light Effect */}
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