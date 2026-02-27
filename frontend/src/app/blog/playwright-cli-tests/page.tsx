import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CodeBlock from "@/components/CodeBlock";

export const metadata: Metadata = {
  title: "Playwright CLI: Generating Production-Ready Tests with AI | Ask Vadym",
  description:
    "How the new Playwright CLI enables AI agents to explore real applications and generate structured, production-aligned Playwright tests — more token-efficient than MCP-based approaches.",
  openGraph: {
    title: "Playwright CLI: Generating Production-Ready Tests with AI",
    description:
      "How the new Playwright CLI enables AI agents to explore real applications and generate structured, production-aligned Playwright tests — more token-efficient than MCP-based approaches.",
    type: "article",
    images: [{ url: "/blog/playwright-cli-tests-thumbnail.jpeg" }],
  },
};

export default function PlaywrightCliTestsPost() {
  return (
    <div className="min-h-screen bg-[var(--background)]">
      <Header currentPage="blog" />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="mb-8 text-sm text-[var(--text-secondary)]">
          <Link href="/blog" className="hover:text-[var(--primary)] transition-colors">
            Blog
          </Link>
          <span className="mx-2">›</span>
          <span className="text-[var(--text-primary)]">Playwright CLI: Generating Production-Ready Tests with AI</span>
        </nav>

        <article>
          <header className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] leading-tight mb-4">
              Playwright CLI: Generating Production-Ready Tests with AI
            </h1>
            <div className="flex items-center gap-4 text-sm text-[var(--text-secondary)] mb-6">
              <time dateTime="2025-02-10">February 27, 2025</time>
              <span>·</span>
              <span>Vadym Marochok</span>
            </div>
            <Image
              src="/blog/playwright-cli-tests-thumbnail.jpeg"
              alt="Playwright CLI — Generating Production-Ready Tests with AI"
              width={768}
              height={432}
              className="w-full rounded-xl object-cover"
              priority
            />
            <p className="mt-6 text-base text-[var(--text-secondary)]">
              GitHub Repository:{" "}
              <a
                href="https://github.com/vmqa/qa-chatbot-playground/tree/playwright-cli-tests-part-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                github.com/vmqa/qa-chatbot-playground (branch: playwright-cli-tests-part-1)
              </a>
            </p>
          </header>

          <div className="prose prose-slate max-w-none prose-content">

            <h2>Why Playwright CLI Matters</h2>
            <p>
              The new Playwright CLI introduces a more structured way for AI agents to work with real applications.
            </p>
            <p>
              Instead of relying on large DOM dumps or heavy context exchanges, the CLI provides a controlled
              command-based interface for application exploration and test execution. In practice, this makes
              the workflow:
            </p>
            <ul>
              <li>More token-efficient</li>
              <li>More structured</li>
              <li>Easier to reason about</li>
              <li>Smoother than the previous MCP-based approach</li>
            </ul>
            <p>
              The result is not just test suggestions — but runnable Playwright tests aligned with real
              project standards.
            </p>

            <h2>What the Workflow Looks Like</h2>
            <p>In this demo, the AI agent:</p>
            <ul>
              <li>Explores a running application using Playwright CLI</li>
              <li>Navigates real user flows</li>
              <li>Interacts with UI elements</li>
              <li>Generates a structured test plan</li>
              <li>Converts that plan into Playwright tests</li>
              <li>Executes them successfully</li>
            </ul>
            <p>
              Because the project already defines coding standards (Page Object Model, fixtures, clean
              structure), the generated tests are not prototypes — they are aligned with production patterns.
            </p>
            <p>
              This is a key distinction. Clear constraints + structured CLI interaction = reliable automation output.
            </p>

            <h2>Real Project Context</h2>
            <p>
              The demo runs on top of the{" "}
              <Link href="/blog/ai-qa-playground" className="text-[var(--primary)] hover:underline">
                AI QA Playground
              </Link>{" "}
              project introduced in a previous article.
            </p>
            <p>That project includes:</p>
            <ul>
              <li>Next.js frontend</li>
              <li>FastAPI backend</li>
              <li>Playwright E2E tests</li>
              <li>Pytest API tests</li>
              <li>CI/CD workflows</li>
            </ul>
            <p>
              By combining it with Playwright CLI, the setup becomes a realistic environment for
              experimenting with AI-assisted automation — not a toy example.
            </p>

            <h2>Example: Generated Test Spec</h2>
            <p>
              Here is an example of a test spec generated by the AI agent during the demo. It covers
              blog page search filtering and article navigation using the Page Object Model:
            </p>

            <CodeBlock lang="typescript" code={`import { test } from '@playwright/test';
import { BlogPage } from '~pom/BlogPage.pom';
import { ArticlePage } from '~pom/ArticlePage.pom';

test.describe('Blog Page', () => {
  let blogPage: BlogPage;

  test.beforeEach(async ({ page }) => {
    blogPage = new BlogPage(page);
    await blogPage.goto();
  });

  test('Search filters the article list', async () => {
    await test.step('Verify initial state', async () => {
      await blogPage.toBeOnBlogPage();
      await blogPage.toHaveResultsCount('Showing 10 of 20 articles');
    });

    await test.step('Search for playwright', async () => {
      await blogPage.searchArticles('playwright');
      await blogPage.toHaveResultsCount('Showing 8 of 8 articles');
    });

    await test.step('Clear search restores full list', async () => {
      await blogPage.clearSearch();
      await blogPage.toHaveResultsCount('Showing 10 of 20 articles');
    });
  });

  test('Article navigation', async ({ page }) => {
    const articlePage = new ArticlePage(page);

    await test.step('Click article and verify detail page', async () => {
      await blogPage.clickArticle('scalable-test-automation-framework');
      await articlePage.toBeOnArticlePage(
        'scalable-test-automation-framework',
        'Building a Scalable Test Automation Framework'
      );
      await articlePage.toHaveBackLink();
    });

    await test.step('Navigate back to blog', async () => {
      await articlePage.clickBackLink();
      await blogPage.toBeOnBlogPage();
    });
  });
});`} />

            <h2>Example: Generated Page Object</h2>
            <p>
              The AI agent also generated the corresponding Page Object Model class, following the
              project&apos;s existing POM structure with three sections — Locators, Actions, and Assertions:
            </p>

            <CodeBlock lang="typescript" code={`import { expect, Locator, Page } from '@playwright/test';
import { step } from '~support/decorators';
import { BasePage } from '~support/BasePage.pom';

export class ArticlePage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators
  private locateTitle(): Locator {
    return this.page.getByTestId('article-title');
  }

  private locateBackLink(): Locator {
    return this.page.getByTestId('article-back-link');
  }

  private locateContent(): Locator {
    return this.page.getByTestId('article-content');
  }

  // Actions
  @step()
  async goto(slug: string) {
    await this.navigate(\`/blog/\${slug}\`);
    await this.waitForPageReady();
    await this.toHaveTitle();
  }

  @step()
  async clickBackLink() {
    await this.locateBackLink().click();
  }

  // Assertions
  @step()
  async toHaveTitle(expected?: string) {
    const title = this.locateTitle();
    await expect(title, 'Article title should be visible').toBeVisible();
    if (expected) {
      await expect(title, \`Article title should read "\${expected}"\`).toHaveText(expected);
    }
  }

  @step()
  async toHaveBackLink() {
    await expect(this.locateBackLink(), 'Back to Blog link should be visible').toBeVisible();
  }

  @step()
  async toHaveContent() {
    await expect(this.locateContent(), 'Article content should be visible').toBeVisible();
  }

  @step()
  async toBeOnArticlePage(slug: string, expectedTitle: string) {
    await expect(this.page, \`URL should be /blog/\${slug}\`).toHaveURL(\`/blog/\${slug}\`);
    await this.toHaveTitle(expectedTitle);
    await this.toHaveContent();
  }
}`} />

            <h2>When This Is Useful</h2>
            <p>This workflow is particularly interesting for:</p>
            <ul>
              <li>QA engineers exploring AI-assisted automation</li>
              <li>SDETs optimizing test generation workflows</li>
              <li>Teams experimenting with AI-driven test planning</li>
              <li>Engineers interested in token-efficient browser control</li>
            </ul>
            <p>
              It does not replace engineering judgment. But it can significantly accelerate structured
              test creation when proper standards are in place.
            </p>

            <h2>Video Walkthrough</h2>
            <div className="video-embed">
              <iframe
                src="https://www.youtube.com/embed/ug_Z9VcCJWw"
                title="Playwright CLI — Generating Production-Ready Tests with AI"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <h2>Conclusion</h2>
            <p>
              Playwright CLI is not just another wrapper around browser automation.
            </p>
            <p>
              It introduces a more controlled, token-efficient interaction layer that makes
              AI-assisted test generation practical in real projects.
            </p>
            <p>If you&apos;re already using Playwright, it&apos;s worth experimenting with.</p>
            <p>
              Repository branch used in the demo:{" "}
              <a
                href="https://github.com/vmqa/qa-chatbot-playground/tree/playwright-cli-tests-part-1"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--primary)] hover:underline"
              >
                github.com/vmqa/qa-chatbot-playground (playwright-cli-tests-part-1)
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
