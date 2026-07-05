export default function About() {
  return (
    <section id="about" className="py-24 bg-zinc-950 text-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        
        {/* Left Side: Image or Placeholder */}
        <div className="relative">
          <div className="absolute inset-0 bg-blue-600 rounded-3xl rotate-3 opacity-20"></div>
          <img 
            src="/about.jpg" // আপনার প্রজেক্টের ইমেজ পাথ এখানে দিন
            alt="About Zyntrix Lab" 
            className="relative rounded-3xl shadow-2xl w-full h-[500px] object-cover"
          />
        </div>

        {/* Right Side: Text Content */}
        <div>
          <h2 className="text-blue-500 font-semibold uppercase tracking-widest mb-4">
            About Us
          </h2>
          <h1 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
            We Are Dedicated To <br />
            <span className="text-white">Your Success.</span>
          </h1>
          <p className="text-zinc-400 text-lg leading-8 mb-8">
            Zyntrix Lab is a team of passionate developers, designers, and marketers 
            focused on creating high-quality digital solutions. We bridge the gap 
            between complex technology and user-centric design to help businesses 
            thrive in the digital era.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50">
              <h3 className="font-bold text-lg text-white">Innovation</h3>
              <p className="text-sm text-zinc-500">Modern approach</p>
            </div>
            <div className="p-4 border border-zinc-800 rounded-xl bg-zinc-900/50">
              <h3 className="font-bold text-lg text-white">Excellence</h3>
              <p className="text-sm text-zinc-500">Quality first</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}