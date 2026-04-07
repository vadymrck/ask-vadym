import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "QA Testing Types in the AI Era: What Changed (and What Didn't) | Ask Vadym",
  description:
    "AI doesn't introduce new testing types — it changes how some of them are applied. A practical breakdown of where AI impacts QA testing and where the fundamentals stay the same.",
  openGraph: {
    title: "QA Testing Types in the AI Era: What Changed (and What Didn't)",
    description:
      "AI doesn't introduce new testing types — it changes how some of them are applied. A practical breakdown of where AI impacts QA testing and where the fundamentals stay the same.",
    type: "article",
  },
};

export default function QaTestingTypesDashboardPost() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header currentPage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8 text-sm text-[var(--text-secondary)]">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--text-primary)]">QA Testing Types in the AI Era</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              QA Testing Types in the AI Era: What Changed (and What Didn&apos;t)
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
              <time dateTime="2026-04-07">April 7, 2026</time>
              <span>·</span>
              <span>Vadym Marochok</span>
            </div>

            {/* Clickable visual banner → dashboard */}
            <a href="/qa-testing-types-dashboard" className="block group">
              <div className="w-full rounded-xl overflow-hidden border border-[var(--border)] bg-[#f0f4f8] hover:opacity-90 transition-opacity p-5 flex flex-col gap-3">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-[#1a2b4a] uppercase tracking-widest">QA Testing Types &amp; AI Impact</span>
                  <span className="text-xs text-[var(--text-secondary)]">Interactive Dashboard →</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {/* Functional */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] font-bold text-[#2563eb] uppercase tracking-wider mb-0.5">Functional</div>
                    {["Feature Testing", "Use-Case", "Workflow", "E2E Testing"].map((t) => (
                      <div key={t} className="bg-white rounded border border-[#e6ebf2] px-2 py-1 text-[9px] font-medium text-[#0f172a] leading-tight" style={{ borderTop: "2px solid #2563eb" }}>{t}</div>
                    ))}
                  </div>
                  {/* Structural + Change */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] font-bold text-[#7c3aed] uppercase tracking-wider mb-0.5">Structural</div>
                    {["Statement Coverage", "Branch Coverage", "Path Coverage"].map((t) => (
                      <div key={t} className="bg-white rounded border border-[#e6ebf2] px-2 py-1 text-[9px] font-medium text-[#0f172a] leading-tight" style={{ borderTop: "2px solid #7c3aed" }}>{t}</div>
                    ))}
                    <div className="text-[10px] font-bold text-[#ea580c] uppercase tracking-wider mt-1 mb-0.5">Change</div>
                    {["Regression", "Retesting"].map((t) => (
                      <div key={t} className="bg-white rounded border border-[#e6ebf2] px-2 py-1 text-[9px] font-medium text-[#0f172a] leading-tight" style={{ borderTop: "2px solid #ea580c" }}>{t}</div>
                    ))}
                  </div>
                  {/* Non-Functional */}
                  <div className="flex flex-col gap-1.5">
                    <div className="text-[10px] font-bold text-[#16a34a] uppercase tracking-wider mb-0.5">Non-Functional</div>
                    {["Performance", "Security", "Usability", "Reliability", "Compatibility"].map((t) => (
                      <div key={t} className="bg-white rounded border border-[#e6ebf2] px-2 py-1 text-[9px] font-medium text-[#0f172a] leading-tight" style={{ borderTop: "2px solid #16a34a" }}>{t}</div>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          </header>

          <div className="prose prose-slate max-w-none">

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              Quality Assurance has always relied on a well-defined set of testing types — functional, non-functional, structural, and change-related.
            </p>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              With the rise of AI-powered systems, a common question appears:
            </p>

            <p className="text-xl font-semibold text-[var(--text-primary)] mb-8">
              Do we need new testing types for AI?
            </p>

            <p className="text-lg font-semibold text-[var(--text-primary)] mb-10">
              The short answer is: no.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Testing Types Remain the Same</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              The core structure of testing has not changed:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">Functional testing</strong> still verifies behavior</li>
              <li><strong className="text-[var(--text-primary)]">Non-functional testing</strong> still evaluates quality attributes</li>
              <li><strong className="text-[var(--text-primary)]">Structural testing</strong> still focuses on code logic</li>
              <li><strong className="text-[var(--text-primary)]">Change-related testing</strong> still protects stability</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              These categories are stable because they are fundamental to how software works, regardless of technology.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">What AI Actually Changes</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              AI does not introduce new testing types — it changes how some of them are applied.
            </p>

            <div className="not-prose my-6 grid grid-cols-2 gap-4">
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-3">Traditional systems</p>
                <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <li>→ deterministic</li>
                  <li>→ predictable</li>
                  <li>→ fixed expected results</li>
                </ul>
              </div>
              <div className="p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg">
                <p className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wide mb-3">AI systems</p>
                <ul className="space-y-1 text-sm text-[var(--text-secondary)]">
                  <li>→ probabilistic</li>
                  <li>→ variable</li>
                  <li>→ model outputs, not exact values</li>
                </ul>
              </div>
            </div>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              Because of this, certain testing types require <strong className="text-[var(--text-primary)]">adaptation</strong>, not replacement.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-6">Where AI Has the Biggest Impact</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              AI affects testing most in areas where behavior is no longer strictly predictable:
            </p>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Functional Testing</h3>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-8 pl-2">
              <li>You validate <em>quality of output</em>, not exact matches</li>
              <li>Test scenarios must include ambiguous and real-world inputs</li>
              <li>Edge cases include prompt injection and adversarial inputs</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Security Testing</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">New risks appear:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-8 pl-2">
              <li>prompt injection</li>
              <li>data leakage</li>
              <li>unsafe generated content</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Usability Testing</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">Focus shifts to:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-8 pl-2">
              <li>clarity of responses</li>
              <li>usefulness</li>
              <li>trustworthiness</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Reliability &amp; Regression</h3>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-8 pl-2">
              <li>Outputs may vary → you validate consistency and acceptable deviation</li>
              <li>Regression becomes baseline comparison, not strict equality</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Configuration &amp; Upgrade Testing</h3>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-10 pl-2">
              <li>Model versions and prompts become part of the system</li>
              <li>Small changes can significantly affect behavior</li>
            </ul>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Where AI Has Minimal Impact</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Some testing types remain mostly unchanged:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li>Installation testing</li>
              <li>Compatibility testing</li>
              <li>Portability testing</li>
              <li>Basic structural coverage</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              These areas are still technical and deterministic, even in AI systems.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Key Takeaway</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              AI does not replace testing fundamentals.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">Instead, it introduces a new layer:</p>
            <p className="text-base font-semibold text-[var(--primary)] mb-10">
              → From verifying correctness → to evaluating quality and behavior
            </p>
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-10">
              This is an evolution, not a revolution.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Why This Matters</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Understanding this distinction helps avoid two common mistakes:
            </p>
            <ul className="list-none space-y-2 text-[var(--text-secondary)] mb-6 pl-2">
              <li>❌ Inventing unnecessary &quot;new testing types&quot;</li>
              <li>❌ Treating AI systems like traditional deterministic systems</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">The right approach is:</p>
            <p className="text-base font-semibold text-[var(--text-primary)] mb-10">
              → Keep the structure, adapt the mindset
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Explore the Full Map</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              To make this more practical, I&apos;ve created a visual dashboard that shows:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-8 pl-2">
              <li>all major testing types</li>
              <li>where AI actually impacts them</li>
              <li>and how strong that impact is</li>
            </ul>

            {/* Bottom CTA */}
            <div className="not-prose mt-6 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">Interactive dashboard</p>
              <a
                href="/qa-testing-types-dashboard"
                className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                View QA Testing Types Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
              <p className="mt-4 text-sm text-[var(--text-secondary)] leading-relaxed">
                This will give you a clear overview of how traditional QA knowledge applies directly to modern AI systems — without overcomplicating the fundamentals.
              </p>
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
