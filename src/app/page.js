"use client";

import { useState, useRef } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Team from "../components/Team";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Pricing from "../components/Pricing";
import Blog from "../components/Blog";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import ServiceRequestModal from "../components/ServiceRequestModal";
import FloatingContact from "../components/FloatingContact"; // ফ্লোটিং কন্টাক্ট ইমপোর্ট করা হলো

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [showTeam, setShowTeam] = useState(false); // টিম সেকশন দেখানোর স্টেট

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
      <Navbar />
      <Hero />
      
      {/* About সেকশনে ফাংশনটি প্রপস আকারে পাস করা হলো */}
      <About onShowTeam={handleShowTeam} />

      {/* showTeam ট্রু (true) হলে তবেই Team সেকশনটি রেন্ডার হবে */}
      {showTeam && (
        <div ref={teamRef} id="team">
          <Team />
        </div>
      )}

      <Services />
      <Projects />
      <Pricing onOpenForm={handleOpenForm} />
      
      <div id="blog">
        <Blog />
      </div>

      <div id="support">
        <Contact />
      </div>

      <div id="contact">
        <Contact />
      </div>

      <Footer />

      {/* ডান পাশে নিচে ভাসমান কন্টাক্ট আইকনগুলো */}
      <FloatingContact />

      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </main>
  );
}