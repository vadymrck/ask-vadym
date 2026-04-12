# Frontend E2E Tests

Playwright-based end-to-end tests for the Ask Vadym portfolio chatbot frontend.

## Structure

```
tests/
├── specs/           # Test specification files
│   ├── main-chat-page.spec.ts
│   └── book-call.spec.ts
├── pom/             # Page Object Model files
│   └── MainChatPage.pom.ts
├── support/         # Shared utilities and base classes
│   ├── BasePage.pom.ts
│   ├── config.ts
│   ├── decorators.ts
│   └── index.ts
└── fixtures/        # Test data and constants
    └── test-data.ts
```

## Running Tests

### Locally

```bash
cd frontend

# Run all tests (headless)
npm test

# Run with UI mode
npm run test:ui

# Run with browser visible
npm run test:headed

# View HTML report
npm run test:report
```

### In CI/CD

Tests run automatically on:
- Pull requests that modify `frontend/**` files
- Direct pushes to `main` branch that modify `frontend/**` files

**Backend:** Tests use production backend API (ask-vadym-production.up.railway.app)

## Test Coverage

### Current Tests

**main-chat-page.spec.ts** - Smoke test for chatbot functionality
- Verifies chat input focus on page load
- Verifies send button is disabled when input is empty
- Sends "Hello" message
- Verifies user message appears
- Verifies assistant responds with greeting-related content
- Verifies focus returns to input after response

## Page Object Model (POM)

### MainChatPage

**Locators:**
- Dynamic locator methods (private, synchronous)
- Returns `Locator` objects

**Actions:**
- User interactions: `goto()`, `fillChatInput()`, `clickSubmit()`, etc.
- Decorated with `@step()` for test reporting
- Public async methods

**Assertions:**
- Verification methods: `toHaveHeroTitle()`, `toHaveUserMessage()`, etc.
- Decorated with `@step()` for test reporting
- Public async methods

## Test Data

**GREETING_MARKERS** - Expected terms in greeting responses:
- `['hi', 'hello', 'help', 'vadym']`

**PORTFOLIO_MARKERS** - Expected terms in portfolio-related responses:
- `['qa', 'quality', 'testing', 'playwright', 'automation', 'istqb', 'vadym']`

## Non-Deterministic Response Handling

Since the chatbot uses OpenAI's GPT model, responses are non-deterministic. Tests use a marker-based approach:

```typescript
await mainChatPage.toHaveAssistantMessageContaining(GREETING_MARKERS);
```

This verifies the response contains **at least one** of the expected markers (case-insensitive), allowing flexibility while ensuring relevant responses.

## Configuration

### playwright.config.ts

- **testDir:** `./tests/specs`
- **baseURL:** `http://localhost:3000`
- **webServer:** Automatically starts Next.js dev server
- **browser:** Chromium (headless in CI)
- **retries:** 2 retries in CI, 0 locally
- **trace:** Captured on first retry

### Path Aliases (tsconfig.json)

- `~pom/*` → `tests/pom/*`
- `~support/*` → `tests/support/*`
- `~fixtures/*` → `tests/fixtures/*`

## Best Practices

### @step() Decorator Usage

**DO:**
- Use `@step()` on async class methods in POM files
- Use for reusable actions and assertions

**DON'T:**
- Use on synchronous methods
- Use on private locator methods
- Wrap `@step()`-decorated methods with `test.step()` in tests (causes double steps)

### Example

```typescript
// In POM - use @step for generic actions
@step()
async clickSubmit() {
  await this.locateChatSubmitButton().click();
}

// In test - call directly (no wrapper needed)
await mainChatPage.clickSubmit();
```

### test.step() Usage in Specs

`test.step()` groups logically related operations for readability and reporting. Use it only when a step represents a **meaningful operation** — not just to wrap a single assertion.

**Rules:**
- Assertions belong to the step of the action they verify — not in their own standalone step
- Only use `test.step()` when grouping 2+ meaningful operations
- A step that contains only assertions with no action is a smell — merge it with the preceding action step
- Step names should describe **what is happening**, not just "Verify X"

**DON'T — assertion as its own step:**
```typescript
await test.step("Click button", async () => {
  await page.clickBookCallButton();
});

await test.step("Verify dialog is displayed", async () => {  // ← wrong
  await page.toHaveCalPopupVisible();
});
```

**DO — assertion belongs to the action step:**
```typescript
await test.step("Click button and verify dialog opens", async () => {
  await page.clickBookCallButton();
  await page.toHaveCalPopupVisible();  // ← belongs here
});

await test.step("Close dialog and verify it is dismissed", async () => {
  await page.closeCalPopup();
  await page.toHaveCalPopupClosed();  // ← belongs here
});
```

## CI/CD Integration

### GitHub Actions Workflow

**File:** `.github/workflows/frontend-tests.yml`

**Triggers:**
- PR to main (frontend changes only)
- Push to main (frontend changes only)

**Environment:**
- Ubuntu latest
- Node.js 18
- Chromium browser
- Production backend API

**Artifacts on Failure:**
- HTML test report
- Screenshots
- Trace files

**Timeout:** 10 minutes

## Adding New Tests

1. Create test spec in `tests/specs/`
2. Add/update POM methods in appropriate POM file
3. Add test data constants to `tests/fixtures/test-data.ts` if needed
4. Follow naming conventions:
   - Locators: `locateX()`
   - Actions: `clickX()`, `fillX()`, `selectX()`
   - Assertions: `toHaveX()`, `toBeX()`, `notToHaveX()`

## Troubleshooting

### Tests fail locally but pass in CI
- Check `NEXT_PUBLIC_API_URL` environment variable
- Ensure backend is running (dev server or production)

### Tests timeout
- Check network connectivity to backend
- Verify backend is responding (check Railway/production status)
- Increase timeout in `playwright.config.ts` if needed

### Flaky tests
- Add explicit waits for dynamic content
- Use Playwright's auto-waiting assertions
- Avoid hardcoded timeouts (`page.waitForTimeout()`)

## Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Page Object Model Pattern](https://playwright.dev/docs/pom)
