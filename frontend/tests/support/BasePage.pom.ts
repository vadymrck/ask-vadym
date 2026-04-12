import { Page } from '@playwright/test';
import { step } from './decorators';
import config from './config';

export class BasePage {
  constructor(protected readonly page: Page) {}

  @step()
  async navigate(path: string) {
    await this.page.goto(`${config.baseURL}${path}`, {
      waitUntil: 'load',
    });
  }

  @step()
  async waitForPageReady() {
    await this.page.waitForLoadState('load');
  }
}
