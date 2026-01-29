"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ChatInterface from "@/components/ChatInterface";
import Footer from "@/components/Footer";

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
      <Header onStartChat={handleStartChat} />
      <main className="pb-16">
        <Hero onStartChat={handleStartChat} />
        {showChat && <ChatInterface onClose={() => setShowChat(false)} />}
      </main>
      <Footer />
    </div>
  );
}
