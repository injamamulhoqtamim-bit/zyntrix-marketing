"use client";
import { useState } from "react";
import { Rocket, Globe, Palette, TrendingUp, Zap, Smartphone, Search, Award, Briefcase, ShieldCheck, Megaphone, ShoppingCart, Target } from "lucide-react";

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900">
      <div className="max-w-6xl mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-black tracking-wider text-white">
            ZYNTRIX<span className="text-blue-500">LAB</span>
          </span>
        </div>

        <ul className="hidden md:flex items-center gap-6">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a href={item.href} className="text-zinc-400 hover:text-white font-medium text-sm transition-colors">
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <a href="#contact" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-all">
            Request Service
          </a>
        </div>
      </div>

      {/* চলমান রানিং টেক্সট বার */}
      <div className="w-full bg-blue-600 border-b border-blue-500/20 overflow-hidden">
        <div className="animate-marquee whitespace-nowrap inline-block py-3 text-white text-sm font-bold uppercase tracking-wider">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 px-4">
              {marqueeItems.map((item, idx) => (
                <span key={idx} className="flex items-center gap-2">
                  {item.icon} <span>{item.text}</span>
                  <span className="ml-6 opacity-50">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </nav>
  );
}