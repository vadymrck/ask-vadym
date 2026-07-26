"""Test configuration for Ask Vadym API tests."""

from app.api.chat import MAX_MESSAGE_LENGTH  # noqa: F401

# Expected response markers for portfolio chatbot.
#
# This is a liveness check, not a positioning statement: it asks whether the
# bot still answers as Vadym's portfolio assistant at all. Keep the list broad
# so a reworded greeting doesn't trip the daily monitor. QA terms stay because
# the bot still legitimately mentions its quality engineering background.
PORTFOLIO_MARKERS = [
    # Current AI automation positioning
    "vadym",
    "automation",
    "ai",
    "workflow",
    "engineer",
    "llm",
    "agent",
    # Supporting quality engineering background
    "qa",
    "quality",
    "testing",
    "playwright",
]
