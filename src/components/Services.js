"use client";

import { useState } from "react";
import { Check } from "lucide-react";

const servicesData = {
  en: {
    sectionTag: "Our Services",
    sectionTitle: "High-Quality Services For You",
    categories: [
      { key: "Website Services Suite", label: "Website Services Suite" },
      { key: "Digital Marketing Services", label: "Digital Marketing Services" },
      { key: "Social Media Management", label: "Social Media Management" },
      { key: "UI/UX", label: "UI/UX" },
      { key: "Cyber Security", label: "Cyber Security" },
      { key: "Birth Certificate", label: "Birth Certificate" },
      { key: "NID", label: "NID" },
      { key: "Passport", label: "Passport" },
    ],
    serviceData: {
      "Website Services Suite": ["Website Strategy", "Domain & Hosting", "Website Design", "Website Development", "Website Content", "Website SEO", "Website Optimization", "Landing Page Creation", "Responsive Website", "Chatbot for Website"],
      "Digital Marketing Services": ["Digital Branding", "Marketing Consultancy", "Research & Planning (R&D)", "Search Engine Optimization", "Search Engine Marketing (SEM)", "Email Marketing", "SMS marketing"],
      "Social Media Management": ["Business Profile Setup", "Social Media Optimization", "Social Media Management", "Social Media Marketing", "Paid Promotion / Advertisement", "Social Video Marketing", "Google My Business", "YouTube Marketing", "Facebook Marketing", "LinkedIn", "Instagram", "TikTok", "Messenger Marketing"],
      "UI/UX": ["Website UI Design", "Mobile App UI Design", "Landing Page Design", "Dashboard UI Design", "SaaS Product Design", "Wireframing", "Prototyping", "User Flow Design", "Information Architecture", "Design System Creation", "Responsive Web Design", "User Research", "Usability Testing", "Interaction Design", "Visual Design", "Accessibility (WCAG)", "UX Audit", "Design Thinking", "UX Strategy", "Tools: Figma, Adobe XD, Sketch, Adobe Photoshop, Adobe Illustrator, Framer, Miro, FigJam, Canva"],
      "Cyber Security": ["Penetration Testing", "Ethical Hacking", "Vulnerability Assessment", "Web Application Security Testing", "Network Security Fundamentals", "Information Security Fundamentals", "Linux for Security", "OSINT (Open Source Intelligence)", "Password Security & Authentication", "Security Best Practices", "Basic Digital Forensics", "Risk Assessment", "Security Awareness", "Web Security Testing", "SQL Injection (SQLi)", "Cross-Site Scripting (XSS)", "Cross-Site Request Forgery (CSRF)", "Broken Authentication", "IDOR", "File Upload Vulnerabilities", "Directory Traversal", "Command Injection", "Clickjacking", "Session Management Testing", "OWASP Top 10"],
      "Birth Certificate": ["New Birth Certificate Application", "Birth Certificate Correction", "Birth Certificate Info Update", "Bengali & English Birth Certificate Support", "Online Birth Certificate Application", "Birth Certificate Verification Support", "Birth Certificate Status Check", "Birth Certificate Download/Print Support"],
      "NID": ["New NID Registration Support", "NID Info Correction", "Address Change Support", "Mobile Number Update Support", "Lost NID Retrieval Support", "NID Download Support", "Smart NID Status Check", "Voter Info Update Support"],
      "Passport": ["New e-Passport Application Support", "Passport Renewal Support", "Passport Info Correction", "Lost/Damaged Passport Re-issue Support", "MRP to e-Passport Support", "Passport Application Form Filling", "Appointment Booking Support", "Passport Fee Payment Guidance", "Passport Status Check", "Required Document Preparation Support"]
    }
  },
  bn: {
    sectionTag: "আমাদের সেবাসমূহ",
    sectionTitle: "আপনার জন্য উচ্চমানের সেবাসমূহ",
    categories: [
      { key: "Website Services Suite", label: "ওয়েবসাইট সার্ভিস স্যুট" },
      { key: "Digital Marketing Services", label: "ডিজিটাল মার্কেটিং সেবা" },
      { key: "Social Media Management", label: "সোশ্যাল মিডিয়া ম্যানেজমেন্ট" },
      { key: "UI/UX", label: "ইউআই/ইউএক্স" },
      { key: "Cyber Security", label: "সাইবার সিকিউরিটি" },
      { key: "Birth Certificate", label: "জন্ম নিবন্ধন" },
      { key: "NID", label: "এনআইডি (NID)" },
      { key: "Passport", label: "পাসপোর্ট" },
    ],
    serviceData: {
      "Website Services Suite": ["ওয়েবসাইট স্ট্র্যাটেজি", "ডোমেইন ও হোস্টিং", "ওয়েবসাইট ডিজাইন", "ওয়েবসাইট ডেভেলপমেন্ট", "ওয়েবসাইট কন্টেন্ট", "ওয়েবসাইট এসইও", "ওয়েবসাইট অপ্টিমাইজেশন", "ল্যান্ডিং পেজ তৈরি", "রেসপন্সিভ ওয়েবসাইট", "ওয়েবসাইটের জন্য চ্যাটবট"],
      "Digital Marketing Services": ["ডিজিটাল ব্র্যান্ডিং", "মার্কেটিং কনসালটেন্সি", "রিসার্চ ও প্ল্যানিং (R&D)", "সার্চ ইঞ্জিন অপ্টিমাইজেশন", "সার্চ ইঞ্জিন মার্কেটিং (SEM)", "ইমেল মার্কেটিং", "এসএমএস মার্কেটিং"],
      "Social Media Management": ["বিজনেস প্রোফাইল সেটআপ", "সোশ্যাল মিডিয়া অপ্টিমাইজেশন", "সোশ্যাল মিডিয়া ম্যানেজমেন্ট", "সোশ্যাল মিডিয়া মার্কেটিং", "পেইড প্রমোশন / বিজ্ঞাপন", "সোশ্যাল ভিডিও মার্কেটিং", "গুগল মাই বিজনেস", "ইউটিউব মার্কেটিং", "ফেসবুক মার্কেটিং", "লিংকডইন", "ইনস্টাগ্রাম", "টিকটক", "মেসেঞ্জার মার্কেটিং"],
      "UI/UX": ["ওয়েবসাইট ইউআই ডিজাইন", "মোবাইল অ্যাপ ইউআই ডিজাইন", "ল্যান্ডিং পেজ ডিজাইন", "ড্যাশবোর্ড ইউআই ডিজাইন", "সাস (SaaS) প্রোডাক্ট ডিজাইন", "ওয়্যারফ্রেমিং", "প্রোটোটাইপিং", "ইউজার ফ্লো ডিজাইন", "ইনফরমেশন আর্কিটেকচার", "ডিজাইন সিস্টেম তৈরি", "রেসপন্সিভ ওয়েব ডিজাইন", "ইউজার রিসার্চ", "ইউজাবিলিটি টেষ্টিং", "ইন্টারেকশন ডিজাইন", "ভিজ্যুয়াল ডিজাইন", "অ্যাক্সেসিবিলিটি (WCAG)", "ইউএক্স অডিট", "ডিজাইন থিংকিং", "ইউএক্স স্ট্র্যাটেজি", "টুলস: ফিগা, অ্যাডোবি এক্সডি, স্কেচ, অ্যাডোবি ফটোশপ, অ্যাডোবি ইলাস্ট্রেটর, ফ্রেমার, মিরো, ফিগজাম, ক্যানভা"],
      "CyberSecurity": ["পেনিট্রেশন টেস্টিং", "এথিক্যাল হ্যাকিং", "ভালনারেবিলিটি অ্যাসেসমেন্ট", "ওয়েব অ্যাপ্লিকেশন সিকিউরিটি টেস্টিং", "নেটওয়ার্ক সিকিউরিটি ফান্ডামেন্টালস", "ইনফরমেশন সিকিউরিটি ফান্ডামেন্টালস", "সিকিউরিটির জন্য লিনাক্স", "ওসইনট (OSINT)", "পাসওয়ার্ড সিকিউরিটি ও অথেন্টিকেশন", "সিকিউরিটি বেস্ট প্র্যাকটিসেস", "বেসিক ডিজিটাল ফরেনসিক্স", "রিস্ক অ্যাসেসমেন্ট", "সিকিউরিটি অ্যাওয়ারনেস", "ওয়েব সিকিউরিটি টেস্টিং", "এসকিউএল ইনজেকশন (SQLi)", "ক্রস-সাইট স্ক্রিপ্টিং (XSS)", "ক্রস-সাইট রিকোয়েস্ট ফোর্জারি (CSRF)", "ব্রোকেন অথেন্টিকেশন", "আইডিওআর (IDOR)", "ফাইল আপলোড ভালনারেবিলিটিস", "ডিরেক্টরি ট্রাভার্সাল", "কমান্ড ইনজেকশন", "ক্লিকজ্যাকিং", "সেশন ম্যানেজমেন্ট টেস্টিং", "ওওয়াসপ টপ ১০ (OWASP Top 10)"],
      "Birth Certificate": ["নতুন জন্ম নিবন্ধনের আবেদন", "জন্ম নিবন্ধন সংশোধন", "জন্ম নিবন্ধনের তথ্য হালনাগাদ", "বাংলা ও ইংরেজি জন্ম নিবন্ধন সহায়তা", "অনলাইন জন্ম নিবন্ধন আবেদন", "জন্ম নিবন্ধন যাচাই (Verification) সহায়তা", "জন্ম নিবন্ধনের স্ট্যাটাস চেক", "জন্ম নিবন্ধন ডাউনলোড/প্রিন্ট সহায়তা"],
      "NID": ["নতুন NID নিবন্ধন সহায়তা", "NID তথ্য সংশোধন", "ঠিকানা পরিবর্তন সহায়তা", "মোবাইল নম্বর আপডেট সহায়তা", "হারানো NID পুনরায় পাওয়ার সহায়তা", "NID ডাউনলোড সহায়তা", "স্মার্ট NID স্ট্যাটাস চেক", "ভোটার তথ্য হালনাগাদ সহায়তা"],
      "Passport": ["নতুন e-Passport আবেদন সহায়তা", "পাসপোর্ট নবায়ন (Renewal) সহায়তা", "পাসপোর্ট তথ্য সংশোধন", "হারানো/ক্ষতিগ্রস্ত পাসপোর্ট পুনঃইস্যু সহায়তা", "MRP থেকে e-Passport সহায়তা", "পাসপোর্ট আবেদন ফর্ম পূরণ", "অ্যাপয়েন্টমেন্ট বুকিং সহায়তা", "পাসপোর্ট ফি পরিশোধের নির্দেশনা", "পাসপোর্ট স্ট্যাটাস চেক", "প্রয়োজনীয় ডকুমেন্ট প্রস্তুত করতে সহায়তা"]
    }
  }
};

