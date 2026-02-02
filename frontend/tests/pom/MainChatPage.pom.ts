import { expect, Locator, Page } from '@playwright/test';
import { step } from '~support/decorators';
import { BasePage } from '~support/BasePage.pom';

export class MainChatPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  // Locators

  private locateHeroTitle(): Locator {
    return this.page.getByRole('heading', { name: "Hi! I'm Vadym Marochok" });
  }

  private locateChatInput(): Locator {
    return this.page.getByTestId('chat-input');
  }

  private locateChatSubmitButton(): Locator {
    return this.page.getByTestId('chat-submit');
  }

  private locateMessagesContainer(): Locator {
    return this.page.getByTestId('chat-messages');
  }

  private locateUserMessage(): Locator {
    return this.page.getByTestId('message-user');
  }

  private locateAssistantMessage(): Locator {
    return this.page.getByTestId('message-assistant');
  }

  private locateExampleQuestion(text: string): Locator {
    return this.page.getByTestId('example-question').filter({ hasText: text });
  }

  private locateLoadingIndicator(): Locator {
    return this.page.getByTestId('loading-indicator');
  }

  private locateErrorMessage(): Locator {
    return this.page.getByTestId('error-message');
  }

  // Actions

  @step()
  async goto() {
    await this.navigate('/');
    await this.waitForPageReady();
    await this.toHaveHeroTitle("Hi! I'm Vadym Marochok");
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
  async clickExampleQuestion(question: string) {
    await this.locateExampleQuestion(question).click();
  }

  // Assertions

  @step()
  async toHaveHeroTitle(expectedText: string) {
    const heroTitle = this.locateHeroTitle();
    await expect(heroTitle, `Hero title should contain "${expectedText}"`).toBeVisible();
    await expect(heroTitle, `Hero title should match "${expectedText}"`).toHaveText(expectedText);
  }

  @step()
  async toHaveChatInput() {
    await expect(this.locateChatInput(), 'Chat input should be visible').toBeVisible();
  }

  @step()
  async toHaveUserMessage(text: string) {
    const userMessage = this.locateUserMessage();
    await expect(userMessage, `User message should contain "${text}"`).toContainText(text);
  }

  @step()
  async toHaveAssistantMessage() {
    const assistantMessage = this.locateAssistantMessage();
    await expect(assistantMessage, 'Assistant message should be visible').toBeVisible();
  }

  @step()
  async toHaveAssistantMessageContaining(expectedMarkers: string[]) {
    const assistantMessage = this.locateAssistantMessage();
    await expect(assistantMessage, 'Assistant message should be visible').toBeVisible();

    await this.page.waitForFunction(
      (element) => {
        const text = element?.textContent || '';
        return text.trim().length > 10;
      },
      await assistantMessage.elementHandle(),
      { timeout: 30000 }
    );

    const messageText = await assistantMessage.textContent();
    const messageTextLower = messageText?.toLowerCase() || '';

    const found = expectedMarkers.some(marker => messageTextLower.includes(marker.toLowerCase()));

    if (!found) {
      throw new Error(
        `Assistant message should contain at least one of: ${expectedMarkers.join(', ')}. Got: ${messageText}`
      );
    }
  }

  @step()
  async notToHaveHeroTitle() {
    await expect(this.locateHeroTitle(), 'Hero title should not be visible').toBeHidden();
  }

  @step()
  async toHaveLoadingIndicator() {
    const loadingIndicator = this.locateLoadingIndicator();
    await expect(loadingIndicator, 'Loading indicator should be visible').toBeVisible();
  }

  @step()
  async toHaveErrorMessage(errorText: string) {
    const errorMessage = this.locateErrorMessage();
    await expect(errorMessage, `Error message should contain "${errorText}"`).toContainText(errorText);
  }

  @step()
  async toHaveInputFocusInsideChat() {
    const chatInput = this.locateChatInput();
    await expect(chatInput, 'Chat input should be focused').toBeFocused();
  }

  @step()
  async toHaveSubmitButtonBeDisabled() {
    const submitButton = this.locateChatSubmitButton();
    await expect(submitButton, 'Send button should be disabled').toBeDisabled();
  }

  @step()
  async toHaveSubmitButtonBeEnabled() {
    const submitButton = this.locateChatSubmitButton();
    await expect(submitButton, 'Send button should be enabled').toBeEnabled();
  }
}
