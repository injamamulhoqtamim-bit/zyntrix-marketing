"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import AuthSection from "../components/AuthSection";

export default function Home() {
  const [isAuthVisible, setIsAuthVisible] = useState(false);

  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero onShowAuth={() => setIsAuthVisible(true)} />
      <About />
      <Services />
        <Projects />
      
      {/* এটি এখন সব সময় DOM এ থাকবে, কিন্তু আমরা visibility কন্ট্রোল করছি */}
      <div className={isAuthVisible ? "block" : "hidden"}>
        <AuthSection />
      </div>
    </main>
  );
}