export default function Services({ lang = "en" }) {
  const [activeCategory, setActiveCategory] = useState("Website Services Suite");
  const t = servicesData[lang] || servicesData.en;

  // কারেন্ট ক্যাটাগরির ডাটা বের করার জন্য (যদি ভাষা পরিবর্তনের কারণে কি না মিলে, সেটির ফলব্যাক সহ)
  const currentCategoryData = t.serviceData[activeCategory] || t.serviceData["Website Services Suite"];

  return (
    <section id="services" className="py-16 sm:py-24 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
        <h2 className="text-blue-500 font-semibold uppercase tracking-widest mb-3 sm:mb-4 text-sm sm:text-base">{t.sectionTag}</h2>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-8 sm:mb-12">{t.sectionTitle}</h1>

        {/* বাটন মেনু */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-16">
          {t.categories.map((cat) => (
            <button 
              key={cat.key} 
              onClick={() => setActiveCategory(cat.key)}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl font-medium text-xs sm:text-sm transition-all duration-300 border cursor-pointer ${
                activeCategory === cat.key 
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "bg-zinc-800 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Sub-services List */}
        <div className="max-w-4xl mx-auto bg-zinc-950 p-5 sm:p-10 rounded-2xl sm:rounded-3xl border border-zinc-800 text-left shadow-2xl">
          <h3 className="text-xl sm:text-2xl font-bold text-blue-500 mb-5 sm:mb-6 border-b border-zinc-800 pb-3 sm:pb-4">
            {t.categories.find(c => c.key === activeCategory)?.label || activeCategory}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {currentCategoryData.map((item, idx) => (
              <li key={idx} className="flex items-start sm:items-center gap-3 text-gray-300 hover:text-blue-400 transition text-sm sm:text-base">
                <div className="min-w-[20px] mt-0.5 sm:mt-0">
                   <Check size={18} className="text-blue-500" />
                </div>
                <span className="leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}