import { test } from "@playwright/test";
import { MainChatPage } from "~pom/MainChatPage.pom";

test.describe("Book a QA Intro Call", () => {
  let mainChatPage: MainChatPage;

  test.beforeEach(async ({ page }) => {
    mainChatPage = new MainChatPage(page);
    await mainChatPage.goto();
  });

  test("Desktop: header button opens and closes booking dialog", async () => {
    await test.step("Click Book a QA Intro Call in header", async () => {
      await mainChatPage.toHaveBookCallButtonVisible();
      await mainChatPage.clickBookCallButton();
      await mainChatPage.toHaveCalPopupVisible();
    });

    await test.step("Close dialog and verify it is dismissed", async () => {
      await mainChatPage.closeCalPopup();
      await mainChatPage.toHaveCalPopupClosed();
    });
  });

  test("Mobile: burger menu button opens and closes booking dialog", async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });

    await test.step("Open mobile menu and click Book a QA Intro Call", async () => {
      await mainChatPage.openMobileMenu();
      await mainChatPage.toHaveBookCallMobileButtonVisible();
      await mainChatPage.clickBookCallMobileButton();
    });

    await test.step("Verify Cal.com booking dialog is displayed", async () => {
      await mainChatPage.toHaveCalPopupVisible();
    });

    await test.step("Close dialog and verify it is dismissed", async () => {
      await mainChatPage.closeCalPopup();
      await mainChatPage.toHaveCalPopupClosed();
    });
  });

  test("Book Intro Call chip submits booking request and bot replies with cal.com link", async () => {
    await test.step("Click chip and verify chatbox prefilled", async () => {
      await mainChatPage.clickExampleQuestion("Book Intro Call");
      await mainChatPage.toHaveExampleChatInput(
        "Book a short 20-minute intro call to discuss QA, automation, or opportunities.",
      );
      await mainChatPage.toHaveSubmitButtonBeEnabled();
    });

    await test.step("Submit and verify bot responds with booking link", async () => {
      await mainChatPage.clickSubmit();
      await mainChatPage.toHaveAssistantBookingLink();
    });
  });
});
