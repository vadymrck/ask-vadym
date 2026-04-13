export default function Hero() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl sm:text-5xl font-bold text-[var(--text-primary)] mb-4">
          I help teams build reliable software through test automation and QA strategy
        </h1>
        <p className="text-xl sm:text-2xl text-[var(--text-secondary)] mb-8">
          Senior QA Engineer with 10+ years experience (Playwright, APIs, CI/CD)
        </p>
        <button
          type="button"
          data-cal-link="ask-vadym/20min"
          data-testid="book-meeting-button"
          className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 cursor-pointer mb-12"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Book Intro Call
        </button>
        <p className="text-base text-[var(--text-secondary)] mb-6">
          This is an interactive QA portfolio — ask about my experience, projects, or skills.
        </p>
      </div>
    </section>
  );
}
