import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Modern QA Dashboard in the AI Development Era | Ask Vadym",
  description:
    "A real-world QA metrics dashboard covering DORA metrics, defect escape rates, test automation health, and AI vs. human code quality comparison — built to give engineering teams clear quality visibility.",
  openGraph: {
    title: "Modern QA Dashboard in the AI Development Era",
    description:
      "A real-world QA metrics dashboard covering DORA metrics, defect escape rates, test automation health, and AI vs. human code quality comparison.",
    type: "article",
    images: [{ url: "/blog/qa-metrics-dashboard-thumbnail.jpeg" }],
  },
};

export default function QaMetricsDashboardPost() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header currentPage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8 text-sm text-[var(--text-secondary)]">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--text-primary)]">Modern QA Dashboard in the AI Development Era</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Modern QA Dashboard in the AI Development Era
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
              <time dateTime="2026-03-17">March 17, 2026</time>
              <span>·</span>
              <span>Vadym Marochok</span>
            </div>
            <a href="/qa-metrics-dashboard" className="block">
              <Image
                src="/blog/qa-metrics-dashboard-thumbnail.jpeg"
                alt="Modern QA Metrics Dashboard"
                width={768}
                height={432}
                className="w-full rounded-xl object-cover hover:opacity-90 transition-opacity"
                priority
              />
            </a>
          </header>

          <div className="prose prose-slate max-w-none">

            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-6">
              Software delivery has changed dramatically in the last few years. Teams are shipping faster than ever,
              often with the help of AI assistants or even autonomous agents generating code. But one thing hasn&apos;t changed:
            </p>

            <p className="text-xl font-semibold text-[var(--text-primary)] mb-2">Quality is still the bottleneck.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              The faster you ship, the easier it is to break things in production.
            </p>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              That&apos;s why modern QA is no longer about counting test cases or pass rates. It&apos;s about understanding the balance between:
            </p>
            <p className="text-base font-semibold text-[var(--primary)] mb-8">Speed vs Risk</p>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              In this article, I&apos;ll show how a modern QA dashboard can look today, combining classic engineering metrics
              with a new AI-aware layer.
            </p>

            {/* Dashboard CTA */}
            <div className="not-prose my-8 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">Working example</p>
              <a
                href="/qa-metrics-dashboard"
                className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                View live QA Metrics Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Why Traditional QA Metrics Are Not Enough</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Many teams still rely on metrics like:
            </p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li>number of test cases</li>
              <li>pass/fail rate</li>
              <li>code coverage</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">These don&apos;t reflect real product quality anymore.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">Modern teams need metrics that answer:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li>Are we breaking production?</li>
              <li>How fast do we deliver safely?</li>
              <li>Can we trust our automation?</li>
              <li>How quickly do we recover from failures?</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">And now, additionally:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-8 pl-2">
              <li>Does AI-generated code introduce more risk?</li>
            </ul>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">The Structure of a Modern QA Dashboard</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">A good dashboard today is built in two layers:</p>
            <ol className="list-decimal list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">Core QA Metrics</strong> (overall system health)</li>
              <li><strong className="text-[var(--text-primary)]">AI vs Human Quality Metrics</strong> (impact of AI-generated changes)</li>
            </ol>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">This separation is important.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">You don&apos;t want an &quot;AI hype dashboard&quot;.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-8">
              You want a quality dashboard that remains valid even without AI.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Layer 1: Core QA Metrics (System Health)</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              These metrics measure the overall quality of your system, regardless of how code was written.
            </p>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Production Risk</h3>
            <ul className="list-none space-y-3 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">Defect Escape Rate</strong> — How many bugs reach production. The most direct signal of QA effectiveness.</li>
              <li><strong className="text-[var(--text-primary)]">Critical Defect Leakage</strong> — Number of P0/P1 incidents. This is what the business actually feels.</li>
              <li><strong className="text-[var(--text-primary)]">Change Failure Rate</strong> — How often deployments cause incidents or rollbacks. A key DORA metric.</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Delivery Speed</h3>
            <ul className="list-none space-y-3 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">Lead Time to Production</strong> — How fast changes go from commit to production.</li>
              <li><strong className="text-[var(--text-primary)]">Deployment Frequency</strong> — How often you release.</li>
              <li><strong className="text-[var(--text-primary)]">Regression Execution Time</strong> — How quickly QA can validate a release.</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Test Automation Health</h3>
            <ul className="list-none space-y-3 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">Test Flakiness Rate</strong> — How reliable your test suite is.</li>
              <li><strong className="text-[var(--text-primary)]">Critical Flow Coverage</strong> — How well key business flows are protected.</li>
            </ul>

            <h3 className="text-lg font-bold text-[var(--text-primary)] mt-6 mb-3">Reliability &amp; Operations</h3>
            <ul className="list-none space-y-3 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">Mean Time to Detect (MTTD)</strong> — How quickly you notice production issues.</li>
              <li><strong className="text-[var(--text-primary)]">Mean Time to Resolve (MTTR)</strong> — How quickly you fix them.</li>
            </ul>

            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">Together, these metrics describe the full lifecycle of quality:</p>
            <p className="text-sm font-mono bg-[var(--surface)] border border-[var(--border)] rounded-lg px-4 py-3 text-[var(--text-secondary)] mb-10">
              Build → Test → Release → Monitor → Recover
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Layer 2: AI vs Human Quality Metrics</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">
              This is where things get interesting.
            </p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              Instead of trying to measure &quot;AI code quality&quot; in isolation (which is unreliable), we compare:
            </p>
            <p className="text-base font-semibold text-[var(--text-primary)] mb-6">AI-generated changes vs Human-generated changes</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-6">This gives real, actionable insights.</p>
            <ul className="list-none space-y-3 text-[var(--text-secondary)] mb-6 pl-2">
              <li><strong className="text-[var(--text-primary)]">AI Change Failure Rate</strong> — Do AI-generated deployments fail more often?</li>
              <li><strong className="text-[var(--text-primary)]">AI Defect Escape Rate</strong> — Do AI changes leak more bugs to production?</li>
              <li><strong className="text-[var(--text-primary)]">AI Test Failure Rate</strong> — Do AI pull requests break CI more often?</li>
              <li><strong className="text-[var(--text-primary)]">AI Regression Defect Rate</strong> — Do AI changes break existing functionality more frequently?</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              These metrics don&apos;t try to guess &quot;who wrote the code&quot;. They measure what happens after the code is shipped.
            </p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">What Makes This Dashboard Modern</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">This approach reflects how engineering actually works today:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li>AI increases development speed</li>
              <li>Risk shifts to production</li>
              <li>QA becomes a system-level responsibility</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">Instead of focusing on: <em>&quot;Did we test everything?&quot;</em></p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">We focus on: <strong className="text-[var(--text-primary)]">&quot;Are we shipping fast without increasing risk?&quot;</strong></p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">A Practical Insight</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">
              One of the most useful patterns in the dashboard is comparison. For example:
            </p>
            <div className="not-prose my-6 p-4 bg-[var(--surface)] border border-[var(--border)] rounded-lg font-mono text-sm">
              <p className="text-[#e55b2f] font-bold">AI Change Failure Rate = 18%</p>
              <p className="text-[#1e40af] font-bold">Human Change Failure Rate = 9%</p>
            </div>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">This immediately tells you:</p>
            <p className="text-base font-semibold text-[var(--text-primary)] mb-4">AI-generated changes are currently 2× riskier</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">No speculation. No assumptions. Just data.</p>

            <hr className="border-[var(--border)] my-10" />

            <h2 className="text-2xl font-bold text-[var(--text-primary)] mt-10 mb-4">Final Thought</h2>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">Modern QA is no longer about testing features in isolation.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">It&apos;s about controlling the system:</p>
            <ul className="list-disc list-inside space-y-1 text-[var(--text-secondary)] mb-6 pl-2">
              <li>delivery speed</li>
              <li>production risk</li>
              <li>automation reliability</li>
              <li>incident recovery</li>
              <li>and now, AI-generated change quality</li>
            </ul>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-4">A good QA dashboard doesn&apos;t just report metrics.</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-2">It tells a story:</p>
            <p className="text-lg font-semibold text-[var(--text-primary)] mb-8">Are we moving faster without breaking things?</p>
            <p className="text-[var(--text-secondary)] leading-relaxed mb-10">
              If the answer is yes — you&apos;re doing modern QA right.
            </p>

            {/* Bottom CTA */}
            <div className="not-prose mt-10 p-6 bg-[var(--surface)] border border-[var(--border)] rounded-xl">
              <p className="text-sm font-semibold text-[var(--text-secondary)] uppercase tracking-wide mb-3">See it in action</p>
              <a
                href="/qa-metrics-dashboard"
                className="inline-flex items-center gap-2 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
              >
                View live QA Metrics Dashboard
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>

          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
