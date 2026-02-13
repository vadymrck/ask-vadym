export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  thumbnail: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ai-qa-playground",
    title: "AI QA Playground: A Real Test Automation Practice Project (Playwright + Pytest)",
    description:
      "A full-stack chatbot application built specifically as a test automation practice project — covering Playwright E2E, Pytest API testing, and CI/CD with GitHub Actions.",
    date: "2025-01-28",
    thumbnail: "/blog/ai-qa-playground-thumbnail.jpeg",
  },
];
