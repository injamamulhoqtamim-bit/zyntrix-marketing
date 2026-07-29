"use client";

import { useState } from "react";

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "E-Voting App",
      category: "UI/UX Design",
      description: "Secure online voting system designed in Figma with modern UI/UX principles.",
      link: "https://www.figma.com/design/f5fPOItcW37J6lwI01t2XS/e-voting-bd?node-id=0-1&p=f",
      buttonText: "View Figma Design",
      image: "/E-voting app.jpg"
    },
    {
      title: "Fitness App",
      category: "UI/UX Design",
      description: " A clean, user-friendly fitness app designed to motivate users and support their goals through simple and visually engaging design.",
      link: "https://www.figma.com/design/LpKE6LblNOMTOlVv8NKOaQ/Assingment-class-01?node-id=0-1&p=f",
      buttonText: "View Figma Design",
      image: "/fitness app.jpg"
    },
    {
      title: "E-Learning App",
      category: "UI/UX Design",
      description: "An intuitive platform for learning, growing, and mastering new skills anytime, anywhere.",
      link: "https://www.figma.com/design/Yb4iewfZ5SaGfc9NFguoB0/larning-platfrom?node-id=1-6",
      buttonText: "View Figma Design",
      image: "/Unlock App.jpg"
    },
    {
      title: "Teachers Finding Platform",
      category: "Web Design",
      description: "A comprehensive digital platform built for modern business scaling.",
      link: "https://teachersfinding.vercel.app/",
      buttonText: "View Live Site",
      image: "/teachersfinding.jpg"
    },
    {
      title: "SunCart E-commerce Platform",
      category: "Web Design",
      description: "A comprehensive digital platform built for modern business scaling.",
      link: "https://sun-cart-e-commerce-website.vercel.app/",
      buttonText: "View Live Site",
      image: "/suncart.jpg"
    }
  ];

  // ফিল্টার অনুযায়ী প্রজেক্ট বাছাই করা
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-16 sm:py-24 bg-zinc-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6 sm:mb-8">Our Featured Work</h2>
          
          {/* ফিল্টার বাটনসমূহ - মোবাইলে র‍্যাপ ও সাইজ রেসপন্সিভ করা হয়েছে */}
          <div className="flex flex-wrap justify-center gap-2.5 sm:gap-4 mb-8 sm:mb-12 px-2">
            {["All", "UI/UX Design", "Web Design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm transition cursor-pointer ${
                  filter === cat 
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30" 
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* প্রজেক্ট কার্ড গ্রিড - মোবাইলে ১ কলাম, ট্যাবলেটে ২ কলাম এবং বড় স্ক্রিনে ৩ কলাম */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-blue-500 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="h-56 sm:h-64 w-full bg-zinc-800 overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  />
                </div>

                <div className="p-5 sm:p-6">
                  <span className="text-blue-500 text-xs font-bold uppercase tracking-wider">{project.category}</span>
                  <h3 className="text-lg sm:text-xl font-bold text-white mt-1.5 mb-2">{project.title}</h3>
                  <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">{project.description}</p>
                </div>
              </div>

              <div className="p-5 sm:p-6 pt-0">
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-zinc-800 hover:bg-blue-600 text-white font-bold py-3 rounded-xl transition text-sm sm:text-base shadow-md"
                >
                  {project.buttonText}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}