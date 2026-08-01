"use client";
import { useState } from "react";
import { Rocket, Globe, Palette, TrendingUp, Zap, Smartphone, Search, Award, Briefcase, ShieldCheck, Megaphone, ShoppingCart, Target, Menu, X, Languages } from "lucide-react";

export default function Navbar({ lang, toggleLanguage }) {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = {
    en: [
      { name: "Home", href: "#" },
      { name: "About", href: "#about" },
      { name: "Services", href: "#services" },
      { name: "Projects", href: "#projects" },
      { name: "Blog", href: "#blog" },
      { name: "Support", href: "#support" },
      { name: "Contact", href: "#contact" },
    ],
    bn: [
      { name: "হোম", href: "#" },
      { name: "আমাদের সম্পর্কে", href: "#about" },
      { name: "সেবাসমূহ", href: "#services" },
      { name: "প্রজেক্টসমূহ", href: "#projects" },
      { name: "ব্লগ", href: "#blog" },
      { name: "সাপোর্ট", href: "#support" },
      { name: "যোগাযোগ", href: "#contact" },
    ],
  };

  const marqueeItems = {
    en: [
      { icon: <Rocket size={16} />, text: "WELCOME TO ZYNTRIX LAB" },
      { icon: <Target size={16} />, text: "আপনি কি ডিজিটাল মার্কিটিং এবং সাইবার সিকিউরিটি ও ইথিকাল হ্যাকিং শিখতে চান ?" },
      { icon: <Target size={16} />, text: "অ্যাকাউন্ট সিকিউরিটি শিখতে চান? " },
      { icon: <Target size={16} />, text: "লক/ডিজেবল আইডি রিকভার করতে চান?" },
      { icon: <Target size={16} />, text: "কপিরাইট ম্যানেজমেন্ট শিখতে চান?" },
      { icon: <Target size={16} />, text: "Meta Verified সম্পর্কে জানতে চান?" },
      { icon: <Target size={16} />, text: "সোশ্যাল মিডিয়া সিকিউরিটিতে দক্ষ হতে চান?" },
      { icon: <Globe size={16} />, text: "MODERN WEB SOLUTIONS" },
      { icon: <Palette size={16} />, text: "UI/UX DESIGN" },
      { icon: <TrendingUp size={16} />, text: "DIGITAL MARKETING" },
      { icon: <Zap size={16} />, text: "FAST & SECURE WEBSITE" },
      { icon: <Smartphone size={16} />, text: "MOBILE APP DESIGN" },
      { icon: <Search size={16} />, text: "SEO OPTIMIZATION" },
      { icon: <Award size={16} />, text: "100% CLIENT SATISFACTION" },
      { icon: <Briefcase size={16} />, text: "BUSINESS BRANDING" },
      { icon: <ShieldCheck size={16} />, text: "CYBER SECURITY" },
      { icon: <Megaphone size={16} />, text: "SOCIAL MEDIA MARKETING" },
      { icon: <ShoppingCart size={16} />, text: "E-COMMERCE SOLUTIONS" },
      { icon: <Target size={16} />, text: "LET'S BUILD YOUR EMPIRE" },
    ],
    bn: [
      { icon: <Rocket size={16} />, text: "জাইন্ট্রিক্স ল্যাবে স্বাগতম" },
      { icon: <Target size={16} />, text: "আপনি কি ডিজিটাল মার্কিটিং এবং সাইবার সিকিউরিটি ও ইথিকাল হ্যাকিং শিখতে চান ?" },
      { icon: <Globe size={16} />, text: "মডার্ন ওয়েব সলিউশন" },
      { icon: <Palette size={16} />, text: "ইউআই/ইউএক্স ডিজাইন" },
      { icon: <TrendingUp size={16} />, text: "ডিজিটাল মার্কেটিং" },
      { icon: <Zap size={16} />, text: "ফাস্ট ও সিকিউর ওয়েবসাইট" },
      { icon: <Smartphone size={16} />, text: "মোবাইল অ্যাপ ডিজাইন" },
      { icon: <Search size={16} />, text: "এসইও অপ্টিমাইজেশন" },
      { icon: <Award size={16} />, text: "১০০% ক্লায়েন্ট সন্তুষ্টি" },
      { icon: <Briefcase size={16} />, text: "বিজনেস ব্র্যান্ডিং" },
      { icon: <ShieldCheck size={16} />, text: "সাইবার সিকিউরিটি" },
      { icon: <Megaphone size={16} />, text: "সোশ্যাল মিডিয়া মার্কেটিং" },
      { icon: <ShoppingCart size={16} />, text: "ই-কমার্স সলিউশন" },
      { icon: <Target size={16} />, text: "আসুন আপনার ডিজিটাল সাম্রাজ্য গড়ে তুলি" },
    ],
  };

  const currentMenu = menuItems[lang] || menuItems.en;
  const currentMarquee = marqueeItems[lang] || marqueeItems.en;

  return (
    <>
      <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg sm:text-xl font-black tracking-wider text-white">
              ZYNTRIX<span className="text-blue-500">LAB</span>
            </span>
          </div>

          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-5 lg:gap-6">
            {currentMenu.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-zinc-400 hover:text-white font-medium text-xs lg:text-sm transition-colors">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-semibold px-3 py-2 rounded-lg transition-all cursor-pointer"
              aria-label="Toggle Language"
            >
              <Languages size={15} className="text-blue-500" />
              <span>{lang === "en" ? "বাংলা" : "English"}</span>
            </button>

            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm font-semibold px-4 lg:px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-600/30">
              {lang === "en" ? "Request Service" : "সেবা নিন"}
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-1 bg-zinc-900 text-zinc-300 border border-zinc-800 text-xs font-semibold px-2.5 py-2 rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Language"
            >
              <Languages size={14} className="text-blue-500" />
              <span>{lang === "en" ? "বাংলা" : "EN"}</span>
            </button>

            <button 
              onClick={() => setIsOpen(true)}
              className="text-zinc-300 hover:text-white p-2 rounded-xl bg-zinc-900 border border-zinc-800 transition-colors shadow-sm cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* চিরপ্রবহমান মারকি বার (Seamless Continuous Marquee) */}
        <div className="w-full bg-blue-600 border-b border-blue-500/20 overflow-hidden relative flex">
          <div className="flex animate-marquee whitespace-nowrap py-2 sm:py-2.5 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            {/* প্রথম সেট */}
            <div className="flex items-center shrink-0">
              {currentMarquee.map((item, idx) => (
                <span key={`1-${idx}`} className="inline-flex items-center gap-2 px-4">
                  {item.icon} <span>{item.text}</span>
                  <span className="ml-4 opacity-50">•</span>
                </span>
              ))}
            </div>
            {/* দ্বিতীয় সেট (seamless লুপ বজায় রাখার জন্য) */}
            <div className="flex items-center shrink-0" aria-hidden="true">
              {currentMarquee.map((item, idx) => (
                <span key={`2-${idx}`} className="inline-flex items-center gap-2 px-4">
                  {item.icon} <span>{item.text}</span>
                  <span className="ml-4 opacity-50">•</span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Backdrop for Sidebar */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Left Slide Sidebar (Drawer) for Mobile */}
      <div className={`fixed top-0 left-0 h-full w-[80%] max-w-xs bg-zinc-950 border-r border-zinc-900 z-50 transform transition-transform duration-300 ease-in-out shadow-2xl flex flex-col justify-between ${isOpen ? "translate-x-0" : "-translate-x-full"}`}>
        <div>
          <div className="flex items-center justify-between px-5 h-16 sm:h-20 border-b border-zinc-900">
            <span className="text-lg font-black tracking-wider text-white">
              ZYNTRIX<span className="text-blue-500">LAB</span>
            </span>

            <button 
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-white p-2 rounded-lg bg-zinc-900 border border-zinc-800 transition-colors cursor-pointer"
              aria-label="Close Menu"
            >
              <X size={18} />
            </button>
          </div>

          <ul className="flex flex-col p-5 space-y-2 sm:space-y-3 overflow-y-auto max-h-[calc(100vh-180px)]">
            {currentMenu.map((item, index) => (
              <li key={index}>
                <a 
                  href={item.href} 
                  onClick={() => setIsOpen(false)}
                  className="text-zinc-300 hover:text-blue-400 font-medium text-sm sm:text-base transition-colors block py-2 border-b border-zinc-900/60"
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-5 border-t border-zinc-900 bg-zinc-950">
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-center"
          >
            {lang === "en" ? "Request Service" : "সেবা নিন"}
          </a>
        </div>
      </div>
    </>
  );
}