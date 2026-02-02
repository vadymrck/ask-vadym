import { test } from "@playwright/test";
import { MainChatPage } from "~pom/MainChatPage.pom";
import { GREETING_MARKERS } from "~fixtures/test-data";

test.describe("Main Chat Page", () => {
  let mainChatPage: MainChatPage;

  test.beforeEach(async ({ page }) => {
    mainChatPage = new MainChatPage(page);
    await mainChatPage.goto();
  });

  test("Chatbot responds to greeting", async () => {
    await test.step("Input chat message", async () => {
      await mainChatPage.toHaveInputFocusInsideChat();
      await mainChatPage.toHaveSubmitButtonBeDisabled();
      await mainChatPage.fillChatInput("Hello");
      await mainChatPage.clickSubmit();
      await mainChatPage.toHaveUserMessage("Hello");
    });

    await test.step("Verify assistant response", async () => {
      await mainChatPage.toHaveAssistantMessageContaining(GREETING_MARKERS);
      await mainChatPage.toHaveInputFocusInsideChat();
      await mainChatPage.toHaveSubmitButtonBeDisabled();
    });
  });
});
