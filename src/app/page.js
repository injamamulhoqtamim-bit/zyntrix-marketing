"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Pricing from "../components/Pricing";
import Blog from "../components/Blog";
import Contact from "../components/Contact"; // Contact কম্পোনেন্ট ইম্পোর্ট
import ServiceRequestModal from "../components/ServiceRequestModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");

  const handleOpenForm = (planName) => {
    setSelectedPlan(planName);
    setIsModalOpen(true);
  };

  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Projects />
      <Pricing onOpenForm={handleOpenForm} />
      <Blog />
      <Contact /> {/* এখানে কন্টাক্ট সেকশন যুক্ত করা হলো */}

      <ServiceRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedPlan={selectedPlan}
      />
    </main>
  );
}