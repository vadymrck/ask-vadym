export const EXAMPLE_QUESTIONS = [
  {
    label: "Experience",
    question: "What's your experience?",
  },
  {
    label: "Book Intro Call",
    question: "Book a short 20-minute intro call to discuss AI automation, workflow automation, or opportunities.",
    highlight: true,
  },
  {
    label: "Skills",
    question: "What are your technical skills?",
  },
  {
    label: "Contacts",
    question: "How can I contact you?",
  },
  {
    label: "Portfolio Projects",
    question: "Tell me about your AI automation portfolio projects.",
  },
] as const;

export type ExampleQuestion = typeof EXAMPLE_QUESTIONS[number];
export type ExampleQuestionLabel = typeof EXAMPLE_QUESTIONS[number]['label'];
export type HighlightedExampleQuestion = ExampleQuestion & { highlight?: boolean };
