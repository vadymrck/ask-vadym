import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "AI QA Playground: A Real Test Automation Practice Project | Ask Vadym",
  description:
    "A full-stack chatbot application built specifically as a test automation practice project — covering Playwright E2E, Pytest API testing, and CI/CD with GitHub Actions.",
  openGraph: {
    title: "AI QA Playground: A Real Test Automation Practice Project (Playwright + Pytest)",
    description:
      "A full-stack chatbot application built specifically as a test automation practice project — covering Playwright E2E, Pytest API testing, and CI/CD with GitHub Actions.",
    type: "article",
    images: [{ url: "/blog/ai-qa-playground-thumbnail.jpeg" }],
  },
};

export default function AiQaPlaygroundPost() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header currentPage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8 text-sm text-[var(--text-secondary)]">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--text-primary)]">AI QA Playground</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              AI QA Playground: A Real Test Automation Practice Project (Playwright + Pytest)
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
              <time dateTime="2025-01-28">January 28, 2025</time>
              <span>·</span>
              <span>Vadym Marochok</span>
            </div>
            <Image
              src="/blog/ai-qa-playground-thumbnail.jpeg"
              alt="AI QA Playground — Playwright and Pytest test automation practice project"
              width={768}
              height={432}
              className="w-full rounded-xl object-cover"
              priority
            />
            <p className="mt-6 text-base text-[var(--text-secondary)]">
              GitHub Repository:{" "}
              <a
                href="https://github.com/vmqa/qa-chatbot-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                github.com/vmqa/qa-chatbot-playground
              </a>
            </p>
          </header>

          <div className="prose-content">
            <p>
              If you&apos;re learning test automation, finding a realistic practice project is harder than it should be.
            </p>
            <p>Most tutorials use basic demo apps — login forms, todo lists, static APIs.</p>
            <p>But modern applications are more complex. They include:</p>
            <ul>
              <li>Asynchronous behavior</li>
              <li>API integrations</li>
              <li>Rate limiting</li>
              <li>Error handling</li>
              <li>Real-time updates</li>
            </ul>
            <p>
              That&apos;s why I built <strong>AI QA Playground</strong> — a full-stack application designed
              specifically as a test automation practice project using Playwright and Pytest.
            </p>

            <h2>What Is AI QA Playground?</h2>
            <p>
              AI QA Playground is a full-stack chatbot application built to help QA engineers practice:
            </p>
            <ul>
              <li>UI automation testing</li>
              <li>API automation testing</li>
              <li>End-to-end testing</li>
              <li>CI/CD pipeline integration</li>
            </ul>

            <h2>Tech Stack</h2>
            <ul>
              <li><strong>Frontend:</strong> Next.js 14 + TypeScript + TailwindCSS</li>
              <li><strong>Backend:</strong> FastAPI + Python 3.11</li>
              <li><strong>Testing Frameworks:</strong> Playwright (E2E), Pytest (API testing)</li>
              <li><strong>CI/CD:</strong> GitHub Actions</li>
            </ul>
            <p>
              The project runs 100% locally and only requires your own OpenAI API key.
              No deployment. No hosting. No cloud infrastructure.
            </p>

            <h2>Why This Is a Better Test Automation Practice Project</h2>
            <p>If you&apos;re searching for:</p>
            <ul>
              <li>&quot;Playwright practice project&quot;</li>
              <li>&quot;Pytest API testing example&quot;</li>
              <li>&quot;Test automation portfolio project&quot;</li>
              <li>&quot;QA automation real-world example&quot;</li>
            </ul>
            <p>This project is built exactly for that purpose.</p>
            <p>Unlike simple demo apps, this system includes:</p>
            <ul>
              <li>Streaming responses</li>
              <li>Rate limiting (20 requests/hour per IP)</li>
              <li>Input validation</li>
              <li>Error handling</li>
              <li>Async UI behavior</li>
              <li>Real backend API endpoints</li>
            </ul>
            <p>
              This allows you to practice real-world automation scenarios instead of isolated examples.
            </p>

            <h2>Practicing UI Automation with Playwright</h2>
            <p>The frontend behaves like a production-style application. You can practice:</p>
            <ul>
              <li>End-to-end testing with Playwright</li>
              <li>Handling asynchronous UI updates</li>
              <li>Validating streaming responses</li>
              <li>Testing loading states and disabled buttons</li>
              <li>Implementing Page Object Model (POM)</li>
              <li>Writing reliable selectors</li>
              <li>Running headless vs headed tests</li>
              <li>Integrating Playwright into CI/CD pipelines</li>
            </ul>
            <p>
              Here&apos;s an example from the project — a Playwright test using Page Object Model that
              sends a message and verifies the AI response:
            </p>

            <CodeBlock code={`test("Chatbot responds to greeting", async () => {
  await test.step("Input chat message", async () => {
    await mainChatPage.toBeOnChatPage();
    await mainChatPage.toHaveInputFocusInsideChat();
    await mainChatPage.toHaveSubmitButtonBeDisabled();
    await mainChatPage.fillChatInput("Hello");
    await mainChatPage.clickSubmit();
    await mainChatPage.toHaveUserMessage("Hello");
  });

  await test.step("Verify assistant response", async () => {
    await mainChatPage.toHaveAssistantMessageContaining(GREETING_MARKERS);
    await mainChatPage.toHaveInputFocusInsideChat();
    await mainChatPage.toHaveSubmitButtonBeDisabled();
  });
});`} />

            <p>
              This is ideal for QA engineers learning Playwright, preparing for SDET interviews, or
              building an automation portfolio.
            </p>

            <h2>Practicing API Automation with Pytest</h2>
            <p>The FastAPI backend provides realistic API endpoints for automation testing. You can practice:</p>
            <ul>
              <li>API request/response validation</li>
              <li>Schema validation</li>
              <li>Boundary and edge case testing</li>
              <li>Rate limit validation</li>
              <li>Error response assertions</li>
              <li>Test fixtures and test structure in Pytest</li>
              <li>Organizing smoke vs regression test suites</li>
            </ul>
            <p>
              Here&apos;s an example — a Pytest test that verifies the chatbot stays on topic and
              declines off-topic questions:
            </p>

            <CodeBlock code={`@pytest.mark.regression
def test_chat_redirects_offtopic_questions(test_client: TestClient):
    """Chat should politely decline off-topic questions."""
    response = ask_question(test_client, "What is the capital of France?")

    assert response.status_code == 200

    message = get_response_text(response)
    message_lower = message.lower()

    # Should NOT contain the answer to the off-topic question
    assert "paris" not in message_lower, \\
        "Should not answer off-topic geography question"

    # Should indicate it's outside scope or redirect to QA topics
    decline_indicators = [
        "outside my",
        "not about",
        "focus on",
        "ask about my",
        "instead",
        "can't help with that",
    ]

    has_decline = any(indicator in message_lower for indicator in decline_indicators)
    assert has_decline, \\
        f"Response should decline off-topic question. Got: {message}"`} />

            <p>
              If you&apos;re learning Pytest for API testing, Python-based automation, or backend
              validation strategies — this project gives you hands-on experience.
            </p>

            <h2>Full-Stack Test Automation Strategy</h2>
            <p>
              Because AI QA Playground includes both frontend and backend layers, you can practice:
            </p>
            <ul>
              <li>UI-only tests</li>
              <li>API-only tests</li>
              <li>Multi-layer validation strategies</li>
              <li>Hybrid automation approaches</li>
              <li>Test data management</li>
              <li>CI/CD test execution</li>
            </ul>
            <p>This mirrors how automation works in real engineering teams.</p>

            <h2>CI/CD Automation Practice</h2>
            <p>The repository includes GitHub Actions workflows, allowing you to:</p>
            <ul>
              <li>Run Playwright tests in pipeline</li>
              <li>Execute Pytest API tests in CI</li>
              <li>Simulate failed builds</li>
              <li>Improve test reliability</li>
              <li>Practice automation reporting</li>
            </ul>
            <p>
              For QA engineers moving toward SDET or Quality Engineering roles, this is especially valuable.
            </p>

            <h2>Who Should Use This Project?</h2>
            <p>This test automation playground is ideal for:</p>
            <ul>
              <li>Junior QA engineers learning automation</li>
              <li>Manual testers transitioning to automated testing</li>
              <li>Developers improving testing skills</li>
              <li>QA engineers building a public portfolio</li>
              <li>Candidates preparing for automation interviews</li>
            </ul>
            <p>
              Instead of saying &quot;I learned Playwright,&quot; you can show a structured,
              real-world automation project.
            </p>

            <h2>Video Walkthrough</h2>
            <div className="video-embed">
              <iframe
                src="https://www.youtube.com/embed/EAAkskYw-30"
                title="AI QA Playground video walkthrough"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h2>Conclusion</h2>
            <p>Improving your automation skills requires:</p>
            <ul>
              <li>A realistic system</li>
              <li>Multiple testing layers</li>
              <li>API and UI coverage</li>
              <li>CI/CD integration</li>
              <li>Meaningful edge cases</li>
            </ul>
            <p>AI QA Playground provides that environment.</p>
            <p>
              It&apos;s open-source. It runs locally. And it&apos;s built specifically for learning
              and practicing Playwright and Pytest automation.
            </p>
            <p>
              If you&apos;re serious about improving your automation skills — this is a practical
              place to start.
            </p>
            <p>
              GitHub:{" "}
              <a
                href="https://github.com/vmqa/qa-chatbot-playground"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                github.com/vmqa/qa-chatbot-playground
              </a>
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
