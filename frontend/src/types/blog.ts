export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail?: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "qa-metrics-dashboard",
    title: "Modern QA Dashboard in the AI Development Era",
    description:
      "Modern QA is no longer about counting test cases. It's about controlling the balance between speed and risk — combining classic engineering metrics with a new AI-aware quality layer.",
    date: "2026-03-17",
    thumbnail: "/blog/qa-metrics-dashboard-thumbnail.jpeg",
  },
  {
    slug: "playwright-cli-tests",
    title: "Playwright CLI: Generating Production-Ready Tests with AI",
    description:
      "How the new Playwright CLI enables AI agents to explore real applications and generate structured, production-aligned Playwright tests — more token-efficient than MCP-based approaches.",
    date: "2026-02-27",
    thumbnail: "/blog/playwright-cli-tests-thumbnail.jpeg",
  },
  {
    slug: "ai-qa-playground",
    title: "AI QA Playground: A Real Test Automation Practice Project (Playwright + Pytest)",
    description:
      "A full-stack chatbot application built specifically as a test automation practice project — covering Playwright E2E, Pytest API testing, and CI/CD with GitHub Actions.",
    date: "2025-01-28",
    thumbnail: "/blog/ai-qa-playground-thumbnail.jpeg",
  },
];
