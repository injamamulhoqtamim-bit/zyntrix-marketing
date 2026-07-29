import React from 'react';

export default function Support() {
  return (
    <section id="support" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden scroll-mt-20">
      {/* Background Glow Effect - ব্যাকগ্রাউন্ডে প্রিমিয়াম গ্লো ইফেক্ট */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-blue-600/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Support Card Container */}
        <div className="max-w-4xl mx-auto bg-slate-900/60 border border-slate-800/85 p-6 sm:p-12 rounded-2xl sm:rounded-3xl shadow-2xl relative overflow-hidden group hover:border-slate-700 transition-all duration-300">
          
          {/* Top Badge */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <span className="inline-block px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full">
              Always Online
            </span>
          </div>

          {/* Section Heading & Description */}
          <div className="text-center mb-8 sm:mb-10">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3 sm:mb-4">
              24/7 Client <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Support</span>
            </h2>
            <p className="text-slate-400 text-sm sm:text-lg max-w-xl mx-auto px-2 leading-relaxed">
              We are always here to help you maintain, secure, and grow your application without downtime.
            </p>
          </div>

          {/* Features Highlight (Optional secondary touch for premium look) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 sm:mb-10 max-w-2xl mx-auto text-center">
            <div className="bg-slate-950/50 border border-slate-800/60 p-3 sm:p-4 rounded-xl">
              <p className="text-blue-400 font-bold text-base sm:text-lg">Lightning Fast</p>
              <p className="text-slate-400 text-xs mt-1">Quick Response Rate</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-800/60 p-3 sm:p-4 rounded-xl">
              <p className="text-blue-400 font-bold text-base sm:text-lg">Dedicated Team</p>
              <p className="text-slate-400 text-xs mt-1">Expert Engineers</p>
            </div>
            <div className="bg-slate-950/50 border border-slate-800/60 p-3 sm:p-4 rounded-xl">
              <p className="text-blue-400 font-bold text-base sm:text-lg">Zero Downtime</p>
              <p className="text-slate-400 text-xs mt-1">Proactive Monitoring</p>
            </div>
          </div>

          {/* Premium "Contact with me" Button */}
          <div className="flex justify-center">
            <a
              href="https://wa.me/8801511994008" // আপনার হোয়াটসঅ্যাপ বা যোগাযোগের লিঙ্ক এখানে দিতে পারেন
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 px-8 py-4 rounded-xl font-semibold text-sm sm:text-base text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-blue-600/25 group/btn cursor-pointer text-center"
            >
              {/* WhatsApp / Chat Icon */}
              <svg className="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-1.297-.643-2.145-1.15-3.003-2.617-.225-.385.225-.357.644-1.192.074-.149.037-.272-.018-.371-.056-.099-.57-1.378-.782-1.887-.206-.498-.415-.431-.57-.439-.149-.008-.321-.008-.493-.008-.173 0-.453.064-.69.323-.237.259-1.913 1.869-1.913 4.564 0 2.695 1.961 5.295 2.235 5.669.274.374 3.856 5.882 9.336 8.243 3.28 1.416 3.953 1.135 4.665 1.065.713-.07 2.278-.931 2.599-1.832.321-.901.321-1.673.227-1.832-.095-.159-.347-.248-.644-.397z" />
              </svg>
              <span>Contact with Me</span>
              {/* Arrow Icon */}
              <svg 
                className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}