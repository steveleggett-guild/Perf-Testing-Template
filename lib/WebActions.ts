import fs from "fs";
import CryptoJS from "crypto-js";
import type { Locator, Page } from "@playwright/test";
import { BrowserContext, expect } from "@playwright/test";
import { Workbook } from "exceljs";
import path from "path";
import {
  NAVIGATIONPARAMS,
  SharedObjects,
} from "../pageFactory/objectRepository/WebActionsObjects";
const waitForElement = 60 * 1000;

export class WebActions {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigateToURL(url: string) {
    this.page.goto(url);
  }

  async decipherPassword(password: string): Promise<string> {
    const key = `GUILD`;
    //ENCRYPT
    // const cipher = CryptoJS.AES.encrypt('yourPassword',key);
    // console.log(cipher.toString());
    return CryptoJS.AES.decrypt(password, key).toString(CryptoJS.enc.Utf8);
  }

  //* <param name="event">networkidle or load or domcontentloaded</param>
  async waitForPageNavigation(event: NAVIGATIONPARAMS): Promise<void> {
    const navigationPromise = await this.page.waitForLoadState(event, {timeout: waitForElement});
    await navigationPromise;
  }

  async delay(time: number): Promise<void> {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  async getLabelValue(locator: string): Promise<Locator> {
    return await this.page.getByLabel(locator);
  }

  async clickElement(locator: string): Promise<void> {
    await this.page.waitForSelector(locator, { timeout: waitForElement });
    await this.page.click(locator);
  }

  async clickOutsideOfAnElement(x: number, y: number): Promise<void> {
    await this.page.mouse.click(x, y);
  }

  async selectFromDropDown(text: string): Promise<void> {
    await this.page
      .locator(SharedObjects.REACTSELECTMENU + text)
      .first()
      .click()
      .catch(() => {
        throw new Error(`Unable to select from dropdown`);
      });
  }

  async clickElementJS(locator: string): Promise<void> {
    await this.page.$eval(locator, (element: HTMLElement) => element.click());
  }

  async enterElementText(locator: string, text: string): Promise<void> {
    await this.page.fill(locator, text);
  }

  async dragAndDrop(
    dragElementLocator: string,
    dropElementLocator: string
  ): Promise<void> {
    await this.page.dragAndDrop(dragElementLocator, dropElementLocator);
  }

  async selectOptionFromDropdown(
    locator: string,
    option: string
  ): Promise<void> {
    const selectDropDownLocator = await this.page.$(locator);
    selectDropDownLocator?.type(option);
  }

  async uploadFileIntoTheInputBox(
    locator: string,
    filePath: string
  ): Promise<void> {
    await this.page.locator(locator).setInputFiles(filePath);
    await this.verifyElementIsDisplayed(
      SharedObjects.UPLOADPROGRESSBAR,
      "Upload progress bar is not displayed"
    );
    this.waitForAnimationEnd(SharedObjects.UPLOADPROGRESSBAR);
    await this.page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
  }

  async downloadFile(locator: string): Promise<string> {
    const [download] = await Promise.all([
      this.page.waitForEvent(`download`),
      this.page.click(locator),
    ]);
    await download.saveAs(
      path.join(__dirname, `../Downloads`, download.suggestedFilename())
    );
    return download.suggestedFilename();
  }

  async keyPress(locator: string, key: string): Promise<void> {
    this.page.press(locator, key);
  }

  async readDataFromExcel(
    fileName: string,
    sheetName: string,
    rowNum: number,
    cellNum: number
  ): Promise<string> {
    const workbook = new Workbook();
    return workbook.xlsx.readFile(`./Downloads/${fileName}`).then(function () {
      const sheet = workbook.getWorksheet(sheetName);
      return sheet.getRow(rowNum).getCell(cellNum).toString();
    });
  }

  async readValuesFromTextFile(filePath: string): Promise<string> {
    return fs.readFileSync(`${filePath}`, `utf-8`);
  }

  async writeDataIntoTextFile(
    filePath: number | fs.PathLike,
    data: string | NodeJS.ArrayBufferView
  ): Promise<void> {
    fs.writeFile(filePath, data, (error) => {
      if (error) throw error;
    });
  }
  async verifyNewWindowUrlAndClick(
    context: BrowserContext,
    newWindowLocator: string,
    urlText: string,
    clickOnNewWindowLocator: string
  ): Promise<void> {
    const [newPage] = await Promise.all([
      context.waitForEvent("page"),
      this.page.click(newWindowLocator),
    ]);
    await newPage.waitForLoadState();
    expect(newPage.url()).toContain(urlText);
    await newPage.click(clickOnNewWindowLocator);
    await newPage.close();
  }

  async verifyElementContainsText(
    locator: string,
    text: string
  ): Promise<void> {
    const element = await this.getElementText(locator);
    expect(element, "Text is not an expected one").toContain(text);
  }

  async verifyJSElementValue(locator: string, text: string): Promise<void> {
    const textValue = await this.page.$eval(
      locator,
      (element: HTMLInputElement) => element.value
    );
    expect(textValue.trim()).toBe(text);
  }

  async verifyElementAttribute(
    locator: string,
    attribute: string,
    value: string
  ): Promise<void> {
    const textValue = await this.page.getAttribute(locator, attribute);
    expect(textValue?.trim()).toBe(value);
  }

  async verifyElementIsDisplayed(
    locator: string,
    errorMessage: string
  ): Promise<void> {
    await this.page
      .waitForSelector(locator, { state: `visible`, timeout: waitForElement })
      .catch(() => {
        throw new Error(`${errorMessage}`);
      });
  }

  async verifyElementIsHidden(
    locator: string,
    errorMessage: string
  ): Promise<void> {
    await this.page
      .waitForSelector(locator, { state: `hidden`, timeout: waitForElement })
      .catch(() => {
        throw new Error(`${errorMessage}`);
      });
  }

  async expectToBeTrue(status: boolean, errorMessage: string): Promise<void> {
    expect(status, `${errorMessage}`).toBe(true);
  }

  async expectToBeValue(
    expectedValue: string,
    actualValue: string,
    errorMessage: string
  ): Promise<void> {
    expect(expectedValue.trim(), `${errorMessage}`).toBe(actualValue);
  }

  async waitForAnimationEnd(selector: string) {
    return this.page
      .locator(selector)
      .evaluate((element) =>
        Promise.all(
          element.getAnimations().map((animation) => animation.finished)
        )
      );
  }

  async extractIntegerValueFromSelector(selector: string): Promise<number> {
    const text = await this.getElementText(selector);
    return parseInt(text.replace(/[^0-9]/g, ``));
  }

  async getElementText(selector: string): Promise<string> {
    return (
      (
        await this.page.textContent(selector, { timeout: waitForElement })
      )?.trim() || ""
    );
  }
}
