import React from 'react';

export default function About({ lang = "en", onShowTeam }) {
  // ভাষা অনুযায়ী টেক্সট কনটেন্ট
  const content = {
    en: {
      badge: "About Us",
      titlePart1: "We Are Dedicated To",
      titleHighlight: "Your Success.",
      description: "Zyntrix Lab is a team of passionate developers, designers, and marketers focused on creating high-quality digital solutions. We bridge the gap between complex technology and user-centric design to help businesses thrive in the digital era.",
      card1Title: "Innovation",
      card1Sub: "Modern approach",
      card2Title: "Excellence",
      card2Sub: "Quality first",
      btnText: "Click here to know more about our team",
    },
    bn: {
      badge: "আমাদের সম্পর্কে",
      titlePart1: "আমরা নিবেদিত",
      titleHighlight: "আপনার সাফল্যে।",
      description: "জাইন্ট্রিক্স ল্যাব হলো আবেগপ্রবণ ডেভেলপার, ডিজাইনার এবং মার্কেটারদের একটি দল, যারা উচ্চমানের ডিজিটাল সলিউশন তৈরি করতে প্রতিশ্রুতিবদ্ধ। আধুনিক ব্যবসার প্রসারে আমরা জটিল প্রযুক্তি এবং ব্যবহারকারী-কেন্দ্রিক ডিজাইনের মধ্যকার দূরত্ব কমিয়ে আনি।",
      card1Title: "উদ্ভাবন",
      card1Sub: "আধুনিক দৃষ্টিভঙ্গি",
      card2Title: "উৎকর্ষতা",
      card2Sub: "গুণগত মান সবার আগে",
      btnText: "আমাদের টিম সম্পর্কে আরও জানতে এখানে ক্লিক করুন",
    },
  };

  const t = content[lang] || content.en;

  return (
    <section id="about" className="py-16 sm:py-24 bg-zinc-950 text-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
        
        {/* Left Side: Image with glowing background shape */}
        <div className="relative px-4 sm:px-0">
          <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-20 filter blur-sm"></div>
          <img 
            src="/about.jpg" 
            alt="About Zyntrix Lab" 
            className="relative rounded-3xl shadow-2xl w-full h-[350px] sm:h-[450px] md:h-[500px] object-cover border border-zinc-800/80"
          />
        </div>

        {/* Right Side: Text Content */}
        <div>
          <div className="inline-block mb-4">
            <span className="text-xl sm:text-2xl md:text-3xl font-extrabold uppercase tracking-wider text-blue-500 bg-blue-500/10 border border-blue-500/30 px-4 py-1.5 rounded-xl">
              {t.badge}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8 leading-[1.2]">
            {t.titlePart1} <br />
            <span className="text-white">{t.titleHighlight}</span>
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg leading-relaxed sm:leading-8 mb-6 sm:mb-8">
            {t.description}
          </p>

          <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-8">
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm">
              <h3 className="font-bold text-base sm:text-lg text-white">{t.card1Title}</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{t.card1Sub}</p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50 backdrop-blur-sm">
              <h3 className="font-bold text-base sm:text-lg text-white">{t.card2Title}</h3>
              <p className="text-xs sm:text-sm text-zinc-500 mt-0.5">{t.card2Sub}</p>
            </div>
          </div>

          {/* See Team Information Button */}
          <div>
            <button 
              onClick={onShowTeam}
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 font-bold text-white transition-all duration-300 bg-blue-600 rounded-xl hover:bg-blue-500 shadow-lg shadow-blue-600/30 cursor-pointer text-sm sm:text-base text-center"
            >
              {t.btnText}
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}