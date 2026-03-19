import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Exploratory Testing with Claude in Chrome Extension | Ask Vadym",
  description:
    "How Claude Desktop's built-in Chrome MCP enables exploratory testing directly in the browser — no Playwright, no Puppeteer, no terminal. Just a prompt.",
  openGraph: {
    title: "Exploratory Testing with Claude in Chrome Extension",
    description:
      "How Claude Desktop's built-in Chrome MCP enables exploratory testing directly in the browser — no Playwright, no Puppeteer, no terminal. Just a prompt.",
    type: "article",
    images: [{ url: "/blog/claude-chrome-extension-thumbnail.jpeg" }],
  },
};

export default function ClaudeChromeExtensionPost() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header currentPage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8 text-sm text-[var(--text-secondary)]">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--text-primary)]">Exploratory Testing with Claude in Chrome Extension</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Exploratory Testing with Claude in Chrome Extension
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
              <time dateTime="2026-03-19">March 19, 2026</time>
              <span>·</span>
              <span>Vadym Marochok</span>
            </div>
            <Image
              src="/blog/claude-chrome-extension-thumbnail.jpeg"
              alt="Claude Chrome Extension — Exploratory Testing"
              width={768}
              height={432}
              className="w-full rounded-xl object-cover"
              priority
            />
          </header>

          <div className="prose prose-slate max-w-none prose-content">

            <p>
              Exploratory testing usually means jumping between tools — browser, console, notes, maybe
              even automation scripts.
            </p>
            <p>
              But recently, while using Claude Desktop, I came across a feature that simplifies this
              workflow significantly.
            </p>
            <p>
              It allows Claude to control the browser directly through the Claude in Chrome extension,
              powered by Anthropic&apos;s built-in MCP.
            </p>
            <ul>
              <li>No Playwright.</li>
              <li>No Puppeteer.</li>
              <li>No additional setup.</li>
            </ul>
            <p>Just the browser and a prompt.</p>

            <h2>What This Enables</h2>
            <p>With this setup, exploratory testing becomes more fluid and interactive:</p>
            <ul>
              <li>Navigate through your application like a real user</li>
              <li>Check UI behavior and flows</li>
              <li>Inspect console errors</li>
              <li>Validate forms and interactions</li>
              <li>Get structured feedback while exploring</li>
            </ul>
            <p>All of this happens in a real browser session, using your existing login state.</p>

            <h2>How It Works</h2>
            <p>Claude connects to Chrome via a lightweight extension and can:</p>
            <ul>
              <li>Open pages</li>
              <li>Click elements</li>
              <li>Type into inputs</li>
              <li>Read page content and console output</li>
            </ul>
            <p>
              If a login or CAPTCHA appears, it simply pauses and lets you handle it.
            </p>

            <h2>Example Session</h2>
            <p>
              In the video below, I&apos;m running a short exploratory testing session using Claude Desktop
              with the Claude in Chrome extension — no terminal, no code editor, just a few lines of
              prompt. Claude starts interacting with the application and provides actionable feedback.
            </p>

            <h2>Watch the Demo</h2>
            <div className="video-embed">
              <iframe
                src="https://www.youtube.com/embed/0v1GpG3vmDw"
                title="Exploratory Testing with Claude in Chrome Extension"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h2>Why This Matters</h2>
            <p>This doesn&apos;t replace traditional testing or automation.</p>
            <p>But it adds a new layer to exploratory testing:</p>
            <ul>
              <li>Faster feedback loops</li>
              <li>Less setup friction</li>
              <li>More focus on understanding the application</li>
            </ul>
            <p>
              It&apos;s a simple but powerful addition to a modern QA workflow.
            </p>

            <h2>Conclusion</h2>
            <p>
              Claude in Chrome extension makes exploratory testing more accessible and efficient —
              especially when you want quick insights without setting up tooling.
            </p>
            <p>
              Sometimes, a few well-written prompts are enough to uncover useful observations.
            </p>

          </div>
        </article>

        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[var(--primary)] hover:text-[var(--primary-hover)] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blog
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
