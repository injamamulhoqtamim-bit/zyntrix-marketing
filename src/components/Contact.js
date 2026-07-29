import React from 'react';
import Image from 'next/image';

const teamMembers = [
  {
    name: 'Tanvir Ahmed',
    role: 'Lead Developer & Founder',
    image: '/member1.png',
    whatsapp: 'https://wa.me/8801511994008',
  },
  {
    name: 'Sarah Rahman',
    role: 'UI/UX Designer & Strategist',
    image: '/member2.jpg',
    whatsapp: 'https://wa.me/8801912585387',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow Effect - মোবাইলে ওভারফ্লো রোধ করতে সাইজ অ্যাডজাস্ট করা হয়েছে */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-blue-600/10 blur-[100px] sm:blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 sm:mb-16">
          <span className="inline-block px-3.5 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/20 rounded-full mb-3">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Connect With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">Us</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-slate-400 text-sm sm:text-lg max-w-2xl px-2">
            Have a project in mind? Connect with our experts via WhatsApp or visit our official Facebook page.
          </p>
        </div>

        {/* Cards Grid - মোবাইলে ১ কলাম, ট্যাবলেটে ২ কলাম এবং বড় স্ক্রিনে ৩ কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          
          {/* Team Member Cards */}
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-slate-900/60 border border-slate-800/85 p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center hover:border-slate-700 transition-all duration-300 shadow-xl group"
            >
              {/* Member Image */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 sm:mb-6 border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors bg-slate-800 flex-shrink-0">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Name & Role */}
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">{member.name}</h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6">{member.role}</p>

              {/* WhatsApp Button */}
              <a
                href={member.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-white bg-emerald-600 hover:bg-emerald-500 transition-all duration-300 shadow-lg shadow-emerald-600/20 flex items-center justify-center space-x-2 mt-auto cursor-pointer"
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-1.297-.643-2.145-1.15-3.003-2.617-.225-.385.225-.357.644-1.192.074-.149.037-.272-.018-.371-.056-.099-.57-1.378-.782-1.887-.206-.498-.415-.431-.57-.439-.149-.008-.321-.008-.493-.008-.173 0-.453.064-.69.323-.237.259-1.913 1.869-1.913 4.564 0 2.695 1.961 5.295 2.235 5.669.274.374 3.856 5.882 9.336 8.243 3.28 1.416 3.953 1.135 4.665 1.065.713-.07 2.278-.931 2.599-1.832.321-.901.321-1.673.227-1.832-.095-.159-.347-.248-.644-.397z" />
                </svg>
                <span>Contact with Me</span>
              </a>
            </div>
          ))}

          {/* Facebook Page Card */}
          <div className="bg-slate-900/60 border border-slate-800/85 p-6 sm:p-8 rounded-2xl sm:rounded-3xl flex flex-col items-center text-center hover:border-slate-700 transition-all duration-300 shadow-xl group md:col-span-2 lg:col-span-1">
            {/* Facebook Logo Icon */}
            <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden mb-5 sm:mb-6 border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors bg-blue-600/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-14 h-14 sm:w-16 sm:h-16 text-blue-500 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </div>

            {/* Title & Subtitle */}
            <h3 className="text-xl sm:text-2xl font-bold text-white mb-1">Facebook Page</h3>
            <p className="text-xs sm:text-sm text-slate-400 mb-6">Stay updated with our latest works</p>

            {/* Visit Page Button */}
            <a
              href="https://www.facebook.com/profile.php?id=61588044801657"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-6 rounded-xl font-semibold text-xs sm:text-sm text-white bg-blue-600 hover:bg-blue-500 transition-all duration-300 shadow-lg shadow-blue-600/20 flex items-center justify-center space-x-2 mt-auto cursor-pointer"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 fill-current flex-shrink-0" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Visit Page</span>
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}