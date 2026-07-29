"use client";
import { useState } from "react";
import { Rocket, Globe, Palette, TrendingUp, Zap, Smartphone, Search, Award, Briefcase, ShieldCheck, Megaphone, ShoppingCart, Target, Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: "Home", href: "#" },
    { name: "About", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Projects", href: "#projects" },
    { name: "Team", href: "#team" },
    { name: "Blog", href: "#blog" },
    { name: "Support", href: "#support" },
    { name: "Contact", href: "#contact" },
  ];

  // আইটেমগুলো এবং তাদের আইকন
  const marqueeItems = [
    { icon: <Rocket size={16} />, text: "WELCOME TO ZYNTRIX LAB" },
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
  ];

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
            {menuItems.map((item, index) => (
              <li key={index}>
                <a href={item.href} className="text-zinc-400 hover:text-white font-medium text-xs lg:text-sm transition-colors">
                  {item.name}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-xs lg:text-sm font-semibold px-4 lg:px-5 py-2.5 rounded-lg transition-all shadow-lg shadow-blue-600/30">
              Request Service
            </a>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(true)}
              className="text-zinc-300 hover:text-white p-2 rounded-xl bg-zinc-900 border border-zinc-800 transition-colors shadow-sm cursor-pointer"
              aria-label="Open Menu"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>

        {/* চলমান রানিং টেক্সট বার (Marquee) */}
        <div className="w-full bg-blue-600 border-b border-blue-500/20 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap inline-block py-2 sm:py-2.5 text-white text-[11px] sm:text-xs font-bold uppercase tracking-wider">
            {[...Array(2)].map((_, i) => (
              <span key={i} className="inline-flex items-center gap-6 px-4">
                {marqueeItems.map((item, idx) => (
                  <span key={idx} className="inline-flex items-center gap-2">
                    {item.icon} <span>{item.text}</span>
                    <span className="ml-6 opacity-50">•</span>
                  </span>
                ))}
              </span>
            ))}
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
          {/* Sidebar Header */}
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

          {/* Sidebar Menu Items */}
          <ul className="flex flex-col p-5 space-y-2 sm:space-y-3 overflow-y-auto max-h-[calc(100vh-180px)]">
            {menuItems.map((item, index) => (
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

        {/* Sidebar Footer Action */}
        <div className="p-5 border-t border-zinc-900 bg-zinc-950">
          <a 
            href="#contact" 
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/30 text-center"
          >
            Request Service
          </a>
        </div>
      </div>
    </>
  );
}