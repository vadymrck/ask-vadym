import { expect, Locator, Page } from "@playwright/test";
import { step } from "~support/decorators";
import { BasePage } from "~support/BasePage.pom";
import type {
  ExampleQuestionLabel,
  ExampleQuestionText,
} from "~fixtures/example-questions";

export class MainChatPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators

  private locateHeroTitle(): Locator {
    return this.page.getByRole("heading", { name: "Vadym Marochok" });
  }

  private locateBookCallButton(): Locator {
    return this.page.getByTestId("book-call-button");
  }

  private locateBookCallMobileButton(): Locator {
    return this.page.getByTestId("book-call-button-mobile");
  }

  private locateMobileMenuToggle(): Locator {
    return this.page.getByTestId("mobile-menu-toggle");
  }

  private locateChatInput(): Locator {
    return this.page.getByTestId("chat-input");
  }

  private locateChatSubmitButton(): Locator {
    return this.page.getByTestId("chat-submit");
  }

  private locateMessagesContainer(): Locator {
    return this.page.getByTestId("chat-messages");
  }

  private locateUserMessage(): Locator {
    return this.page.getByTestId("message-user");
  }

  private locateAssistantMessage(): Locator {
    return this.page.getByTestId("message-assistant");
  }

  private locateExampleQuestion(text: string): Locator {
    return this.page.getByTestId("example-question").filter({ hasText: text });
  }

  private locateLoadingIndicator(): Locator {
    return this.page.getByTestId("loading-indicator");
  }

  private locateErrorMessage(): Locator {
    return this.page.getByTestId("error-message");
  }

  // Actions

  @step()
  async goto() {
    await this.navigate("/");
    await this.waitForPageReady();
    await this.toHaveHeroTitle("Vadym Marochok");
  }

  @step()
  async openMobileMenu() {
    await this.locateMobileMenuToggle().click();
  }

  @step()
  async fillChatInput(message: string) {
    await this.locateChatInput().fill(message);
  }

  @step()
  async clickSubmit() {
    await this.toHaveSubmitButtonBeEnabled();
    await this.locateChatSubmitButton().click();
  }

  @step()
  async submitWithEnter() {
    await this.locateChatInput().press("Enter");
  }

  @step()
  async clickExampleQuestion(label: ExampleQuestionLabel) {
    await this.locateExampleQuestion(label).click();
  }

  // Assertions

  @step()
  async toHaveHeroTitle(expectedText: string) {
    const heroTitle = this.locateHeroTitle();
    await expect(
      heroTitle,
      `Hero title should contain "${expectedText}"`,
    ).toBeVisible();
    await expect(
      heroTitle,
      `Hero title should match "${expectedText}"`,
    ).toHaveText(expectedText);
  }

  @step()
  async notToHaveHeroTitle() {
    await expect(
      this.locateHeroTitle(),
      "Hero title should not be visible",
    ).toBeHidden();
  }

  @step()
  async toHaveChatInput() {
    await expect(
      this.locateChatInput(),
      "Chat input should be visible",
    ).toBeVisible();
  }

  @step()
  async toHaveUserMessage(text: string) {
    const userMessage = this.locateUserMessage();
    await expect(
      userMessage,
      `User message should contain "${text}"`,
    ).toContainText(text);
  }

  @step()
  async toHaveAssistantMessage() {
    const assistantMessage = this.locateAssistantMessage();
    await expect(
      assistantMessage,
      "Assistant message should be visible",
    ).toBeVisible();
  }

  @step()
  async toHaveAssistantMessageContaining(expectedMarkers: string[]) {
    const assistantMessage = this.locateAssistantMessage();
    await expect(
      assistantMessage,
      "Assistant message should be visible",
    ).toBeVisible();

    const loadingIndicator = this.locateLoadingIndicator();

    await this.page.waitForFunction(
      ({ msgElement, loadingElement }) => {
        const text = msgElement?.textContent || "";
        const hasMinLength = text.trim().length > 10;
        const loadingFinished =
          !loadingElement ||
          (loadingElement instanceof HTMLElement &&
            loadingElement.offsetParent === null) ||
          window.getComputedStyle(loadingElement).display === "none";
        return hasMinLength && loadingFinished;
      },
      {
        msgElement: await assistantMessage.elementHandle(),
        loadingElement: await loadingIndicator
          .elementHandle()
          .catch(() => null),
      },
      { timeout: 30000 },
    );

    await this.page.waitForTimeout(500);

    const messageText = await assistantMessage.textContent();
    const messageTextLower = messageText?.toLowerCase() || "";

    const found = expectedMarkers.some((marker) =>
      messageTextLower.includes(marker.toLowerCase()),
    );

    if (!found) {
      throw new Error(
        `Assistant message should contain at least one of: ${expectedMarkers.join(", ")}. Got: ${messageText}`,
      );
    }
  }

  @step()
  async toHaveLoadingIndicator() {
    const loadingIndicator = this.locateLoadingIndicator();
    await expect(
      loadingIndicator,
      "Loading indicator should be visible",
    ).toBeVisible();
  }

  @step()
  async toHaveErrorMessage(errorText: string) {
    const errorMessage = this.locateErrorMessage();
    await expect(
      errorMessage,
      `Error message should contain "${errorText}"`,
    ).toContainText(errorText);
  }

  @step()
  async toHaveInputFocusInsideChat() {
    const chatInput = this.locateChatInput();
    await expect(chatInput, "Chat input should be focused").toBeFocused();
  }

  @step()
  async toHaveSubmitButtonBeDisabled() {
    const submitButton = this.locateChatSubmitButton();
    await expect(submitButton, "Send button should be disabled").toBeDisabled();
  }

  @step()
  async toHaveSubmitButtonBeEnabled() {
    const submitButton = this.locateChatSubmitButton();
    await expect(submitButton, "Send button should be enabled").toBeEnabled();
  }

  @step()
  async toHavePlaceholderText(expectedPlaceholderText: string) {
    const chatInput = this.locateChatInput();
    await expect(
      chatInput,
      `Chat input should have placeholder "${expectedPlaceholderText}"`,
    ).toHaveAttribute("placeholder", expectedPlaceholderText);
  }

  @step()
  async toHaveExampleChatInput(expectedQuestion: ExampleQuestionText) {
    const chatInput = this.locateChatInput();
    await expect(
      chatInput,
      `Chat input should have value "${expectedQuestion}"`,
    ).toHaveValue(expectedQuestion);
  }

  @step()
  async toHaveBookCallButtonVisible() {
    const button = this.locateBookCallButton();
    await expect(button, "Book call button should be visible").toBeVisible();
    await expect(button, "Book call button should have cal link").toHaveAttribute("data-cal-link", "ask-vadym/20min");
  }

  @step()
  async clickBookCallButton() {
    await this.locateBookCallButton().click();
  }

  @step()
  async clickBookCallMobileButton() {
    await this.locateBookCallMobileButton().click();
  }

  @step()
  async toHaveBookCallMobileButtonVisible() {
    const button = this.locateBookCallMobileButton();
    await expect(button, "Mobile book call button should be visible").toBeVisible();
    await expect(button, "Mobile book call button should have cal link").toHaveAttribute("data-cal-link", "ask-vadym/20min");
  }

  @step()
  async toHaveCalPopupVisible() {
    await expect(
      this.page.locator("cal-modal-box"),
      "Cal.com booking popup should be visible"
    ).toBeVisible({ timeout: 10000 });
  }

  @step()
  async closeCalPopup() {
    await this.page.locator('cal-modal-box button[aria-label="Close"]').click();
  }

  @step()
  async toHaveCalPopupClosed() {
    await expect(
      this.page.locator("cal-modal-box"),
      "Cal.com booking popup should be closed"
    ).not.toBeVisible({ timeout: 5000 });
  }

  @step()
  async toHaveAssistantBookingLink() {
    const assistantMessage = this.locateAssistantMessage();
    await expect(
      assistantMessage,
      "Assistant booking response should be visible"
    ).toBeVisible({ timeout: 30000 });

    await this.page.waitForFunction(
      (el) => (el?.textContent?.trim().length ?? 0) > 10,
      await assistantMessage.elementHandle(),
      { timeout: 30000 }
    );

    const bookingLink = assistantMessage.locator('a[href*="cal.com/ask-vadym"]', { hasText: "Book a QA Intro Call" });
    await expect(
      bookingLink,
      'Assistant response should contain "Book a QA Intro Call" link to cal.com/ask-vadym'
    ).toBeVisible({ timeout: 5000 });
    await expect(
      bookingLink,
      "Booking link should point to cal.com/ask-vadym/20min"
    ).toHaveAttribute("href", /cal\.com\/ask-vadym\/20min/);
  }
}
