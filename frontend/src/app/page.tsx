"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";

export default function Home() {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
    setTimeout(() => {
      document.getElementById("chat")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header />
      <main>
        <Hero onStartChat={handleStartChat} />
        {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
      </main>
      <footer className="py-8 text-center text-sm text-[var(--text-secondary)]">
        <p>&copy; {new Date().getFullYear()} Vadym. Built with Next.js.</p>
      </footer>
    </div>
  );
}
