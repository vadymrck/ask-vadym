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
