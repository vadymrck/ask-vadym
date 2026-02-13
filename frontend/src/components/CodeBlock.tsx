"use client";

import { useState } from "react";

const COLLAPSED_HEIGHT = 160;

type CodeBlockProps = {
  code: string;
};

export default function CodeBlock({ code }: CodeBlockProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative mb-6">
      <div className="prose-pre overflow-hidden transition-all duration-300"
        style={{ maxHeight: expanded ? "none" : COLLAPSED_HEIGHT }}
      >
        <pre className="overflow-x-auto">
          <code>{code}</code>
        </pre>

        {!expanded && (
          <div className="absolute left-0 right-0 h-8 bg-gradient-to-t from-[var(--assistant-message-bg)] to-transparent pointer-events-none" style={{ bottom: "32px" }} />
        )}
      </div>

      <div className="flex justify-start pl-4 -mt-[32px]">
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="flex items-center gap-1 text-sm font-semibold text-white bg-[var(--primary)] hover:bg-[var(--primary-hover)] px-3 py-1 rounded-full transition-colors cursor-pointer"
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
          {expanded ? "Collapse" : "Expand"}
        </button>
      </div>
    </div>
  );
}
