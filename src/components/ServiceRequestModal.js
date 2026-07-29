import React, { useState } from 'react';

export default function ServiceRequestModal({ isOpen, onClose, selectedPlan }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
    service: 'Web Development',
    comments: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form Submitted:', { ...formData, selectedPlan });
    alert('Request submitted successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto">
      {/* Modal Box - মোবাইলে ফুল উইথ ও হাইট ম্যানেজ করার জন্য রেসপন্সিভ ক্লাস দেওয়া হয়েছে */}
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
          <h3 className="text-xl sm:text-2xl font-bold tracking-tight">Request Service</h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Selected Plan: <span className="text-blue-400 font-semibold">{selectedPlan || 'Custom'}</span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
          {/* Your Name */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Your Name
            </label>
            <input
              type="text"
              required
              placeholder="Enter your name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Email
            </label>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* WhatsApp Number */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              WhatsApp Number
            </label>
            <input
              type="text"
              required
              placeholder="e.g. +8801XXXXXXXXX"
              value={formData.whatsapp}
              onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition"
            />
          </div>

          {/* Select Service */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Select Service
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 sm:py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition cursor-pointer"
            >
              <option value="Web Development">Web Development</option>
              <option value="UI/UX">UI/UX</option>
              <option value="Digital Marketing">Digital Marketing</option>
              <option value="SEO Optimization">SEO Optimization</option>
            </select>
          </div>

          {/* Comments Box */}
          <div>
            <label className="block text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Comments (Optional)
            </label>
            <textarea
              rows="3"
              placeholder="Write any additional details..."
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
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}