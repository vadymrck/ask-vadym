"use client";

import { useState, useRef, useEffect, useCallback, FormEvent } from "react";
import { config } from "@/lib/config";
import { Message, StreamChunk } from "@/types/chat";
import ExampleQuestions from "./ExampleQuestions";

export default function ChatInterface() {
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
      const response = await fetch(`${config.apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.content }),
      });

      if (response.status === 429) {
        throw new Error("Too many requests. Please wait a moment and try again.");
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
            const data = line.slice(6);
            if (data === "[DONE]") continue;

            try {
              const chunk: StreamChunk = JSON.parse(data);
              if (chunk.error) {
                throw new Error(chunk.error);
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
            } catch {
              // Skip invalid JSON lines
            }
          }
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred.";
      setError(errorMessage);
      setMessages((prev) =>
        prev.filter((msg) => msg.id !== assistantMessageId)
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleQuestion = (question: string) => {
    setInput(question);
    inputRef.current?.focus();
  };

  return (
    <section
      id="chat"
      className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-8"
    >
      <div className="bg-[var(--surface)] rounded-xl shadow-lg overflow-hidden border border-[var(--border)]">
        {/* Chat header */}
        <div className="px-6 py-4 border-b border-[var(--border)] bg-gray-50">
          <h2 className="text-lg font-semibold text-[var(--text-primary)]">
            Chat with Vadym
          </h2>
          <p className="text-sm text-[var(--text-secondary)]">
            Ask about experience, skills, or approach to QA
          </p>
        </div>

        {/* Messages area */}
        <div
          className="h-96 overflow-y-auto p-6 space-y-4 chat-scrollbar"
          data-testid="chat-messages"
        >
          {messages.length === 0 && (
            <div className="text-center py-8">
              <p className="text-[var(--text-secondary)] mb-4">
                No messages yet. Try one of these questions:
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
                {message.content || (
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
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={isLoading}
              maxLength={1000}
              data-testid="chat-input"
              className="flex-1 px-4 py-3 bg-white border border-[var(--border)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              data-testid="chat-submit"
              className="px-6 py-3 bg-[var(--primary)] hover:bg-[var(--primary-hover)] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-2"
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
                "Send"
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
