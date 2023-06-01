import * as playwright from "@playwright/test";

let browser: playwright.Browser;

async function globalTeardown() {
  // Close the browser after all the tests are finished
  if (browser) {
    await browser.close();
  }
}

export default globalTeardown;
