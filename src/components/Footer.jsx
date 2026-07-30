import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';

const footerData = {
  en: {
    description: "We bridge the gap between complex technology and user-centric design to help businesses thrive in the digital era with high-quality solutions.",
    quickLinksTitle: "Quick Links",
    quickLinks: [
      { name: "About Us", href: "#about" },
      { name: "Our Team", href: "#team" },
      { name: "Services", href: "#services" },
      { name: "Projects", href: "#projects" },
      { name: "Blog", href: "#blog" },
    ],
    servicesTitle: "Services",
    services: [
      { name: "Web Development", href: "#services" },
      { name: "UI/UX Design", href: "#services" },
      { name: "Digital Marketing", href: "#services" },
      { name: "Cyber Security", href: "#services" },
      { name: "Strategy & Consulting", href: "#services" },
    ],
    contactTitle: "Get in Touch",
    contactDesc: "Have a project in mind? Let's build something awesome together.",
    contactBtn: "Contact Us",
    rights: "All rights reserved.",
    policies: [
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" },
      { name: "Cookie Policy", href: "#" },
    ],
  },
  bn: {
    description: "ডিজিটাল যুগে উচ্চমানের সলিউশনের মাধ্যমে ব্যবসা সফল করতে আমরা জটিল প্রযুক্তি এবং ইউজার-সেন্ট্রিক ডিজাইনের মধ্যে সেতুবন্ধন তৈরি করি।",
    quickLinksTitle: "দ্রুত লিংক",
    quickLinks: [
      { name: "আমাদের সম্পর্কে", href: "#about" },
      { name: "আমাদের টিম", href: "#team" },
      { name: "সেবাসমূহ", href: "#services" },
      { name: "প্রজেক্টসমূহ", href: "#projects" },
      { name: "ব্লগ", href: "#blog" },
    ],
    servicesTitle: "সেবাসমূহ",
    services: [
      { name: "ওয়েব ডেভেলপমেন্ট", href: "#services" },
      { name: "ইউআই/ইউএক্স ডিজাইন", href: "#services" },
      { name: "ডিজিটাল মার্কেটিং", href: "#services" },
      { name: "সাইবার সিকিউরিটি", href: "#services" },
      { name: "স্ট্র্যাটেজি ও কনসাল্টিং", href: "#services" },
    ],
    contactTitle: "যোগাযোগ করুন",
    contactDesc: "কোনো প্রজেক্ট নিয়ে ভাবছেন? চলুন একসাথে দারুণ কিছু তৈরি করি।",
    contactBtn: "যোগাযোগ করুন",
    rights: "সর্বস্বত্ব সংরক্ষিত।",
    policies: [
      { name: "গোপনীয়তা নীতি", href: "#" },
      { name: "সেবার শর্তাবলী", href: "#" },
      { name: "কুকি নীতি", href: "#" },
    ],
  },
};

export default function Footer({ lang = "en" }) {
  const t = footerData[lang] || footerData.en;

  return (
    <footer className="relative bg-[#09090b] text-white pt-16 sm:pt-24 pb-8 sm:pb-12 overflow-hidden border-t border-zinc-800/60">
      
      {/* Dynamic Background Glow & Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] sm:w-[800px] h-[200px] sm:h-[250px] bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[100px] sm:blur-[140px] pointer-events-none rounded-full"></div>
      
      {/* Subtle Grid Pattern Overlay for High-End Tech Vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-12 mb-12 sm:mb-16">
          
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-5 text-center sm:text-left">
            <Link href="/" className="inline-block text-xl sm:text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Zyntrix Lab
            </Link>
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm mx-auto sm:mx-0">
              {t.description}
            </p>
            {/* Social Links */}
            <div className="flex items-center justify-center sm:justify-start gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg shadow-black/50">
                <FaFacebookF size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all duration-300 shadow-lg shadow-black/50">
                <FaTwitter size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-700 hover:border-blue-600 transition-all duration-300 shadow-lg shadow-black/50">
                <FaLinkedinIn size={15} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-all duration-300 shadow-lg shadow-black/50">
                <FaInstagram size={15} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-lg shadow-black/50">
                <FaGithub size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-4 sm:mb-5 border-l-2 border-blue-500 pl-2.5 inline-block sm:block">{t.quickLinksTitle}</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-zinc-400">
              {t.quickLinks.map((link, index) => (
                <li key={index}><a href={link.href} className="hover:text-blue-400 transition-colors">{link.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-4 sm:mb-5 border-l-2 border-blue-500 pl-2.5 inline-block sm:block">{t.servicesTitle}</h4>
            <ul className="space-y-2.5 sm:space-y-3 text-sm text-zinc-400">
              {t.services.map((service, index) => (
                <li key={index}><a href={service.href} className="hover:text-blue-400 transition-colors">{service.name}</a></li>
              ))}
            </ul>
          </div>

          {/* Contact / Get in Touch */}
          <div className="text-center sm:text-left">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-4 sm:mb-5 border-l-2 border-blue-500 pl-2.5 inline-block sm:block">{t.contactTitle}</h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed max-w-xs mx-auto sm:mx-0">{t.contactDesc}</p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center w-full px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-blue-600/30 border border-blue-400/20 text-center"
            >
              {t.contactBtn}
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4 text-center sm:text-left">
          <p>© {new Date().getFullYear()} Zyntrix Lab. {t.rights}</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {t.policies.map((policy, index) => (
              <a key={index} href={policy.href} className="hover:text-zinc-300 transition-colors">{policy.name}</a>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}