"use client";

import { useState } from "react";
import { Check } from "lucide-react";

export default function Services() {
  const [activeCategory, setActiveCategory] = useState("Website Services Suite");

  const serviceData = {
    "Website Services Suite": ["Website Strategy", "Domain & Hosting", "Website Design", "Website Development", "Website Content", "Website SEO", "Website Optimization", "Landing Page Creation", "Responsive Website", "Chatbot for Website"],
    "Digital Marketing Services": ["Digital Branding", "Marketing Consultancy", "Research & Planning (R&D)", "Search Engine Optimization", "Search Engine Marketing (SEM)", "Email Marketing", "SMS marketing"],
    "Social Media Management": ["Business Profile Setup", "Social Media Optimization", "Social Media Management", "Social Media Marketing", "Paid Promotion / Advertisement", "Social Video Marketing", "Google My Business", "YouTube Marketing", "Facebook Marketing", "LinkedIn", "Instagram", "TikTok", "Messenger Marketing"],
    "UI/UX": ["Website UI Design", "Mobile App UI Design", "Landing Page Design", "Dashboard UI Design", "SaaS Product Design", "Wireframing", "Prototyping", "User Flow Design", "Information Architecture", "Design System Creation", "Responsive Web Design", "User Research", "Usability Testing", "Interaction Design", "Visual Design", "Accessibility (WCAG)", "UX Audit", "Design Thinking", "UX Strategy", "Tools: Figma, Adobe XD, Sketch, Adobe Photoshop, Adobe Illustrator, Framer, Miro, FigJam, Canva"],
    "Cyber Security": ["Penetration Testing", "Ethical Hacking", "Vulnerability Assessment", "Web Application Security Testing", "Network Security Fundamentals", "Information Security Fundamentals", "Linux for Security", "OSINT (Open Source Intelligence)", "Password Security & Authentication", "Security Best Practices", "Basic Digital Forensics", "Risk Assessment", "Security Awareness", "Web Security Testing", "SQL Injection (SQLi)", "Cross-Site Scripting (XSS)", "Cross-Site Request Forgery (CSRF)", "Broken Authentication", "IDOR", "File Upload Vulnerabilities", "Directory Traversal", "Command Injection", "Clickjacking", "Session Management Testing", "OWASP Top 10"],
    "Birth Certificate": ["নতুন জন্ম নিবন্ধনের আবেদন", "জন্ম নিবন্ধন সংশোধন", "জন্ম নিবন্ধনের তথ্য হালনাগাদ", "বাংলা ও ইংরেজি জন্ম নিবন্ধন সহায়তা", "অনলাইন জন্ম নিবন্ধন আবেদন", "জন্ম নিবন্ধন যাচাই (Verification) সহায়তা", "জন্ম নিবন্ধনের স্ট্যাটাস চেক", "জন্ম নিবন্ধন ডাউনলোড/প্রিন্ট সহায়তা"],
    "NID": ["নতুন NID নিবন্ধন সহায়তা", "NID তথ্য সংশোধন", "ঠিকানা পরিবর্তন সহায়তা", "মোবাইল নম্বর আপডেট সহায়তা", "হারানো NID পুনরায় পাওয়ার সহায়তা", "NID ডাউনলোড সহায়তা", "স্মার্ট NID স্ট্যাটাস চেক", "ভোটার তথ্য হালনাগাদ সহায়তা"],
    "Passport": ["নতুন e-Passport আবেদন সহায়তা", "পাসপোর্ট নবায়ন (Renewal) সহায়তা", "পাসপোর্ট তথ্য সংশোধন", "হারানো/ক্ষতিগ্রস্ত পাসপোর্ট পুনঃইস্যু সহায়তা", "MRP থেকে e-Passport সহায়তা", "পাসপোর্ট আবেদন ফর্ম পূরণ", "অ্যাপয়েন্টমেন্ট বুকিং সহায়তা", "পাসপোর্ট ফি পরিশোধের নির্দেশনা", "পাসপোর্ট স্ট্যাটাস চেক", "প্রয়োজনীয় ডকুমেন্ট প্রস্তুত করতে সহায়তা"]
  };

  return (
    <section id="services" className="py-24 bg-zinc-900 text-white">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-blue-500 font-semibold uppercase tracking-widest mb-4">Our Services</h2>
        <h1 className="text-4xl md:text-5xl font-black mb-12">High-Quality Services For You</h1>

        {/* নতুন স্টাইলিশ বাটন মেনু */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {Object.keys(serviceData).map((cat) => (
            <button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 border ${
                activeCategory === cat 
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-900/20" 
                  : "bg-zinc-800 border-zinc-700 text-gray-300 hover:bg-zinc-700 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub-services List */}
        <div className="max-w-4xl mx-auto bg-zinc-950 p-10 rounded-3xl border border-zinc-800 text-left">
          <h3 className="text-2xl font-bold text-blue-500 mb-6 border-b border-zinc-800 pb-4">{activeCategory}</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {serviceData[activeCategory].map((item, idx) => (
              <li key={idx} className="flex items-center gap-3 text-gray-300 hover:text-blue-400 transition">
                <div className="min-w-[20px]">
                   <Check size={18} className="text-blue-500" />
                </div>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}