interface ExampleQuestionsProps {
  onQuestionClick: (question: string) => void;
}

const EXAMPLE_QUESTIONS = [
  {
    label: "Experience",
    question: "What's your testing experience?",
  },
  {
    label: "Skills",
    question: "What test automation tools do you use?",
  },
  {
    label: "Playwright",
    question: "Tell me about your Playwright experience",
  },
  {
    label: "AI Testing",
    question: "How do you approach testing AI systems?",
  },
  {
    label: "Approach",
    question: "What's your QA philosophy?",
  },
];

export default function ExampleQuestions({
  onQuestionClick,
}: ExampleQuestionsProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 mb-6">
      {EXAMPLE_QUESTIONS.map((item) => (
        <button
          key={item.label}
          type="button"
          onClick={() => onQuestionClick(item.question)}
          data-testid="example-question"
          className="px-4 py-2 text-sm font-medium text-[var(--primary)] bg-blue-50 hover:bg-blue-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
