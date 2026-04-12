export const EXAMPLE_QUESTIONS = [
  {
    label: "Experience",
    question: "What's your experience?",
  },
  {
    label: "Book Intro Call",
    question: "Book a short 20-minute intro call to discuss QA, automation, or opportunities.",
    highlight: true,
  },
  {
    label: "Skills",
    question: "What QA skills do you have?",
  },
  {
    label: "Contacts",
    question: "How can I contact you?",
  },
  {
    label: "Test Automation",
    question: "What test automation tools do you use?",
  },
] as const;

export type ExampleQuestion = typeof EXAMPLE_QUESTIONS[number];
export type ExampleQuestionLabel = typeof EXAMPLE_QUESTIONS[number]['label'];
export type HighlightedExampleQuestion = ExampleQuestion & { highlight?: boolean };
