import React from 'react';
import Link from 'next/link';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="relative bg-[#09090b] text-white pt-24 pb-12 overflow-hidden border-t border-zinc-800/60">
      
      {/* Dynamic Background Glow & Ambient Lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[250px] bg-gradient-to-r from-blue-600/20 via-indigo-600/15 to-purple-600/20 blur-[140px] pointer-events-none rounded-full"></div>
      
      {/* Subtle Grid Pattern Overlay for High-End Tech Vibe */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a15_1px,transparent_1px),linear-gradient(to_bottom,#27272a15_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Top Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Brand Info (Takes 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="text-2xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
              Zyntrix Lab
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              We bridge the gap between complex technology and user-centric design to help businesses thrive in the digital era with high-quality solutions.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 shadow-lg shadow-black/50">
                <FaFacebookF size={15} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-sky-500 hover:border-sky-400 transition-all duration-300 shadow-lg shadow-black/50">
                <FaTwitter size={15} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-blue-700 hover:border-blue-600 transition-all duration-300 shadow-lg shadow-black/50">
                <FaLinkedinIn size={15} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-pink-600 hover:border-pink-500 transition-all duration-300 shadow-lg shadow-black/50">
                <FaInstagram size={15} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-zinc-900/90 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-300 shadow-lg shadow-black/50">
                <FaGithub size={15} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-5 border-l-2 border-blue-500 pl-2.5">Quick Links</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#about" className="hover:text-blue-400 transition-colors">About Us</a></li>
              <li><a href="#team" className="hover:text-blue-400 transition-colors">Our Team</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Services</a></li>
              <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
              <li><a href="#blog" className="hover:text-blue-400 transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-5 border-l-2 border-blue-500 pl-2.5">Services</h4>
            <ul className="space-y-3 text-sm text-zinc-400">
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Web Development</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">UI/UX Design</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Digital Marketing</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Cyber Security</a></li>
              <li><a href="#services" className="hover:text-blue-400 transition-colors">Strategy & Consulting</a></li>
            </ul>
          </div>

          {/* Contact / Newsletter info */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-200 mb-5 border-l-2 border-blue-500 pl-2.5">Get in Touch</h4>
            <p className="text-xs text-zinc-400 mb-4 leading-relaxed">Have a project in mind? Let's build something awesome together.</p>
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center w-full px-4 py-3 text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-500 hover:to-indigo-500 transition-all duration-300 shadow-xl shadow-blue-600/30 border border-blue-400/20"
            >
              Contact Us
            </a>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© {new Date().getFullYear()} Zyntrix Lab. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}