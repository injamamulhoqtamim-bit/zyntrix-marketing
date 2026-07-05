import React from 'react';

const projects = [
  { id: 1, title: "E-Voting App — UI/UX Design", desc: "Secure online voting system designed in Figma.", link: "https://www.figma.com/design/f5fPOItcW37J6lwI01t2XS/e-voting-bd?node-id=0-1&p=f" },
  { id: 2, title: "Portfolio — Injamamul Hoq", desc: "Personal portfolio website showcasing skills.", link: "https://injamamulhoq.vercel.app/" },
  { id: 3, title: "Portfolio — Sazid Hassan", desc: "Creative developer portfolio with UI/UX projects.", link: "https://rahathassan.github.io/My-Portfolio/" }
];

export default function Projects() {
  return (
    <section id="projects" className="py-20 bg-zinc-900/20 border-t border-zinc-900 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map(project => (
            <div key={project.id} className="bg-zinc-900 rounded-xl border border-zinc-800 p-6 flex flex-col justify-between hover:scale-[1.02] transition-transform">
              <div>
                <h3 className="text-lg font-bold mb-2 text-zinc-100">{project.title}</h3>
                <p className="text-zinc-400 text-sm mb-6">{project.desc}</p>
              </div>
              <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm font-semibold hover:text-blue-400">
                View Live / Design &rarr;
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
console.log("Projects Component:", Projects);