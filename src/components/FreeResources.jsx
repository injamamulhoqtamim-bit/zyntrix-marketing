import React, { useState } from 'react';
import { Play, ArrowRight, BookOpen, ShieldCheck, TrendingUp, ChevronDown } from "lucide-react";

export default function FreeResources({ lang = "en" }) {
  // ডিজিটাল মার্কেটিং সাব-মেনু ওপেন/ক্লোজ স্টেট (মোবাইল ও ডেস্কটপ উভয়ের জন্য)
  const [showMarketingLinks, setShowMarketingLinks] = useState(false);

  // ভাষা অনুযায়ী টেক্সট কনটেন্ট এবং আলাদা ভিডিও/ড্রাইভ লিংক
  const content = {
    en: {
      badge: "Free Resources",
      title: "Free Learning Resources",
      subtitle: "Enhance your skills with our free comprehensive video courses.",
      card1Title: "Digital Marketing Course",
      card1Sub: "Master SEO, Social Media & Ads",
      // ডিজিটাল মার্কেটিং এর সাব-কোর্সের লিংকসমূহ
      marketingSub1: "Digital Marketing Basic UY LAB",
      marketingSub1Link: "https://drive.google.com/drive/folders/1BHpFXqwWsmo4xPyAlUKFKlKzSmFh_cb2?usp=drive_link", // এখানে আপনার লিংক দিন
      marketingSub2: "Email Marketing",
      marketingSub2Link: "https://drive.google.com/drive/folders/1OeVjeYT1i3RMEWQAecv_xNXaH7tV-BGA?usp=drive_link", // এখানে আপনার লিংক দিন

      card2Title: "Cyber Security & Ethical Hacking Course",
      card2Sub: "Learn Penetration Testing & Defense",
      card2Link: "https://drive.google.com/drive/folders/1uszP50mxR3K59cKqTrIOwQmH8PaKHJ0V?usp=drive_link", // এখানে আপনার ড্রাইভ লিংক দেওয়া আছে
      watchBtn: "Watch Free",
      mainBtnText: "View All Videos",
      mainBtnLink: "https://www.youtube.com/@YOUR_CHANNEL", 
    },
    bn: {
      badge: "ফ্রি রিসোর্স",
      title: "ফ্রি লার্নিং রিসোর্স",
      subtitle: "আমাদের ফ্রি কমপ্লিট ভিডিও কোর্সের মাধ্যমে আপনার দক্ষতা বাড়িয়ে নিন।",
      card1Title: "ডিজিটাল মার্কেটিং কোর্স",
      card1Sub: "এসইও, সোশ্যাল মিডিয়া এবং এডস মাস্টার করুন",
      // ডিজিটাল মার্কেটিং এর সাব-কোর্সের লিংকসমূহ
      marketingSub1: "Digital Marketing Basic UY LAB",
      marketingSub1Link: "https://www.youtube.com/watch?v=YOUR_UY_LAB_LINK", // এখানে আপনার লিংক দিন
      marketingSub2: "Email Marketing",
      marketingSub2Link: "https://www.youtube.com/watch?v=YOUR_EMAIL_MARKETING_LINK", // এখানে আপনার লিংক দিন

      card2Title: "সাইবার সিকিউরিটি ও ইথিকাল হ্যাকিং কোর্স",
      card2Sub: "পেনিট্রেশন টেস্টিং এবং ডিফেন্স শিখুন",
      card2Link: "https://drive.google.com/drive/folders/1uszP50mxR3K59cKqTrIOwQmH8PaKHJ0V?usp=drive_link", // এখানে আপনার ড্রাইভ লিংক দেওয়া আছে
      watchBtn: "ফ্রি দেখুন",
      mainBtnText: "সব ভিডিও দেখুন",
      mainBtnLink: "https://www.youtube.com/@YOUR_CHANNEL", 
    },
  };

  const t = content[lang] || content.en;

  return (
    <section id="resources" className="py-20 sm:py-28 bg-zinc-950 text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-block mb-4">
            <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-full">
              {t.badge}
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 tracking-tight">
            {t.title}
          </h2>
          <p className="text-zinc-400 text-sm sm:text-base">
            {t.subtitle}
          </p>
        </div>

        {/* Cards Grid (2 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Digital Marketing (ডুয়াল সাব-বাটন যুক্ত) */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 sm:p-6 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between">
            <div>
              {/* Image / Thumbnail Container */}
              <div className="relative block h-52 sm:h-60 rounded-2xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-800">
                <img 
                  src="/digitalMarketing.png" 
                  alt="Digital Marketing Course" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={24} className="fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-lg text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <TrendingUp size={14} /> Marketing
                </div>
              </div>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {t.card1Title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base mb-6">
                {t.card1Sub}
              </p>
            </div>

            {/* Action Button & Sub-links Container */}
            <div className="relative">
              <button 
                onClick={() => setShowMarketingLinks(!showMarketingLinks)}
                className="inline-flex items-center justify-between w-full py-3 px-4 bg-zinc-800/80 hover:bg-blue-600 text-zinc-200 hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer"
              >
                <span>{t.watchBtn}</span>
                <ChevronDown size={18} className={`transform transition-transform duration-300 ${showMarketingLinks ? "rotate-180" : ""}`} />
              </button>

              {/* যখন "Watch Free" এ ক্লিক করা হবে তখন এই ২টি সাব-বাটন ওপেন হবে */}
              {showMarketingLinks && (
                <div className="absolute left-0 bottom-full mb-2 w-full bg-zinc-900 border border-zinc-700/80 rounded-2xl p-2 shadow-2xl z-20 flex flex-col gap-2 animate-fadeIn">
                  <a 
                    href={t.marketingSub1Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/60 hover:bg-blue-600 text-zinc-200 hover:text-white text-xs font-semibold transition-colors group/sub"
                  >
                    <span>{t.marketingSub1}</span>
                    <ArrowRight size={14} className="transform group-hover/sub:translate-x-1 transition-transform" />
                  </a>
                  
                  <a 
                    href={t.marketingSub2Link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-800/60 hover:bg-blue-600 text-zinc-200 hover:text-white text-xs font-semibold transition-colors group/sub"
                  >
                    <span>{t.marketingSub2}</span>
                    <ArrowRight size={14} className="transform group-hover/sub:translate-x-1 transition-transform" />
                  </a>
                </div>
              )}
            </div>

          </div>

          {/* Card 2: Cyber Security & Ethical Hacking */}
          <div className="group relative bg-zinc-900/60 border border-zinc-800/80 rounded-3xl p-5 sm:p-6 backdrop-blur-md hover:border-blue-500/50 transition-all duration-300 shadow-xl hover:shadow-blue-500/10 flex flex-col justify-between">
            <div>
              {/* Image / Thumbnail Container */}
              <a 
                href={t.card2Link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative block h-52 sm:h-60 rounded-2xl overflow-hidden mb-6 bg-zinc-950 border border-zinc-800 cursor-pointer"
              >
                <img 
                  src="/cyberSecurity.png" 
                  alt="Cyber Security & Ethical Hacking Course" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                  <div className="w-14 h-14 bg-blue-600/90 rounded-full flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform">
                    <Play size={24} className="fill-white ml-1" />
                  </div>
                </div>
                <div className="absolute top-3 left-3 bg-zinc-950/80 backdrop-blur-md border border-zinc-800 px-3 py-1 rounded-lg text-xs font-semibold text-blue-400 flex items-center gap-1.5">
                  <ShieldCheck size={14} /> Security
                </div>
              </a>

              {/* Title & Subtitle */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {t.card2Title}
              </h3>
              <p className="text-zinc-400 text-sm sm:text-base mb-6">
                {t.card2Sub}
              </p>
            </div>

            {/* Action Button inside Card (Watch Free) */}
            <a 
              href={t.card2Link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between w-full py-3 px-4 bg-zinc-800/80 hover:bg-blue-600 text-zinc-200 hover:text-white rounded-xl font-semibold text-sm transition-all duration-300 group/btn"
            >
              <span>{t.watchBtn}</span>
              <ArrowRight size={16} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </a>
          </div>

        </div>

        {/* Bottom Main "View All Videos" Button */}
        <div className="text-center">
          <a 
            href={t.mainBtnLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-3 px-9 py-4 font-bold text-white transition-all duration-300 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 rounded-2xl hover:scale-105 active:scale-95 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 cursor-pointer overflow-hidden border border-blue-400/30"
          >
            {/* Shimmer Light Effect */}
            <span className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:animate-shine" />

            <BookOpen size={20} className="text-blue-200 group-hover:text-white transition-colors relative z-10" />
            <span className="relative z-10 text-sm sm:text-base tracking-wide">{t.mainBtnText}</span>
            <ArrowRight size={18} className="relative z-10 transform group-hover:translate-x-1.5 transition-transform" />
          </a>
        </div>

      </div>
    </section>
  );
}