import React from 'react';

const pricingPlans = [
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
];

export default function Pricing({ onOpenForm }) {
  return (
    <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-blue-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="inline-block px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
            Simple, Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Plans That Scale <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">With Your Business</span>
          </h2>
          <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl">
            No hidden fees, no surprise charges. Choose the right plan to accelerate your digital growth today.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative flex flex-col p-8 rounded-2xl transition-all duration-300 ${
                plan.popular
                  ? 'bg-gradient-to-b from-blue-600/40 via-indigo-900/40 to-slate-900/80 border-2 border-blue-500 shadow-2xl shadow-blue-500/20 lg:-translate-y-2'
                  : 'bg-slate-900/60 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="px-4 py-1 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-400 rounded-full shadow-md">
                    Most Popular
                  </span>
                </div>
              )}

              {/* Plan Name & Description */}
              <div className="mb-6 text-center">
                <h3 className="text-2xl font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-sm text-slate-400">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="flex items-baseline justify-center mb-6">
                <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">{plan.price}</span>
                <span className="ml-1 text-sm text-slate-400 font-medium">{plan.period}</span>
              </div>

              {/* Divider */}
              <div className="border-t border-slate-800/80 mb-6" />

              {/* Features List */}
              <ul className="space-y-3.5 mb-8 flex-1">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-300">
                    <svg
                      className={`w-5 h-5 mr-3 flex-shrink-0 ${plan.popular ? 'text-blue-300' : 'text-blue-400'}`}
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
                className={`w-full py-3.5 px-6 rounded-xl font-semibold text-sm text-center transition-all duration-300 flex items-center justify-center shadow-md cursor-pointer ${
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