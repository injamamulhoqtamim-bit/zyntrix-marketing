"use client";

import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Team from "../components/Team";
import Services from "../components/Services";
import FreeResources from "../components/FreeResources";
import Projects from "../components/Projects";
import Pricing from "../components/Pricing";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ServiceRequestModal from "../components/ServiceRequestModal";
import FloatingContact from "../components/FloatingContact";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showTeam, setShowTeam] = useState(false);
  
  // ভাষা পরিবর্তনের মূল স্টেট (ডিফল্ট: ইংরেজি 'en')
  const [lang, setLang] = useState("en");

  // ভাষা টগল করার ফাংশন
  const toggleLanguage = () => {
    setLang((prev) => (prev === "en" ? "bn" : "en"));
  };

  const teamRef = useRef(null);

  const handleOpenForm = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  // About থেকে ক্লিক করলে টিম দেখাবে এবং সেখানে স্ক্রোল করবে
  const handleShowTeam = () => {
    setShowTeam(true);
    setTimeout(() => {
      teamRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <main className="bg-zinc-950 min-h-screen text-white relative">
      {/* Navbar */}
      <Navbar lang={lang} toggleLanguage={toggleLanguage} />

      {/* Hero Section */}
      <Hero lang={lang} />
      
      {/* About Section */}
      <About lang={lang} onShowTeam={handleShowTeam} />

      {/* Team Section */}
      {showTeam && (
        <div ref={teamRef} id="team">
          <Team lang={lang} />
        </div>
      )}

      {/* Services Section */}
      <Services lang={lang} />

      {/* Free Learning Resources Section */}
      <FreeResources lang={lang} />

      {/* Projects Section */}
      <Projects lang={lang} />

      {/* Pricing Section */}
      <Pricing lang={lang} onOpenForm={handleOpenForm} />
      
      {/* Blog Section */}
      <div id="blog">
        <Blog lang={lang} />
      </div>

      {/* Contact / Support Section */}
      <div id="support">
        <Contact lang={lang} />
      </div>

      {/* Footer */}
      <Footer lang={lang} />

      {/* Floating Contact */}
      <FloatingContact lang={lang} />

      {/* Service Request Modal */}
      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
        lang={lang}
      />
    </main>
  );
}