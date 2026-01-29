"use client";

import { useState } from "react";

interface HeaderProps {
  onStartChat: () => void;
}

export default function Header({ onStartChat }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-[var(--surface)] shadow-sm">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-[var(--primary)]">
                Ask Vadym
              </span>
            </a>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              type="button"
              onClick={onStartChat}
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
            >
              Chat
            </button>
            <span className="text-[var(--border)]">|</span>
            <a
              href="/blog"
              className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer text-sm"
            >
              AI QA Blog
            </a>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-[var(--text-secondary)] hover:text-[var(--primary)] hover:bg-gray-100"
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
            <button
              type="button"
              className="block py-2 text-[var(--text-secondary)] hover:text-[var(--primary)] cursor-pointer"
              onClick={() => {
                setIsMenuOpen(false);
                onStartChat();
              }}
            >
              Chat
            </button>
            <a
              href="/blog"
              className="block py-2 text-[var(--text-secondary)] hover:text-[var(--primary)] cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              AI QA Blog
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
