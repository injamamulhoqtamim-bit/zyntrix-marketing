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
      title: "Teachers Finding `Platform",
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

  // ফিল্টার অনুযায়ী প্রজেক্ট বাছাই করা
  const filteredProjects = filter === "All" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <section id="projects" className="py-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-white mb-8">Our Featured Work</h2>
          
          {/* ফিল্টার বাটনসমূহ */}
          <div className="flex justify-center gap-4 mb-12">
            {["All", "UI/UX Design", "Web Design"].map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full font-bold transition ${
                  filter === cat 
                    ? "bg-blue-600 text-white" 
                    : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={index} 
              className="bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden hover:border-blue-500 transition-all"
            >
              <div className="h-64 w-full bg-zinc-800">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
              </div>

              <div className="p-6">
                <span className="text-blue-500 text-xs font-bold uppercase">{project.category}</span>
                <h3 className="text-xl font-bold text-white mt-1 mb-2">{project.title}</h3>
                <p className="text-zinc-400 text-sm mb-6">{project.description}</p>
                
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block w-full text-center bg-zinc-800 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
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