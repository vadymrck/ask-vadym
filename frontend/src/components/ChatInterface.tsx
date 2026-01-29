"use client";

import { useState, useRef, useEffect, useCallback, FormEvent, ReactNode } from "react";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { config, MAX_MESSAGE_LENGTH } from "@/lib/config";
import { Message, StreamChunk } from "@/types/chat";
import ExampleQuestions from "./ExampleQuestions";

interface ChatInterfaceProps {
  onClose: () => void;
}

/**
 * Renders user message with clickable links and emails.
 */
function renderUserMessage(content: string): ReactNode {
  const linkRegex = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<]+)|([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;

  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyIndex = 0;

  while ((match = linkRegex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(content.slice(lastIndex, match.index));
    }

    const linkClass = "underline hover:opacity-80";

    if (match[1] && match[2]) {
      parts.push(
        <a key={keyIndex++} href={match[2]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {match[1]}
        </a>
      );
    } else if (match[3]) {
      parts.push(
        <a key={keyIndex++} href={match[3]} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {match[3]}
        </a>
      );
    } else if (match[4]) {
      parts.push(
        <a key={keyIndex++} href={`mailto:${match[4]}`} className={linkClass}>
          {match[4]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(content.slice(lastIndex));
  }

  return parts.length > 0 ? parts : content;
}

/**
 * Renders assistant message with full markdown support.
 */
function renderAssistantMessage(content: string): ReactNode {
  // Fix markdown lists: normalize various line break patterns
  // Handle "1.\nText", "- \nText", "-\nText", etc.
  let fixedContent = content
    .replace(/^(\d+)\.\s*\n+/gm, "$1. ")      // "1.\n" -> "1. "
    .replace(/^([-*])\s*\n+/gm, "$1 ")         // "-\n" -> "- "
    .replace(/\n([-*])\s*\n+/g, "\n$1 ")       // "\n-\n" -> "\n- "
    .replace(/\n(\d+)\.\s*\n+/g, "\n$1. ");    // "\n1.\n" -> "\n1. "

  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--primary)] underline hover:text-[var(--primary-hover)]"
          >
            {children}
          </a>
        ),
        p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
        ul: ({ children }) => <ul className="list-disc list-inside mb-1 last:mb-0">{children}</ul>,
        ol: ({ children }) => <ol className="list-decimal list-inside mb-1 last:mb-0">{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
      }}
    >
      {fixedContent}
    </ReactMarkdown>
  );
}

export default function ChatInterface({ onClose }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Autofocus input when chat opens
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Lock body scroll when mouse is inside chat messages area
  const handleMouseEnterMessages = useCallback(() => {
    document.body.style.overflow = "hidden";
  }, []);

  const handleMouseLeaveMessages = useCallback(() => {
    document.body.style.overflow = "";
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const generateId = () => Math.random().toString(36).substring(2, 15);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: generateId(),
      role: "user",
      content: input.trim(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setError(null);

    const assistantMessageId = generateId();
    setMessages((prev) => [
      ...prev,
      { id: assistantMessageId, role: "assistant", content: "" },
    ]);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(`${config.apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (response.status === 429) {
        throw new Error("Whoa, you're curious! 🚀 You've hit the chat limit for this hour. Grab a coffee ☕ and come back little later - I'll be here ready then to talk again!");
      }

      if (!response.ok) {
        throw new Error("Failed to get response. Please try again.");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("Unable to read response stream.");
      }

      const decoder = new TextDecoder();
      let accumulatedContent = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const text = decoder.decode(value, { stream: true });
        const lines = text.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6).trim();
            if (data === "[DONE]" || data === "") continue;

            let chunk: StreamChunk;
            try {
              chunk = JSON.parse(data);
            } catch {
              // Skip invalid JSON lines
              continue;
            }

            if (chunk.error) {
              throw new Error("Service temporarily unavailable. Please try again later.");
            }
            if (chunk.content) {
              accumulatedContent += chunk.content;
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === assistantMessageId
                    ? { ...msg, content: accumulatedContent }
                    : msg
                )
              );
            }
          }
        }
      }
    } catch (err) {
      let errorMessage = "An unexpected error occurred.";
      if (err instanceof Error) {
        if (err.name === "AbortError") {
          errorMessage = "Request timed out. Please try again.";
        } else {
          errorMessage = err.message;
        }
      }
      setError(errorMessage);
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== assistantMessageId)
      );
    } finally {
      setIsLoading(false);
      // Delay focus to ensure DOM is updated after loading state changes
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  };

  const handleExampleQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <section
      id="chat"
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-8"
    >
      <div className="bg-[var(--surface)] rounded-xl shadow-lg overflow-hidden border border-[var(--border)]">
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-[var(--border)] bg-gray-50 flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Image
              src="/avatar.png"
              alt="Vadym Avatar"
              width={48}
              height={48}
              className="rounded-full"
            />
            <div>
              <h2 className="text-lg font-semibold text-[var(--text-primary)]">
                Chat with Vadym
              </h2>
              <p className="text-sm text-[var(--text-secondary)]">
                Ask about experience, skills, or approach to Quality Assurance.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            data-testid="chat-close"
            className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
            aria-label="Close chat"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div
          className="h-96 overflow-y-auto p-6 space-y-4 chat-scrollbar"
          data-testid="chat-messages"
          onMouseEnter={handleMouseEnterMessages}
          onMouseLeave={handleMouseLeaveMessages}
        >
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[var(--text-secondary)] mb-4">
                Ask your questions or try one of these prompts below:
              </p>
              <ExampleQuestions onQuestionClick={handleExampleQuestion} />
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
              data-testid={
                message.role === "user" ? "message-user" : "message-assistant"
              }
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                  message.role === "user"
                    ? "bg-[var(--user-message-bg)] text-white rounded-br-md"
                    : "bg-[var(--assistant-message-bg)] text-[var(--text-primary)] rounded-bl-md"
                }`}
              >
                {message.content ? (
                  message.role === "user"
                    ? renderUserMessage(message.content)
                    : renderAssistantMessage(message.content)
                ) : (
                  <span
                    className="inline-flex items-center"
                    data-testid="loading-indicator"
                  >
                    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce mr-1"
                      style={{ animationDelay: "0.1s" }}
                    ></span>
                    <span
                      className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {error && (
            <div
              className="flex justify-center"
              data-testid="error-message"
            >
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg max-w-[80%]">
                {error}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 border-t border-[var(--border)] bg-gray-50"
        >
          <div className="flex items-center space-x-3">
            <div className="flex-1 relative">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                maxLength={MAX_MESSAGE_LENGTH}
                data-testid="chat-input"
                className="w-full px-4 py-3 pr-16 bg-white border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
              {input.length > 0 && (
                <span
                  className={`absolute right-3 top-1/2 -translate-y-1/2 text-xs ${
                    input.length >= MAX_MESSAGE_LENGTH
                      ? "text-red-500"
                      : "text-[var(--text-secondary)]"
                  }`}
                >
                  {input.length}/{MAX_MESSAGE_LENGTH}
                </span>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              data-testid="chat-submit"
              className="w-10 h-10 flex items-center justify-center bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white rounded-full transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2 cursor-pointer"
              aria-label="Send message"
            >
              {isLoading ? (
                <svg
                  className="w-5 h-5 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 10l7-7m0 0l7 7m-7-7v18"
                  />
                </svg>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
