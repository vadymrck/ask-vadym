"use client";

import { useState } from "react";
import Image from "next/image";

interface HeaderProps {
  currentPage?: "home" | "blog";
}

export default function Header({ currentPage = "home" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with avatar */}
          <div className="flex items-center space-x-3">
            <a
              href="/"
              className="cursor-pointer"
              aria-label="Home"
            >
              <Image
                src="/avatar.png"
                alt="Ask Vadym"
                width={40}
                height={40}
                className="rounded-full object-cover hover:ring-2 hover:ring-[var(--primary)] transition-all"
              />
            </a>
            <a href="/" className="text-xl font-bold text-[var(--primary)]">
              Ask Vadym
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a
              href="/"
              className={`transition-colors cursor-pointer ${
                currentPage === "home"
                  ? "text-[var(--primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
            >
              Chat
            </a>
            <span className="text-[var(--border)]">|</span>
            <a
              href="/blog"
              className={`transition-colors cursor-pointer ${
                currentPage === "blog"
                  ? "text-[var(--primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
            >
              Blog
            </a>
            <span className="text-[var(--border)]">|</span>
            <a
              href="https://www.linkedin.com/in/vadym-m/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
              aria-label="LinkedIn Profile"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://www.youtube.com/@AskVadym"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
              aria-label="YouTube Channel"
            >
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-[var(--border)]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-[var(--border)]">
            <a
              href="/"
              className={`block py-2 cursor-pointer ${
                currentPage === "home"
                  ? "text-[var(--primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Chat
            </a>
            <a
              href="/blog"
              className={`block py-2 cursor-pointer ${
                currentPage === "blog"
                  ? "text-[var(--primary)] font-medium"
                  : "text-[var(--text-secondary)] hover:text-[var(--primary)]"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </a>
            <a
              href="https://www.linkedin.com/in/vadym-m/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-[var(--text-secondary)] hover:text-[var(--primary)] cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
            <a
              href="https://www.youtube.com/@AskVadym"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center py-2 text-[var(--text-secondary)] hover:text-[var(--primary)] cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
              </svg>
              YouTube
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
