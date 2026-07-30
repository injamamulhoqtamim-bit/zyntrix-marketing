import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogData = {
  en: {
    badge: "Latest Insights",
    titlePart1: "Explore Our",
    titleHighlight: "Latest Blogs",
    description: "Stay updated with the latest industry trends, tech guides, and growth strategies curated by the Zyntrix Lab team.",
    readMore: "Read",
    viewAll: "View All Articles",
    posts: [
      {
        id: '1',
        title: 'How AI Automation is Transforming Modern Digital Marketing in 2026',
        excerpt: 'Discover how artificial intelligence is streamlining marketing workflows, boosting conversion rates, and optimizing campaign ROI.',
        category: 'AI & Automation',
        date: 'Jul 24, 2026',
        readTime: '5 min read',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        author: {
          name: 'Zyntrix Team',
          role: 'Growth Strategist',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        },
        slug: 'ai-automation-digital-marketing-2026',
      },
      {
        id: '2',
        title: 'Top 10 Web Development Trends You Cannot Ignore This Year',
        excerpt: 'From Server Components to Edge Functions, explore the web technologies driving modern high-performance web applications.',
        category: 'Web Development',
        date: 'Jul 18, 2026',
        readTime: '7 min read',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        author: {
          name: 'Tanvir Ahmed',
          role: 'Lead Developer',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        },
        slug: 'web-development-trends-2026',
      },
      {
        id: '3',
        title: 'Building a High-Converting Brand Identity for Tech Startups',
        excerpt: 'Learn the essential branding principles that establish trust, elevate user experience, and drive sustainable business growth.',
        category: 'Branding',
        date: 'Jul 10, 2026',
        readTime: '4 min read',
        image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&q=80&w=800',
        author: {
          name: 'Sarah Rahman',
          role: 'UI/UX Designer',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        },
        slug: 'building-brand-identity-startups',
      },
    ],
  },
  bn: {
    badge: "সর্বশেষ অন্তর্দৃষ্টি",
    titlePart1: "আমাদের সর্বশেষ",
    titleHighlight: "ব্লগগুলো দেখুন",
    description: "জাইন্ট্রিক্স ল্যাব টিম কর্তৃক সাজানো সাম্প্রতিক ইন্ডাস্ট্রি ট্রেন্ড, টেক গাইড এবং গ্রোথ স্ট্র্যাটেজির সাথে আপডেট থাকুন।",
    readMore: "পড়ুন",
    viewAll: "সব আর্টিকেল দেখুন",
    posts: [
      {
        id: '1',
        title: 'কীভাবে এআই অটোমেশন ২০২৬ সালে আধুনিক ডিজিটাল মার্কেটিং বদলে দিচ্ছে',
        excerpt: 'কৃত্রিম বুদ্ধিমত্তা কীভাবে মার্কেটিং ওয়ার্কফ্লো সহজ করছে, কনভার্শন রেট বাড়াচ্ছে এবং ক্যাম্পেইনের আরওআই অপ্টিমাইজ করছে তা আবিষ্কার করুন।',
        category: 'এআই ও অটোমেশন',
        date: 'জুলাই ২৪, ২০২৬',
        readTime: '৫ মিনিট পড়া',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        author: {
          name: 'জাইন্ট্রিক্স টিম',
          role: 'গ্রোথ স্ট্র্যাটেজিস্ট',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
        },
        slug: 'ai-automation-digital-marketing-2026',
      },
      {
        id: '2',
        title: 'চলতি বছরের সেরা ১০টি ওয়েব ডেভেলপমেন্ট ট্রেন্ড যা আপনার এড়িয়ে চলা উচিত নয়',
        excerpt: 'সার্ভার কম্পোনেন্টস থেকে এজ ফাংশনস—আধুনিক হাই-পারফরম্যান্স ওয়েব অ্যাপ্লিকেশন পরিচালনাকারী প্রযুক্তিগুলো সম্পর্কে জানুন।',
        category: 'ওয়েব ডেভেলপমেন্ট',
        date: 'জুলাই ১৮, ২০২৬',
        readTime: '৭ মিনিট পড়া',
        image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800',
        author: {
          name: 'তানভীর আহমেদ',
          role: 'লিড ডেভেলপার',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
        },
        slug: 'web-development-trends-2026',
      },
      {
        id: '3',
        title: 'টেক স্টার্টআপের জন্য একটি হাই-কনভার্টিং ব্র্যান্ড আইডেন্টিটি তৈরি করা',
        excerpt: 'অত্যাবশ্যকীয় ব্র্যান্ডিং নীতিগুলো শিখুন যা বিশ্বাস স্থাপন করে, ইউজার এক্সপেরিয়েন্স উন্নত করে এবং টেকসই ব্যবসায়িক বৃদ্ধিতে সাহায্য করে।',
        category: 'ব্র্যান্ডিং',
        date: 'জুলাই ১০, ২০২৬',
        readTime: '৪ মিনিট পড়া',
        image: 'https://images.unsplash.com/photo-1542744094-3a31b272c490?auto=format&fit=crop&q=80&w=800',
        author: {
          name: 'সারা রহমান',
          role: 'ইউআই/ইউএক্স ডিজাইনার',
          avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200',
        },
        slug: 'building-brand-identity-startups',
      },
    ],
  },
};

export default function Blog({ lang = "en" }) {
  const t = blogData[lang] || blogData.en;

  return (
    <section className="py-16 sm:py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[200px] sm:h-[300px] bg-blue-600/10 blur-[90px] sm:blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Centered Section Header */}
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

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {t.posts.map((post) => (
            <article
              key={post.id}
              className="flex flex-col bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 group"
            >
              <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-800">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized
                />
                <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-10">
                  <span className="px-2.5 sm:px-3 py-1 text-[10px] sm:text-xs font-semibold bg-slate-950/80 backdrop-blur-md text-blue-400 border border-slate-700/50 rounded-md">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="flex flex-col flex-1 p-5 sm:p-6">
                <div className="flex items-center text-[11px] sm:text-xs text-slate-400 gap-2.5 sm:gap-3 mb-2.5 sm:mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-400 transition-colors line-clamp-2 leading-snug">
                  <Link href={`/blog/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>

                <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-slate-400 line-clamp-3 leading-relaxed flex-1">
                  {post.excerpt}
                </p>

                <div className="my-4 sm:my-5 border-t border-slate-800/80" />

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-slate-700 flex-shrink-0">
                      <Image
                        src={post.author.avatar}
                        alt={post.author.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    </div>
                    <div>
                      <p className="text-[11px] sm:text-xs font-semibold text-slate-200 line-clamp-1">{post.author.name}</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 line-clamp-1">{post.author.role}</p>
                    </div>
                  </div>

                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center gap-1 group/btn flex-shrink-0"
                  >
                    {t.readMore}
                    <svg
                      className="w-3.5 h-3.5 transform group-hover/btn:translate-x-0.5 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* View All Articles Button */}
        <div className="mt-10 sm:mt-12 flex justify-center">
          <Link
            href="/blog"
            className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 sm:py-3 text-sm font-semibold text-white bg-slate-900 border border-slate-800 rounded-xl hover:bg-slate-800 hover:border-slate-700 transition-all duration-300 group shadow-lg text-center"
          >
            {t.viewAll}
            <svg
              className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}