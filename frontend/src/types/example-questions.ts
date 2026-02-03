export const EXAMPLE_QUESTIONS = [
  {
    label: "Experience",
    question: "What's your experience?",
  },
  {
    label: "AI Testing",
    question: "How do you approach testing AI systems?",
  },
  {
    label: "Contacts",
    question: "How can I contact you?",
  },
  {
    label: "Skills",
    question: "What QA skills do you have?",
  },
  {
    label: "Test Automation",
    question: "What test automation tools do you use?",
  },
] as const;

export type ExampleQuestion = typeof EXAMPLE_QUESTIONS[number];
export type ExampleQuestionLabel = typeof EXAMPLE_QUESTIONS[number]['label'];
