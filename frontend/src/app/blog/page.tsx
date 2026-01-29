import Link from "next/link";

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <header className="sticky top-0 z-50 bg-[var(--surface)] shadow-sm">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-xl font-bold text-[var(--primary)]">
              Ask Vadym
            </Link>
            <nav className="flex items-center space-x-8">
              <Link
                href="/"
                className="text-[var(--text-secondary)] hover:text-[var(--primary)] transition-colors cursor-pointer"
              >
                Chat
              </Link>
              <span className="text-[var(--border)]">|</span>
              <span className="text-[var(--primary)] text-sm font-medium">
                AI QA Blog
              </span>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-[var(--text-primary)] mb-4">
            AI QA Blog
          </h1>
          <p className="text-xl text-[var(--text-secondary)] mb-8">
            Coming Soon
          </p>
          <div className="bg-[var(--surface)] rounded-xl shadow-lg p-8 border border-[var(--border)]">
            <svg
              className="w-16 h-16 mx-auto text-[var(--primary)] mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
              />
            </svg>
            <p className="text-[var(--text-secondary)] mb-6">
              I&apos;m working on articles about QA automation, Playwright tips,
              API testing best practices, and AI-assisted testing.
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg transition-colors cursor-pointer"
            >
              Back to Chat
            </Link>
          </div>
        </div>
      </main>

      <footer className="py-8 text-center text-sm text-[var(--text-secondary)]">
        <p>&copy; {new Date().getFullYear()} Vadym. Built with Next.js.</p>
      </footer>
    </div>
  );
}
