import React from 'react';

const pricingData = {
  en: {
    badge: "Simple, Transparent Pricing",
    titlePart1: "Plans That Scale",
    titleHighlight: "With Your Business",
    description: "No hidden fees, no surprise charges. Choose the right plan to accelerate your digital growth today.",
    plans: [
      {
        id: 'starter',
        name: 'Starter',
        price: '৳15,000',
        period: '/One-time',
        description: 'Perfect for small businesses',
        features: [
          '5-10 Product Upload',
          'Responsive E-commerce Website',
          'Basic UI/UX Design',
          'Add to Cart System',
          'Cash on Delivery Setup',
          'Basic SEO Setup',
        ],
        popular: false,
        ctaText: 'Get Started',
      },
      {
        id: 'pro',
        name: 'Pro',
        price: '৳25,000',
        period: '/One-time',
        description: 'Best for growing stores',
        features: [
          '20-30 Product Upload',
          'Advanced UI/UX Design',
          'Payment Gateway Integration (bKash/Nagad)',
          'Order Management System',
          'Discount & Coupon System',
          'SEO Optimization',
          'Speed Optimization',
        ],
        popular: true,
        ctaText: 'Start Now',
      },
      {
        id: 'enterprise',
        name: 'Enterprise',
        price: '৳30,000+',
        period: '/Custom',
        description: 'For large businesses',
        features: [
          'Unlimited Products',
          'Custom UI/UX Design',
          'Full Payment Integration',
          'Inventory Management System',
          'Admin Dashboard',
          'Multi-Vendor (Optional)',
          'Advanced Analytics',
          'Priority Support',
        ],
        popular: false,
        ctaText: 'Contact Us',
      },
    ],
    popularBadge: "Most Popular",
  },
  bn: {
    badge: "সহজ এবং স্বচ্ছ মূল্য নির্ধারণ",
    titlePart1: "যে প্ল্যানগুলো আপনার",
    titleHighlight: "ব্যবসার সাথে মানানসই",
    description: "কোনো লুকানো ফি বা অতিরিক্ত চার্জ নেই। আজই আপনার ডিজিটাল ব্যবসাকে এগিয়ে নিতে সঠিক প্ল্যানটি বেছে নিন।",
    plans: [
      {
        id: 'starter',
        name: 'স্টারটার',
        price: '৳১৫,০০০',
        period: '/এককালীন',
        description: 'ছোট ব্যবসার জন্য উপযুক্ত',
        features: [
          '৫-১০টি প্রোডাক্ট আপলোড',
          'রেসপন্সিভ ই-কমার্স ওয়েবসাইট',
          'বেসিক ইউআই/ইউএক্স ডিজাইন',
          'অ্যাড টু কার্ট সিস্টেম',
          'ক্যাশ অন ডেলিভারি সেটআপ',
          'বেসিক এসইও সেটআপ',
        ],
        popular: false,
        ctaText: 'শুরু করুন',
      },
      {
        id: 'pro',
        name: 'প্রো',
        price: '৳২৫,০০০',
        period: '/এককালীন',
        description: 'বর্ধনশীল স্টোরগুলোর জন্য সেরা',
        features: [
          '২০-৩০টি প্রোডাক্ট আপলোড',
          'অ্যাডভান্সড ইউআই/ইউএক্স ডিজাইন',
          'পেমেন্ট গেটওয়ে ইন্টিগ্রেশন (বিকাশ/নগদ)',
          'অর্ডার ম্যানেজমেন্ট সিস্টেম',
          'ডিসকাউন্ট ও কুপন সিস্টেম',
          'এসইও অপ্টিমাইজেশন',
          'স্পিড অপ্টিমাইজেশন',
        ],
        popular: true,
        ctaText: 'এখনই শুরু করুন',
      },
      {
        id: 'enterprise',
        name: 'এন্টারপ্রাইজ',
        price: '৳৩০,০০০+',
        period: '/কাস্টম',
        description: 'বড় ব্যবসার জন্য',
        features: [
          'আনলিমিটেড প্রোডাক্ট',
          'কাস্টম ইউআই/ইউএক্স ডিজাইন',
          'সম্পূর্ণ পেমেন্ট ইন্টিগ্রেশন',
          'ইনভেন্টরি ম্যানেজমেন্ট সিস্টেম',
          'অ্যাডমিন ড্যাশবোর্ড',
          'মাল্টি-ভেন্ডর (ঐচ্ছিক)',
          'অ্যাডভান্সড অ্যানালিটিক্স',
          'প্রায়োরিটি সাপোর্ট',
        ],
        popular: false,
        ctaText: 'যোগাযোগ করুন',
      },
    ],
    popularBadge: "সবচেয়ে জনপ্রিয়",
  },
};

export default function Pricing({ onOpenForm, lang = "en" }) {
  const t = pricingData[lang] || pricingData.en;

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[200px] sm:h-[300px] bg-blue-600/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
            {t.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            {t.titlePart1} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">{t.titleHighlight}</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm sm:text-lg max-w-2xl px-2">
            {t.description}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {t.plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-6 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-600/40 via-indigo-900/40 to-slate-900/80 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-3.5 sm:px-4 py-1 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-full shadow-md whitespace-nowrap">
                    {t.popularBadge}
                  </span>
                </div>
              )}

              {/* Plan Name & Description */}
              <div className="mb-5 sm:mb-6 text-center">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs sm:text-sm text-slate-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center mb-5 sm:mb-6">
                <span className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                <span className="ml-1 text-xs sm:text-sm text-slate-400 font-medium">{plan.period}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-800/80 mb-5 sm:mb-6" />

              {/* Features List */}
              <ul className="space-y-3 sm:space-y-3.5 mb-6 sm:mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-xs sm:text-sm text-slate-300">
                    <svg
                      className={`w-4 h-4 sm:w-5 sm:h-5 mr-2.5 sm:mr-3 flex-shrink-0 ${plan.popular ? 'text-blue-300' : 'text-blue-400'}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button with Click Handler */}
              <button
                onClick={() => onOpenForm(plan.name)}
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-center transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer ${
                  plan.popular
                    ? 'bg-white text-slate-950 hover:bg-slate-100'
                    : 'bg-blue-600 text-white hover:bg-blue-500'
                }`}
              >
                {plan.ctaText}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}