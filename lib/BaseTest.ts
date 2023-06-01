import { test as baseTest } from "@playwright/test";
import { LoginPage } from "../pageFactory/pageRepository/LoginPage";

const test = baseTest.extend<{
  loginPage: LoginPage;
}>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  }
});

export default test;
