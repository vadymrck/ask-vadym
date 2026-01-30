# Backend API Tests

Integration and validation tests for the Ask Vadym portfolio chatbot API.

## Structure

```
tests/
├── config.py            # Test configuration (MAX_MESSAGE_LENGTH, PORTFOLIO_MARKERS)
├── conftest.py          # Pytest fixtures (test_client)
├── test_chat.py         # 2 smoke tests (for CI)
├── test_validation.py   # 4 validation tests
└── helpers/
    ├── api.py           # ask_question(), get_response_text()
    └── assertions.py    # assert_portfolio_response()
```

## Tests

### Smoke Tests (`test_chat.py`) - For CI ✅

**2 tests using real OpenAI API:**

1. `test_chat_returns_portfolio_content` - Verifies streaming response with portfolio content
2. `test_chat_validates_message_length` - Tests 500 character limit enforcement

### Validation Tests (`test_validation.py`) - Optional

**4 tests without OpenAI API:**

1. `test_chat_rejects_invalid_payloads` - Validates input rejection (4 scenarios)

## Running Tests

### CI Pipeline (recommended)
```bash
cd backend
source venv/bin/activate
pytest tests/test_chat.py -v
```

**Result:** `2 passed in ~3s`

### All Tests Locally
```bash
pytest -v
```

**Result:** `6 passed in ~3s`

### Specific Test File
```bash
pytest tests/test_validation.py -v
```

## CI Integration

For your CI pipeline, use:

```bash
pytest tests/test_chat.py -v
```

**Benefits:**
- ✅ Tests real OpenAI integration
- ✅ Validates portfolio content
- ✅ Tests boundary conditions
- ✅ Fast execution (~3 seconds)
- ✅ Minimal API costs (2 OpenAI calls)

## Requirements

- `OPENAI_API_KEY` must be set in `.env` file
- Smoke tests make real OpenAI API calls
- Tests will fail if API key is missing
