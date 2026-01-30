"""
Integration tests for chat endpoint.

These tests verify the chat endpoint functionality with real OpenAI API calls.

Run with: pytest tests/test_chat.py -v
"""

import pytest
from fastapi.testclient import TestClient

from tests.config import MAX_MESSAGE_LENGTH, PORTFOLIO_MARKERS
from tests.helpers import ask_question, assert_portfolio_response, get_response_text


@pytest.mark.smoke
def test_chat_returns_portfolio_content(test_client: TestClient):
    """Chat should return relevant portfolio content about QA experience."""
    response = ask_question(test_client, "Hi")

    assert response.status_code == 200
    assert response.headers["content-type"] == "text/event-stream; charset=utf-8"

    message = get_response_text(response)
    assert_portfolio_response(message, PORTFOLIO_MARKERS)


@pytest.mark.smoke
def test_chat_validates_message_length(test_client: TestClient):
    """Chat should enforce max message length."""
    max_valid = "x" * MAX_MESSAGE_LENGTH
    response = ask_question(test_client, max_valid)
    assert response.status_code == 200

    over_limit = "x" * (MAX_MESSAGE_LENGTH + 1)
    response = ask_question(test_client, over_limit)
    assert response.status_code == 422


@pytest.mark.smoke
def test_chat_redirects_offtopic_questions(test_client: TestClient):
    """Chat should politely decline off-topic questions."""
    response = ask_question(test_client, "What is the capital of France?")

    assert response.status_code == 200

    message = get_response_text(response)
    message_lower = message.lower()

    # Should NOT contain the answer to the off-topic question
    assert "paris" not in message_lower, "Should not answer off-topic geography question"

    # Should indicate it's outside scope or redirect to QA topics
    decline_indicators = [
        "outside my",
        "not about",
        "focus on",
        "ask about my",
        "instead",
        "can't help with that",
    ]

    has_decline = any(indicator in message_lower for indicator in decline_indicators)
    assert has_decline, f"Response should decline off-topic question. Got: {message}"
