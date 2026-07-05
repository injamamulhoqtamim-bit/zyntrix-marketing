// এখানে আমরা ../ ব্যবহার করছি যাতে নেক্সট জেএস সঠিকভাবে ফোল্ডার খুঁজে পায়
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";

export default function Home() {
  return (
    <main className="bg-zinc-950 min-h-screen">
      <Navbar />
      <Hero />
        <About />
        <Services />
      {/* যখন নতুন সেকশন তৈরি করবেন, তখন এখানে ইমপোর্ট করে যোগ করবেন */}
    </main>
  );
}