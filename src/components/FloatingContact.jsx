"use client";
import { useState, useEffect } from "react";
import { FaFacebookF, FaEnvelope, FaTimes, FaCommentDots, FaArrowUp } from "react-icons/fa";

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  // পেজ স্ক্রোল করলে চেক করবে যে নিচে নামা হয়েছে কি না
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
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
      {/* ১. বাম পাশের নিচে প্রিমিয়াম স্ক্রোল টু টপ বাটন (রেস্পন্সিভ সাইজ ও পজিশন) */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-50 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-white flex items-center justify-center shadow-2xl shadow-black/60 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-zinc-800 hover:border-blue-500/50 hover:shadow-blue-500/20 cursor-pointer group animate-bounce"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={16} className="text-zinc-300 group-hover:text-blue-400 group-hover:-translate-y-0.5 transition-all duration-300" />
        </button>
      )}

      {/* ২. ডান পাশের নিচে প্রিমিয়াম কন্টাক্ট উইজেট */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end gap-3">
        
        {/* সাব-আইকনগুলো (স্মুথ পপ-আপ ও স্কেল অ্যানিমেশন সহ) */}
        {isOpen && (
          <div className="flex flex-col gap-3 transition-all duration-500 transform scale-100 opacity-100 animate-in fade-in slide-in-from-bottom-5 mb-1">
            {/* Email */}
            <a
              href="mailto:zyntrix.lab.official@gmail.com"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-red-500 via-rose-500 to-pink-600 hover:scale-110 text-white flex items-center justify-center shadow-lg shadow-red-500/40 transition-all duration-300 hover:rotate-6"
              aria-label="Email"
              title="Send Email"
            >
              <FaEnvelope size={18} />
            </a>

            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=61588044801657"
              target="_blank"
              rel="noopener noreferrer"
              className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-500 to-sky-400 hover:scale-110 text-white flex items-center justify-center shadow-lg shadow-blue-500/40 transition-all duration-300 hover:-rotate-6"
              aria-label="Facebook"
              title="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
          </div>
        )}

        {/* মেইন কন্টেইনার যাতে টুলটিপ এবং বাটন একসাথে থাকে */}
        <div className="flex items-center gap-3">
          {/* "Contact Us" টুলটিপ বা লেবেল (মোবাইল স্ক্রিনে ছোট বা হাইড করা যেতে পারে চাইলে) */}
          {!isOpen && (
            <div className="hidden sm:block bg-zinc-900/90 border border-zinc-800 text-white text-xs font-medium px-3.5 py-2 rounded-xl shadow-xl backdrop-blur-md animate-pulse">
              Contact Us
            </div>
          )}

          {/* অত্যন্ত প্রিমিয়াম এবং গ্লোয়িং মেইন টগল বাটন */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="relative w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-2xl shadow-indigo-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer border border-white/20 group overflow-hidden"
            aria-label="Toggle Contact Menu"
          >
            {/* গ্লো ইফেক্ট ব্যাকগ্রাউন্ড */}
            <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full"></span>

            {/* আইকন টগল উইথ স্মুথ রোটেশন */}
            <div className="relative z-10 transition-transform duration-300 transform">
              {isOpen ? (
                <FaTimes size={20} className="rotate-90 animate-in fade-in duration-200" />
              ) : (
                <FaCommentDots size={22} className="animate-pulse" />
              )}
            </div>
          </button>
        </div>
      </div>
    </>
  );
}