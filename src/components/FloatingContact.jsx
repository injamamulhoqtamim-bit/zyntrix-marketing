"use client";
import { useState, useEffect } from "react";
import { FaFacebookF, FaEnvelope, FaTimes, FaCommentDots, FaArrowUp } from "react-icons/fa";

export default function FloatingContact({ lang = "en" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // ভাষার ওপর ভিত্তি করে লেবেল পরিবর্তন
  const contactText = lang === "bn" ? "যোগাযোগ করুন" : "Contact Us";

  // পেজ স্ক্রোল করলে প্রোগ্রেস এবং বাটন ভিজিবিলিটি হিসাব করবে
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const currentScroll = window.scrollY;
      
      if (totalScroll > 0) {
        const progress = (currentScroll / totalScroll) * 100;
        setScrollProgress(progress);
      }

      if (currentScroll > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // পেজে একদম উপরে তোলার ফাংশন
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {/* ১. বাম পাশের নিচে প্রিমিয়াম প্রোগ্রেস সার্কেল সহ স্ক্রোল টু টপ বাটন (Fully Responsive Positioning) */}
      {showScrollTop && (
        <div className="fixed bottom-3 left-3 sm:bottom-6 sm:left-6 z-50">
          <button
            onClick={scrollToTop}
            className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center cursor-pointer group transition-all duration-300 hover:scale-110"
            aria-label="Scroll to top"
          >
            {/* SVG Progress Ring Background & Active Stroke */}
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 36 36">
              {/* Background Track Circle */}
              <path
                className="text-zinc-800"
                strokeWidth="3"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {/* Animated Progress Circle */}
              <path
                className="text-blue-500 transition-all duration-100"
                strokeDasharray={`${scrollProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>

            {/* Inner Circle Button with Icon */}
            <div className="relative z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-zinc-900 border border-zinc-700/80 text-white flex items-center justify-center shadow-xl shadow-black/60 group-hover:bg-zinc-800 group-hover:border-blue-500/50 transition-all duration-300">
              <FaArrowUp size={12} className="sm:text-sm text-zinc-300 group-hover:text-blue-400 group-hover:-translate-y-0.5 transition-all duration-300" />
            </div>
          </button>
        </div>
      )}

      {/* ২. ডান পাশের নিচে প্রিমিয়াম কন্টাক্ট উইজেট (Fully Responsive Layout) */}
      <div className="fixed bottom-3 right-3 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-2.5 sm:gap-3">
        
        {/* সাব-আইকনগুলো */}
        {isOpen && (
          <div className="flex flex-col gap-2.5 sm:gap-3 transition-all duration-500 transform scale-100 opacity-100 animate-in fade-in slide-in-from-bottom-5 mb-1">
            {/* Email */}
            <a
              href="mailto:zyntrix.lab.official@gmail.com"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-red-500 via-rose-500 to-pink-600 hover:scale-110 text-white flex items-center justify-center shadow-lg shadow-red-500/40 transition-all duration-300 hover:rotate-6"
              aria-label="Email"
              title="Send Email"
            >
              <FaEnvelope size={16} className="sm:text-lg" />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61588044801657"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 hover:scale-110 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 transition-all duration-300 hover:-rotate-6"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF size={16} className="sm:text-lg" />
            </a>
          </div>
        )}

        {/* মেইন কন্টেইনার */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* ডায়নামিক লেবেল */}
          {!isOpen && (
            <div className="hidden sm:block bg-zinc-900/90 border border-zinc-800 text-white text-xs font-medium px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md animate-pulse">
              {contactText}
            </div>
          )}

          {/* অত্যন্ত প্রিমিয়াম এবং গ্লোয়িং মেইন টগল বাটন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20 group overflow-hidden"
            aria-label="Toggle Contact Menu"
          >
            {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ড */}
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>

            {/* আইকন টগল উইথ স্মুথ রোটেশন */}
            <div className="relative z-10 transition-transform duration-300 transform">
              {isOpen ? (
                <FaTimes size={18} className="sm:text-xl rotate-90 animate-in fade-in duration-200" />
              ) : (
                <FaCommentDots size={18} className="sm:text-xl animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}