import React, { useState } from 'react';

const modalData = {
  en: {
    title: "Request Service",
    selectedPlanLabel: "Selected Plan:",
    customText: "Custom",
    nameLabel: "Your Name",
    namePlaceholder: "Enter your name",
    emailLabel: "Email",
    emailPlaceholder: "Enter your email",
    whatsappLabel: "WhatsApp Number",
    whatsappPlaceholder: "e.g. +8801XXXXXXXXX",
    serviceLabel: "Select Service",
    services: [
      { value: "Web Development", label: "Web Development" },
      { value: "UI/UX", label: "UI/UX" },
      { value: "Digital Marketing", label: "Digital Marketing" },
      { value: "SEO Optimization", label: "SEO Optimization" },
    ],
    commentsLabel: "Comments (Optional)",
    commentsPlaceholder: "Write any additional details...",
    submitBtn: "Submit Request",
    successMsg: "Request submitted successfully!",
  },
  bn: {
    title: "সেবার জন্য অনুরোধ করুন",
    selectedPlanLabel: "নির্বাচিত প্ল্যান:",
    customText: "কাস্টম",
    nameLabel: "আপনার নাম",
    namePlaceholder: "আপনার নাম লিখুন",
    emailLabel: "ইমেইল",
    emailPlaceholder: "আপনার ইমেইল লিখুন",
    whatsappLabel: "হোয়াটসঅ্যাপ নম্বর",
    whatsappPlaceholder: "যেমন: +8801XXXXXXXXX",
    serviceLabel: "সেবা নির্বাচন করুন",
    services: [
      { value: "Web Development", label: "ওয়েব ডেভেলপমেন্ট" },
      { value: "UI/UX", label: "ইউআই/ইউএক্স" },
      { value: "Digital Marketing", label: "ডিজিটাল মার্কেটিং" },
      { value: "SEO Optimization", label: "এসইও অপ্টিমাইজেশন" },
    ],
    commentsLabel: "মতামত বা মন্তব্য (ঐচ্ছিক)",
    commentsPlaceholder: "অতিরিক্ত কোনো বিবরণ থাকলে লিখুন...",
    submitBtn: "অনুরোধ জমা দিন",
    successMsg: "অনুরোধ সফলভাবে জমা দেওয়া হয়েছে!",
  },
};

export default function ServiceRequestModal({ isOpen, onClose, selectedPlan, lang = "en" }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: 'Web Development',
    comments: '',
  });

  const t = modalData[lang] || modalData.en;

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { ...formData, selectedPlan });
    alert(t.successMsg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Modal Box */}
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl sm:rounded-3xl p-5 sm:p-8 text-white shadow-2xl my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold p-1 cursor-pointer"
          aria-label="Close modal"
        >
          ✕
        </button>

        <div className="mb-5 sm:mb-6 pr-6">
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">{t.title}</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            {t.selectedPlanLabel} <span className="text-blue-400 font-semibold">{selectedPlan || t.customText}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          {/* Your Name */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              {t.nameLabel}
            </label>
            <input
              type="text"
              required
              placeholder={t.namePlaceholder}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              {t.emailLabel}
            </label>
            <input
              type="email"
              required
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              {t.whatsappLabel}
            </label>
            <input
              type="text"
              required
              placeholder={t.whatsappPlaceholder}
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Select Service */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              {t.serviceLabel}
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition cursor-pointer"
            >
              {t.services.map((srv, idx) => (
                <option key={idx} value={srv.value}>{srv.label}</option>
              ))}
            </select>
          </div>

          {/* Comments Box */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              {t.commentsLabel}
            </label>
            <textarea
              rows="3"
              placeholder={t.commentsPlaceholder}
              value={formData.comments}
              onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 resize-none transition"
            />
          </div>

          {/* Submit Request Button */}
          <button
            type="submit"
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-lg cursor-pointer mt-2"
          >
            {t.submitBtn}
          </button>
        </form>
      </div>
    </div>
  );
}