"use client";

import { useEffect, useRef, useState } from "react";

export default function Hero() {
  const videos = ["/hero.mp4", "/hero2.mp4", "/hero3.mp4"];

  const [currentVideo, setCurrentVideo] = useState(0);
  const videoRef = useRef(null);

  const popupData = [
    {
      title: "🚀 Do You Learn Digital Marketing?",
      link: "https://YOUR_DIGITAL_MARKETING_LINK.com",
    },
    {
      title: "🔐 Do You Learn Ethical Hacking?",
      link: "https://YOUR_ETHICAL_HACKING_LINK.com",
    },
  ];

  const [showPopup, setShowPopup] = useState(false);
  const [popupIndex, setPopupIndex] = useState(0);

  // পপআপ ক্লোজ করার ফাংশন
  const handleClosePopup = () => {
    setShowPopup(false);
    localStorage.setItem("popupClosed", "true"); // লোকাল স্টোরেজে সেভ করা হলো
  };

  const handleVideoEnd = () => {
    setCurrentVideo((prev) => (prev + 1) % videos.length);
  };

  useEffect(() => {
    // যদি আগে থেকেই ক্লোজ করা থাকে, তবে আর পপআপ দেখাবে না
    if (localStorage.getItem("popupClosed") === "true") return;

    let startTimer;
    let hideTimer;
    let nextTimer;

    const runPopup = (index) => {
      setPopupIndex(index);
      setShowPopup(true);

      hideTimer = setTimeout(() => {
        setShowPopup(false);
        nextTimer = setTimeout(() => {
          runPopup((index + 1) % popupData.length);
        }, 2000);
      }, 10000); 
    };

    startTimer = setTimeout(() => {
      runPopup(0);
    }, 3000);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(hideTimer);
      clearTimeout(nextTimer);
    };
  }, []);

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

      {/* Popup */}
      {showPopup && (
        <div className="fixed bottom-8 right-8 z-50">
          <div className="relative w-[320px] rounded-2xl bg-white shadow-2xl overflow-hidden">
            <button
              onClick={handleClosePopup} // এখানে আপডেট করা হয়েছে
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <a
              href={popupData[popupIndex].link}
              target="_blank"
              rel="noopener noreferrer"
              className="block p-6"
            >
              <h2 className="text-xl font-bold text-gray-900">
                {popupData[popupIndex].title}
              </h2>
              <p className="mt-3 text-gray-600">
                Click here to explore our professional course.
              </p>
              <button className="mt-5 w-full rounded-lg bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 transition">
                Learn More →
              </button>
            </a>
          </div>
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