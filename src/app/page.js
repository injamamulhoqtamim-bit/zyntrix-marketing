"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Team from "../components/Team"; // Team কম্পোনেন্ট ইম্পোর্ট
import Services from "../components/Services";
import Projects from "../components/Projects";
import Pricing from "../components/Pricing";
import Blog from "../components/Blog";
import Contact from "../components/Contact"; // Contact কম্পোনেন্ট ইম্পোর্ট
import Footer from "../components/Footer"; // Footer কম্পোনেন্ট ইম্পোর্ট
import ServiceRequestModal from "../components/ServiceRequestModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showTeam, setShowTeam] = useState(false); // টিম সেকশন দেখানোর জন্য স্টেট

  const handleOpenForm = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
      
      {/* About সেকশনে প্রপস হিসেবে অন-ক্লিক ফাংশন পাস করা হলো */}
      <About onShowTeam={() => setShowTeam(true)} />

      {/* Team সেকশনটি শুধুমাত্র showTeam ট্রু (true) হলে শো করবে */}
      {showTeam && (
        <Team onClose={() => setShowTeam(false)} />
      )}

      <Services />
      <Projects />
      <Pricing onOpenForm={handleOpenForm} />
      <Blog />
      <Contact />
      <Footer /> {/* ফুটার সেকশন যুক্ত করা হলো */}

      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </main>
  );
}