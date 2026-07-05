import React from 'react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-zinc-900/50 border-t border-zinc-900 scroll-mt-20">
      <div className="max-w-md mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Let's Connect</h2>
        <p className="text-zinc-400 mb-6">Drop us a message for a free consultation session.</p>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors">
          Send Message
        </button>
      </div>
    </section>
  );
}